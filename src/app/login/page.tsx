import { FileText } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginForm } from '@/components/auth/login-form'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

const loginLuxe = {
  shell: 'min-h-screen bg-[#F9F7F4] text-[#2a211c]',
  panel: 'rounded-[2rem] border border-[#e5d9cf] bg-white/95 p-8 shadow-sm',
  side: 'rounded-[2rem] border border-[#e5d9cf] bg-[#f3ebe4]/90 p-8',
  muted: 'text-[#6b584d]',
  action: 'rounded-md bg-[#A98E7B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#957a68]',
  icon: FileText,
  title: 'Welcome to your PDF & profile workspace',
  body: 'Sign in to manage downloadable documents, public profiles, and the same calm bronze palette visitors see on the homepage.',
}

const bullets = [
  'Session stays in sync with your browser for quick return visits.',
  'Dashboard shortcuts focus on PDFs and profiles—nothing extra in the way.',
  'Typography and spacing mirror the luxe marketing shell.',
]

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const Icon = loginLuxe.icon

  return (
    <div className={loginLuxe.shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={loginLuxe.side}>
            <Icon className="h-8 w-8 text-[#A98E7B]" />
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.05em]">{loginLuxe.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${loginLuxe.muted}`}>{loginLuxe.body}</p>
            <div className="mt-8 grid gap-4">
              {bullets.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#e5d9cf] bg-white/60 px-4 py-4 text-sm leading-relaxed text-[#3d3229]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={loginLuxe.panel}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7265]">Welcome back</p>
            <LoginForm
              className="mt-6 grid gap-4"
              submitClassName={`inline-flex h-12 w-full items-center justify-center ${loginLuxe.action}`}
              mutedClassName={loginLuxe.muted}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
