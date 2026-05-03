'use client'

import Link from 'next/link'
import Image from 'next/image'
import { QrCode, LayoutDashboard, ScanLine } from 'lucide-react'

export function Navbar() {
  return (
    <header className="bg-primary-900 border-b border-primary-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-cream text-lg">
          <Image
            src="/images/logo.png"
            alt="Uncle Dev Logo"
            width={36}
            height={36}
            className="rounded-full ring-2 ring-accent/40"
          />
          <span className="hidden sm:inline">
            <span className="text-accent">QR</span>Gen
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cream/80 hover:bg-primary-800 hover:text-cream transition">
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Generator</span>
          </Link>
          <Link href="/scan" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cream/80 hover:bg-primary-800 hover:text-cream transition">
            <ScanLine className="w-4 h-4" />
            <span className="hidden sm:inline">Scanner</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cream/80 hover:bg-primary-800 hover:text-cream transition">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">ประวัติ</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
