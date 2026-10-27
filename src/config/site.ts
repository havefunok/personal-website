import { z } from 'astro/zod';
import data from './site.json';
const empty = (value: unknown) => value ?? '';
const optionalUrl = z.preprocess(empty, z.union([z.url(), z.literal('')]));
const optionalText = z.preprocess(empty, z.string());
const localPath = z.string().regex(/^\/(?!\/)/);
const siteSchema = z.object({
  name: z.string().min(1), shortName: z.string().min(1), initials: z.string().min(1),
  headline: z.string(), description: z.string(), email: z.preprocess(empty, z.union([z.email(), z.literal('')])),
  github: optionalUrl, linkedin: optionalUrl,
  socials: z.preprocess(value => value ?? [], z.array(z.object({ label: z.string(), url: z.url() }))),
  location: z.string(), education: z.string(), resumePath: optionalText,
  portrait: optionalText, portraitAlt: optionalText, siteUrl: z.url(), basePath: localPath,
  seoImage: localPath, navigation: z.array(z.object({label:z.string(),path:localPath})),
  projectCategories: z.array(z.string().min(1)),
  hero: z.object({greeting:z.string(),intro:z.string()}),
  introduction: z.string(),
  beyond: z.object({title:z.string(),intro:z.string(),items:z.array(z.object({title:z.string(),text:z.string(),link:localPath,linkLabel:z.string()}))}),
  currentFocus: z.object({label:z.string(),items:z.array(z.object({title:z.string(),text:z.string()}))}),
  personalWriting: z.object({title:z.string(),intro:z.string(),topics:z.array(z.string())}),
  contact: z.object({heading:z.string(),intro:z.string()}), featuredLimit:z.number().int().min(1).max(6)
}).refine(value => !value.portrait || Boolean(value.portraitAlt), {message:'A portrait needs descriptive portraitAlt.',path:['portraitAlt']});
export const site = siteSchema.parse(data);
export const socialLinks = [
  ...(site.github ? [{label:'GitHub',url:site.github}] : []),
  ...(site.linkedin ? [{label:'LinkedIn',url:site.linkedin}] : []),
  ...site.socials,
];
