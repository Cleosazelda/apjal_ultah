import { motion, useReducedMotion } from 'framer-motion'

const petals = Array.from({ length: 9 }, (_, i) => ({
  left: (i * 11 + 7) % 100,
  size: 9 + (i % 3) * 3,
  dur: 16 + (i % 4) * 4,
  delay: i * 1.8,
  sway: 26 + (i % 3) * 14,
  color: i % 2 ? '#d9aeb3' : '#b98289',
}))

export default function AmbientPetals() {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 45, overflow: 'hidden' }}>
      {petals.map((p, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute', left: `${p.left}%`, top: -24,
            width: p.size * 0.7, height: p.size,
            background: p.color, opacity: 0.38, borderRadius: '80% 0 80% 0',
          }}
          animate={{
            y: ['0vh', '108vh'],
            x: [0, p.sway, -p.sway, 0],
            rotate: [0, 160, 320, 480],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}