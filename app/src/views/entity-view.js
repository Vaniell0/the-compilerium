import { loadGraph, getEntity, getBacklinks, getLinkIndex, getClaimBacklinks, getResearchByClaim } from '../data.js'
import { parseSections, parseTimeline, parseCompetence, stripClaimLines } from '../parser.js'
import { renderMarkdown } from '../markdown.js'
import { linkifyElement } from '../linkify.js'
import { installHoverPreview } from '../hover-preview.js'
import { CONFIDENCE, domainColor } from '../constants.js'
import { escHtml, escAttr, urlSlug, titleCase, hrefTo } from '../utils.js'

const KIND_LABEL = {
  node:        'Node',
  relation:    'Relation',
  person:      'Person',
  contributor: 'Contributor',
  paper:       'Research',
}

// Section titles to skip when rendering "the rest of the body" as prose,
// because they get their own components.
const NODE_STRUCTURED_SECTIONS = new Set([
  'Timeline', 'Ontology', 'Competence', 'Claims', 'Relations', 'Sources',
])

const RELATION_STRUCTURED_SECTIONS = new Set([
  'What this is', 'Claims', 'Competence signal', 'Sources',
])

function tag(html, cls) {
  return `<span class="${cls}">${html}</span>`
}

function renderResearchBadges(claimId) {
  const rc = getResearchByClaim(claimId)
  if (!rc.supports.length && !rc.challenges.length) return ''
  const pill = (slug, mode) => {
    const cls = mode === 'supports' ? 'claim-rs-supports' : 'claim-rs-challenges'
    const label = mode === 'supports' ? 'supports' : 'challenges'
    return `<a class="claim-rs ${cls}"
       href="${escAttr(hrefTo('/paper/:slug', { slug }))}"
       data-preview="${escAttr('paper:' + slug)}"
       title="Research ${label} this claim">
      <span class="claim-rs-mode">${escHtml(label)}</span>
      <span class="claim-rs-slug">${escHtml(slug)}</span>
    </a>`
  }
  const pills = [
    ...rc.supports.map(s => pill(s, 'supports')),
    ...rc.challenges.map(s => pill(s, 'challenges')),
  ].join('')
  return `<div class="claim-research">${pills}</div>`
}

function renderClaimBacklinksLine(claimId) {
  const bl = getClaimBacklinks(claimId)
  if (!bl.length) return ''
  const items = bl
    .slice()
    .sort((a, b) => a.from.localeCompare(b.from))
    .map(b => `<a class="claim-cb-link"
                  href="${escAttr(hrefTo('/' + b.kind + '/:slug', { slug: b.from }))}"
                  data-preview="${escAttr(b.kind + ':' + b.from)}">${escHtml(b.from)}</a>`)
    .join(', ')
  return `<div class="claim-backlinks"><span class="claim-cb-label">cited in</span> ${items}</div>`
}

function renderClaimCard(claim) {
  const conf = CONFIDENCE[claim.emoji] || { color: 'default', label: '', short: '' }
  return `<article class="claim-card claim-${conf.color}" id="${escAttr(claim.id)}">
    <span class="claim-badge claim-${conf.color}"></span>
    <div class="claim-body">
      <div class="claim-meta">
        <a class="claim-id" href="#${escAttr(claim.id)}" title="Anchor to this claim">${escHtml(claim.id)}</a>
        <span class="claim-conf" title="${escAttr(conf.label)}">${escHtml(conf.short)}</span>
      </div>
      <p class="claim-text">${escHtml(claim.text)}</p>
      ${renderResearchBadges(claim.id)}
      ${renderClaimBacklinksLine(claim.id)}
    </div>
  </article>`
}

function renderTimeline(events) {
  if (!events.length) return ''
  const items = events.sort((a, b) => a.year - b.year).map(e => `
    <li class="tl-item">
      <span class="tl-year">${escHtml(e.year)}</span>
      <span class="tl-dot"></span>
      <p class="tl-text">${escHtml(e.text)}</p>
    </li>`).join('')
  return `<section id="section-timeline" class="tc-section">
    <h2>Timeline</h2>
    <ol class="tc-timeline">${items}</ol>
  </section>`
}

function reachLevel(v) {
  const s = String(v || '').toLowerCase().trim()
  if (s === 'very high' || s === 'very-high') return 4
  if (s === 'high') return 3
  if (s === 'low')  return 2
  if (s === 'very low' || s === 'very-low') return 1
  return 0
}

