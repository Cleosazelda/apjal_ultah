import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, Heart } from 'lucide-react'
import { birthdayData } from '../data/birthdayData'

export default function SecretSpot({ id, type = 'star', style }) {
  const [open, setOpen] = useState(false)
  const secret = birthdayData.secrets.find((s) => s.id === id)
  const Icon = type === 'heart' ? Heart : Star
  if (!secret) return null

  const toggle = () => {
    setOpen(true)
    setTimeout(() => setOpen(false), 3500)
  }

  return (
    <span style={{ position: 'absolute', zIndex: 5, ...style }}>
      <motion.button
        aria-label="sesuatu yang kecil"
        onClick={toggle}
        whileHover={{ scale: 1.5, rotate: 20 }}
        whileTap={{ scale: 0.8 }}
        style={{ color: 'var(--blush)', opacity: 0.55, display: 'block', padding: 6 }}
      >
        <Icon size={13} fill="currentColor" strokeWidth={1.5} />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.span
            className="secret-pop hand"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {secret.message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}