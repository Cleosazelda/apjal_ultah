/**
 * api/notify.js — Vercel Serverless Function
 * ─────────────────────────────────────────────────────────────────
 * Receives notification payloads from the frontend and forwards
 * them to Telegram via the Bot API.
 *
 * Environment variables (set in Vercel dashboard):
 *   TELEGRAM_BOT_TOKEN  — Bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — Your chat/group ID
 *
 * POST /api/notify
 * Body: { "type": "wishes" | "outfit", "data": { ... } }
 * ─────────────────────────────────────────────────────────────────
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // Silently succeed — don't break the frontend experience
    console.warn('[notify] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set')
    return res.status(200).json({ ok: true, sent: false, reason: 'not_configured' })
  }

  try {
    const { type, data } = req.body

    let text = ''

    if (type === 'wishes') {
      const wishes = data?.wishes ?? []
      const now = data?.timestamp ?? new Date().toISOString()
      text = [
        '💌 AFZAAL BARU SAJA MENGIRIM WISH!',
        '',
        ...wishes.map((w, i) => `Wish ${i + 1}: ${w}`),
        '',
        `Date/time: ${now}`,
      ].join('\n')
    } else if (type === 'outfit') {
      const label = data?.label ?? '(tidak dipilih)'
      const date = data?.date ?? '03 October 2026'
      text = [
        '👕 OUTFIT CHECK',
        '',
        `Afzaal memilih: ${label}`,
        `Date: ${date}`,
      ].join('\n')
    } else {
      return res.status(400).json({ error: 'Unknown notification type' })
    }

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      }
    )

    const tgData = await tgRes.json()

    if (!tgData.ok) {
      console.error('[notify] Telegram API error:', tgData)
      // Still return 200 so frontend doesn't break
      return res.status(200).json({ ok: true, sent: false, reason: 'telegram_error' })
    }

    return res.status(200).json({ ok: true, sent: true })
  } catch (err) {
    console.error('[notify] Error:', err)
    // Return 200 so the frontend experience is never broken
    return res.status(200).json({ ok: true, sent: false, reason: 'server_error' })
  }
}
