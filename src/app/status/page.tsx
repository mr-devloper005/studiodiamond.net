import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { luxe } from '@/components/shared/luxe-styles'

const services = [
  { name: 'PDF delivery CDN', detail: 'Edge caching for large document downloads', status: 'Operational' },
  { name: 'Profile media', detail: 'Image optimization + portrait crops', status: 'Operational' },
  { name: 'Authentication API', detail: 'Sessions + password reset flows', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 4, 2026', title: 'Elevated latency on EU PDF edge', status: 'Resolved · 42m' },
  { date: 'Jan 18, 2026', title: 'Profile avatar processing backlog', status: 'Resolved · 3h' },
  { date: 'Nov 2, 2025', title: 'Scheduled database maintenance', status: 'Completed' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Live health for the infrastructure powering your PDF library and profile studio—all styled to match the luxe marketing site."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={luxe.card}>
              <CardContent className="p-6">
                <h2 className={`text-lg font-semibold ${luxe.ink}`}>{service.name}</h2>
                <p className={`mt-2 text-xs leading-relaxed ${luxe.muted}`}>{service.detail}</p>
                <Badge className="mt-4 border border-[#c8e6d4] bg-[#e8f5ee] text-[#2f5a3d]">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={luxe.card}>
          <CardContent className="p-8">
            <p className={luxe.eyebrow}>Transparency</p>
            <h3 className={`mt-2 font-display text-2xl font-semibold ${luxe.ink}`}>Incident history</h3>
            <p className={`mt-2 text-sm ${luxe.muted}`}>
              We post notes for anything that could interrupt downloads or profile edits. Subscribe to the status RSS in
              your dashboard when it ships.
            </p>
            <div className="mt-6 space-y-4">
              {incidents.map((incident) => (
                <div key={incident.title} className={luxe.soft}>
                  <div className={`text-xs font-semibold uppercase tracking-wide ${luxe.muted}`}>{incident.date}</div>
                  <div className={`mt-1 text-sm font-semibold ${luxe.ink}`}>{incident.title}</div>
                  <div className={`mt-1 text-xs ${luxe.muted}`}>{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
