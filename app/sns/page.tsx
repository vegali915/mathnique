'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MathBackground from "../components/MathBackground"
import { supabase } from '../../lib/supabase'
import { getSubscriptionStatus } from '../../lib/subscription'
import { canPlayQuest } from '../../lib/playCount'

export default function SnsPage() {
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [alreadyPlayed, setAlreadyPlayed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        const pro = await getSubscriptionStatus()
        setIsPro(pro)
      }
      const can = await canPlayQuest()
      setAlreadyPlayed(!can)
      setIsLoading(false)
    }
    init()
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <MathBackground />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* メニューボタン（左上） */}
      <div style={{position: 'fixed', top: '24px', left: '24px', zIndex: 20}}>
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white text-sm border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition flex items-center gap-1"
        >
          <span>☰</span>
          <span>MENU</span>
        </button>
      </div>

      {/* 右上：ログイン/アカウントボタン */}
      <div style={{position: 'fixed', top: '24px', right: '24px', zIndex: 20}}>
        {user ? (
          <button
            onClick={() => router.push('/account')}
            className="text-cyan-400 text-sm border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition"
          >
            My Account
          </button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="text-cyan-400 text-sm border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ロゴ */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white tracking-wider">
            Math<span className="text-cyan-400">nique</span>
          </h1>
          <p className="text-yellow-300/70 text-sm mt-2 tracking-widest">
            1-MINUTE MATH CHALLENGE
          </p>
        </div>

        {/* プレイボタン */}
        {isLoading ? (
          <div className="mt-4 px-16 py-5 text-cyan-400">Loading...</div>
        ) : alreadyPlayed ? (
          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              disabled
              style={{backgroundColor: '#4B5563'}}
              className="px-16 py-5 text-gray-300 font-bold text-xl rounded-full cursor-not-allowed"
            >
              TODAY'S CHALLENGE
            </button>
            <p style={{color: '#FF0000'}} className="text-sm font-bold">Already completed today!</p>
            <p className="text-white/50 text-xs">Come back tomorrow for a new challenge</p>
            <button
              onClick={() => router.push('/')}
              className="mt-2 text-cyan-400/70 text-sm hover:text-cyan-400 transition"
            >
              Try Normal Mode →
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              onClick={() => router.push('/daily-quest')}
              className="px-16 py-5 bg-cyan-400 text-[#0A1628] font-bold text-xl rounded-full hover:bg-cyan-300 hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              TODAY'S CHALLENGE
            </button>
            <p className="text-white/60 text-sm">
              ✨ Tap to try today's special quest!
            </p>
          </div>
        )}
      </div>

      {/* メニュー */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="relative z-10 w-72 h-full bg-[#0f2040] flex flex-col p-8 gap-4 overflow-y-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-white hover:text-cyan-400 transition mb-4 text-xl"
            >
              ✕
            </button>
            <button
              onClick={() => { setMenuOpen(false); router.push('/about') }}
              className="w-full py-3 text-white text-left hover:text-cyan-400 transition"
            >
              About
            </button>
            <button
              onClick={() => { setMenuOpen(false); router.push(user ? '/account' : '/login') }}
              className="w-full py-3 text-white text-left hover:text-cyan-400 transition"
            >
              {user ? 'My Account' : 'Login / Sign Up'}
            </button>
            <button
              onClick={() => { setMenuOpen(false); router.push('/terms') }}
              className="w-full py-3 text-white text-left hover:text-cyan-400 transition"
            >
              Terms of Service
            </button>
            <button
              onClick={() => { setMenuOpen(false); router.push('/privacy') }}
              className="w-full py-3 text-white text-left hover:text-cyan-400 transition"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      )}

      {/* フッター */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center gap-4 py-3">
        <a href="/privacy" className="text-white/30 text-xs hover:text-white/50 transition">Privacy Policy</a>
        <span className="text-white/20 text-xs">·</span>
        <a href="/terms" className="text-white/30 text-xs hover:text-white/50 transition">Terms</a>
      </div>
    </main>
  )
}