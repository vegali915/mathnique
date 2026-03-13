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
  const [topScores, setTopScores] = useState<any[]>([])
  const [bestScore, setBestScore] = useState<number | null>(null)

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

      // 全期間ベスト5を取得
      const { data: topData } = await supabase
        .from('play_sessions')
        .select('score, played_at')
        .eq('user_id', user.id)
        .order('score', { ascending: false })
        .limit(5)
      setTopScores(topData || [])
      if (topData && topData.length > 0) {
        setBestScore(topData[0].score)
      }

      setIsLoading(false)
    }
    loadData()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return <div style={{minHeight: '100vh', backgroundColor: '#0A1628'}} />
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#0A1628'}} className="flex flex-col items-center justify-start relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{backgroundColor: 'rgba(34,211,238,0.08)'}} />
      </div>
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">

        {/* ロゴ */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Math<span style={{color: 'rgba(34,211,238,1)'}}>nique</span>
          </h1>
          <p style={{color: 'rgba(253,224,71,0.7)', fontSize: '14px', marginTop: '8px'}}>My Account</p>
        </div>

        {/* ユーザー情報 */}
        <div style={{border: '1px solid rgba(34,211,238,0.2)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <p style={{color: 'rgba(253,224,71,0.7)', fontSize: '12px', letterSpacing: '0.1em'}}>EMAIL</p>
          <p style={{color: 'white', fontWeight: 'bold'}}>{user.email}</p>
        </div>

        {/* プランステータス */}
        <div style={{border: isPro ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(255,255,255,0.1)', backgroundColor: isPro ? 'rgba(34,211,238,0.05)' : 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <p style={{color: 'rgba(253,224,71,0.7)', fontSize: '12px', letterSpacing: '0.1em'}}>PLAN</p>
          {isPro ? (
            <div className="flex items-center gap-2">
              <span style={{color: 'rgba(34,211,238,1)', fontWeight: 'bold', fontSize: '18px'}}>⚡ Pro</span>
              <span style={{color: 'white', fontSize: '14px'}}>· Unlimited plays</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span style={{color: 'white', fontWeight: 'bold', fontSize: '18px'}}>Free</span>
                <span style={{color: 'white', fontSize: '14px'}}>· {playsLeft} plays left today</span>
              </div>
              <button
                onClick={() => router.push('/upgrade')}
                style={{backgroundColor: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.4)', color: 'rgba(251,146,60,1)', fontWeight: 'bold', fontSize: '14px'}}
                className="mt-1 w-full py-2 rounded-xl hover:opacity-80 transition"
              >
                ⚡ Upgrade to Pro · $2.99/mo
              </button>
            </div>
          )}
        </div>

        {/* ベスト5スコア */}
        <div style={{border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p style={{color: 'rgba(253,224,71,0.7)', fontSize: '12px', letterSpacing: '0.1em'}}>TOP 5 SCORES</p>
            {bestScore && <p style={{color: 'rgba(253,224,71,1)', fontSize: '12px', fontWeight: 'bold'}}>Best: {bestScore} pts</p>}
          </div>
          {topScores.length === 0 ? (
            <p style={{color: 'rgba(255,255,255,0.3)', fontSize: '14px'}}>No games played yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {topScores.map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span style={{color: i === 0 ? 'rgba(253,224,71,1)' : 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 'bold', width: '20px'}}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <span style={{color: 'rgba(255,255,255,0.5)', fontSize: '12px'}}>
                      {new Date(s.played_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <span style={{color: 'white', fontWeight: 'bold', fontSize: '16px'}}>{s.score} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

{/* 戻るボタン */}
        <button
          onClick={() => router.push('/')}
          style={{backgroundColor: 'rgba(34,211,238,1)', color: '#0A1628', fontWeight: 'bold', fontSize: '18px', borderRadius: '9999px', padding: '16px', width: '100%'}}
        >
          ← Back to Home
        </button>

        {/* ログアウトボタン */}
        <button
          onClick={handleLogout}
          style={{color: 'rgba(255,255,255,0.3)', fontSize: '14px', padding: '12px', width: '100%'}}
        >
          Log Out
        </button>
      </div>
    </main>
  )
}