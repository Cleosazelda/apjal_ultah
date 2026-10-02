import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'

const COLORS = ['#5a2630', '#7a3b46', '#b98289', '#d9aeb3', '#e9ddd2']
const rand = (a, b) => a + Math.random() * (b - a)

function make(count, kinds) {
  const stamp = Date.now()
  return Array.from({ length: count }, (_, i) => ({
    id: `${stamp}-${i}`,
    kind: kinds[i % kinds.length],
    x: rand(-170, 170),
    y: rand(-250, -60),
    fall: rand(80, 240),
    rot: rand(-360, 360),
    size: rand(10, 20),
    color: COLORS[Math.floor(rand(0, COLORS.length))],
    dur: rand(1.4, 2.4),
    delay: rand(0, 0.15),
  }))
}

function Piece({ kind, size, color }) {
  if (kind === 'heart') return <Heart size={size} fill={color} color={color} />
  if (kind === 'star') return <Star size={size} fill={color} color={color} />
  if (kind === 'sparkle') return <Sparkles size={size} color={color} />
  if (kind === 'petal')
    return <span style={{ display: 'block', width: size * 0.7, height: size, background: color, borderRadius: '80% 0 80% 0' }} />
  return <span style={{ display: 'block', width: size * 0.5, height: size * 0.8, background: color, borderRadius: 2 }} />
}

export default function Burst({ fire = 0, count = 36, kinds = ['heart', 'petal', 'star', 'confetti'], style }) {
  const [parts, setParts] = useState([])

  useEffect(() => {
    if (!fire) return
    setParts(make(count, kinds))
    const t = setTimeout(() => setParts([]), 2800)
    return () => clearTimeout(t)
  }, [fire])

  return (
    <div aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', pointerEvents: 'none', zIndex: 30, ...style }}>
      {parts.map((p) => (
        <motion.span
          key={p.id}
          style={{ position: 'absolute', left: 0, top: 0 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, p.x, p.x * 1.15],
            y: [0, p.y, p.y + p.fall],
            rotate: [0, p.rot / 2, p.rot],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, times: [0, 0.45, 1], ease: 'easeOut' }}
        >
          <Piece kind={p.kind} size={p.size} color={p.color} />
        </motion.span>
      ))}
    </div>
  )
}