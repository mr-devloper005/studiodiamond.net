import { PageShell } from '@/components/shared/page-shell'
import { luxe } from '@/components/shared/luxe-styles'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App framework & routing' },
  { name: 'React', description: 'MIT License · UI rendering' },
  { name: 'Tailwind CSS', description: 'MIT License · Utility-first styling' },
  { name: 'Lucide Icons', description: 'ISC License · Iconography' },
  { name: 'Framer Motion', description: 'MIT License · Motion on select marketing views' },
  { name: 'Radix UI', description: 'MIT License · Accessible primitives' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source licenses"
      description="Studiodiamond stands on excellent community software. Here are the core packages surfaced in the luxe UI layer."
    >
      <div className={`${luxe.card} p-8`}>
        <div className="grid gap-4 md:grid-cols-2">
          {licenses.map((license) => (
            <div key={license.name} className={luxe.soft}>
              <h3 className={`text-sm font-semibold ${luxe.ink}`}>{license.name}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${luxe.muted}`}>{license.description}</p>
            </div>
          ))}
        </div>
        <p className={`mt-8 text-xs leading-relaxed ${luxe.muted}`}>
          Full license texts ship inside each dependency’s package folder. If you need a consolidated PDF for procurement,
          contact the studio team.
        </p>
      </div>
    </PageShell>
  )
}
