import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import Cat from '../components/Cat'
import { birthdayData } from '../data/birthdayData'
import { loadWishes, saveWishes } from '../services/wishesService'
import { notifyWishes } from '../services/notificationService'

const meta = birthdayData.chapters[2]
const t    = birthdayData.wishes

const placeholders = [
  'aku mau...',
  'boleh minta...',
  'pengen banget...',
  'satu lagi...',
]

export default function WishesSection() {
  const [values, setValues] = useState(() => loadWishes()?.wishes ?? Array(t.count).fill(''))
  const [phase,  setPhase]  = useState('form')  // 'form' | 'sending' | 'sent'
  const [error,  setError]  = useState('')
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const setValue = (i, v) => {
    setValues((arr) => arr.map((x, idx) => (idx === i ? v : x)))
    setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    if (values.some((v) => !v.trim())) return setError('Isi keempatnya dulu ya, jangan curang. 🐈')
    const trimmed = values.map((v) => v.trim())
    await saveWishes(trimmed)
    await notifyWishes(trimmed)   // ← kirim notif ke HP Cleosa
    setPhase('sending')
    timers.current.push(setTimeout(() => setPhase('sent'), 2600))
  }

  return (
    <section id={meta.id} className="section">
      <div className="container container--narrow">
        <SectionHeader no={meta.no} title="Your birthday wishes" />

        <Reveal className="wishes__intro">
          {t.lines.map((l, i) => (
            <p key={i} className={i === 1 ? 'display wishes__big' : 'wishes__line'}>{l}</p>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          {phase === 'form' ? (
            <motion.form
              key="form"
              className="wishform paper"
              onSubmit={submit}
              exit={{ opacity: 0, y: -10 }}
            >
              {values.map((v, i) => (
                <label key={i} className="wishform__row">
                  {/* label personal dari data */}
                  <span className="hand wishform__label">{(t.labels ?? [])[i] ?? `Wish ke-${i + 1} ✨`}</span>
                  <input
                    value={v}
                    maxLength={120}
                    placeholder={placeholders[i]}
                    onChange={(e) => setValue(i, e.target.value)}
                    className={v.trim() ? 'is-filled' : ''}
                  />
                </label>
              ))}
              <p className="wishform__error hand" aria-live="polite">{error}</p>
              <Button type="submit">{t.button}</Button>
            </motion.form>
          ) : (
            <motion.div key="sent" className="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="send__stage">
                {/* wish slip jatuh ke amplop */}
                {values.map((w, i) => (
                  <motion.div
                    key={i}
                    className="slip hand"
                    initial={{ opacity: 0, y: -70, scale: 1 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [-70, -20, 34, 60], scale: [1, 1, 0.6, 0.3] }}
                    transition={{ delay: 0.3 + i * 0.45, duration: 1, times: [0, 0.3, 0.8, 1] }}
                  >
                    {w}
                  </motion.div>
                ))}
                <motion.div
                  className="send__env"
                  animate={phase === 'sent' ? { rotate: [0, -4, 4, 0] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <span>♡</span>
                </motion.div>
                <Cat mood={phase === 'sent' ? 'happy' : 'idle'} size={120} trackCursor={false} />
              </div>

              {phase === 'sent' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="display" style={{ fontSize: '1.6rem' }}>{t.success}</p>
                  <button className="linkbtn hand" onClick={() => setPhase('form')}>
                    ubah wish
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}