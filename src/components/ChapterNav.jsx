import { motion } from 'framer-motion'
import { birthdayData } from '../data/birthdayData'

const chapters = birthdayData.chapters

export default function ChapterNav({ active }) {
  const idx = Math.max(0, chapters.findIndex((c) => c.id === active))
  const current = chapters[idx]

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* Mobile top bar */}
      <div className="chnav-top">
        <span className="eyebrow">{current.no} · {current.title}</span>
        <div className="chnav-top__track">
          <motion.div
            className="chnav-top__fill"
            animate={{ width: `${((idx + 1) / chapters.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Desktop side dots */}
      <nav className="chnav-side" aria-label="Chapter">
        {chapters.map((c) => (
          <button key={c.id} onClick={() => go(c.id)} className="chnav-side__item" aria-label={c.title}>
            <span className="chnav-side__label">{c.no} {c.title}</span>
            <motion.span
              className="chnav-side__dot"
              animate={{
                scale: c.id === active ? 1.5 : 1,
                background: c.id === active ? '#5a2630' : '#d9aeb3',
              }}
            />
          </button>
        ))}
      </nav>
    </>
  )
}