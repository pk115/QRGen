// Social media logo presets as inline SVG data URLs
// Each logo is a self-contained SVG with brand colors

function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export interface SocialLogo {
  name: string
  category: string
  dataUrl: string
  bg: string // background color hint
}

const logos: { name: string; category: string; bg: string; svg: string }[] = [
  // ── Social Media ──────────────────────────────────────────────
  {
    name: 'Facebook', category: 'Social', bg: '#1877F2',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#1877F2"/>
      <path d="M57 50h-7v25H40V50h-5V40h5v-6c0-7 3-11 11-11h8v10h-5c-2 0-2 1-2 3v4h7l-2 10z" fill="white"/>
    </svg>`,
  },
  {
    name: 'X (Twitter)', category: 'Social', bg: '#000000',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#000"/>
      <path d="M20 20h18l12 17 14-17h16L61 45l22 35H65L52 61 37 80H20l20-30L20 20zm8 6 38 54h8L36 26h-8z" fill="white"/>
    </svg>`,
  },
  {
    name: 'Instagram', category: 'Social', bg: '#E1306C',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFDC80"/>
          <stop offset="25%" stop-color="#FCAF45"/>
          <stop offset="50%" stop-color="#F77737"/>
          <stop offset="75%" stop-color="#F56040"/>
          <stop offset="100%" stop-color="#C13584"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="20" fill="url(#ig)"/>
      <rect x="25" y="25" width="50" height="50" rx="13" fill="none" stroke="white" stroke-width="5"/>
      <circle cx="50" cy="50" r="13" fill="none" stroke="white" stroke-width="5"/>
      <circle cx="69" cy="31" r="4" fill="white"/>
    </svg>`,
  },
  {
    name: 'LinkedIn', category: 'Social', bg: '#0A66C2',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#0A66C2"/>
      <rect x="20" y="37" width="14" height="43" fill="white"/>
      <circle cx="27" cy="25" r="8" fill="white"/>
      <path d="M45 37h13v6h0c2-4 7-7 14-7 15 0 18 10 18 23v21H76V61c0-5 0-12-7-12s-8 6-8 12v19H47V37z" fill="white"/>
    </svg>`,
  },
  {
    name: 'WhatsApp', category: 'Social', bg: '#25D366',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#25D366"/>
      <path d="M50 18C32 18 18 32 18 50c0 6 2 12 5 17L18 82l16-4c5 3 10 4 16 4 18 0 32-14 32-32S68 18 50 18zm16 43c-1 2-3 4-6 4-5 0-15-5-21-17-2-4-2-7 0-10 1-2 2-2 3-2h2c1 0 2 0 3 2l4 8c0 1 0 2-1 3l-2 2c2 4 5 7 9 9l2-2c1-1 2-1 3-1l8 3c2 1 2 3 2 4 0 1 0 3-1 4z" fill="white"/>
    </svg>`,
  },
  {
    name: 'YouTube', category: 'Social', bg: '#FF0000',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#FF0000"/>
      <rect x="14" y="32" width="72" height="36" rx="10" fill="white"/>
      <polygon points="43,40 43,60 62,50" fill="#FF0000"/>
    </svg>`,
  },
  {
    name: 'Pinterest', category: 'Social', bg: '#BD081C',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#BD081C"/>
      <path d="M50 15C31 15 15 31 15 50c0 15 9 27 22 32 0-3 0-7 1-10l7-31s-2-4-2-9c0-8 5-14 11-14 5 0 8 4 8 9 0 5-3 13-5 20-1 6 3 11 9 11 11 0 17-14 17-31 0-13-9-22-22-22-15 0-24 11-24 24 0 5 2 9 5 12 0 1 0 2 0 3l-2 7c-5-2-7-9-7-15 0-16 11-30 33-30 17 0 30 12 30 29 0 20-11 36-27 36-5 0-10-3-12-6l-3 12c-1 5-4 10-6 14 4 1 9 2 13 2 19 0 35-16 35-35S69 15 50 15z" fill="white"/>
    </svg>`,
  },
  {
    name: 'TikTok', category: 'Social', bg: '#010101',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#010101"/>
      <path d="M62 20h-9v41c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c1 0 2 0 3 0V43c-1 0-2 0-3 0-10 0-18 8-18 18s8 18 18 18 18-8 18-18V38c3 2 7 3 11 3V32c-6 0-11-5-11-12z" fill="white"/>
      <path d="M62 20h-9v41c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c1 0 2 0 3 0V43c-1 0-2 0-3 0-10 0-18 8-18 18s8 18 18 18 18-8 18-18V38c3 2 7 3 11 3V32c-6 0-11-5-11-12z" fill="#EE1D52" opacity="0.4" transform="translate(-2,0)"/>
      <path d="M62 20h-9v41c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c1 0 2 0 3 0V43c-1 0-2 0-3 0-10 0-18 8-18 18s8 18 18 18 18-8 18-18V38c3 2 7 3 11 3V32c-6 0-11-5-11-12z" fill="#69C9D0" opacity="0.4" transform="translate(2,0)"/>
    </svg>`,
  },
  {
    name: 'LINE', category: 'Social', bg: '#00B900',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#00B900"/>
      <path d="M83 46c0-16-16-29-36-29S11 30 11 46c0 14 13 26 30 28 1 0 3 1 3 2l0 7c0 1 1 2 2 1 3-2 16-9 22-16 4-5 15-12 15-22z" fill="white"/>
      <path d="M35 53h-9V37h5v12h4v4zm8 0h-5V37h5v16zm16 0h-5l-6-9v9h-5V37h5l6 9v-9h5v16zm12 0h-10V37h10v4h-5v2h5v4h-5v2h5v4z" fill="#00B900"/>
    </svg>`,
  },
  {
    name: 'GitHub', category: 'Dev', bg: '#333',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#24292e"/>
      <path d="M50 18a32 32 0 0 0-10 62c2 0 2-1 2-2v-5c-9 2-11-4-11-4-1-4-3-5-3-5-3-2 0-2 0-2 3 0 5 3 5 3 3 5 7 4 9 3 0-2 1-4 2-5-7-1-14-3-14-15 0-3 1-6 3-8-1-1-1-5 0-9 0 0 3-1 9 3a31 31 0 0 1 16 0c6-4 9-3 9-3 1 4 0 8 0 9 2 2 3 5 3 8 0 12-7 14-14 15 1 1 2 4 2 7v11c0 1 0 2 2 2a32 32 0 0 0-10-62z" fill="white"/>
    </svg>`,
  },
  // ── Messaging ──────────────────────────────────────────────────
  {
    name: 'Telegram', category: 'Messaging', bg: '#26A5E4',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#26A5E4"/>
      <path d="M80 22L13 48c-2 1-2 3 0 3l17 6 6 20c1 2 3 2 4 1l10-9 17 13c2 1 3 0 4-2L83 25c0-2-2-4-3-3zm-9 9L36 60l-4-15L71 31z" fill="white"/>
    </svg>`,
  },
  {
    name: 'Discord', category: 'Messaging', bg: '#5865F2',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#5865F2"/>
      <path d="M70 28s-8-3-16-3l-1 2c-6-1-11 0-16 2L36 28C28 29 20 34 20 34S11 47 10 60c7 7 16 11 16 11l3-4c-3-1-5-2-7-4 3 2 7 4 12 5l1 0c3 1 6 1 9 1s6 0 9-1l1 0c5-1 9-3 12-5-2 2-5 3-7 4l3 4s9-4 16-11c-1-13-10-26-10-26zm-26 25c-3 0-6-3-6-6s3-6 6-6 6 3 6 6-3 6-6 6zm20 0c-3 0-6-3-6-6s3-6 6-6 6 3 6 6-3 6-6 6z" fill="white"/>
    </svg>`,
  },
  // ── Business ──────────────────────────────────────────────────
  {
    name: 'Shopee', category: 'E-Commerce', bg: '#EE4D2D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#EE4D2D"/>
      <path d="M50 15c-8 0-14 6-14 14H24l4 46h44l4-46H64C64 21 57 15 50 15zm0 6c5 0 8 4 8 8H42c0-4 3-8 8-8z" fill="white"/>
    </svg>`,
  },
  {
    name: 'Lazada', category: 'E-Commerce', bg: '#0F146D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#0F146D"/>
      <text x="50" y="65" text-anchor="middle" font-size="42" font-weight="900" font-family="Arial,sans-serif" fill="white">L</text>
    </svg>`,
  },
  {
    name: 'Website', category: 'General', bg: '#3B5FF2',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#3B5FF2"/>
      <circle cx="50" cy="50" r="28" fill="none" stroke="white" stroke-width="5"/>
      <path d="M50 22c-8 10-8 46 0 56M50 22c8 10 8 46 0 56" fill="none" stroke="white" stroke-width="4"/>
      <line x1="22" y1="50" x2="78" y2="50" stroke="white" stroke-width="4"/>
      <path d="M24 36h52M24 64h52" fill="none" stroke="white" stroke-width="4"/>
    </svg>`,
  },
  {
    name: 'Email', category: 'General', bg: '#EA4335',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#EA4335"/>
      <rect x="18" y="30" width="64" height="42" rx="6" fill="white"/>
      <polyline points="18,30 50,58 82,30" fill="none" stroke="#EA4335" stroke-width="5"/>
    </svg>`,
  },
]

export const SOCIAL_LOGOS: SocialLogo[] = logos.map((l) => ({
  name: l.name,
  category: l.category,
  bg: l.bg,
  dataUrl: svgToDataUrl(l.svg),
}))

export const LOGO_CATEGORIES = [...new Set(SOCIAL_LOGOS.map((l) => l.category))]
