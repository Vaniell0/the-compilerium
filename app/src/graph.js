import * as d3 from 'd3'
import { domainColor } from './constants.js'

let simulation = null

export function getSimulation() { return simulation }

export function destroyGraph() {
  if (simulation) { simulation.stop(); simulation = null }
}

// axisIndicator returns a CSS-safe class based on which relation axis is present.
function relationClass(rel) {
  if (!rel.fm?.axes) return 'axis-tech'
  if (rel.fm.axes.historical) return 'axis-hist'
  if (rel.fm.axes.competence) return 'axis-comp'
  return 'axis-tech'
}

export function initGraph(svgContainer, tooltipEl, data, onNodeClick, onLinkClick, forces = {}) {
  const distance = Number.isFinite(+forces.distance) ? +forces.distance : 90
  const repel    = Number.isFinite(+forces.repel)    ? +forces.repel    : 180
  destroyGraph()

  const { nodes, relations } = data
  const nodeById = new Map(nodes.map(n => [n.slug, n]))

  const links = (relations || [])
    .filter(r => r.fm?.from && r.fm?.to && nodeById.has(r.fm.from) && nodeById.has(r.fm.to))
    .map(r => ({
      source: r.fm.from, target: r.fm.to,
      id: r.slug, axis: relationClass(r),
      hint: r.ontologyHint || r.slug,
    }))

  const degree = new Map()
  for (const l of links) {
    degree.set(l.source, (degree.get(l.source) || 0) + 1)
    degree.set(l.target, (degree.get(l.target) || 0) + 1)
  }
  const maxDeg = Math.max(1, ...degree.values())

  const rect = svgContainer.getBoundingClientRect()
  const width = rect.width || svgContainer.parentElement?.clientWidth || 900
  const height = rect.height || 600

  svgContainer.setAttribute('width', width)
  svgContainer.setAttribute('height', height)

  const svg = d3.select(svgContainer).attr('viewBox', `0 0 ${width} ${height}`)
  svg.selectAll('*').remove()

  const g = svg.append('g')
  svg.call(
    d3.zoom().scaleExtent([0.2, 4]).on('zoom', e => g.attr('transform', e.transform))
  )

  // Wider invisible hit-area behind each visible link to make hover/click forgiving
  const linkHit = g.append('g')
    .attr('class', 'tc-link-hits')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', 'tc-link-hit')
    .style('cursor', 'pointer')
    .attr('stroke', 'transparent')
    .attr('stroke-width', 12)

  const link = g.append('g')
    .attr('class', 'tc-links')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', d => 'tc-link ' + d.axis)

  linkHit
    .on('mouseenter', function (event, d) {
      link.filter(l => l === d).classed('is-hot', true)
      const tip = d3.select(tooltipEl)
      const sid = typeof d.source === 'object' ? d.source.slug : d.source
      const tid = typeof d.target === 'object' ? d.target.slug : d.target
      tip.style('opacity', '1')
         .style('left', (event.offsetX + 12) + 'px')
         .style('top',  (event.offsetY - 10) + 'px')
         .text(`${sid} → ${tid} · ${d.axis.replace('axis-', '')}`)
    })
    .on('mousemove', function (event) {
      d3.select(tooltipEl)
        .style('left', (event.offsetX + 12) + 'px')
        .style('top',  (event.offsetY - 10) + 'px')
    })
    .on('mouseleave', function (event, d) {
      link.filter(l => l === d).classed('is-hot', false)
      d3.select(tooltipEl).style('opacity', '0')
    })
    .on('click', (event, d) => {
      event.stopPropagation()
      if (onLinkClick) onLinkClick(d.id)
    })

  const node = g.append('g')
    .attr('class', 'tc-nodes')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'tc-node')
    .style('cursor', 'pointer')

  const r = d => 7 + Math.round((degree.get(d.slug) || 0) / maxDeg * 10)

  node.append('circle')
    .attr('r', r)
    .attr('fill', d => domainColor(d.fm?.subdomain || d.fm?.domain))
    .attr('stroke', 'var(--tc-bg)')
    .attr('stroke-width', 1.5)

  node.append('text')
    .text(d => d.slug)
    .attr('y', d => r(d) + 13)
    .attr('text-anchor', 'middle')
    .attr('class', 'tc-node-label')
    .attr('pointer-events', 'none')

  const linkedNodeIds = new Set()

  function buildAdjacency(nodeId) {
    linkedNodeIds.clear()
    linkedNodeIds.add(nodeId)
    for (const l of links) {
      const sid = typeof l.source === 'object' ? l.source.slug : l.source
      const tid = typeof l.target === 'object' ? l.target.slug : l.target
      if (sid === nodeId || tid === nodeId) { linkedNodeIds.add(sid); linkedNodeIds.add(tid) }
    }
  }

  node
    .on('mouseenter', function (event, d) {
      buildAdjacency(d.slug)
      node.select('circle').attr('opacity', n => linkedNodeIds.has(n.slug) ? 1 : 0.2)
      node.select('text').attr('opacity',   n => linkedNodeIds.has(n.slug) ? 1 : 0.2)
      link.attr('opacity', l => {
        const lid = typeof l.source === 'object' ? l.source.slug : l.source
        const rid = typeof l.target === 'object' ? l.target.slug : l.target
        return (lid === d.slug || rid === d.slug) ? 1 : 0.08
      })
      const tip = d3.select(tooltipEl)
      tip.style('opacity', '1')
         .style('left', (event.offsetX + 12) + 'px')
         .style('top',  (event.offsetY - 10) + 'px')
         .text(d.slug + (d.fm?.domain ? ` · ${d.fm.domain}` : ''))
    })
    .on('mousemove', function (event) {
      d3.select(tooltipEl)
        .style('left', (event.offsetX + 12) + 'px')
        .style('top',  (event.offsetY - 10) + 'px')
    })
    .on('mouseleave', function () {
      node.select('circle').attr('opacity', 1)
      node.select('text').attr('opacity',   1)
      link.attr('opacity', 1)
      d3.select(tooltipEl).style('opacity', '0')
    })
    .on('click', (event, d) => {
      event.stopPropagation()
      onNodeClick(d.slug)
    })

  node.call(
    d3.drag()
      .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y })
      .on('end',   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
  )

  simulation = d3.forceSimulation(nodes)
    .force('link',      d3.forceLink(links).id(d => d.slug).distance(distance))
    .force('charge',    d3.forceManyBody().strength(-repel))
    .force('center',    d3.forceCenter(width / 2, height / 2))
    .force('x',         d3.forceX(width / 2).strength(0.04))
    .force('y',         d3.forceY(height / 2).strength(0.04))
    .force('collision', d3.forceCollide().radius(d => r(d) + 6))
    .alphaDecay(0.02)
    .velocityDecay(0.35)
    .on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
      linkHit
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })
}
