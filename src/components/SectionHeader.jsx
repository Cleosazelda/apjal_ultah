import Reveal from './Reveal'

export default function SectionHeader({ no, title, sub }) {
  return (
    <Reveal className="sechead">
      <p className="eyebrow">{no} · chapter</p>
      <h2 className="display">{title}</h2>
      {sub && <p className="hand">{sub}</p>}
    </Reveal>
  )
}