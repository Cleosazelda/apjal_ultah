import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'

const items = [
  { Icon: Heart, x: '8%', y: '14%', size: 16, d: 0 },
  { Icon: Star, x: '86%', y: '10%', size: 14, d: 1.2 },
  { Icon: Sparkles, x: '14%', y: '78%', size: 18, d: 0.6 },
  { Icon: Heart, x: '90%', y: '72%', size: 14, d: 1.8 },
  { Icon: Star, x: '48%', y: '6%', size: 12, d: 2.4 },
]

// Dekorasi subtle yang melayang pelan. Taruh di dalam parent position: relative.
export default function FloatingDecor() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {items.map(({ Icon, x, y, size, d }, i) => (
        <motion.span
          key={i}
          style={{ position: 'absolute', left: x, top: y, color: 'var(--blush)' }}
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: d }}
        >
          <Icon size={size} fill="currentColor" strokeWidth={1.5} />
        </motion.span>
      ))}
    </div>
  )
}