'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Question = {
  question: string
  choices: number[]
  answer: number
  instruction?: string
  type: string
}

type HistoryItem = {
  question: string
  instruction?: string
  myAnswer: number
  correctAnswer: number
  isCorrect: boolean
  type: string
}

function generateChoices(answer: number): number[] {
  const choices = new Set<number>([answer])
  let attempts = 0
  while (choices.size < 4 && attempts < 100) {
    const range = Math.max(10, Math.abs(answer))
    const offset = Math.floor(Math.random() * range * 2 + 1) - range
    if (offset !== 0) choices.add(Math.round(answer + offset))
    attempts++
  }
  while (choices.size < 4) {
    choices.add(answer + choices.size * 10)
  }
  return [...choices].sort(() => Math.random() - 0.5)
}

function generateQuestion(level: number): Question {
  const type = Math.floor(Math.random() * 4)

  if (type === 0) {
    const ops = ['+', '-', '×', '÷']
    const op = ops[Math.floor(Math.random() * ops.length)]

    if (op === '+') {
      const a = level <= 2 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 30) - 15
      const b = level <= 2 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 30) - 15
      const answer = a + b
      return { question: `${a} + ${b} = ?`, choices: generateChoices(answer), answer, type: 'arithmetic' }
    } else if (op === '-') {
      const a = level <= 2 ? Math.floor(Math.random() * 9) + 2 : Math.floor(Math.random() * 20) - 5
      const b = level <= 2 ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 20) + 5
      const answer = a - b
      return { question: `${a} - ${b} = ?`, choices: generateChoices(answer), answer, type: 'arithmetic' }
    } else if (op === '×') {
      const a = level <= 2 ? Math.floor(Math.random() * 9) + 2 : Math.floor(Math.random() * 19) - 9
      const b = Math.floor(Math.random() * 9) + 2
      const answer = a * b
      return { question: `${a} × ${b} = ?`, choices: generateChoices(answer), answer, type: 'arithmetic' }
    } else {
      const b = Math.floor(Math.random() * 8) + 2
      const answer = level <= 2 ? Math.floor(Math.random() * 9) + 2 : Math.floor(Math.random() * 20) - 10
      const a = answer * b
      return { question: `${a} ÷ ${b} = ?`, choices: generateChoices(answer), answer, type: 'arithmetic' }
    }

  } else if (type === 1) {
    const patterns = [
      () => { const b = Math.floor(Math.random() * 9) + 1; const answer = Math.floor(Math.random() * 9) + 1; return { question: `□ + ${b} = ${answer + b}`, answer } },
      () => { const a = Math.floor(Math.random() * 9) + 1; const answer = Math.floor(Math.random() * 9) + 1; return { question: `${a} + □ = ${a + answer}`, answer } },
      () => { const b = Math.floor(Math.random() * 8) + 1; const answer = Math.floor(Math.random() * 8) + 1; return { question: `□ - ${b} = ${answer}`, answer: answer + b } },
      () => { const a = Math.floor(Math.random() * 9) + 5; const answer = Math.floor(Math.random() * 4) + 1; return { question: `${a} - □ = ${a - answer}`, answer } },
      () => { const b = Math.floor(Math.random() * 8) + 2; const answer = Math.floor(Math.random() * 8) + 2; return { question: `□ × ${b} = ${answer * b}`, answer } },
      () => { const a = Math.floor(Math.random() * 8) + 2; const answer = Math.floor(Math.random() * 8) + 2; return { question: `${a} × □ = ${a * answer}`, answer } },
      () => { const b = Math.floor(Math.random() * 8) + 2; const answer = Math.floor(Math.random() * 8) + 2; return { question: `□ ÷ ${b} = ${answer}`, answer: answer * b } },
      () => { const b = Math.floor(Math.random() * 8) + 2; const answer = Math.floor(Math.random() * 8) + 2; return { question: `${answer * b} ÷ □ = ${answer}`, answer: b } },
    ]
    const p = patterns[Math.floor(Math.random() * patterns.length)]()
    return { question: p.question, choices: generateChoices(p.answer), answer: p.answer, type: 'fillblank' }

  } else if (type === 2) {
    const isGeometric = Math.random() < 0.5
    if (isGeometric) {
      const ratio = [2, 3][Math.floor(Math.random() * 2)]
      const start = Math.floor(Math.random() * 3) + 1
      const seq = [start, start * ratio, start * ratio ** 2, start * ratio ** 3]
      const answer = start * ratio ** 4
      const wrongRatios = ratio === 2 ? [3, 4, 5] : [2, 4, 5]
      const wrongAnswers = wrongRatios.map(r => start * r ** 4)
      const allChoices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5)
      return { question: `${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`, choices: allChoices, answer, type: 'sequence' }
    } else {
      const start = Math.floor(Math.random() * 5) + 1
      const diff = Math.floor(Math.random() * 4) + 2
      const seq = [start, start + diff, start + diff * 2, start + diff * 3]
      const answer = start + diff * 4
      return { question: `${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`, choices: generateChoices(answer), answer, type: 'sequence' }
    }

  } else {
    const patterns = [
      () => {
        const evens = [2,4,6,8,10,12,14,16,18,20]
        const odds = [3,5,7,9,11,13,15,17,19]
        const picked = evens.sort(() => Math.random()-0.5).slice(0,3)
        const odd = odds[Math.floor(Math.random()*odds.length)]
        const all = [...picked, odd].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer: odd, instruction: 'Which is the odd one out?' }
      },
      () => {
        const primes = [2,3,5,7,11,13,17,19,23]
        const nonPrimes = [4,6,8,9,10,12,14,15,16,18,20]
        const picked = primes.sort(() => Math.random()-0.5).slice(0,3)
        const nonPrime = nonPrimes[Math.floor(Math.random()*nonPrimes.length)]
        const all = [...picked, nonPrime].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer: nonPrime, instruction: 'Which is NOT a prime?' }
      },
      () => {
        const squares = [4,9,16,25,36,49,64]
        const nonSquares = [6,8,10,12,14,15,18,20,24]
        const picked = squares.sort(() => Math.random()-0.5).slice(0,3)
        const nonSquare = nonSquares[Math.floor(Math.random()*nonSquares.length)]
        const all = [...picked, nonSquare].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer: nonSquare, instruction: 'Which is NOT a perfect square?' }
      },
      () => {
        const multiplesOf3 = [3,6,9,12,15,18,21,24,27,30]
        const nonMultiplesOf3 = [4,5,7,8,10,11,13,14,16,17]
        const picked = multiplesOf3.sort(() => Math.random()-0.5).slice(0,3)
        const nonMultiple = nonMultiplesOf3[Math.floor(Math.random()*nonMultiplesOf3.length)]
        const all = [...picked, nonMultiple].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer: nonMultiple, instruction: 'Which is NOT a multiple of 3?' }
      }
    ]
    const pattern = patterns[Math.floor(Math.random()*patterns.length)]()
    return { question: pattern.question, choices: pattern.choices, answer: pattern.answer, instruction: pattern.instruction, type: 'oddone' }
  }
}

