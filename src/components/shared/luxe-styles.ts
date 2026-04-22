/**
 * Layout tokens aligned with the homepage luxe theme (cream field + bronze accents).
 * UI-only; import from pages/components — not app config.
 */
export const luxe = {
  page: 'min-h-screen bg-[#F9F7F4] text-[#2a211c] antialiased',
  header:
    'border-b border-[#e5d9cf] bg-[linear-gradient(180deg,#fffdf9_0%,#faf6f2_100%)]',
  mainPad: 'mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8',
  card: 'rounded-2xl border border-[#e5d9cf] bg-white/95 shadow-[0_12px_40px_rgba(58,42,32,0.06)]',
  soft: 'rounded-2xl border border-[#e5d9cf] bg-[#f3ebe4]/75',
  inner: 'rounded-xl border border-[#eadfd6] bg-[#faf6f2]/90 px-4 py-3',
  muted: 'text-[#6b584d]',
  ink: 'text-[#2a211c]',
  eyebrow: 'text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7265]',
  h1: 'font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl',
  btnPrimary: 'rounded-md bg-[#A98E7B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#957a68]',
  btnOutline: 'rounded-md border border-[#d9c9bc] bg-white px-5 py-2.5 text-sm font-semibold text-[#2a211c] hover:bg-[#faf6f2]',
  dashed: 'rounded-2xl border border-dashed border-[#d4c4b8] bg-[#faf6f2]/50',
} as const
