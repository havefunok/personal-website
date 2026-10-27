import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeBase,withBase} from '../src/lib/paths.mjs';
test('root and repository deployment paths',()=>{
 assert.equal(withBase('/projects/','/'),'/projects/');
 assert.equal(withBase('/projects/','/portfolio'),'/portfolio/projects/');
 assert.equal(withBase('/images/a.webp','/portfolio/'),'/portfolio/images/a.webp');
 assert.equal(withBase('/portfolio/projects/','/portfolio/'),'/portfolio/projects/');
 assert.equal(withBase('/','/portfolio/'),'/portfolio/');
 assert.equal(normalizeBase('///portfolio///'),'/portfolio/');
});
test('external links, mail, hashes and query strings remain usable',()=>{
 for(const link of ['https://github.com/havefunok','mailto:hello@example.org','#work','//example.org/a'])assert.equal(withBase(link,'/portfolio/'),link);
 assert.equal(withBase('/projects/?tag=C%2B%2B','/portfolio/'),'/portfolio/projects/?tag=C%2B%2B');
});
