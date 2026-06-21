import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ChevronLeft, ChevronRight, Zap, CheckCircle2 } from 'lucide-react'
import { LESSON_DATA } from '../data/lessonData'

export default function FlashcardPage({ onBack }) {
  const flashcards = LESSON_DATA.flashcards
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState({})
  const [showKnown, setShowKnown] = useState(false)

  const card = flashcards[currentIndex]

  const handlePrev = () => {
    setFlipped(false)
    setCurrentIndex((i) => Math.max(0, i - 1))
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrentIndex((i) => Math.min(flashcards.length - 1, i + 1))
  }

  const handleFlip = () => setFlipped((f) => !f)

  const toggleKnown = (id) => {
    setKnown((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const reset = () => {
    setFlipped(false)
    setCurrentIndex(0)
    setKnown({})
    setShowKnown(false)
  }

  const knownCount = Object.values(known).filter(Boolean).length

  return (
    <div className="page-wrapper">
      <aside className="sidebar-nav" role="navigation" aria-label="Điều hướng bài học">
        <nav>
          <div className="nav-cluster">
            <div className="nav-cluster-label">Công cụ học tập</div>
            <button
              className="nav-item"
              onClick={onBack}
              style={{ width: '100%', textAlign: 'left' }}
            >
              <span className="nav-item-dot" />
              ← Quay lại bài học
            </button>
          </div>
        </nav>
      </aside>

      <main className="main-content" role="main">
        <div className="section-wrapper" style={{ maxWidth: 720, margin: '0 auto', paddingBottom: '2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-cluster-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Công cụ học tập
              </p>
              <h1 className="section-title" style={{ marginBottom: 0 }}>Flashcards</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {knownCount} / {flashcards.length} đã nhớ
              </span>
              <button onClick={reset} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                <RotateCcw size={14} /> Làm lại
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              height: 4,
              background: 'var(--color-border)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={false}
                animate={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  borderRadius: 2,
                }}
              />
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
              Thẻ {currentIndex + 1} / {flashcards.length}
            </p>
          </div>

          {/* Flashcard */}
          <div
            onClick={handleFlip}
            style={{
              perspective: 1000,
              marginBottom: '1.5rem',
              cursor: 'pointer',
              minHeight: 240,
            }}
          >
            <motion.div
              initial={false}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, type: 'spring', damping: 20 }}
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 240,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front */}
              <div style={{
                position: flipped ? 'hidden' : 'block',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 20,
                padding: '2rem',
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <Zap size={20} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {card.front}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1.5rem' }}>
                  Nhấp để lật
                </p>
              </div>

              {/* Back */}
              <div style={{
                position: flipped ? 'block' : 'hidden',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'var(--color-accent-50)',
                border: '1px solid var(--color-accent-100)',
                borderRadius: 20,
                padding: '2rem',
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(67,56,202,0.08)',
              }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-accent-dark)', marginBottom: '1rem' }} />
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-accent-dark)',
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}>
                  {card.back}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', marginTop: '1.5rem', opacity: 0.6 }}>
                  Nhấp để lật lại
                </p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn btn-outline"
              style={{ flex: '0 0 auto' }}
            >
              <ChevronLeft size={16} /> Trước
            </button>

            <button
              onClick={() => toggleKnown(card.id)}
              className={`btn ${known[card.id] ? 'btn-accent' : 'btn-outline'}`}
              style={{ flex: '0 0 auto', fontSize: '0.85rem' }}
            >
              <CheckCircle2 size={15} />
              {known[card.id] ? 'Đã nhớ' : 'Đánh dấu'}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="btn btn-outline"
              style={{ flex: '0 0 auto' }}
            >
              Sau <ChevronRight size={16} />
            </button>
          </div>

          {/* Card dots */}
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {flashcards.map((fc, i) => (
              <button
                key={fc.id}
                onClick={() => { setFlipped(false); setCurrentIndex(i) }}
                style={{
                  width: known[fc.id] ? 10 : 8,
                  height: known[fc.id] ? 10 : 8,
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: i === currentIndex
                    ? 'var(--color-primary)'
                    : known[fc.id]
                      ? 'var(--color-success)'
                      : 'var(--color-border-strong)',
                  transition: 'all 0.2s ease',
                  padding: 0,
                }}
                aria-label={`Thẻ ${i + 1}`}
              />
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
            Dùng phím ← → hoặc Space để điều khiển
          </p>
        </div>
      </main>
    </div>
  )
}
