import JobCard from './JobCard'
import { t } from '@/lib/i18n'
import type { ContractType } from '@/lib/database.types'

type Job = {
  id: string
  title: string
  city: string | null
  contract_type: ContractType
  is_remote: boolean
  salary_min: number | null
  salary_max: number | null
  created_at: string
  companies: {
    name: string
    logo_url: string | null
    city: string | null
  } | null
}

export default function JobGrid({ jobs, title }: { jobs: Job[]; title?: string }) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-base font-semibold text-foreground">{t.emptyState.title}</p>
        <p className="mt-1 text-xl" lang="ar" dir="rtl">
          {t.emptyState.titleAr}
        </p>
        <p className="mt-2 text-sm text-muted">{t.emptyState.subtitle}</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <span className="text-sm text-muted">{jobs.length} offre{jobs.length > 1 ? 's' : ''}</span>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}

export function JobGridSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-surface p-5 animate-pulse">
          <div className="flex gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-neutral-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="h-5 w-12 bg-neutral-200 rounded-full" />
            <div className="h-5 w-16 bg-neutral-200 rounded-full" />
          </div>
          <div className="h-3 bg-neutral-200 rounded w-full" />
        </div>
      ))}
    </div>
  )
}
