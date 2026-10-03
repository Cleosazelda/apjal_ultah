/**
 * Entrance.jsx — Opening experience for Afzaal's birthday website.
 *
 * Architecture:
 *  Stage 1 "cat"       → Cat alone, greeting, click to continue
 *  Stage 2 "envelope"  → Envelope appears, cat moves aside, click to open
 *  Stage 3 "question"  → Card slides up from envelope, cat watches, date input
 *  Stage 4 "door"      → Correct → celebration → tiny door → cat walks through
 *
 * Layout principle:
 *  NEVER use absolute positioning for the main content flow.
 *  Cat and form are in SEPARATE stacked regions.
 *  Interactive elements are always z-index safe and fully visible.
 */

import { useEffect, useReducer, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Cat from '../components/Cat'
import { birthdayData } from '../data/birthdayData'
import '../styles/entrance.css'

const t = birthdayData.entrance

/* ─── tiny helpers ───────────────────────────────────────────── */
const spring = (stiffness = 260, damping = 22) => ({ type: 'spring', stiffness, damping })
const ease   = (duration = 0.5) => ({ duration, ease: [0.4, 0, 0.2, 1] })

/* ─── state machine ──────────────────────────────────────────── */
const INIT = {
  stage:    'cat',      // cat | envelope | question | celebrating | door
  mood:     'idle',     // idle | happy | sad | waiting | surprise
  bubble:   '',
  catClicks: 0,
  opened:   false,
  answer:   '',
  result:   null,       // null | 'right' | 'wrong' | 'empty'
  shakeKey: 0,
  doorOpen: false,
}

function reduce(s, a) {
  switch (a.type) {
    case 'CAT_CLICK':     return { ...s, catClicks: s.catClicks + 1, mood: 'happy', bubble: s.catClicks === 0 ? 'meow.' : 'udaaah.' }
    case 'SET_STAGE':     return { ...s, stage: a.stage }
    case 'SET_MOOD':      return { ...s, mood: a.mood }
    case 'SET_BUBBLE':    return { ...s, bubble: a.bubble }
    case 'CLEAR_BUBBLE':  return { ...s, bubble: '' }
    case 'OPEN_ENV':      return { ...s, opened: true }
    case 'SET_ANSWER':    return { ...s, answer: a.answer, result: null, mood: s.mood === 'sad' ? 'waiting' : s.mood }
    case 'SET_RESULT':    return { ...s, result: a.result, mood: a.mood ?? s.mood, shakeKey: a.shake ? s.shakeKey + 1 : s.shakeKey }
    case 'DOOR_OPEN':     return { ...s, doorOpen: true }
    default:              return s
  }
}

/* ─── decorative background dots ─────────────────────────────── */
const BG_DOTS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 1 + Math.random() * 2.5,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
  char: ['✦', '✧', '♡', '·'][Math.floor(Math.random() * 4)],
}))

