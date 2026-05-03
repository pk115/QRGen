'use client'

import { useRef, useState, useCallback } from 'react'
import { Camera, Upload, X, CheckCircle } from 'lucide-react'

export function QRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const animRef = useRef<number>(0)

  const stopScan = useCallback(() => {
    setScanning(false)
    cancelAnimationFrame(animRef.current)
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
  }, [])

  async function startCamera() {
    setResult(null)
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)
        scanFrame()
      }
    } catch {
      setError('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้กล้อง')
    }
  }

  function scanFrame() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      import('jsqr').then(({ default: jsQR }) => {
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        if (code) {
          setResult(code.data)
          stopScan()
        }
      })
    }
    animRef.current = requestAnimationFrame(scanFrame)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setResult(null)
    setError(null)

    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const { default: jsQR } = await import('jsqr')
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        setResult(code.data)
      } else {
        setError('ไม่พบ QR Code ในรูปภาพ')
      }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div className="space-y-4">
      {/* Camera view */}
      {scanning && (
        <div className="relative rounded-xl overflow-hidden bg-black aspect-square max-w-xs mx-auto">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          <canvas ref={canvasRef} className="hidden" />
          {/* Scan frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-white/80 rounded-xl relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary-400 rounded-br-lg" />
            </div>
          </div>
          <button onClick={stopScan}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!scanning && (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={startCamera}
            className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 transition">
            <Camera className="w-7 h-7" />
            <span className="text-sm font-medium">เปิดกล้อง</span>
          </button>
          <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 transition cursor-pointer">
            <Upload className="w-7 h-7" />
            <span className="text-sm font-medium">อัปโหลดรูป</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">พบ QR Code!</p>
              <p className="text-sm text-green-600 break-all font-mono">{result}</p>
              {result.startsWith('http') && (
                <a href={result} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-primary-600 hover:underline">
                  เปิดลิงก์ →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}
