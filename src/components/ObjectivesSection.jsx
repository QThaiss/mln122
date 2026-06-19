import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const GOALS = [
  'Hiểu được công thức chung của tư bản.',
  'Giải thích vì sao tiền có thể chuyển hóa thành tư bản.',
  'Trình bày được vai trò đặc biệt của hàng hóa sức lao động.',
  'Phân tích được quá trình sản xuất giá trị thặng dư.',
  'Phân biệt tư bản bất biến và tư bản khả biến.',
  'Hiểu được bản chất của tiền công trong chủ nghĩa tư bản.',
  'Tính và giải thích được tỷ suất, khối lượng giá trị thặng dư.',
  'Phân biệt giá trị thặng dư tuyệt đối, tương đối và siêu ngạch.',
]

export default function ObjectivesSection() {
  return (
    <section id="objectives" className="section-wrapper" aria-labelledby="objectives-title">
      <div className="max-w-3xl">
        <p className="section-cluster-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Cụm 1 — Tổng quan
        </p>

        <motion.h2
          id="objectives-title"
          className="section-title reveal"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Mục tiêu bài học
        </motion.h2>

        <p className="section-lead reveal">
          Sau khi học xong phần này, bạn sẽ:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOALS.map((goal, i) => (
            <motion.div
              key={i}
              className="goal-item reveal"
              initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <div className="goal-check" aria-hidden="true">
                <CheckCircle2 size={13} strokeWidth={2.5} />
              </div>
              <span>{goal}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
