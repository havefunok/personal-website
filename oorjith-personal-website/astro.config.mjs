import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { readFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import { normalizeBase } from './src/lib/paths.mjs';
import { prepareMedia } from './scripts/media.mjs';
import rehypeBase from './scripts/rehype-base.mjs';
const settings = JSON.parse(readFileSync(new URL('./src/config/site.json',import.meta.url)));
const isDev = process.argv.includes('dev');
const env = {...loadEnv(isDev ? 'development' : 'production',process.cwd(),''), ...process.env};
const base = normalizeBase(env.BASE_PATH ?? (isDev ? '/' : settings.basePath));
const media = await prepareMedia();
export default defineConfig({
  site: env.SITE_URL || settings.siteUrl, base, output:'static', trailingSlash:'always',
  compressHTML:true, integrations:[mdx(),sitemap({filter:page=>!page.endsWith('/404/')})],
  markdown:{shikiConfig:{themes:{light:'github-light-high-contrast',dark:'github-dark-high-contrast'},wrap:true},processor:unified({remarkPlugins:[remarkMath],rehypePlugins:[rehypeKatex,[rehypeBase,{base,media}]]})},
  vite:{plugins:[tailwindcss()],server:{allowedHosts:['terminal.local']}}, devToolbar:{enabled:false},
});
