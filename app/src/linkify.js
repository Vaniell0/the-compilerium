// Wiki-linker: walks text nodes in a subtree, replaces mentions of known
// entity slugs with anchor tags carrying data-preview for hover-preview.

const STOPWORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'that', 'this', 'not', 'are', 'was',
  'were', 'has', 'have', 'had', 'its', 'but', 'you', 'your', 'can', 'will',
  'all', 'any', 'per', 'via',
])

function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

function targetHref(target) {
  const kind = target.kind === 'paper' ? 'paper' : target.kind
  return `#/${kind}/${encodeURIComponent(target.slug)}`
}

export function linkifyElement(root, linkIndex, selfKey) {
  if (!root || !linkIndex) return
  const tokens = Object.keys(linkIndex)
    .filter(t => t.length >= 3 && !STOPWORDS.has(t))
    .sort((a, b) => b.length - a.length)

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.parentElement) return NodeFilter.FILTER_REJECT
      if (n.parentElement.closest('a, code, pre, .no-linkify')) return NodeFilter.FILTER_REJECT
      if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })
  const textNodes = []
  let n
  while ((n = walker.nextNode())) textNodes.push(n)

  for (const textNode of textNodes) {
    const text = textNode.nodeValue
    const matches = []
    for (const token of tokens) {
      const target = linkIndex[token]
      if (!target) continue
      if (selfKey && (target.kind + ':' + target.slug) === selfKey) continue
      const re = new RegExp(`(^|[^A-Za-z0-9_-])(${escRe(token)})([^A-Za-z0-9_-]|$)`, 'gi')
      let m
      while ((m = re.exec(text)) !== null) {
        matches.push({
          start: m.index + m[1].length,
          end:   m.index + m[1].length + m[2].length,
          matchedText: m[2],
          target,
        })
      }
    }
    if (!matches.length) continue

    matches.sort((a, b) => a.start - b.start || b.end - a.end)
    const chosen = []
    let cursor = 0
    for (const m of matches) {
      if (m.start < cursor) continue
      chosen.push(m)
      cursor = m.end
    }

    const frag = document.createDocumentFragment()
    let idx = 0
    for (const m of chosen) {
      if (m.start > idx) frag.appendChild(document.createTextNode(text.slice(idx, m.start)))
      const a = document.createElement('a')
      a.className = 'wiki-link'
      a.href = targetHref(m.target)
      a.dataset.preview = m.target.kind + ':' + m.target.slug
      a.textContent = m.matchedText
      frag.appendChild(a)
      idx = m.end
    }
    if (idx < text.length) frag.appendChild(document.createTextNode(text.slice(idx)))
    textNode.parentNode.replaceChild(frag, textNode)
  }
}
