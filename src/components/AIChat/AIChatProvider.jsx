import { useState, useCallback, useRef } from 'react'
import { retrieveChunks, buildContext, buildSystemPrompt } from '../../services/ragService'
import AIChatDrawer from './AIChatDrawer'
import FloatingChatButton from './FloatingChatButton'

const FETCH_TIMEOUT_MS = 10_000

// Wraps fetch with a timeout so the fallback always triggers eventually
function fetchWithTimeout(url, options, timeoutMs = FETCH_TIMEOUT_MS) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)
    ),
  ])
}

export default function AIChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef(null)

  const handleNewChat = useCallback(() => {
    setMessages([])
  }, [])

  const handleSend = useCallback(async (userMessage) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current = false
    const thisRequest = { current: true }
    abortRef.current = thisRequest

    const userMsg = { role: 'user', content: userMessage }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      // RAG: retrieve relevant chunks from lesson content
      const chunks = retrieveChunks(userMessage, 5)
      const context = buildContext(chunks)
      const systemPrompt = buildSystemPrompt()

      const response = await fetchWithTimeout('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context,
          systemPrompt,
          chunks: chunks.map(({ chunk }) => chunk),
        }),
      }, FETCH_TIMEOUT_MS)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      // Only append if this is still the latest request
      if (thisRequest.current) {
        const assistantMsg = { role: 'assistant', content: data.reply, isFallback: false }
        setMessages(prev => [...prev, assistantMsg])
      }
    } catch {
      // Any error (network, timeout, HTTP, etc.) → show fallback lesson content
      if (!thisRequest.current) return

      const chunks = retrieveChunks(userMessage, 3)
      const content = chunks.length > 0
        ? `Dựa trên nội dung bài học, tôi tìm được thông tin liên quan:\n\n${
          chunks.map(({ chunk }) => `📌 **${chunk.title}**\n${chunk.content}`).join('\n\n')
        }\n\nBạn có muốn tìm hiểu thêm khía cạnh nào không?`
        : 'Xin lỗi, tôi không tìm thấy nội dung liên quan trong bài học. Bạn có thể hỏi cụ thể hơn về các khái niệm trong Chương 3.1 nhé!'

      const assistantMsg = { role: 'assistant', content, isFallback: true }
      setMessages(prev => [...prev, assistantMsg])
    } finally {
      if (thisRequest.current) {
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <>
      {children}
      <FloatingChatButton onClick={() => setIsOpen(true)} />
      <AIChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSend={handleSend}
        isLoading={isLoading}
        onNewChat={handleNewChat}
      />
    </>
  )
}
