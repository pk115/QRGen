import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { QRGeneratorPage } from '@/components/QRGeneratorPage'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Image
                src="/images/logo.png"
                alt="Uncle Dev Logo"
                width={56}
                height={56}
                className="rounded-full ring-2 ring-accent/30 shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-extrabold text-primary-900 mb-2 tracking-tight">
              <span className="text-accent">QR</span> Generator
            </h1>
            <p className="text-primary-700 font-medium text-sm">
              สร้าง QR Code สไตล์ <span className="text-accent font-bold">Uncle Dev</span> รองรับครบทุกรูปแบบ
            </p>
          </div>
          <QRGeneratorPage />
        </div>
      </main>
    </>
  )
}
