'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ResultData = {
  question: string
  answer: string
  myAnswer: string
  isCorrect: boolean
  explanation: string
  genre: string
  topPercent: number
}

export default function ExpertExplanation() {
  const router = useRouter()
  const [result, setResult] = useState<ResultData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('expertResult')
    if (data) setResult(JSON.parse(data))
  }, [])

  const getDifficultyColor = (percent: number) => {
    if (percent <= 5) return '#f87171'
    if (percent <= 10) return '#fb923c'
    if (percent <= 15) return '#facc15'
    return '#a3e635'
  }

  if (!result) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">

        {/* バッジ */}
        <div className="text-center">
          <span className="text-yellow-400 text-xs font-bold tracking-widest border border-yellow-400/30 px-3 py-1 rounded-full">
            🏆 EXPERT MODE
          </span>
        </div>

        {/* 問題文 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <p className="text-white text-xs mb-2 tracking-widest">📝 Question</p>
          <p className="text-white font-bold text-lg whitespace-pre-line">{result.question}</p>
        </div>

        {/* 結果 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <p className={`text-2xl font-bold mb-2 ${result.isCorrect ? 'text-yellow-400' : 'text-red-400'}`}>
            {result.isCorrect ? '✅ Correct!' : '❌ Wrong!'}
          </p>

   <p className="text-white text-xs mb-2 tracking-widest">
  {result.isCorrect
    ? `You're in the top `
    : result.topPercent >= 30
      ? `The top `
      : `Only the top `}
  <span style={{fontWeight: 'bold', color: getDifficultyColor(result.topPercent)}}>
    {result.topPercent}%
  </span>
  {result.isCorrect
    ? ` who solved this!`
    : result.topPercent >= 30
      ? ` of people can solve this one!`
      : ` can solve this one!`}
</p>
       <p className="text-yellow-300/70 font-bold">Answer: {result.answer}</p>


          {!result.isCorrect && (
            <p className="text-white text-sm mt-1">Your answer: {result.myAnswer ?? 'No answer'}</p>
          )}
        </div>

        {/* 解説 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-cyan-400 text-xs font-bold mb-3 tracking-widest">💡 Explanation</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {result.explanation.split('\n\n').map((block, i) => (
              <p key={i} style={{color: 'white', lineHeight: '1.7', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>{block}</p>
            ))}
          </div>
        </div>

        {/* ボタン */}
        <button
          onClick={() => router.push('/expert')}
          style={{backgroundColor: '#facc15', color: '#0A1628', width: '100%', padding: '16px', fontWeight: 'bold', fontSize: '18px', borderRadius: '12px'}}
        >
          Try Again →
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition"
        >
          Back to Home
        </button>

      </div>
    </main>
  )
}