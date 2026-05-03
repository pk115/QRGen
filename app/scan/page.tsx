import { Navbar } from '@/components/Navbar'
import { QRScanner } from '@/components/scanner/QRScanner'

export default function ScanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">📷 QR Scanner</h1>
            <p className="text-sm text-gray-500">สแกน QR Code ด้วยกล้องหรืออัปโหลดรูปภาพ</p>
          </div>
          <div className="card p-6">
            <QRScanner />
          </div>
        </div>
      </main>
    </>
  )
}
