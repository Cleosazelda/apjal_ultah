// Washi tape kecil untuk menempel polaroid / card
export default function Tape({ rotate = -4, style }) {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        top: -10,
        left: '50%',
        width: 74,
        height: 22,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        background: 'rgba(217, 174, 179, 0.7)',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 6px, transparent 6px 12px)',
        boxShadow: '0 1px 3px rgba(90,38,48,0.15)',
        ...style,
      }}
    />
  )
}