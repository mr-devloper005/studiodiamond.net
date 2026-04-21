import Link from 'next/link'
import { ArrowRight, Building2, Download, FileText, Image as ImageIcon, LayoutGrid, Search, Shield, Sparkles, Tag, User, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal':
    'bg-[linear-gradient(180deg,#fffdf9_0%,#f9f7f4_45%,#f3ebe4_100%)] text-[#2a211c]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business':
    'bg-[linear-gradient(180deg,#fffdf9_0%,#f9f7f4_45%,#f3ebe4_100%)] text-[#2a211c]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#6b584d]',
          panel: 'border border-[#e5d9cf] bg-white/95 shadow-sm',
          soft: 'border border-[#e5d9cf] bg-[#f3ebe4]/80',
          input: 'border border-[#e5d9cf] bg-white text-[#2a211c]',
          button: 'bg-[#A98E7B] text-white hover:bg-[#957a68]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold tracking-[-0.05em] text-foreground">
                {task === 'pdf'
                  ? 'A calm library for PDFs visitors can skim, trust, and download without friction.'
                  : task === 'profile'
                    ? 'Profiles with editorial pacing—room for story, proof, and portrait imagery.'
                    : taskConfig?.description || 'Latest posts'}
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                {task === 'pdf'
                  ? 'Typography, metadata, and download cues sit on the same cream field as the homepage so every document feels part of one studio.'
                  : task === 'profile'
                    ? 'Identity pages borrow the luxe bronze palette: serif headlines, soft dividers, and generous spacing instead of cramped directory cards.'
                    : 'This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.'}
              </p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Browse tip</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>
                Filters keep the grid breathable—jump between document sets or profile lanes without losing the warm bronze
                accents that anchor the brand.
              </p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {task === 'pdf' && (layoutKey === 'article-editorial' || layoutKey === 'article-journal') ? (
          <section className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: '120+', l: 'Live documents' },
                { n: '48', l: 'Curated packs' },
                { n: '12', l: 'Categories' },
                { n: '4.9★', l: 'Reader clarity' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-[#e5d9cf] bg-white/90 px-4 py-5 text-center shadow-sm"
                >
                  <p className="font-display text-2xl font-semibold text-[#2a211c]">{s.n}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#8a7265]">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Download,
                  t: 'Download-ready',
                  d: 'Each card exposes file type, size, and a single obvious download path.',
                },
                {
                  icon: Sparkles,
                  t: 'Preview first',
                  d: 'Hero panels surface the first pages so visitors know the tone before committing.',
                },
                {
                  icon: Shield,
                  t: 'Trust cues',
                  d: 'Version notes and author lines keep compliance-friendly PDFs feeling human.',
                },
              ].map((item) => (
                <div key={item.t} className="rounded-2xl border border-[#e5d9cf] bg-[#faf6f2]/90 p-5">
                  <item.icon className="h-5 w-5 text-[#A98E7B]" />
                  <p className="mt-3 text-sm font-semibold text-[#2a211c]">{item.t}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b584d]">{item.d}</p>
                </div>
              ))}
            </div>
            <div className="col-span-full flex flex-wrap gap-3 rounded-2xl border border-[#eadfd6] bg-[#f3ebe4]/60 px-5 py-4">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-md bg-[#A98E7B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#957a68]"
              >
                Meet the authors
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-md border border-[#d9c9bc] bg-white px-4 py-2 text-xs font-semibold text-[#2a211c] hover:bg-[#faf6f2]"
              >
                <Search className="h-3.5 w-3.5" />
                Search the library
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-semibold text-[#A98E7B] hover:underline">
                Request a custom pack
              </Link>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(58,42,32,0.08)] ${ui.panel}`}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className={`relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#e5d9cf] ${ui.soft}`}>
                {task === 'profile' ? (
                  <>
                    <img
                      src="/hero-section.png"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f9f7f4]/95 via-[#f9f7f4]/40 to-transparent" />
                    <div className="relative flex h-full flex-col justify-end p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5c4b42]">Studio tone</p>
                      <p className="mt-2 font-display text-xl font-semibold text-[#2a211c]">Portraits & proof</p>
                    </div>
                  </>
                ) : (
                  <div className="h-full min-h-[240px] rounded-[2rem] bg-[#efe6df]" />
                )}
              </div>
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-foreground">
                  {task === 'profile'
                    ? 'Public profiles that feel bespoke—headline, proof points, and imagery in one luxe column.'
                    : 'Profiles with stronger identity, trust, and reputation cues.'}
                </h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                  {task === 'profile'
                    ? 'Cards echo the homepage: cream panels, bronze buttons, and serif titles so every teammate looks like part of the same studio.'
                    : 'This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.'}
                </p>
                {task === 'profile' ? (
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: Users, label: 'Team-ready bios', body: 'Role, location, and social proof in one scan.' },
                      { icon: Shield, label: 'Trust layout', body: 'Credentials and media blocks stay aligned to the grid.' },
                      { icon: Sparkles, label: 'Editorial polish', body: 'Serif headlines and bronze accents match the hero.' },
                    ].map((cell) => (
                      <div key={cell.label} className="rounded-xl border border-[#eadfd6] bg-[#faf6f2]/80 p-4">
                        <cell.icon className="h-4 w-4 text-[#A98E7B]" />
                        <p className="mt-2 text-xs font-semibold text-[#2a211c]">{cell.label}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#6b584d]">{cell.body}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {task === 'profile' ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/pdf"
                      className="inline-flex items-center gap-2 rounded-md bg-[#A98E7B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#957a68]"
                    >
                      Browse PDF library
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/search"
                      className="inline-flex items-center gap-2 rounded-md border border-[#d9c9bc] bg-white px-4 py-2 text-xs font-semibold text-[#2a211c] hover:bg-[#faf6f2]"
                    >
                      <Search className="h-3.5 w-3.5" />
                      Find a name
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {task === 'pdf' ? (
          <section className={`mb-10 rounded-[2rem] border border-[#e5d9cf] bg-white/95 p-7 shadow-sm sm:p-9`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7265]">Inside the library</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#2a211c]">Structured files, calmer discovery</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b584d]">
              Every PDF is treated like a publication: clear titles, honest summaries, and categories that help teams find
              the right deck without wading through unrelated formats.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b584d]">
              Use the filter above to narrow by topic, then open any card for a full read-me-first layout before
              downloading.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/profile" className="text-sm font-semibold text-[#A98E7B] hover:underline">
                See who publishes these PDFs →
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-[#A98E7B] hover:underline">
                Commission a new pack →
              </Link>
            </div>
          </section>
        ) : task === 'profile' ? (
          <section className={`mb-10 rounded-[2rem] border border-[#e5d9cf] bg-white/95 p-7 shadow-sm sm:p-9`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7265]">Directory</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#2a211c]">People, teams, and public presence</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b584d]">
              Profiles are the trust anchor next to your PDFs—bios, headshots, and focus areas stay visually linked to the
              same bronze system used across the marketing site.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b584d]">
              Filter by category to spotlight a practice group, or jump into search when you know the name you need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pdf" className="text-sm font-semibold text-[#A98E7B] hover:underline">
                Open supporting PDFs →
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-[#A98E7B] hover:underline">
                Refresh a profile →
              </Link>
            </div>
          </section>
        ) : intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-2">
          <div className="mb-6 flex flex-col gap-2 border-b border-[#eadfd6] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7265]">
                {task === 'pdf' ? 'Library shelf' : task === 'profile' ? 'Spotlight grid' : 'Latest'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#2a211c]">
                {task === 'pdf' ? 'Documents ready to open' : task === 'profile' ? 'Profiles to explore' : `${taskConfig?.label || 'Posts'}`}
              </h2>
            </div>
            {task === 'pdf' || task === 'profile' ? (
              <p className="max-w-md text-sm text-[#6b584d]">
                {task === 'pdf'
                  ? 'Larger cards on wide screens keep long titles readable; narrow viewports stack to a single column automatically.'
                  : 'Three-up grid gives portraits room—switch filters anytime without losing your place.'}
              </p>
            ) : null}
          </div>
          <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
