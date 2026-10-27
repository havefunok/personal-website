import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const blankToUndefined = (value: unknown) => value === '' || value === null ? undefined : value;
const optionalText = z.preprocess(blankToUndefined, z.string().optional());
const optionalDate = z.preprocess(blankToUndefined, z.coerce.date().optional());
const optionalURL = z.preprocess(blankToUndefined, z.url().optional());
const cover = { coverImage: optionalText, coverAlt: optionalText };
const tags = z.preprocess(v => v ?? [], z.array(z.string())).default([]);
const projects = defineCollection({
 loader: glob({pattern:'**/*.{md,mdx}',base:'./src/content/projects'}),
 schema: z.object({
  title:z.string().min(1), description:z.string().min(1), subtitle:optionalText,
  date:optionalDate, endDate:optionalDate, updated:optionalDate, timeframe:optionalText,
  category:z.string().min(1), tags, technologies:tags,
  featured:z.boolean().default(false), featuredOrder:z.preprocess(blankToUndefined,z.number().int().optional()),
  status:z.preprocess(blankToUndefined,z.enum(['ongoing','completed','archived','planned']).optional()),
  role:optionalText, collaborators:tags, ...cover, github:optionalURL, demo:optionalURL,
  links:z.preprocess(v=>v??[],z.array(z.object({label:z.string(),url:z.url()}))).default([]),
  draft:z.boolean().default(true),
 }).refine(d=>!d.coverImage || Boolean(d.coverAlt),{message:'A cover image needs descriptive coverAlt.',path:['coverAlt']})
});
const writing = defineCollection({
 loader:glob({pattern:'**/*.{md,mdx}',base:'./src/content/writing'}),
 schema:z.object({title:z.string().min(1),description:z.string().min(1),date:z.preprocess(blankToUndefined,z.coerce.date()),updated:optionalDate,kind:z.preprocess(blankToUndefined,z.enum(['personal','technical']).default('personal')),tags,...cover,draft:z.boolean().default(true)})
 .refine(d=>!d.coverImage || Boolean(d.coverAlt),{message:'A cover image needs descriptive coverAlt.',path:['coverAlt']})
});
const experience = defineCollection({
 loader:glob({pattern:'**/*.md',base:'./src/content/experience'}),
 schema:z.object({organization:z.string(),position:z.string(),startDate:optionalDate,endDate:optionalDate,current:z.boolean().default(false),location:optionalText,description:z.string(),achievements:tags,technologies:tags,organizationLink:optionalURL,order:z.preprocess(blankToUndefined,z.number().default(99)),draft:z.boolean().default(false)})
});
const pages = defineCollection({loader:glob({pattern:'*.md',base:'./src/content/pages'}),schema:z.object({title:z.string(),description:z.string()})});
export const collections = {projects,writing,experience,pages};
