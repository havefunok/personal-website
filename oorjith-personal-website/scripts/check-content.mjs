import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import YAML from 'yaml';
const config=YAML.parse(readFileSync('.pages.yml','utf8'));
assert(Array.isArray(config.content),'CMS content must be an array');
for(const entry of config.content){assert(existsSync(entry.path),`CMS path missing: ${entry.path}`);assert(entry.fields?.length,`CMS fields missing: ${entry.name}`);}
for(const collection of ['projects','writing']){
 const editor=config.content.find(c=>c.name===collection);
 assert(editor.fields.some(f=>f.name==='body'&&f.type==='rich-text'));
 assert(editor.fields.find(f=>f.name==='draft')?.default===true,'New CMS entries must start as drafts');
 assert(editor.exclude.includes('**/*.mdx'),'MDX must remain outside the rich-text editor');
}
const site=JSON.parse(readFileSync('src/config/site.json','utf8'));
assert.deepEqual(config.content.find(c=>c.name==='writing').fields.find(f=>f.name==='kind').options.values,['personal','technical'],'CMS writing sections must match the content schema');
assert.deepEqual(config.content.find(c=>c.name==='site').fields.map(f=>f.name),Object.keys(site),'Every global setting must be editable');
assert(site.navigation.every(n=>n.path.startsWith('/')));
if(site.resumePath)assert(existsSync('public'+site.resumePath),'Configured resume is missing');
const media=config.media.find(m=>m.name==='images');assert.equal(media.input,'public/images');assert.equal(media.output,'/images');
const workflow=YAML.parse(readFileSync('.github/workflows/deploy.yml','utf8'));
assert(workflow.on.push.branches.includes('main'));assert.equal(workflow.jobs.deploy.permissions['pages'],'write');assert.equal(workflow.jobs.deploy.permissions['id-token'],'write');
console.log('CMS structure, editable settings, media paths, resume, and deployment workflow passed.');
