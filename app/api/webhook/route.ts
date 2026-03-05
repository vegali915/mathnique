import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const eventType = body.type
    const data = body.data

    console.log('Polar webhook received:', eventType)

    if (eventType === 'subscription.created' || eventType === 'subscription.updated') {
      const userId = data.metadata?.user_id
      if (!userId) {
        console.error('No user_id in metadata')
        return NextResponse.json({ error: 'No user_id' }, { status: 400 })
      }

      const status = data.status === 'active' ? 'active' : 'canceled'

      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          status: status,
          stripe_subscription_id: data.id,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })

      console.log(`Subscription ${status} for user ${userId}`)
    }

    if (eventType === 'subscription.canceled' || eventType === 'subscription.revoked') {
      const userId = data.metadata?.user_id
      if (userId) {
        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId)

        console.log(`Subscription canceled for user ${userId}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}