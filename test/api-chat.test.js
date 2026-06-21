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

test('Vercel chat endpoint returns the OpenAI reply for a valid request', async () => {
  assert.equal(
    existsSync(handlerPath),
    true,
    'Expected api/chat.js so Vercel can serve POST /api/chat after deployment.'
  )

  const { default: handler } = await import(`${handlerPath.href}?test=${Date.now()}`)
  const previousFetch = globalThis.fetch
  const previousApiKey = process.env.OPENAI_API_KEY
  let outboundRequest

  process.env.OPENAI_API_KEY = 'test-key'
  globalThis.fetch = async (url, options) => {
    outboundRequest = { url, options }
    return {
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'AI reply' } }] }),
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
    if (previousApiKey === undefined) delete process.env.OPENAI_API_KEY
    else process.env.OPENAI_API_KEY = previousApiKey
  }

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, { reply: 'AI reply' })
  assert.equal(outboundRequest.url, 'https://api.openai.com/v1/chat/completions')
})
