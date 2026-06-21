import { motion } from 'framer-motion'

export function CardGrid({ items, columns = 2 }) {
  const gridClass = columns === 4 ? 'card-grid-4' : 'card-grid-2'
  return (
    <div className={`${gridClass} mb-6`}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="card reveal"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
}
