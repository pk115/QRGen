'use client'

import { saveAs } from 'file-saver'

export async function downloadPNG(canvas: HTMLCanvasElement, filename = 'qrcode', scale = 1) {
  const size = canvas.width * scale
  const offscreen = document.createElement('canvas')
  offscreen.width = size
  offscreen.height = size
  const ctx = offscreen.getContext('2d')!
  ctx.drawImage(canvas, 0, 0, size, size)

  offscreen.toBlob((blob) => {
    if (blob) saveAs(blob, `${filename}.png`)
  }, 'image/png')
}

export async function downloadSVG(svgElement: SVGElement, filename = 'qrcode') {
  const serializer = new XMLSerializer()
  const source = serializer.serializeToString(svgElement)
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
  saveAs(blob, `${filename}.svg`)
}

export async function downloadPDF(canvas: HTMLCanvasElement, filename = 'qrcode') {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const qrSize = 100
  const x = (pageWidth - qrSize) / 2
  const y = (pageHeight - qrSize) / 2

  const imgData = canvas.toDataURL('image/png')
  pdf.addImage(imgData, 'PNG', x, y, qrSize, qrSize)
  pdf.save(`${filename}.pdf`)
}

export async function copyToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject()), 'image/png')
    )
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob }),
    ])
    return true
  } catch {
    return false
  }
}

export function printQR(canvas: HTMLCanvasElement) {
  const imgData = canvas.toDataURL('image/png')
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`
    <html>
      <head><title>Print QR Code</title>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        img { max-width: 400px; max-height: 400px; }
        @media print { body { margin: 0; } }
      </style>
      </head>
      <body>
        <img src="${imgData}" onload="window.print(); window.close();" />
      </body>
    </html>
  `)
  win.document.close()
}
