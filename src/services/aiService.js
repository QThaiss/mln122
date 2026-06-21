import { LESSON_DATA } from '../data/lessonData'

// ── Chunking Service ─────────────────────────────────────────────
export function chunkLessonContent() {
  const chunks = []
  const { sections, quizQuestions, presentationSections, objectives } = LESSON_DATA

  // Chunk each section as a separate knowledge unit
  sections.forEach((section) => {
    const textParts = []

    textParts.push(`## ${section.sectionTitle}`)
    textParts.push(`Cluster: ${section.clusterLabel}`)
    textParts.push(section.subtitle || '')

    section.content?.forEach((block) => {
      if (block.type === 'text') textParts.push(block.body)
      if (block.type === 'callout') textParts.push(block.body)
      if (block.type === 'formula-box') {
        textParts.push(`Công thức: ${block.formula}`)
        block.variables?.forEach((v) => textParts.push(`${v.symbol} ${v.description}`))
      }
      if (block.type === 'card-grid') {
        block.items?.forEach((item) => {
          textParts.push(`${item.label}: ${item.body}`)
          item.subItems?.forEach((sub) => textParts.push(`  - ${sub}`))
          if (item.examples) item.examples.forEach((ex) => textParts.push(`  Ví dụ: ${ex}`))
        })
      }
      if (block.type === 'numbered-list') {
        block.items?.forEach((item, i) => textParts.push(`${i + 1}. ${item.text}`))
      }
      if (block.type === 'timeline') {
        block.items?.forEach((item, i) => textParts.push(`${i + 1}. ${item}`))
      }
      if (block.type === 'card') {
        textParts.push(`${item?.label || block.label}: ${item?.body || block.body}`)
        block.properties?.forEach((p) => textParts.push(`  - ${p.label}: ${p.text}`))
      }
    })

    textParts.push(`Tóm tắt: ${section.summary}`)
    if (section.keywords) textParts.push(`Từ khóa: ${section.keywords.join(', ')}`)

    chunks.push({
      id: section.sectionId,
      clusterId: section.clusterId,
      clusterLabel: section.clusterLabel,
      title: section.sectionTitle,
      content: textParts.filter(Boolean).join('\n'),
      keywords: section.keywords || [],
      type: 'section',
    })
  })

  // Quiz chunk
  const quizContent = quizQuestions
    .map((q) => `${q.id}. ${q.question}\nĐáp án đúng: ${q.correct}. ${q.options.find((o) => o.id === q.correct)?.text}\nGiải thích: ${q.explanation}`)
    .join('\n\n')

  chunks.push({
    id: 'quiz',
    title: 'Câu hỏi ôn tập',
    content: quizContent,
    keywords: ['quiz', 'câu hỏi trắc nghiệm', 'ôn tập'],
    type: 'quiz',
  })

  // Presentation chunk
  const presContent = presentationSections
    .map((s) => `## ${s.title}\n${s.content}`)
    .join('\n\n')

  chunks.push({
    id: 'presentation',
    title: 'Kịch bản thuyết trình',
    content: presContent,
    keywords: ['thuyết trình', 'bài trình bày'],
    type: 'presentation',
  })

  return chunks
}

// ── Simple Semantic Search ──────────────────────────────────────
// Score-based retrieval (no external embedding service needed)
function scoreMatch(chunk, query) {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean)
  const chunkText = `${chunk.content} ${chunk.title} ${chunk.keywords.join(' ')}`.toLowerCase()

  let score = 0
  queryWords.forEach((word) => {
    if (chunk.title.toLowerCase().includes(word)) score += 10
    if (chunk.keywords.some((kw) => kw.toLowerCase().includes(word))) score += 5
    if (chunk.content.toLowerCase().includes(word)) score += 1
  })

  // Bonus for exact phrase match
  if (chunkText.includes(query.toLowerCase())) score += 15

  return score
}

