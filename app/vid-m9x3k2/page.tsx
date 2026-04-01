'use client'

import { useEffect, useState } from 'react'

export default function VideoPage() {
  const [phase, setPhase] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [showHook, setShowHook] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showBlock1, setShowBlock1] = useState(false)
  const [showBlock2, setShowBlock2] = useState(false)
  const [showBlock3, setShowBlock3] = useState(false)

  useEffect(() => {
    // 場面1
    setTimeout(() => setShowHook(true), 100)
    setTimeout(() => setShowQuestion(true), 1500)
    setTimeout(() => setPhase(1), 4500)
    // 場面2：解答
    setTimeout(() => setPhase(2), 14500)
    setTimeout(() => setShowAnswer(true), 15500)  // 1秒後に答え表示
    // 場面3：解説
    setTimeout(() => setPhase(3), 17500)
    setTimeout(() => setShowBlock1(true), 17600)
    setTimeout(() => setShowBlock2(true), 18800)
    setTimeout(() => setShowBlock3(true), 20000)
    // 場面4：誘導
    setTimeout(() => setPhase(4), 25000)
    setTimeout(() => setPhase(5), 30000)          // 背景のみ（10秒）
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
      paddingBottom: '24px',
      paddingLeft: '24px',
      paddingRight: '24px',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* 背景グロー */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        backgroundColor: 'rgba(34,211,238,0.06)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

{/* 場面1：フック＋問題文＋カウントダウン */}
      {phase <= 1 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 10,
          marginTop: '-40px',
        }}>
          {/* フック */}
          <div style={{
            opacity: showHook ? 1 : 0,
            transform: showHook ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: '1.3',
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
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: '20px',
            padding: '24px',
            width: '100%',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: '1.8',
            }}>
              Bacteria in a bottle<br />
              double every hour.<br />
              <br />
              The bottle is full<br />
              in 24 hours.<br />
              <br />
              When was it half full?
            </p>
          </div>

          {/* カウントダウン */}
          {phase === 1 && (
            <div style={{
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease',
            }}>
              <p style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'white',
                fontVariantNumeric: 'tabular-nums',
              }}>
                Answer in <span style={{color: countdown <= 3 ? '#ef4444' : '#facc15'}}>{countdown}</span>...
              </p>
            </div>
          )}
        </div>
      )}

      {/* 場面2：解答 */}
      {phase === 2 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '80px',
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '18px',
            color: 'white',
            letterSpacing: '0.15em',
            fontWeight: 'bold',
          }}>THE ANSWER IS</p>
{showAnswer && (
            <p style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#22d3ee',
              animation: 'scaleIn 0.4s ease',
              whiteSpace: 'nowrap',
            }}>23 hours</p>
          )}
        </div>
      )}
{/* 場面3：解説 */}
      {phase === 3 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 10,
          paddingTop: '40px',
        }}>
          {/* 上部に小さく問題文 */}
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            lineHeight: '1.6',
          }}>
            Bacteria double every hour. Full in 24h.<br />When was it half full?
          </p>
          {/* 解説ボックス */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'center',
          }}>
            {/* 塊1：Answer */}
            <div style={{
              opacity: showBlock1 ? 1 : 0,
              transform: showBlock1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <p style={{fontSize: '20px', fontWeight: 'bold', color: '#22d3ee'}}>Answer: 23 hours</p>
            </div>

            {/* 塊2：理由 */}
            <div style={{
              opacity: showBlock2 ? 1 : 0,
              transform: showBlock2 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <p style={{fontSize: '18px', color: 'white', lineHeight: '1.8'}}>
                If it doubles every hour,<br />
                then one hour before full<br />
                it's half full.
              </p>
            </div>

            {/* 塊3：結論 */}
            <div style={{
              opacity: showBlock3 ? 1 : 0,
              transform: showBlock3 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <p style={{fontSize: '18px', color: 'white', lineHeight: '1.8'}}>So it's 23 hours.</p>
            </div>
          </div>
        </div>
      )}

{/* 場面4：プロフィール誘導 */}
      {phase === 4 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '120px',
          gap: '20px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: '2',
          }}>
            Want more?<br />
            <span style={{fontSize: '24px', color: '#22d3ee'}}>Mathnique</span>
            <span style={{fontSize: '24px'}}> — link in bio</span><br />
            <span style={{fontSize: '16px'}}>Free to try. 1-minute challenges.</span>
          </p>
        </div>
      )}
      {/* 場面5：背景のみ */}
{phase === 5 && (
  <div style={{width: '100%', height: '100%'}} />
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