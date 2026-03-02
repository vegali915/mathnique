'use client'

import { useEffect, useRef } from 'react'

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const symbols = ['✦','✧','⋆','★','☆','✺','✹','✸','✷','✶','✵','✴','✳','✲','✱']
    
    const particles = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }))

    let animId: number

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.z -= 4
        if (p.z <= 0) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.z = canvas.width
          p.symbol = symbols[Math.floor(Math.random() * symbols.length)]
        }

        const scale = canvas.width / p.z
        const x = (p.x - canvas.width / 2) * scale + canvas.width / 2
        const y = (p.y - canvas.height / 2) * scale + canvas.height / 2
        const size = scale * 10
        const opacity = Math.min(1, (canvas.width - p.z) / canvas.width * 2)

        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.4})`
        ctx.font = `${size}px monospace`
        ctx.fillText(p.symbol, x, y)
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0A1628 100%)'}}
    />
  )
}