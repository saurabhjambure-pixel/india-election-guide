import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'

// Singleton Gemini client — server-side only.
// Never import this in a client component or expose the API key.

let _client: GoogleGenerativeAI | null = null

export function getGeminiClient(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'mock_key') return null
  if (!_client) {
    _client = new GoogleGenerativeAI(apiKey)
  }
  return _client
}

export function getGeminiModel(modelName = 'gemini-1.5-flash') {
  const client = getGeminiClient()
  if (!client) return null
  return client.getGenerativeModel({
    model: modelName,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY' as HarmCategory,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  })
}
