// HTML-context escape: content between tags
export function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Attribute-context escape: safe for double-quoted attribute values
export function escAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// URL-safe slug for hash-route path segments
export function urlSlug(str) {
  return encodeURIComponent(String(str ?? ''))
}

// Route href builder — always safe for interpolation into `href="..."`
export function hrefTo(pathTemplate, params = {}, fragment = '') {
  let path = pathTemplate
  for (const [k, v] of Object.entries(params)) {
    path = path.replace(':' + k, urlSlug(v))
  }
  return '#' + path + (fragment ? '#' + urlSlug(fragment) : '')
}

// Kebab-case → Title Case (for domain/type badge labels)
export function titleCase(str) {
  return String(str ?? '')
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}
