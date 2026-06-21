import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'

const handlerPath = new URL('../api/chat.js', import.meta.url)

function createResponse() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
    setHeader() {},
  }
}

test('Vercel chat endpoint returns the Gemini reply for a valid request', async () => {
  assert.equal(
    existsSync(handlerPath),
    true,
    'Expected api/chat.js so Vercel can serve POST /api/chat after deployment.'
  )

  const { default: handler } = await import(`${handlerPath.href}?test=${Date.now()}`)
  const previousFetch = globalThis.fetch
  const previousApiKey = process.env.GEMINI_API_KEY
  const previousModel = process.env.GEMINI_MODEL
  let outboundRequest

  process.env.GEMINI_API_KEY = 'test-key'
  delete process.env.GEMINI_MODEL
  globalThis.fetch = async (url, options) => {
    outboundRequest = { url, options }
    return {
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: 'Gemini reply' }] } }] }),
    }
  }

  const response = createResponse()

  try {
    await handler(
      {
        method: 'POST',
        body: {
          message: 'Giá trị thặng dư là gì?',
          context: 'Nội dung bài học',
          systemPrompt: 'Bạn là trợ lý MLN122.',
        },
      },
      response
    )
  } finally {
    globalThis.fetch = previousFetch
    if (previousApiKey === undefined) delete process.env.GEMINI_API_KEY
    else process.env.GEMINI_API_KEY = previousApiKey
    if (previousModel === undefined) delete process.env.GEMINI_MODEL
    else process.env.GEMINI_MODEL = previousModel
  }

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, { reply: 'Gemini reply' })
  assert.equal(
    outboundRequest.url,
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=test-key'
  )
  const payload = JSON.parse(outboundRequest.options.body)
  assert.match(payload.systemInstruction.parts[0].text, /không dùng Markdown/i)
})
