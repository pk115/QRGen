import { NextRequest, NextResponse } from 'next/server'
import { generateShortCode } from '@/lib/utils'

// In-memory store for demo (replace with Prisma + real DB in production)
interface QRRecord {
  id: string
  userId: string
  name: string
  folder: string
  tags: string
  contentType: string
  config: string
  isDynamic: boolean
  shortCode?: string
  redirectUrl?: string
  scanCount: number
  createdAt: string
}

const store: QRRecord[] = []

// GET /api/qr — list QR codes
export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id') || 'demo-001'
  const { searchParams } = new URL(req.url)
  const folder = searchParams.get('folder')

  const records = store
    .filter((q) => q.userId === userId && (!folder || q.folder === folder))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({ qrCodes: records })
}

// POST /api/qr — create
export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id') || 'demo-001'
  const body = await req.json()
  const { name, contentType, config, folder = 'Default', tags = '', isDynamic = false, redirectUrl } = body

  const record: QRRecord = {
    id: crypto.randomUUID(),
    userId,
    name,
    contentType,
    config,
    folder,
    tags,
    isDynamic,
    scanCount: 0,
    createdAt: new Date().toISOString(),
    ...(isDynamic ? { shortCode: generateShortCode(), redirectUrl } : {}),
  }

  store.push(record)
  return NextResponse.json({ qrCode: record }, { status: 201 })
}
