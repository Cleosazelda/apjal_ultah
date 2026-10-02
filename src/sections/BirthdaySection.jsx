import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import Burst from '../components/Burst'
import Button from '../components/Button'
import { birthdayData } from '../data/birthdayData'

const meta = birthdayData.chapters[6]
const t = birthdayData.finale

/* ---- Kucing tidur di samping kue ---- */
function SleepyCat({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <svg viewBox="0 0 130 80" width={110} aria-hidden>
            {/* badan bulat tidur */}
            <ellipse cx="65" cy="58" rx="50" ry="24" fill="#5a2630" />
            {/* kepala */}
            <ellipse cx="22" cy="48" rx="22" ry="20" fill="#5a2630" />
            {/* telinga */}
            <polygon points="5,32 0,14 18,26" fill="#5a2630" />
            <polygon points="8,30 4,18 16,25" fill="#b98289" />
            <polygon points="36,30 42,14 24,26" fill="#5a2630" />
            <polygon points="33,28 38,18 26,25" fill="#b98289" />
            {/* ekor melingkar */}
            <path d="M115 58 Q134 36 120 24 Q108 14 100 28" fill="none" stroke="#5a2630" strokeWidth="9" strokeLinecap="round" />
            {/* mata tertutup halus */}
            <path d="M12 50 Q16 46 20 50" fill="none" stroke="#d9aeb3" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M22 50 Q26 46 30 50" fill="none" stroke="#d9aeb3" strokeWidth="2.2" strokeLinecap="round" />
            {/* pipi merah muda */}
            <circle cx="10" cy="54" r="5" fill="#b98289" opacity="0.45" />
            {/* z z z */}
            <text x="46" y="28" fontFamily="Georgia, serif" fontSize="10" fill="#b98289" opacity="0.8">z</text>
            <text x="56" y="20" fontFamily="Georgia, serif" fontSize="12" fill="#b98289" opacity="0.6">z</text>
            <text x="68" y="12" fontFamily="Georgia, serif" fontSize="14" fill="#b98289" opacity="0.4">z</text>
          </svg>
          <span className="hand" style={{ fontSize: '0.85rem', color: 'var(--rose-dusty)' }}>
            ikut ngantuk
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---- Birthday Cake SVG ---- */
function BirthdayCake({ blown }) {
  const flames = [
    { x: 44, fy: 28 },
    { x: 65, fy: 20 },
    { x: 86, fy: 28 },
  ]

  return (
    <svg viewBox="0 0 130 120" width="min(220px, 60vw)" aria-hidden>
      {/* Lilin */}
      {flames.map((f, i) => (
        <g key={i}>
          {/* tangkai lilin */}
          <rect x={f.x - 3} y={f.fy + 12} width={6} height={22} rx={2} fill="#d9aeb3" />
          {/* api — hilang saat blown */}
          <AnimatePresence>
            {!blown && (
              <motion.ellipse
                key={`flame-${i}`}
                cx={f.x}
                cy={f.fy + 6}
                rx={5}
                ry={8}
                fill="#e8a040"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.18, 0.88, 1.1, 1] }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={
                  blown
                    ? { duration: 0.3 }
                    : { duration: 1.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }
                }
                style={{ originY: 1 }}
              />
            )}
          </AnimatePresence>
        </g>
      ))}

      {/* tier atas (kecil) */}
      <rect x="30" y="50" width="70" height="28" rx="6" fill="#d9aeb3" />
      {/* frosting atas */}
      <path d="M30 50 Q44 42 58 50 Q72 42 86 50 Q100 42 100 50" fill="#f7f0e8" stroke="none" />

      {/* tier bawah (besar) */}
      <rect x="14" y="76" width="102" height="36" rx="8" fill="#7a3b46" />
      {/* frosting bawah */}
      <path d="M14 76 Q30 66 46 76 Q62 66 78 76 Q94 66 110 76 Q118 70 116 76" fill="#b98289" stroke="none" />

      {/* dekorasi dot cream di tier bawah */}
      {[28, 48, 68, 88].map((x) => (
        <circle key={x} cx={x} cy="90" r="3.5" fill="#f7f0e8" opacity="0.7" />
      ))}

      {/* alas kue */}
      <rect x="8" y="110" width="114" height="8" rx="4" fill="#e9ddd2" />

      {/* hiasan bunga kecil */}
      {[42, 65, 88].map((x) => (
        <g key={x}>
          <circle cx={x} cy="86" r="5" fill="#f7f0e8" opacity="0.85" />
          <circle cx={x} cy="86" r="2.5" fill="#d9aeb3" />
        </g>
      ))}
    </svg>
  )
}

/* ---- Star sparkle overlay ---- */
function StarField({ show }) {
  const stars = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: `${6 + (i * 6.2) % 88}%`,
    y: `${8 + (i * 11.3) % 70}%`,
    size: 10 + (i % 5) * 4,
    delay: (i % 8) * 0.12,
  }))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="starfield"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {stars.map((s) => (
            <motion.span
              key={s.id}
              className="starfield__star"
              style={{ left: s.x, top: s.y, fontSize: s.size }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.9, 1] }}
              transition={{ delay: s.delay, duration: 0.7, repeat: Infinity, repeatDelay: 1.8 + s.delay }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function BirthdaySection() {
  const [blown, setBlown] = useState(false)
  const [burst, setBurst] = useState(0)
  const [lineIdx, setLineIdx] = useState(-1)

  const blow = () => {
    if (blown) return
    setBlown(true)
    setBurst((b) => b + 1)
    // tampilkan teks baris per baris
    t.afterLines.forEach((_, i) => {
      setTimeout(() => setLineIdx(i), 900 + i * 700)
    })
  }

  return (
    <section id={meta.id} className="section birthday-section">
      <StarField show={blown} />

      <div className="container">
        <SectionHeader no={meta.no} title="Happy Birthday!" />

        <Reveal>
          <div className="birthday-wrap">
            {/* ONE LAST THING eyebrow */}
            <motion.p
              className="eyebrow birthday__eyebrow"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {t.eyebrow}
            </motion.p>

            {/* Title */}
            <motion.h2
              className="display birthday__title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.9 }}
            >
              {t.title}
            </motion.h2>

            {/* Cake area */}
            <div className="birthday__stage">
              <Burst fire={burst} count={52} kinds={['heart', 'petal', 'star', 'confetti', 'sparkle']} />
              <BirthdayCake blown={blown} />
              <SleepyCat visible={blown} />
            </div>

            {/* Instruksi + tombol */}
            <AnimatePresence mode="wait">
              {!blown ? (
                <motion.div
                  key="pre"
                  className="birthday__action"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="hand birthday__instr">{t.instruction}</p>
                  <Button onClick={blow}>{t.button}</Button>
                </motion.div>
              ) : (
                <motion.div
                  key="post"
                  className="birthday__after"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {t.afterLines.map((line, i) => (
                    <AnimatePresence key={i}>
                      {lineIdx >= i && (
                        <motion.p
                          className={
                            i < t.afterLines.length - 2
                              ? 'birthday__line'
                              : i === t.afterLines.length - 2
                              ? 'display birthday__main'
                              : 'birthday__love hand'
                          }
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7 }}
                        >
                          {line}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  ))}

                  {lineIdx >= t.afterLines.length - 1 && (
                    <motion.p
                      className="hand birthday__sig"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      {t.signature}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
