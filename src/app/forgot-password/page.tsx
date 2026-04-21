'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { luxe } from '@/components/shared/luxe-styles'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={`${luxe.page} flex min-h-screen flex-col`}>
      <NavbarShell />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md ${luxe.card} p-8`}
        >
          <Link href="/login" className={`mb-8 inline-flex items-center gap-2 text-sm ${luxe.muted} hover:text-[#A98E7B]`}>
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <p className={luxe.eyebrow}>Password help</p>
              <h1 className={`mt-3 font-display text-3xl font-semibold tracking-tight ${luxe.ink}`}>Reset your password</h1>
              <p className={`mt-3 text-sm leading-relaxed ${luxe.muted}`}>
                Enter the email tied to your PDF & profile workspace. We will send a secure link so you can choose a new
                password without losing saved uploads.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className={luxe.ink}>
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A98E7B]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-[#e5d9cf] bg-white pl-10 text-[#2a211c] placeholder:text-[#9a8578]"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="h-11 w-full bg-[#A98E7B] text-white hover:bg-[#957a68]" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send reset link'}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#c8e6d4] bg-[#e8f5ee]">
                <CheckCircle className="h-8 w-8 text-[#2f7a4a]" />
              </div>
              <h1 className={`font-display text-3xl font-semibold ${luxe.ink}`}>Check your email</h1>
              <p className={`mt-3 text-sm leading-relaxed ${luxe.muted}`}>
                We&apos;ve sent a reset link to <strong className={luxe.ink}>{email}</strong>
              </p>
              <Button asChild variant="outline" className={`mt-8 w-full ${luxe.btnOutline}`}>
                <Link href="/login">Back to login</Link>
              </Button>
              <p className={`mt-6 text-sm ${luxe.muted}`}>
                Didn&apos;t receive the email?{' '}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#A98E7B] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
