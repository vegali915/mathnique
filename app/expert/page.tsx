'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generateExpertQuestion, ExpertQuestion } from '../../lib/expertQuestions'

export default function ExpertGame() {
  const router = useRouter()
  const [question, setQuestion] = useState<ExpertQuestion | null>(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [answered, setAnswered] = useState<'correct' | 'wrong' | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    setQuestion(generateExpertQuestion())
  }, [])

  useEffect(() => {
    if (!question) return
    if (answered !== null || timeUp) return
    if (timeLeft === 0) {
      setTimeUp(true)
      sessionStorage.setItem('expertResult', JSON.stringify({
        question: question.question,
        answer: question.answer,
        myAnswer: null,
        isCorrect: false,
        explanation: question.explanation,
        genre: question.genre
      }))
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, answered, timeUp, question])

  const handleAnswer = (choice: string) => {
    if (!question || answered !== null || timeUp) return
    const isCorrect = choice === question.answer
    setAnswered(isCorrect ? 'correct' : 'wrong')
    setSelectedChoice(choice)
    sessionStorage.setItem('expertResult', JSON.stringify({
      question: question.question,
      answer: question.answer,
      myAnswer: choice,
      isCorrect,
      explanation: question.explanation,
      genre: question.genre
    }))
  }

  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'text-cyan-400'

  const getButtonClass = (choice: string) => {
    if (answered === null && !timeUp) {
      return 'bg-white/10 text-white border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400 hover:scale-105 active:scale-95'
    }
    if (choice === question?.answer) {
      return 'bg-cyan-400 text-[#0A1628] border border-cyan-400'
    }
    if (choice === selectedChoice && choice !== question?.answer) {
      return 'bg-red-500 text-white border border-red-400'
    }
    return 'bg-white/10 text-white border border-white/20'
  }

  if (!question) return null

  return (
 <main className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
         <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">

        <div className="flex justify-between items-center">
          <span className="text-yellow-400 text-xs font-bold tracking-widest border border-yellow-400/30 px-3 py-1 rounded-full">
            🏆 EXPERT MODE
          </span>
          <div className={`font-bold text-2xl ${timerColor}`}>
            {timeUp ? '⏰' : `${timeLeft}s`}
          </div>
        </div>

        <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
          <p className="text-white text-2xl font-bold whitespace-pre-line">{question.question}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              className={`py-5 rounded-xl font-bold text-xl transition-all duration-150 ${getButtonClass(choice)}`}
            >
              {choice}
            </button>
          ))}
        </div>

{(answered !== null || timeUp) && (
  <div className="flex flex-col items-center gap-3">
    <p className={`text-2xl font-bold ${answered === 'correct' ? 'text-yellow-400' : 'text-red-400'}`}>
      {timeUp ? '⏰ 時間切れ！' : answered === 'correct' ? '✅ 正解！' : '❌ 不正解'}
    </p>
    <button
      onClick={() => router.push('/expert/explanation')}
      style={{backgroundColor: '#facc15', color: '#0A1628', width: '100%', padding: '16px', fontWeight: 'bold', fontSize: '18px', borderRadius: '12px'}}
    >
      解説を見る →
    </button>
 <button
  onClick={() => {
    setQuestion(null)
    setTimeout(() => setQuestion(generateExpertQuestion()), 0)
    setTimeLeft(60)
    setAnswered(null)
    setSelectedChoice(null)
    setTimeUp(false)
  }}
  style={{color: 'rgba(255,255,255,0.5)', width: '100%', padding: '10px', fontSize: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)'}}
>
  もう一度挑戦
</button>
 </div>
)}
      </div>
    </main>
  )
}