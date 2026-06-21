import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'

const formatterPath = new URL('../src/services/plainText.js', import.meta.url)

test('AI Markdown is displayed as ordinary Vietnamese text', async () => {
  assert.equal(
    existsSync(formatterPath),
    true,
    'Expected a plain-text formatter for AI responses.'
  )

  const { toPlainText } = await import(`${formatterPath.href}?test=${Date.now()}`)
  const output = toPlainText(
    'Chào bạn,\n\n**Giá trị thặng dư (m)** là phần giá trị tăng thêm.\n\n* Nó do người lao động tạo ra.\n* Nhà tư bản chiếm phần này.\n\n`G = c + v + m`'
  )

  assert.equal(
    output,
    'Chào bạn,\n\nGiá trị thặng dư (m) là phần giá trị tăng thêm.\n\n• Nó do người lao động tạo ra.\n• Nhà tư bản chiếm phần này.\n\nG = c + v + m'
  )
  assert.doesNotMatch(output, /\*\*|`/)
})
