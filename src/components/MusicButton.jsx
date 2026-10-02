import { useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { birthdayData } from '../data/birthdayData'

export default function MusicButton() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = async () => {
    const a = audio.current
    if (!a) return
    try {
      if (playing) { a.pause(); setPlaying(false) }
      else { a.volume = 0.5; await a.play(); setPlaying(true) }
    } catch {
      setPlaying(false) // file belum ada / browser menolak
    }
  }

  return (
    <>
      <audio ref={audio} src={birthdayData.music.src} loop preload="none" />
      <motion.button
        className="music-btn"
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
      >
        {playing ? <Music size={18} /> : <VolumeX size={18} />}
        <motion.span
          className="music-btn__ring"
          animate={playing ? { scale: [1, 1.5], opacity: [0.5, 0] } : { opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.button>
    </>
  )
}