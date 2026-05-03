# QRGen — Quick Start

## วิธีรัน (ครั้งแรก)

```bash
# 1. ติดตั้ง dependencies + ตั้งค่า database
setup.bat           # Windows
# หรือ
npm install && npx prisma generate && npx prisma db push

# 2. รัน dev server
npm run dev

# 3. เปิดเบราว์เซอร์
http://localhost:3000
```

## โครงสร้างโปรเจกต์

```
QRGen/
├── app/
│   ├── page.tsx                    # หน้าหลัก (Generator)
│   ├── scan/page.tsx               # หน้า QR Scanner
│   ├── dashboard/page.tsx          # หน้า Dashboard (ต้อง login)
│   ├── auth/signin/page.tsx        # หน้า Login
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth
│       ├── qr/                     # CRUD QR Codes
│       ├── analytics/              # Scan Analytics
│       └── r/[code]/               # Dynamic QR Redirect
├── components/
│   ├── input-forms/                # Forms สำหรับทุก content type
│   ├── customizer/                 # Customization Panel
│   ├── preview/                    # Live Preview + Export
│   ├── scanner/                    # QR Scanner
│   └── dashboard/                  # Dashboard UI
├── lib/
│   ├── qr-encoder.ts              # Encode functions ทุก type
│   ├── qr-exporter.ts             # Download PNG/PDF/SVG/Print
│   ├── prisma.ts                  # Prisma client
│   └── utils.ts                   # Helper functions
├── store/
│   └── qr-store.ts                # Zustand global state
└── prisma/
    └── schema.prisma               # Database schema
```

## Features

### ✅ Content Types
- URL / Link, Plain Text, Email, Phone, SMS
- WiFi (auto-connect), vCard Contact, GPS Location, Cryptocurrency

### ✅ Customization
- Dot Style: Square, Rounded, Dots, Classy, Extra-Rounded
- สี Dots, Background, Corner Square, Corner Dot
- Logo embed พร้อมปรับขนาดและ margin
- Preset templates 6 แบบ
- Error Correction Level: L/M/Q/H

### ✅ Export
- PNG (1x, 2x, 3x resolution)
- PDF (A4 centered)
- Copy to Clipboard
- Print
- บันทึกลง Library (ต้อง login)

### ✅ UX
- Live Preview (debounced 300ms)
- Undo/Redo history (20 steps)
- QR Scanner (กล้อง + อัปโหลดรูป)

### ✅ Backend
- Auth: Email/Password + Google OAuth
- QR Library: บันทึก/โหลด/ลบ QR
- Folder & Tags
- Dynamic QR + Redirect URL
- Scan Analytics
- SQLite database (Prisma)

## Login Demo

Email: demo@qrgen.app  
Password: demo1234

## Environment Variables

คัดลอก `.env.example` เป็น `.env.local` แล้วแก้ไขตามต้องการ:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```
