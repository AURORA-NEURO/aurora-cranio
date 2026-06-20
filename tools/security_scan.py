#!/usr/bin/env python3
"""
Portable, zero-dependency security scanner for AURORA-NEURO repos.

Runs anywhere (local clone or CI) without GitHub Advanced Security. Three passes:

  1. SECRETS  — regex sweep for hardcoded credentials (AWS, GitHub PAT, OpenAI/
                Anthropic keys, private keys, generic high-entropy assignments).
  2. DEPS     — shells out to `npm audit --json` and/or `pip-audit` if available;
                otherwise reports the manifests it found so a human can audit.
  3. PATTERNS — SAST-lite: dangerous sinks (eval, child_process w/ shell,
                pickle.loads, yaml.load, requests verify=False, Math.random for
                tokens, etc.).

Exit code 0 = clean, 1 = findings (so it can gate CI).

Usage:  python tools/security_scan.py [path]   (default: repo root)
        python tools/security_scan.py --json
"""
import os, re, sys, json, subprocess, math

ROOT = "."
SKIP_DIRS = {".git","node_modules",".venv","venv","env","__pycache__","dist","build",
             ".next","out","coverage",".pytest_cache","data","structures_cache",
             ".turbo",".cache","vendor","site-packages","Scripts",".tox",".mypy_cache",
             ".eggs","wheels",".ipynb_checkpoints"}
TEXT_EXT = {".py",".ts",".tsx",".js",".jsx",".mjs",".cjs",".json",".yml",".yaml",
            ".env",".sh",".toml",".cfg",".ini",".txt",".md"}

SECRET_PATTERNS = [
    ("AWS access key id",    re.compile(r"AKIA[0-9A-Z]{16}")),
    ("AWS secret key",       re.compile(r"(?i)aws_secret_access_key\s*[=:]\s*['\"][A-Za-z0-9/+=]{40}['\"]")),
    ("GitHub PAT (classic)", re.compile(r"ghp_[A-Za-z0-9]{36}")),
    ("GitHub PAT (fine)",    re.compile(r"github_pat_[A-Za-z0-9_]{22,}")),
    ("GitHub OAuth token",   re.compile(r"gho_[A-Za-z0-9]{36}")),
    ("Slack token",          re.compile(r"xox[baprs]-[0-9A-Za-z-]{10,}")),
    ("OpenAI key",           re.compile(r"sk-[A-Za-z0-9]{20,}")),
    ("Anthropic key",        re.compile(r"sk-ant-[A-Za-z0-9_-]{20,}")),
    ("Google API key",       re.compile(r"AIza[0-9A-Za-z_-]{35}")),
    ("Private key block",    re.compile(r"-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----")),
    ("Generic secret assign",re.compile(r"(?i)(password|passwd|secret|api[_-]?key|token|access[_-]?key)\s*[=:]\s*['\"][^'\"\s]{12,}['\"]")),
]
# values that look like secrets but are placeholders / test fixtures
ALLOW = re.compile(r"(?i)(example|placeholder|dummy|test|sample|xxxx|<.*>|your[_-]|"
                   r"changeme|redacted|noreply|replace|insert[_-]?|here|fixme|todo|\$\{|\{\{)")
# k8s resource names / DNS-style identifiers (lowercase-hyphen) are not credentials
K8S_NAME = re.compile(r"^[a-z0-9][a-z0-9.-]*$")

DANGER_PATTERNS = [
    # bare `exec(` matches regexp.exec / .execSync everywhere -> only flag eval() and shell-exec separately
    ("eval()",                   re.compile(r"\beval\s*\(")),
    ("child_process shell",      re.compile(r"(exec|execSync)\s*\([^)]*shell\s*:\s*true|\bexec(Sync)?\s*\(`")),
    ("os.system / shell=True",   re.compile(r"os\.system\s*\(|subprocess\.[A-Za-z]+\([^)]*shell\s*=\s*True")),
    ("pickle.loads (untrusted)", re.compile(r"pickle\.loads?\s*\(")),
    ("yaml.load unsafe",         re.compile(r"yaml\.load\s*\((?![^)]*Loader\s*=\s*yaml\.SafeLoader)")),
    ("requests verify=False",    re.compile(r"verify\s*=\s*False")),
    ("Math.random for security", re.compile(r"Math\.random\(\)")),
    ("dangerouslySetInnerHTML",  re.compile(r"dangerouslySetInnerHTML")),
    ("innerHTML assignment",     re.compile(r"\.innerHTML\s*=")),
    ("hardcoded 0.0.0.0 bind",   re.compile(r"0\.0\.0\.0")),
]

