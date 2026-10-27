import { visit } from 'unist-util-visit';
import { withBase } from '../src/lib/paths.mjs';
/** Make authored root-relative media and links work on GitHub repository subpaths. */
export default function rehypeBase({base='/', media={}} = {}) {
 return tree => visit(tree,'element',node => {
  const original = node.properties?.src;
  const info = typeof original === 'string' ? media[original] : undefined;
  if (node.tagName === 'img' && info) {
   node.properties.width = info.width; node.properties.height = info.height;
   node.properties.src = info.sources.at(-1).src;
   node.properties.srcSet = info.sources.map(s=>`${withBase(s.src,base)} ${s.width}w`).join(', ');
   node.properties.sizes = '(max-width: 767px) calc(100vw - 48px), 710px';
  }
  for (const key of ['href','src','poster']) {
   const value = node.properties?.[key];
   if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) node.properties[key]=withBase(value,base);
  }
  if (node.tagName === 'img') {
   node.properties.loading ??= 'lazy'; node.properties.decoding ??= 'async';
  }
 });
}
