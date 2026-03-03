'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleGoogleLogin() {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    if (error) {
      setMessage('Something went wrong. Please try again.')
      setIsError(true)
      setIsLoading(false)
    }
  }

  async function handleEmailLogin() {
    if (!email) {
      setMessage('Please enter your email address.')
      setIsError(true)
      return
    }
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    })
    if (error) {
      setMessage('Something went wrong. Please try again.')
      setIsError(true)
    } else {
      setMessage('Email sent! Click the link in your inbox to log in.')
      setIsError(false)
    }
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4" style={{backgroundColor: '#0A1628'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Math<span className="text-cyan-400">nique</span>
          </h1>
          <p className="text-yellow-300/70 text-sm mt-2">Sign in to save your progress</p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{backgroundColor: 'white', border: '2px solid #d1d5db'}}
          className="w-full py-4 text-gray-900 font-bold text-lg rounded-full transition flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 border-t border-white/20" />
          <p className="text-white/40 text-sm">or</p>
          <div className="flex-1 border-t border-white/20" />
        </div>

        {/* Email Login */}
        <div className="w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 px-5 bg-white/10 text-white placeholder-white/40 rounded-full border border-white/20 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition"
          >
            {isLoading ? 'Sending...' : 'Continue with Email'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p style={{color: isError ? '#FF0000' : '#22d3ee'}} className="text-sm text-center">
            {message}
          </p>
        )}

        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="text-yellow-300/70 text-sm hover:text-yellow-300 transition mt-2"
        >
          ← Back to Home
        </button>

      </div>
    </main>
  )
}