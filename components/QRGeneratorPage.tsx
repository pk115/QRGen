'use client'

import { useEffect, useState } from 'react'
import { useQRStore } from '@/store/qr-store'
import { ContentTypeSelector } from './input-forms/ContentTypeSelector'
import { ActiveForm } from './input-forms/AllForms'
import { CustomizerPanel } from './customizer/CustomizerPanel'
import { QRPreview } from './preview/QRPreview'
import { Undo2, Redo2, RotateCcw, BookmarkPlus, Check } from 'lucide-react'

export function QRGeneratorPage() {
  const { activeTab, setActiveTab, undo, redo, reset, pushHistory, saveQR, historyIndex, history } = useQRStore()
  const [saveModal, setSaveModal] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  function handleSave() {
    const name = saveName.trim() || `QR ${new Date().toLocaleDateString('th-TH')}`
    saveQR(name)
    setSaveModal(false)
    setSaveName('')
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr_320px] gap-6 items-start">

      {/* LEFT PANEL — Content + Style */}
      <div className="card p-4 space-y-4">
        {/* History controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">ตั้งค่า QR</h2>
          <div className="flex items-center gap-1">
            <button onClick={undo} disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition">
              <Undo2 className="w-4 h-4" />
            </button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1}
              title="Redo"
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition">
              <Redo2 className="w-4 h-4" />
            </button>
            <button onClick={reset} title="Reset"
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab — Content vs Style vs Logo */}
        <div className="flex border-b border-gray-100">
          {(['content', 'style', 'logo'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-medium capitalize transition
                ${activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab === 'content' ? '① Content' : tab === 'style' ? '② Style' : '③ Logo'}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <ContentTypeSelector />
            <div className="border-t border-gray-100 pt-4">
              <ActiveForm />
            </div>

            {/* Save to localStorage */}
            <button
              onClick={() => setSaveModal(true)}
              className="w-full py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-hover transition shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
            >
              {justSaved ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              {justSaved ? 'บันทึกแล้ว!' : 'บันทึก QR นี้'}
            </button>
            <button
              onClick={pushHistory}
              className="w-full py-2 bg-primary-100 text-primary-700 text-xs font-medium rounded-xl hover:bg-primary-200 transition"
            >
              📌 Snapshot ชั่วคราว (Ctrl+Z เพื่อย้อนกลับ)
            </button>
          </div>
        )}

        {/* Style & Logo Tabs */}
        {(activeTab === 'style' || activeTab === 'logo') && (
          <div className="overflow-y-auto max-h-[75vh] pr-1">
            <CustomizerPanel />
          </div>
        )}
      </div>

      {/* CENTER — Live Preview */}
      <div className="card p-6 flex flex-col items-center gap-6 lg:sticky lg:top-20">
        <h2 className="text-sm font-semibold text-gray-700 self-start">ตัวอย่าง QR Code</h2>
        <QRPreview />
      </div>

      {/* RIGHT PANEL — Quick Tips */}
      <div className="space-y-4">
        <div className="card p-4 border-l-4 border-accent">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">💡 เคล็ดลับ</h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex gap-2"><span>💾</span> กด <strong>"บันทึก QR นี้"</strong> เพื่อเก็บใน Browser</li>
            <li className="flex gap-2"><span>🔗</span> ใส่ https:// ก่อน URL เสมอ</li>
            <li className="flex gap-2"><span>🎨</span> เพิ่ม Logo → ใช้ Error Correction H</li>
            <li className="flex gap-2"><span>📐</span> ดาวน์โหลด SVG สำหรับพิมพ์ขนาดใหญ่</li>
            <li className="flex gap-2"><span>📶</span> WiFi QR ช่วยให้เชื่อมต่อได้ทันที</li>
            <li className="flex gap-2"><span>👤</span> vCard บันทึกผู้ติดต่อในคลิกเดียว</li>
          </ul>
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">📊 Error Correction</h3>
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex justify-between"><span>L — Low</span><span className="text-gray-400">7% recovery</span></div>
            <div className="flex justify-between"><span>M — Medium</span><span className="text-gray-400">15% recovery</span></div>
            <div className="flex justify-between"><span>Q — Quartile</span><span className="text-gray-400">25% recovery</span></div>
            <div className="flex justify-between font-bold text-accent"><span>H — High</span><span>30% — แนะนำกับ Logo</span></div>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">⌨️ Shortcuts</h3>
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex justify-between"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Ctrl+Z</kbd><span>Undo</span></div>
            <div className="flex justify-between"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Ctrl+Y</kbd><span>Redo</span></div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {saveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-bold text-gray-800 mb-1">💾 บันทึก QR Code</h3>
            <p className="text-xs text-gray-400 mb-4">ตั้งชื่อเพื่อให้จำง่ายขึ้น (ไม่ตั้งก็ได้)</p>
            <input
              type="text"
              placeholder="เช่น: QR หน้าร้าน, WiFi ออฟฟิศ..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="input-base mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setSaveModal(false); setSaveName('') }}
                className="flex-1 py-2.5 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 text-sm font-bold rounded-xl bg-accent text-white hover:bg-accent-hover transition"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
