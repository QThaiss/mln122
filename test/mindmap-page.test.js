import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync(new URL('../src/components/MindMap/MindMapPage.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

test('Mind Map has a dedicated visual workspace and a clear return action', () => {
  assert.match(page, /Link to="\/" className="mindmap-back-button"/)
  assert.match(page, /className="mindmap-workspace"/)
  assert.match(page, /className="mindmap-toolbar"/)
  assert.match(page, /className="mindmap-canvas"/)
  assert.match(page, /Khám phá sơ đồ/)
  assert.match(styles, /\.mindmap-workspace/)
  assert.match(styles, /\.mindmap-back-button/)
  assert.match(styles, /\.mindmap-canvas/)
})
