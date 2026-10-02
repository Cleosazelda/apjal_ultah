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
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setPicked(o)}
          >
            {o.label}
          </motion.button>
        ))}
      </div>
      <div style={{ minHeight: 28 }}>
        <AnimatePresence mode="wait">
          {picked && (
            <motion.p
              key={picked.key}
              className="hand"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {picked.reply}
            </motion.p>
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
            <span className="invite__dress hand">{d.dressCode}</span>
          </div>
        </Reveal>

        {/* outfit check: karakter maroon */}
        <Reveal delay={0.1}>
          <OutfitBuddy />
        </Reveal>

        {/* timeline */}
        <ol className="timeline">
          {d.stops.map((s, i) => (
            <Reveal key={s.id} direction={i % 2 ? 'right' : 'left'} delay={0.05}>
              <li className="stop">
                <motion.span
                  className="stop__dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                >
                  {s.emoji}
                </motion.span>

                <div className="stop__card paper">
                  <p className="eyebrow">{s.time}</p>
                  <h3 className="stop__title">{s.title}</h3>
                  {s.sub && <p className="hand stop__sub">{s.sub}</p>}
                  {s.text.map((line, k) => <p key={k} className="stop__text">{line}</p>)}
                  {s.options && <Options options={s.options} />}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}