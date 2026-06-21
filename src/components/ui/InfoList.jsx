import { motion } from 'framer-motion'

export function InfoList({ items }) {
  return (
    <div className="info-list mb-6">
      {items.map((item, i) => {
        const isHighlight = typeof item === 'object' ? item.highlight : false
        const text = typeof item === 'object' ? item.text : item
        const num = typeof item === 'object' ? item.num : i + 1
        return (
          <motion.div
            key={i}
            className={`info-list-item reveal ${isHighlight ? 'card-accent' : ''}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: num * 0.06 }}
          >
            <div className="info-list-item-icon" aria-hidden="true">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>
                {num}
              </span>
            </div>
            <span style={isHighlight ? { fontWeight: 600, color: 'var(--color-accent-dark)' } : {}}>
              {text}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
