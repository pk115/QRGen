'use client'

import { useState } from 'react'
import { downloadPNG, downloadPDF, copyToClipboard, printQR } from '@/lib/qr-exporter'
import { useQRStore } from '@/store/qr-store'
import { Download, Copy, Printer, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  getCanvas: () => HTMLCanvasElement | null
}

export function ExportButtons({ getCanvas }: Props) {
  const { contentType, style } = useQRStore()
  const [copied, setCopied] = useState(false)
  const [showPngMenu, setShowPngMenu] = useState(false)

  const filename = `qrcode-${contentType}-${Date.now()}`

  async function handleCopy() {
    const canvas = getCanvas()
    if (!canvas) return
    const ok = await copyToClipboard(canvas)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handlePNG(scale = 1) {
    const canvas = getCanvas()
    if (canvas) await downloadPNG(canvas, filename, scale)
    setShowPngMenu(false)
  }

  async function handlePDF() {
    const canvas = getCanvas()
    if (canvas) await downloadPDF(canvas, filename)
  }

  async function handlePrint() {
    const canvas = getCanvas()
    if (canvas) printQR(canvas)
  }

  return (
    <div className="w-full space-y-2">
      {/* PNG Download with size options */}
      <div className="relative">
        <div className="flex">
          <button
            onClick={() => handlePNG(1)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent text-white text-sm font-bold rounded-l-xl hover:bg-accent-hover transition shadow-lg shadow-accent/20"
          >
            <Download className="w-4 h-4" />
            Download PNG ({style.size}px)
          </button>
          <button
            onClick={() => setShowPngMenu(!showPngMenu)}
            className="px-3 bg-accent-hover text-white rounded-r-xl hover:opacity-80 transition border-l border-white/20"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        {showPngMenu && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-100 rounded-xl shadow-card overflow-hidden">
            {[1, 2, 3].map((s) => (
              <button key={s} onClick={() => handlePNG(s)}
                className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 transition">
                PNG {style.size * s}×{style.size * s}px ({s}x)
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Other actions */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={handleCopy}
          className={cn(
            'flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition',
            copied
              ? 'border-green-500 bg-green-50 text-green-600'
              : 'border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
          )}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button onClick={handlePDF}
          className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 transition">
          <Download className="w-4 h-4" />
          PDF
        </button>

        <button onClick={handlePrint}
          className="flex flex-col items-center gap-1 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 transition">
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>
    </div>
  )
}
