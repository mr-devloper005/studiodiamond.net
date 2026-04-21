import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { luxe } from '@/components/shared/luxe-styles'
import { FileText, LifeBuoy, Search, User } from 'lucide-react'

const topics = [
  {
    title: 'PDF publishing',
    description: 'Versioning, preview quality, download permissions, and how to keep long documents readable on cream backgrounds.',
    icon: FileText,
  },
  {
    title: 'Profiles & bios',
    description: 'Ordering media, writing headlines, and aligning typography with the luxe homepage so every teammate feels on-brand.',
    icon: User,
  },
  {
    title: 'Accounts & security',
    description: 'Session management, password resets, and best practices for sharing studio access without exposing private drafts.',
    icon: LifeBuoy,
  },
  {
    title: 'Search & discovery',
    description: 'How global search spans PDFs and profiles, plus tips for naming files so visitors find the right asset faster.',
    icon: Search,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides for running a polished PDF library and profile studio without losing the calm bronze palette."
      actions={
        <Button asChild className={luxe.btnPrimary}>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className={`${luxe.card} transition-transform hover:-translate-y-1`}>
                <CardContent className="p-6">
                  <Icon className="h-5 w-5 text-[#A98E7B]" />
                  <h2 className={`mt-4 text-lg font-semibold ${luxe.ink}`}>{topic.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${luxe.muted}`}>{topic.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Card className={luxe.card}>
          <CardContent className="p-6">
            <p className={luxe.eyebrow}>FAQ</p>
            <h3 className={`mt-2 font-display text-xl font-semibold ${luxe.ink}`}>Quick answers</h3>
            <Accordion type="single" collapsible className="mt-5">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#eadfd6]">
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#2a211c] hover:text-[#A98E7B]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={`text-sm leading-relaxed ${luxe.muted}`}>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
