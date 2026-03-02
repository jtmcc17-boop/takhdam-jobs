'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t } from '@/lib/i18n'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-primary tracking-tight">
              {t.site.name}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm text-muted hover:text-primary font-medium transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/" className="text-sm text-muted hover:text-primary font-medium transition-colors">
              {t.nav.jobs}
            </Link>
            <Link href="/entreprises" className="text-sm text-muted hover:text-primary font-medium transition-colors">
              {t.nav.companies}
            </Link>
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex text-xs border border-border rounded-lg overflow-hidden divide-x divide-border">
              <button className="px-2.5 py-1.5 bg-primary-light text-primary font-semibold">FR</button>
              <button className="px-2.5 py-1.5 text-muted hover:bg-neutral-100 transition-colors">EN</button>
              <button className="px-2.5 py-1.5 text-muted hover:bg-neutral-100 transition-colors">AR</button>
            </div>

            <Link
              href="/connexion"
              className="text-sm text-primary font-medium px-3 py-1.5 rounded-lg hover:bg-primary-light transition-colors"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/inscription"
              className="text-sm bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
            >
              {t.nav.signup}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className="w-5 space-y-1">
              <span
                className={`block h-0.5 bg-foreground transition-all duration-200 ${
                  menuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground transition-all duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground transition-all duration-200 ${
                  menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-4 flex flex-col gap-1">
          {[
            { label: t.nav.home, href: '/' },
            { label: t.nav.jobs, href: '/' },
            { label: t.nav.companies, href: '/entreprises' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-foreground px-3 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="border-t border-border mt-3 pt-3 flex flex-col gap-2">
            <Link
              href="/connexion"
              className="text-sm text-center text-primary font-medium border border-primary rounded-lg py-2.5 hover:bg-primary-light transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/inscription"
              className="text-sm text-center bg-primary text-white font-medium rounded-lg py-2.5 hover:bg-primary-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.signup}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
