'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { luxe } from '@/components/shared/luxe-styles'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className={luxe.page}>
      <NavbarShell />
      <main>
        <section className={luxe.header}>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className={luxe.eyebrow}>Studiodiamond</p>
                <h1 className={`mt-3 ${luxe.h1} ${luxe.ink}`}>{title}</h1>
                {description ? <p className={`mt-4 max-w-2xl text-base leading-relaxed ${luxe.muted}`}>{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className={luxe.mainPad}>{children}</section>
      </main>
      <Footer />
    </div>
  )
}
