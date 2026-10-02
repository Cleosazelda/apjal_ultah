import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import Tape from '../components/Tape'
import { birthdayData } from '../data/birthdayData'

const meta = birthdayData.chapters[1]
const tilts = [-2.5, 1.5, -1.5]

function Photo({ src, emoji }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="photo photo--empty">{emoji}</div>
  return <img className="photo" src={src} alt="" onError={() => setFailed(true)} />
}

function HappyCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)
  const [egg, setEgg] = useState('')

  const poke = (e) => {
    e.stopPropagation()
    if (!card.easterEgg) return
    setEgg(card.easterEgg)
    setTimeout(() => setEgg(''), 2600)
  }

  return (
    <Reveal delay={index * 0.15}>
      <motion.div
        className="flip"
        style={{ rotate: tilts[index] }}
        whileHover={{ y: -8, rotate: 0 }}
        onClick={() => setFlipped((f) => !f)}
      >
        <Tape rotate={index % 2 ? 4 : -4} />

        <motion.div
          className="flip__inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* DEPAN */}
          <div className="flip__face polaroid">
            <Photo src={card.photo} emoji={card.emoji} />
            <p className="eyebrow" style={{ marginTop: 12 }}>{card.no}</p>
            <h3 className="flip__title">{card.title}</h3>
            <span className="flip__hint">ketuk untuk buka ↻</span>
          </div>

          {/* BELAKANG */}
          <div className="flip__face flip__back paper">
            {card.lines.map((l, i) => <p key={i} className="flip__line">{l}</p>)}
            {card.joke && (
              <p className="hand flip__joke">
                {card.joke}
                <br /><small>{card.jokeBy}</small>
              </p>
            )}
          </div>
        </motion.div>

        {/* emoji = easter egg */}
        <button className="flip__emoji" onClick={poke} aria-label="emoji">{card.emoji}</button>
        <AnimatePresence>
          {egg && (
            <motion.span
              className="secret-pop hand"
              style={{ bottom: -4, right: 8 }}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {egg}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  )
}

export default function HappySection() {
  return (
    <section id={meta.id} className="section section--alt">
      <div className="container">
        <SectionHeader no={meta.no} title="Things that make Afzaal happy" sub="tiga hal (yang aku tau) ♡" />
        <div className="cards">
          {birthdayData.happyCards.map((c, i) => (
            <HappyCard key={c.id} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}