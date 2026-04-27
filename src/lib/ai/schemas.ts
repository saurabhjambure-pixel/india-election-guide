import { z } from 'zod';
import { CIVIC_INTENTS } from './intents';

// Schema for the classify endpoint response
export const ClassifyResponseSchema = z.object({
  intent: z.enum(CIVIC_INTENTS),
  confidence: z.number().min(0).max(1),
  needs_clarification: z.boolean(),
  follow_up_question: z.string().nullable(),
  user_friendly_summary: z.string().max(300),
  recommended_flow_id: z.string().nullable(),
});

export type ClassifyResponse = z.infer<typeof ClassifyResponseSchema>;

// Schema for the explain endpoint response
export const ExplainResponseSchema = z.object({
  summary: z.string().max(500),
  steps: z.array(z.string().max(300)).max(10),
});

export type ExplainResponse = z.infer<typeof ExplainResponseSchema>;
