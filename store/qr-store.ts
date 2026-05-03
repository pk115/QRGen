'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ContentType, ContentData } from '@/lib/qr-encoder'

export type DotType = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'
export type CornerSquareType = 'square' | 'extra-rounded' | 'dot'
export type CornerDotType = 'square' | 'dot'
export type GradientType = 'linear' | 'radial'

export interface Gradient {
  type: GradientType
  rotation: number
  colorStops: { offset: number; color: string }[]
}

export interface QRStyle {
  size: number
  margin: number
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  // Dots
  dotsType: DotType
  dotsColor: string
  dotsGradient: Gradient | null
  // Background
  backgroundColor: string
  backgroundAlpha: number
  // Corner Square
  cornerSquareType: CornerSquareType
  cornerSquareColor: string
  // Corner Dot
  cornerDotType: CornerDotType
  cornerDotColor: string
  // Logo
  logoUrl: string
  logoSize: number
  logoMargin: number
  logoBackgroundColor: string
  logoRemoveBackground: boolean
}

export const DEFAULT_STYLE: QRStyle = {
  size: 300,
  margin: 10,
  errorCorrectionLevel: 'M',
  dotsType: 'square',
  dotsColor: '#000000',
  dotsGradient: null,
  backgroundColor: '#ffffff',
  backgroundAlpha: 1,
  cornerSquareType: 'square',
  cornerSquareColor: '#000000',
  cornerDotType: 'square',
  cornerDotColor: '#000000',
  logoUrl: '',
  logoSize: 0.3,
  logoMargin: 5,
  logoBackgroundColor: '#ffffff',
  logoRemoveBackground: false,
}

export const PRESETS: { name: string; style: Partial<QRStyle> }[] = [
  {
    name: 'Classic',
    style: { dotsType: 'square', dotsColor: '#000000', backgroundColor: '#ffffff', cornerSquareType: 'square', cornerDotType: 'square' },
  },
  {
    name: 'Rounded',
    style: { dotsType: 'rounded', dotsColor: '#1a1a2e', backgroundColor: '#ffffff', cornerSquareType: 'extra-rounded', cornerDotType: 'dot' },
  },
  {
    name: 'Ocean',
    style: {
      dotsType: 'dots',
      dotsGradient: { type: 'linear', rotation: 45, colorStops: [{ offset: 0, color: '#0ea5e9' }, { offset: 1, color: '#6366f1' }] },
      dotsColor: '#0ea5e9',
      backgroundColor: '#f0f9ff',
      cornerSquareType: 'dot',
      cornerDotType: 'dot',
      cornerSquareColor: '#0ea5e9',
      cornerDotColor: '#6366f1',
    },
  },
  {
    name: 'Sunset',
    style: {
      dotsType: 'classy-rounded',
      dotsGradient: { type: 'linear', rotation: 135, colorStops: [{ offset: 0, color: '#f97316' }, { offset: 1, color: '#ec4899' }] },
      dotsColor: '#f97316',
      backgroundColor: '#fff7ed',
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#f97316',
      cornerDotType: 'dot',
      cornerDotColor: '#ec4899',
    },
  },
  {
    name: 'Forest',
    style: {
      dotsType: 'classy',
      dotsColor: '#166534',
      backgroundColor: '#f0fdf4',
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#166534',
      cornerDotType: 'dot',
      cornerDotColor: '#4ade80',
    },
  },
  {
    name: 'Midnight',
    style: {
      dotsType: 'extra-rounded',
      dotsColor: '#c4b5fd',
      backgroundColor: '#0f172a',
      cornerSquareType: 'dot',
      cornerSquareColor: '#818cf8',
      cornerDotType: 'dot',
      cornerDotColor: '#c4b5fd',
    },
  },
]

export interface HistoryEntry {
  id: string
  name: string
  contentType: ContentType
  contentData: ContentData
  style: QRStyle
  createdAt: string
}

interface QRStore {
  // Content
  contentType: ContentType
  contentData: ContentData
  // Style
  style: QRStyle
  // UI state
  activeTab: 'content' | 'style' | 'logo'
  // Undo/redo
  history: HistoryEntry[]
  historyIndex: number
  // Saved QR library (localStorage)
  savedQRs: HistoryEntry[]
  // Actions
  setContentType: (type: ContentType) => void
  setContentData: (data: Partial<ContentData>) => void
  setStyle: (style: Partial<QRStyle>) => void
  applyPreset: (preset: Partial<QRStyle>) => void
  setActiveTab: (tab: 'content' | 'style' | 'logo') => void
  pushHistory: () => void
  undo: () => void
  redo: () => void
  reset: () => void
  // Saved QR actions
  saveQR: (name: string) => void
  deleteQR: (id: string) => void
  loadQR: (entry: HistoryEntry) => void
}

