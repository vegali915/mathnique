'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number(searchParams.get('score')) || 0
  const genre = searchParams.get('genre') || 'arithmetic'
  const total = Number(searchParams.get('total')) || 0
  const correct = Number(searchParams.get('correct')) || 0

  const [isNewBest, setIsNewBest] = useState(false)
  const [bestScore, setBestScore] = useState<number | null>(null)

useEffect(() => {
    async function handleBestScore() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('practice_best_scores')
        .select('best_score')
        .eq('user_id', user.id)
        .eq('genre', genre)
        .maybeSingle()

      if (!data) {
        // 初回：INSERT
        await supabase.from('practice_best_scores').insert({
          user_id: user.id,
          genre,
          best_score: score,
        })
        setIsNewBest(true)
        setBestScore(score)
      } else {
        setBestScore(data.best_score)
        if (score > data.best_score) {
          // 更新：UPDATE
          await supabase.from('practice_best_scores')
            .update({ best_score: score })
            .eq('user_id', user.id)
            .eq('genre', genre)
          setIsNewBest(true)
          setBestScore(score)
        }
      }
    }
    handleBestScore()
    // レビュー用に履歴を保存
    const history = JSON.parse(sessionStorage.getItem('practiceHistory') || '[]')
    sessionStorage.setItem('practiceHistory', JSON.stringify(history))
  }, [])

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

  const getMessage = () => {
    if (correct === total && total > 0 && isNewBest) return '🎉 New Personal Best! Perfect score!'
    if (correct === total && total > 0) return '🏆 Perfect! No mistakes!'
    if (accuracy >= 80) return '🔥 So close to perfect! Can you get 100%?'
    if (accuracy >= 50) return '💪 Getting better! One more round?'
    return '🌱 Every expert was once a beginner. Try again!'
  }

  const genreNames: Record<string, string> = {
    arithmetic: '➕ Arithmetic',
    fillblank: '□ Fill in the Blank',
    sequence: '〜 Sequence',
    oddone: '🔍 Odd One Out',
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-yellow-300/70 text-sm tracking-widest mb-1">PRACTICE · {genreNames[genre]}</p>
          <p className="text-yellow-300/70 text-sm tracking-widest mb-2">YOUR SCORE</p>
          <p className="text-7xl font-bold text-white">{score}</p>
          <p className="text-cyan-400 text-lg mt-2">{correct} / {total} correct ({accuracy}%)</p>
          <p className="text-white/80 text-sm mt-2">{getMessage()}</p>
         
 {bestScore !== null && !isNewBest && (
            <p style={{color: 'rgba(34,211,238,0.6)'}} className="text-xs mt-1">Personal Best: {bestScore}</p>
          )}       </div>

        <div className="w-full border-t border-white/10" />

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => router.push(`/practice/review?genre=${genre}`)}
            className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 transition"
          >
            📝 Review My Answers
          </button>
          <button
            onClick={() => router.push(`/practice?genre=${genre}`)}
            className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition"
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

export default function PracticeResult() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
      <ResultContent />
    </Suspense>
  )
}