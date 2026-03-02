'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number(searchParams.get('score')) || 0
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const percentile = score > 200 ? 5 : score > 100 ? 20 : 50

  const shareText = percentile <= 5
    ? `My score is in the top 5%! Can you beat me? 🔥\nTake the challenge → mathnique.vercel.app`
    : percentile <= 20
    ? `My score is in the top 20%! Think you can do better? 💡\nTake the challenge → mathnique.vercel.app`
    : `I just tested my math skills on Mathnique! Can you beat my score? 🎯\nTake the challenge → mathnique.vercel.app`

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