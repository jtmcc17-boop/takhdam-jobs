'use client'

import { useState, useEffect, useCallback } from 'react'
import { t } from '@/lib/i18n'

type Props = {
  jobId: string
  className?: string
}

export default function BookmarkButton({ jobId, className = '' }: Props) {
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('takhdam_saved') ?? '[]')
      setSaved(Array.isArray(saved) && saved.includes(jobId))
    } catch {
      // ignore
    }
  }, [jobId])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }, [])

  function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    try {
      const stored: string[] = JSON.parse(localStorage.getItem('takhdam_saved') ?? '[]')
      let next: string[]
      if (saved) {
        next = stored.filter((id) => id !== jobId)
        showToast(t.jobCard.toastUnsaved)
      } else {
        next = [...stored, jobId]
        showToast(t.jobCard.toastSaved)
      }
      localStorage.setItem('takhdam_saved', JSON.stringify(next))
      setSaved(!saved)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-label={saved ? t.jobCard.saved : t.jobCard.save}
        className={`p-1.5 rounded-lg transition-colors ${
          saved
            ? 'text-primary bg-primary-light'
            : 'text-muted hover:text-primary hover:bg-primary-light'
        } ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </button>

      {toast && (
        <div className="absolute right-0 top-8 z-10 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-surface shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
