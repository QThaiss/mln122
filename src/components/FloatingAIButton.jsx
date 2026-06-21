import { motion } from 'framer-motion'
import { Bot, X } from 'lucide-react'

export default function FloatingAIButton({ onClick, isOpen }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
      aria-label={isOpen ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: isOpen ? '32rem' : '2rem',
        width: 56,
        height: 56,
        borderRadius: 16,
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(13,148,136,0.35)',
        zIndex: 199,
        transition: 'right 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease',
      }}
      whileHover={{ scale: 1.08, boxShadow: '0 6px 28px rgba(13,148,136,0.5)' }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <X size={22} /> : <Bot size={22} />}

      {/* Pulse ring */}
      {!isOpen && (
        <motion.span
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            border: '2px solid var(--color-primary)',
          }}
        />
      )}
    </motion.button>
  )
}
