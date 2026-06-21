import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, BookOpen, HelpCircle, Zap, GraduationCap } from 'lucide-react'
import { askAI } from '../services/aiService'

const TOOLS = [
  {
    id: 'quiz',
    label: 'Tạo Quiz mới',
    icon: <Sparkles size={20} />,
    color: 'var(--color-primary)',
    bgColor: 'var(--color-primary-50)',
    borderColor: 'var(--color-primary-100)',
    description: 'Tạo câu hỏi trắc nghiệm mới dựa trên nội dung bài học',
    prompt: 'Tạo 5 câu hỏi trắc nghiệm mới (khác với 8 câu hiện có) về Chương 3.1. Mỗi câu có 4 lựa chọn A-D, chỉ rõ đáp án đúng và giải thích ngắn.',
  },
  {
    id: 'summary',
    label: 'Tóm tắt chương',
    icon: <BookOpen size={20} />,
    color: 'var(--color-accent)',
    bgColor: 'var(--color-accent-50)',
    borderColor: 'var(--color-accent-100)',
    description: 'Tóm tắt toàn bộ nội dung Chương 3.1 bằng tiếng Việt',
    prompt: 'Tóm tắt toàn bộ nội dung Chương 3.1: Lý luận của C. Mác về giá trị thặng dư. Gồm: công thức T-H-T\', hàng hóa sức lao động, quá trình sản xuất GTD, tư bản c/v, tỷ suất & khối lượng GTD, các phương pháp SX GTD.',
  },
  {
    id: 'concept',
    label: 'Giải thích khái niệm',
    icon: <HelpCircle size={20} />,
    color: 'var(--color-success)',
    bgColor: '#d1fae5',
    borderColor: '#6ee7b7',
    description: 'Giải thích chi tiết một khái niệm bất kỳ trong bài học',
    prompt: 'Chọn một khái niệm quan trọng (GTD tuyệt đối, GTD tương đối, GTD siêu ngạch, tư bản bất biến, tư bản khả biến, hàng hóa sức lao động, v.v.) và giải thích chi tiết kèm ví dụ cụ thể.',
  },
  {
    id: 'assignment',
    label: 'Hướng dẫn bài tập',
    icon: <GraduationCap size={20} />,
    color: 'var(--color-warning)',
    bgColor: '#fef3c7',
    borderColor: '#fde68a',
    description: 'Hướng dẫn trả lời các câu hỏi và bài tập ôn tập',
    prompt: 'Hướng dẫn trả lời câu hỏi/bài tập về Chương 3.1. Trình bày rõ ràng, có cấu trúc: 1) Phân tích đề bài, 2) Nội dung kiến thức liên quan, 3) Phương pháp trả lời, 4) Ví dụ minh họa.',
  },
]

export default function AIToolsPage({ onBack }) {
  const [selectedTool, setSelectedTool] = useState(null)
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async (tool) => {
    setSelectedTool(tool)
    setResponse(null)
    setIsLoading(true)

    try {
      const result = await askAI(tool.prompt)
      setResponse(result)
    } catch (err) {
      setResponse('Đã xảy ra lỗi khi tạo nội dung. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedTool(null)
    setResponse(null)
  }

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
        <div className="section-wrapper" style={{ maxWidth: 800, margin: '0 auto', paddingBottom: '2rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <p className="section-cluster-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Công cụ học tập
            </p>
            <h1 className="section-title">Công cụ AI</h1>
            <p className="section-lead">Sử dụng AI để tạo quiz, tóm tắt, giải thích khái niệm và hướng dẫn bài tập từ nội dung bài học.</p>
          </div>

          {!response ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                {TOOLS.map((tool) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => handleGenerate(tool)}
                    className="card"
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: tool.bgColor,
                      borderColor: tool.borderColor,
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      padding: '1.25rem',
                      border: `1px solid ${tool.borderColor}`,
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: tool.bgColor,
                      border: `1px solid ${tool.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: tool.color,
                    }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: tool.color,
                        marginBottom: '0.35rem',
                      }}>
                        {tool.label}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {tool.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    padding: '3rem 2rem',
                    background: 'var(--color-bg-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 16,
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '3px solid var(--color-border)',
                    borderTopColor: 'var(--color-primary)',
                    margin: '0 auto 1rem',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    AI đang xử lý...
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: '1.5rem',
                marginBottom: '1.5rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                color: 'var(--color-text-primary)',
              }}>
                {response}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={handleReset} className="btn btn-outline">
                  <ArrowLeft size={15} /> Chọn công cụ khác
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(response).catch(() => {})
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Sao chép
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
