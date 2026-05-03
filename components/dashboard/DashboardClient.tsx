'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Download, Search, Plus, ExternalLink } from 'lucide-react'
import { useQRStore, HistoryEntry } from '@/store/qr-store'
import { encodeQRContent } from '@/lib/qr-encoder'
import { cn } from '@/lib/utils'

const CONTENT_ICONS: Record<string, string> = {
  url: '🔗', text: '📝', email: '📧', phone: '📞',
  sms: '💬', wifi: '📶', vcard: '👤', location: '📍', crypto: '₿',
}

const CONTENT_LABELS: Record<string, string> = {
  url: 'URL', text: 'Text', email: 'Email', phone: 'Phone',
  sms: 'SMS', wifi: 'WiFi', vcard: 'vCard', location: 'Location', crypto: 'Crypto',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s
}

function getPreview(entry: HistoryEntry): string {
  try {
    const encoded = encodeQRContent(entry.contentType, entry.contentData)
    return truncate(encoded, 60)
  } catch {
    return '—'
  }
}

export function DashboardClient() {
  const { savedQRs, deleteQR, loadQR } = useQRStore()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')

  const types = ['All', ...Array.from(new Set(savedQRs.map((q) => q.contentType)))]

  const filtered = savedQRs.filter((q) => {
    const inType = filterType === 'All' || q.contentType === filterType
    const inSearch =
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      encodeQRContent(q.contentType, q.contentData).toLowerCase().includes(search.toLowerCase())
    return inType && inSearch
  })

  function handleDelete(id: string) {
    if (confirm('ลบ QR Code นี้?')) deleteQR(id)
  }

  return (
    <div className="card p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหา QR Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-9"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border transition',
                filterType === t
                  ? 'bg-primary-700 text-cream border-primary-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
              )}
            >
              {t === 'All' ? 'ทั้งหมด' : (CONTENT_ICONS[t] + ' ' + CONTENT_LABELS[t])}
            </button>
          ))}
        </div>

        {/* New QR */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm rounded-xl hover:bg-accent-hover transition font-bold shadow-lg shadow-accent/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          สร้าง QR ใหม่
        </Link>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-3">🔳</p>
          <p className="text-sm font-medium mb-1">ยังไม่มี QR Code ที่บันทึกไว้</p>
          <p className="text-xs text-gray-400 mb-4">กด "บันทึก QR นี้" ตอนสร้าง เพื่อเก็บไว้ที่นี่</p>
          <Link href="/" className="text-accent hover:underline font-medium text-sm">
            → ไปสร้าง QR Code
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                <th className="pb-2 font-medium">ชื่อ / ข้อมูล</th>
                <th className="pb-2 font-medium">ประเภท</th>
                <th className="pb-2 font-medium hidden sm:table-cell">วันที่บันทึก</th>
                <th className="pb-2 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((qr) => (
                <tr key={qr.id} className="border-b border-gray-50 hover:bg-primary-50/30 transition group">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{CONTENT_ICONS[qr.contentType] || '🔳'}</span>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {qr.name || <span className="text-gray-400 italic">ไม่มีชื่อ</span>}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">{getPreview(qr)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                      {CONTENT_ICONS[qr.contentType]} {CONTENT_LABELS[qr.contentType]}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-400 text-xs hidden sm:table-cell">
                    {formatDate(qr.createdAt)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 justify-end">
                      {/* Load into editor */}
                      <Link
                        href="/"
                        onClick={() => loadQR(qr)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition"
                        title="โหลดเพื่อแก้ไข"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(qr.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
