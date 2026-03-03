'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type HistoryItem = {
  question: string
  instruction?: string
  myAnswer: number
  correctAnswer: number
  isCorrect: boolean
  type: string
}

export default function Review() {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const data = sessionStorage.getItem('gameHistory')
    if (!data) {
      router.push('/')
      return
    }
    setHistory(JSON.parse(data))
  }, [router])

  const wrongItems = history.filter(h => !h.isCorrect)
  const correctCount = history.length - wrongItems.length

  const typeNames: Record<string, string> = {
    arithmetic: 'Arithmetic',
    fillblank: 'Fill in the Blank',
    sequence: 'Sequences',
    oddone: 'Odd One Out',
  }

  const weakType = () => {
    if (wrongItems.length === 0) return null
    const counts: Record<string, number> = {}
    wrongItems.forEach(h => {
      counts[h.type] = (counts[h.type] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
  }

  const weak = weakType()

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-4">

        {/* ヘッダー */}
        <div className="text-center mb-2">
          <p className="text-yellow-300/70 text-sm tracking-widest mb-1">REVIEW</p>
          <p className="text-white font-bold text-2xl">📝 My Answers</p>
          <p className="text-yellow-300 text-sm mt-1">✅ {correctCount} correct · ❌ {wrongItems.length} wrong</p>
        </div>

        {/* 問題一覧 */}
        {history.map((item, i) => (
          <div
            key={i}
            className={`w-full rounded-2xl p-4 border ${item.isCorrect ? 'bg-cyan-400/10 border-cyan-400/30' : 'bg-red-500/10 border-red-400/30'}`}
          >
            {item.instruction && (
              <p className="text-yellow-300 text-xs mb-1">{item.instruction}</p>
            )}
            <p className="text-white font-bold text-lg mb-2">{item.question}</p>
            <div className="flex gap-3 text-sm">
              <span className={`${item.isCorrect ? 'text-cyan-400' : 'text-red-400'}`}>
                {item.isCorrect ? '✅' : '❌'} Your answer: {item.myAnswer}
              </span>
              {!item.isCorrect && (
                <span className="text-cyan-400">
                  ✓ Correct: {item.correctAnswer}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* 弱点分析 */}
        {weak ? (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-white font-bold mb-1">📊 You struggled with {typeNames[weak]}!</p>
            <p className="text-yellow-300 text-sm mb-3">💡 Want to improve? Try Practice Mode!</p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-cyan-400/20 text-cyan-400 font-bold rounded-xl border border-cyan-400/30 hover:bg-cyan-400/30 transition"
            >
              💡 Try Practice Mode
            </button>
          </div>
        ) : (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-white font-bold mb-1">🎉 Perfect! No mistakes!</p>
            <p className="text-white text-sm mb-3">🔥 Can you beat your own score? Play again!</p>
            <button
              onClick={() => router.push('/countdown')}
              className="w-full py-3 bg-cyan-400 text-[#0A1628] font-bold rounded-xl hover:bg-cyan-300 transition"
            >
              Play Again
            </button>
          </div>
        )}

{/* 戻るボタン */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={() => router.back()}
            className="w-full py-3 text-cyan-400/50 text-sm hover:text-cyan-400 transition"
          >
            ← Back to Result
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