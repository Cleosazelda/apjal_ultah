import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Entrance from './sections/Entrance'
import MainSite from './sections/MainSite'

// Tambahkan ?skip di URL (mis. localhost:5173/?skip) untuk lompat langsung ke website utama saat development.
const devSkip = new URLSearchParams(window.location.search).has('skip')

export default function App() {
  const [unlocked, setUnlocked] = useState(devSkip)

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="entrance" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <Entrance onEnter={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MainSite onReplay={() => setUnlocked(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}