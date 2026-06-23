import assert from 'node:assert/strict'
import test from 'node:test'
import { fetchWithRetries } from '../retry.js'

test('retries a transient 503 response and returns the next successful response', async () => {
  let attempts = 0

  const response = await fetchWithRetries(
    async () => {
      attempts += 1
      return { ok: attempts === 2, status: attempts === 2 ? 200 : 503 }
    },
    { maxAttempts: 2, initialDelayMs: 0 }
  )

  assert.equal(attempts, 2)
  assert.equal(response.ok, true)
})
