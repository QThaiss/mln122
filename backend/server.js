import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getGeminiText } from './gemini.js'
import { fetchWithRetries } from './retry.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const PORT = process.env.PORT || 3001
const PROVIDER = process.env.PROVIDER || 'openai'

// ── OpenAI ──────────────────────────────────────────────
async function chatOpenAI(systemPrompt, userMessage) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 800,
    }),
  })
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`)
  const data = await res.json()
  return data.choices[0].message.content
}

// ── Anthropic (Claude) ───────────────────────────────────
async function chatAnthropic(systemPrompt, userMessage) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 800,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`Anthropic error: ${res.status}`)
  const data = await res.json()
  return data.content[0].text
}

// ── Google Gemini ───────────────────────────────────────
async function chatGemini(systemPrompt, userMessage) {
  const res = await fetchWithRetries(
    () => fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || 'gemini-2.0-flash'}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1600 },
        }),
      }
    ),
    { maxAttempts: 3, initialDelayMs: 500 }
  )
  if (!res.ok) throw new Error(`Gemini error: ${res.status}`)
  const data = await res.json()
  return getGeminiText(data)
}

// ── Ollama (local) ──────────────────────────────────────
async function chatOllama(systemPrompt, userMessage) {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
  const model = process.env.OLLAMA_MODEL || 'llama3.2'
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: false,
    }),
  })
  if (!res.ok) throw new Error(`Ollama error: ${res.status}`)
  const data = await res.json()
  return data.message.content
}

// ── Unified chat handler ────────────────────────────────
async function chat(message, context, systemPrompt) {
  const userMessage = context
    ? `${systemPrompt}\n\nNGỮ CẢNH BÀI HỌC:\n${context}\n\nCÂU HỎI CỦA SINH VIÊN:\n${message}`
    : `${systemPrompt}\n\nCÂU HỎI:\n${message}`

  switch (PROVIDER) {
    case 'anthropic':
      return await chatAnthropic(systemPrompt, userMessage)
    case 'gemini':
      return await chatGemini(systemPrompt, userMessage)
    case 'ollama':
      return await chatOllama(systemPrompt, userMessage)
    case 'openai':
    default:
      return await chatOpenAI(systemPrompt, userMessage)
  }
}

// ── API Routes ──────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, context, systemPrompt } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  try {
    const reply = await chat(message, context || '', systemPrompt || '')
    res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'AI service unavailable. Please check your API key.' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', provider: PROVIDER })
})

app.listen(PORT, () => {
  console.log(`MLN122 Backend running on http://localhost:${PORT}`)
  console.log(`AI Provider: ${PROVIDER}`)
})
