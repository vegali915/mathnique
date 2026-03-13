'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { canPlayQuest, recordQuestPlay } from '../../lib/playCount'
import { generateExpertQuestion, ExpertQuestion } from '../../lib/expertQuestions'

export default function DailyQuest() {
  const router = useRouter()
  const [question, setQuestion] = useState<ExpertQuestion | null>(null)
  const [answered, setAnswered] = useState<'correct' | 'wrong' | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [alreadyPlayed, setAlreadyPlayed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timeUp, setTimeUp] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null)
  const isMutedRef = useRef(false)

  useEffect(() => {
    isMutedRef.current = localStorage.getItem('soundMuted') === 'true'
    correctSoundRef.current = new Audio('/sounds/correct.mp3')
    correctSoundRef.current.volume = 0.3
    wrongSoundRef.current = new Audio('/sounds/wrong.mp3')
    wrongSoundRef.current.volume = 0.3
  }, [])

  useEffect(() => {
    async function init() {
      const can = await canPlayQuest()
      if (!can) {
        setAlreadyPlayed(true)
        setLoading(false)
        return
      }
      const today = new Date().toISOString().split('T')[0]
      const seed = today.replace(/-/g, '')
      setQuestion(generateExpertQuestion(Number(seed) % 32))
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    if (loading || alreadyPlayed || answered || timeUp) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setTimeUp(true)
          recordQuestPlay()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [loading, alreadyPlayed])

  const handleAnswer = async (choice: string) => {
    if (answered || timeUp) return
    clearInterval(timerRef.current!)
    const isCorrect = choice === question?.answer
    setAnswered(isCorrect ? 'correct' : 'wrong')
    setSelectedChoice(choice)
    const sound = isCorrect ? correctSoundRef.current : wrongSoundRef.current
    if (!isMutedRef.current && sound) {
      sound.currentTime = 0
      sound.play().catch(() => {})
    }
    await recordQuestPlay()
  }

  const getButtonStyle = (choice: string) => {
    if (answered === null && !timeUp) return {}
    if (choice === question?.answer) {
      return { backgroundColor: 'rgba(34,211,238,1)', color: '#0A1628', border: '1px solid rgba(34,211,238,1)' }
    }
    if (choice === selectedChoice) {
      return { backgroundColor: 'rgba(239,68,68,1)', color: 'white', border: '1px solid rgba(239,68,68,0.8)' }
    }
    return { backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }
  }

  const getButtonClass = (choice: string) => {
    if (answered === null && !timeUp) {
      return 'w-full py-4 rounded-xl font-bold text-lg transition-all bg-white/10 text-white border border-white/20 hover:scale-105 active:scale-95'
    }
    return 'w-full py-4 rounded-xl font-bold text-lg transition-all'
  }

  const showResult = answered !== null || timeUp

  if (loading) {
    return <div style={{minHeight: '100vh', backgroundColor: '#0A1628'}} />
  }

  if (alreadyPlayed) {
    return (
      <main style={{minHeight: '100vh', backgroundColor: '#0A1628'}} className="flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{backgroundColor: 'rgba(34,211,238,0.08)'}} />
        </div>
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 text-center">
          <p style={{color: 'rgba(253,224,71,0.9)', fontSize: '14px', letterSpacing: '0.1em'}}>DAILY QUEST</p>
          <p style={{color: 'white', fontWeight: 'bold', fontSize: '24px'}}>⏰ Come back tomorrow!</p>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '14px'}}>You've already completed today's quest.</p>
          <button
            onClick={() => router.push('/')}
            style={{backgroundColor: 'rgba(34,211,238,1)', color: '#0A1628', fontWeight: 'bold', fontSize: '18px', borderRadius: '9999px', padding: '16px', width: '100%'}}
          >
            Back to Home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#0A1628'}} className="flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{backgroundColor: 'rgba(34,211,238,0.08)'}} />
      </div>
      <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">

        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <p style={{color: 'rgba(253,224,71,0.9)', fontSize: '12px', letterSpacing: '0.1em'}}>
            DAILY QUEST · {question?.genre}
          </p>
          <p style={{
            color: timeLeft <= 10 ? 'rgba(239,68,68,1)' : 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            fontWeight: 'bold',
            fontVariantNumeric: 'tabular-nums'
          }}>
            {timeUp ? '⏰ 0:00' : `⏱ 0:${String(timeLeft).padStart(2, '0')}`}
          </p>
        </div>

        {/* 問題 */}
        <div className="rounded-2xl p-8 text-center" style={{backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,211,238,0.2)'}}>
          <p style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}} className="whitespace-pre-line">{question?.question}</p>
        </div>

        {/* 選択肢 */}
        <div className="flex flex-col gap-3">
          {question?.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              className={getButtonClass(choice)}
              style={getButtonStyle(choice)}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* 結果・解説 */}
        {showResult && (
          <div className="rounded-2xl p-6" style={{backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(34,211,238,0.2)'}}>
            <p style={{
              color: timeUp && !answered ? 'rgba(255,255,255,0.6)' : answered === 'correct' ? 'rgba(34,211,238,1)' : 'rgba(239,68,68,1)',
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              {timeUp && !answered ? "⏰ Time's up!" : answered === 'correct' ? '🎉 Correct!' : '❌ Not quite...'}
            </p>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '16px'}} className="whitespace-pre-line">{question?.explanation}</p>
            <div className="flex flex-col gap-3 mt-6">
              <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center'}}>Want to test your basic math skills?</p>
              <button
                onClick={() => router.push('/')}
                style={{backgroundColor: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.6)', color: 'rgba(251,191,36,1)', fontWeight: 'bold', fontSize: '18px', borderRadius: '9999px', padding: '16px', width: '100%'}}
              >
                ⚡ Try Normal Mode — free, 3x a day!
              </button>
              <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center'}}>Want more challenges like this?</p>
              <button
                onClick={() => router.push('/upgrade')}
                style={{backgroundColor: 'rgba(34,211,238,0.2)', border: '1px solid rgba(34,211,238,0.4)', color: 'rgba(34,211,238,1)', fontWeight: 'bold', fontSize: '18px', borderRadius: '9999px', padding: '16px', width: '100%'}}
              >
                🔓 Unlock Expert Mode with Pro!
              </button>
              <div className="w-full p-2 text-center">
                <p style={{color: 'rgba(255,255,255,0.94)', fontSize: '13px'}}>📲 Add to your Home Screen to never miss your Daily Quest!</p>
              </div>
              <button
                onClick={() => router.push('/')}
                style={{color: 'rgba(34,211,238,0.5)', fontSize: '14px', padding: '12px', width: '100%'}}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}