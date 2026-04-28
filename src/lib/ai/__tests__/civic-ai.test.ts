import { describe, it, expect, vi } from 'vitest';
import { classifyIntent, explainFlow } from '../civic-ai';
import * as geminiClient from '../gemini-client';

vi.mock('../gemini-client', () => ({
  getGeminiModel: vi.fn(),
}));

describe('civic-ai', () => {
  it('classifyIntent parses valid response and assigns safe flow id', async () => {
    const mockResponse = {
      response: {
        text: () => JSON.stringify({
          intent: 'register_new',
          confidence: 0.9,
          needs_clarification: false,
          follow_up_question: null,
          user_friendly_summary: 'You want to register.',
          recommended_flow_id: 'random-bad-id',
        }),
      },
    };

    vi.mocked(geminiClient.getGeminiModel).mockReturnValue({
      generateContent: vi.fn().mockResolvedValue(mockResponse),
    } as any);

    const result = await classifyIntent('How do I register?');
    expect(result.intent).toBe('register_new');
    expect(result.recommended_flow_id).toBe('register-new'); // overriden by INTENT_TO_FLOW_ID
  });

  it('explainFlow parses valid response', async () => {
    const mockResponse = {
      response: {
        text: () => JSON.stringify({
          summary: 'Simple summary',
          steps: ['Step 1'],
        }),
      },
    };

    vi.mocked(geminiClient.getGeminiModel).mockReturnValue({
      generateContent: vi.fn().mockResolvedValue(mockResponse),
    } as any);

    const flow = { id: 'test', title: 'Test', steps: [], nextActions: [], warnings: [], description: '' } as any;
    const result = await explainFlow(flow, true);
    expect(result.summary).toBe('Simple summary');
    expect(result.steps).toHaveLength(1);
  });
});
