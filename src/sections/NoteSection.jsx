import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Tape from '../components/Tape'
import SecretSpot from '../components/SecretSpot'
import { birthdayData } from '../data/birthdayData'

const { lines, signature } = birthdayData.note
const meta = birthdayData.chapters[0]

export default function NoteSection() {
  return (
    <section id={meta.id} className="section">
      <div className="container">
        <SectionHeader no={meta.no} title="A little note" />

        <motion.article
          className="diary paper"
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <Tape />
          <SecretSpot id="star1" type="star" style={{ top: 14, right: 18 }} />

          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Dear {birthdayData.name},
          </p>

          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={i === 0 ? 'diary__lead display' : 'diary__line'}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.7, duration: 0.8 }}
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            className="hand diary__sign"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + lines.length * 0.7, duration: 1 }}
          >
            {signature}
          </motion.p>
        </motion.article>
      </div>
    </section>
  )
}