import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { birthdayData } from '../data/birthdayData'

const meta = birthdayData.chapters[4]
const memories = birthdayData.memories
const FILTERS = ['ALL', 'DATES', 'SILLY', 'FOOD', 'FAVORITES']

function Photo({ src, caption, failed, onError }) {
  if (failed)
    return (
      <div className="memo__imgwrap memo__imgwrap--empty">
        <span>📷</span>
        <p className="memo__cap hand">{caption}</p>
      </div>
    )
  return (
    <>
      <img className="memo__img" src={src} alt={caption} onError={onError} />
      <p className="memo__cap hand">{caption}</p>
    </>
  )
}

function PolaroidCard({ mem, onClick }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.div
      className="memo__polaroid polaroid"
      style={{ rotate: mem.rotate }}
      whileHover={{ y: -10, rotate: 0, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onClick(mem)}
    >
      <Photo
        src={mem.src}
        caption={mem.caption}
        failed={failed}
        onError={() => setFailed(true)}
      />
    </motion.div>
  )
}

function Lightbox({ mem, onClose }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox__card polaroid"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {failed ? (
          <div className="lightbox__empty">📷</div>
        ) : (
          <img
            className="lightbox__img"
            src={mem.src}
            alt={mem.caption}
            onError={() => setFailed(true)}
          />
        )}
        <p className="memo__cap hand lightbox__cap">{mem.caption}</p>
      </motion.div>
      <button className="lightbox__close" onClick={onClose} aria-label="Tutup">
        <X size={22} />
      </button>
    </motion.div>
  )
}

export default function MemoriesSection() {
  const [active, setActive] = useState('ALL')
  const [open, setOpen] = useState(null)

  const filtered =
    active === 'ALL'
      ? memories
      : memories.filter((m) =>
          m.categories.includes(active.toLowerCase())
        )

  return (
    <section id={meta.id} className="section">
      <div className="container">
        <SectionHeader
          no={meta.no}
          title="Our little memories"
          sub="kita simpan di sini. ♡"
        />

        {/* Filter tabs */}
        <Reveal>
          <div className="memo__filters">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                className={`memo__filter ${active === f ? 'is-on' : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActive(f)}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Polaroid grid */}
        <motion.div
          className="memo__grid"
          layout
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((mem, i) => (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <PolaroidCard mem={mem} onClick={setOpen} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.p
            className="memo__empty hand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            belum ada foto di kategori ini...
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && <Lightbox key="lb" mem={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
