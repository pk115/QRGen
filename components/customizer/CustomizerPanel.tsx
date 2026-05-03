'use client'

import { useRef, useState } from 'react'
import { useQRStore, PRESETS, DotType, CornerSquareType, CornerDotType } from '@/store/qr-store'
import { cn } from '@/lib/utils'
import { Upload, X } from 'lucide-react'
import { SOCIAL_LOGOS, LOGO_CATEGORIES } from '@/lib/social-logos'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{children}</h3>
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-gray-200 p-0.5" />
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="text-xs text-gray-700 w-full bg-transparent border-none outline-none font-mono" />
      </div>
    </div>
  )
}

const DOT_SHAPES: { value: DotType; label: string }[] = [
  { value: 'square',        label: '■ Square' },
  { value: 'rounded',       label: '▪ Rounded' },
  { value: 'dots',          label: '• Dots' },
  { value: 'classy',        label: '◆ Classy' },
  { value: 'classy-rounded',label: '◈ Classy R.' },
  { value: 'extra-rounded', label: '◉ Extra R.' },
]

const CORNER_SQ: { value: CornerSquareType; label: string }[] = [
  { value: 'square',        label: '■' },
  { value: 'extra-rounded', label: '◉' },
  { value: 'dot',           label: '●' },
]

const CORNER_DOT: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: '■' },
  { value: 'dot',    label: '●' },
]

