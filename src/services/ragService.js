import chapterData from '../data/chapterData.json'

// Content chunking — split sections into semantically meaningful pieces
function chunkContent() {
  const chunks = []
  const { sections, summary, essence, keywords, quiz, presentation } = chapterData

  for (const section of sections) {
    chunks.push({
      id: section.id,
      type: section.type,
      title: section.title,
      content: section.content,
      sectionId: section.id,
      weight: 1.0,
    })

    if (section.comparisons) {
      for (const comp of section.comparisons) {
        chunks.push({
          id: `${section.id}-comp-${comp.label}`,
          type: 'comparison',
          title: comp.label,
          content: `${comp.label}: ${comp.description} Công thức: ${comp.formula}`,
          sectionId: section.id,
          weight: 0.8,
        })
      }
    }

    if (section.chain) {
      chunks.push({
        id: `${section.id}-chain`,
        type: 'chain',
        title: 'Chuỗi logic',
        content: section.chain.join('. '),
        sectionId: section.id,
        weight: 0.9,
      })
    }

    if (section.steps) {
      chunks.push({
        id: `${section.id}-steps`,
        type: 'steps',
        title: 'Các bước',
        content: section.steps.map((s, i) => `Bước ${i + 1}: ${s}`).join('. '),
        sectionId: section.id,
        weight: 0.9,
      })
    }

    if (section.formulas) {
      for (const f of section.formulas) {
        const varsText = f.vars.map(v => `${v.sym} ${v.desc}`).join(', ')
        chunks.push({
          id: `${section.id}-formula-${f.main}`,
          type: 'formula',
          title: 'Công thức',
          content: `Công thức: ${f.main}. Giải thích: ${varsText}`,
          sectionId: section.id,
          weight: 1.0,
        })
      }
    }
  }

  chunks.push({
    id: 'summary',
    type: 'summary',
    title: summary.title,
    content: summary.text,
    sectionId: 'summary',
    weight: 1.0,
  })

  chunks.push({
    id: 'essence',
    type: 'essence',
    title: essence.title,
    content: `${essence.definition}. ${essence.points.join('. ')}. ${essence.conclusion}`,
    sectionId: 'essence',
    weight: 1.0,
  })

  chunks.push({
    id: 'keywords',
    type: 'keywords',
    title: 'Từ khóa',
    content: keywords.join(', '),
    sectionId: 'keywords',
    weight: 0.5,
  })

  return chunks
}

const CHUNKS = chunkContent()

// Relevance scoring based on keyword matching
function scoreRelevance(query, chunk) {
  const queryLower = (query ?? '').toLowerCase()
  const contentLower = (chunk?.content ?? '').toLowerCase()
  const titleLower = (chunk?.title ?? '').toLowerCase()

  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2)
  const contentWords = contentLower.split(/\s+/)
  const titleWords = titleLower.split(/\s+/)

  let score = 0

  // Keyword match scoring
  const KEYWORD_WEIGHTS = {
    'giá trị thặng dư': 3, 'gt d': 3, 'surplus value': 3,
    'tư bản': 2.5, 'capital': 2.5,
    'công thức': 2, 'formula': 2, 't-h-t': 2,
    'sức lao động': 2.5, 'labor': 2.5,
    'bất biến': 2, 'khả biến': 2, 'c/v': 2,
    'tỷ suất': 2, 'khối lượng': 2, 'm': 1.5,
    'tuyệt đối': 1.5, 'tương đối': 1.5, 'siêu ngạch': 1.5,
    'tiền công': 2, 'wage': 2,
    'lưu thông': 1.5, 'circulation': 1.5,
    'c.mác': 1.5, 'marx': 1.5,
    'mâu thuẫn': 1.5, 'contradiction': 1.5,
    'cộng sản': 1, 'chủ nghĩa': 1, 'communist': 1,
  }

  for (const [keyword, weight] of Object.entries(KEYWORD_WEIGHTS)) {
    if (queryLower.includes(keyword)) {
      if (contentLower.includes(keyword)) score += weight
      if (titleLower.includes(keyword)) score += weight * 0.5
    }
  }

  // Word overlap
  for (const word of queryWords) {
    const cleanWord = word.replace(/[^\p{L}\p{N}\s]/gu, '')
    if (contentWords.some(w => w.includes(cleanWord))) score += 0.1
    if (titleWords.some(w => w.includes(cleanWord))) score += 0.2
  }

  return score * chunk.weight
}

