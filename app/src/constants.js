// Colours are keyed by subdomain first (fine-grained), then by domain (coarse
// fallback), then by kind fallback (people, relation). Subject nodes carry
// domain: it|math|... plus subdomain: systems|ml|web|...; the palette below
// maps both axes so existing content and future domains stay coherent.

export const DOMAIN_COLORS = {
  // subdomains (fine-grained — primary key)
  systems:    '#7c4a1e',
  compilers:  '#7c4a1e',
  os:         '#7c4a1e',
  runtimes:   '#8a5b34',
  languages:  '#8a5b34',
  ml:         '#2d5a2d',
  web:        '#2d4a6a',
  networking: '#6a2d4a',
  // domains (coarse fallback)
  it:         '#6b5f52',
  math:       '#4a3d6a',
  // kinds
  people:     '#5a5a2d',
  relation:   '#6b5f52',
  default:    '#6b5f52',
}

export const CONFIDENCE = {
  '\u{1F7E2}': { color: 'green',  label: 'verifiable',      short: 'verifiable' },
  '\u{1F7E1}': { color: 'yellow', label: 'visible pattern', short: 'pattern' },
  '\u{1F7E0}': { color: 'orange', label: 'arguable',        short: 'arguable' },
  '\u{1F534}': { color: 'red',    label: 'unanswered',      short: 'open' },
}

export const DOMAIN_ORDER = ['systems', 'compilers', 'languages', 'runtimes', 'ml', 'web', 'networking', 'people']

export function domainColor(key) {
  return DOMAIN_COLORS[key] || DOMAIN_COLORS.default
}
