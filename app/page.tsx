'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [playsLeft] = useState(3)
const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A1628] relative overflow-hidden">
      
      {/* 背景の光エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* ログインボタン（右上） */}
      <div className="absolute top-6 right-6">
        <button className="text-cyan-400 text-sm border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition">
          Login
        </button>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* ロゴ */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white tracking-wider">
            Math<span className="text-cyan-400">nique</span>
          </h1>
          <p className="text-cyan-400/60 text-sm mt-2 tracking-widest">
            1-MINUTE MATH CHALLENGE
          </p>
        </div>

        {/* プレイボタン */}
        <button onClick={() => router.push('/countdown')} className="mt-4 px-16 py-5 bg-cyan-400 text-[#0A1628] font-bold text-xl rounded-full hover:bg-cyan-300 hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
          PLAY
        </button>

        {/* 残りプレイ回数 */}
        <p className="text-cyan-400/50 text-sm">
          {playsLeft} plays remaining today
        </p>

      </div>
    </main>
  )
}