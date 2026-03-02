'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Question = {
  question: string
  choices: number[]
  answer: number
  instruction?: string
}

function generateChoices(answer: number): number[] {
  const choices = new Set<number>([answer])
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 10) - 5
    if (offset !== 0) choices.add(answer + offset)
  }
  return [...choices].sort(() => Math.random() - 0.5)
}

function generateQuestion(level: number): Question {
  const type = Math.floor(Math.random() * 4)

  if (type === 0) {
    // 四則演算
    const a = Math.floor(Math.random() * (5 * level)) + 2
    const b = Math.floor(Math.random() * (5 * level)) + 2
    const answer = a + b
    return { question: `${a} + ${b} = ?`, choices: generateChoices(answer), answer }
  } else if (type === 1) {
    // 穴埋め
    const a = Math.floor(Math.random() * 9) + 2
    const b = Math.floor(Math.random() * 9) + 2
    const answer = a
    return { question: `□ × ${b} = ${a * b}`, choices: generateChoices(answer), answer }
  } else if (type === 2) {
    // 数列
    const start = Math.floor(Math.random() * 5) + 1
    const diff = Math.floor(Math.random() * 4) + 2
    const seq = [start, start + diff, start + diff * 2, start + diff * 3]
    const answer = start + diff * 4
    return { question: `${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`, choices: generateChoices(answer), answer }
  } else {
    // 仲間はずれ
    const patterns = [
      () => {
        // 1つだけ奇数
        const evens = [2,4,6,8,10,12,14,16,18,20]
        const odds = [3,5,7,9,11,13,15,17,19]
        const picked = evens.sort(() => Math.random()-0.5).slice(0,3)
        const odd = odds[Math.floor(Math.random()*odds.length)]
        const answer = odd
        const all = [...picked, odd].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer, instruction: 'Which is the odd one out?' }
      },
      () => {
        // 1つだけ素数でない
        const primes = [2,3,5,7,11,13,17,19,23]
        const nonPrimes = [4,6,8,9,10,12,14,15,16,18,20]
        const picked = primes.sort(() => Math.random()-0.5).slice(0,3)
        const nonPrime = nonPrimes[Math.floor(Math.random()*nonPrimes.length)]
        const answer = nonPrime
        const all = [...picked, nonPrime].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer, instruction: 'Which is NOT a prime?' }
      },
      () => {
        // 1つだけ平方数でない
        const squares = [4,9,16,25,36,49,64]
        const nonSquares = [6,8,10,12,14,15,18,20,24]
        const picked = squares.sort(() => Math.random()-0.5).slice(0,3)
        const nonSquare = nonSquares[Math.floor(Math.random()*nonSquares.length)]
        const answer = nonSquare
        const all = [...picked, nonSquare].sort(() => Math.random()-0.5)
        return { question: all.join(',  '), choices: all, answer, instruction: 'Which is NOT a perfect square?' }
      }
    ]
    const pattern = patterns[Math.floor(Math.random()*patterns.length)]()
    return { question: pattern.question, choices: pattern.choices, answer: pattern.answer, instruction: pattern.instruction }
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

  useEffect(() => {
    if (timeLeft === 0) {
      router.push(`/result?score=${score}`)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, score, router])

  const handleAnswer = (choice: number) => {
    if (answered) return
    const isCorrect = choice === question.answer
    setAnswered(isCorrect ? 'correct' : 'wrong')
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
    if (newCount % 5 === 0) setLevel(l => l + 1)
    setTimeout(() => {
      setQuestion(generateQuestion(level))
      setAnswered(null)
    }, 200)
  }

  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-yellow-400' : 'text-cyan-400'

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
              className={`py-5 rounded-xl font-bold text-xl transition-colors
                ${answered === null
                  ? 'bg-white/10 text-white border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400 hover:scale-105'
                  : choice === question.answer
                  ? 'bg-cyan-400 text-[#0A1628] border border-cyan-400'
                  : 'bg-white/5 text-white/30 border border-white/10'}`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}