const DEFAULT_DATA: Record<ContentType, ContentData> = {
  url:      { url: 'https://example.com' },
  text:     { text: 'Hello, World!' },
  email:    { to: '', subject: '', body: '' },
  phone:    { phone: '' },
  sms:      { phone: '', message: '' },
  wifi:     { ssid: '', password: '', encryption: 'WPA', hidden: false },
  vcard:    { firstName: '', lastName: '', phone: '', email: '', company: '' },
  location: { lat: '13.7563', lng: '100.5018', label: 'Bangkok' },
  crypto:   { currency: 'bitcoin', address: '', amount: '' },
}

export const useQRStore = create<QRStore>()(
  persist(
    (set, get) => ({
      contentType: 'url',
      contentData: { url: 'https://example.com' },
      style: { ...DEFAULT_STYLE },
      activeTab: 'content',
      history: [],
      historyIndex: -1,
      savedQRs: [],

      setContentType: (type) =>
        set({ contentType: type, contentData: DEFAULT_DATA[type] }),

      setContentData: (data) =>
        set((s) => ({ contentData: { ...s.contentData, ...data } as ContentData })),

      setStyle: (style) =>
        set((s) => ({ style: { ...s.style, ...style } })),

      applyPreset: (preset) =>
        set((s) => ({ style: { ...s.style, ...preset } })),

      setActiveTab: (tab) => set({ activeTab: tab }),

      pushHistory: () => {
        const { contentType, contentData, style, history, historyIndex } = get()
        const newEntry: HistoryEntry = {
          id: crypto.randomUUID(),
          name: '',
          contentType,
          contentData: JSON.parse(JSON.stringify(contentData)),
          style: JSON.parse(JSON.stringify(style)),
          createdAt: new Date().toISOString(),
        }
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newEntry)
        set({ history: newHistory.slice(-20), historyIndex: newHistory.length - 1 })
      },

      undo: () => {
        const { history, historyIndex } = get()
        if (historyIndex <= 0) return
        const prev = history[historyIndex - 1]
        set({
          contentType: prev.contentType,
          contentData: JSON.parse(JSON.stringify(prev.contentData)),
          style: JSON.parse(JSON.stringify(prev.style)),
          historyIndex: historyIndex - 1,
        })
      },

      redo: () => {
        const { history, historyIndex } = get()
        if (historyIndex >= history.length - 1) return
        const next = history[historyIndex + 1]
        set({
          contentType: next.contentType,
          contentData: JSON.parse(JSON.stringify(next.contentData)),
          style: JSON.parse(JSON.stringify(next.style)),
          historyIndex: historyIndex + 1,
        })
      },

      reset: () =>
        set({
          contentType: 'url',
          contentData: { url: 'https://example.com' },
          style: { ...DEFAULT_STYLE },
          activeTab: 'content',
        }),

      saveQR: (name: string) => {
        const { contentType, contentData, style, savedQRs } = get()
        const entry: HistoryEntry = {
          id: crypto.randomUUID(),
          name,
          contentType,
          contentData: JSON.parse(JSON.stringify(contentData)),
          style: JSON.parse(JSON.stringify(style)),
          createdAt: new Date().toISOString(),
        }
        set({ savedQRs: [entry, ...savedQRs].slice(0, 100) })
      },

      deleteQR: (id: string) =>
        set((s) => ({ savedQRs: s.savedQRs.filter((q) => q.id !== id) })),

      loadQR: (entry: HistoryEntry) =>
        set({
          contentType: entry.contentType,
          contentData: JSON.parse(JSON.stringify(entry.contentData)),
          style: JSON.parse(JSON.stringify(entry.style)),
          activeTab: 'content',
        }),
    }),
    {
      name: 'qrgen-storage',
      // Only persist savedQRs and current working state (not undo history to keep storage light)
      partialize: (state) => ({
        savedQRs: state.savedQRs,
        contentType: state.contentType,
        contentData: state.contentData,
        style: state.style,
      }),
    }
  )
)
