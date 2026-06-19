import { motion } from 'framer-motion'

export default function HeroSection({ onStart }) {
  return (
    <section
      id="hero"
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="chapter-badge">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Kinh tế Chính trị Mác - Lênin
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          className="chapter-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Chương 3.1
        </motion.h1>

        <motion.h2
          className="chapter-title"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          Lý luận của C. Mác về giá trị thặng dư
        </motion.h2>

        <motion.p
          className="chapter-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          Nguồn gốc, bản chất và phương pháp sản xuất giá trị thặng dư trong nền kinh tế thị trường tư bản chủ nghĩa.
        </motion.p>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-value">8</span>
            <span className="hero-stat-label">Mục tiêu học tập</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">5</span>
            <span className="hero-stat-label">Công thức cần nhớ</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">8</span>
            <span className="hero-stat-label">Câu hỏi quiz</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">8</span>
            <span className="hero-stat-label">Phần thuyết trình</span>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-3 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <button
            className="btn btn-primary"
            onClick={onStart}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Bắt đầu học
          </button>
          <a
            href="#formula"
            className="btn btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById('formula')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Xem công thức
          </a>
          <a
            href="#quiz"
            className="btn btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Làm quiz
          </a>
        </motion.div>
      </div>
    </section>
  )
}
