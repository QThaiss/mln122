import { useState, useCallback, useRef } from 'react'
import { retrieveChunks, buildContext, buildSystemPrompt } from '../../services/ragService'
import { toPlainText } from '../../services/plainText'
import AIChatDrawer from './AIChatDrawer'
import FloatingChatButton from './FloatingChatButton'

const FETCH_TIMEOUT_MS = 10_000
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

// Wraps fetch with a timeout so the fallback always triggers eventually
function fetchWithTimeout(url, options, timeoutMs = FETCH_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      controller.abort()
      reject(new Error('TIMEOUT'))
    }, timeoutMs)

    fetch(url, { ...options, signal: controller.signal })
      .then(res => {
        clearTimeout(timer)
        resolve(res)
      })
      .catch(err => {
        clearTimeout(timer)
        // AbortError means timeout, otherwise it's a network/proxy error
        reject(err)
      })
  })
}

// Check if an error indicates the backend proxy is unreachable (fast-path)
function isProxyError(err) {
  return (
    err.name === 'TypeError' ||
    err.message?.includes('fetch failed') ||
    err.message?.includes('TIMEOUT') ||
    err.message?.includes('Failed to fetch')
  )
}

export default function AIChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [proxyError, setProxyError] = useState(false)
  const abortRef = useRef(null)

  const handleNewChat = useCallback(() => {
    setMessages([])
    setProxyError(false)
  }, [])

  const showFallback = useCallback((userMessage) => {
    const chunks = retrieveChunks(userMessage, 3)
    const content = chunks.length > 0
      ? `Dựa trên nội dung bài học, tôi tìm được thông tin liên quan:\n\n${
        chunks.map(({ chunk }) => {
          const title = chunk?.title ?? ''
          const text = chunk?.content ?? ''
          return `📌 **${title}**\n${text}`
        }).join('\n\n')
      }\n\nBạn có muốn tìm hiểu thêm khía cạnh nào không?`
      : 'Xin lỗi, tôi không tìm thấy nội dung liên quan trong bài học. Bạn có thể hỏi cụ thể hơn về các khái niệm trong Chương 3.1 nhé!'

    const assistantMsg = { role: 'assistant', content: toPlainText(content), isFallback: true }
    setMessages(prev => [...prev, assistantMsg])
    setIsLoading(false)
    setProxyError(true)
  }, [])

  const handleSend = useCallback(async (userMessage) => {
    if (abortRef.current) abortRef.current = false
    const thisRequest = { current: true }
    abortRef.current = thisRequest

    const userMsg = { role: 'user', content: userMessage }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setProxyError(false)

    try {
      const chunks = retrieveChunks(userMessage, 5)
      const context = buildContext(chunks)
      const systemPrompt = buildSystemPrompt()

      const response = await fetchWithTimeout(`${API_BASE_URL}/api/chat`, {
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
        if (thisRequest.current) showFallback(userMessage)
        return
      }

      const data = await response.json()

      if (thisRequest.current) {
        const assistantMsg = { role: 'assistant', content: toPlainText(data.reply), isFallback: false }
        setMessages(prev => [...prev, assistantMsg])
        setIsLoading(false)
      }
    } catch (err) {
      if (!thisRequest.current) return
      // Network/proxy/timeout error → show lesson fallback immediately
      if (isProxyError(err)) {
        showFallback(userMessage)
        return
      }
      // Unexpected error
      const assistantMsg = {
        role: 'assistant',
        content: 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.',
        isFallback: true,
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsLoading(false)
    }
  }, [showFallback])

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
        proxyError={proxyError}
      />
    </>
  )
}
