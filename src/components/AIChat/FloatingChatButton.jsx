import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function FloatingChatButton({ onClick, unread = 0 }) {
  return (
    <motion.button
      className="ai-floating-btn"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 25 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Mở trợ lý AI"
      title="Trợ lý AI học tập"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <Sparkles size={20} />
      </motion.div>
      {unread > 0 && (
        <span className="ai-floating-badge">{unread}</span>
      )}
    </motion.button>
  )
}
