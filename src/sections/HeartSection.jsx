import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { birthdayData } from '../data/birthdayData'

const meta = birthdayData.chapters[5]
const letter = birthdayData.letter

/* Kucing tidur SVG kecil untuk dekorasi bawah letter */
function SleepyCatDecor() {
  return (
    <svg viewBox="0 0 100 56" width={86} aria-hidden style={{ opacity: 0.72 }}>
      {/* badan */}
      <ellipse cx="50" cy="40" rx="38" ry="18" fill="#5a2630" />
      {/* kepala */}
      <ellipse cx="22" cy="34" rx="18" ry="16" fill="#5a2630" />
      {/* telinga */}
      <polygon points="8,24 4,10 18,20" fill="#5a2630" />
      <polygon points="11,22 8,14 17,19" fill="#b98289" />
      {/* ekor */}
      <path d="M88 40 Q102 26 92 18" fill="none" stroke="#5a2630" strokeWidth="7" strokeLinecap="round" />
      {/* mata tertutup */}
      <path d="M16 35 Q19 32 22 35" fill="none" stroke="#d9aeb3" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 35 Q27 32 30 35" fill="none" stroke="#d9aeb3" strokeWidth="2" strokeLinecap="round" />
      {/* z z z */}
      <text x="36" y="20" fontFamily="serif" fontSize="8" fill="#b98289" opacity="0.75">z</text>
      <text x="44" y="14" fontFamily="serif" fontSize="10" fill="#b98289" opacity="0.6">z</text>
      <text x="54" y="8" fontFamily="serif" fontSize="12" fill="#b98289" opacity="0.45">z</text>
    </svg>
  )
}

/* Amplop SVG animasi buka */
function Envelope({ opened, onClick }) {
  return (
    <motion.div
      className="env"
      onClick={!opened ? onClick : undefined}
      whileHover={!opened ? { scale: 1.04, y: -4 } : undefined}
      style={{ cursor: opened ? 'default' : 'pointer' }}
      aria-label={opened ? undefined : 'Klik untuk buka surat'}
      role={opened ? undefined : 'button'}
    >
      {/* badan amplop */}
      <div className="env__body">
        {/* flap atas (lipatan) */}
        <motion.div
          className="env__flap"
          animate={{ rotateX: opened ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top', transformPerspective: 600 }}
        >
          <span className="env__seal">♡</span>
        </motion.div>

        {/* isi amplop (muncul saat terbuka) */}
        <AnimatePresence>
          {!opened && (
            <motion.p
              className="env__hint hand"
              initial={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
            >
              klik untuk buka ♡
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function HeartSection() {
  const [opened, setOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const open = () => {
    setOpened(true)
    setTimeout(() => setShowLetter(true), 900)
  }

  return (
    <section id={meta.id} className="section">
      <div className="container container--narrow">
        <SectionHeader
          no={meta.no}
          title="From my heart"
          sub="ada satu hal lagi yang ingin aku sampaikan."
        />

        <Reveal>
          <div className="heart-wrap">
            <Envelope opened={opened} onClick={open} />

            <AnimatePresence>
              {showLetter && (
                <motion.article
                  className="letter paper"
                  initial={{ opacity: 0, y: 60, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <p className="eyebrow" style={{ marginBottom: 14 }}>
                    {letter.to}
                  </p>

                  {letter.paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      className="letter__para"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
                    >
                      {para}
                    </motion.p>
                  ))}

                  <motion.div
                    className="letter__closing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + letter.paragraphs.length * 0.2 }}
                  >
                    <p className="letter__para">{letter.closing}</p>
                    <p className="hand letter__sig">{letter.signature}</p>
                  </motion.div>

                  <div className="letter__decor">
                    <SleepyCatDecor />
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
