'use client'

import { useQRStore } from '@/store/qr-store'
import {
  UrlData, TextData, EmailData, PhoneData,
  SmsData, WifiData, VCardData, LocationData, CryptoData
} from '@/lib/qr-encoder'

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-gray-500 mb-1">{children}</label>
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="input-base" />
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={3} className="input-base resize-none" />
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select {...props} className="input-base">
      {props.children}
    </select>
  )
}

// ---- URL ----
export function UrlForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as UrlData
  return (
    <div>
      <Label>URL / Link</Label>
      <Input
        type="url"
        placeholder="https://example.com"
        value={d.url}
        onChange={(e) => setContentData({ url: e.target.value })}
      />
    </div>
  )
}

// ---- Text ----
export function TextForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as TextData
  return (
    <div>
      <Label>ข้อความ</Label>
      <Textarea
        placeholder="พิมพ์ข้อความที่ต้องการ..."
        value={d.text}
        onChange={(e) => setContentData({ text: e.target.value })}
      />
      <p className="text-xs text-gray-400 mt-1 text-right">{d.text?.length || 0} ตัวอักษร</p>
    </div>
  )
}

// ---- Email ----
export function EmailForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as EmailData
  return (
    <div className="space-y-3">
      <div><Label>อีเมล (To)</Label><Input type="email" placeholder="recipient@email.com" value={d.to} onChange={(e) => setContentData({ to: e.target.value })} /></div>
      <div><Label>หัวเรื่อง (Subject)</Label><Input placeholder="เรื่อง..." value={d.subject || ''} onChange={(e) => setContentData({ subject: e.target.value })} /></div>
      <div><Label>ข้อความ (Body)</Label><Textarea placeholder="ข้อความในอีเมล..." value={d.body || ''} onChange={(e) => setContentData({ body: e.target.value })} /></div>
    </div>
  )
}

// ---- Phone ----
export function PhoneForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as PhoneData
  return (
    <div>
      <Label>หมายเลขโทรศัพท์</Label>
      <Input type="tel" placeholder="+66812345678" value={d.phone} onChange={(e) => setContentData({ phone: e.target.value })} />
    </div>
  )
}

// ---- SMS ----
export function SmsForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as SmsData
  return (
    <div className="space-y-3">
      <div><Label>หมายเลขโทรศัพท์</Label><Input type="tel" placeholder="+66812345678" value={d.phone} onChange={(e) => setContentData({ phone: e.target.value })} /></div>
      <div><Label>ข้อความ SMS</Label><Textarea placeholder="ข้อความที่จะส่ง..." value={d.message || ''} onChange={(e) => setContentData({ message: e.target.value })} /></div>
    </div>
  )
}

// ---- WiFi ----
export function WifiForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as WifiData
  return (
    <div className="space-y-3">
      <div><Label>ชื่อ WiFi (SSID)</Label><Input placeholder="MyWiFiNetwork" value={d.ssid} onChange={(e) => setContentData({ ssid: e.target.value })} /></div>
      <div><Label>รหัสผ่าน</Label><Input type="password" placeholder="รหัสผ่าน WiFi" value={d.password || ''} onChange={(e) => setContentData({ password: e.target.value })} /></div>
      <div>
        <Label>ประเภทการเข้ารหัส</Label>
        <Select value={d.encryption} onChange={(e) => setContentData({ encryption: e.target.value as WifiData['encryption'] })}>
          <option value="WPA">WPA / WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">ไม่มีรหัสผ่าน</option>
        </Select>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" checked={d.hidden || false} onChange={(e) => setContentData({ hidden: e.target.checked })} className="rounded" />
        WiFi ซ่อนอยู่ (Hidden Network)
      </label>
    </div>
  )
}

