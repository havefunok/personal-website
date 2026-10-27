import {copyFile,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
const files=[['tests/fixtures/browser-qa.astro.txt','src/pages/qa-responsive.astro'],['tests/fixtures/browser-article.mdx.txt','src/content/writing/qa-browser-article.mdx']];
if(process.argv.includes('--clean')){
 for(const [,target] of files)await rm(target,{force:true});
 console.log('Browser QA fixtures removed.');
}else{
 for(const [,target] of files)if(existsSync(target))throw new Error(`QA path already exists: ${target}. Clean it before preparing again.`);
 for(const [source,target] of files)await copyFile(source,target);
 console.log('Run npm run dev, then open /qa-responsive/ and select Audit all pages. Run npm run qa:clean before building.');
}
