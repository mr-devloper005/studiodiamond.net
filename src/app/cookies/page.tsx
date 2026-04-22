import { PageShell } from '@/components/shared/page-shell'
import { luxe } from '@/components/shared/luxe-styles'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Keep you signed in, honor security tokens when downloading PDFs, and protect forms from abuse. These cannot be disabled without breaking core flows.',
  },
  {
    title: 'Functional cookies',
    body: 'Remember category filters on the PDF grid, collapsed FAQ states on the help center, and accessibility choices such as reduced motion when supported.',
  },
  {
    title: 'Analytics cookies',
    body: 'Optional. Help us understand which profile sections or document packs get the most engagement so we can tune defaults without invasive tracking.',
  },
  {
    title: 'Managing preferences',
    body: 'Use your browser controls to clear cookies anytime. For workspace-specific telemetry, contact support with the subject “Cookie preferences”.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Transparent detail about the small set of cookies powering the luxe PDF and profile experience."
    >
      <div className={`${luxe.card} p-8`}>
        <p className={`text-xs font-medium uppercase tracking-wide ${luxe.muted}`}>Last updated · April 2026</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className={luxe.soft}>
              <h3 className={`text-base font-semibold ${luxe.ink}`}>{section.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${luxe.muted}`}>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
