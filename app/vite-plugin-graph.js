import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

// Build a snapshot of docs/nodes, docs/relations, people, research from disk.
// Emitted to app/public/graph.json (served at BASE_URL + 'graph.json').

const FM_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?/
const CLAIM_RE =
  /\*\*([A-Z][A-Z0-9_-]*)\*\*\s*([\u{1F7E2}\u{1F7E1}\u{1F7E0}\u{1F534}])\s*[—–-]+\s*(.+)/gu

function parseFrontmatter(text) {
  const m = text.match(FM_RE)
  if (!m) return {}
  try { return yaml.load(m[1], { schema: yaml.JSON_SCHEMA }) ?? {} }
  catch { return {} }
}

function stripFrontmatter(text) { return text.replace(FM_RE, '') }

function parseClaims(body) {
  const out = []
  let m
  CLAIM_RE.lastIndex = 0
  while ((m = CLAIM_RE.exec(body)) !== null) {
    out.push({ id: m[1], emoji: m[2], text: m[3].trim() })
  }
  return out
}

function firstOntologyLine(body) {
  const m = body.match(/## Ontology[\s\S]*?\n[-*]\s+(.+)/)
  return m ? m[1].replace(/\*\*/g, '').trim() : ''
}

// For relations: first non-empty paragraph under "## What this is".
function firstRelationLine(body) {
  const m = body.match(/## What this is\s*\n+([^\n#][^\n]*)/)
  return m ? m[1].replace(/\*\*/g, '').trim() : ''
}

// For people/papers: first non-empty paragraph after frontmatter.
function firstProseLine(body) {
  const t = body.replace(/^\s+/, '')
  const m = t.match(/^([^\n#\-*][^\n]{4,})/)
  return m ? m[1].replace(/\*\*/g, '').trim() : ''
}

function readAllMd(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md')) continue
    if (name.startsWith('_')) continue
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (!stat.isFile()) continue
    out.push({ slug: name.replace(/\.md$/, ''), path: full, text: fs.readFileSync(full, 'utf8') })
  }
  return out
}

// Non-destructive: some relation files still carry the legacy shape
// (`a`/`b` instead of `from`/`to`; `axis: structural` instead of the
// `axes: {historical, structural, competence}` boolean map). Synthesize the
// modern shape in the snapshot so downstream code can rely on `from`/`to`
// and `axes`. Legacy fields kept on `fm` for reference; lint reports them.
function normalizeRelationFm(fm) {
  const out = { ...fm }
  if (!out.from && out.a) out.from = out.a
  if (!out.to   && out.b) out.to   = out.b
  if (!out.axes && typeof out.axis === 'string') {
    out.axes = { historical: false, structural: false, competence: false, [out.axis]: true }
  }
  return out
}

function collectEntity(dir, kind) {
  return readAllMd(dir).map(({ slug, path: p, text }) => {
    let fm = parseFrontmatter(text)
    if (kind === 'relation') fm = normalizeRelationFm(fm)
    const body = stripFrontmatter(text)
    const claims = parseClaims(body)
    let hint = ''
    if (kind === 'node') hint = firstOntologyLine(body)
    else if (kind === 'relation') hint = firstRelationLine(body)
    else hint = firstProseLine(body)
    return {
      slug,
      kind,
      path: path.relative(process.cwd(), p),
      fm,
      body,
      ontologyHint: hint,
      claims,
    }
  })
}

// Return a set of tokens (lowercase slugs and their aliases) for wiki-linking.
function buildLinkIndex(entities) {
  const idx = {}
  for (const e of entities) {
    const key = e.slug.toLowerCase()
    idx[key] = { slug: e.slug, kind: e.kind, hint: e.ontologyHint || e.fm.title || '' }
    if (e.fm.aliases && Array.isArray(e.fm.aliases)) {
      for (const alias of e.fm.aliases) {
        idx[String(alias).toLowerCase()] = idx[key]
      }
    }
  }
  return idx
}

// Compute backlinks by scanning claim + section text for mentions of any known slug.
function computeBacklinks(all, linkIdx) {
  const backlinks = {}
  for (const e of all) backlinks[e.kind + ':' + e.slug] = []
  const selfKey = (e) => e.kind + ':' + e.slug
  for (const e of all) {
    const seen = new Set()
    const text = e.body.toLowerCase()
    for (const token of Object.keys(linkIdx)) {
      if (token === e.slug.toLowerCase()) continue
      // word-boundary match, allow hyphens/underscores as part of the word
      const re = new RegExp(`(^|[^a-z0-9_-])${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9_-]|$)`, 'i')
      if (re.test(text)) {
        const target = linkIdx[token]
        const targetKey = target.kind + ':' + target.slug
        if (seen.has(targetKey)) continue
        seen.add(targetKey)
        backlinks[targetKey].push({ from: e.slug, kind: e.kind, hint: e.ontologyHint })
      }
    }
    if (e.fm.from && e.fm.to && e.kind === 'relation') {
      for (const end of [e.fm.from, e.fm.to]) {
        const key = 'node:' + end
        if (backlinks[key]) backlinks[key].push({ from: e.slug, kind: 'relation', hint: e.ontologyHint })
      }
    }
  }
  // Dedupe again defensively
  for (const k of Object.keys(backlinks)) {
    const seen = new Set()
    backlinks[k] = backlinks[k].filter(x => {
      const key = x.kind + ':' + x.from
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }
  return backlinks
}

// Compute per-claim backlinks: which entities mention a given claim id
// in their body, excluding the owner-entity where the claim is declared.
// Also emits the owner map so downstream code can jump from a claim id to
// its home entity in one step.
function computeClaimBacklinks(all, researchByClaim) {
  const CLAIM_ID_RE = /\b[A-Z][A-Z0-9_-]*-C\d+\b/g
  const ownerOf = {}
  for (const e of all) {
    for (const c of e.claims || []) ownerOf[c.id] = { kind: e.kind, slug: e.slug }
  }
  const backlinks = {}
  for (const cid of Object.keys(ownerOf)) backlinks[cid] = []
  const seen = new Set()
  const isResearchBadge = (cid, slug) => {
    const rc = researchByClaim[cid]
    if (!rc) return false
    return rc.supports.includes(slug) || rc.challenges.includes(slug)
  }
  for (const e of all) {
    const selfKey = e.kind + ':' + e.slug
    const matches = e.body.match(CLAIM_ID_RE) || []
    for (const cid of matches) {
      if (!(cid in ownerOf)) continue
      const owner = ownerOf[cid]
      if (owner.kind === e.kind && owner.slug === e.slug) continue
      if (e.kind === 'paper' && isResearchBadge(cid, e.slug)) continue
      const pairKey = cid + '<-' + selfKey
      if (seen.has(pairKey)) continue
      seen.add(pairKey)
      backlinks[cid].push({ from: e.slug, kind: e.kind, hint: e.ontologyHint })
    }
  }
  return { claimBacklinks: backlinks, claimOwners: ownerOf }
}

// Build claim-id → { supports: [research-slug], challenges: [research-slug] }
// from research frontmatter. Enables the reverse direction: on a claim card,
// show which research files evidence or challenge it.
function computeResearchByClaim(research) {
  const idx = {}
  const push = (cid, mode, slug) => {
    if (!idx[cid]) idx[cid] = { supports: [], challenges: [] }
    if (!idx[cid][mode].includes(slug)) idx[cid][mode].push(slug)
  }
  for (const r of research) {
    for (const cid of (r.fm.supports   || [])) push(cid, 'supports',   r.slug)
    for (const cid of (r.fm.challenges || [])) push(cid, 'challenges', r.slug)
  }
  return idx
}

function pack(root) {
  const nodes        = collectEntity(path.join(root, 'docs/nodes'),     'node')
  const relations    = collectEntity(path.join(root, 'docs/relations'), 'relation')
  const people       = collectEntity(path.join(root, 'people'),         'person')
  const contributors = collectEntity(path.join(root, 'contributors'),   'contributor')
  const research     = collectEntity(path.join(root, 'research'),       'paper')

  const all = [...nodes, ...relations, ...people, ...contributors, ...research]
  const linkIdx = buildLinkIndex(all)
  const backlinks = computeBacklinks(all, linkIdx)
  const researchByClaim = computeResearchByClaim(research)
  const { claimBacklinks, claimOwners } = computeClaimBacklinks(all, researchByClaim)

  const trim = (e) => ({
    slug: e.slug,
    kind: e.kind,
    fm: e.fm,
    ontologyHint: e.ontologyHint,
    claims: e.claims,
    body: e.body,
  })

  return {
    generated:    new Date().toISOString(),
    nodes:        nodes.map(trim),
    relations:    relations.map(trim),
    people:       people.map(trim),
    contributors: contributors.map(trim),
    research:     research.map(trim),
    backlinks,
    claimBacklinks,
    claimOwners,
    researchByClaim,
    linkIndex: Object.fromEntries(
      Object.entries(linkIdx).map(([k, v]) => [k, { slug: v.slug, kind: v.kind }])
    ),
  }
}

// Warn-only schema lint. Runs at every rebuild; never fails the build.
// Checks:
//   - Subject nodes missing mandatory frontmatter
//   - Relations using legacy `axes.technical` (renamed to `structural`)
//   - Research files with broken `supports:` / `challenges:` claim IDs
//   - Stub subjects (informational)
function lintSnapshot(snap) {
  const REQ_SUBJECT_FM = ['title', 'capsule', 'domain', 'subdomain', 'type', 'status', 'importance']
  const missingFm = []
  const stubs = []
  for (const n of snap.nodes) {
    if (n.fm.entity && n.fm.entity !== 'subject') continue
    const miss = REQ_SUBJECT_FM.filter(k => !n.fm[k])
    if (miss.length) missingFm.push({ slug: n.slug, miss })
    if (n.fm.status === 'stub') stubs.push(n.slug)
  }

  const legacyAxis = []
  const legacyEndpoints = []
  const legacySingularAxis = []
  for (const r of snap.relations) {
    const ax = r.fm.axes || {}
    if ('technical' in ax && !('structural' in ax)) legacyAxis.push(r.slug)
    if (r.fm.a || r.fm.b) legacyEndpoints.push(r.slug)
    if (typeof r.fm.axis === 'string') legacySingularAxis.push(r.slug)
  }

  const knownClaimIds = new Set()
  for (const e of [...snap.nodes, ...snap.relations, ...snap.people, ...(snap.contributors || [])]) {
    for (const c of e.claims || []) knownClaimIds.add(c.id)
  }
  const brokenRefs = []
  for (const r of snap.research) {
    const check = (arr, kind) => {
      for (const id of (r.fm[arr] || [])) {
        if (!knownClaimIds.has(id)) brokenRefs.push({ slug: r.slug, kind, id })
      }
    }
    check('supports', 'supports')
    check('challenges', 'challenges')
  }

  if (missingFm.length) {
    console.warn(`[graph:lint] subject nodes with missing mandatory fields (${missingFm.length}):`)
    for (const { slug, miss } of missingFm) console.warn(`  · ${slug}: missing ${miss.join(', ')}`)
  }
  if (legacyAxis.length) {
    console.warn(`[graph:lint] relations still using legacy axes.technical (${legacyAxis.length}): ${legacyAxis.join(', ')}`)
  }
  if (legacyEndpoints.length) {
    console.warn(`[graph:lint] relations using legacy a/b endpoints — rename to from/to (${legacyEndpoints.length}): ${legacyEndpoints.join(', ')}`)
  }
  if (legacySingularAxis.length) {
    console.warn(`[graph:lint] relations using singular \`axis:\` — replace with axes: {historical, structural, competence} boolean map (${legacySingularAxis.length}): ${legacySingularAxis.join(', ')}`)
  }
  if (brokenRefs.length) {
    console.warn(`[graph:lint] research with broken claim refs (${brokenRefs.length}):`)
    for (const { slug, kind, id } of brokenRefs) console.warn(`  · ${slug} ${kind}: ${id} not found`)
  }
  if (stubs.length) {
    console.log(`[graph:lint] stub subjects (${stubs.length}): ${stubs.join(', ')}`)
  }
}

function writeSnapshot(rootDir, outPath) {
  const snap = pack(rootDir)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(snap))
  lintSnapshot(snap)
  return snap
}

export default function graphPlugin({ rootDir, outDir }) {
  const outPath = path.join(outDir, 'graph.json')
  let debounce = null
  const rebuild = () => {
    try {
      const snap = writeSnapshot(rootDir, outPath)
      console.log(
        `[graph] ${snap.nodes.length} nodes · ${snap.relations.length} relations · ` +
        `${snap.people.length} people · ${snap.contributors.length} contributors · ` +
        `${snap.research.length} papers`
      )
    } catch (err) {
      console.error('[graph] snapshot failed:', err.message)
    }
  }

  return {
    name: 'compilerium-graph',
    buildStart() { rebuild() },
    configureServer(server) {
      rebuild()
      const watchDirs = ['docs/nodes', 'docs/relations', 'people', 'contributors', 'research']
      for (const d of watchDirs) {
        const abs = path.join(rootDir, d)
        if (fs.existsSync(abs)) server.watcher.add(abs)
      }
      const onChange = (file) => {
        if (!/\.md$/.test(file)) return
        if (!watchDirs.some(d => file.includes(path.sep + d + path.sep) || file.includes('/' + d + '/'))) return
        clearTimeout(debounce)
        debounce = setTimeout(rebuild, 120)
      }
      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)
      server.watcher.on('unlink', onChange)
    },
  }
}
