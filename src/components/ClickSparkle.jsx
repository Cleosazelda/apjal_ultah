import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function ClickSparkle() {
  const [hearts, setHearts] = useState([])
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const onDown = (e) => {
      const id = Math.random()
      const h = { id, x: e.clientX, y: e.clientY, drift: (Math.random() - 0.5) * 36 }
      setHearts((a) => [...a.slice(-6), h])
      setTimeout(() => setHearts((a) => a.filter((x) => x.id !== id)), 900)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [reduce])

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 70 }}>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          style={{ position: 'absolute', left: h.x - 7, top: h.y - 7, color: 'var(--rose-dusty)' }}
          initial={{ opacity: 0.9, scale: 0.4, y: 0, x: 0 }}
          animate={{ opacity: 0, scale: 1, y: -36, x: h.drift }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <Heart size={14} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  )
}