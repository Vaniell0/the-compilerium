// Home = cover page. Book-metaphor: title + featured claim + inline map.
import { loadGraph } from '../data.js'
import { CONFIDENCE } from '../constants.js'
import { escAttr, escHtml, urlSlug } from '../utils.js'
import { installHoverPreview } from '../hover-preview.js'
import { initGraph } from '../graph.js'
import router from '../router.js'

// Deterministic day-based pick with confidence weighting.
function pickFeaturedClaim(cache) {
  const all = []
  const weight = { orange: 4, yellow: 3, red: 3, green: 1 }
  for (const list of [cache.raw.nodes, cache.raw.relations, cache.raw.people, cache.raw.research]) {
    for (const e of list) {
      const kind = e.kind
      for (const c of (e.claims || [])) {
        const conf = CONFIDENCE[c.emoji]
        if (!conf) continue
        const w = weight[conf.color] || 1
        for (let i = 0; i < w; i++) all.push({ kind, entity: e, claim: c, color: conf.color, confLabel: conf.short })
      }
    }
  }
  if (!all.length) return null
  const day = Math.floor(Date.now() / 86400000)
  return all[day % all.length]
}

function renderHero(cache) {
  const n = cache.raw.nodes.length
  const r = cache.raw.relations.length
  const p = cache.raw.people.length
  const pp = cache.raw.research.length
  return `<header class="hm-hero">
    <p class="hm-eyebrow">A structured map of programming, in typed claims.</p>
    <h1 class="hm-title">The Compilerium</h1>
    <p class="hm-sub">A knowledge graph that measures developer competence through the technologies they use, the connections between them, and the claims we can defend about each.</p>
    <div class="hm-stats">
      <span><strong>${n}</strong> technologies</span>
      <span class="hm-stat-sep">·</span>
      <span><strong>${r}</strong> relations</span>
      <span class="hm-stat-sep">·</span>
      <span><strong>${p}</strong> people</span>
      <span class="hm-stat-sep">·</span>
      <span><strong>${pp}</strong> papers</span>
    </div>
  </header>`
}

function renderFeatured(cache) {
  const pick = pickFeaturedClaim(cache)
  if (!pick) return ''
  const href = `#/${pick.kind}/${urlSlug(pick.entity.slug)}#${encodeURIComponent(pick.claim.id)}`
  return `<section class="hm-featured">
    <p class="hm-eyebrow">Claim of the day</p>
    <a class="hm-featured-card claim-card claim-${pick.color}" href="${escAttr(href)}">
      <span class="claim-badge claim-${pick.color}"></span>
      <div class="claim-body">
        <div class="claim-meta">
          <span class="claim-id">${escHtml(pick.claim.id)}</span>
          <span class="claim-conf">${escHtml(pick.confLabel)}</span>
          <span class="hm-featured-from">from <em>${escHtml(pick.entity.slug)}</em></span>
        </div>
        <p class="claim-text">${escHtml(pick.claim.text)}</p>
      </div>
    </a>
  </section>`
}

function renderMap() {
  return `<section class="hm-map">
    <p class="hm-eyebrow">Map</p>
    <div class="hm-map-inner">
      <div class="hm-map-graph">
        <svg id="hm-map-svg" role="img" aria-label="Knowledge graph preview"></svg>
        <div id="hm-map-tip" class="hm-map-tip"></div>
        <a href="#/graph" class="hm-map-expand" aria-label="Open full graph">
          <span class="hm-map-expand-ico">⤢</span>
          <span class="hm-map-expand-label">Full screen</span>
        </a>
        <div class="hm-map-hint-overlay">click a node or an edge to open · drag to reposition</div>
      </div>
    </div>
  </section>`
}

export async function render(container) {
  container.innerHTML = `<div class="tc-loading-page"><p class="tc-loading">Opening cover…</p></div>`
  let cache
  try { cache = await loadGraph() }
  catch (err) {
    container.innerHTML = `<div class="tc-empty">
      <p>Could not load graph: ${escHtml(err.message)}</p>
    </div>`
    return
  }
  container.innerHTML = `<article class="tc-home">
    ${renderHero(cache)}
    ${renderFeatured(cache)}
    ${renderMap()}
  </article>`

  installHoverPreview()

  // Init inline map (small preview, uses the shared simulation module).
  const svg = document.getElementById('hm-map-svg')
  const tip = document.getElementById('hm-map-tip')
  if (svg && tip) {
    initGraph(
      svg, tip,
      { nodes: cache.raw.nodes, relations: cache.raw.relations },
      slug    => router.navigate('#/node/' + encodeURIComponent(slug)),
      relSlug => router.navigate('#/relation/' + encodeURIComponent(relSlug)),
      { distance: 70, repel: 140 },
    )
  }
}
