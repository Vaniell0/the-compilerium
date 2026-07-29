import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: false,
  mangle: false,
})

// Rewrite internal .md / repo-path links so they navigate inside the SPA.
// Runs against fully sanitized HTML using a template element.
function rewriteInternalLinks(html) {
  if (!html.includes('href=')) return html
  const tpl = document.createElement('template')
  tpl.innerHTML = html
  for (const a of tpl.content.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href') || ''
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
    if (/^https?:\/\//i.test(href)) {
      // External — force safe target
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
      continue
    }
    const routed = routeFromPath(href)
    if (routed) a.setAttribute('href', routed)
  }
  return tpl.innerHTML
}

// Path patterns → hash routes:
//   llvm.md, ./llvm.md, ../nodes/llvm.md, docs/nodes/llvm.md → #/node/llvm
//   ../people/lattner-chris.md, people/lattner-chris → #/person/lattner-chris
//   ../research/alexnet-2012.md → #/paper/alexnet-2012
//   ../relations/llvm__rust.md → #/relation/llvm__rust
function routeFromPath(raw) {
  const clean = raw.replace(/^\.\.?\//, '').replace(/^\/+/, '')
  const stripped = clean.replace(/\.md(#.*)?$/i, '$1')
  // dir/slug form
  const dir = stripped.match(/^(?:docs\/)?(nodes|relations|people|research)\/([^\/#]+)(#.*)?$/i)
  if (dir) {
    const kind = { nodes: 'node', relations: 'relation', people: 'person', research: 'paper' }[dir[1].toLowerCase()]
    return `#/${kind}/${encodeURIComponent(dir[2])}${dir[3] || ''}`
  }
  // bare slug.md → assume node
  const bare = stripped.match(/^([^\/#]+)(#.*)?$/)
  if (bare && !stripped.includes('/')) {
    return `#/node/${encodeURIComponent(bare[1])}${bare[2] || ''}`
  }
  return null
}

export function renderMarkdown(text) {
  const html = marked.parse(text || '')
  const clean = DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'rel'],
  })
  return rewriteInternalLinks(clean)
}
