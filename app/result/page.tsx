'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts'
import { getTodayPlayInfo, applyShareBonus, canPlay, recordPlay } from '../../lib/playCount'
import { supabase } from '../../lib/supabase'
import { getSubscriptionStatus } from '../../lib/subscription'

function generateDistributionData() {
  const data = []
  for (let i = 0; i <= 1200; i += 20) {
    const mean = 450
    const std = 140
    const raw = Math.exp(-Math.pow(i - mean, 2) / (2 * std * std))
    const rampUp = Math.min(1, i / 150)
    const value = Math.round(raw * rampUp * 1000)
    data.push({ score: i, value })
  }
  return data
}

function calculatePercentile(score: number): number {
  const data = generateDistributionData()
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const above = data.filter(d => d.score > score).reduce((sum, d) => sum + d.value, 0)
  const result = Math.round((above / total) * 100)
  return result === 0 ? 1 : result
}

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number(searchParams.get('score')) || 0
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasShared, setHasShared] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    async function loadInfo() {
      const { playCount, sharedBonus } = await getTodayPlayInfo()
      setPlayCount(playCount)
      setHasShared(sharedBonus)
      const pro = await getSubscriptionStatus()
      setIsPro(pro)
    }
    loadInfo()

    async function saveScore() {
      if (!score) return
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await supabase.from('play_sessions').insert({
        user_id: user.id,
        score: score,
        played_at: new Date().toISOString(),
      })
    }
    saveScore()
  }, [])

  const percentile = calculatePercentile(score)
  const distributionData = generateDistributionData()
  const userScoreRounded = Math.min(Math.round(score / 20) * 20, 1200)

  const getMessage = () => {
    if (percentile <= 1) return '🏆 Legendary! You\'re a math genius!'
    if (percentile <= 5) return '🔥 Outstanding! You\'re in the elite!'
    if (percentile <= 10) return '⭐ Excellent! You\'re crushing it!'
    if (percentile <= 15) return '💪 Amazing effort! You\'re so close to the top — one more game?'
    if (percentile <= 20) return '🎯 Great performance! Top 10% is totally within your reach!'
    if (percentile <= 30) return '🚀 Solid effort! The more you play, the better you get!'
    return '🌱 Great start! Every top player began right here!'
  }

  const shareText = percentile <= 1
    ? `I scored ${score} pts on a 1-minute math challenge and ranked in the top 1%! Can you beat me? 🏆\nTry Mathnique → mathniqueplay.com`
    : percentile <= 5
    ? `I scored ${score} pts on a 1-minute math challenge and ranked in the top 5%! Can you beat me? 🔥\nTry Mathnique → mathniqueplay.com`
    : percentile <= 15
    ? `I scored ${score} pts on a 1-minute math challenge and ranked in the top ${percentile}%! Think you can beat me? 💡\nTry Mathnique → mathniqueplay.com`
    : `I just scored ${score} pts on a 1-minute math challenge! Can you beat my score? 🎯\nTry Mathnique → mathniqueplay.com`

  const shareUrl = 'https://mathniqueplay.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async (action: () => void) => {
    action()
    if (!hasShared) {
      await applyShareBonus()
      setHasShared(true)
    }
    setShowShare(false)
  }

  const playsRemaining = hasShared ? Math.max(0, 5 - playCount) : Math.max(0, 3 - playCount)
  const showSharePromo = !hasShared && !isPro
  const showPaywall = playsRemaining === 0 && !isPro

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 pt-24">
        <div className="text-center">
          <p className="text-yellow-300/70 text-sm tracking-widest mb-2">YOUR SCORE</p>
          <p className="text-7xl font-bold text-white">{score}</p>
          {percentile <= 30 ? (
            <p className="text-cyan-400 text-lg mt-2">Top {percentile}%</p>
          ) : null}
          <p className="text-white/80 text-sm mt-2">{getMessage()}</p>
        </div>

        {/* スコア分布グラフ */}
        <div className="w-full bg-white/5 border border-pink-400/20 rounded-2xl p-4">
          <p className="text-white text-xs text-center mb-1 tracking-widest">SCORE DISTRIBUTION</p>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={distributionData} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f472b6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="score"
                tick={{ fill: '#ffffff', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Score', position: 'insideBottom', fill: '#ffffff', fontSize: 11, offset: -5 }}
              />
              <YAxis
                tick={{ fill: '#ffffff', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={55}
                label={{ value: 'Players', angle: -90, position: 'insideLeft', fill: '#ffffff', fontSize: 11, offset: 10 }}
              />
              <Area type="monotone" dataKey="value" stroke="#f472b6" strokeWidth={2} fill="url(#colorPink)" />
              <Tooltip
                contentStyle={{ background: '#0f2040', border: '1px solid #f472b6', borderRadius: '8px', color: '#ffffff', fontSize: '12px' }}
                itemStyle={{ color: '#ffffff' }}
                formatter={(value: any) => [value, 'Players']}
                labelFormatter={(label) => `Score: ${label}`}
              />
              <ReferenceLine
                x={userScoreRounded}
                stroke="#facc15"
                strokeWidth={2}
                strokeDasharray="4 2"
                label={{ value: '▲ You', position: 'top', fill: '#facc15', fontSize: 12, fontWeight: 'bold' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* シェアで+2回バナー（未シェア・非Proのみ） */}
        {showSharePromo && (
          <div
            onClick={() => setShowShare(true)}
            style={{border: '1px solid rgba(253,224,71,0.6)', backgroundColor: 'rgba(253,224,71,0.1)', cursor: 'pointer'}}
            className="w-full rounded-2xl p-4 text-center hover:opacity-80 transition"
          >
            <p className="text-yellow-300 font-bold text-sm">🎁 Share to unlock 2 more plays!</p>
            <p className="text-white text-xs mt-1">Once per day</p>
          </div>
        )}

        {/* 課金バナー（残りプレイ0・非Proのみ） */}
        {showPaywall && (
          <div
            onClick={() => router.push('/upgrade')}
            style={{border: '1px solid rgba(251,146,60,0.6)', backgroundColor: 'rgba(251,146,60,0.1)', cursor: 'pointer'}}
            className="w-full rounded-2xl p-4 text-center hover:opacity-80 transition"
          >
            <p style={{color: '#fb923c'}} className="font-bold text-sm">⚡ Want unlimited plays?</p>
            <p style={{color: 'white'}} className="text-xs mt-1">Upgrade to Pro · Unlimited plays + Practice Mode</p>
          </div>
        )}

        {/* PWA追加バナー（残りプレイ0・非Proのみ） */}
        {showPaywall && (
          <div className="w-full p-2 text-center">
            <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px'}}>📲 Add to your Home Screen to never miss your 3 free plays!</p>
          </div>
        )}

        <div className="w-full border-t border-white/10" />

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => setShowShare(true)}
            className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Share My Result 🚀
          </button>

          <button
            onClick={() => router.push('/review')}
            className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            📝 Review My Answers
          </button>

          <button
            onClick={async () => {
              const ok = await canPlay()
              if (!ok) {
                router.push('/')
                return
              }
              await recordPlay()
              router.push('/countdown')
            }}
            className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            Play Again
          </button>

          {!isPro && (
            <p className="text-white text-xs text-center">
              <span style={{color: '#facc15'}}>{playsRemaining}</span> plays remaining today
            </p>
          )}

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 text-cyan-400/50 text-sm hover:text-cyan-400 transition"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* シェアポップアップ */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowShare(false)} />
          <div className="relative z-10 w-full max-w-lg bg-[#0f2040] rounded-3xl p-6 flex flex-col gap-4">
            <p className="text-white font-bold text-center text-lg">Share My Result! 🚀</p>
            <button
              onClick={() => handleShare(() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank'))}
              className="w-full py-4 bg-black text-white font-bold text-lg rounded-2xl hover:bg-zinc-800 transition"
            >
              X (Twitter)
            </button>
            <button
              onClick={() => handleShare(() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank'))}
              className="w-full py-4 bg-[#1877F2] text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare(() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank'))}
              className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-2xl hover:bg-green-500 transition"
            >
              WhatsApp
            </button>
            <button
              onClick={() => { handleCopy(); if (!hasShared) { applyShareBonus(); setHasShared(true); } }}
              className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition"
            >
              {copied ? 'Copied! ✅' : 'Copy Text 📋'}
            </button>
            <button
              onClick={() => setShowShare(false)}
              className="w-full py-3 text-cyan-400/50 text-sm hover:text-cyan-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default function Result() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
      <ResultContent />
    </Suspense>
  )
}