export default function Game() {
  const router = useRouter()
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [question, setQuestion] = useState<Question>(() => generateQuestion(1))
  const [timeLeft, setTimeLeft] = useState(60)
  const [answered, setAnswered] = useState<'correct' | 'wrong' | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null)
  const isMutedRef = useRef(false)

useEffect(() => {
    isMutedRef.current = localStorage.getItem('soundMuted') === 'true'
    correctSoundRef.current = new Audio('/sounds/correct.mp3')
    correctSoundRef.current.volume = 0.3
    wrongSoundRef.current = new Audio('/sounds/wrong.mp3')
    wrongSoundRef.current.volume = 0.3

    // iOSで音声を事前に認識させる
    const unlock = () => {
      correctSoundRef.current?.play().then(() => correctSoundRef.current?.pause())
      wrongSoundRef.current?.play().then(() => wrongSoundRef.current?.pause())
      document.removeEventListener('touchstart', unlock)
    }
    document.addEventListener('touchstart', unlock)
    return () => document.removeEventListener('touchstart', unlock)
  }, [])
  
  const playSound = (type: 'correct' | 'wrong') => {
    if (isMutedRef.current) return
    const sound = type === 'correct' ? correctSoundRef.current : wrongSoundRef.current
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => {})
    }
  }
  useEffect(() => {
    if (timeLeft === 0) {
      sessionStorage.setItem('gameHistory', JSON.stringify(history))
      router.push(`/result?score=${score}`)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, score, router, history])

  const handleAnswer = (choice: number) => {
    if (answered) return
    const isCorrect = choice === question.answer
    setAnswered(isCorrect ? 'correct' : 'wrong')
    setSelectedChoice(choice)
    playSound(isCorrect ? 'correct' : 'wrong')

    const newHistory: HistoryItem = {
      question: question.question,
      instruction: question.instruction,
      myAnswer: choice,
      correctAnswer: question.answer,
      isCorrect,
      type: question.type
    }
    setHistory(prev => [...prev, newHistory])

    if (isCorrect) {
      const newCombo = combo + 1
      setCombo(newCombo)
      const points = newCombo >= 4 ? 25 : newCombo === 3 ? 20 : newCombo === 2 ? 15 : 10
      setScore(s => s + points)
    } else {
      setCombo(0)
    }
    const newCount = questionCount + 1
    setQuestionCount(newCount)
    const newLevel = newCount % 5 === 0 ? level + 1 : level
    if (newCount % 5 === 0) setLevel(newLevel)
    setTimeout(() => {
      setQuestion(generateQuestion(newLevel))
      setAnswered(null)
      setSelectedChoice(null)
    }, 200)
  }

  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'text-cyan-400'

  const getButtonClass = (choice: number) => {
    if (answered === null) {
      return 'bg-white/10 text-white border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400 hover:scale-105 active:scale-95'
    }
    if (choice === question.answer) {
      return 'bg-cyan-400 text-[#0A1628] border border-cyan-400'
    }
    if (choice === selectedChoice) {
      return 'bg-red-500 text-white border border-red-400'
    }
    return 'bg-white/5 text-white/30 border border-white/10'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Score: <span className="text-cyan-400">{score}</span></div>
          {combo >= 2 && (
            <div className="text-yellow-400 font-bold text-sm animate-pulse">🔥 {combo} COMBO!</div>
          )}
          <div className={`font-bold text-xl ${timerColor}`}>{timeLeft}s</div>
        </div>
        <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-8 text-center">
          {question.instruction && (
            <p className="text-yellow-300 text-sm mb-3 tracking-wide">{question.instruction}</p>
          )}
          <p className="text-white text-3xl font-bold">{question.question}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              className={`py-5 rounded-xl font-bold text-xl transition-colors ${getButtonClass(choice)}`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}