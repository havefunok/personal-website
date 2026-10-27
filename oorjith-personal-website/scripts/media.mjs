import sharp from 'sharp';
import {readdir,readFile,writeFile,mkdir,access,unlink} from 'node:fs/promises';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else out.push(f);}return out;}
export async function prepareMedia(){
 const manifest={};const used=new Set();await mkdir('public/_media',{recursive:true});await mkdir('public/images',{recursive:true});await mkdir('.astro',{recursive:true});
 for(const file of await walk('public/images')){
  if(!/\.(png|jpe?g|webp|avif)$/i.test(file))continue;
  const bytes=await readFile(file);const hash=createHash('sha256').update(bytes).digest('hex').slice(0,16);
  const meta=await sharp(bytes).metadata();if(!meta.width||!meta.height)continue;
  const rotated=meta.orientation&&meta.orientation>=5;const width=rotated?meta.height:meta.width;const height=rotated?meta.width:meta.height;
  const widths=[...new Set([480,960,1440,Math.min(width,1920)].filter(w=>w<=width))].sort((a,b)=>a-b);
  const sources=[];
  for(const w of widths){const output=`/_media/${hash}-${w}.webp`;used.add(path.basename(output));try{await access(`public${output}`);}catch{await sharp(bytes).rotate().resize({width:w,withoutEnlargement:true}).webp({quality:82}).toFile(`public${output}`);}sources.push({src:output,width:w});}
  manifest['/'+path.relative('public',file).split(path.sep).join('/')]={width,height,sources};
 }
 for(const stale of await readdir('public/_media'))if(!used.has(stale))await unlink(path.join('public/_media',stale));
 await writeFile('.astro/media.json',JSON.stringify(manifest));return manifest;
}
export function mediaInfo(src){if(!existsSync('.astro/media.json'))return undefined;return JSON.parse(readFileSync('.astro/media.json','utf8'))[src];}
