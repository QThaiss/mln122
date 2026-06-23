import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, Bot, Sparkles, BookOpen, HelpCircle,
  Lightbulb, GraduationCap, PlusCircle, ArrowLeft,
} from 'lucide-react'

const SUGGESTIONS = [
  {
    icon: <BookOpen size={15} />,
    label: 'Tóm tắt bài học',
    prompt: 'Tóm tắt nội dung Chương 3.1: Lý luận của C. Mác về giá trị thặng dư.',
  },
  {
    icon: <HelpCircle size={15} />,
    label: 'Giải thích khái niệm',
    prompt: 'Giải thích khái niệm giá trị thặng dư (surplus value) bằng ngôn ngữ dễ hiểu.',
  },
  {
    icon: <Lightbulb size={15} />,
    label: 'So sánh c/v',
    prompt: 'So sánh tư bản bất biến (c) và tư bản khả biến (v).',
  },
  {
    icon: <GraduationCap size={15} />,
    label: 'Công thức & Quiz',
    prompt: 'Liệt kê tất cả các công thức quan trọng trong Chương 3.1 và cho ví dụ.',
  },
]

// ── Loading indicator dot keyframes (inline so Tailwind can compile it) ──
const DOT_ANIM = {
  animation: 'chatDots 1.2s infinite',
}

export default function AIChatDrawer({
  isOpen, onClose, messages, onSend, isLoading, onNewChat, proxyError,
}) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // When drawer opens fresh, show suggestions if no messages
  useEffect(() => {
    if (isOpen) {
      setShowSuggestions(messages.length === 0)
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && bottomRef.current) {
      const t = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 50)
      return () => clearTimeout(t)
    }
  }, [messages, isOpen])

  const handleSend = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    setShowSuggestions(false)
    setInput('')
    onSend(trimmed)
  }, [input, isLoading, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestion = (prompt) => {
    setShowSuggestions(false)
    onSend(prompt)
  }

  const handleNewChat = () => {
    setShowSuggestions(true)
    setInput('')
    onNewChat()
  }

  const handleBack = () => {
    setShowSuggestions(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="ai-chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="ai-chat-drawer"
            initial={{ x: '110%' }}
            animate={{ x: 0 }}
            exit={{ x: '110%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-left">
                <div className="ai-chat-avatar">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="ai-chat-title">Trợ lý AI — MLN122</h3>
                  <p className="ai-chat-subtitle">
                    {isLoading ? 'Đang xử lý...' : 'Dựa trên nội dung bài học'}
                  </p>
                </div>
              </div>
              <div className="ai-chat-header-actions">
                {messages.length > 0 && !isLoading && (
                  <button
                    className="ai-chat-action-btn"
                    onClick={handleNewChat}
                    title="Cuộc trò chuyện mới"
                  >
                    <PlusCircle size={16} />
                  </button>
                )}
                {showSuggestions && messages.length > 0 && (
                  <button
                    className="ai-chat-action-btn"
                    onClick={handleBack}
                    title="Quay về cuộc trò chuyện"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <button
                  className="ai-chat-close"
                  onClick={onClose}
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Offline warning banner */}
            {proxyError && (
              <div className="ai-chat-offline-banner">
                <span>
                  AI trực tuyến tạm thời không khả dụng — đang hiển thị nội dung từ bài học.
                  <br />
                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ai-chat-offline-link"
                  >
                    Kiểm tra backend
                  </a>
                  {' '}(npm run dev trong thư mục backend và API key) để có câu trả lời đầy đủ từ AI.
                </span>
              </div>
            )}

            {/* Messages area */}
            <div className="ai-chat-messages" ref={bottomRef}>
              {/* Empty state / suggestions */}
              {showSuggestions && messages.length === 0 && (
                <div className="ai-chat-empty">
                  <div className="ai-chat-empty-icon">
                    <Bot size={32} />
                  </div>
                  <p className="ai-chat-empty-title">Chào bạn!</p>
                  <p className="ai-chat-empty-desc">
                    Tôi là trợ lý AI của Chương 3.1. Tôi có thể giúp bạn:
                  </p>
                  <div className="ai-chat-suggestions">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        className="ai-chat-suggestion-btn"
                        onClick={() => handleSuggestion(s.prompt)}
                      >
                        <span className="ai-chat-suggestion-icon">{s.icon}</span>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message thread */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`ai-chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="ai-chat-message-avatar">
                    {msg.role === 'user' ? (
                      <div className="ai-chat-user-avatar">
                        <span>SV</span>
                      </div>
                    ) : (
                      <div className="ai-chat-bot-avatar">
                        <Sparkles size={14} />
                      </div>
                    )}
                  </div>
                  <div className="ai-chat-message-content">
                    <div className="ai-chat-bubble">
                      {msg.content.split('\n').map((line, j) => (
                        <p key={j}>{line || <br />}</p>
                      ))}
                    </div>
                    {msg.role === 'assistant' && !msg.isFallback && (
                      <p className="ai-chat-disclaimer">
                        Câu trả lời được tạo dựa trên nội dung bài học Chương 3.1 — MLN122.
                      </p>
                    )}
                    {msg.isFallback && (
                      <p className="ai-chat-disclaimer ai-chat-disclaimer-warning">
                        Đang chạy ở chế độ ngoại tuyến — nội dung được trả lời từ dữ liệu bài học.
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="ai-chat-message assistant">
                  <div className="ai-chat-message-avatar">
                    <div className="ai-chat-bot-avatar">
                      <Sparkles size={14} />
                    </div>
                  </div>
                  <div className="ai-chat-message-content">
                    <div className="ai-chat-bubble ai-chat-loading">
                      <span className="ai-chat-dots">
                        <span style={DOT_ANIM} />
                        <span style={{ ...DOT_ANIM, animationDelay: '0.2s' }} />
                        <span style={{ ...DOT_ANIM, animationDelay: '0.4s' }} />
                      </span>
                      <span>Đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="ai-chat-input-area">
              <textarea
                ref={inputRef}
                className="ai-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về bài học, khái niệm, công thức..."
                rows={1}
                disabled={isLoading}
              />
              <button
                className="ai-chat-send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Gửi"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
