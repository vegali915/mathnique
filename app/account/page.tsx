'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Account() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setIsLoading(false)
    }
    loadUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return <div className="min-h-screen bg-[#0A1628]" />
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4" style={{backgroundColor: '#0A1628'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6">

        {/* ロゴ */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Math<span className="text-cyan-400">nique</span>
          </h1>
          <p className="text-yellow-300/70 text-sm mt-2">My Account</p>
        </div>

        {/* ユーザー情報 */}
        <div style={{border: '1px solid rgba(34,211,238,0.2)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <p className="text-white text-xs tracking-widest">EMAIL</p>
          <p style={{color: 'white'}} className="font-bold">{user.email}</p>
        </div>

        {/* ログアウトボタン */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          Log Out
        </button>

        {/* 戻るボタン */}
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