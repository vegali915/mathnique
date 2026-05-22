'use client'
import { useEffect, useState } from 'react'

const symbols = ['✦','✧','⋆','★','☆','✺','✹','✸','✷','✶']

type Particle = {
  id: number
  symbol: string
  left: number
  top: number
  duration: number
  delay: number
  size: number
  opacity: number
}

export default function MathBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 20 : 40
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        size: 10 + Math.random() * 14,
        opacity: 0.1 + Math.random() * 0.25,
      }))
    )
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0A1628 100%)' }}
    >
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            color: `rgba(34, 211, 238, ${p.opacity})`,
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
            willChange: 'transform',
          }}
        >
          {p.symbol}
        </span>
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(15deg); }
        }
      `}</style>
    </div>
  )
}