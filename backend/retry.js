const TRANSIENT_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504])

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchWithRetries(request, { maxAttempts = 3, initialDelayMs = 500 } = {}) {
  let response

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    response = await request()

    if (
      response.ok ||
      !TRANSIENT_STATUS_CODES.has(response.status) ||
      attempt === maxAttempts - 1
    ) {
      return response
    }

    await wait(initialDelayMs * 2 ** attempt)
  }

  return response
}
