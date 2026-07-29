const routes = []

function parseHash(hash) {
  let raw = hash.replace(/^#/, '') || '/'
  let fragment = ''
  const hashIdx = raw.indexOf('#')
  if (hashIdx >= 0) {
    fragment = raw.slice(hashIdx + 1)
    raw = raw.slice(0, hashIdx)
  }
  if (!raw.startsWith('/')) raw = '/' + raw
  return { path: raw || '/', fragment }
}

function matchRoute(hash) {
  const { path, fragment } = parseHash(hash)
  for (const route of routes) {
    const params = {}
    const pat = route.pattern.split('/')
    const pth = path.split('/')
    if (pat.length !== pth.length) continue
    let ok = true
    for (let i = 0; i < pat.length; i++) {
      if (pat[i].startsWith(':')) {
        try { params[pat[i].slice(1)] = decodeURIComponent(pth[i]) }
        catch { params[pat[i].slice(1)] = pth[i] }
      } else if (pat[i] !== pth[i]) { ok = false; break }
    }
    if (ok) return { handler: route.handler, params, fragment }
  }
  return null
}

let lastPath = ''

const router = {
  on(pattern, handler) { routes.push({ pattern, handler }) },
  navigate(hash) { window.location.hash = hash },
  init() {
    const dispatch = () => {
      const view = document.getElementById('tc-view')
      const hash = window.location.hash || '#/'
      const parsed = parseHash(hash)
      const isNewPath = parsed.path !== lastPath
      const result = matchRoute(hash)
      if (result) {
        result.handler(view, result.params, result.fragment)
      } else {
        view.innerHTML =
          '<div class="tc-empty"><p>404 — route not found</p><p><a href="#/">← home</a></p></div>'
      }
      // Reset scroll on new route, unless caller specified a fragment
      if (isNewPath && !parsed.fragment) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
      lastPath = parsed.path
    }
    window.addEventListener('hashchange', dispatch)
    dispatch()
  },
}

export default router
