import Link from 'next/link'
import { t } from '@/lib/i18n'

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Parcourir par catégorie
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {t.categories.map(({ label, icon, sector }) => (
          <Link
            key={sector}
            href={`/?sector=${encodeURIComponent(sector)}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center hover:border-primary hover:bg-primary-light transition-colors group"
          >
            <span className="text-3xl">{icon}</span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
