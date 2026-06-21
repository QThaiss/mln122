import { motion } from 'framer-motion'

export function Card({ children, className = '', accent = false, primary = false, ...props }) {
  let cls = `card ${className}`
  if (primary) cls += ' card-primary'
  if (accent) cls += ' card-accent'
  return (
    <motion.div
      className={cls}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
