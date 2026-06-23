export function getGeminiText(response) {
  const parts = response?.candidates?.[0]?.content?.parts ?? []
  const text = parts
    .filter((part) => typeof part?.text === 'string' && !part.thought)
    .map((part) => part.text)
    .join('')
    .trim()

  if (!text) throw new Error('Gemini returned no answer text')
  return text
}
