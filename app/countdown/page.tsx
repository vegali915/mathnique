'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Countdown() {
  const [count, setCount] = useState(3)
  const router = useRouter()

  useEffect(() => {
    if (count === 0) {
 const params = new URLSearchParams(window.location.search)
const mode = params.get('mode')
setTimeout(() => {
router.push(mode === 'expert' ? '/expert' : '/game')
 }, 300)
     return
    }
    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [count, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 relative overflow-hidden">
      
      {/* 背景の光エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-yellow-300/70 text-lg tracking-widest">GET READY</p>
        <div className="text-9xl font-bold text-white" style={{textShadow: '0 0 40px rgba(34,211,238,0.8)'}}>
          {count === 0 ? 'GO!' : count}
        </div>
      </div>

    </main>
  )
}