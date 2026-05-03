import { NextRequest, NextResponse } from 'next/server'

// Demo analytics — in production connect to real DB (Prisma)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const qrId = searchParams.get('qrId')

  if (qrId) {
    return NextResponse.json({ scans: [], total: 0 })
  }

  return NextResponse.json({ summary: [] })
}
