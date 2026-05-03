import { NextRequest, NextResponse } from 'next/server'

// Re-import the in-memory store from parent (workaround for demo)
// In production, use Prisma instead

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // In-memory demo: handled client-side optimistically
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  return NextResponse.json({ success: true, updated: body })
}
