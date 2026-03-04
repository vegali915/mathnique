'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UpgradePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpgrade = async () => {
    setLoading(true)
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/login?redirect=/upgrade')
      return
    }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id, email: session.user.email }),
    })

    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-2">Mathnique Pro</h1>
        <p className="text-gray-400 mb-8">Unlock unlimited plays & practice mode</p>

        <div className="bg-gray-900 rounded-2xl p-8 mb-6 border border-gray-800">
          <div className="text-5xl font-bold mb-1">$2.99</div>
          <div className="text-gray-400 mb-6">per month</div>
          
<ul className="text-left space-y-3 mb-8">
  <li className="flex items-center gap-3">
    <span>🔓</span>
    <span>Unlimited plays every day</span>
  </li>
  <li className="flex items-center gap-3">
    <span>🔓</span>
    <span>Practice mode by category</span>
  </li>
  <li className="flex items-center gap-3">
    <span>🔓</span>
    <span>Track your progress over time</span>
  </li>
  <li className="flex items-center gap-3">
    <span>🔓</span>
    <span>Expert Mode — dare to take on harder questions?</span>
  </li>
</ul>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-lg hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Upgrade Now'}
          </button>
        </div>

         <button
          onClick={() => router.push('/review')}
          className="text-gray-500 hover:text-gray-300 transition"
        >
          ← Go back
        </button>
             </div>
    </main>
  )
}