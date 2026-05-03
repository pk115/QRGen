import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'QRGen — Free QR Code Generator',
  description: 'สร้าง QR Code ฟรี รองรับ URL, WiFi, vCard, Email, SMS, Crypto และอื่น ๆ',
  keywords: ['QR Code', 'QR Generator', 'Free QR', 'WiFi QR', 'vCard QR'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
