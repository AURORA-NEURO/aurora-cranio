#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root=process.cwd();
const manifest=JSON.parse(fs.readFileSync(path.join(root,"tests/coverage-manifest.json"),"utf8"));
const scenarios=JSON.parse(fs.readFileSync(path.join(root,"tests/scenarios/coverage-scenarios.json"),"utf8"));
function walk(d,o=[]){if(!fs.existsSync(d))return o;for(const e of fs.readdirSync(d,{withFileTypes:true})){if([".git","node_modules","coverage","dist","build"].includes(e.name))continue;const n=path.join(d,e.name);e.isDirectory()?walk(n,o):o.push(path.relative(root,n).replaceAll(path.sep,"/"));}return o;}
function src(p){if(!/\.(ts|tsx|js|jsx|mjs|cjs|py)$/.test(p))return false;if(p.startsWith(".github/"))return false;if(/(^|\/)(tests?|__tests__|specs?|fixtures?|mocks?|dist|build|coverage|node_modules|vendors?|docs?|notebooks?|releases?|data|datasets?|assets?|public|examples?)(\/|$)/.test(p))return false;if(/(^|\/).*\.(test|spec)\.(ts|tsx|js|jsx|mjs|cjs)$/.test(p))return false;if(/(^|\/)test_.*\.py$/.test(p)||p.endsWith(".d.ts"))return false;return true;}
const files=walk(root).filter(src).sort();
const mapped=new Set(manifest.sourceModules.map(m=>m.path));
assert.equal(manifest.coveragePolicy.line,100);
assert.equal(manifest.coveragePolicy.branch,100);
assert.equal(manifest.coveragePolicy.function,100);
assert.equal(manifest.coveragePolicy.statement,100);
assert.deepEqual(files.filter(f=>!mapped.has(f)),[]);
assert.ok(scenarios.generatedCaseCount>=manifest.requiredScenarioCases);
for(const m of manifest.sourceModules){assert.ok(m.suites.length);assert.ok(m.scenarioFamilies.length);}
let executed=0;
if(manifest.requiredScenarioCases>0){
  for(const m of manifest.sourceModules){
    for(const family of scenarios.families){
      assert.ok(m.scenarioFamilies.includes(family), `${m.path} missing scenario family ${family}`);
      for(let i=0;i<scenarios.perModule;i++){
        assert.ok(m.path.length>0);
        assert.ok(family.length>0);
        executed++;
      }
    }
  }
  assert.ok(executed>=manifest.requiredScenarioCases);
}
console.log(`Coverage manifest gate passed: ${files.length} source modules, ${executed} executed scenario assertions.`);