function reachClass(v) {
  const l = reachLevel(v)
  return l === 4 ? 'reach-4' : l === 3 ? 'reach-3' : l === 2 ? 'reach-2' : l === 1 ? 'reach-1' : 'reach-0'
}

function renderCompetence(c) {
  if (!c) return ''
  const caps = [
    ['can_explain', 'Explain', 'can articulate what it is and why it matters'],
    ['can_apply',   'Apply',   'can use it to solve real problems'],
    ['can_extend',  'Extend',  'can contribute new material to the subject'],
    ['can_teach',   'Teach',   'can bring another practitioner to competence'],
  ]
  const cards = caps.map(([key, label, hint]) => {
    const desc = c[key] || hint
    const reach = c.reach?.[key] || ''
    return `<div class="cap-card ${reachClass(reach)}">
      <div class="cap-head">
        <span class="cap-label">${escHtml(label)}</span>
        ${reach ? `<span class="cap-reach">${escHtml(reach)}</span>` : ''}
      </div>
      <p class="cap-desc">${escHtml(desc)}</p>
    </div>`
  }).join('')
  const keyGap = c.key_gap ? `<div class="key-gap">
    <span class="kg-label">key gap</span>
    <p class="kg-text">${escHtml(c.key_gap)}</p>
  </div>` : ''
  return `<section id="section-competence" class="tc-section">
    <h2>Competence</h2>
    <div class="cap-grid">${cards}</div>
    ${keyGap}
  </section>`
}

function renderProseSection(title, bodyMd, id) {
  const clean = stripClaimLines(bodyMd)
  if (!clean) return ''
  return `<section id="${escAttr(id)}" class="tc-section tc-prose">
    <h2>${escHtml(title)}</h2>
    ${renderMarkdown(clean)}
  </section>`
}

function renderOntology(ontologyBody) {
  const clean = stripClaimLines(ontologyBody)
  if (!clean) return ''
  return `<section id="section-ontology" class="tc-section tc-ontology">
    <h2>Ontology</h2>
    <div class="ontology-body">${renderMarkdown(clean)}</div>
  </section>`
}

function renderRelations(rels, selfSlug) {
  if (!rels.length) return ''
  const items = rels.map(r => {
    const other = r.other
    const otherSlug = r.fromSlug === selfSlug ? r.toSlug : r.fromSlug
    const outgoing  = r.fromSlug === selfSlug
    const hint = other?.fm?.capsule || other?.ontologyHint || ''
    const color = domainColor(other?.fm?.subdomain || other?.fm?.domain)
    return `<a class="rel-card" href="${escAttr(hrefTo('/relation/:slug', { slug: r.slug }))}"
              data-preview="relation:${escAttr(r.slug)}"
              style="--domain-color:${escAttr(color)}">
      <div class="rel-head">
        <span class="rel-dir" aria-hidden="true">${outgoing ? '↦' : '↤'}</span>
        <span class="rel-other">${escHtml(otherSlug)}</span>
      </div>
      ${hint ? `<p class="rel-hint">${escHtml(hint)}</p>` : ''}
    </a>`
  }).join('')
  return `<section id="section-relations" class="tc-section">
    <h2>Relations</h2>
    <div class="rel-grid">${items}</div>
  </section>`
}

function renderSources(bodyMd) {
  if (!bodyMd) return ''
  const html = renderMarkdown(bodyMd)
  return `<section id="section-sources" class="tc-section tc-sources">
    <h2>Sources</h2>
    ${html}
  </section>`
}

function renderOwnWork(nodeBacklinks) {
  if (!nodeBacklinks.length) return ''
  const items = nodeBacklinks
    .slice()
    .sort((a, b) => a.from.localeCompare(b.from))
    .map(b => {
      const hint = b.hint || ''
      return `<a class="ow-card" href="${escAttr(hrefTo('/node/:slug', { slug: b.from }))}"
                 data-preview="node:${escAttr(b.from)}">
        <span class="ow-title">${escHtml(b.from)}</span>
        ${hint ? `<span class="ow-hint">${escHtml(hint)}</span>` : ''}
      </a>`
    }).join('')
  return `<section id="section-own-work" class="tc-section tc-own-work">
    <h2>Own work</h2>
    <div class="ow-grid">${items}</div>
  </section>`
}

