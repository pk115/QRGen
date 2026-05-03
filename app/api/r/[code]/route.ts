import { NextRequest, NextResponse } from 'next/server'

// Dynamic QR redirect: GET /api/r/:code
// Stub — no DB needed for localStorage-only mode
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  // Without a database, just redirect to home
  return NextResponse.redirect(new URL('/', req.url))
}
