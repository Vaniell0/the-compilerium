import { loadGraph } from '../data.js'
import { DOMAIN_META, domainColor } from '../constants.js'
import { escAttr, escHtml, urlSlug } from '../utils.js'

function claimCount(e) { return e.claims?.length || 0 }

function nodeCard(e) {
  const subdomain = e.fm?.subdomain || e.fm?.domain || ''
  const color     = domainColor(subdomain)
  const type      = e.fm?.type || ''
  const claims    = claimCount(e)
  const hint      = e.fm?.capsule || ''
  const title     = e.fm?.title || e.slug
  return `<a class="node-card" href="#/node/${urlSlug(e.slug)}" style="--domain-color:${escAttr(color)}">
  <div class="nc-header">
    <span class="nc-name">${escHtml(title)}</span>
    <span class="nc-badges">
      ${type ? `<span class="nc-type">${escHtml(type)}</span>` : ''}
      ${claims > 0 ? `<span class="nc-claims">${claims}</span>` : ''}
    </span>
  </div>
  ${hint ? `<p class="nc-hint">${escHtml(hint)}</p>` : ''}
</a>`
}

function relationCard(r) {
  const color = domainColor('relation')
  const title = r.fm?.title || r.slug
  const hint  = r.fm?.capsule || ''
  return `<a class="node-card" href="#/relation/${urlSlug(r.slug)}" style="--domain-color:${escAttr(color)}">
  <div class="nc-header">
    <span class="nc-name">${escHtml(title)}</span>
    <span class="nc-badges">
      ${r.claims?.length > 0 ? `<span class="nc-claims">${r.claims.length}</span>` : ''}
    </span>
  </div>
  ${hint ? `<p class="nc-hint">${escHtml(hint)}</p>` : ''}
</a>`
}

function relatedRelations(nodes, allRelations) {
  const slugSet = new Set(nodes.map(n => n.slug))
  return allRelations.filter(r => {
    const slugs = r.slug.split('__')
    return slugs.some(s => slugSet.has(s))
  })
}

export async function renderDomain(container, params) {
  const slug = params.slug
  const meta = DOMAIN_META[slug]
  const color = domainColor(slug)

  container.innerHTML = `<div class="tc-index-page"><p class="tc-loading">loading…</p></div>`

  let g
  try { g = await loadGraph() }
  catch (err) {
    container.innerHTML = `<div class="tc-empty"><p>Could not load: ${escHtml(err.message)}</p></div>`
    return
  }

  const nodes = (g.raw.nodes || []).filter(n => {
    return (n.fm?.subdomain === slug) || (n.fm?.domain === slug && !n.fm?.subdomain)
  }).sort((a, b) => a.slug.localeCompare(b.slug))

  if (!meta && nodes.length === 0) {
    container.innerHTML = `<div class="tc-empty"><p>Domain not found: <code>${escHtml(slug)}</code></p><p><a href="#/nodes">← Nodes</a></p></div>`
    return
  }

  const title   = meta?.title   || slug
  const capsule = meta?.capsule || ''

  const orderSlugs = meta?.readingOrder || []
  const orderedNodes = [
    ...orderSlugs.map(s => nodes.find(n => n.slug === s)).filter(Boolean),
    ...nodes.filter(n => !orderSlugs.includes(n.slug)),
  ]

  const rels = relatedRelations(nodes, g.raw.relations || [])

  const readingOrderSection = orderSlugs.length > 0 ? `
  <section class="tc-domain-block">
    <h2 class="tc-domain-heading" style="--domain-color:${escAttr(color)}">
      <span class="tc-domain-name">Reading order</span>
    </h2>
    <ol class="tc-reading-order">
      ${orderSlugs.map((s, i) => {
        const n = nodes.find(x => x.slug === s)
        if (!n) return ''
        const t = n.fm?.title || s
        return `<li><a href="#/node/${urlSlug(s)}">${escHtml(t)}</a></li>`
      }).join('')}
    </ol>
  </section>` : ''

  const nodesSection = `
  <section class="tc-domain-block">
    <h2 class="tc-domain-heading" style="--domain-color:${escAttr(color)}">
      <span class="tc-domain-name">Nodes</span>
      <span class="tc-domain-count">${nodes.length}</span>
    </h2>
    <div class="nodes-grid">${orderedNodes.map(nodeCard).join('')}</div>
  </section>`

  const relSection = rels.length > 0 ? `
  <section class="tc-domain-block">
    <h2 class="tc-domain-heading" style="--domain-color:${escAttr(color)}">
      <span class="tc-domain-name">Relations</span>
      <span class="tc-domain-count">${rels.length}</span>
    </h2>
    <div class="nodes-grid">${rels.map(relationCard).join('')}</div>
  </section>` : ''

  container.innerHTML = `<div class="tc-index-page">
    <header class="tc-index-header">
      <h1 class="tc-index-title" style="color:${escAttr(color)}">${escHtml(title)}</h1>
      ${capsule ? `<p class="tc-index-sub">${escHtml(capsule)}</p>` : ''}
    </header>
    ${readingOrderSection}
    ${nodesSection}
    ${relSection}
  </div>`
}
