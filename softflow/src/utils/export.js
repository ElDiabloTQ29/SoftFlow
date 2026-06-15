import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function exportToPNG(filename = 'diagrama') {
  const el = document.querySelector('.react-flow__renderer')
  if (!el) return
  const canvas = await html2canvas(el, {
    backgroundColor: '#0f1117',
    scale: 2,
    useCORS: true,
    logging: false,
  })
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export async function exportToPDF(filename = 'diagrama') {
  const el = document.querySelector('.react-flow__renderer')
  if (!el) return
  const canvas = await html2canvas(el, {
    backgroundColor: '#0f1117',
    scale: 2,
    useCORS: true,
    logging: false,
  })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
  pdf.save(`${filename}.pdf`)
}

export function exportToMermaid(nodes, edges) {
  const lines = ['graph TD']
  nodes.forEach(n => {
    const lbl = `${n.data.label}\\n${n.data.sub || ''}`
    lines.push(`  ${n.id}["${lbl}"]`)
  })
  edges.forEach(e => {
    const style = e.data?.edgeType
    const arr = style === 'dashed' || style === 'dotted' ? '-.->' : '-->'
    const lbl = e.data?.label ? `|${e.data.label}|` : ''
    lines.push(`  ${e.source} ${arr}${lbl} ${e.target}`)
  })
  return lines.join('\n')
}

export function exportToJSON(nodes, edges, diagramName) {
  const data = { name: diagramName, nodes, edges, nodeIdCounter: nodes.length + 10, version: '1.0' }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${diagramName.replace(/\s+/g, '_')}.json`
  a.click()
  URL.revokeObjectURL(url)
}
