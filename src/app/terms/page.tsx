import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { luxe } from '@/components/shared/luxe-styles'

const sections = [
  {
    title: 'Acceptable use',
    body: 'Upload only PDFs you have rights to share. Profiles must not impersonate others or include unlawful material. Automated scraping of the library without permission is prohibited.',
  },
  {
    title: 'Accounts & access',
    body: 'You are responsible for safeguarding credentials. Studio admins may suspend accounts that degrade performance of shared PDF infrastructure or harass other members.',
  },
  {
    title: 'Content ownership',
    body: 'You retain ownership of files and profile copy. By publishing, you grant Studiodiamond a limited license to host, cache, and display that content to deliver the service.',
  },
  {
    title: 'Service changes',
    body: 'We may refine layouts, typography, or navigation to keep the luxe experience cohesive. Material changes will be announced on this page with a refreshed “Last updated” date.',
  },
  {
    title: 'Disclaimers',
    body: 'PDFs may contain third-party guidance. Studiodiamond does not guarantee outcomes from downloaded materials—consult professionals for legal, medical, or financial decisions.',
  },
  {
    title: 'Governing law',
    body: 'These terms follow the governing law stated in your master services agreement. In absence of an MSA, disputes are handled in the courts of Delaware, USA.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules for using ${SITE_CONFIG.name} as a PDF library and profile studio.`}
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
