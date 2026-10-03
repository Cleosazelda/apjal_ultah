import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import Tape from '../components/Tape'
import OutfitBuddy from '../components/OutfitBuddy'
import { birthdayData } from '../data/birthdayData'

const meta = birthdayData.chapters[3]
const d = birthdayData.date

function Options({ options }) {
  const [picked, setPicked] = useState(null)
  return (
    <div className="opts">
      <div className="opts__row">
        {options.map((o) => (
          <motion.button
            key={o.key}
            className={`opts__btn ${picked?.key === o.key ? 'is-on' : ''}`}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setPicked(o)}
          >
            {o.label}
          </motion.button>
        ))}
      </div>
      <div style={{ minHeight: 28, marginTop: '8px' }}>
        <AnimatePresence mode="wait">
          {picked && (
            <motion.div
              key={picked.key}
              className="opts__reply paper"
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <p className="hand">{picked.reply}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function DateSection() {
  return (
    <section id={meta.id} className="section section--alt">
      <div className="container container--narrow">
        <SectionHeader no={meta.no} title={d.title} />

        {/* undangan */}
        <Reveal>
          <div className="invite paper">
            <Tape />
            <p className="eyebrow">you're invited</p>
            <p className="display invite__date">{d.dateLabel}</p>
            {/* Added invite__dress--bright class to override color */}
            <motion.span 
               className="invite__dress invite__dress--bright hand"
               whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
              {d.dressCode}
            </motion.span>
          </div>
        </Reveal>

        {/* outfit check: karakter maroon */}
        <Reveal delay={0.1}>
          <OutfitBuddy />
        </Reveal>

        {/* timeline lucu */}
        <div className="timeline-wrap">
          <p className="hand timeline__header">Rundown Date Kita ✨</p>
          <div className="timeline">
            {d.stops.map((s, i) => (
              <Reveal key={s.id} direction={i % 2 === 0 ? 'right' : 'left'} delay={0.1}>
                <div className="stop">
                  <motion.div
                    className="stop__dot shadow-soft"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                  >
                    {s.emoji}
                  </motion.div>

                  <motion.div 
                    className={`stop__card paper ${i % 2 === 0 ? 'stop__card--right' : 'stop__card--left'}`}
                    whileHover={{ y: -4 }}
                  >
                    {/* Cute sticker on card */}
                    <span className="stop__sticker">{i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '🌸'}</span>
                    
                    <p className="eyebrow">{s.time}</p>
                    <h3 className="stop__title">{s.title}</h3>
                    {s.sub && <p className="hand stop__sub">{s.sub}</p>}
                    
                    <div className="stop__text-wrap">
                      {s.text.map((line, k) => <p key={k} className="stop__text">{line}</p>)}
                    </div>

                    {s.options && <Options options={s.options} />}
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}