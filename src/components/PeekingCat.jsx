import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cat from './Cat'
import { birthdayData } from '../data/birthdayData'

export default function PeekingCat({ active }) {
  const [up, setUp] = useState(false)
  const [bubble, setBubble] = useState('')
  const clicks = useRef(0)
  const timer = useRef(null)

  const say = (msg, ms = 3400) => {
    clearTimeout(timer.current)
    setBubble(msg)
    setUp(true)
    timer.current = setTimeout(() => { setBubble(''); setUp(false) }, ms)
  }

  // komentar tiap ganti chapter
  useEffect(() => {
    const tip = birthdayData.catTips?.[active]
    if (!tip) return
    const t = setTimeout(() => say(tip), 700)
    return () => clearTimeout(t)
  }, [active])

  useEffect(() => () => clearTimeout(timer.current), [])

  const poke = () => {
    clicks.current += 1
    say(clicks.current % 4 === 0 ? 'udah ih.' : 'meow.', 1800)
  }

  return (
    <div style={{ position: 'fixed', left: 10, bottom: 0, zIndex: 55, pointerEvents: 'none' }}>
      <AnimatePresence>
        {bubble && (
          <motion.span
            key={bubble}
            className="hand"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', left: 84, bottom: 66, width: 'max-content',
              maxWidth: 'min(62vw, 240px)', background: '#fffaf3', padding: '2px 14px',
              borderRadius: 16, boxShadow: 'var(--shadow-soft)', fontSize: '1.2rem', lineHeight: 1.2,
            }}
          >
            {bubble}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        style={{ pointerEvents: 'auto' }}
        animate={{ y: up ? 0 : 60 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        onHoverStart={() => setUp(true)}
        onHoverEnd={() => !bubble && setUp(false)}
      >
        <Cat size={86} mood={up ? 'happy' : 'idle'} onClick={poke} />
      </motion.div>
    </div>
  )
}