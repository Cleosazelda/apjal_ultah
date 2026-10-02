import { birthdayData } from '../data/birthdayData'

const KEY = birthdayData.wishes.storageKey

export function loadWishes() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function saveWishes(wishes) {
  const payload = { wishes, createdAt: new Date().toISOString() }

  // 1) simpan lokal (sementara)
  try { localStorage.setItem(KEY, JSON.stringify(payload)) } catch {}

  // 2) TODO backend: kirim ke server / Supabase / Google Sheet / Formspree
  // await fetch('https://YOUR-ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // })

  return payload
}