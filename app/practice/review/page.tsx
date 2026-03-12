'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type HistoryItem = {
  question: string
  instruction?: string
  myAnswer: number
  correctAnswer: number
  isCorrect: boolean
  type: string
}

function ReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre') || 'arithmetic'
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const data = sessionStorage.getItem('practiceHistory')
    if (!data) {
      router.push('/')
      return
    }
    setHistory(JSON.parse(data))
  }, [router])

  const wrongItems = history.filter(h => !h.isCorrect)
  const correctCount = history.length - wrongItems.length

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-4">

        <div className="text-center mb-2">
          <p className="text-yellow-300/70 text-sm tracking-widest mb-1">PRACTICE · REVIEW</p>
          <p className="text-white font-bold text-2xl">📝 My Answers</p>
          <p className="text-yellow-300 text-sm mt-1">✅ {correctCount} correct · ❌ {wrongItems.length} wrong</p>
        </div>

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

        {wrongItems.length === 0 && (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-white font-bold mb-1">🎉 Perfect! No mistakes!</p>
            <p className="text-white text-sm">You answered every question correctly!</p>
          </div>
        )}

        <div className="w-full flex flex-col gap-2">
          <button
            onClick={() => {
              const score = sessionStorage.getItem('practiceScore') || '0'
              router.push(`/practice/result?score=${score}&genre=${genre}&total=${history.length}&correct=${correctCount}`)
            }}
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

export default function PracticeReview() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
      <ReviewContent />
    </Suspense>
  )
}