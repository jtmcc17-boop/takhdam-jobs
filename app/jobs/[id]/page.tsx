import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import BookmarkButton from '@/components/BookmarkButton'
import { t } from '@/lib/i18n'
import type { ContractType } from '@/lib/database.types'

const contractBadge: Record<ContractType, string> = {
  CDI:       'bg-cdi-bg text-cdi-text',
  CDD:       'bg-cdd-bg text-cdd-text',
  Stage:     'bg-stage-bg text-stage-text',
  Freelance: 'bg-freelance-bg text-freelance-text',
}

type JobRow = {
  id: string
  title: string
  description: string
  city: string | null
  location: string | null
  contract_type: ContractType
  is_remote: boolean
  salary_min: number | null
  salary_max: number | null
  sector: string | null
  created_at: string
  companies: {
    id: string
    name: string
    logo_url: string | null
    city: string | null
    website: string | null
    description: string | null
  } | null
}

type Props = { params: Promise<{ id: string }> }

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params

  const { data: job } = (await supabase
    .from('jobs')
    .select('id, title, description, city, location, contract_type, is_remote, salary_min, salary_max, sector, created_at, companies(id, name, logo_url, city, website, description)')
    .eq('id', id)
    .single()) as { data: JobRow | null; error: unknown }

  if (!job) notFound()

  const company = job.companies

  const postedDate = new Date(job.created_at).toLocaleDateString('fr-MA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const whatsappText = encodeURIComponent(
    `Découvrez cette offre sur Takhdam : ${job.title}${company ? ` chez ${company.name}` : ''}`
  )

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/" className="hover:text-primary transition-colors">Offres</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{job.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Main content ── */}
          <article className="flex-1 min-w-0">
            {/* Header card */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm mb-6">
              <div className="flex items-start gap-4">
                {company?.logo_url ? (
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-2xl object-cover border border-border shrink-0"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary font-bold text-2xl shrink-0">
                    {company?.name[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-sm text-muted font-medium">{company?.name}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${contractBadge[job.contract_type as ContractType]}`}>
                      {job.contract_type}
                    </span>
                    {job.is_remote && (
                      <span className="rounded-full bg-primary-light text-primary px-3 py-1 text-xs font-medium">
                        {t.jobCard.remote}
                      </span>
                    )}
                    {(job.city ?? company?.city) && (
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.city ?? company?.city}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Job description */}
            {job.description && (
              <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm mb-6">
                <h2 className="text-base font-bold text-foreground mb-4">{t.jobDetail.about}</h2>
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </div>
              </section>
            )}

            {/* Job details */}
            <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm mb-6">
              <h2 className="text-base font-bold text-foreground mb-4">{t.jobDetail.details}</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: t.jobDetail.contract, value: job.contract_type },
                  { label: t.jobDetail.remote, value: job.is_remote ? t.jobDetail.yes : t.jobDetail.no },
                  job.city || company?.city ? { label: t.jobDetail.location, value: job.city ?? company?.city } : null,
                  job.sector ? { label: t.jobDetail.sector, value: job.sector } : null,
                  job.salary_min != null && job.salary_max != null
                    ? { label: t.jobDetail.salary, value: t.jobCard.salary(job.salary_min, job.salary_max) }
                    : null,
                  { label: t.jobDetail.posted, value: postedDate },
                ]
                  .filter(Boolean)
                  .map((item) => item && (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <dt className="text-xs font-semibold text-muted uppercase tracking-wide">{item.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                    </div>
                  ))}
              </dl>
            </section>

            {/* About company */}
            {company?.description && (
              <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="text-base font-bold text-foreground mb-4">{t.jobDetail.aboutCompany}</h2>
                <p className="text-sm text-foreground leading-relaxed">{company.description}</p>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline underline-offset-2"
                  >
                    Visiter le site →
                  </a>
                )}
              </section>
            )}
          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-20 flex flex-col gap-4">

              {/* Apply card */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4">Postuler à cette offre</h3>

                <button className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm mb-3">
                  {t.jobDetail.apply}
                </button>

                <div className="flex gap-2">
                  <BookmarkButton jobId={job.id} className="flex-1 justify-center rounded-xl border border-border py-2.5 text-sm font-medium text-muted hover:border-primary hover:text-primary transition-colors" />

                  <a
                    href={`https://wa.me/?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-muted hover:border-green-500 hover:text-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Partager
                  </a>
                </div>
              </div>

              {/* Company mini-card */}
              {company && (
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    {company.logo_url ? (
                      <Image
                        src={company.logo_url}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-xl object-cover border border-border"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-xl bg-primary-light flex items-center justify-center text-primary font-bold">
                        {company.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{company.name}</p>
                      {company.city && <p className="text-xs text-muted">{company.city}</p>}
                    </div>
                  </div>
                  <Link
                    href={`/?company=${company.id}`}
                    className="text-xs text-primary font-medium hover:underline underline-offset-2"
                  >
                    Voir toutes les offres →
                  </Link>
                </div>
              )}

              {/* Back link */}
              <Link
                href="/"
                className="text-sm text-muted hover:text-primary transition-colors text-center block"
              >
                {t.jobDetail.back}
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <span className="font-bold text-primary">Takhdam</span>
            </div>
            <p className="text-xs text-muted">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
