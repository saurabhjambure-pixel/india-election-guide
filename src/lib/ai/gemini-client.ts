import { GoogleGenerativeAI } from '@google/generative-ai';

// Singleton Gemini client — server-side only.
// Never import this in a client component or expose the API key.
function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set. Check your .env.local file.');
  }
  return new GoogleGenerativeAI(apiKey);
}

let _client: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!_client) {
    _client = createGeminiClient();
  }
  return _client;
}

export function getGeminiModel(modelName = 'gemini-1.5-flash') {
  return getGeminiClient().getGenerativeModel({ model: modelName });
}
