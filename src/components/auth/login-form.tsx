'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

type LoginFormProps = {
  className?: string
  submitClassName?: string
  mutedClassName?: string
}

export function LoginForm({ className, submitClassName, mutedClassName }: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    try {
      await login(email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <input
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        name="email"
      />
      <input
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        name="password"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className={submitClassName ?? 'inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold'}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClassName ?? ''}`}>
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </form>
  )
}
