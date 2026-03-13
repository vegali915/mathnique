'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { getSubscriptionStatus } from '../../lib/subscription'

export default function About() {
  const router = useRouter()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const pro = await getSubscriptionStatus()
        setIsPro(pro)
      }
    }
    load()
  }, [])

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#0A1628'}} className="flex flex-col items-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{backgroundColor: 'rgba(34,211,238,0.08)'}} />
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8">

        {/* ヘッダー */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Math<span style={{color: 'rgba(34,211,238,1)'}}>nique</span>
          </h1>
          <p style={{color: 'rgba(253,224,71,0.7)', fontSize: '12px', letterSpacing: '0.1em', marginTop: '8px'}}>ABOUT</p>
        </div>

        {/* 1. What is Mathnique? */}
        <div className="flex flex-col gap-3">
          <h2 style={{color: 'rgba(34,211,238,0.9)', fontWeight: 'bold', fontSize: '18px'}}>What is Mathnique?</h2>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.7'}}>
            Mathnique is a mini-game where you tackle math problems designed to test your calculation skills and numerical sense — all within one minute. Play a little every day and you'll naturally sharpen your mathematical thinking and mental math. Optimized for mobile but fully playable on PC too, Mathnique fits perfectly into your daily routine — whether you're commuting, on a break, or winding down before bed.
          </p>
        </div>

        <div style={{height: '1px', backgroundColor: 'rgba(255,255,255,0.1)'}} />

        {/* 2. Game Modes & Plans */}
        <div className="flex flex-col gap-6">
          <h2 style={{color: 'rgba(34,211,238,0.9)', fontWeight: 'bold', fontSize: '18px'}}>Game Modes & Plans</h2>

          {/* Daily Quest */}
          <div className="flex flex-col gap-2">
            <p style={{color: 'rgba(253,224,71,0.9)', fontWeight: 'bold', fontSize: '16px'}}>🎯 Daily Quest</p>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.7'}}>
              One special problem, every day. Expert Mode-level questions — normally locked behind the Pro plan — are unlocked for everyone, free or Pro, once a day. Miss it and you'll regret it!
            </p>
          </div>

          {/* Normal Mode */}
          <div className="flex flex-col gap-2">
            <p style={{color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', fontSize: '16px'}}>⚡ Normal Mode</p>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.7'}}>
              The core Mathnique experience, launched from the PLAY button on the home screen. You have one minute to solve as many math problems as you can — covering arithmetic, fill-in-the-blank, number sequences, and odd one out. After each round, you'll see what percentile your score places you in, so you can track your progress objectively. Free users get 3 plays per day (share your result for 2 bonus plays).
            </p>
          </div>

          {/* Expert Mode */}
          <div className="flex flex-col gap-2">
            <p style={{color: 'rgba(251,191,36,0.9)', fontWeight: 'bold', fontSize: '16px'}}>🏆 Expert Mode <span style={{color: 'rgba(34,211,238,0.7)', fontSize: '12px'}}>Pro only</span></p>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.7'}}>
              These problems are nearly impossible to solve in a minute without the right knowledge — but once you know the trick, you can crack them in seconds. Challenge your mathematical thinking as much as you want, and even when you get it wrong, the detailed explanations will leave you with a satisfying "aha!" moment.
            </p>
          </div>

          {/* Practice Mode */}
          <div className="flex flex-col gap-2">
            <p style={{color: 'rgba(34,211,238,0.9)', fontWeight: 'bold', fontSize: '16px'}}>✅ Practice Mode <span style={{color: 'rgba(34,211,238,0.7)', fontSize: '12px'}}>Pro only</span></p>
            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.7'}}>
              Focus on the genre you want to improve. Practice any of the 4 Normal Mode categories — arithmetic, fill-in-the-blank, sequences, and odd one out — at your own pace. Your personal best is saved, so you can see yourself getting better over time.
            </p>
          </div>

          {/* プラン比較表 */}
  <div className="rounded-2xl overflow-hidden" style={{border: '1px solid rgba(34,211,238,0.2)'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: 'rgba(34,211,238,0.1)'}}>
                  <th style={{padding: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 'bold', textAlign: 'center'}}>MODE</th>
                  <th style={{padding: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 'bold', textAlign: 'center'}}>FREE</th>
                  <th style={{padding: '12px', color: 'rgba(34,211,238,0.9)', fontSize: '12px', fontWeight: 'bold', textAlign: 'center'}}>PRO · $2.99/mo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { mode: '🎯 Daily Quest', free: '1/day', pro: '1/day' },
                  { mode: '⚡ Normal Mode', free: '3/day*', pro: 'Unlimited' },
                  { mode: '🏆 Expert Mode', free: '✗', pro: '✅' },
                  { mode: '✅ Practice Mode', free: '✗', pro: '✅' },
                ].map((row, i) => (
                  <tr key={i} style={{borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}}>
                    <td style={{padding: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', textAlign: 'center'}}>{row.mode}</td>
                    <td style={{padding: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', textAlign: 'center'}}>{row.free}</td>
                    <td style={{padding: '12px', color: 'rgba(34,211,238,0.9)', fontSize: '13px', textAlign: 'center'}}>{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                  <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '12px'}}>* Share your result to unlock 2 bonus plays. The Pro plan is $2.99/month and can be canceled anytime.</p>
        </div>

        <div style={{height: '1px', backgroundColor: 'rgba(255,255,255,0.1)'}} />

        {/* 3. Add to Home Screen */}
        <div className="flex flex-col gap-4">
          <h2 style={{color: 'rgba(34,211,238,0.9)', fontWeight: 'bold', fontSize: '18px'}}>Add to Home Screen</h2>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.7'}}>
            Play every day to level up your math skills! Add Mathnique to your home screen for quick, easy access anytime.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: '📱', title: 'iPhone / iPad (Safari)', steps: 'Tap the Share button at the bottom → "Add to Home Screen"' },
              { icon: '📱', title: 'Android (Chrome)', steps: 'Tap the menu (⋮) in the top right → "Add to Home Screen"' },
              { icon: '💻', title: 'PC (Chrome)', steps: 'Click the install icon (⊕) on the right side of the address bar' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-4" style={{backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
                <p style={{color: 'rgba(255,255,255,0.9)', fontWeight: 'bold', fontSize: '14px'}}>{item.icon} {item.title}</p>
                <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px'}}>{item.steps}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{height: '1px', backgroundColor: 'rgba(255,255,255,0.1)'}} />

{/* 戻るボタン */}
        <button
          onClick={() => router.push('/')}
          style={{color: 'rgba(34,211,238,0.5)', fontSize: '14px', padding: '4px', textAlign: 'center'}}
        >
          ← Back to Home
        </button>

        {/* 4. Manage / Cancel Subscription */}
        {isPro && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.open('https://polar.sh/mathnique/portal', '_blank')}
              style={{color: 'rgba(255,255,255,0.3)', fontSize: '14px', padding: '12px', width: '100%'}}
            >
              Manage / Cancel Subscription
            </button>
          </div>
        )}
      </div>
    </main>
  )
}