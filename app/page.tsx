'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MathBackground from "./components/MathBackground"
import { getTodayPlayInfo, recordPlay, canPlay } from '../lib/playCount'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [playsLeft, setPlaysLeft] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [canPlayToday, setCanPlayToday] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    loadPlayInfo()
    loadUser()
  }, [])

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <MathBackground />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* ログイン/アカウントボタン（右上） */}
      <div className="absolute top-6 right-6">
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
            <p className="text-white text-xs">Come back tomorrow!</p>
          </div>
        )}

        {/* 残りプレイ回数 */}
        {!isLoading && canPlayToday && (
          <p className="text-yellow-300/70 text-sm">
            {playsLeft} {playsLeft === 1 ? 'play' : 'plays'} left today
          </p>
        )}

      </div>
    </main>
  )
}