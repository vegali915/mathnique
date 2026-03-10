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
}

export default function ExpertExplanation() {
  const router = useRouter()
  const [result, setResult] = useState<ResultData | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('expertResult')
    if (data) setResult(JSON.parse(data))
  }, [])

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
  <p className="text-white text-xs mb-2 tracking-widest">📝 問題</p>
  <p className="text-white font-bold text-lg whitespace-pre-line">{result.question}</p>
</div>

{/* 結果 */}
<div className={`rounded-2xl p-5 text-center border ${result.isCorrect ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-red-500/10 border-red-400/30'}`}>
  <p className={`text-2xl font-bold mb-2 ${result.isCorrect ? 'text-yellow-400' : 'text-red-400'}`}>
    {result.isCorrect ? '✅ 正解！' : '❌ 不正解'}
  </p>
  <p className="text-white font-bold">正解：{result.answer}</p>
  {!result.isCorrect && (
    <p className="text-red-300 text-sm mt-1">あなたの回答：{result.myAnswer}</p>
  )}
</div>
        {/* 解説 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-cyan-400 text-xs font-bold mb-3 tracking-widest">💡 解説</p>
  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  {result.explanation.split('\n\n').map((block, i) => (
    <p key={i} style={{color: 'white',lineHeight: '1.7', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>{block}</p>
  ))}
</div>
  </div>

        {/* ボタン */}
<button
  onClick={() => router.push('/expert')}
  style={{backgroundColor: '#facc15', color: '#0A1628', width: '100%', padding: '16px', fontWeight: 'bold', fontSize: '18px', borderRadius: '12px'}}
>
  もう一度挑戦 →
</button>
        <button
          onClick={() => router.push('/')}
          className="w-full py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition"
        >
          ホームに戻る
        </button>

      </div>
    </main>
  )
}