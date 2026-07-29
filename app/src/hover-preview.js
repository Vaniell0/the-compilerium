import { getEntity } from './data.js'
import { escHtml, titleCase } from './utils.js'

const OPEN_DELAY = 260
const CLOSE_DELAY = 180

let overlay = null
let openTimer = null
let closeTimer = null
let activeLink = null
let activeKey = null
let lastScrollY = 0
const SCROLL_CLOSE_THRESHOLD = 24

function ensureOverlay() {
  if (overlay) return overlay
  overlay = document.createElement('div')
  overlay.className = 'tc-preview'
  overlay.setAttribute('role', 'tooltip')
  overlay.addEventListener('mouseenter', () => clearTimeout(closeTimer))
  overlay.addEventListener('mouseleave', () => scheduleClose())
  document.body.appendChild(overlay)
  return overlay
}

function kindLabel(kind) {
  if (kind === 'node') return 'Node'
  if (kind === 'relation') return 'Relation'
  if (kind === 'person') return 'Person'
  if (kind === 'paper') return 'Research'
  return titleCase(kind)
}

function renderPreview(kind, slug) {
  const ent = getEntity(kind, slug)
  if (!ent) return null
  const hint = ent.ontologyHint || ent.fm?.title || ''
  const domain = ent.fm?.domain || (kind === 'relation' ? 'relation' : '')
  const type = ent.fm?.type || (kind === 'relation' ? 'relation' : (kind === 'person' ? 'person' : (kind === 'paper' ? 'paper' : '')))
  const claimCount = ent.claims?.length || 0
  return `
    <div class="prev-head">
      <span class="prev-kind">${escHtml(kindLabel(kind))}</span>
      ${type ? `<span class="prev-type">${escHtml(type)}</span>` : ''}
    </div>
    <div class="prev-title">${escHtml(ent.slug)}</div>
    ${hint ? `<p class="prev-hint">${escHtml(hint)}</p>` : ''}
    <div class="prev-foot">
      ${domain ? `<span class="prev-meta">${escHtml(domain)}</span>` : ''}
      ${claimCount ? `<span class="prev-meta">${claimCount} claim${claimCount !== 1 ? 's' : ''}</span>` : ''}
    </div>
  `
}

function position(link, el) {
  const rect = link.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  el.style.visibility = 'hidden'
  el.style.display = 'block'
  el.style.left = '0px'
  el.style.top = '0px'
  const w = el.offsetWidth
  const h = el.offsetHeight
  let left = rect.left + window.scrollX
  let top  = rect.bottom + window.scrollY + 6
  if (left + w > vw - 8) left = vw - w - 8
  if (left < 8) left = 8
  if (rect.bottom + h + 12 > vh) top = rect.top + window.scrollY - h - 6
  el.style.left = left + 'px'
  el.style.top  = top + 'px'
  el.style.visibility = 'visible'
}

function scheduleOpen(link) {
  clearTimeout(closeTimer)
  const key = link.dataset.preview
  if (!key) return
  // If already showing the same target, just keep it visible
  if (key === activeKey && overlay?.classList.contains('is-open')) return
  clearTimeout(openTimer)
  openTimer = setTimeout(() => {
    const [kind, ...rest] = key.split(':')
    const slug = rest.join(':')
    const html = renderPreview(kind, slug)
    if (!html) return
    const el = ensureOverlay()
    el.innerHTML = html
    el.classList.add('is-open')
    activeLink = link
    activeKey = key
    lastScrollY = window.scrollY
    position(link, el)
  }, OPEN_DELAY)
}

function scheduleClose() {
  clearTimeout(openTimer)
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => {
    if (overlay) {
      overlay.classList.remove('is-open')
      overlay.style.display = 'none'
    }
    activeLink = null
    activeKey = null
  }, CLOSE_DELAY)
}

function forceClose() {
  clearTimeout(openTimer)
  clearTimeout(closeTimer)
  if (overlay) {
    overlay.classList.remove('is-open')
    overlay.style.display = 'none'
  }
  activeLink = null
  activeKey = null
}

export function installHoverPreview() {
  if (installHoverPreview._installed) return
  installHoverPreview._installed = true
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('[data-preview]')
    if (!link) return
    if (link === activeLink) { clearTimeout(closeTimer); return }
    scheduleOpen(link)
  })
  document.addEventListener('mouseout', (e) => {
    const link = e.target.closest('[data-preview]')
    if (!link) return
    // Only schedule close if leaving into something that isn't our overlay or the same link
    const to = e.relatedTarget
    if (to && (to.closest?.('.tc-preview') || to === link)) return
    scheduleClose()
  })
  // Close on window scroll beyond a threshold (avoids flicker on tiny scroll jitters or graph ticks)
  window.addEventListener('scroll', () => {
    if (!activeLink) return
    if (Math.abs(window.scrollY - lastScrollY) > SCROLL_CLOSE_THRESHOLD) forceClose()
  }, { passive: true })
  // Close on hashchange (navigation) so preview doesn't linger over new content
  window.addEventListener('hashchange', forceClose)
  // Close on ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') forceClose() })
}
