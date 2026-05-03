// QR Content Encoders for all content types

export type ContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'location'
  | 'crypto'

export interface UrlData { url: string }
export interface TextData { text: string }
export interface EmailData { to: string; subject?: string; body?: string }
export interface PhoneData { phone: string }
export interface SmsData { phone: string; message?: string }
export interface WifiData {
  ssid: string
  password?: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden?: boolean
}
export interface VCardData {
  firstName: string
  lastName?: string
  phone?: string
  mobile?: string
  email?: string
  company?: string
  title?: string
  website?: string
  address?: string
  city?: string
  country?: string
  note?: string
}
export interface LocationData { lat: string; lng: string; label?: string }
export interface CryptoData {
  currency: 'bitcoin' | 'ethereum' | 'litecoin'
  address: string
  amount?: string
  label?: string
  message?: string
}

export type ContentData =
  | UrlData
  | TextData
  | EmailData
  | PhoneData
  | SmsData
  | WifiData
  | VCardData
  | LocationData
  | CryptoData

export function encodeQRContent(type: ContentType, data: ContentData): string {
  switch (type) {
    case 'url': {
      const d = data as UrlData
      const url = d.url.startsWith('http') ? d.url : `https://${d.url}`
      return url
    }
    case 'text': {
      return (data as TextData).text
    }
    case 'email': {
      const d = data as EmailData
      let str = `mailto:${d.to}`
      const params: string[] = []
      if (d.subject) params.push(`subject=${encodeURIComponent(d.subject)}`)
      if (d.body) params.push(`body=${encodeURIComponent(d.body)}`)
      if (params.length) str += `?${params.join('&')}`
      return str
    }
    case 'phone': {
      return `tel:${(data as PhoneData).phone}`
    }
    case 'sms': {
      const d = data as SmsData
      return d.message ? `smsto:${d.phone}:${d.message}` : `smsto:${d.phone}`
    }
    case 'wifi': {
      const d = data as WifiData
      const enc = d.encryption || 'nopass'
      const pwd = d.password ? d.password : ''
      const hidden = d.hidden ? 'true' : 'false'
      return `WIFI:T:${enc};S:${d.ssid};P:${pwd};H:${hidden};;`
    }
    case 'vcard': {
      const d = data as VCardData
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${d.lastName || ''};${d.firstName};;;`,
        `FN:${d.firstName}${d.lastName ? ' ' + d.lastName : ''}`,
      ]
      if (d.company) lines.push(`ORG:${d.company}`)
      if (d.title) lines.push(`TITLE:${d.title}`)
      if (d.phone) lines.push(`TEL;TYPE=WORK,VOICE:${d.phone}`)
      if (d.mobile) lines.push(`TEL;TYPE=CELL,VOICE:${d.mobile}`)
      if (d.email) lines.push(`EMAIL:${d.email}`)
      if (d.website) lines.push(`URL:${d.website}`)
      if (d.address || d.city || d.country) {
        lines.push(`ADR:;;${d.address || ''};${d.city || ''};;;${d.country || ''}`)
      }
      if (d.note) lines.push(`NOTE:${d.note}`)
      lines.push('END:VCARD')
      return lines.join('\n')
    }
    case 'location': {
      const d = data as LocationData
      return `geo:${d.lat},${d.lng}${d.label ? `?q=${encodeURIComponent(d.label)}` : ''}`
    }
    case 'crypto': {
      const d = data as CryptoData
      let str = `${d.currency}:${d.address}`
      const params: string[] = []
      if (d.amount) params.push(`amount=${d.amount}`)
      if (d.label) params.push(`label=${encodeURIComponent(d.label)}`)
      if (d.message) params.push(`message=${encodeURIComponent(d.message)}`)
      if (params.length) str += `?${params.join('&')}`
      return str
    }
    default:
      return ''
  }
}

export const CONTENT_TYPES: { type: ContentType; label: string; icon: string; description: string }[] = [
  { type: 'url',      label: 'URL / Link',   icon: '🔗', description: 'Website, social media, any link' },
  { type: 'text',     label: 'Plain Text',   icon: '📝', description: 'Any text, paragraph, note' },
  { type: 'email',    label: 'Email',        icon: '📧', description: 'Open mail client with pre-filled fields' },
  { type: 'phone',    label: 'Phone',        icon: '📞', description: 'Dial a phone number' },
  { type: 'sms',      label: 'SMS',          icon: '💬', description: 'Send a pre-written text message' },
  { type: 'wifi',     label: 'WiFi',         icon: '📶', description: 'Connect to WiFi automatically' },
  { type: 'vcard',    label: 'vCard Contact',icon: '👤', description: 'Save contact to phone book' },
  { type: 'location', label: 'GPS Location', icon: '📍', description: 'Open map at coordinates' },
  { type: 'crypto',   label: 'Cryptocurrency',icon: '₿', description: 'Bitcoin, Ethereum, Litecoin payment' },
]
