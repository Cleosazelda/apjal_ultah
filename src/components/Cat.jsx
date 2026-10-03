import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MAROON = '#5a2630'
const SOFT   = '#7a3b46'
const ROSE   = '#b98289'
const BLUSH  = '#d9aeb3'
const CREAM  = '#f7f0e8'
const DARK   = '#302124'
const TEAR   = '#a8d4f5'

const loop = (duration, delay = 0) => ({ duration, repeat: Infinity, ease: 'easeInOut', delay })

/**
 * Kucing maroon SVG.
 * mood: 'idle' | 'happy' | 'sad' | 'waiting' | 'surprise'
 * trackCursor: mata mengikuti kursor/sentuhan
 */
export default function Cat({ mood = 'idle', size = 220, onClick, style, trackCursor = true }) {
  const wrapRef   = useRef(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })

  const happy    = mood === 'happy'
  const sad      = mood === 'sad'
  const waiting  = mood === 'waiting'
  const surprise = mood === 'surprise'
  const reacting = happy || sad || surprise

  /* --- tracking kursor / sentuhan --- */
  useEffect(() => {
    if (!trackCursor || reacting) return

    const move = (cx, cy) => {
      const el = wrapRef.current
      if (!el) return
      const r  = el.getBoundingClientRect()
      const ex = r.left + r.width  * 0.5
      const ey = r.top  + r.height * 0.47
      const dx = cx - ex
      const dy = cy - ey
      const dist = Math.hypot(dx, dy)
      const capped = Math.min(dist, 90)
      const s = dist > 0 ? (capped / dist) * (4 * capped / 90) : 0
      setPupil({ x: dx * s / dist || 0, y: dy * s / dist || 0 })
    }

    const onMouse = (e) => move(e.clientX, e.clientY)
    const onTouch = (e) => { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY) }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      setPupil({ x: 0, y: 0 })
    }
  }, [trackCursor, reacting])

  // Custom values based on mood
  const headRotate = sad ? 4 : 0
  const yBounce = happy ? [0, -24, 0, -10, 0] : surprise ? [0, -32, 0] : sad ? [0, 2, 0] : [0, -2, 0]
  const yDuration = happy ? 0.7 : surprise ? 0.4 : sad ? 2 : 2.5
  const tailRotate = happy ? [0, 16, -6, 16, -6, 0] : surprise ? [0, -10, 0] : sad ? [0, -4, 0] : waiting ? [0, 8, -4, 5, 0] : [0, 10, -5, 8, 0]
  const tailDuration = happy ? 0.9 : surprise ? 0.5 : sad ? 1.8 : 4
  const earLRotate = surprise ? -15 : sad ? -12 : waiting ? -5 : [0, 0, -10, 0, 0]
  const earRRotate = surprise ? 15  : sad ? 12  : waiting ? 5  : [0, 0, 10, 0, 0]

  return (
    <motion.div
      ref={wrapRef}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Klik kucingnya' : undefined}
      style={{ width: size, cursor: onClick ? 'pointer' : 'default', userSelect: 'none', ...style }}
      whileHover={onClick ? { scale: 1.04 } : undefined}
      whileTap={onClick  ? { scale: 0.96 } : undefined}
      animate={{ y: yBounce }}
      transition={happy ? { duration: yDuration } : surprise ? { duration: yDuration, type: 'spring' } : loop(yDuration)}
    >
      <svg viewBox="0 0 200 230" width="100%" aria-hidden style={{ overflow: 'visible' }}>
        {/* bayangan */}
        <ellipse cx="100" cy="219" rx="58" ry="7" fill={MAROON} opacity={sad ? 0.07 : surprise ? 0.05 : 0.12} />

        {/* EKOR */}
        <motion.path
          d="M148 196 C192 196 198 142 176 128"
          fill="none" stroke={MAROON} strokeWidth="14" strokeLinecap="round"
          style={{ originX: 0, originY: 1 }}
          animate={{ rotate: tailRotate }}
          transition={happy || surprise ? { duration: tailDuration, repeat: happy ? Infinity : 0 } : loop(tailDuration)}
        />

        {/* BADAN + KEPALA */}
        <motion.g
          style={{ originX: 0.5, originY: 1 }}
          animate={{ scaleY: sad ? [1, 0.99, 1] : surprise ? [1, 1.05, 1] : [1, 1.015, 1] }}
          transition={sad ? loop(3) : surprise ? { duration: 0.3 } : loop(2.5)}
        >
          <ellipse cx="100" cy="170" rx="50" ry="46" fill={MAROON} />
          <ellipse cx="100" cy="184" rx="27" ry="29" fill={SOFT} />
          {/* kaki depan */}
          <ellipse cx="82"  cy="208" rx="14" ry="9" fill={SOFT} />
          <ellipse cx="118" cy="208" rx="14" ry="9" fill={SOFT} />

          {/* KEPALA GROUP (bisa miring) */}
          <motion.g
            style={{ originX: '100px', originY: '140px' }}
            animate={{ rotate: headRotate }}
            transition={waiting ? { type: 'spring', stiffness: 100 } : { duration: 0.5 }}
          >
            {/* telinga kiri */}
            <motion.g
              style={{ originX: 0.5, originY: 1 }}
              animate={{ rotate: earLRotate }}
              transition={!reacting && !waiting ? { duration: 5, repeat: Infinity, times: [0, 0.7, 0.78, 0.86, 1] } : { duration: 0.3 }}
            >
              <polygon points="56,88 50,40 94,68" fill={MAROON} />
              <polygon points="62,78 59,54 83,68" fill={ROSE}   />
            </motion.g>
            {/* telinga kanan */}
            <motion.g
              style={{ originX: 0.5, originY: 1 }}
              animate={{ rotate: earRRotate }}
              transition={!reacting && !waiting ? { duration: 6.5, repeat: Infinity, times: [0, 0.4, 0.48, 0.56, 1], delay: 0.3 } : { duration: 0.3 }}
            >
              <polygon points="144,88 150,40 106,68" fill={MAROON} />
              <polygon points="138,78 141,54 117,68" fill={ROSE}   />
            </motion.g>

            {/* kepala */}
            <ellipse cx="100" cy="108" rx="52" ry="44" fill={MAROON} />

            {/* pita */}
            <g>
              <ellipse cx="86"  cy="150" rx="11" ry="6.5" fill={BLUSH} transform="rotate(-18 86 150)" />
              <ellipse cx="114" cy="150" rx="11" ry="6.5" fill={BLUSH} transform="rotate(18 114 150)" />
              <circle  cx="100" cy="151" r="5"             fill={ROSE}  />
            </g>

            {/* ===== MATA ===== */}
            {happy ? (
              /* happy: ~ ~ */
              <g fill="none" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round">
                <path d="M72 111 Q80 100 88 111" />
                <path d="M112 111 Q120 100 128 111" />
              </g>
            ) : sad ? (
              /* sad: droopy + air mata */
              <g>
                {[80, 120].map((cx) => (
                  <g key={cx}>
                    <ellipse cx={cx}  cy="108" rx="7"   ry="9"   fill={CREAM}  />
                    <ellipse cx={cx}  cy="104" rx="7.5" ry="6"   fill={MAROON} />
                    <ellipse cx={cx}  cy="110" rx="3"   ry="3.5" fill={DARK}   />
                  </g>
                ))}
                <motion.ellipse
                  cx="75" cy="122" rx="2.2" ry="3.5" fill={TEAR}
                  animate={{ cy: [122, 132, 140], opacity: [0.9, 0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <motion.ellipse
                  cx="125" cy="122" rx="2.2" ry="3.5" fill={TEAR}
                  animate={{ cy: [122, 132, 140], opacity: [0.9, 0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.9 }}
                />
              </g>
            ) : surprise ? (
              /* surprise: mata bulat besar, pupil kecil di tengah */
              <g>
                {[80, 120].map((cx) => (
                  <g key={cx}>
                    <motion.ellipse cx={cx} cy="108" rx="8" ry="10" fill={CREAM} initial={{ scale: 0.8 }} animate={{ scale: 1.1 }} transition={{ type: 'spring' }} />
                    <ellipse cx={cx} cy="108" rx="2" ry="2.5" fill={DARK} />
                  </g>
                ))}
              </g>
            ) : (
              /* idle / waiting: blink + pupil tracking cursor */
              <g>
                {[80, 120].map((cx) => (
                  <motion.g
                    key={cx}
                    style={{ originX: cx, originY: 108 }}
                    animate={{ scaleY: [1, 1, 0.08, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
                  >
                    <ellipse cx={cx} cy="108" rx="7" ry="8.5" fill={CREAM} />
                    <ellipse
                      cx={cx + pupil.x}
                      cy={108 + pupil.y}
                      rx="3.8"
                      ry="4.8"
                      fill={DARK}
                    />
                    <ellipse
                      cx={cx + pupil.x + 1.8}
                      cy={108 + pupil.y - 2}
                      rx="1.2"
                      ry="1.2"
                      fill={CREAM}
                      opacity="0.8"
                    />
                  </motion.g>
                ))}
              </g>
            )}

            {/* ===== EKSPRESI MULUT ===== */}
            <circle cx="66"  cy="122" r="7" fill={ROSE} opacity={sad ? 0.75 : surprise ? 0.9 : 0.55} />
            <circle cx="134" cy="122" r="7" fill={ROSE} opacity={sad ? 0.75 : surprise ? 0.9 : 0.55} />
            
            <path d="M96 120 L104 120 L100 125 Z" fill={BLUSH} />
            
            {sad ? (
              <path d="M93 133 Q100 127 107 133" fill="none" stroke={BLUSH} strokeWidth="2.2" strokeLinecap="round" />
            ) : surprise ? (
              <ellipse cx="100" cy="129" rx="3" ry="4" fill={BLUSH} />
            ) : waiting ? (
              <path d="M100 125 Q95 130 90 127 M100 125 Q105 130 110 127" fill="none" stroke={BLUSH} strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M100 125 Q95 132 90 128 M100 125 Q105 132 110 128" fill="none" stroke={BLUSH} strokeWidth="2" strokeLinecap="round" />
            )}

            <g stroke={ROSE} strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
              <path d="M60 118 L38 113" /><path d="M60 125 L38 129" />
              <path d="M140 118 L162 113" /><path d="M140 125 L162 129" />
            </g>

            {sad && (
              <g fill="none" stroke={ROSE} strokeWidth="2.4" strokeLinecap="round" opacity="0.65">
                <path d="M68 96 Q76 103 84 98" />
                <path d="M116 98 Q124 103 132 96" />
              </g>
            )}
            
            {/* alis surprise */}
            {surprise && (
              <g fill="none" stroke={MAROON} strokeWidth="2" strokeLinecap="round" opacity="0.4">
                <path d="M68 96 Q76 92 84 96" />
                <path d="M116 96 Q124 92 132 96" />
              </g>
            )}
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  )
}