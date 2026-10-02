import { motion } from 'framer-motion'

const styles = {
  primary: { background: 'var(--maroon-deep)', color: 'var(--cream)', border: '1.5px solid var(--maroon-deep)' },
  ghost: { background: 'transparent', color: 'var(--maroon-deep)', border: '1.5px solid var(--maroon-soft)' },
}

export default function Button({ children, variant = 'primary', style, ...props }) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(90,38,48,0.22)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        padding: '0.85rem 1.7rem',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: '0.82rem',
        letterSpacing: '0.12em',
        ...styles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}