// Retrieve top-k relevant chunks
export function retrieveChunks(query, topK = 5) {
  const scored = CHUNKS
    .filter(chunk => chunk && typeof chunk === 'object')
    .map(chunk => ({ chunk, score: scoreRelevance(query, chunk) }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

// Build context string from retrieved chunks
export function buildContext(chunks) {
  return chunks
    .map(({ chunk, score }) => `[Nguồn: ${chunk?.title ?? ''}] (Độ phù hợp: ${(score ?? 0).toFixed(2)})\n${chunk?.content ?? ''}`)
    .join('\n\n')
}

// Build system prompt with lesson context
export function buildSystemPrompt() {
  return `Bạn là trợ lý học tập chuyên về Kinh tế Chính trị Mác - Lênin, môn MLN122, Chương 3.1: Lý luận của C. Mác về giá trị thặng dư.

NGUYÊN TẮC:
1. Chỉ trả lời dựa trên nội dung bài học được cung cấp trong ngữ cảnh.
2. Sử dụng ngôn ngữ đơn giản, dễ hiểu cho sinh viên đại học.
3. Khi giải thích khái niệm, kèm ví dụ cụ thể.
4. Luôn tham chiếu đến phần bài học liên quan (ví dụ: "Theo mục Công thức chung của tư bản...").
5. Nếu câu hỏi nằm ngoài nội dung bài học, trả lời: "Nội dung này không có trong bài học Chương 3.1. Tôi chỉ có thể trả lời các câu hỏi về lý luận giá trị thặng dư của C. Mác."
6. Có thể trả lời bằng tiếng Việt hoặc tiếng Anh tùy theo câu hỏi.

TRẢ LỜI NGẮN GỌN: Ưu tiên câu trả lời ngắn gọn, đúng trọng tâm, có cấu trúc rõ ràng (dùng bullet points nếu cần).`
}

// Feature: summarize a section
export function summarizeSection(sectionId) {
  const section = chapterData.sections.find(s => s.id === sectionId)
  if (!section) return 'Không tìm thấy phần nội dung.'
  return section.content
}

// Feature: generate quiz from section
export function generateQuizFromSection(sectionId) {
  const section = chapterData.sections.find(s => s.id === sectionId)
  if (!section) return null
  return {
    sectionId,
    title: section.title,
    prompt: `Dựa trên nội dung: "${section.title}" - ${section.content}. Tạo 3 câu hỏi trắc nghiệm (4 lựa chọn A-D) với đáp án đúng. Trả lời bằng JSON array.`,
  }
}

// Feature: generate flashcards
export function generateFlashcardsFromSection(sectionId) {
  const section = chapterData.sections.find(s => s.id === sectionId)
  if (!section) return null

  const cards = []

  // Key terms from section
  const keyTerms = {
    'formula': [
      { front: 'Công thức chung của tư bản là gì?', back: 'T — H — T\'. Tiền → Hàng hóa → Tiền nhiều hơn. Mục đích: thu giá trị thặng dư.' },
      { front: 'Giá trị thặng dư (GTD) là gì?', back: 'Phần giá trị mới dôi ra ngoài giá trị hàng hóa sức lao động, bị nhà tư bản chiếm đoạt.' },
      { front: 'Điều kiện để sức lao động trở thành hàng hóa?', back: '1) Người lao động tự do về thân thể. 2) Không có tư liệu sản xuất, buộc phải bán sức lao động.' },
    ],
    'contradiction': [
      { front: 'Mâu thuẫn cốt lõi của công thức T-H-T\'', back: 'Nếu mua bán ngang giá, không thể tạo giá trị mới. Tổng giá trị xã hội không tăng.' },
      { front: 'Giải pháp cho mâu thuẫn là gì?', back: 'Phát hiện hàng hóa sức lao động — loại hàng hóa đặc biệt tạo giá trị lớn hơn chính nó.' },
    ],
    'capital': [
      { front: 'Tư bản bất biến (c) là gì?', back: 'Phần tư bản mua tư liệu sản xuất. Giá trị được bảo tồn và chuyển vào sản phẩm. Không tạo GTD.' },
      { front: 'Tư bản khả biến (v) là gì?', back: 'Phần tư bản mua sức lao động. Lao động của công nhân tạo giá trị mới lớn hơn giá trị ban đầu. Nguồn gốc trực tiếp tạo GTD.' },
      { front: 'Công thức G = c + v + m có nghĩa?', back: 'Giá trị hàng hóa = Tư bản bất biến + Tư bản khả biến + Giá trị thặng dư.' },
    ],
    'rate-mass': [
      { front: 'Tỷ suất GTD (m\') tính bằng gì?', back: 'm\' = m/v × 100%. Cũng: m\' = t\'/t × 100% (thời gian lao động thặng dư / thời gian lao động tất yếu).' },
      { front: 'Khối lượng GTD (M) tính bằng gì?', back: 'M = m\' × V. Tỷ suất GTD × Tổng tư bản khả biến.' },
      { front: 'Tỷ suất vs Khối lượng GTD khác nhau thế nào?', back: 'Tỷ suất GTD phản ánh mức độ khai thác. Khối lượng GTD phản ánh quy mô thu được.' },
    ],
    'methods': [
      { front: 'GTD tuyệt đối là gì?', back: 'Thu được bằng cách kéo dài ngày lao động (ví dụ: 8h→10h). M\' tăng từ 100% → 150%.' },
      { front: 'GTD tương đối là gì?', back: 'Thu được bằng cách rút ngắn thời gian lao động tất yếu (tăng năng suất). Ví dụ: 4h→2h tất yếu, m\' tăng 100%→300%.' },
      { front: 'GTD siêu ngạch là gì?', back: 'Doanh nghiệp cải tiến kỹ thuật trước, có giá trị cá biệt thấp hơn giá trị xã hội → thu GTD cao hơn bình thường.' },
    ],
  }

  const typeTerms = keyTerms[section.type] || keyTerms['formula']
  for (const term of typeTerms) {
    cards.push({ ...term, sectionId })
  }

  return cards
}

export { chapterData }