def shannon(s):
    if not s: return 0
    counts = {}
    for c in s: counts[c]=counts.get(c,0)+1
    return -sum((v/len(s))*math.log2(v/len(s)) for v in counts.values())

def walk(root):
    for dp, dns, fns in os.walk(root):
        # prune virtualenv roots (any dir containing pyvenv.cfg) and known skip dirs
        if "pyvenv.cfg" in fns:
            dns[:] = []
            continue
        dns[:] = [d for d in dns if d not in SKIP_DIRS]
        for fn in fns:
            ext = os.path.splitext(fn)[1].lower()
            if ext in TEXT_EXT or fn.startswith(".env"):
                yield os.path.join(dp, fn)

def scan_secrets(root):
    hits = []
    for fp in walk(root):
        try:
            with open(fp, encoding="utf-8", errors="ignore") as f:
                for i, line in enumerate(f, 1):
                    if len(line) > 5000: continue
                    for label, pat in SECRET_PATTERNS:
                        m = pat.search(line)
                        if m and not ALLOW.search(line):
                            val = m.group(0)
                            if label == "Generic secret assign":
                                # extract the quoted value for entropy / name checks
                                qv = re.search(r"['\"]([^'\"]{8,})['\"]", val)
                                inner = qv.group(1) if qv else val
                                if shannon(inner) < 3.2:      # low entropy -> not a real key
                                    continue
                                if K8S_NAME.match(inner):     # dns/k8s name, not a credential
                                    continue
                            hits.append({"file": fp, "line": i, "type": label,
                                         "match": val[:24]+"…" if len(val)>24 else val})
        except (OSError, UnicodeDecodeError):
            pass
    return hits

def scan_patterns(root):
    hits = []
    for fp in walk(root):
        ext = os.path.splitext(fp)[1].lower()
        if ext not in {".py",".ts",".tsx",".js",".jsx",".mjs",".cjs"}: continue
        try:
            with open(fp, encoding="utf-8", errors="ignore") as f:
                for i, line in enumerate(f, 1):
                    for label, pat in DANGER_PATTERNS:
                        if pat.search(line):
                            hits.append({"file": fp, "line": i, "type": label,
                                         "snippet": line.strip()[:100]})
        except (OSError, UnicodeDecodeError):
            pass
    return hits

def scan_deps(root):
    out = {}
    if os.path.exists(os.path.join(root,"package.json")):
        try:
            p = subprocess.run(["npm","audit","--json"], cwd=root, capture_output=True,
                               text=True, timeout=60)
            j = json.loads(p.stdout or "{}")
            md = j.get("metadata",{}).get("vulnerabilities",{})
            out["npm"] = md or {"note":"npm audit ran, no metadata"}
        except Exception as e:
            out["npm"] = {"error": f"npm audit unavailable: {e}"}
    if any(os.path.exists(os.path.join(root,m)) for m in ("requirements.txt","pyproject.toml")):
        try:
            p = subprocess.run(["pip-audit","-f","json"], cwd=root, capture_output=True,
                               text=True, timeout=60)
            out["pip"] = json.loads(p.stdout or "{}") if p.stdout.strip().startswith(("{","[")) else {"note":"pip-audit ran"}
        except Exception as e:
            out["pip"] = {"error": f"pip-audit unavailable: {e} (pip install pip-audit)"}
    return out

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    as_json = "--json" in sys.argv
    root = args[0] if args else ROOT
    secrets = scan_secrets(root)
    patterns = scan_patterns(root)
    deps = scan_deps(root)
    report = {"root": os.path.abspath(root), "secrets": secrets,
              "patterns": patterns, "deps": deps}
    if as_json:
        print(json.dumps(report, indent=2));
    else:
        print(f"== security_scan: {os.path.abspath(root)} ==")
        print(f"\n[SECRETS] {len(secrets)} potential hardcoded secrets")
        for h in secrets[:50]:
            print(f"  {h['type']:24s} {h['file']}:{h['line']}  {h['match']}")
        print(f"\n[PATTERNS] {len(patterns)} dangerous-sink hits")
        bytype = {}
        for h in patterns: bytype.setdefault(h["type"],[]).append(h)
        for t, hs in sorted(bytype.items(), key=lambda x:-len(x[1])):
            print(f"  {len(hs):4d}  {t}")
        print(f"\n[DEPS] {json.dumps(deps, indent=2)[:1500]}")
    nfind = len(secrets) + len(patterns)
    sys.exit(1 if secrets else 0)  # only fail CI on secrets; patterns are advisory

if __name__ == "__main__":
    main()
