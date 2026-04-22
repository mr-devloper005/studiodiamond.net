import Link from 'next/link'
import { FileText, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

const registerLuxe = {
  shell: 'min-h-screen bg-[#F9F7F4] text-[#2a211c]',
  panel: 'rounded-[2rem] border border-[#e5d9cf] bg-white/95 p-8 shadow-sm',
  side: 'rounded-[2rem] border border-[#e5d9cf] bg-[#f3ebe4]/90 p-8',
  muted: 'text-[#6b584d]',
  action: 'rounded-md bg-[#A98E7B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#957a68]',
  icon: FileText,
  title: 'Create your PDF & profile workspace',
  body: 'Open an account to upload structured PDFs, tune public profiles, and keep both surfaces aligned with the same bronze-and-cream presentation guests see on the marketing site.',
}

const bullets = [
  'Upload and organize PDF packs with readable previews.',
  'Publish a profile that mirrors the luxe homepage typography.',
  'Switch between documents and identity pages without leaving the studio shell.',
]

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const Icon = registerLuxe.icon

  return (
    <div className={registerLuxe.shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={registerLuxe.side}>
            <Icon className="h-8 w-8 text-[#A98E7B]" />
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.05em]">{registerLuxe.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${registerLuxe.muted}`}>{registerLuxe.body}</p>
            <div className="mt-8 grid gap-4">
              {bullets.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#e5d9cf] bg-white/60 px-4 py-4 text-sm leading-relaxed text-[#3d3229]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={registerLuxe.panel}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7265]">Create account</p>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Full name"
              />
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Password"
                type="password"
              />
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="What PDFs or profiles are you launching?"
              />
              <button type="submit" className={`inline-flex h-12 w-full items-center justify-center ${registerLuxe.action}`}>
                Create account
              </button>
            </form>
            <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${registerLuxe.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#A98E7B] hover:text-[#8a7265]">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
