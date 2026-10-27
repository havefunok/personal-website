import {readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import {existsSync} from 'node:fs';
if(existsSync('src/pages/qa-responsive.astro')||existsSync('src/content/writing/qa-browser-article.mdx'))throw new Error('Remove browser test fixtures with npm run qa:clean before building.');
const data=JSON.parse(await readFile('src/config/site.json','utf8'));
const css=await readFile('src/styles/global.css','utf8');
const tokens=css.match(/:root \{([\s\S]*?)\n}/)?.[1]??'';
const color=name=>{const value=tokens.match(new RegExp(`--${name}:([^;]+);`))?.[1];if(!value)throw new Error(`Missing color token: ${name}`);return value.trim();};
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${color('bg')}"/><text x="70" y="90" font-family="sans-serif" font-size="28" fill="${color('text')}">${escape(data.name)}</text><text x="70" y="285" font-family="sans-serif" font-size="64" fill="${color('text')}">${escape(data.hero.greeting)}</text><text x="70" y="355" font-family="sans-serif" font-size="34" fill="${color('text')}">${escape(data.headline)}</text><text x="70" y="430" font-family="sans-serif" font-size="24" fill="${color('secondary')}">${escape(data.education)}</text><path d="M70 520h1060" stroke="${color('border')}"/><text x="70" y="575" font-family="sans-serif" font-size="20" fill="${color('secondary')}">PROJECTS / PERSONAL WRITING / ENGINEERING</text><text x="1060" y="90" font-family="sans-serif" font-size="28" fill="${color('accent')}">${escape(data.initials)}</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/social-card.png');
console.log('Social sharing image generated from site settings.');

await writeFile('public/favicon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="4" fill="${color('text')}"/><text x="32" y="41" text-anchor="middle" font-family="monospace" font-size="28" fill="${color('bg')}">${escape(data.initials)}</text></svg>`);
