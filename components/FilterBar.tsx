'use client'

import { useRouter } from 'next/navigation'
import { useRef, useCallback } from 'react'
import { t } from '@/lib/i18n'
import type { ContractType } from '@/lib/database.types'

const CONTRACT_TYPES: ContractType[] = ['CDI', 'CDD', 'Stage', 'Freelance']

type Props = {
  q: string
  contractType: string
  remote: boolean
  city: string
}

export default function FilterBar({ q, contractType, remote, city }: Props) {
  const router = useRouter()
  const cityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const push = useCallback(
    (overrides: Partial<{ q: string; contractType: string; remote: boolean; city: string }>) => {
      const merged = { q, contractType, remote, city, ...overrides }
      const params = new URLSearchParams()
      if (merged.q) params.set('q', merged.q)
      if (merged.contractType) params.set('contract_type', merged.contractType)
      if (merged.remote) params.set('remote', 'true')
      if (merged.city) params.set('city', merged.city)
      router.push(`/?${params.toString()}`)
    },
    [q, contractType, remote, city, router],
  )

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (cityTimer.current) clearTimeout(cityTimer.current)
    cityTimer.current = setTimeout(() => push({ city: val }), 300)
  }

  const hasFilters = contractType || remote || city

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-warm-border bg-white px-4 py-3">
      {/* Contract type */}
      <select
        value={contractType}
        onChange={(e) => push({ contractType: e.target.value })}
        className="rounded-lg border border-warm-border bg-warm-bg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand"
        aria-label={t.filters.contractType}
      >
        <option value="">{t.filters.allContracts}</option>
        {CONTRACT_TYPES.map((ct) => (
          <option key={ct} value={ct}>{ct}</option>
        ))}
      </select>

      {/* Remote toggle */}
      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={remote}
          onChange={(e) => push({ remote: e.target.checked })}
          className="h-4 w-4 accent-brand"
        />
        {t.filters.remote}
      </label>

      {/* City */}
      <input
        type="text"
        defaultValue={city}
        placeholder={t.filters.cityPlaceholder}
        onChange={handleCityChange}
        className="rounded-lg border border-warm-border bg-warm-bg px-3 py-1.5 text-sm text-gray-700 placeholder:text-warm-muted focus:outline-none focus:ring-2 focus:ring-brand"
      />

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={() => push({ contractType: '', remote: false, city: '' })}
          className="ml-auto text-xs text-warm-muted underline-offset-2 hover:underline"
        >
          {t.filters.reset}
        </button>
      )}
    </div>
  )
}

export function FilterSkeleton() {
  return (
    <div className="h-14 animate-pulse rounded-2xl border border-warm-border bg-white" />
  )
}
