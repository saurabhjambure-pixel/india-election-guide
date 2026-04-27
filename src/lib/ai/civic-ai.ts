import { CIVIC_INTENTS, INTENT_TO_FLOW_ID, CivicIntent } from './intents';
import { ClassifyResponse, ClassifyResponseSchema, ExplainResponse, ExplainResponseSchema } from './schemas';
import { getGeminiModel } from './gemini-client';
import type { CivicFlow } from '../types/civic';

// =============================================================================
// CLASSIFY
// =============================================================================
const CLASSIFY_SYSTEM_PROMPT = `
You are a civic assistant for the India Election Guide.
Your only job is to classify the user's message into one of these bounded intents:
${CIVIC_INTENTS.map((i) => `- ${i}`).join('\n')}

Rules:
- You MUST return valid JSON that matches the schema exactly.
- You MUST NOT invent election rules, dates, forms, or procedures.
- You MUST classify political, persuasive, or legal questions as "out_of_scope".
- "out_of_scope" is the default when you are unsure.
- confidence must be a number between 0 and 1.
- recommended_flow_id must be null if the intent is "out_of_scope" or "learn_process".

Return ONLY this JSON object, no other text:
{
  "intent": "<one of the intents>",
  "confidence": <0.0-1.0>,
  "needs_clarification": <true|false>,
  "follow_up_question": "<clarifying question or null>",
  "user_friendly_summary": "<plain-language summary of what the user wants, max 300 chars>",
  "recommended_flow_id": "<flow id or null>"
}
`.trim();

export async function classifyIntent(message: string): Promise<ClassifyResponse> {
  const model = getGeminiModel();

  const prompt = `${CLASSIFY_SYSTEM_PROMPT}\n\nUser message: "${message}"`;
  const result = await model.generateContent(prompt);
  const rawText = result.response.text().trim();

  // Strip markdown code fences if present
  const cleaned = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini returned non-JSON response: ${rawText.slice(0, 200)}`);
  }

  // Validate against schema — halts if AI hallucinated extra fields or wrong types
  const validated = ClassifyResponseSchema.parse(parsed);

  // Enforce the recommended_flow_id from our own map, never trust the model's value
  const safeFlowId = INTENT_TO_FLOW_ID[validated.intent as CivicIntent] ?? null;
  return { ...validated, recommended_flow_id: safeFlowId };
}

// =============================================================================
// EXPLAIN
// =============================================================================
function buildExplainPrompt(flow: CivicFlow, preferSimple: boolean): string {
  const steps = flow.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join('\n');
  return `
You are a civic assistant for the India Election Guide.
Rewrite the following official steps about "${flow.title}" in ${preferSimple ? 'very simple, plain language for a first-time voter' : 'clear, friendly language'}.

Rules:
- Do NOT invent any new steps, rules, forms, dates, or eligibility criteria.
- Keep every step grounded in exactly what is written below.
- Return ONLY this JSON object, no other text:
{
  "summary": "<one sentence summary of the task, max 200 chars>",
  "steps": ["<step 1>", "<step 2>", ...]
}

Official steps:
${steps}
  `.trim();
}

export async function explainFlow(
  flow: CivicFlow,
  preferSimple = false
): Promise<ExplainResponse> {
  const model = getGeminiModel();
  const prompt = buildExplainPrompt(flow, preferSimple);
  const result = await model.generateContent(prompt);
  const rawText = result.response.text().trim();
  const cleaned = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Gemini returned non-JSON response: ${rawText.slice(0, 200)}`);
  }

  return ExplainResponseSchema.parse(parsed);
}
