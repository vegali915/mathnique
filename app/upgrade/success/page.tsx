'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UpgradeSuccess() {
  const router = useRouter()

  useEffect(() => {
    // 3秒後にホームへリダイレクト
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4" style={{backgroundColor: '#0A1628'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6 text-center">
        <div className="text-7xl mb-4">🎉</div>
        
        <h1 className="text-4xl font-bold text-white tracking-wider">
          Welcome to Pro!
        </h1>
        
        <p className="text-cyan-400 text-lg">
          Your upgrade was successful!
        </p>

        <div style={{border: '1px solid rgba(34,211,238,0.2)', backgroundColor: 'rgba(255,255,255,0.05)'}} className="w-full rounded-2xl p-6 flex flex-col gap-3 text-left">
          <p className="text-white font-bold">🔓 You now have access to:</p>
          <p className="text-white/80 text-sm">⚡ Unlimited plays every day</p>
          <p className="text-white/80 text-sm">🔒 Practice Mode</p>
          <p className="text-white/80 text-sm">🔒 Expert Mode</p>
        </div>

        <p className="text-white/50 text-sm">
          Redirecting to home in 5 seconds...
        </p>

        <button
          onClick={() => router.push('/')}
          className="w-full py-4 bg-cyan-400 text-[#0A1628] font-bold text-lg rounded-full hover:bg-cyan-300 transition"
        >
          Start Playing Now!
        </button>
      </div>
    </main>
  )
}
