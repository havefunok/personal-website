import { getCollection, type CollectionEntry } from 'astro:content';
export const publishedProjects = async () => (await getCollection('projects', ({data}) => !data.draft))
  .sort((a,b) => (a.data.featuredOrder ?? 999) - (b.data.featuredOrder ?? 999) || (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || a.id.localeCompare(b.id));
export const publishedWriting = async () => (await getCollection('writing', ({data}) => !data.draft))
  .sort((a,b) => b.data.date.getTime() - a.data.date.getTime());
export function displayDate(date?: Date) { return date ? new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric',timeZone:'UTC'}).format(date) : ''; }
export function readingTime(body = '') { return Math.max(1, Math.ceil(body.replace(/<[^>]*>|```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length / 220)); }
export function relatedProjects(project: CollectionEntry<'projects'>, all: CollectionEntry<'projects'>[]) {
 return all.filter(p => p.id !== project.id).sort((a,b) => Number(b.data.category === project.data.category) - Number(a.data.category === project.data.category)).slice(0,2);
}
