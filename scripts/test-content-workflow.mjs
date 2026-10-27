import {writeFile,readFile,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {load} from 'cheerio';
const project='src/content/projects/qa-new-project.md';
const article='src/content/writing/qa-new-article.mdx';
const reflection='src/content/writing/qa-personal-reflection.md';
const existing='src/content/projects/competition-robot-systems.md';
const original=await readFile(existing,'utf8');
const settingsPath='src/config/site.json';
const originalSettings=await readFile(settingsPath,'utf8');
const run=()=>execFileSync('npm',['run','build'],{stdio:'pipe',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
try {
 const settings=JSON.parse(originalSettings);settings.linkedin=null;settings.portrait=null;settings.portraitAlt=null;settings.socials=null;settings.currentFocus.items[0].text+=' QA settings edit.';
 await writeFile(settingsPath,JSON.stringify(settings,null,2));
 await sharp({create:{width:1600,height:900,channels:3,background:'#345b73'}}).png().toFile('public/images/qa-fixture.png');
 await writeFile(project,`---\ntitle: "QA new project"\ndescription: "Temporary integration fixture"\ncategory: "Research"\nfeatured: true\nfeaturedOrder: 0\ncoverImage: "/images/qa-fixture.png"\ncoverAlt: "Temporary blue media test"\ntags: [Testing]\ndraft: false\n---\n## Overview\nNew content route.\n`);
 await writeFile(article,`---\ntitle: "QA new article"\ndescription: "Temporary rich-content fixture"\ndate: 2026-10-25\ntags: [Testing]\ndraft: false\n---\n## Equation\n\n$$V = IR$$\n\n## Code\n\n\`\`\`cpp\nint voltage = 24;\n\`\`\`\n\n## Table\n\n| Signal | Unit |\n| --- | --- |\n| Voltage | V |\n\n## Media\n\n![Blue fixture](/images/qa-fixture.png)\n\n<Media src="/images/qa-fixture.png" alt="MDX component fixture" />\n\n## Internal link\n\n[Project directory](/projects/)\n`);
 await writeFile(article,(await readFile(article,'utf8')).replace('tags: [Testing]','kind: technical\ntags: [Testing]'));
 await writeFile(reflection,'---\ntitle: "QA personal reflection"\ndescription: "Temporary personal writing fixture"\ndate: 2026-10-26\nkind: null\ndraft: false\n---\nA temporary reflection to verify the default section.\n');
 await writeFile(existing,original.replace('## A mechanism is part of a system','## QA editing verification').replace(/featuredOrder: \d+/,'featuredOrder: null'));
 run();
 const home=await readFile('dist/index.html','utf8');assert(home.includes('QA new project'),'Featured file did not reach homepage');
 assert(home.includes('QA settings edit.'),'Global CMS-compatible settings edit did not reach homepage');
 assert(home.includes('QA personal reflection'),'Personal reflection did not reach homepage');
 assert(!home.includes('QA new article'),'Technical note leaked into personal writing preview');
 const writing=load(await readFile('dist/writing/index.html','utf8'));
 assert(writing('#personal-writing').text().includes('QA personal reflection'),'Personal writing section missing entry');
 assert(!writing('#personal-writing').text().includes('QA new article'),'Technical note in wrong section');
 assert(writing('#engineering-notes').text().includes('QA new article'),'Technical notes section missing entry');
 assert(!writing('#engineering-notes').text().includes('QA personal reflection'),'Personal essay in wrong section');
 assert(existsSync('dist/projects/qa-new-project/index.html'),'New project route missing');
 const page=await readFile('dist/writing/qa-new-article/index.html','utf8');
 for(const needle of ['katex','astro-code','--shiki-dark','<table','In this note','srcset','MDX component fixture'])assert(page.includes(needle),`Article missing ${needle}`);
 const updated=await readFile('dist/projects/competition-robot-systems/index.html','utf8');assert(updated.includes('QA editing verification'),'Edited content not reflected');
 execFileSync('node',['scripts/check-output.mjs'],{stdio:'inherit'});
 console.log('PASS: New project, auto-featured selection, new MDX article, edit propagation, math, code, table, TOC, responsive images, internal links.');
} finally {
 await writeFile(existing,original);
 await writeFile(settingsPath,originalSettings);
 await Promise.all([rm(project,{force:true}),rm(article,{force:true}),rm(reflection,{force:true}),rm('public/images/qa-fixture.png',{force:true})]);
 // Regenerate only current media; leave no test asset in the final build.
 await rm('public/_media',{recursive:true,force:true});
 run();
}
console.log('Temporary content removed; clean production build restored.');