// ---- vCard ----
export function VCardForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as VCardData
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div><Label>ชื่อ</Label><Input placeholder="สมชาย" value={d.firstName} onChange={(e) => setContentData({ firstName: e.target.value })} /></div>
        <div><Label>นามสกุล</Label><Input placeholder="ใจดี" value={d.lastName || ''} onChange={(e) => setContentData({ lastName: e.target.value })} /></div>
      </div>
      <div><Label>บริษัท</Label><Input placeholder="บริษัท ABC จำกัด" value={d.company || ''} onChange={(e) => setContentData({ company: e.target.value })} /></div>
      <div><Label>ตำแหน่ง</Label><Input placeholder="Software Engineer" value={d.title || ''} onChange={(e) => setContentData({ title: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-2">
        <div><Label>โทรศัพท์</Label><Input type="tel" placeholder="02-xxx-xxxx" value={d.phone || ''} onChange={(e) => setContentData({ phone: e.target.value })} /></div>
        <div><Label>มือถือ</Label><Input type="tel" placeholder="081-xxx-xxxx" value={d.mobile || ''} onChange={(e) => setContentData({ mobile: e.target.value })} /></div>
      </div>
      <div><Label>อีเมล</Label><Input type="email" placeholder="somchai@example.com" value={d.email || ''} onChange={(e) => setContentData({ email: e.target.value })} /></div>
      <div><Label>เว็บไซต์</Label><Input placeholder="https://example.com" value={d.website || ''} onChange={(e) => setContentData({ website: e.target.value })} /></div>
      <div><Label>ที่อยู่</Label><Input placeholder="123 ถนนสุขุมวิท" value={d.address || ''} onChange={(e) => setContentData({ address: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-2">
        <div><Label>เมือง</Label><Input placeholder="กรุงเทพฯ" value={d.city || ''} onChange={(e) => setContentData({ city: e.target.value })} /></div>
        <div><Label>ประเทศ</Label><Input placeholder="Thailand" value={d.country || ''} onChange={(e) => setContentData({ country: e.target.value })} /></div>
      </div>
      <div><Label>หมายเหตุ</Label><Textarea placeholder="บันทึกเพิ่มเติม..." value={d.note || ''} onChange={(e) => setContentData({ note: e.target.value })} /></div>
    </div>
  )
}

// ---- Location ----
export function LocationForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as LocationData
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div><Label>Latitude</Label><Input type="number" step="any" placeholder="13.7563" value={d.lat} onChange={(e) => setContentData({ lat: e.target.value })} /></div>
        <div><Label>Longitude</Label><Input type="number" step="any" placeholder="100.5018" value={d.lng} onChange={(e) => setContentData({ lng: e.target.value })} /></div>
      </div>
      <div><Label>ชื่อสถานที่ (optional)</Label><Input placeholder="กรุงเทพมหานคร" value={d.label || ''} onChange={(e) => setContentData({ label: e.target.value })} /></div>
      <a
        href={`https://maps.google.com?q=${d.lat},${d.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-primary-600 hover:underline flex items-center gap-1"
      >
        📍 ดูบน Google Maps
      </a>
    </div>
  )
}

// ---- Crypto ----
export function CryptoForm() {
  const { contentData, setContentData } = useQRStore()
  const d = contentData as CryptoData
  return (
    <div className="space-y-3">
      <div>
        <Label>สกุลเงินดิจิทัล</Label>
        <Select value={d.currency} onChange={(e) => setContentData({ currency: e.target.value as CryptoData['currency'] })}>
          <option value="bitcoin">₿ Bitcoin (BTC)</option>
          <option value="ethereum">Ξ Ethereum (ETH)</option>
          <option value="litecoin">Ł Litecoin (LTC)</option>
        </Select>
      </div>
      <div><Label>ที่อยู่ Wallet</Label><Input placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf..." value={d.address} onChange={(e) => setContentData({ address: e.target.value })} /></div>
      <div><Label>จำนวน (optional)</Label><Input type="number" step="any" placeholder="0.001" value={d.amount || ''} onChange={(e) => setContentData({ amount: e.target.value })} /></div>
      <div><Label>ชื่อ / Label (optional)</Label><Input placeholder="ชำระค่าสินค้า" value={d.label || ''} onChange={(e) => setContentData({ label: e.target.value })} /></div>
      <div><Label>ข้อความ (optional)</Label><Input placeholder="ขอบคุณที่ใช้บริการ" value={d.message || ''} onChange={(e) => setContentData({ message: e.target.value })} /></div>
    </div>
  )
}

// ---- Router ----
export function ActiveForm() {
  const { contentType } = useQRStore()
  switch (contentType) {
    case 'url':      return <UrlForm />
    case 'text':     return <TextForm />
    case 'email':    return <EmailForm />
    case 'phone':    return <PhoneForm />
    case 'sms':      return <SmsForm />
    case 'wifi':     return <WifiForm />
    case 'vcard':    return <VCardForm />
    case 'location': return <LocationForm />
    case 'crypto':   return <CryptoForm />
    default:         return null
  }
}
