import { motion } from 'framer-motion'

const MAROON = '#5a2630'
const SOFT = '#7a3b46'
const ROSE = '#b98289'
const BLUSH = '#d9aeb3'
const CREAM = '#f7f0e8'

const loop = (duration, delay = 0) => ({ duration, repeat: Infinity, ease: 'easeInOut', delay })

/**
 * Kucing maroon SVG dengan idle animation:
 * blink, tail, ear twitch, breathing.
 * mood: 'idle' | 'happy'
 */
export default function Cat({ mood = 'idle', size = 220, onClick, style }) {
  const happy = mood === 'happy'

  return (
    <motion.div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Klik kucingnya' : undefined}
      style={{ width: size, cursor: onClick ? 'pointer' : 'default', userSelect: 'none', ...style }}
      whileHover={onClick ? { scale: 1.04 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      animate={happy ? { y: [0, -28, 0, -12, 0] } : { y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <svg viewBox="0 0 200 230" width="100%" aria-hidden>
        {/* bayangan */}
        <ellipse cx="100" cy="219" rx="58" ry="7" fill={MAROON} opacity="0.12" />

        {/* EKOR */}
        <motion.path
          d="M148 196 C192 196 198 142 176 128"
          fill="none"
          stroke={MAROON}
          strokeWidth="14"
          strokeLinecap="round"
          style={{ originX: 0, originY: 1 }}
          animate={happy ? { rotate: [0, 16, -6, 16, -6, 0] } : { rotate: [0, 9, -4, 7, 0] }}
          transition={happy ? { duration: 0.9, repeat: Infinity } : loop(3.4)}
        />

        {/* BADAN + KEPALA (breathing) */}
        <motion.g
          style={{ originX: 0.5, originY: 1 }}
          animate={{ scaleY: [1, 1.025, 1] }}
          transition={loop(3.6)}
        >
          <ellipse cx="100" cy="170" rx="50" ry="46" fill={MAROON} />
          <ellipse cx="100" cy="184" rx="27" ry="29" fill={SOFT} />
          {/* kaki depan */}
          <ellipse cx="82" cy="208" rx="14" ry="9" fill={SOFT} />
          <ellipse cx="118" cy="208" rx="14" ry="9" fill={SOFT} />

          {/* telinga kiri */}
          <motion.g
            style={{ originX: 0.5, originY: 1 }}
            animate={{ rotate: [0, 0, -9, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.7, 0.78, 0.86, 1] }}
          >
            <polygon points="56,88 50,40 94,68" fill={MAROON} />
            <polygon points="62,78 59,54 83,68" fill={ROSE} />
          </motion.g>
          {/* telinga kanan (offset waktu) */}
          <motion.g
            style={{ originX: 0.5, originY: 1 }}
            animate={{ rotate: [0, 0, 9, 0, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, times: [0, 0.4, 0.48, 0.56, 1] }}
          >
            <polygon points="144,88 150,40 106,68" fill={MAROON} />
            <polygon points="138,78 141,54 117,68" fill={ROSE} />
          </motion.g>

          {/* kepala */}
          <ellipse cx="100" cy="108" rx="52" ry="44" fill={MAROON} />

          {/* pita kecil di leher */}
          <g>
            <ellipse cx="86" cy="150" rx="11" ry="6.5" fill={BLUSH} transform="rotate(-18 86 150)" />
            <ellipse cx="114" cy="150" rx="11" ry="6.5" fill={BLUSH} transform="rotate(18 114 150)" />
            <circle cx="100" cy="151" r="5" fill={ROSE} />
          </g>

          {/* mata */}
          {happy ? (
            <g fill="none" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round">
              <path d="M72 111 Q80 100 88 111" />
              <path d="M112 111 Q120 100 128 111" />
            </g>
          ) : (
            <g fill={CREAM}>
              {[80, 120].map((cx) => (
                <motion.ellipse
                  key={cx}
                  cx={cx}
                  cy="108"
                  rx="6.5"
                  ry="8"
                  style={{ originY: 0.5 }}
                  animate={{ scaleY: [1, 1, 0.08, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
                />
              ))}
            </g>
          )}

          {/* pipi, hidung, mulut, kumis */}
          <circle cx="66" cy="122" r="7" fill={ROSE} opacity="0.55" />
          <circle cx="134" cy="122" r="7" fill={ROSE} opacity="0.55" />
          <path d="M96 120 L104 120 L100 125 Z" fill={BLUSH} />
          <path d="M100 125 Q95 132 90 128 M100 125 Q105 132 110 128" fill="none" stroke={BLUSH} strokeWidth="2" strokeLinecap="round" />
          <g stroke={ROSE} strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
            <path d="M60 118 L38 113" /><path d="M60 125 L38 129" />
            <path d="M140 118 L162 113" /><path d="M140 125 L162 129" />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  )
}