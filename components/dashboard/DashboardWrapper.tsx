'use client'

import { useQRStore } from '@/store/qr-store'
import { DashboardClient } from './DashboardClient'

export function DashboardWrapper() {
  const { savedQRs } = useQRStore()

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-900">📦 QR Code ที่บันทึกไว้</h1>
        <p className="text-sm text-primary-700 mt-1">
          ข้อมูลเก็บใน Browser ของคุณ — {savedQRs.length} รายการ
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'QR ทั้งหมด',   value: savedQRs.length,                              icon: '🔳' },
          { label: 'URL',           value: savedQRs.filter((q) => q.contentType === 'url').length,   icon: '🔗' },
          { label: 'WiFi',          value: savedQRs.filter((q) => q.contentType === 'wifi').length,  icon: '📶' },
          { label: 'vCard',         value: savedQRs.filter((q) => q.contentType === 'vcard').length, icon: '👤' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <DashboardClient />
    </>
  )
}
