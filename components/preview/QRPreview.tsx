'use client'

import { useEffect, useRef, useState } from 'react'
import { useQRStore } from '@/store/qr-store'
import { encodeQRContent } from '@/lib/qr-encoder'
import { ExportButtons } from './ExportButtons'
import { AlertCircle } from 'lucide-react'

export function QRPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<{ _canvas?: HTMLCanvasElement; _svg?: SVGElement; clear: () => void } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const { contentType, contentData, style } = useQRStore()

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const render = async () => {
      try {
        const QRCodeStyling = (await import('qr-code-styling')).default
        const content = encodeQRContent(contentType, contentData)

        if (!content.trim()) {
          setError('กรุณาใส่ข้อมูล')
          return
        }

        setError(null)

        const options: Parameters<typeof QRCodeStyling>[0] = {
          width: style.size,
          height: style.size,
          type: 'canvas' as const,
          data: content,
          margin: style.margin,
          qrOptions: {
            errorCorrectionLevel: style.errorCorrectionLevel,
          },
          dotsOptions: {
            color: style.dotsColor,
            type: style.dotsType as 'square',
          },
          backgroundOptions: {
            color: style.backgroundColor,
          },
          cornersSquareOptions: {
            color: style.cornerSquareColor,
            type: style.cornerSquareType as 'square',
          },
          cornersDotOptions: {
            color: style.cornerDotColor,
            type: style.cornerDotType as 'square',
          },
        }

        if (style.logoUrl) {
          options.image = style.logoUrl
          options.imageOptions = {
            crossOrigin: 'anonymous',
            margin: style.logoMargin,
            imageSize: style.logoSize,
          }
        }

        if (qrRef.current) qrRef.current.clear?.()

        const qr = new QRCodeStyling(options)
        qrRef.current = qr as typeof qrRef.current

        if (containerRef.current) {
          containerRef.current.innerHTML = ''
          qr.append(containerRef.current)
          setIsReady(true)
        }
      } catch (err) {
        setError('ไม่สามารถสร้าง QR Code ได้ กรุณาตรวจสอบข้อมูล')
        console.error(err)
      }
    }

    timeout = setTimeout(render, 300)
    return () => clearTimeout(timeout)
  }, [contentType, contentData, style])

  const getCanvas = () =>
    containerRef.current?.querySelector('canvas') ?? null

  return (
    <div className="flex flex-col items-center gap-4">
      {/* QR Display */}
      <div className="relative">
        <div
          ref={containerRef}
          className="rounded-xl overflow-hidden border border-gray-100 shadow-soft"
          style={{ minWidth: 200, minHeight: 200 }}
        />
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl">
            <AlertCircle className="w-8 h-8 text-gray-300 mb-2" />
            <p className="text-xs text-gray-400 text-center px-4">{error}</p>
          </div>
        )}
      </div>

      {/* Export */}
      {isReady && !error && (
        <ExportButtons getCanvas={getCanvas} />
      )}
    </div>
  )
}
