import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Sparkles, Loader2, BookOpen, HelpCircle, Zap, GraduationCap } from 'lucide-react'
import { askAI } from '../services/aiService'

const QUICK_ACTIONS = [
  { label: 'Tóm tắt bài', icon: <BookOpen size={14} />, prompt: 'Tóm tắt nội dung bài học Chương 3.1' },
  { label: 'Giải thích khái niệm', icon: <HelpCircle size={14} />, prompt: 'Giải thích khái niệm giá trị thặng dư' },
  { label: 'Tạo câu hỏi', icon: <Sparkles size={14} />, prompt: 'Tạo 3 câu hỏi trắc nghiệm mới' },
  { label: 'Hướng dẫn bài tập', icon: <GraduationCap size={14} />, prompt: 'Hướng dẫn trả lời bài tập về công thức T-H-T\'' },
]

function ChatMessage({ role, content }) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}
    >
      {!isUser && (
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Bot size={16} color="white" />
        </div>
      )}
      <div
        style={{
          maxWidth: '80%',
          padding: '0.75rem 1rem',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? 'var(--color-primary)' : 'var(--color-bg-muted)',
          color: isUser ? 'white' : 'var(--color-text-primary)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          border: isUser ? 'none' : '1px solid var(--color-border)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {content}
      </div>
      {isUser && (
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: 'var(--color-bg-muted)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <User size={16} style={{ color: 'var(--color-text-secondary)' }} />
        </div>
      )}
    </motion.div>
  )
}

export default function ChatDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI học tập Chương 3.1. Tôi có thể giúp bạn:\n\n• Tóm tắt nội dung bài học\n• Giải thích khái niệm\n• Tạo câu hỏi trắc nghiệm\n• Hướng dẫn bài tập\n\nHãy đặt câu hỏi về lý luận giá trị thặng dư!',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const query = (text || input).trim()
    if (!query || isLoading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: query }])
    setIsLoading(true)

    try {
      const response = await askAI(query)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Xin lỗi, đã xảy ra lỗi khi xử lý câu hỏi. Vui lòng thử lại.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 200,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(480px, 100vw)',
              background: 'var(--color-bg-surface)',
              borderLeft: '1px solid var(--color-border)',
              zIndex: 201,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-bg-surface)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Bot size={20} color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                    AI Học tập
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    Trợ lý Chương 3.1 — Giá trị thặng dư
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="btn btn-outline"
                style={{ padding: '0.4rem' }}
                aria-label="Đóng chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.prompt)}
                  className="btn btn-outline"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Bot size={16} color="white" />
                  </div>
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--color-bg-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '16px 16px 16px 4px',
                    display: 'flex',
                    gap: '0.35rem',
                    alignItems: 'center',
                  }}>
                    <Loader2 size={16} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Đang xử lý...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '1rem 1.25rem',
              borderTop: '1px solid var(--color-border)',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'flex-end',
              }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Hỏi về nội dung bài học..."
                  rows={1}
                  style={{
                    flex: 1,
                    padding: '0.65rem 1rem',
                    borderRadius: 12,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-muted)',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    resize: 'none',
                    outline: 'none',
                    lineHeight: 1.5,
                    maxHeight: 120,
                    overflowY: 'auto',
                    transition: 'border-color 0.15s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem', flexShrink: 0 }}
                  aria-label="Gửi tin nhắn"
                >
                  <Send size={16} />
                </button>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                Trả lời dựa trên nội dung bài học. Thêm API key trong .env để dùng GPT.
              </p>
            </div>
          </motion.div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
}
