import { Suspense } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import JobGrid, { JobGridSkeleton } from '@/components/JobGrid'
import FilterSidebar, { FilterSidebarSkeleton } from '@/components/FilterSidebar'
import CategoryGrid from '@/components/CategoryGrid'
import { t } from '@/lib/i18n'
import type { ContractType } from '@/lib/database.types'

type SearchParams = Promise<{
  q?: string
  contract_type?: string
  remote?: string
  city?: string
  sector?: string
}>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const q = sp.q ?? ''
  const contractType = sp.contract_type ?? ''
  const remote = sp.remote === 'true'
  const city = sp.city ?? ''
  const sector = sp.sector ?? ''

  const hasFilters = q || contractType || remote || city || sector

  // Fetch jobs with filters
  let query = supabase
    .from('jobs')
    .select('id, title, city, contract_type, is_remote, salary_min, salary_max, created_at, companies(name, logo_url, city)')
    .order('created_at', { ascending: false })
    .limit(hasFilters ? 50 : 9)

  if (q) query = query.ilike('title', `%${q}%`)
  if (contractType) query = query.eq('contract_type', contractType as ContractType)
  if (remote) query = query.eq('is_remote', true)
  if (city) query = query.ilike('city', `%${city}%`)
  if (sector) query = query.ilike('sector', `%${sector}%`)

  const { data: jobs } = await query

  // Fetch top companies (for non-filtered view)
  type CompanyRow = { id: string; name: string; logo_url: string | null; city: string | null }
  let companies: CompanyRow[] | null = null
  if (!hasFilters) {
    const { data } = await supabase.from('companies').select('id, name, logo_url, city').limit(8)
    companies = data
  }

  const jobsToShow = jobs ?? []

  return (
    <>
      <Navbar />

      <Hero q={q} city={city} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category grid — only when no filters active */}
        {!hasFilters && <CategoryGrid />}

        {/* Jobs section */}
        <section className="py-8">
          {!hasFilters && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Dernières offres</h2>
              <Link
                href="/?all=true"
                className="text-sm text-primary font-medium hover:underline underline-offset-2"
              >
                Voir toutes les offres →
              </Link>
            </div>
          )}

          <div className="flex gap-6 items-start">
            {/* Sidebar */}
            <Suspense fallback={<FilterSidebarSkeleton />}>
              <FilterSidebar
                q={q}
                contractType={contractType}
                remote={remote}
                city={city}
                sector={sector}
              />
            </Suspense>

            {/* Job grid */}
            <div className="flex-1 min-w-0">
              <Suspense fallback={<JobGridSkeleton />}>
                <JobGrid
                  jobs={jobsToShow}
                  title={hasFilters ? `Résultats (${jobsToShow.length})` : undefined}
                />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Top Companies — only when no filters */}
        {!hasFilters && companies && companies.length > 0 && (
          <section className="py-10 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Entreprises qui recrutent</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center gap-2 shrink-0 rounded-2xl border border-border bg-surface p-4 w-36 text-center hover:border-primary hover:shadow-sm transition-all"
                >
                  {company.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={company.logo_url}
                      alt={company.name}
                      className="h-12 w-12 rounded-xl object-cover border border-border"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center text-primary font-bold text-lg">
                      {company.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">
                    {company.name}
                  </p>
                  {company.city && (
                    <p className="text-[10px] text-muted">{company.city}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        {!hasFilters && (
          <section className="my-10 rounded-3xl bg-primary px-8 py-12 text-center relative overflow-hidden">
            {/* Subtle decoration */}
            <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
              <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full border-2 border-white" />
              <div className="absolute -bottom-8 -left-8 h-56 w-56 rounded-full border-2 border-white" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.cta.title}</h2>
              <p className="mt-2 text-base text-white/70">{t.cta.subtitle}</p>
              <Link
                href="/publier"
                className="mt-6 inline-block rounded-xl bg-accent px-8 py-3.5 font-semibold text-white hover:bg-accent-dark transition-colors shadow-md"
              >
                {t.cta.button}
              </Link>
              <p className="mt-3 text-xs text-white/50">{t.cta.subtext}</p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              <div>
                <span className="font-bold text-primary text-lg">{t.site.name}</span>
                <p className="text-xs text-muted">{t.footer.tagline}</p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {t.footer.links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs text-muted hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-6 text-xs text-muted text-center sm:text-left">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </>
  )
}
