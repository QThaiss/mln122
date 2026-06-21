const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

function buildUserMessage(message, context) {
  if (context) {
    return `NGỮ CẢNH BÀI HỌC:\n${context}\n\nCÂU HỎI CỦA SINH VIÊN:\n${message}`
  }

  return `CÂU HỎI:\n${message}`
}

function buildSystemInstruction(systemPrompt) {
  return `${systemPrompt}\n\nQUY CÁCH TRẢ LỜI: Viết bằng văn bản thường, tự nhiên và dễ đọc. Không dùng Markdown: không dùng dấu **, *, #, dấu gạch đầu dòng Markdown, hoặc khối mã. Dùng các đoạn văn ngắn; khi cần liệt kê, hãy dùng câu văn hoặc ký hiệu chấm tròn.`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, context = '', systemPrompt = '' } = req.body ?? {}

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured.')
    return res.status(503).json({ error: 'AI service is not configured.' })
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    const geminiUrl = `${GEMINI_API_BASE_URL}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemInstruction(systemPrompt) }] },
        contents: [{ parts: [{ text: buildUserMessage(message, context) }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    })

    if (!geminiResponse.ok) {
      console.error(`Gemini request failed with status ${geminiResponse.status}.`)
      return res.status(502).json({ error: 'AI service is unavailable.' })
    }

    const data = await geminiResponse.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      console.error('Gemini response did not include a reply.')
      return res.status(502).json({ error: 'AI service returned an invalid response.' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Gemini request failed:', error)
    return res.status(502).json({ error: 'AI service is unavailable.' })
  }
}
