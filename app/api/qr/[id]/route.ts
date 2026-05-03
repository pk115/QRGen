import { NextRequest, NextResponse } from 'next/server'

// In-memory demo stubs — actual data is in localStorage client-side

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({ success: true, id })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  return NextResponse.json({ success: true, id, updated: body })
}
