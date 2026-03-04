import { supabase } from './supabase'

export async function getSubscriptionStatus(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return false

  const { data, error } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', session.user.id)
    .single()

  if (error || !data) return false

  return data.status === 'active'
}