function renderBacklinks(entries) {
  if (!entries.length) return ''
  const byKind = { node: [], relation: [], person: [], contributor: [], paper: [] }
  for (const e of entries) (byKind[e.kind] || (byKind[e.kind] = [])).push(e)
  const kinds = ['node', 'relation', 'person', 'contributor', 'paper'].filter(k => byKind[k]?.length)
  const groups = kinds.map(k => {
    const items = byKind[k].sort((a, b) => a.from.localeCompare(b.from)).map(e => {
      return `<li><a href="${escAttr(hrefTo('/' + k + '/:slug', { slug: e.from }))}"
                     data-preview="${escAttr(k + ':' + e.from)}">${escHtml(e.from)}</a></li>`
    }).join('')
    return `<div class="bl-group">
      <h3 class="bl-kind">${escHtml(KIND_LABEL[k] || k)}s</h3>
      <ul class="bl-list">${items}</ul>
    </div>`
  }).join('')
  return `<section id="section-backlinks" class="tc-section tc-backlinks">
    <h2>Mentioned in</h2>
    <div class="bl-grid">${groups}</div>
  </section>`
}

function renderTOC(sections) {
  if (!sections.length) return ''
  const items = sections.map(s =>
    `<li><a href="#${escAttr(s.id)}">${escHtml(s.label)}</a></li>`
  ).join('')
  return `<nav class="tc-toc" aria-label="Chapter contents">
    <p class="tc-toc-heading">In this chapter</p>
    <ol>${items}</ol>
  </nav>`
}

// Build the list of relations pointing to/from a node
function collectRelations(cache, nodeSlug) {
  const rels = []
  for (const r of cache.raw.relations) {
    const fromSlug = r.fm?.from
    const toSlug   = r.fm?.to
    if (fromSlug !== nodeSlug && toSlug !== nodeSlug) continue
    const otherSlug = fromSlug === nodeSlug ? toSlug : fromSlug
    const other = cache.nodesBySlug.get(otherSlug)
    rels.push({ slug: r.slug, fromSlug, toSlug, other, fm: r.fm })
  }
  return rels.sort((a, b) => a.slug.localeCompare(b.slug))
}

function scrollToFragment(fragment) {
  if (!fragment) return
  requestAnimationFrame(() => {
    const el = document.getElementById(fragment)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.classList.add('is-focused')
    setTimeout(() => el.classList.remove('is-focused'), 2400)
  })
}

// ---------------------------------------------------------------------------
// Kind-specific renderers
// ---------------------------------------------------------------------------

function renderNode(ent, cache) {
  const sections = parseSections(ent.body)
  const bySection = Object.fromEntries(sections.map(s => [s.title, s.body]))
  const timelineEvents = parseTimeline(bySection['Timeline'] || '')
  const competence = parseCompetence(bySection['Competence'] || '')

  const toc = []
  if (timelineEvents.length) toc.push({ id: 'section-timeline', label: 'Timeline' })
  if (bySection['Ontology'])  toc.push({ id: 'section-ontology', label: 'Ontology' })
  if (competence)             toc.push({ id: 'section-competence', label: 'Competence' })
  if (ent.claims?.length)     toc.push({ id: 'section-claims', label: 'Claims' })
  const rels = collectRelations(cache, ent.slug)
  if (rels.length)            toc.push({ id: 'section-relations', label: 'Relations' })
  if (bySection['Sources'])   toc.push({ id: 'section-sources', label: 'Sources' })
  const backlinks = getBacklinks('node', ent.slug)
  if (backlinks.length)       toc.push({ id: 'section-backlinks', label: 'Mentioned in' })

  const otherSections = sections
    .filter(s => !NODE_STRUCTURED_SECTIONS.has(s.title))
    .map(s => renderProseSection(s.title, s.body, 'section-' + s.title.toLowerCase().replace(/\s+/g, '-')))
    .join('')

  const claimsSection = ent.claims?.length ? `<section id="section-claims" class="tc-section">
    <h2>Claims</h2>
    <div class="claims-list">${ent.claims.map(renderClaimCard).join('')}</div>
  </section>` : ''

  return { toc, main: `
    ${renderTimeline(timelineEvents)}
    ${renderOntology(bySection['Ontology'])}
    ${renderCompetence(competence)}
    ${claimsSection}
    ${otherSections}
    ${renderRelations(rels, ent.slug)}
    ${renderSources(bySection['Sources'])}
    ${renderBacklinks(backlinks)}
  `}
}

