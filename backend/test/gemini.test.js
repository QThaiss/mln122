import assert from 'node:assert/strict'
import test from 'node:test'
import { getGeminiText } from '../gemini.js'

test('combines every text part from a Gemini candidate', () => {
  const response = {
    candidates: [
      {
        content: {
          parts: [
            { text: 'Tiền chuyển hóa thành tư' },
            { text: ' bản khi tạo ra giá trị thặng dư.' },
          ],
        },
      },
    ],
  }

  assert.equal(
    getGeminiText(response),
    'Tiền chuyển hóa thành tư bản khi tạo ra giá trị thặng dư.'
  )
})
