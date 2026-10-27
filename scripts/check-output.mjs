import {readFileSync,readdirSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import YAML from 'yaml';
const root=path.resolve('dist');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root);const pages=files.filter(f=>f.endsWith('.html'));
const home=load(readFileSync(path.join(root,'index.html'),'utf8'));
const rootURL=new URL(home('link[rel=canonical]').attr('href'));
const prefix=rootURL.pathname.endsWith('/')?rootURL.pathname:rootURL.pathname+'/';
const titles=new Set();let links=0;
for(const file of pages){
 const $=load(readFileSync(file,'utf8'));const title=$('title').text();assert(title,`${file}: title`);assert(!titles.has(title),`Duplicate title ${title}`);titles.add(title);
 assert.equal($('h1').length,1,`${file}: one h1`);assert($('meta[name=description]').attr('content'),`${file}: description`);
 const canonical=new URL($('link[rel=canonical]').attr('href'));assert.equal(canonical.origin,rootURL.origin);
 assert(canonical.pathname.startsWith(prefix),`${file}: canonical base`);
 for(const node of $('[href],[src],[poster],[srcset],meta[property="og:image"],meta[name="twitter:image"]').toArray()){
  const attributes=['href','src','poster',...($(node).is('meta')?['content']:[])];
  const values=attributes.map(attribute=>$(node).attr(attribute)).filter(Boolean);
  values.push(...($(node).attr('srcset')??'').split(',').map(source=>source.trim().split(/\s+/)[0]).filter(Boolean));
  for(const value of values){
   if(!value||/^(mailto:|tel:|data:|javascript:)/.test(value))continue;
   const target=new URL(value,canonical);if(target.origin!==rootURL.origin)continue;
   assert(target.pathname.startsWith(prefix),`${file}: URL escapes deployment base: ${value}`);
   let local=path.join(root,decodeURIComponent(target.pathname.slice(prefix.length)));
   if(existsSync(local)&&statSync(local).isDirectory())local=path.join(local,'index.html');
   assert(existsSync(local),`${file}: missing ${value}`);
   if(target.hash&&local.endsWith('.html')){const targetDoc=load(readFileSync(local,'utf8'));assert(targetDoc(`[id="${decodeURIComponent(target.hash.slice(1))}"]`).length,`${file}: missing anchor ${value}`);}
   links++;
  }
 }
 for(const img of $('img').toArray())assert($(img).attr('alt')?.trim(),`${file}: meaningful image alt required`);
 for(const s of $('script[type="application/ld+json"]').toArray())JSON.parse($(s).text());
}
const sitemap=files.filter(f=>/sitemap.*\.xml$/.test(f)).map(f=>readFileSync(f,'utf8')).join('');
for(const collection of ['projects','writing']){
 for(const source of walk(`src/content/${collection}`).filter(f=>/\.mdx?$/.test(f))){
  const raw=readFileSync(source,'utf8');const fm=YAML.parse(raw.match(/^---\n([\s\S]*?)\n---/)?.[1]??'');
  const slug=path.relative(`src/content/${collection}`,source).replace(/\.mdx?$/,'').toLowerCase();
  const output=path.join(root,collection,slug,'index.html');
  if(fm.draft!==false){assert(!existsSync(output),`Draft route leaked: ${slug}`);assert(!sitemap.includes(`/${collection}/${slug}/`),`Draft sitemap leaked: ${slug}`);assert(!home.text().includes(fm.title),`Draft home leaked: ${fm.title}`);}
  else assert(existsSync(output),`Published route missing: ${slug}`);
 }
}
assert(existsSync('dist/robots.txt'));assert(sitemap.includes(rootURL.origin));
console.log(`PASS: ${pages.length} HTML pages; ${links} local links/assets; unique SEO; structured data; published routes and draft exclusion. Base: ${prefix}`);
