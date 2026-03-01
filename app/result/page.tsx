'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function Result() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number(searchParams.get('score')) || 0

  const percentile = score > 200 ? 5 : score > 100 ? 20 : 50

  const shareText = percentile <= 5
    ? `I scored ${score} pts on Mathnique! Top ${percentile}% 🧠🔥 Can you beat me?`
    : percentile <= 20
    ? `I scored ${score} pts on Mathnique! Top ${percentile}% 💡 Try to beat my score!`
    : `I scored ${score} pts on Mathnique! Think you can do better? 🎯`

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A1628] relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">

        <div className="text-center">
          <p className="text-cyan-400/60 text-sm tracking-widest mb-2">YOUR SCORE</p>
          <p className="text-7xl font-bold text-white">{score}</p>
          <p className="text-cyan-400 text-lg mt-2">Top {percentile}% 🎉</p>
        </div>

        <div className="w-full border-t border-white/10" />

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => {
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\nmathnique.app')}`
              window.open(url, '_blank')
            }}
            className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Share on X 🚀
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
    </main>
  )
}