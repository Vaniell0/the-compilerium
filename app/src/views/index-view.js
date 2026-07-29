import { loadGraph } from '../data.js'
import { DOMAIN_ORDER, domainColor } from '../constants.js'
import { escAttr, escHtml, urlSlug, titleCase } from '../utils.js'

const KIND_ROUTE = {
  node:        'node',
  relation:    'relation',
  person:      'person',
  contributor: 'contributor',
  paper:       'paper',
}

const KIND_TITLE = {
  node:        'Nodes',
  relation:    'Relations',
  person:      'People',
  contributor: 'Contributors',
  paper:       'Research',
}

const KIND_SUB = {
  node:        'The map, one subdomain at a time.',
  relation:    'First-class edges — not owned by either endpoint.',
  person:      'Historical figures whose work shaped these subjects.',
  contributor: 'Authors of this graph.',
  paper:       'Evidence layer — papers, talks, projects that back the claims.',
}

function claimCount(e) { return e.claims?.length || 0 }

function card(e, kind) {
  const domain    = e.fm?.domain || ''
  const subdomain = e.fm?.subdomain || ''
  const color     = domainColor(subdomain || domain)
  const type      = e.fm?.type || ''
  const claims    = claimCount(e)
  const hint      = e.fm?.capsule || e.ontologyHint || ''
  const title     = e.fm?.title || e.slug
  const badge     = subdomain || domain
  const showClaims = kind !== 'paper' && claims > 0
  const route     = KIND_ROUTE[kind] || 'node'
  return `<a class="node-card" href="#/${route}/${urlSlug(e.slug)}" style="--domain-color:${escAttr(color)}">
  <div class="nc-header">
    <span class="nc-name">${escHtml(title)}</span>
    <span class="nc-badges">
      ${type ? `<span class="nc-type">${escHtml(type)}</span>` : ''}
      ${showClaims ? `<span class="nc-claims">${claims}</span>` : ''}
    </span>
  </div>
  ${hint ? `<p class="nc-hint">${escHtml(hint)}</p>` : ''}
  ${badge ? `<span class="nc-domain">${escHtml(badge)}</span>` : ''}
</a>`
}

function groupKey(e) {
  return e.fm?.subdomain || e.fm?.domain || 'other'
}

function pickList(kind, raw) {
  switch (kind) {
    case 'node':        return raw.nodes || []
    case 'relation':    return raw.relations || []
    case 'person':      return raw.people || []
    case 'contributor': return raw.contributors || []
    case 'paper':       return raw.research || []
    default: return []
  }
}

export function makeIndex(kind) {
  return async function render(container) {
    container.innerHTML = `<div class="tc-index-page"><h1 class="tc-index-title">${escHtml(KIND_TITLE[kind] || kind)}</h1><p class="tc-loading">loading…</p></div>`
    try {
      const g = await loadGraph()
      const entities = pickList(kind, g.raw)
      const byGroup = {}
      for (const e of entities) {
        const k = groupKey(e)
        ;(byGroup[k] = byGroup[k] || []).push(e)
      }
      const sortedGroups = [
        ...DOMAIN_ORDER.filter(d => byGroup[d]),
        ...Object.keys(byGroup).filter(d => !DOMAIN_ORDER.includes(d)).sort(),
      ]
      const sections = sortedGroups.map(d => {
        const items = byGroup[d].sort((a, b) => a.slug.localeCompare(b.slug))
        return `<section class="tc-domain-block">
          <h2 class="tc-domain-heading" style="--domain-color:${escAttr(domainColor(d))}">
            <span class="tc-domain-name">${escHtml(titleCase(d))}</span>
            <span class="tc-domain-count">${items.length}</span>
          </h2>
          <div class="nodes-grid">${items.map(e => card(e, kind)).join('')}</div>
        </section>`
      }).join('')
      const empty = entities.length === 0
        ? `<p class="tc-empty"><em>Nothing here yet.</em></p>`
        : ''
      container.innerHTML = `<div class="tc-index-page">
        <header class="tc-index-header">
          <h1 class="tc-index-title">${escHtml(KIND_TITLE[kind] || kind)}</h1>
          <p class="tc-index-sub">${escHtml(KIND_SUB[kind] || '')}</p>
        </header>
        ${empty || sections}
      </div>`
    } catch (err) {
      container.innerHTML = `<div class="tc-empty"><p>Could not load: ${escHtml(err.message)}</p></div>`
    }
  }
}

export async function renderIndexHub(container) {
  container.innerHTML = `<div class="tc-index-page"><h1 class="tc-index-title">Index</h1><p class="tc-loading">loading…</p></div>`
  try {
    const g = await loadGraph()
    const counts = {
      node:        (g.raw.nodes || []).length,
      relation:    (g.raw.relations || []).length,
      person:      (g.raw.people || []).length,
      contributor: (g.raw.contributors || []).length,
      paper:       (g.raw.research || []).length,
    }
    const order = ['node', 'relation', 'person', 'contributor', 'paper']
    const cards = order.map(kind => {
      const route = kind === 'node'      ? 'nodes'
                  : kind === 'relation'  ? 'relations'
                  : kind === 'person'    ? 'people'
                  : kind === 'contributor' ? 'contributors'
                  : 'research'
      return `<a class="node-card tc-hub-card" href="#/${route}" style="--domain-color:${escAttr(domainColor(kind === 'person' ? 'people' : kind))}">
        <div class="nc-header">
          <span class="nc-name">${escHtml(KIND_TITLE[kind])}</span>
          <span class="nc-badges"><span class="nc-claims">${counts[kind]}</span></span>
        </div>
        <p class="nc-hint">${escHtml(KIND_SUB[kind])}</p>
      </a>`
    }).join('')
    container.innerHTML = `<div class="tc-index-page">
      <header class="tc-index-header">
        <h1 class="tc-index-title">Index</h1>
        <p class="tc-index-sub">Every kind of entity in the graph, one listing per kind.</p>
      </header>
      <section class="tc-domain-block">
        <div class="nodes-grid">${cards}</div>
      </section>
    </div>`
  } catch (err) {
    container.innerHTML = `<div class="tc-empty"><p>Could not load: ${escHtml(err.message)}</p></div>`
  }
}
