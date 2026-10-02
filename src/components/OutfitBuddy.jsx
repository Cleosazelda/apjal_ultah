import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Burst from './Burst'
import { birthdayData } from '../data/birthdayData'

// ✏️ Ganti dua warna ini biar mirip Afzaal
const SKIN = '#f1d2bb'
const HAIR = '#302124'

const MAROON = '#5a2630'
const SOFT = '#7a3b46'
const BLUSH = '#d9aeb3'
const CREAM = '#f7f0e8'
const o = birthdayData.date.outfit

export default function OutfitBuddy() {
  const [pick, setPick] = useState(o.bottoms[0])
  const [wave, setWave] = useState(0)
  const [fire, setFire] = useState(0)

  const act = (b) => {
    if (b) setPick(b)
    setWave((w) => w + 1)
    setFire((f) => f + 1)
  }

  return (
    <div className="outfit paper">
      <p className="eyebrow">{o.heading}</p>
      <p className="outfit__note">{o.note}</p>

      <div className="outfit__stage">
        <Burst fire={fire} count={12} kinds={['heart', 'star']} style={{ top: '35%' }} />

        <motion.svg
          viewBox="0 0 160 240"
          width="170"
          onClick={() => act()}
          style={{ cursor: 'pointer', overflow: 'visible' }}
          whileTap={{ scale: 0.96 }}
          aria-label="Karakter Afzaal pakai baju maroon"
        >
          <ellipse cx="80" cy="229" rx="46" ry="6" fill={MAROON} opacity="0.12" />

          {/* kaki / bawahan (warna berubah halus) */}
          <motion.rect x="58" y="158" width="21" height="54" rx="9" stroke="rgba(48,33,36,0.14)" animate={{ fill: pick.color }} transition={{ duration: 0.4 }} />
          <motion.rect x="81" y="158" width="21" height="54" rx="9" stroke="rgba(48,33,36,0.14)" animate={{ fill: pick.color }} transition={{ duration: 0.4 }} />
          {/* sepatu */}
          <ellipse cx="68" cy="214" rx="15" ry="7" fill={CREAM} stroke="rgba(48,33,36,0.18)" />
          <ellipse cx="92" cy="214" rx="15" ry="7" fill={CREAM} stroke="rgba(48,33,36,0.18)" />

          {/* lengan kiri */}
          <g transform="rotate(6 41 102)">
            <rect x="32" y="98" width="18" height="48" rx="9" fill={SOFT} />
            <circle cx="41" cy="150" r="7.5" fill={SKIN} />
          </g>

          {/* lengan kanan (melambai) */}
          <motion.g
            key={wave}
            style={{ originX: 0.5, originY: 0.1 }}
            initial={{ rotate: 0 }}
            animate={wave ? { rotate: [0, -140, -112, -140, -112, 0] } : { rotate: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <rect x="110" y="98" width="18" height="48" rx="9" fill={SOFT} />
            <circle cx="119" cy="150" r="7.5" fill={SKIN} />
          </motion.g>

          {/* badan + kepala (bernapas) */}
          <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
            {/* sweater maroon */}
            <rect x="46" y="92" width="68" height="76" rx="26" fill={MAROON} />
            <rect x="46" y="156" width="68" height="12" rx="6" fill={SOFT} />
            <ellipse cx="80" cy="95" rx="17" ry="6.5" fill={CREAM} />
            <path
              d="M80 142 C70 132 68 124 74 121 C77 119 80 121 80 124 C80 121 83 119 86 121 C92 124 90 132 80 142Z"
              fill={BLUSH}
            />

            {/* telinga */}
            <circle cx="40" cy="66" r="6.5" fill={SKIN} />
            <circle cx="120" cy="66" r="6.5" fill={SKIN} />
            {/* kepala */}
            <ellipse cx="80" cy="62" rx="40" ry="38" fill={SKIN} />
            {/* rambut */}
            <path d="M39 60 C34 26 60 15 82 17 C106 18 126 30 121 60 C113 47 98 42 80 42 C62 42 47 47 39 60Z" fill={HAIR} />
            <path d="M70 26 C74 14 88 14 92 24 C84 22 78 24 70 26Z" fill={HAIR} />

            {/* mata (berkedip) */}
            {[66, 94].map((cx) => (
              <motion.ellipse
                key={cx} cx={cx} cy="66" rx="4" ry="5" fill={HAIR}
                style={{ originY: 0.5 }}
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
              />
            ))}
            <path d="M60 56 Q66 53 72 56 M88 56 Q94 53 100 56" fill="none" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
            <circle cx="55" cy="77" r="6" fill="#d9aeb3" opacity="0.65" />
            <circle cx="105" cy="77" r="6" fill="#d9aeb3" opacity="0.65" />
            <path d="M72 78 Q80 87 88 78" fill="none" stroke={MAROON} strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      </div>

      <p className="hand outfit__label">{o.pickLabel}</p>
      <div className="outfit__swatches">
        {o.bottoms.map((b) => (
          <button
            key={b.key}
            className={`swatch ${pick.key === b.key ? 'is-on' : ''}`}
            onClick={() => act(b)}
            aria-label={b.label}
          >
            <span className="swatch__dot" style={{ background: b.color }} />
            <span className="swatch__txt">{b.label}</span>
          </button>
        ))}
      </div>

      <div style={{ minHeight: 30 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={pick.key + wave}
            className="hand"
            style={{ fontSize: '1.3rem' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {wave ? pick.reply : 'klik karakternya, dia mau say hi. 👋'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}