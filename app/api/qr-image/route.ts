import { NextRequest, NextResponse } from 'next/server'

// GET /api/qr-image?data=xxx&size=300 — server-side QR generation (basic, no styling)
// For full styled QR, generation is client-side via qr-code-styling
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const data = searchParams.get('data') || 'https://example.com'
  const size = Math.min(parseInt(searchParams.get('size') || '300'), 1000)

  // Return a minimal SVG QR placeholder — actual generation is client-side
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="white"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#888">
      QR: ${data.slice(0, 30)}
    </text>
  </svg>`

  return new NextResponse(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' },
  })
}
