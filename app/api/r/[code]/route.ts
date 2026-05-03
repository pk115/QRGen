import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Dynamic QR redirect: GET /api/r/:code
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const qr = await prisma.qRCode.findUnique({ where: { shortCode: params.code } })

  if (!qr || !qr.redirectUrl) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Log scan
  await prisma.qRCode.update({
    where: { id: qr.id },
    data: { scanCount: { increment: 1 } },
  })
  await prisma.scanLog.create({
    data: {
      qrCodeId: qr.id,
      userAgent: req.headers.get('user-agent') ?? undefined,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined,
    },
  })

  return NextResponse.redirect(qr.redirectUrl)
}
