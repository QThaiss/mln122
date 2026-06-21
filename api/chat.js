const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

function buildUserMessage(message, context, systemPrompt) {
  if (context) {
    return `${systemPrompt}\n\nNGỮ CẢNH BÀI HỌC:\n${context}\n\nCÂU HỎI CỦA SINH VIÊN:\n${message}`
  }

  return `${systemPrompt}\n\nCÂU HỎI:\n${message}`
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

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not configured.')
    return res.status(503).json({ error: 'AI service is not configured.' })
  }

  try {
    const openAIResponse = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: buildUserMessage(message, context, systemPrompt) },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!openAIResponse.ok) {
      console.error(`OpenAI request failed with status ${openAIResponse.status}.`)
      return res.status(502).json({ error: 'AI service is unavailable.' })
    }

    const data = await openAIResponse.json()
    const reply = data.choices?.[0]?.message?.content

    if (!reply) {
      console.error('OpenAI response did not include a reply.')
      return res.status(502).json({ error: 'AI service returned an invalid response.' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('OpenAI request failed:', error)
    return res.status(502).json({ error: 'AI service is unavailable.' })
  }
}
