import { loadGraph } from '../data.js'
import { initGraph, destroyGraph, getSimulation } from '../graph.js'
import { domainColor } from '../constants.js'
import router from '../router.js'
import { escAttr, escHtml } from '../utils.js'

const STORAGE_KEY = 'tc.graph.settings'
const DEFAULTS = { distance: 90, repel: 180 }

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    return {
      distance: Number.isFinite(+parsed.distance) ? +parsed.distance : DEFAULTS.distance,
      repel:    Number.isFinite(+parsed.repel)    ? +parsed.repel    : DEFAULTS.repel,
    }
  } catch { return { ...DEFAULTS } }
}

function saveSettings(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch { /* quota / private mode */ }
}

function buildLegend(nodes) {
  const keys = [...new Set(nodes.map(n => n.fm?.subdomain || n.fm?.domain).filter(Boolean))]
  return keys.map(k => {
    return `<span class="tc-legend-item">
      <span class="tc-legend-dot" style="background:${escAttr(domainColor(k))}"></span>${escHtml(k)}
    </span>`
  }).join('')
}

export async function render(container) {
  const settings = loadSettings()
  container.innerHTML = `
    <div id="tc-graph-wrap">
      <svg id="tc-svg" role="img" aria-label="Knowledge graph"></svg>
      <div id="tc-tooltip"></div>
    </div>
    <div id="tc-legend" class="tc-legend"></div>
    <div id="tc-graph-controls" class="tc-graph-controls">
      <label>distance <input type="range" id="tc-ctrl-distance" min="40" max="200" value="${settings.distance}" step="5"> <span id="tc-ctrl-distance-val">${settings.distance}</span></label>
      <label>repel <input type="range" id="tc-ctrl-repel" min="50" max="400" value="${settings.repel}" step="10"> <span id="tc-ctrl-repel-val">${settings.repel}</span></label>
      <button type="button" class="tc-ctrl-reset" id="tc-ctrl-reset" title="Reset to defaults">reset</button>
    </div>
  `

  const svgEl    = document.getElementById('tc-svg')
  const tipEl    = document.getElementById('tc-tooltip')
  const legendEl = document.getElementById('tc-legend')
  const wrap     = document.getElementById('tc-graph-wrap')

  const distanceInput = document.getElementById('tc-ctrl-distance')
  const distanceVal   = document.getElementById('tc-ctrl-distance-val')
  const repelInput    = document.getElementById('tc-ctrl-repel')
  const repelVal      = document.getElementById('tc-ctrl-repel-val')
  const resetBtn      = document.getElementById('tc-ctrl-reset')

  distanceInput.addEventListener('input', () => {
    const v = Number(distanceInput.value); distanceVal.textContent = v
    const sim = getSimulation()
    if (sim) { sim.force('link').distance(v); sim.alpha(0.15).restart() }
    saveSettings({ distance: v, repel: Number(repelInput.value) })
  })
  repelInput.addEventListener('input', () => {
    const v = Number(repelInput.value); repelVal.textContent = v
    const sim = getSimulation()
    if (sim) { sim.force('charge').strength(-v); sim.alpha(0.15).restart() }
    saveSettings({ distance: Number(distanceInput.value), repel: v })
  })
  resetBtn.addEventListener('click', () => {
    distanceInput.value = DEFAULTS.distance; distanceVal.textContent = DEFAULTS.distance
    repelInput.value    = DEFAULTS.repel;    repelVal.textContent    = DEFAULTS.repel
    const sim = getSimulation()
    if (sim) {
      sim.force('link').distance(DEFAULTS.distance)
      sim.force('charge').strength(-DEFAULTS.repel)
      sim.alpha(0.3).restart()
    }
    saveSettings({ ...DEFAULTS })
  })

  let lastData = null
  function draw(data) {
    lastData = data
    initGraph(
      svgEl, tipEl, data,
      slug     => router.navigate('#/node/' + encodeURIComponent(slug)),
      relSlug  => router.navigate('#/relation/' + encodeURIComponent(relSlug)),
      { distance: Number(distanceInput.value), repel: Number(repelInput.value) },
    )
    legendEl.innerHTML = buildLegend(data.nodes)
  }

  let resizeTimer = null
  const observer = new ResizeObserver(() => {
    if (!document.contains(svgEl)) { observer.disconnect(); return }
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => { if (lastData) draw(lastData) }, 200)
  })
  observer.observe(wrap)

  try {
    const g = await loadGraph()
    draw({ nodes: g.raw.nodes, relations: g.raw.relations })
  } catch (err) {
    container.innerHTML = `<div class="tc-empty">
      <p>Could not load graph.json: ${escHtml(err.message)}</p>
    </div>`
  }
}
