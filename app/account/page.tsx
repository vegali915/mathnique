'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { getSubscriptionStatus } from '../../lib/subscription'
import { getTodayPlayInfo } from '../../lib/playCount'

export default function Account() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)
  const [playsLeft, setPlaysLeft] = useState(0)
  const [scores, setScores] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      const pro = await getSubscriptionStatus()
      setIsPro(pro)
      const { playCount, sharedBonus } = await getTodayPlayInfo()
      const maxPlays = sharedBonus ? 5 : 3
      setPlaysLeft(Math.max(0, maxPlays - playCount))

      // スコア履歴を取得（最新10件）
      const { data: sessionData } = await supabase
        .from('play_sessions')
        .select('score, played_at')
        .eq('user_id', user.id)
        .order('played_at', { ascending: false })
        .limit(10)
      setScores(sessionData || [])
      setIsLoading(false)
    }
    loadData()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return <div className="min-h-screen bg-[#0A1628]" />
  }

  const bestScore = scores.length > 0 ? Math.max(...scores.map(s => s.score)) : null

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden px-4 py-12" style={{backgroundColor: '#0A1628'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">

        {/* ロゴ */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Math<span className="text-cyan-400">nique</span>
          </h1>
          <p className="text-yellow-300/70 text-sm mt-2">My Account</p>
        </div>

        {/* ユーザー情報 */}
        <div style={{border: '1px solid rgba(34,211,238,0.2)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <p className="text-yellow-300/70 text-xs tracking-widest">EMAIL</p>
          <p className="text-white font-bold">{user.email}</p>
        </div>

        {/* プランステータス */}
        <div style={{border: isPro ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(255,255,255,0.1)', backgroundColor: isPro ? 'rgba(34,211,238,0.05)' : 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <p className="text-yellow-300/70 text-xs tracking-widest">PLAN</p>
          {isPro ? (
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold text-lg">⚡ Pro</span>
              <span className="text-white text-sm">· Unlimited plays</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">Free</span>
                <span className="text-white text-sm">· {playsLeft} plays left today</span>
              </div>
              <button
                onClick={() => router.push('/upgrade')}
                style={{backgroundColor: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.4)'}}
                className="mt-1 w-full py-2 text-orange-400 font-bold text-sm rounded-xl hover:opacity-80 transition"
              >
                ⚡ Upgrade to Pro · $2.99/mo
              </button>
            </div>
          )}
        </div>

        {/* スコア履歴 */}
        <div style={{border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-yellow-300/70 text-xs tracking-widest">SCORE HISTORY</p>
            {bestScore && <p className="text-yellow-300 text-xs font-bold">Best: {bestScore}</p>}
          </div>
          {scores.length === 0 ? (
            <p className="text-white/30 text-sm">No games played yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {scores.map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-white text-xs">
                    {new Date(s.played_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-white font-bold">{s.score} pts</span>
                </div>
              ))}
            </div>
          )}
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