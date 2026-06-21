import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const clusterFour = readFileSync(new URL('../src/components/ClusterFour.jsx', import.meta.url), 'utf8')
const hero = readFileSync(new URL('../src/components/HeroSection.jsx', import.meta.url), 'utf8')

test('Mind Map route does not render navigation that can cover the diagram', () => {
  const start = app.indexOf('<Route path="/mindmap"')
  const end = app.indexOf('<Route path="/flashcards"')
  const mindMapRoute = app.slice(start, end)

  assert.ok(start >= 0, 'Expected a Mind Map route.')
  assert.doesNotMatch(mindMapRoute, /<FloatingNav\s*\/>/)
})

test('learning tools are available in the sidebar instead of an overlapping top bar', () => {
  assert.doesNotMatch(app, /className="extra-nav-bar"/)
  assert.match(app, /to="\/mindmap" className="nav-item"/)
  assert.match(app, /to="\/flashcards" className="nav-item"/)
  assert.match(app, /to="\/quiz" className="nav-item"/)
})

test('presentation content is not rendered in the lesson website', () => {
  assert.doesNotMatch(app, /id: 'presentation'/)
  assert.doesNotMatch(clusterFour, /<PresentationSection\s*\/>/)
  assert.doesNotMatch(hero, /Phần thuyết trình/)
})
