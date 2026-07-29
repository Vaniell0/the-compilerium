import { loadGraph } from './data.js'
import { escHtml, escAttr, urlSlug } from './utils.js'

const KIND_LABEL = { node: 'node', relation: 'relation', person: 'person', contributor: 'contributor', paper: 'paper' }

let overlayEl = null
let inputEl = null
let listEl = null
let items = []
let filtered = []
let cursor = 0
let open = false

function ensureBuilt() {
  if (overlayEl) return
  overlayEl = document.createElement('div')
  overlayEl.className = 'tc-palette'
  overlayEl.hidden = true
  overlayEl.innerHTML = `
    <div class="tc-palette-scrim"></div>
    <div class="tc-palette-panel" role="dialog" aria-label="Jump to">
      <input type="text" class="tc-palette-input" placeholder="Jump to a node, relation, person, paper…" autocomplete="off" spellcheck="false" />
      <ul class="tc-palette-list" role="listbox"></ul>
      <footer class="tc-palette-foot">
        <kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> open · <kbd>esc</kbd> close
      </footer>
    </div>
  `
  document.body.appendChild(overlayEl)
  inputEl = overlayEl.querySelector('.tc-palette-input')
  listEl  = overlayEl.querySelector('.tc-palette-list')

  overlayEl.querySelector('.tc-palette-scrim').addEventListener('click', close)
  inputEl.addEventListener('input', () => { cursor = 0; refresh(inputEl.value) })
  inputEl.addEventListener('keydown', onKey)
  listEl.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-href]')
    if (!li) return
    navigate(li.dataset.href)
  })
}

async function ensureItems() {
  if (items.length) return
  const g = await loadGraph()
  const push = (list, kind) => {
    for (const e of list) {
      items.push({
        slug: e.slug,
        kind,
        hint: e.fm?.capsule || e.ontologyHint || e.fm?.title || '',
        href: `#/${kind}/${urlSlug(e.slug)}`,
      })
    }
  }
  push(g.raw.nodes,        'node')
  push(g.raw.relations,    'relation')
  push(g.raw.people,       'person')
  push(g.raw.contributors || [], 'contributor')
  push(g.raw.research,     'paper')
}

function fuzzyScore(item, query) {
  if (!query) return 1
  const q = query.toLowerCase()
  const s = item.slug.toLowerCase()
  if (s === q) return 1000
  if (s.startsWith(q)) return 500 - s.length
  const idx = s.indexOf(q)
  if (idx >= 0) return 200 - idx - s.length
  // token-wise letter presence
  let hits = 0, i = 0
  for (const ch of s) { if (ch === q[i]) { hits++; i++; if (i >= q.length) break } }
  if (i === q.length) return 100 - s.length
  if (item.hint.toLowerCase().includes(q)) return 30
  return -1
}

function refresh(query) {
  const scored = items
    .map(it => ({ ...it, score: fuzzyScore(it, query) }))
    .filter(it => it.score > -1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
  filtered = scored
  if (cursor >= filtered.length) cursor = 0
  render()
}

function render() {
  listEl.innerHTML = filtered.map((it, i) => `
    <li role="option" data-href="${escAttr(it.href)}" class="${i === cursor ? 'is-active' : ''}">
      <span class="pl-kind pl-${escAttr(it.kind)}">${escHtml(KIND_LABEL[it.kind])}</span>
      <span class="pl-slug">${escHtml(it.slug)}</span>
      ${it.hint ? `<span class="pl-hint">${escHtml(it.hint)}</span>` : ''}
    </li>
  `).join('') || `<li class="pl-empty">No matches</li>`
  const active = listEl.querySelector('li.is-active')
  active?.scrollIntoView({ block: 'nearest' })
}

function onKey(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault(); cursor = Math.min(filtered.length - 1, cursor + 1); render()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault(); cursor = Math.max(0, cursor - 1); render()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const it = filtered[cursor]
    if (it) navigate(it.href)
  } else if (e.key === 'Escape') {
    e.preventDefault(); close()
  }
}

async function openPalette() {
  ensureBuilt()
  await ensureItems()
  overlayEl.hidden = false
  open = true
  inputEl.value = ''
  cursor = 0
  refresh('')
  requestAnimationFrame(() => inputEl.focus())
}

function close() {
  if (!overlayEl) return
  overlayEl.hidden = true
  open = false
}

function navigate(href) {
  close()
  window.location.hash = href.replace(/^#/, '')
}

export function installPalette() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      open ? close() : openPalette()
    } else if (e.key === '/' && !open && !isTypingElsewhere(e)) {
      e.preventDefault()
      openPalette()
    }
  })
  const hint = document.getElementById('tc-palette-hint')
  hint?.addEventListener('click', openPalette)
}

function isTypingElsewhere(e) {
  const t = e.target
  return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
}