export default function Entrance({ onEnter }) {
  const [s, dispatch] = useReducer(reduce, INIT)
  const prefersReduced = useReducedMotion()
  const timers = useRef([])
  const later  = (fn, ms) => { const id = setTimeout(fn, prefersReduced ? Math.min(ms, 80) : ms); timers.current.push(id); return id }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // ── helpers
  const go    = (stage) => dispatch({ type: 'SET_STAGE', stage })
  const mood  = (m)     => dispatch({ type: 'SET_MOOD',  mood: m })

  /* ── Stage 1: cat click ───── */
  const handleCatClick = () => {
    if (s.stage !== 'cat') return
    dispatch({ type: 'CAT_CLICK' })
    if (s.catClicks === 0) {
      later(() => { dispatch({ type: 'CLEAR_BUBBLE' }); mood('happy'); go('envelope') }, 1400)
    } else {
      later(() => { dispatch({ type: 'CLEAR_BUBBLE' }); mood('happy') }, 900)
    }
  }

  /* ── Stage 2: click envelope ─ */
  const handleEnvelopeClick = () => {
    if (s.stage !== 'envelope') return
    dispatch({ type: 'OPEN_ENV' })
    mood('happy')
    later(() => go('question'), prefersReduced ? 400 : 1000)
  }

  /* ── Stage 3: submit ────────── */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (s.result === 'right') return
    if (!s.answer.trim()) { dispatch({ type: 'SET_RESULT', result: 'empty', mood: 'idle' }); return }

    if (s.answer === birthdayData.firstChatDate) {
      dispatch({ type: 'SET_RESULT', result: 'right', mood: 'surprise' })
      later(() => { mood('happy'); go('celebrating') }, 900)
      later(() => go('door'), prefersReduced ? 1200 : 2800)
      later(() => dispatch({ type: 'DOOR_OPEN' }), prefersReduced ? 1600 : 3600)
      later(() => go('entering'), prefersReduced ? 1800 : 4800)
      later(() => onEnter(), prefersReduced ? 2000 : 6200)
    } else {
      dispatch({ type: 'SET_RESULT', result: 'wrong', mood: 'sad', shake: true })
      later(() => mood('waiting'), 2400)
    }
  }

  const inDoor = s.stage === 'door' || s.stage === 'celebrating' || s.stage === 'entering'

  return (
    <motion.section 
      className="entrance" 
      aria-label="Halaman pembuka"
      style={{ transformOrigin: '50% 75%' }} // Zoom into the door area
      animate={s.stage === 'entering' && !prefersReduced ? { scale: 5, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── Background decorative layer ── */}
      {!prefersReduced && (
        <div className="entrance__bg" aria-hidden>
          {BG_DOTS.map(d => (
            <motion.span
              key={d.id}
              className="entrance__dot"
              style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: `${d.r * 5}px` }}
              animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -8, 0] }}
              transition={{ duration: d.dur, delay: d.delay, repeat: Infinity }}
            >
              {d.char}
            </motion.span>
          ))}
        </div>
      )}

      <div className="entrance__wrap">
        {/* ══════════════════════════════════════════════════════
            REGION A — CAT (always in its own row, never over form)
            ════════════════════════════════════════════════════ */}
        <div className="entrance__cat-region">
          {/* speech bubble */}
          <AnimatePresence>
            {s.bubble && (
              <motion.div
                className="entrance__bubble hand"
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={spring(320, 24)}
              >
                {s.bubble}
              </motion.div>
            )}
          </AnimatePresence>

          {/* floating hearts on correct */}
          <AnimatePresence>
            {s.stage === 'celebrating' && !prefersReduced && (
              <motion.div className="entrance__hearts" aria-hidden
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {['♡', '♡', '✦', '♡'].map((c, i) => (
                  <motion.span key={i}
                    animate={{ y: [-10, -60], opacity: [1, 0] }}
                    transition={{ duration: 1.2, delay: i * 0.18, repeat: 3 }}
                  >{c}</motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── THE CAT ── */}
          <motion.div
            layout
            animate={{
              x: 0,
              y: s.stage === 'door' || s.stage === 'entering' ? 10 : s.stage === 'question' ? 10 : 0,
              scale: s.stage === 'entering' ? 0.9 : s.stage === 'door' ? 0.85 : s.stage === 'question' ? 0.72 : 1,
              opacity: (s.stage === 'door' || s.stage === 'entering') ? 0 : 1, // Sembunyikan main cat, pakai cat di doorscene
              zIndex: s.stage === 'entering' ? 0 : 10
            }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            style={{ pointerEvents: (s.stage === 'door' || s.stage === 'entering') ? 'none' : 'auto' }}
          >
            <Cat
              mood={s.mood}
              size={s.stage === 'question' ? 240 : 220}
              onClick={s.stage === 'cat' ? handleCatClick : undefined}
              trackCursor={s.stage === 'cat' || s.stage === 'question'}
            />
          </motion.div>

          {/* Stage 1 only: hint text */}
          <AnimatePresence>
            {s.stage === 'cat' && (
              <motion.div
                key="cat-text"
                className="entrance__cat-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={ease(0.5)}
              >
                <p className="hand entrance__whisper">{t.whisper}</p>
                <p className="entrance__hint">{t.hint}</p>
                <motion.p
                  className="entrance__tap"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  ↑ tap the cat
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════
            REGION B — CONTENT (envelope / question / door)
            Completely separate from the cat. No overlap possible.
            ════════════════════════════════════════════════════ */}
        <div className="entrance__content-region">
          <AnimatePresence mode="wait">

            {/* ── ENVELOPE ─────────────────────────────────── */}
            {s.stage === 'envelope' && (
              <motion.div
                key="envelope"
                className="entrance__envelope-wrap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={ease(0.6)}
              >
                <button
                  className="envelope"
                  onClick={handleEnvelopeClick}
                  aria-label="Buka suratnya"
                >
                  {/* envelope body */}
                  <div className="envelope__body">
                    {/* top fold (flap) */}
                    <motion.div
                      className="envelope__flap"
                      animate={s.opened ? { rotateX: 180 } : { rotateX: 0 }}
                      transition={{ duration: prefersReduced ? 0 : 0.7, ease: 'easeInOut' }}
                    />
                    {/* bottom fold V */}
                    <div className="envelope__bottom" />
                    {/* side folds */}
                    <div className="envelope__left" />
                    <div className="envelope__right" />
                    {/* heart seal */}
                    <motion.div
                      className="envelope__seal"
                      initial={{ x: "-50%", y: "-50%" }}
                      whileHover={{ scale: 1.2, x: "-50%", y: "-50%" }}
                      animate={s.opened ? { scale: 0, opacity: 0, x: "-50%", y: "-50%" } : { scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                    >
                      ♡
                    </motion.div>
                  </div>

                  {/* subtle float */}
                  <motion.p className="hand envelope__cta"
                    animate={{ opacity: s.opened ? 0 : [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    buka...
                  </motion.p>
                </button>
              </motion.div>
            )}

            {/* ── QUESTION CARD ─────────────────────────────── */}
            {s.stage === 'question' && (
              <motion.div
                key="question"
                className="entrance__question-wrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={ease(0.55)}
              >
                <form
                  className="qcard paper"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* card header decoration */}
                  <div className="qcard__deco" aria-hidden>
                    <span className="qcard__corner">✦</span>
                    <span className="qcard__corner qcard__corner--r">✦</span>
                  </div>

                  <p className="eyebrow qcard__eyebrow">{t.beforeTitle}</p>
                  <p className="hand qcard__sub">{t.beforeText}</p>

                  <h2 className="qcard__question display">{t.question}</h2>

                  <div className="qcard__input-wrap">
                    <label className="qcard__label" htmlFor="chat-date">
                      {t.question}
                    </label>
                    <motion.input
                      id="chat-date"
                      key={s.shakeKey}
                      type="date"
                      className="qcard__input"
                      value={s.answer}
                      onChange={(e) => dispatch({ type: 'SET_ANSWER', answer: e.target.value })}
                      aria-describedby="qcard-msg"
                      animate={s.shakeKey ? { x: [0, -8, 8, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div id="qcard-msg" className="qcard__msg" aria-live="polite" role="status">
                    <AnimatePresence mode="wait">
                      {s.result && (
                        <motion.p
                          key={s.result + s.shakeKey}
                          className={`hand qcard__result qcard__result--${s.result}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={ease(0.35)}
                        >
                          {t[s.result]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="submit"
                    className="qcard__btn"
                    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(90,38,48,0.25)' }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring(400, 24)}
                  >
                    {t.button}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* ── CELEBRATING (brief happy pause) ──────────── */}
            {s.stage === 'celebrating' && (
              <motion.div
                key="celebrating"
                className="entrance__celebrating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={ease(0.5)}
              >
                <p className="hand" style={{ fontSize: '1.5rem', color: 'var(--maroon-deep)' }}>
                  {t.right}
                </p>
              </motion.div>
            )}

            {/* ── DOOR ─────────────────────────────────────── */}
            {(s.stage === 'door' || s.stage === 'entering') && (
              <motion.div
                key="door"
                className="entrance__door-wrap"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={spring(240, 22)}
              >
                <div className="doorscene">
                  <motion.div
                    animate={s.doorOpen || s.stage === 'entering' ? { x: 150, scale: 0.35, opacity: 0 } : { x: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  >
                    <Cat mood="happy" size={130} />
                  </motion.div>

                  <div className="door">
                  {/* warm light behind door */}
                  <motion.div
                    className="door__light"
                    animate={
                      s.stage === 'entering' ? { opacity: [1, 1.5, 2] } :
                      s.doorOpen ? { opacity: [0, 0.7, 1] } : { opacity: 0 }
                    }
                    transition={{ duration: prefersReduced ? 0.2 : 1.2 }}
                  />
                  {/* door panel */}
                  <motion.div
                    className="door__panel"
                    style={{ originX: 0, transformPerspective: 500 }}
                    animate={{ rotateY: s.doorOpen ? -110 : 0 }}
                    transition={{ duration: prefersReduced ? 0.3 : 1.0, ease: 'easeInOut', delay: 0.2 }}
                  >
                    <span className="door__knob" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            )}

          </AnimatePresence>
        </div>
        {/* end content region */}
      </div>
    </motion.section>
  )
}