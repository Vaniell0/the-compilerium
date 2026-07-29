import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/jetbrains-mono'
import './style.css'

import router from './router.js'
import { render as renderHome }     from './views/home-view.js'
import { render as renderGraph }    from './views/graph-view.js'
import { render as renderSettings } from './views/settings-view.js'
import { makeRenderer } from './views/entity-view.js'
import { makeIndex, renderIndexHub } from './views/index-view.js'

const renderNodes        = makeIndex('node')
const renderRelations    = makeIndex('relation')
const renderPeople       = makeIndex('person')
const renderContributors = makeIndex('contributor')
const renderResearch     = makeIndex('paper')
import { destroyGraph } from './graph.js'
import { installPalette } from './palette.js'
import { loadGraph, getClaim } from './data.js'
import { urlSlug } from './utils.js'

router.on('/', (view) => {
  destroyGraph()
  renderHome(view)
})

router.on('/graph', (view) => {
  renderGraph(view)
})

router.on('/index', (view) => {
  destroyGraph()
  renderIndexHub(view)
})

router.on('/nodes', (view) => {
  destroyGraph()
  renderNodes(view)
})

router.on('/relations', (view) => {
  destroyGraph()
  renderRelations(view)
})

router.on('/people', (view) => {
  destroyGraph()
  renderPeople(view)
})

router.on('/contributors', (view) => {
  destroyGraph()
  renderContributors(view)
})

router.on('/research', (view) => {
  destroyGraph()
  renderResearch(view)
})

router.on('/node/:slug', (view, params, fragment) => {
  destroyGraph()
  makeRenderer('node')(view, params, fragment)
})

router.on('/relation/:slug', (view, params, fragment) => {
  destroyGraph()
  makeRenderer('relation')(view, params, fragment)
})

router.on('/person/:slug', (view, params, fragment) => {
  destroyGraph()
  makeRenderer('person')(view, params, fragment)
})

router.on('/contributor/:slug', (view, params, fragment) => {
  destroyGraph()
  makeRenderer('contributor')(view, params, fragment)
})

router.on('/paper/:slug', (view, params, fragment) => {
  destroyGraph()
  makeRenderer('paper')(view, params, fragment)
})

router.on('/settings', (view) => {
  destroyGraph()
  renderSettings(view)
})

// Deep-link fallback: /SLUG-C001 → look up claim, redirect to its entity page
router.on('/:maybeClaim', async (view, params) => {
  const id = params.maybeClaim
  if (!/^[A-Z][A-Z0-9-]*-C\d+$/i.test(id)) {
    view.innerHTML = '<div class="tc-empty"><p>404 — route not found</p><p><a href="#/">← home</a></p></div>'
    return
  }
  try { await loadGraph() } catch { /* fall through */ }
  const hit = getClaim(id.toUpperCase())
  if (hit) {
    const target = `#/${hit.kind}/${urlSlug(hit.entity.slug)}#${id.toUpperCase()}`
    window.location.replace(target)
    return
  }
  view.innerHTML = `<div class="tc-empty">
    <p>No claim found: <code>${id}</code></p>
    <p><a href="#/">← home</a></p>
  </div>`
})

document.querySelectorAll('#tc-header nav a[data-route]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
    router.navigate(a.getAttribute('href'))
  })
})

installPalette()
router.init()
