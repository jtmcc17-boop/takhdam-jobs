'use client'

import { useRouter } from 'next/navigation'
import { useRef, useCallback, useState } from 'react'
import { t } from '@/lib/i18n'
import type { ContractType } from '@/lib/database.types'

const CONTRACT_TYPES: ContractType[] = ['CDI', 'CDD', 'Stage', 'Freelance']

type Props = {
  q: string
  contractType: string
  remote: boolean
  city: string
  sector: string
}

export default function FilterSidebar({ q, contractType, remote, city, sector }: Props) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const cityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const push = useCallback(
    (overrides: Partial<{ q: string; contractType: string; remote: boolean; city: string; sector: string }>) => {
      const merged = { q, contractType, remote, city, sector, ...overrides }
      const params = new URLSearchParams()
      if (merged.q) params.set('q', merged.q)
      if (merged.contractType) params.set('contract_type', merged.contractType)
      if (merged.remote) params.set('remote', 'true')
      if (merged.city) params.set('city', merged.city)
      if (merged.sector) params.set('sector', merged.sector)
      router.push(`/?${params.toString()}`)
    },
    [q, contractType, remote, city, sector, router],
  )

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (cityTimer.current) clearTimeout(cityTimer.current)
    cityTimer.current = setTimeout(() => push({ city: val }), 300)
  }

  const hasFilters = contractType || remote || city || sector
  const activeCount = [contractType, remote, city, sector].filter(Boolean).length

  const panel = (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm">{t.filters.title}</h3>
        {hasFilters && (
          <button
            onClick={() => push({ contractType: '', remote: false, city: '', sector: '' })}
            className="text-xs text-primary hover:underline underline-offset-2"
          >
            {t.filters.reset}
          </button>
        )}
      </div>

      {/* Contract type */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
          {t.filters.contractType}
        </p>
        <div className="flex flex-col gap-2">
          {CONTRACT_TYPES.map((ct) => (
            <label key={ct} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={contractType === ct}
                onChange={(e) => push({ contractType: e.target.checked ? ct : '' })}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {ct}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Remote */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Mode</p>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={remote}
            onChange={(e) => push({ remote: e.target.checked })}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            {t.filters.remote}
          </span>
        </label>
      </div>

      {/* City */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Ville</p>
        <input
          type="text"
          defaultValue={city}
          placeholder={t.filters.cityPlaceholder}
          onChange={handleCityChange}
          className="w-full rounded-lg border border-border bg-neutral-100 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Sector */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
          {t.filters.sector}
        </p>
        <select
          value={sector}
          onChange={(e) => push({ sector: e.target.value })}
          className="w-full rounded-lg border border-border bg-neutral-100 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">{t.filters.allSectors}</option>
          {t.sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm hover:border-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          {t.filters.mobileToggle}
          {activeCount > 0 && (
            <span className="rounded-full bg-primary text-white text-[10px] font-bold px-1.5 py-0.5">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-20 rounded-2xl border border-border bg-surface p-5 shadow-sm">
          {panel}
        </div>
      </aside>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Sheet */}
          <div className="relative bg-surface rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-base text-foreground">{t.filters.title}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {panel}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              {t.filters.apply}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export function FilterSidebarSkeleton() {
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-20 rounded-2xl border border-border bg-surface p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-neutral-200 rounded w-1/2 mb-5" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-neutral-200 rounded mb-3" />
        ))}
      </div>
    </aside>
  )
}
