// Central data access — reads the prebuilt graph.json snapshot.
// Everything is served offline after first load.

let cache = null
let loadPromise = null

function graphUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/graph.json'
}

export function loadGraph() {
  if (cache) return Promise.resolve(cache)
  if (loadPromise) return loadPromise
  loadPromise = fetch(graphUrl(), { cache: 'no-cache' })
    .then(r => {
      if (!r.ok) throw new Error(`graph.json ${r.status}`)
      return r.json()
    })
    .then(data => {
      const contributors = data.contributors || []
      const nodesBySlug        = new Map(data.nodes.map(n => [n.slug, n]))
      const relationsBySlug    = new Map(data.relations.map(r => [r.slug, r]))
      const peopleBySlug       = new Map(data.people.map(p => [p.slug, p]))
      const contributorsBySlug = new Map(contributors.map(c => [c.slug, c]))
      const papersBySlug       = new Map(data.research.map(p => [p.slug, p]))
      const claimIndex = new Map()
      const kindLists = [
        ['node',        data.nodes],
        ['relation',    data.relations],
        ['person',      data.people],
        ['contributor', contributors],
        ['paper',       data.research],
      ]
      for (const [kind, list] of kindLists) {
        for (const e of list) {
          for (const c of (e.claims || [])) {
            claimIndex.set(c.id, { kind, entity: e, claim: c })
          }
        }
      }
      cache = {
        raw: data,
        nodesBySlug, relationsBySlug, peopleBySlug, contributorsBySlug, papersBySlug,
        claimIndex,
      }
      return cache
    })
    .catch(err => { loadPromise = null; throw err })
  return loadPromise
}

export function getEntity(kind, slug) {
  if (!cache) return null
  switch (kind) {
    case 'node':        return cache.nodesBySlug.get(slug)
    case 'relation':    return cache.relationsBySlug.get(slug)
    case 'person':      return cache.peopleBySlug.get(slug)
    case 'contributor': return cache.contributorsBySlug.get(slug)
    case 'paper':       return cache.papersBySlug.get(slug)
    default: return null
  }
}

export function getBacklinks(kind, slug) {
  if (!cache) return []
  return cache.raw.backlinks[kind + ':' + slug] || []
}

export function getLinkIndex() {
  return cache?.raw.linkIndex || {}
}

export function getClaim(id) {
  return cache?.claimIndex.get(id) || null
}

export function getClaimBacklinks(id) {
  return cache?.raw.claimBacklinks?.[id] || []
}

export function getResearchByClaim(id) {
  return cache?.raw.researchByClaim?.[id] || { supports: [], challenges: [] }
}

export function getGenerated() {
  return cache?.raw.generated || null
}
