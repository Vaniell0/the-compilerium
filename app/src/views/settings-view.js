import { loadGraph, getGenerated } from '../data.js'
import { escHtml } from '../utils.js'

export async function render(container) {
  container.innerHTML = `<div class="tc-settings-page"><p class="tc-loading">loading…</p></div>`
  try {
    await loadGraph()
    const generated = getGenerated()
    const when = generated ? new Date(generated).toLocaleString() : 'unknown'
    container.innerHTML = `<div class="tc-settings-page">
      <header class="tc-index-header">
        <h1 class="tc-index-title">Settings</h1>
        <p class="tc-index-sub">The graph is baked into the build — offline after first load.</p>
      </header>
      <dl class="tc-info">
        <dt>snapshot generated</dt>
        <dd class="tc-mono">${escHtml(when)}</dd>
        <dt>source</dt>
        <dd class="tc-mono">Vaniell0/the-compilerium</dd>
      </dl>
      <div class="tc-actions">
        <button type="button" class="tc-btn" id="tc-reload">Reload snapshot</button>
      </div>
    </div>`
    document.getElementById('tc-reload').addEventListener('click', () => {
      window.location.reload()
    })
  } catch (err) {
    container.innerHTML = `<div class="tc-empty"><p>Could not load: ${escHtml(err.message)}</p></div>`
  }
}
