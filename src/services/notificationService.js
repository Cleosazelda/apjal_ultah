/**
 * notificationService.js
 * ─────────────────────────────────────────────────────────────────
 * Forward notifications to the Vercel serverless function, which
 * securely sends them to Telegram.
 * ─────────────────────────────────────────────────────────────────
 */

export async function notifyWishes(wishes) {
  try {
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'wishes',
        data: { wishes, timestamp }
      })
    })
  } catch (err) {
    console.warn('[notif] gagal kirim wishes:', err)
  }
}

export async function notifyOutfit(label) {
  try {
    const date = '03 October 2026'
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'outfit',
        data: { label, date }
      })
    })
  } catch (err) {
    console.warn('[notif] gagal kirim outfit:', err)
  }
}