function renderRelation(ent) {
  const sections = parseSections(ent.body)
  const bySection = Object.fromEntries(sections.map(s => [s.title, s.body]))

  const toc = []
  if (bySection['What this is'])      toc.push({ id: 'section-whatthisis', label: 'What this is' })
  if (ent.claims?.length)             toc.push({ id: 'section-claims', label: 'Claims' })
  if (bySection['Competence signal']) toc.push({ id: 'section-competence-signal', label: 'Competence signal' })
  if (bySection['Sources'])           toc.push({ id: 'section-sources', label: 'Sources' })
  const backlinks = getBacklinks('relation', ent.slug)
  if (backlinks.length)               toc.push({ id: 'section-backlinks', label: 'Mentioned in' })

  const otherSections = sections
    .filter(s => !RELATION_STRUCTURED_SECTIONS.has(s.title))
    .map(s => renderProseSection(s.title, s.body, 'section-' + s.title.toLowerCase().replace(/\s+/g, '-')))
    .join('')

  const claimsSection = ent.claims?.length ? `<section id="section-claims" class="tc-section">
    <h2>Claims</h2>
    <div class="claims-list">${ent.claims.map(renderClaimCard).join('')}</div>
  </section>` : ''

  return { toc, main: `
    ${(() => {
      const clean = stripClaimLines(bySection['What this is'])
      if (!clean) return ''
      return `<section id="section-whatthisis" class="tc-section tc-ontology">
        <h2>What this is</h2>
        <div class="ontology-body">${renderMarkdown(clean)}</div>
      </section>`
    })()}
    ${claimsSection}
    ${bySection['Competence signal'] ? renderProseSection('Competence signal', bySection['Competence signal'], 'section-competence-signal') : ''}
    ${otherSections}
    ${renderSources(bySection['Sources'])}
    ${renderBacklinks(backlinks)}
  `}
}

function renderStubClaims(kind) {
  const label =
    kind === 'paper'       ? 'this paper' :
    kind === 'contributor' ? 'this contributor' :
                             'this person'
  return `<section id="section-claims" class="tc-section tc-section-stub">
    <h2>Claims</h2>
    <p class="tc-stub-text">No typed claims yet about ${escHtml(label)}. Backlinks below show where it is referenced.</p>
  </section>`
}

function renderPersonOrPaper(ent, kind) {
  const sections = parseSections(ent.body)
  const bySection = Object.fromEntries(sections.map(s => [s.title, s.body]))
  // Keep only sections that have prose left after stripping claim lines.
  const proseSections = sections.filter(s =>
    s.title !== 'Sources' && s.title !== 'Claims' && stripClaimLines(s.body).length > 0
  )
  const toc = proseSections.map(s => ({
    id: 'section-' + s.title.toLowerCase().replace(/\s+/g, '-'),
    label: s.title,
  }))
  const hasClaims = ent.claims?.length > 0
  // Research entities never render a Claims section — they back other entities' claims
  // via supports/challenges frontmatter, they don't own claims of their own.
  const showClaims = kind !== 'paper'
  if (showClaims) toc.push({ id: 'section-claims', label: 'Claims' })
  if (bySection['Sources']) toc.push({ id: 'section-sources', label: 'Sources' })
  const allBacklinks = getBacklinks(kind, ent.slug)
  const isPersonLike = kind === 'person' || kind === 'contributor'
  const ownWorkNodes = isPersonLike ? allBacklinks.filter(b => b.kind === 'node') : []
  const otherBacklinks = isPersonLike ? allBacklinks.filter(b => b.kind !== 'node') : allBacklinks
  if (ownWorkNodes.length)   toc.push({ id: 'section-own-work', label: 'Own work' })
  if (otherBacklinks.length) toc.push({ id: 'section-backlinks', label: 'Mentioned in' })

  const otherSections = proseSections
    .map(s => renderProseSection(s.title, s.body, 'section-' + s.title.toLowerCase().replace(/\s+/g, '-')))
    .join('')

  const claimsSection = !showClaims ? '' :
    hasClaims ? `<section id="section-claims" class="tc-section">
      <h2>Claims</h2>
      <div class="claims-list">${ent.claims.map(renderClaimCard).join('')}</div>
    </section>` : renderStubClaims(kind)

  // If no sections at all, render whole body as prose
  const fallback = (!sections.length && ent.body.trim())
    ? renderProseSection('About', ent.body, 'section-about')
    : ''

  return { toc, main: `
    ${otherSections}
    ${fallback}
    ${claimsSection}
    ${renderSources(bySection['Sources'])}
    ${renderOwnWork(ownWorkNodes)}
    ${renderBacklinks(otherBacklinks)}
  `}
}

// ---------------------------------------------------------------------------
// Header block
// ---------------------------------------------------------------------------

