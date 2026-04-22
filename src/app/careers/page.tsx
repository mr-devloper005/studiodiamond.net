import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { luxe } from '@/components/shared/luxe-styles'

const roles = [
  {
    title: 'Senior product designer',
    location: 'Remote · US time zones',
    type: 'Full-time',
    level: 'Senior',
    blurb: 'Own the luxe PDF + profile experience—from Figma systems to QA with engineering.',
  },
  {
    title: 'Frontend engineer (Next.js)',
    location: 'Hybrid · Portland',
    type: 'Full-time',
    level: 'Mid',
    blurb: 'Ship accessible interfaces, optimize document previews, and keep the bronze palette consistent.',
  },
  {
    title: 'Customer success lead',
    location: 'Remote',
    type: 'Full-time',
    level: 'Lead',
    blurb: 'Guide studios through onboarding, content audits, and rollout playbooks for large PDF libraries.',
  },
]

const benefits = [
  'Competitive salary + meaningful equity',
  'Medical, dental, and vision for you and dependents',
  'Annual learning budget for conferences or courses',
  'Quiet Fridays—no standing meetings after 2p local',
  'Stipend for home office ergonomics and lighting',
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Join ${SITE_CONFIG.name} and craft the calm, editorial-grade experience teams expect when publishing PDFs and profiles together.`}
      actions={
        <Button asChild className={luxe.btnPrimary}>
          <Link href="/contact">Talk with us</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <Card key={role.title} className={`${luxe.card} transition-transform hover:-translate-y-1`}>
              <CardContent className="p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-[#e5d9cf] bg-[#f3ebe4] text-[#5c4b42]">{role.level}</Badge>
                  <Badge variant="outline" className="border-[#d9c9bc] text-[#5c4b42]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className={`mt-4 font-display text-xl font-semibold ${luxe.ink}`}>{role.title}</h2>
                <p className={`mt-1 text-sm ${luxe.muted}`}>{role.location}</p>
                <p className={`mt-3 text-sm leading-relaxed ${luxe.muted}`}>{role.blurb}</p>
                <Button variant="outline" className={`mt-5 ${luxe.btnOutline}`} asChild>
                  <Link href="/contact">Discuss this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={luxe.card}>
          <CardContent className="p-7">
            <p className={luxe.eyebrow}>Studio culture</p>
            <h3 className={`mt-2 font-display text-2xl font-semibold ${luxe.ink}`}>Why {SITE_CONFIG.name}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${luxe.muted}`}>
              We obsess over typography, honest materials, and the feeling visitors get when a download just works. If you
              love editorial polish paired with pragmatic engineering, you will feel at home.
            </p>
            <div className="mt-6 space-y-2">
              {benefits.map((benefit) => (
                <div key={benefit} className={luxe.inner}>
                  <p className="text-sm text-[#3d3229]">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
