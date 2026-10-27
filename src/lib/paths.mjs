export function normalizeBase(base = '/') {
  const clean = String(base).trim().replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
}
export function withBase(path = '/', base = '/') {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  const prefix = normalizeBase(base);
  if (prefix !== '/' && (path === prefix.slice(0,-1) || path.startsWith(prefix))) return path;
  return prefix + path.replace(/^\/+/, '');
}
