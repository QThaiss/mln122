import { useState } from 'react'
import { motion } from 'framer-motion'
import { chapterData } from '../../services/ragService'
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react'

export default function QuizPage() {
  const questions = chapterData.quiz
  const [selected, setSelected] = useState({})
  const [answered, setAnswered] = useState({})
  const [score, setScore] = useState(null)

  const handleSelect = (qId, optId) => {
    if (answered[qId]) return
    setSelected(p => ({ ...p, [qId]: optId }))
  }
  const handleSubmit = (qId) => {
    if (!selected[qId]) return
    setAnswered(p => ({ ...p, [qId]: true }))
  }
  const handleScore = () => {
    let correct = 0
    questions.forEach(q => { if (selected[q.id] === q.correct) correct++ })
    setScore(correct)
  }
  const handleReset = () => {
    setSelected({})
    setAnswered({})
    setScore(null)
  }

  return (
    <div className="page-wrapper">
      <aside className="sidebar-nav" role="navigation">
        <nav>
          <div className="nav-cluster">
            <div className="nav-cluster-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Quiz
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {questions.length} câu trắc nghiệm ôn tập toàn bộ Chương {chapterData.chapterNumber}.
            </p>
          </div>
        </nav>
      </aside>

      <main className="main-content" role="main">
        <div className="hero-section" style={{ padding: '2rem 3rem' }}>
          <h1 className="chapter-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Quiz ôn tập — {chapterData.chapterTitle}
          </h1>
          <p className="chapter-subtitle">
            Kiểm tra kiến thức với {questions.length} câu hỏi trắc nghiệm.
          </p>
        </div>

        <div style={{ padding: '2rem 3rem', maxWidth: '800px' }}>
          {score !== null && (
            <motion.div
              className="card text-center mb-6 reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Award size={36} style={{ color: 'var(--color-primary)', margin: '0 auto 0.75rem' }} />
              <p className="font-mono text-xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                {score} / {questions.length}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {score === questions.length ? 'Xuất sắc! Bạn nắm vững toàn bộ nội dung.' :
                 score >= 6 ? 'Tốt lắm! Hiểu rõ phần lớn nội dung.' :
                 'Cần ôn lại thêm. Hãy xem lại các phần chưa nắm vững.'}
              </p>
              <button onClick={handleReset} className="btn btn-outline text-sm">
                <RotateCcw size={14} />
                Làm lại
              </button>
            </motion.div>
          )}

          {questions.map(q => {
            const isSel = selected[q.id]
            const isAns = answered[q.id]
            return (
              <motion.div
                key={q.id}
                className="quiz-card reveal"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="quiz-badge">{q.id}</span>
                  <p className="quiz-question-text">{q.question}</p>
                </div>
                <div className="space-y-2">
                  {q.options.map(opt => {
                    let cls = 'quiz-option'
                    if (isAns) {
                      if (opt.id === q.correct) cls += ' quiz-correct'
                      else if (isSel === opt.id) cls += ' quiz-wrong'
                    } else if (isSel === opt.id) cls += ' quiz-selected'
                    return (
                      <div
                        key={opt.id}
                        className={cls}
                        onClick={() => handleSelect(q.id, opt.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && handleSelect(q.id, opt.id)}
                      >
                        <span className="quiz-badge" aria-hidden="true">{opt.id}</span>
                        <span>{opt.text}</span>
                        {isAns && opt.id === q.correct && <CheckCircle size={15} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                        {isAns && isSel === opt.id && opt.id !== q.correct && <XCircle size={15} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
                      </div>
                    )
                  })}
                </div>
                {!answered[q.id] && selected[q.id] && (
                  <button onClick={() => handleSubmit(q.id)} className="btn btn-outline text-sm mt-3">
                    Xác nhận
                  </button>
                )}
                {isAns && (
                  <div className={`quiz-feedback ${isSel === q.correct ? 'correct' : 'wrong'}`}>
                    <strong>{isSel === q.correct ? 'Chính xác!' : 'Chưa đúng.'}</strong> {q.explanation}
                  </div>
                )}
              </motion.div>
            )
          })}

          {score === null && Object.keys(selected).length > 0 && (
            <div className="text-center mt-6">
              <button onClick={handleScore} className="btn btn-primary">
                Xem kết quả
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
