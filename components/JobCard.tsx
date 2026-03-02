import Image from 'next/image'
import Link from 'next/link'
import BookmarkButton from './BookmarkButton'
import type { ContractType } from '@/lib/database.types'
import { t } from '@/lib/i18n'

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

const contractBadge: Record<ContractType, string> = {
  CDI:       'bg-cdi-bg text-cdi-text',
  CDD:       'bg-cdd-bg text-cdd-text',
  Stage:     'bg-stage-bg text-stage-text',
  Freelance: 'bg-freelance-bg text-freelance-text',
}

function daysAgo(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
      {letters}
    </div>
  )
}

export default function JobCard({ job }: { job: Job }) {
  const company = job.companies
  const days = daysAgo(job.created_at)
  const displayCity = job.city ?? company?.city ?? null
  const isNew = days <= 3

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <article className="relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-primary">

        {/* New badge */}
        {isNew && (
          <span className="absolute top-4 right-12 rounded-full bg-accent-light text-accent-dark text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
            {t.jobCard.newBadge}
          </span>
        )}

        {/* Bookmark */}
        <div className="absolute top-3 right-3">
          <BookmarkButton jobId={job.id} />
        </div>

        {/* Header: logo + title */}
        <div className="flex items-start gap-3 pr-6">
          {company?.logo_url ? (
            <Image
              src={company.logo_url}
              alt={company.name}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-xl object-cover border border-border"
            />
          ) : (
            <Initials name={company?.name ?? '?'} />
          )}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
              {job.title}
            </h2>
            <p className="truncate text-xs text-muted mt-0.5">{company?.name}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${contractBadge[job.contract_type]}`}>
            {job.contract_type}
          </span>
          {job.is_remote && (
            <span className="rounded-full bg-primary-light text-primary px-2.5 py-0.5 text-[11px] font-medium">
              {t.jobCard.remote}
            </span>
          )}
          {displayCity && (
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {displayCity}
            </span>
          )}
        </div>

        {/* Footer: salary + date */}
        <div className="flex items-center justify-between text-[11px] text-muted pt-1 border-t border-border">
          {job.salary_min != null && job.salary_max != null ? (
            <span className="font-medium text-foreground">
              {t.jobCard.salary(job.salary_min, job.salary_max)}
            </span>
          ) : (
            <span />
          )}
          <span>{t.jobCard.postedDays(days)}</span>
        </div>
      </article>
    </Link>
  )
}
