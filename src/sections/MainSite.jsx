import ChapterNav from '../components/ChapterNav'
import MusicButton from '../components/MusicButton'
import ClickSparkle from '../components/ClickSparkle'
import AmbientPetals from '../components/AmbientPetals'
import PeekingCat from '../components/PeekingCat'
import NoteSection from './NoteSection'
import HappySection from './HappySection'
import WishesSection from './WishesSection'
import DateSection from './DateSection'
import MemoriesSection from './MemoriesSection'
import HeartSection from './HeartSection'
import BirthdaySection from './BirthdaySection'
import useActiveChapter from '../hooks/useActiveChapter'
import { birthdayData } from '../data/birthdayData'
import '../styles/sections.css'

const ids = birthdayData.chapters.map((c) => c.id)

export default function MainSite({ onReplay }) {
  const active = useActiveChapter(ids)

  return (
    <main>
      <AmbientPetals />
      <ClickSparkle />
      <ChapterNav active={active} />
      <MusicButton />
      <PeekingCat active={active} />

      <NoteSection />
      <HappySection />
      <WishesSection />
      <DateSection />
      <MemoriesSection />
      <HeartSection />
      <BirthdaySection />
      
      {onReplay && (
        <div style={{ textAlign: 'center', padding: '2rem', paddingBottom: '6rem' }}>
          <button 
            onClick={onReplay}
            className="hand"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--maroon-soft)',
              fontSize: '1rem',
              cursor: 'pointer',
              opacity: 0.7,
              textDecoration: 'underline'
            }}
          >
            replay opening 🐈
          </button>
        </div>
      )}
    </main>
  )
}