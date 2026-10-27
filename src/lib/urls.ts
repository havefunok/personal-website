import { withBase } from './paths.mjs';
export const url = (path = '/') => withBase(path, import.meta.env.BASE_URL);
export function absolute(path: string, origin: URL | string) { return new URL(url(path), origin).href; }
