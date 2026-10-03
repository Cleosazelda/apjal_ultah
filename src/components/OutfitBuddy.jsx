import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Burst from './Burst'
import Button from './Button'
import { birthdayData } from '../data/birthdayData'
import { notifyOutfit } from '../services/notificationService'

// Warna Afzaal
const SKIN_A = '#f1d2bb'
const HAIR_A = '#302124'

// Warna Cleosa (sedikit dibedakan)
const SKIN_C = '#f5e0d4'
const HAIR_C = '#2c1e20'

const MAROON = '#5a2630'
const SOFT = '#7a3b46'
const BLUSH = '#d9aeb3'
const CREAM = '#f7f0e8'
const o = birthdayData.date.outfit

export default function OutfitBuddy() {
  const [pick, setPick] = useState(o.bottoms[0])
  const [wave, setWave] = useState(0)
  const [fire, setFire] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const selectItem = (b) => {
    if (b) {
      setPick(b)
    }
    setWave((w) => w + 1)
    setFire((f) => f + 1)
  }

  const submitOutfit = async () => {
    setSubmitted(true)
    await notifyOutfit(pick.label)
  }

  return (
    <div className="outfit paper">
      <p className="eyebrow">{o.heading}</p>
      <p className="outfit__note">{o.note}</p>

      <div className="outfit__stage">
        <Burst fire={fire} count={12} kinds={['heart', 'star']} style={{ top: '35%' }} />

        <motion.svg
          viewBox="0 0 300 240"
          width="100%"
          style={{ maxWidth: '320px', cursor: 'pointer', overflow: 'visible' }}
          onClick={() => selectItem()}
          whileTap={{ scale: 0.96 }}
          aria-label="Karakter Cleosa dan Afzaal pakai baju maroon"
        >
          {/* Bayangan bersama */}
          <ellipse cx="150" cy="229" rx="80" ry="8" fill={MAROON} opacity="0.1" />

          {/* ==================================================== */}
          {/* KARAKTER 1: CLEOSA (KIRI) */}
          {/* ==================================================== */}
          <g transform="translate(40, 0)">
            {/* kaki / rok (warna cream tetap) */}
            <rect x="52" y="156" width="56" height="58" rx="8" fill="#e9ddd2" stroke="rgba(48,33,36,0.12)" />
            {/* sepatu (mary jane style) */}
            <ellipse cx="64" cy="214" rx="13" ry="8" fill="#3a3033" />
            <path d="M58 206 L70 206" stroke="#3a3033" strokeWidth="3" />
            <ellipse cx="96" cy="214" rx="13" ry="8" fill="#3a3033" />
            <path d="M90 206 L102 206" stroke="#3a3033" strokeWidth="3" />

            {/* lengan kiri */}
            <g transform="rotate(8 41 102)">
              <rect x="34" y="98" width="16" height="46" rx="8" fill={SOFT} />
              <circle cx="42" cy="148" r="7" fill={SKIN_C} />
            </g>

            {/* badan + kepala (bernapas halus) */}
            <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
              {/* Cardigan / atasan maroon */}
              <rect x="46" y="94" width="68" height="66" rx="24" fill={MAROON} />
              {/* Leher kerah putih */}
              <ellipse cx="80" cy="94" rx="16" ry="6" fill="#fffaf3" />
              <path d="M74 96 L80 106 L86 96 Z" fill="#fffaf3" />
              
              {/* Leher & kepala */}
              <rect x="74" y="80" width="12" height="15" fill={SKIN_C} />
              <circle cx="42" cy="66" r="6" fill={SKIN_C} />
              <circle cx="118" cy="66" r="6" fill={SKIN_C} />
              <ellipse cx="80" cy="62" rx="38" ry="36" fill={SKIN_C} />
              
              {/* Rambut panjang Cleosa */}
              <path d="M42 60 C38 120 40 130 48 135 C56 140 52 110 52 80 C52 40 108 40 108 80 C108 110 104 140 112 135 C120 130 122 120 118 60 C114 20 80 12 80 12 C80 12 46 20 42 60 Z" fill={HAIR_C} />
              {/* Poni */}
              <path d="M42 56 C50 30 70 30 80 34 C80 34 85 24 118 56 C110 30 90 20 80 20 C70 20 50 30 42 56 Z" fill={HAIR_C} />
              {/* Jepitan rambut kecil */}
              <rect x="100" y="44" width="12" height="4" rx="2" fill="#d9aeb3" transform="rotate(-15 106 46)" />

              {/* mata (berkedip) */}
              {[68, 92].map((cx) => (
                <motion.ellipse
                  key={cx} cx={cx} cy="66" rx="3.5" ry="4.5" fill={HAIR_C}
                  style={{ originY: 0.5 }}
                  animate={{ scaleY: [1, 1, 0.1, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
                />
              ))}
              <circle cx="58" cy="74" r="5.5" fill="#d9aeb3" opacity="0.75" />
              <circle cx="102" cy="74" r="5.5" fill="#d9aeb3" opacity="0.75" />
              {/* senyum kecil */}
              <path d="M76 76 Q80 82 84 76" fill="none" stroke={MAROON} strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            {/* lengan kanan melambai lambat */}
            <motion.g
              key={wave + "c"}
              style={{ originX: 0.2, originY: 0.1 }}
              initial={{ rotate: 10 }}
              animate={wave ? { rotate: [10, -60, -40, -60, -40, 10] } : { rotate: 10 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <rect x="110" y="98" width="16" height="46" rx="8" fill={SOFT} />
              <circle cx="118" cy="148" r="7" fill={SKIN_C} />
            </motion.g>
          </g>


          {/* ==================================================== */}
          {/* KARAKTER 2: AFZAAL (KANAN) */}
          {/* ==================================================== */}
          <g transform="translate(130, 0)">
            {/* kaki / bawahan (warna berubah halus sesuai pilihan) */}
            <motion.rect x="58" y="158" width="21" height="54" rx="9" stroke="rgba(48,33,36,0.14)" animate={{ fill: pick.color }} transition={{ duration: 0.4 }} />
            <motion.rect x="81" y="158" width="21" height="54" rx="9" stroke="rgba(48,33,36,0.14)" animate={{ fill: pick.color }} transition={{ duration: 0.4 }} />
            {/* sepatu (sneakers) */}
            <ellipse cx="68" cy="214" rx="15" ry="7" fill={CREAM} stroke="rgba(48,33,36,0.18)" />
            <ellipse cx="92" cy="214" rx="15" ry="7" fill={CREAM} stroke="rgba(48,33,36,0.18)" />

            {/* lengan kiri */}
            <g transform="rotate(6 41 102)">
              <rect x="32" y="98" width="18" height="48" rx="9" fill={SOFT} />
              <circle cx="41" cy="150" r="7.5" fill={SKIN_A} />
            </g>

            {/* lengan kanan (melambai cepat) */}
            <motion.g
              key={wave + "a"}
              style={{ originX: 0.5, originY: 0.1 }}
              initial={{ rotate: 0 }}
              animate={wave ? { rotate: [0, -140, -112, -140, -112, 0] } : { rotate: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <rect x="110" y="98" width="18" height="48" rx="9" fill={SOFT} />
              <circle cx="119" cy="150" r="7.5" fill={SKIN_A} />
            </motion.g>

            {/* badan + kepala (bernapas) */}
            <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
              {/* sweater maroon */}
              <rect x="46" y="92" width="68" height="76" rx="26" fill={MAROON} />
              <rect x="46" y="156" width="68" height="12" rx="6" fill={SOFT} />
              <ellipse cx="80" cy="95" rx="17" ry="6.5" fill={CREAM} />
              
              {/* Leher & telinga */}
              <path d="M80 142 C70 132 68 124 74 121 C77 119 80 121 80 124 C80 121 83 119 86 121 C92 124 90 132 80 142Z" fill={BLUSH} />
              <circle cx="40" cy="66" r="6.5" fill={SKIN_A} />
              <circle cx="120" cy="66" r="6.5" fill={SKIN_A} />
              
              {/* kepala Afzaal */}
              <ellipse cx="80" cy="62" rx="40" ry="38" fill={SKIN_A} />
              {/* rambut cowok */}
              <path d="M39 60 C34 26 60 15 82 17 C106 18 126 30 121 60 C113 47 98 42 80 42 C62 42 47 47 39 60Z" fill={HAIR_A} />
              <path d="M70 26 C74 14 88 14 92 24 C84 22 78 24 70 26Z" fill={HAIR_A} />

              {/* mata (berkedip) */}
              {[66, 94].map((cx) => (
                <motion.ellipse
                  key={cx} cx={cx} cy="66" rx="4" ry="5" fill={HAIR_A}
                  style={{ originY: 0.5 }}
                  animate={{ scaleY: [1, 1, 0.1, 1] }}
                  transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
                />
              ))}
              <path d="M60 56 Q66 53 72 56 M88 56 Q94 53 100 56" fill="none" stroke={HAIR_A} strokeWidth="2" strokeLinecap="round" />
              <circle cx="55" cy="77" r="6" fill="#d9aeb3" opacity="0.65" />
              <circle cx="105" cy="77" r="6" fill="#d9aeb3" opacity="0.65" />
              <path d="M72 78 Q80 87 88 78" fill="none" stroke={MAROON} strokeWidth="2.4" strokeLinecap="round" />
            </motion.g>
          </g>
          
          {/* Hati kecil muncul saat diklik */}
          <AnimatePresence>
            {wave > 0 && (
              <motion.path
                d="M150 70 C150 70 140 60 150 50 C160 60 150 70 150 70 Z"
                fill="#d9aeb3"
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 1], y: -40 }}
                transition={{ duration: 1.2 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

        </motion.svg>
      </div>

      <p className="hand outfit__label">Untuk besok kamu mau pakai bawahan apa? 👀</p>
      <div className="outfit__swatches">
        {o.bottoms.map((b) => (
          <button
            key={b.key}
            className={`swatch ${pick.key === b.key ? 'is-on' : ''}`}
            onClick={() => selectItem(b)}
            aria-label={b.label}
          >
            <span className="swatch__dot" style={{ background: b.color }} />
            <span className="swatch__txt">{b.label}</span>
          </button>
        ))}
      </div>

      <div style={{ minHeight: 30, marginBottom: '16px' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={pick.key + wave}
            className="hand"
            style={{ fontSize: '1.3rem' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {wave ? pick.reply : 'coba klik karakternya... 👋'}
          </motion.p>
        </AnimatePresence>
      </div>

      {!submitted ? (
        <Button onClick={submitOutfit}>OKAY, AKU PILIH ♡</Button>
      ) : (
        <motion.p
          className="hand"
          style={{ color: 'var(--maroon-deep)', fontSize: '1.2rem' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Okayy, ditunggu ya! ♡
        </motion.p>
      )}
    </div>
  )
}