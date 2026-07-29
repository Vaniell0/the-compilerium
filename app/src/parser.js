import yaml from 'js-yaml'

const FM_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?/

export function parseFrontmatter(text) {
  const m = text.match(FM_RE)
  if (!m) return {}
  try {
    return yaml.load(m[1], { schema: yaml.JSON_SCHEMA }) ?? {}
  } catch {
    return {}
  }
}

export function stripFrontmatter(text) {
  return text.replace(FM_RE, '')
}

const CLAIM_LINE_RE =
  /\*\*([A-Z][A-Z0-9_-]*)\*\*\s*([\u{1F7E2}\u{1F7E1}\u{1F7E0}\u{1F534}])\s*[—–-]+\s*(.+)/u

export function parseClaims(text) {
  const body = stripFrontmatter(text)
  const claims = []
  for (const line of body.split('\n')) {
    const m = line.match(CLAIM_LINE_RE)
    if (m) claims.push({ id: m[1], emoji: m[2], text: m[3].trim() })
  }
  return claims
}

// Remove lines that match the claim pattern. Used when rendering a prose
// section that happens to contain claim lines (e.g., "Key decisions" on
// people pages), so we never render a claim as both prose and a card.
export function stripClaimLines(body) {
  if (!body) return ''
  return body
    .split('\n')
    .filter(line => !CLAIM_LINE_RE.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Extract H2 sections from body, preserving inner markdown as raw text.
// Returns [{title, body}]. Claims section is included; caller can filter it out.
export function parseSections(text) {
  const body = stripFrontmatter(text)
  const lines = body.split('\n')
  const out = []
  let cur = null
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      if (cur) out.push(cur)
      cur = { title: h2[1].trim(), body: '' }
    } else if (cur) {
      cur.body += line + '\n'
    }
  }
  if (cur) out.push(cur)
  for (const s of out) s.body = s.body.replace(/^\s+|\s+$/g, '')
  return out
}

// Parse Timeline section body into events [{year, text}].
// Accepts "- 2003 — text" or "- 2003 - text" or "* 2003: text".
export function parseTimeline(sectionBody) {
  if (!sectionBody) return []
  const out = []
  for (const line of sectionBody.split('\n')) {
    const m = line.match(/^\s*[-*]\s+(\d{4})\s*[—–\-:]+\s*(.+)$/)
    if (m) out.push({ year: Number(m[1]), text: m[2].trim() })
  }
  return out
}

// Parse Competence code-fence into a structured object:
// { can_explain, can_apply, can_extend, can_teach, reach: {...}, key_gap }
export function parseCompetence(sectionBody) {
  if (!sectionBody) return null
  const fence = sectionBody.match(/```[\s\S]*?\n([\s\S]*?)```/)
  const src = fence ? fence[1] : sectionBody
  const out = { reach: {} }
  let inReach = false
  let keyGapBuf = null
  for (const raw of src.split('\n')) {
    const line = raw.replace(/\s+$/, '')
    if (!line.trim()) { inReach = false; continue }
    if (keyGapBuf !== null) {
      if (/^\s+/.test(raw)) { keyGapBuf += ' ' + line.trim(); continue }
      out.key_gap = keyGapBuf.trim(); keyGapBuf = null
    }
    const reachStart = line.match(/^reach:\s*$/)
    if (reachStart) { inReach = true; continue }
    if (inReach) {
      const sub = line.match(/^\s+(\w+):\s*(.+)$/)
      if (sub) { out.reach[sub[1]] = sub[2].trim(); continue }
      inReach = false
    }
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) {
      const key = kv[1]; const val = kv[2].trim()
      if (key === 'key_gap') { keyGapBuf = val; continue }
      if (key.startsWith('can_')) out[key] = val
    }
  }
  if (keyGapBuf !== null) out.key_gap = keyGapBuf.trim()
  return out
}
