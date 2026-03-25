'use client'

import { useEffect, useState } from 'react'

export default function VideoPage() {
  const [phase, setPhase] = useState(0)
  const [countdown, setCountdown] = useState(10)
  const [showHook, setShowHook] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)

  useEffect(() => {
    // 場面1：フック表示（0秒）
    setTimeout(() => setShowHook(true), 100)
    // 場面2：問題文表示（1秒後）
    setTimeout(() => setShowQuestion(true), 1000)
    // 場面3：カウントダウン開始（2秒後）
    setTimeout(() => setPhase(1), 2000)
    // 場面4：解答表示（12秒後）
    setTimeout(() => setPhase(2), 12000)
    // 場面5：解説表示（14秒後）
    setTimeout(() => setPhase(3), 14000)
    // 場面6：プロフィール誘導（22秒後）
    setTimeout(() => setPhase(4), 22000)
  }, [])

  useEffect(() => {
    if (phase !== 1) return
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase])

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0A1628',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '80px',
      paddingBottom: '200px',
      paddingLeft: '24px',
      paddingRight: '80px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* 背景グロー */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        backgroundColor: 'rgba(34,211,238,0.06)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      {/* 場面1・2・3：フック＋問題文＋カウントダウン */}
      {phase <= 1 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}>

          {/* フック */}
          <div style={{
            opacity: showHook ? 1 : 0,
            transform: showHook ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <p style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: '1.2',
            }}>
              <span style={{color: '#facc15'}}>90%</span> of people<br />get this wrong.
            </p>
          </div>

          {/* 問題文 */}
          <div style={{
            opacity: showQuestion ? 1 : 0,
            transform: showQuestion ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(34,211,238,0.3)',
            borderRadius: '20px',
            padding: '28px',
          }}>
            <p style={{
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: '1.6',
            }}>
              Bacteria in a bottle<br />double every hour.<br /><br />
              The bottle is full<br />in 24 hours.<br /><br />
              <span style={{color: 'rgba(34,211,238,1)'}}>When was it half full?</span>
            </p>
          </div>

          {/* カウントダウン */}
          {phase === 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <p style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: countdown <= 3 ? '#ef4444' : '#facc15',
                transition: 'color 0.3s ease',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {countdown}
              </p>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.5)',
              }}>sec</p>
            </div>
          )}
        </div>
      )}

      {/* 場面4：解答 */}
      {phase === 2 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease',
        }}>
          <p style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.1em',
          }}>THE ANSWER IS</p>
          <p style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#22d3ee',
            animation: 'scaleIn 0.4s ease',
          }}>23 hours</p>
        </div>
      )}

      {/* 場面5：解説 */}
      {phase === 3 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease',
        }}>
          <p style={{
            fontSize: '22px',
            color: '#22d3ee',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
          }}>Why?</p>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(34,211,238,0.3)',
            borderRadius: '20px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {[
              'If it doubles every hour,',
              'then one hour before full',
              "it's half full.",
              'So it\'s 23 hours.',
            ].map((line, i) => (
              <p key={i} style={{
                fontSize: '24px',
                color: 'white',
                lineHeight: '1.5',
                animation: `fadeIn 0.4s ease ${i * 0.3}s both`,
              }}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* 場面6：プロフィール誘導 */}
      {phase === 4 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease',
        }}>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: '1.4',
          }}>
            Think you can<br />beat <span style={{color: '#facc15'}}>90%</span>?
          </p>
          <p style={{
            fontSize: '20px',
            color: 'rgba(34,211,238,0.9)',
            textAlign: 'center',
          }}>
            🔗 Link in bio → Mathnique
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  )
}