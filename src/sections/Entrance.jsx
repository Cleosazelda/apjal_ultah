import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cat from '../components/Cat'
import Button from '../components/Button'
import FloatingDecor from '../components/FloatingDecor'
import { birthdayData } from '../data/birthdayData'
import '../styles/entrance.css'

const t = birthdayData.entrance

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Entrance({ onEnter }) {
  // stage: 'cat' → 'letter' → 'door'
  const [stage, setStage] = useState('cat')
  const [mood, setMood] = useState('idle')
  const [bubble, setBubble] = useState('')
  const [opened, setOpened] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null) // null | 'right' | 'wrong' | 'empty'
  const [shakeKey, setShakeKey] = useState(0)
  const [doorOpen, setDoorOpen] = useState(false)

  const clicks = useRef(0)
  const timers = useRef([])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* ---- Stage 1: klik kucing ---- */
  const handleCatClick = () => {
    if (stage !== 'cat') return
    clicks.current += 1
    setMood('happy')
    setBubble(clicks.current === 1 ? 'meow.' : 'udah ih.') // easter egg: klik berkali-kali
    if (clicks.current === 1) later(() => setStage('letter'), 1500)
  }

  /* ---- Stage 2: envelope terbuka ---- */
  useEffect(() => {
    if (stage === 'letter') later(() => setOpened(true), 500)
  }, [stage])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (result === 'right') return
    if (!answer) return setResult('empty')
    if (answer === birthdayData.firstChatDate) {
      setResult('right')
      later(() => setStage('door'), 1700)
    } else {
      setResult('wrong')
      setShakeKey((k) => k + 1)
    }
  }

  /* ---- Stage 3: kucing masuk pintu ---- */
  useEffect(() => {
    if (stage !== 'door') return
    later(() => setDoorOpen(true), 900)
    later(() => onEnter(), 3400)
  }, [stage])

  return (
    <section className="entrance">
      <FloatingDecor />

      <AnimatePresence mode="wait">
        {/* ========== STAGE 1: CAT ========== */}
        {stage === 'cat' && (
          <motion.div key="cat" className="entrance__stage" {...fade}>
            <div className="entrance__catwrap">
              <AnimatePresence>
                {bubble && (
                  <motion.span
                    key={bubble + clicks.current}
                    className="bubble hand"
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {bubble}
                  </motion.span>
                )}
              </AnimatePresence>
              <Cat mood={mood} size={230} onClick={handleCatClick} />
            </div>
            <p className="hand entrance__whisper">{t.whisper}</p>
            <p className="entrance__hint">{t.hint}</p>
            <motion.span
              className="entrance__tap"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              ↑ klik kucingnya
            </motion.span>
          </motion.div>
        )}

        {/* ========== STAGE 2: ENVELOPE + QUESTION ========== */}
        {stage === 'letter' && (
          <motion.div key="letter" className="entrance__stage" {...fade}>
            <div className="scene">
              {/* flap amplop */}
              <motion.div
                className="scene__flap"
                style={{ transformOrigin: 'top', transformPerspective: 700 }}
                animate={opened ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 4 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <span className="scene__seal">♡</span>
              </motion.div>

              {/* kartu pertanyaan */}
              <motion.form
                className="scene__card paper"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 70 }}
                animate={opened ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              >
                <p className="eyebrow">{t.beforeTitle}</p>
                <p className="hand" style={{ margin: '4px 0 14px' }}>{t.beforeText}</p>
                <h2 className="display" style={{ fontSize: '1.7rem' }}>{t.question}</h2>

                <motion.div
                  key={shakeKey}
                  animate={shakeKey ? { x: [0, -9, 9, -6, 6, 0] } : {}}
                  transition={{ duration: 0.45 }}
                >
                  <input
                    type="date"
                    className="scene__input"
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value); setResult(null) }}
                    aria-label="Tanggal pertama kali chat"
                  />
                </motion.div>

                <div className="scene__msg" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {result && (
                      <motion.p
                        key={result + shakeKey}
                        className="hand"
                        style={{ color: result === 'right' ? 'var(--maroon-deep)' : 'var(--rose-dusty)' }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {t[result]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <Button type="submit">{t.button}</Button>
              </motion.form>

              {/* badan amplop (di depan kartu) */}
              <div className="scene__body" />
            </div>
          </motion.div>
        )}

        {/* ========== STAGE 3: DOOR ========== */}
        {stage === 'door' && (
          <motion.div key="door" className="entrance__stage" {...fade}>
            <div className="doorscene">
              <motion.div
                animate={doorOpen ? { x: 150, scale: 0.35, opacity: 0 } : { x: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <Cat mood="happy" size={130} />
              </motion.div>

              <div className="door">
                <div className="door__light" />
                <motion.div
                  className="door__panel"
                  style={{ transformOrigin: 'left center', transformPerspective: 600 }}
                  animate={{ rotateY: doorOpen ? -105 : 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                >
                  <span className="door__knob" />
                </motion.div>
              </div>
            </div>
            <p className="hand" style={{ marginTop: 20 }}>silakan masuk... ♡</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}