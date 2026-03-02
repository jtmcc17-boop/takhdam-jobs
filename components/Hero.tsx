import { t } from '@/lib/i18n'

type Props = { q: string; city: string }

export default function Hero({ q, city }: Props) {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Geometric Moroccan star decoration */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-10" aria-hidden>
        <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" strokeWidth="1.5">
            {/* 8-pointed star shapes tiled */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const cx = col * 160 + 80
                const cy = row * 160 + 80
                const r = 55
                const points = Array.from({ length: 8 }, (_, i) => {
                  const angle = (i * Math.PI) / 4 - Math.PI / 8
                  const radius = i % 2 === 0 ? r : r * 0.42
                  return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`
                }).join(' ')
                return <polygon key={`${row}-${col}`} points={points} />
              })
            )}
            {/* Grid lines */}
            {[80, 240, 400].map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={480} strokeOpacity="0.4" />
            ))}
            {[80, 240, 400].map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={480} y2={y} strokeOpacity="0.4" />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
          {t.hero.headline}{' '}
          <span className="text-accent">{t.hero.headlineAccent}</span>
        </h1>
        <p className="mt-2 text-lg text-white/70" lang="ar" dir="rtl">
          {t.hero.subtitleAr}
        </p>
        <p className="mt-2 text-base text-white/60">{t.hero.subtitle}</p>

        {/* Search form */}
        <form
          method="GET"
          action="/"
          className="mt-8 flex flex-col sm:flex-row gap-2.5 max-w-2xl mx-auto"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder={t.hero.searchTitle}
            className="flex-1 rounded-xl border-0 px-4 py-3.5 text-foreground bg-white shadow-md placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <input
            type="text"
            name="city"
            defaultValue={city}
            placeholder={t.hero.searchCity}
            className="w-full sm:w-36 rounded-xl border-0 px-4 py-3.5 text-foreground bg-white shadow-md placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <button
            type="submit"
            className="rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-md hover:bg-accent-dark transition-colors focus:outline-none focus:ring-2 focus:ring-white text-sm shrink-0"
          >
            {t.hero.searchButton}
          </button>
        </form>

        {/* Popular searches */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-2">
          <span className="text-sm text-white/60">{t.hero.popular}</span>
          {t.hero.popularTerms.map((term) => (
            <a
              key={term}
              href={`/?q=${encodeURIComponent(term)}`}
              className="text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors font-medium"
            >
              {term}
            </a>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-10 border-t border-white/20 pt-8">
          {t.hero.stats.map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-accent">{num}</div>
              <div className="text-xs text-white/70 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