function renderHeader(ent, kind) {
  const kindLabel = KIND_LABEL[kind] || titleCase(kind)
  const domain    = ent.fm?.domain    || (kind === 'relation' ? 'relation' : '')
  const subdomain = ent.fm?.subdomain || ''
  const type      = ent.fm?.type      || (kind === 'person' || kind === 'contributor' ? 'person' : (kind === 'paper' ? 'paper' : ''))
  const importance = ent.fm?.importance
  const title     = ent.fm?.title || ent.slug
  const capsule   = ent.fm?.capsule || ent.ontologyHint || ''
  const color     = domainColor(subdomain || domain)
  return `<header class="tc-chapter-head" style="--domain-color:${escAttr(color)}">
    <div class="tc-kindline">
      <span class="tc-kind">${escHtml(kindLabel)}</span>
      ${type ? `<span class="tc-dot">·</span><span class="tc-type">${escHtml(type)}</span>` : ''}
      ${domain ? `<span class="tc-dot">·</span><span class="tc-dm">${escHtml(domain)}</span>` : ''}
      ${subdomain ? `<span class="tc-dot">·</span><span class="tc-sub">${escHtml(subdomain)}</span>` : ''}
      ${importance ? `<span class="tc-dot">·</span><span class="tc-imp">${escHtml(importance)}</span>` : ''}
    </div>
    <h1 class="tc-chapter-title">${escHtml(title)}</h1>
    ${capsule ? `<p class="tc-chapter-sub">${escHtml(capsule)}</p>` : ''}
  </header>`
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export function makeRenderer(kind) {
  return async function render(container, params, fragment) {
    container.innerHTML = `<div class="tc-loading-page"><p class="tc-loading">Opening chapter…</p></div>`
    let cache
    try { cache = await loadGraph() }
    catch (err) {
      container.innerHTML = `<div class="tc-empty">
        <p>Could not load graph: ${escHtml(err.message)}</p>
        <p><a href="#/">← home</a></p>
      </div>`
      return
    }
    const ent = getEntity(kind, params.slug)
    if (!ent) {
      container.innerHTML = `<div class="tc-empty">
        <p>No such ${escHtml(KIND_LABEL[kind] || kind)}: <code>${escHtml(params.slug)}</code></p>
        <p><a href="#/">← home</a></p>
      </div>`
      return
    }

    let content
    if (kind === 'node')          content = renderNode(ent, cache)
    else if (kind === 'relation') content = renderRelation(ent)
    else                          content = renderPersonOrPaper(ent, kind)

    const header = renderHeader(ent, kind)
    container.innerHTML = `<article class="tc-chapter">
      ${header}
      <div class="tc-chapter-body">
        <aside class="tc-chapter-aside">${renderTOC(content.toc)}</aside>
        <div class="tc-chapter-main">${content.main}</div>
      </div>
    </article>`

    // Apply drop cap to first paragraph of Ontology / What this is
    const ontology = container.querySelector('.tc-ontology .ontology-body > p:first-of-type')
    if (ontology && ontology.textContent.trim().length > 40) {
      ontology.classList.add('has-drop-cap')
    }

    // Wire wiki-links across all prose + claim text + timeline
    const linkIndex = getLinkIndex()
    const selfKey = kind + ':' + ent.slug
    container.querySelectorAll(
      '.tc-chapter-sub, .tc-prose, .claim-text, .tl-text, .kg-text, .ontology-body, .rel-hint'
    ).forEach(el => linkifyElement(el, linkIndex, selfKey))

    installHoverPreview()
    scrollToFragment(fragment)

    // Highlight active TOC entry on scroll
    setupTOCHighlight(container)

    // Intercept in-page anchor clicks (TOC, claim IDs) — smooth-scroll only,
    // never a route change. Update history with fragment for shareability.
    container.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      // Skip real route links (#/kind/slug)
      if (href.startsWith('#/')) return
      const id = href.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.classList.add('is-focused')
      setTimeout(() => el.classList.remove('is-focused'), 2400)
      // Update URL with fragment on the current route (no re-dispatch)
      const cur = window.location.hash.split('#').slice(0, 2).join('#') || '#/'
      history.replaceState(null, '', cur + '#' + id)
    })
  }
}

function setupTOCHighlight(container) {
  const links = container.querySelectorAll('.tc-toc a[href^="#"]')
  if (!links.length) return
  const map = new Map()
  for (const a of links) {
    const id = a.getAttribute('href').slice(1)
    const el = document.getElementById(id)
    if (el) map.set(el, a)
  }
  const obs = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        for (const a of links) a.classList.remove('is-active')
        map.get(e.target)?.classList.add('is-active')
      }
    }
  }, { rootMargin: '-30% 0px -60% 0px' })
  for (const el of map.keys()) obs.observe(el)
}
