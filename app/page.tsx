'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MathBackground from "./components/MathBackground"
import { getTodayPlayInfo, recordPlay, canPlay } from '../lib/playCount'
import { supabase } from '../lib/supabase'
import { getSubscriptionStatus } from '../lib/subscription'

export default function Home() {
  const [playsLeft, setPlaysLeft] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [canPlayToday, setCanPlayToday] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [practiceOpen, setPracticeOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    loadPlayInfo()
    loadUser()
  }, [])


  async function loadUser() {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user ?? null)
    if (session?.user) {
      const pro = await getSubscriptionStatus()
      setIsPro(pro)
    }
  }

  async function loadPlayInfo() {
    const { playCount, sharedBonus } = await getTodayPlayInfo()
    const maxPlays = sharedBonus ? 5 : 3
    const remaining = Math.max(0, maxPlays - playCount)
    setPlaysLeft(remaining)
    setCanPlayToday(remaining > 0)
    setIsLoading(false)
  }

  async function handlePlay() {
    const ok = await canPlay()
    if (!ok) return
    await recordPlay()
    router.push('/countdown')
  }

  const genres = [
    { id: 'arithmetic', label: '➕ Arithmetic' },
    { id: 'fillblank',  label: '□ Fill in Blank' },
    { id: 'sequence',   label: '〜 Sequence' },
    { id: 'oddone',     label: '🔍 Odd One Out' },
  ]

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

{/* 右上：ログイン/アカウントボタン＋ミュートボタン */}
      <div style={{position: 'fixed', top: '24px', right: '24px', zIndex: 20}} className="flex flex-col items-end gap-2">
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
        ) : canPlayToday ? (
          <button
            onClick={handlePlay}
            className="mt-4 px-16 py-5 bg-cyan-400 text-[#0A1628] font-bold text-xl rounded-full hover:bg-cyan-300 hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            PLAY
          </button>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              disabled
              style={{backgroundColor: '#4B5563'}}
              className="px-16 py-5 text-gray-300 font-bold text-xl rounded-full cursor-not-allowed"
            >
              PLAY
            </button>
            <p style={{color: '#FF0000'}} className="text-sm font-bold">No plays left for today</p>
            <div
              onClick={() => router.push('/upgrade')}
              style={{border: '1px solid rgba(251,146,60,0.6)', backgroundColor: 'rgba(251,146,60,0.1)', cursor: 'pointer'}}
              className="w-full rounded-2xl p-4 text-center mt-2 hover:opacity-80 transition"
            >
              <p style={{color: '#fb923c'}} className="font-bold text-sm">⚡ Want unlimited plays?</p>
              <p style={{color: 'white'}} className="text-xs mt-1">Upgrade to Pro · Unlimited plays + Practice Mode</p>
            </div>
          </div>
        )}

        {/* 残りプレイ回数 */}
        {!isLoading && canPlayToday && (
          <p className="text-white text-sm">
            <span style={{color: '#facc15'}}>{playsLeft}</span> {playsLeft === 1 ? 'play' : 'plays'} left today
          </p>
        )}
      </div>

      {/* ハンバーガーメニュー */}
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

            {/* Daily Quest */}
            <button
              onClick={() => { setMenuOpen(false); router.push('/daily-quest') }}
              className="w-full py-3 font-bold rounded-xl border transition"
              style={{backgroundColor: 'rgba(253,224,71,0.15)', color: 'rgba(253,224,71,0.9)', border: '1px solid rgba(253,224,71,0.3)'}}
            >
              🎯 Daily Quest
            </button>

            {/* 未課金ユーザーのみUpgrade to Proを表示 */}
            {!isPro && (
              <button
                onClick={() => { setMenuOpen(false); router.push('/upgrade') }}
                className="w-full py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition"
              >
                ⚡ Upgrade to Pro
              </button>
            )}

            {/* Practice Mode アコーディオン */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  if (!isPro) { setMenuOpen(false); router.push('/upgrade'); return }
                  setPracticeOpen(prev => !prev)
                }}
                className={`w-full py-3 font-bold rounded-xl border transition flex items-center justify-between px-4 ${isPro ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/30' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
              >
                <span>{isPro ? '✅ Practice Mode' : '🔒 Practice Mode'}</span>
                {isPro && <span className="text-sm">{practiceOpen ? '▲' : '▼'}</span>}
              </button>

              {isPro && practiceOpen && (
                <div className="flex flex-col pl-3">
                  {genres.map((genre, index) => (
                    <div key={genre.id}>
                      <button
                        onClick={() => {
                          setMenuOpen(false)
                          router.push(`/practice?genre=${genre.id}`)
                        }}
                        className="w-full py-3 text-sm text-left pl-4 transition hover:opacity-100 opacity-80"
                        style={{color: 'white'}}
                      >
                        {genre.label}
                      </button>
                      {index < genres.length - 1 && (
                        <div style={{height: '1px', backgroundColor: 'rgba(34,211,238,0.3)'}} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Expert Mode */}
            <button
              onClick={() => { setMenuOpen(false); isPro ? router.push('/countdown?mode=expert') : router.push('/upgrade') }}
              className={`w-full py-3 font-bold rounded-xl border transition ${isPro ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/30' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
            >
              {isPro ? '🏆 Expert Mode' : '🔒 Expert Mode'}
            </button>

            <div className="border-t border-white/10 my-2" />

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