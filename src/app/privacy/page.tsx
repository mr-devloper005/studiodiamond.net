import { PageShell } from '@/components/shared/page-shell'
import { luxe } from '@/components/shared/luxe-styles'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide at signup, technical logs that keep PDF downloads reliable, and optional analytics that show how visitors move between the library and profile pages.',
  },
  {
    title: 'How we use information',
    body: 'To authenticate you, deliver documents, render profile media, prevent abuse, and improve the calm browsing rhythm you see across the luxe shell.',
  },
  {
    title: 'Storage & retention',
    body: 'PDF assets and profile media stay in secured storage with access tied to your workspace roles. You may request deletion of personal data subject to legal holds on published materials.',
  },
  {
    title: 'Cookies & similar tech',
    body: 'Essential cookies keep sessions intact; optional cookies remember filter choices on the PDF grid. You can clear preferences anytime from your browser.',
  },
  {
    title: 'Your choices',
    body: 'Update marketing preferences from account settings, export a copy of profile data, or contact the studio for bespoke data requests.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be routed through the contact form—choose “Partnerships & press” if legal counsel needs to be looped in.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How Studiodiamond collects, uses, and protects information across PDF libraries and public profiles."
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