export function CustomizerPanel() {
  const { style, setStyle, applyPreset, activeTab } = useQRStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [logoCategory, setLogoCategory] = useState('Social')

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) setStyle({ logoUrl: ev.target.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      {activeTab === 'style' && (
        <div className="space-y-5">
          {/* Presets */}
          <div>
            <SectionTitle>Presets</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.style)}
                  className="px-2.5 py-1 text-xs rounded-full border border-gray-200 bg-white hover:border-primary-400 hover:text-primary-600 transition"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* QR Size */}
          <div>
            <SectionTitle>ขนาด QR</SectionTitle>
            <div className="flex items-center gap-3">
              <input
                type="range" min={150} max={1000} step={50}
                value={style.size}
                onChange={(e) => setStyle({ size: Number(e.target.value) })}
                className="flex-1 accent-primary-600"
              />
              <span className="text-sm text-gray-700 w-16 text-right">{style.size}px</span>
            </div>
          </div>

          {/* Margin */}
          <div>
            <SectionTitle>Margin (Quiet Zone)</SectionTitle>
            <div className="flex items-center gap-3">
              <input type="range" min={0} max={50} step={5} value={style.margin}
                onChange={(e) => setStyle({ margin: Number(e.target.value) })}
                className="flex-1 accent-primary-600" />
              <span className="text-sm text-gray-700 w-10 text-right">{style.margin}</span>
            </div>
          </div>

          {/* Error Correction */}
          <div>
            <SectionTitle>Error Correction Level</SectionTitle>
            <div className="grid grid-cols-4 gap-1">
              {(['L', 'M', 'Q', 'H'] as const).map((l) => (
                <button key={l} onClick={() => setStyle({ errorCorrectionLevel: l })}
                  className={cn('py-1.5 text-xs rounded-lg border transition font-medium',
                    style.errorCorrectionLevel === l
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
                  )}>
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {style.errorCorrectionLevel === 'L' ? 'Low (7%)' : style.errorCorrectionLevel === 'M' ? 'Medium (15%)' : style.errorCorrectionLevel === 'Q' ? 'Quartile (25%)' : 'High (30%) — เหมาะเมื่อมี Logo'}
            </p>
          </div>

          {/* Dot Style */}
          <div>
            <SectionTitle>รูปแบบจุด (Dot Style)</SectionTitle>
            <div className="grid grid-cols-2 gap-1">
              {DOT_SHAPES.map((d) => (
                <button key={d.value} onClick={() => setStyle({ dotsType: d.value })}
                  className={cn('py-1.5 text-xs rounded-lg border transition',
                    style.dotsType === d.value
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-gray-100 text-gray-600 hover:border-primary-200'
                  )}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dot Color */}
          <div>
            <SectionTitle>สีจุด</SectionTitle>
            <ColorInput label="สีจุด QR" value={style.dotsColor} onChange={(v) => setStyle({ dotsColor: v, dotsGradient: null })} />
          </div>

          {/* Background */}
          <div>
            <SectionTitle>พื้นหลัง</SectionTitle>
            <ColorInput label="สีพื้นหลัง" value={style.backgroundColor} onChange={(v) => setStyle({ backgroundColor: v })} />
          </div>

          {/* Corner Square */}
          <div>
            <SectionTitle>มุม QR (Corner Square)</SectionTitle>
            <div className="flex gap-2 mb-2">
              {CORNER_SQ.map((c) => (
                <button key={c.value} onClick={() => setStyle({ cornerSquareType: c.value })}
                  className={cn('flex-1 py-2 text-sm rounded-lg border transition',
                    style.cornerSquareType === c.value
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-gray-100 text-gray-600 hover:border-primary-200'
                  )}>
                  {c.label}
                </button>
              ))}
            </div>
            <ColorInput label="สีมุม" value={style.cornerSquareColor} onChange={(v) => setStyle({ cornerSquareColor: v })} />
          </div>

          {/* Corner Dot */}
          <div>
            <SectionTitle>จุดมุม (Corner Dot)</SectionTitle>
            <div className="flex gap-2 mb-2">
              {CORNER_DOT.map((c) => (
                <button key={c.value} onClick={() => setStyle({ cornerDotType: c.value })}
                  className={cn('flex-1 py-2 text-sm rounded-lg border transition',
                    style.cornerDotType === c.value
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-gray-100 text-gray-600 hover:border-primary-200'
                  )}>
                  {c.label}
                </button>
              ))}
            </div>
            <ColorInput label="สีจุดมุม" value={style.cornerDotColor} onChange={(v) => setStyle({ cornerDotColor: v })} />
          </div>
        </div>
      )}

      {activeTab === 'logo' && (
        <div className="space-y-4">

          {/* Current logo preview + clear */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-14 h-14 rounded-xl border-2 flex items-center justify-center shrink-0 transition',
              style.logoUrl ? 'border-primary-400 bg-white' : 'border-dashed border-gray-200 bg-gray-50'
            )}>
              {style.logoUrl ? (
                <img src={style.logoUrl} alt="logo" className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-xs text-gray-400 text-center leading-tight">ไม่มี<br/>โลโก้</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 mb-1">
                {style.logoUrl ? 'โลโก้ที่เลือก' : 'ยังไม่ได้เลือกโลโก้'}
              </p>
              {style.logoUrl && (
                <button
                  onClick={() => setStyle({ logoUrl: '' })}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition"
                >
                  <X className="w-3 h-3" /> ล้างโลโก้
                </button>
              )}
            </div>
          </div>

          {/* Preset logos */}
          <div>
            <SectionTitle>โลโก้ Social Media</SectionTitle>

            {/* Category tabs */}
            <div className="flex gap-1 mb-2 flex-wrap">
              {LOGO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLogoCategory(cat)}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-full border transition',
                    logoCategory === cat
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-primary-300'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Logo grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {/* None option */}
              <button
                onClick={() => setStyle({ logoUrl: '' })}
                title="ไม่มีโลโก้"
                className={cn(
                  'aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition',
                  !style.logoUrl
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <X className="w-4 h-4 text-gray-400" />
                <span className="text-[9px] text-gray-400">None</span>
              </button>

              {/* Social logos */}
              {SOCIAL_LOGOS.filter((l) => l.category === logoCategory).map((logo) => {
                const isSelected = style.logoUrl === logo.dataUrl
                return (
                  <button
                    key={logo.name}
                    onClick={() => {
                      if (isSelected) {
                        setStyle({ logoUrl: '' })
                      } else {
                        setStyle({
                          logoUrl: logo.dataUrl,
                          errorCorrectionLevel: 'H',
                          logoSize: 0.3,
                          logoMargin: 5,
                        })
                      }
                    }}
                    title={logo.name}
                    className={cn(
                      'aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition p-1',
                      isSelected
                        ? 'border-primary-500 bg-primary-50 scale-95'
                        : 'border-gray-100 bg-white hover:border-primary-300 hover:scale-105'
                    )}
                  >
                    <img
                      src={logo.dataUrl}
                      alt={logo.name}
                      className="w-7 h-7 object-contain rounded-md"
                    />
                    <span className="text-[9px] text-gray-500 truncate w-full text-center leading-none">
                      {logo.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Upload custom */}
          <div>
            <SectionTitle>อัปโหลดโลโก้เอง</SectionTitle>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-400 hover:border-primary-400 hover:text-primary-500 transition"
            >
              <Upload className="w-4 h-4" />
              <span className="text-xs">คลิกเพื่อเลือกรูป PNG / JPG / SVG</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          </div>

          {/* Adjustments — shown only when logo is selected */}
          {style.logoUrl && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <SectionTitle>ปรับแต่งโลโก้</SectionTitle>

              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>ขนาด</span>
                  <span>{Math.round(style.logoSize * 100)}%</span>
                </div>
                <input type="range" min={10} max={50} step={5}
                  value={Math.round(style.logoSize * 100)}
                  onChange={(e) => setStyle({ logoSize: Number(e.target.value) / 100 })}
                  className="w-full accent-primary-600" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Margin รอบโลโก้</span>
                  <span>{style.logoMargin}px</span>
                </div>
                <input type="range" min={0} max={20} step={1}
                  value={style.logoMargin}
                  onChange={(e) => setStyle({ logoMargin: Number(e.target.value) })}
                  className="w-full accent-primary-600" />
              </div>

              <ColorInput
                label="สีพื้นหลังโลโก้"
                value={style.logoBackgroundColor}
                onChange={(v) => setStyle({ logoBackgroundColor: v })}
              />

              <p className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                💡 เมื่อใช้โลโก้ ควรตั้ง Error Correction เป็น H
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
