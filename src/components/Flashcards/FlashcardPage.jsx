import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chapterData } from '../../services/ragService'
import { generateFlashcardsFromSection } from '../../services/ragService'
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, BookOpen, Zap } from 'lucide-react'

// Build flashcards from all sections
function buildAllFlashcards() {
  const all = []
  for (const section of chapterData.sections) {
    const cards = generateFlashcardsFromSection(section.id)
    if (cards) all.push(...cards)
  }
  // Add some summary cards
  all.push(
    {
      front: 'Công thức chung của tư bản?',
      back: 'T — H — T\'. Tiền → Mua hàng hóa → Tiền nhiều hơn (T\'). Phần chênh lệch ΔT = Giá trị thặng dư.',
      sectionId: 'formula',
    },
    {
      front: 'Đặc điểm của hàng hóa sức lao động?',
      back: '1) Giá trị = lượng LĐ xã hội cần thiết SX và tái SX sức lao động. 2) Giá trị sử dụng đặc biệt: tạo giá trị mới > giá trị của chính nó.',
      sectionId: 'labor',
    },
    {
      front: 'Hai điều kiện để sức lao động thành hàng hóa?',
      back: '1) Người lao động tự do về thân thể. 2) Không có tư liệu sản xuất, buộc phải bán sức lao động để sinh sống.',
      sectionId: 'labor',
    },
    {
      front: 'Tư bản bất biến (c) vs Tư bản khả biến (v)?',
      back: 'c: mua TLSX, chuyển giá trị cũ, không tạo GTD. v: mua sức lao động, tạo GTD (nguồn gốc trực tiếp).',
      sectionId: 'capital',
    },
    {
      front: 'Tiền công trong CNTB là gì?',
      back: 'Giá cả của hàng hóa sức lao động. Bề ngoài: nhà tư bản trả công cho toàn bộ lao động. Thực chất: chỉ tương ứng giá trị sức lao động. Phần dôi ra = GTD.',
      sectionId: 'salary',
    },
    {
      front: 'Tỷ suất GTD (m\') = ?',
      back: 'm\' = m/v × 100% = thời gian lao động thặng dư / thời gian lao động tất yếu × 100%. Ví dụ: 4h + 4h → m\' = 100%.',
      sectionId: 'rate-mass',
    },
    {
      front: 'Khối lượng GTD (M) = ?',
      back: 'M = m\' × V (Tỷ suất GTD × Tổng tư bản khả biến). Phản ánh quy mô tuyệt đối GTD thu được.',
      sectionId: 'rate-mass',
    },
    {
      front: 'Ba phương pháp sản xuất GTD?',
      back: '1) GTD tuyệt đối: kéo dài ngày lao động. 2) GTD tương đối: tăng năng suất rút ngắn thời gian lao động tất yếu. 3) GTD siêu ngạch: cải tiến kỹ thuật trước, GT cá biệt < GT xã hội.',
      sectionId: 'methods',
    },
  )
  return all
}

const ALL_CARDS = buildAllFlashcards()

export default function FlashcardPage() {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shuffled, setShuffled] = useState(false)
  const [cards, setCards] = useState(ALL_CARDS)

  const handlePrev = () => {
    setFlipped(false)
    setCurrent(c => (c - 1 + cards.length) % cards.length)
  }
  const handleNext = () => {
    setFlipped(false)
    setCurrent(c => (c + 1) % cards.length)
  }
  const handleFlip = () => setFlipped(f => !f)
  const handleShuffle = () => {
    setFlipped(false)
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrent(0)
    setShuffled(true)
  }
  const handleReset = () => {
    setFlipped(false)
    setCards(ALL_CARDS)
    setCurrent(0)
    setShuffled(false)
  }

  const card = cards[current]

  return (
    <div className="page-wrapper">
      <aside className="sidebar-nav" role="navigation">
        <nav>
          <div className="nav-cluster">
            <div className="nav-cluster-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              Flashcards
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {cards.length} thẻ học từ toàn bộ nội dung Chương {chapterData.chapterNumber}.
              Nhấp để lật thẻ.
            </p>
          </div>
        </nav>
      </aside>

      <main className="main-content" role="main">
        <div className="hero-section" style={{ padding: '2rem 3rem' }}>
          <h1 className="chapter-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Flashcards — {chapterData.chapterTitle}
          </h1>
          <p className="chapter-subtitle">
            Học và ghi nhớ các khái niệm quan trọng bằng thẻ học thông minh.
          </p>
        </div>

        <div className="flashcard-page-container">
          <div className="flashcard-progress">
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Thẻ {current + 1} / {cards.length}
            </span>
            <div className="flashcard-progress-bar">
              <div
                className="flashcard-progress-fill"
                style={{ width: `${((current + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flashcard-center">
            <motion.div
              className={`flashcard ${flipped ? 'flipped' : ''}`}
              onClick={handleFlip}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {!flipped ? (
                  <motion.div
                    key="front"
                    className="flashcard-face flashcard-front"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flashcard-label-top">
                      <BookOpen size={14} />
                      Câu hỏi
                    </div>
                    <p className="flashcard-text">{card.front}</p>
                    <p className="flashcard-hint">Nhấn để xem đáp án</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="flashcard-face flashcard-back"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flashcard-label-top">
                      <Zap size={14} />
                      Đáp án
                    </div>
                    <p className="flashcard-text">{card.back}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="flashcard-controls">
            <button className="btn btn-outline" onClick={handleReset}>
              <RotateCcw size={15} />
              Reset
            </button>
            <div className="flashcard-nav-btns">
              <button className="btn btn-outline flashcard-nav-btn" onClick={handlePrev}>
                <ChevronLeft size={18} />
              </button>
              <button className="btn btn-primary flashcard-nav-btn" onClick={handleNext}>
                <ChevronRight size={18} />
              </button>
            </div>
            <button className="btn btn-outline" onClick={handleShuffle}>
              <Shuffle size={15} />
              Xáo trộn
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
