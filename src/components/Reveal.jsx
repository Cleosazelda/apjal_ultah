import { motion } from 'framer-motion'

// Fade + slide saat masuk layar. direction: 'up' | 'left' | 'right'
export default function Reveal({ children, delay = 0, direction = 'up', style, className }) {
  const from = {
    up: { y: 28, x: 0 },
    left: { x: -28, y: 0 },
    right: { x: 28, y: 0 },
  }[direction]

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}