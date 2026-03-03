import { supabase } from './supabase'

// 匿名IDを取得または作成（ログインしていないユーザー用）
export function getAnonymousId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('anonymous_id')
  if (!id) {
    id = 'anon_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('anonymous_id', id)
  }
  return id
}

// 今日のプレイ情報を取得
export async function getTodayPlayInfo() {
  const anonymousId = getAnonymousId()
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('daily_plays')
    .select('*')
    .eq('anonymous_id', anonymousId)
    .eq('play_date', today)
    .single()

  if (error || !data) {
    return { playCount: 0, sharedBonus: false }
  }

  return {
    playCount: data.play_count,
    sharedBonus: data.shared_bonus
  }
}

// プレイ回数を記録
export async function recordPlay() {
  const anonymousId = getAnonymousId()
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('daily_plays')
    .select('*')
    .eq('anonymous_id', anonymousId)
    .eq('play_date', today)
    .single()

  if (!data) {
    // 今日初めてのプレイ
    await supabase.from('daily_plays').insert({
      anonymous_id: anonymousId,
      play_date: today,
      play_count: 1,
      shared_bonus: false
    })
  } else {
    // プレイ回数を+1
    await supabase
      .from('daily_plays')
      .update({ play_count: data.play_count + 1 })
      .eq('anonymous_id', anonymousId)
      .eq('play_date', today)
  }
}

// シェアボーナスを付与
export async function applyShareBonus() {
  const anonymousId = getAnonymousId()
  const today = new Date().toISOString().split('T')[0]

  await supabase
    .from('daily_plays')
    .update({ shared_bonus: true })
    .eq('anonymous_id', anonymousId)
    .eq('play_date', today)
}

// プレイ可能かチェック
export async function canPlay(): Promise<boolean> {
  const { playCount, sharedBonus } = await getTodayPlayInfo()
  const maxPlays = sharedBonus ? 5 : 3
  return playCount < maxPlays
}