export function retrieveContext(query, topK = 4) {
  const chunks = chunkLessonContent()
  const scored = chunks
    .map((chunk) => ({ chunk, score: scoreMatch(chunk, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)

  return scored.map(({ chunk }) => chunk.content).join('\n\n---\n\n')
}

// ── AI Service ──────────────────────────────────────────────────
const SYSTEM_PROMPT = LESSON_DATA.systemPrompt

// Feature types for structured generation
const FEATURE_PROMPTS = {
  summarize: (sectionTitle) =>
    `Tóm tắt nội dung "${sectionTitle}" trong Chương 3.1 bằng tiếng Việt, ngắn gọn, dễ hiểu, khoảng 3-5 câu.`,

  explainConcept: (concept) =>
    `Giải thích khái niệm "${concept}" theo nội dung bài học Chương 3.1. Trình bày rõ ràng, có ví dụ cụ thể từ bài học.`,

  generateQuiz: () =>
    `Dựa trên nội dung bài học Chương 3.1, hãy tạo 3 câu hỏi trắc nghiệm mới (khác với 8 câu hiện có). Mỗi câu có 4 lựa chọn A-D, chỉ rõ đáp án đúng và giải thích ngắn.`,

  generateFlashcards: () =>
    `Dựa trên nội dung bài học Chương 3.1, hãy tạo 5 flashcards (thẻ học) dạng Q&A. Mỗi thẻ gồm: câu hỏi ở mặt trước (front) và câu trả lời ở mặt sau (back).`,

  assignmentGuidance: (topic) =>
    `Hướng dẫn trả lời câu hỏi/bài tập về "${topic}" theo nội dung Chương 3.1. Trình bày rõ ràng, có cấu trúc.`,

  chat: (message) => message,
}

// Detect user intent from message
function detectIntent(message) {
  const lower = message.toLowerCase()
  if (lower.includes('tóm tắt') || lower.includes('summarize')) return 'summarize'
  if (lower.includes('giải thích') || lower.includes('là gì') || lower.includes('cho biết') || lower.includes('khái niệm')) return 'explainConcept'
  if (lower.includes('quiz') || lower.includes('câu hỏi') || lower.includes('trắc nghiệm') || lower.includes('tạo câu hỏi')) return 'generateQuiz'
  if (lower.includes('flashcard') || lower.includes('thẻ học')) return 'generateFlashcards'
  if (lower.includes('bài tập') || lower.includes('assignment') || lower.includes('hướng dẫn')) return 'assignmentGuidance'
  return 'chat'
}

// Extract key concept from message
function extractConcept(message) {
  const patterns = [
    /(?:giải thích|là gì|khái niệm|cho biết)\s+(?:về\s+)?(.+)/i,
    /tóm tắt\s+(?:nội dung\s+)?(?:về\s+)?(.+)/i,
    /(.+?)\s+(?:là gì|định nghĩa)/i,
  ]
  for (const p of patterns) {
    const m = message.match(p)
    if (m) return m[1].trim()
  }
  return message.slice(0, 60)
}

export async function askAI(message) {
  const intent = detectIntent(message)

  let context = retrieveContext(message)
  let userPrompt = FEATURE_PROMPTS[intent](intent === 'explainConcept' || intent === 'summarize' ? extractConcept(message) : message)

  if (intent === 'summarize') {
    const concept = extractConcept(message)
    context = retrieveContext(concept) || retrieveContext('tổng kết')
  }

  if (intent === 'assignmentGuidance') {
    const topic = extractConcept(message)
    context = retrieveContext(topic)
    userPrompt = FEATURE_PROMPTS.assignmentGuidance(topic)
  }

  const fullPrompt = `${SYSTEM_PROMPT}\n\n=== NGỮ CẢNH BÀI HỌC ===\n${context}\n\n=== CÂU HỎI ===\n${userPrompt}`

  // Check for API key
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_AI_API_KEY

  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: fullPrompt }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.choices[0]?.message?.content || 'Không có phản hồi từ AI.'
      }
    } catch (err) {
      console.warn('AI API call failed:', err)
    }
  }

  // Fallback: template-based responses from lesson content
  return generateTemplateResponse(message, intent, context)
}

// ── Template-based Fallback ─────────────────────────────────────
function generateTemplateResponse(message, intent, context) {
  const chunks = context.split('\n\n---\n\n').filter(Boolean)

  if (intent === 'summarize' && chunks.length > 0) {
    return `## Tóm tắt\n\nDựa trên nội dung bài học, đây là tóm tắt ngắn gọn:\n\n${chunks.map((c) => `- ${c.slice(0, 200)}...`).join('\n')}\n\n*Bạn có thể hỏi chi tiết hơn về bất kỳ phần nào trong nội dung trên.*`
  }

  if (intent === 'generateQuiz' && chunks.length > 0) {
    return `## Câu hỏi trắc nghiệm mới\n\nDựa trên nội dung bài học, đây là 3 câu hỏi thêm:\n\n**Câu 1:** Hãy cho biết công thức chung của tư bản?\n- A. H - T - H\n- B. T - H - T'\n- C. H - H - T\n- D. T - T - H\n> Đáp án: **B** — T' = T + ΔT, phần chênh lệch là GTD.\n\n**Câu 2:** Tư bản khả biến (v) dùng để mua gì?\n- A. Máy móc và nhà xưởng\n- B. Nguyên liệu\n- C. Sức lao động\n- D. Nhiên liệu\n> Đáp án: **C** — v mua hàng hóa sức lao động, là nguồn gốc trực tiếp tạo GTD.\n\n**Câu 3:** GTD tương đối thu thêm bằng cách nào?\n- A. Kéo dài ngày lao động\n- B. Tăng năng suất lao động xã hội rút ngắn thời gian lao động tất yếu\n- C. Giảm số công nhân\n- D. Tăng giá thành sản phẩm\n> Đáp án: **B** — Tăng năng suất → rút ngắn thời gian tất yếu → tăng thời gian thặng dư.`
  }

  if (intent === 'generateFlashcards') {
    return `## Flashcards — Thẻ học\n\n| # | Câu hỏi (Front) | Trả lời (Back) |\n|---|---|---|\n| 1 | Công thức chung của tư bản? | T — H — T'. T' = T + ΔT, ΔT = giá trị thặng dư |\n| 2 | Điều kiện sức lao động thành hàng hóa? | 1) Tự do thân thể. 2) Không có tư liệu SX |\n| 3 | Tư bản khả biến (v) là gì? | Tiền mua sức lao động — nguồn gốc trực tiếp tạo GTD |\n| 4 | Tỷ suất GTD = ? | m' = m/v × 100% = t'/t × 100% |\n| 5 | GTD tương đối? | Tăng năng suất → rút ngắn thời gian tất yếu → tăng GTD |`
  }

  if (chunks.length > 0) {
    const topChunk = chunks[0] || ''
    const relevant = chunks.slice(0, 2).join('\n\n')

    return `## Trả lời dựa trên nội dung bài học\n\n${relevant.slice(0, 1200)}\n\n---\n\n*Trả lời được tạo từ nội dung Chương 3.1. Để có câu trả lời chi tiết hơn, vui lòng hỏi cụ thể hơn về khái niệm hoặc dùng API key cho AI (tham khảo file .env.example).*`
  }

  return `Nội dung này không có trong tài liệu bài học. Bạn có thể hỏi về các chủ đề liên quan đến lý luận giá trị thặng dư trong Chương 3.1: công thức T-H-T', hàng hóa sức lao động, tư bản c/v, tỷ suất & khối lượng GTD, các phương pháp sản xuất GTD.`
}
