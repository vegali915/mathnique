'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer,Tooltip } from 'recharts'

function generateDistributionData() {
  const data = []
  for (let i = 0; i <= 1000; i += 20) {
  const mean = 250
  const std = 150
    const value = Math.exp(-Math.pow(i - mean, 2) / (2 * std * std))
    data.push({ score: i, value: Math.round(value * 1000) })
  }
  return data
}

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number(searchParams.get('score')) || 0
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const percentile = score > 500 ? 5 : score > 420 ? 10 : score > 350 ? 15 : score > 280 ? 20 : score > 200 ? 30 : 50
  const distributionData = generateDistributionData()
  const userScoreRounded = Math.min(Math.round(score / 20) * 20, 1000)

  const shareText = percentile <= 5
  ? `I scored ${score} pts on a 1-minute math challenge and ranked in the top 5%! Can you beat me? 🔥\nTry Mathnique → mathnique.vercel.app`
  : percentile <= 15
  ? `I scored ${score} pts on a 1-minute math challenge and ranked in the top ${percentile}%! Think you can beat me? 💡\nTry Mathnique → mathnique.vercel.app`
  : `I just scored ${score} pts on a 1-minute math challenge! Can you beat my score? 🎯\nTry Mathnique → mathnique.vercel.app`

  const shareUrl = 'https://mathnique.vercel.app'

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-yellow-300/70 text-sm tracking-widest mb-2">YOUR SCORE</p>
          <p className="text-7xl font-bold text-white">{score}</p>
          <p className="text-cyan-400 text-lg mt-2">Top {percentile}% 🎉</p>
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
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f472b6"
                strokeWidth={2}
                fill="url(#colorPink)"
              />
              <Tooltip
  contentStyle={{ background: '#0f2040', border: '1px solid #f472b6', borderRadius: '8px', color: '#ffffff', fontSize: '12px' }}
itemStyle={{ color: '#ffffff' }}
  formatter={(value: unknown) => [value, 'Players']}
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

        <div className="w-full border-t border-white/10" />

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => setShowShare(true)}
            className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Share My Result 🚀
          </button>
          <button
            onClick={() => router.push('/countdown')}
            className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            Play Again
          </button>
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
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowShare(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-[#0f2040] rounded-3xl p-6 flex flex-col gap-4">
            <p className="text-white font-bold text-center text-lg">Share My Result! 🚀</p>

            <button
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
                setShowShare(false)
              }}
              className="w-full py-4 bg-black text-white font-bold text-lg rounded-2xl hover:bg-zinc-800 transition"
            >
              X (Twitter)
            </button>

            <button
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
                setShowShare(false)
              }}
              className="w-full py-4 bg-[#1877F2] text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition"
            >
              Facebook
            </button>

            <button
              onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
                setShowShare(false)
              }}
              className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-2xl hover:bg-green-500 transition"
            >
              WhatsApp
            </button>

            <button
              onClick={handleCopy}
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