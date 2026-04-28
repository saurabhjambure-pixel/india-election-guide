import { describe, it, expect, vi } from 'vitest';
import { classifyIntent } from '../../src/lib/ai/civic-ai';
import fixtures from '../fixtures/intents.json';

// Mock the Gemini client
vi.mock('../../src/lib/ai/gemini-client', () => {
  return {
    getGeminiModel: vi.fn(() => ({
      generateContent: vi.fn().mockImplementation(({ contents }) => {
        const text = contents[0].parts[0].text;
        // Simple logic to mock the AI response based on the fixture mapping
        const fixture = fixtures.find(f => text.includes(f.input));
        
        let intent = 'out_of_scope';
        if (fixture) {
          intent = fixture.expected_intent;
        }

        return Promise.resolve({
          response: {
            text: () => JSON.stringify({
              intent: intent,
              confidence: 0.95,
              needs_clarification: false,
              follow_up_question: null,
              user_friendly_summary: 'Mock summary',
              recommended_flow_id: intent !== 'out_of_scope' && intent !== 'learn_process' ? intent : null
            })
          }
        });
      })
    }))
  };
});

describe('classifyIntent', () => {
  fixtures.forEach((fixture) => {
    it(`should correctly classify: "${fixture.input}" as ${fixture.expected_intent}`, async () => {
      const response = await classifyIntent(fixture.input);
      expect(response.intent).toBe(fixture.expected_intent);
    });
  });
});
