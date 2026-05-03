// next-auth route placeholder
// To enable full OAuth (Google, GitHub etc.) install next-auth and replace this file:
//
//   npm install next-auth @auth/prisma-adapter
//
// Then use the full NextAuth config from the START.md instructions.
//
// For now, auth is handled by /api/auth/login and /api/auth/logout

export async function GET() {
  return new Response('NextAuth not configured. See /api/auth/login', { status: 404 })
}

export async function POST() {
  return new Response('NextAuth not configured. See /api/auth/login', { status: 404 })
}
