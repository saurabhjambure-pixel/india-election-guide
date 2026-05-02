import { describe, it, expect, vi, beforeEach } from 'vitest';
import { classifyIntent } from '../src/lib/ai/civic-ai';
import * as geminiClient from '../src/lib/ai/gemini-client';

vi.mock('../src/lib/ai/gemini-client', () => ({
  getGeminiModel: vi.fn(),
}));

const mockGenerateContent = vi.fn();
const mockedGetGeminiModel = vi.mocked(geminiClient.getGeminiModel);
const mockedModel = {
  generateContent: mockGenerateContent,
} as unknown as NonNullable<ReturnType<typeof geminiClient.getGeminiModel>>;

describe('classifyIntent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedGetGeminiModel.mockReturnValue(mockedModel);
  });

  const FIXTURES = [
    {
      input: "How do I register for the first time?",
      expectedIntent: "register_new",
      responseBody: {
        intent: "register_new",
        confidence: 0.95,
        needs_clarification: false,
        follow_up_question: null,
        user_friendly_summary: "You want to register as a new voter.",
        recommended_flow_id: "register-new"
      }
    },
    {
      input: "Where do I vote?",
      expectedIntent: "find_polling_info",
      responseBody: {
        intent: "find_polling_info",
        confidence: 0.95,
        needs_clarification: false,
        follow_up_question: null,
        user_friendly_summary: "You want to find your polling booth.",
        recommended_flow_id: "polling-info"
      }
    },
    {
      input: "Who should I vote for?",
      expectedIntent: "out_of_scope",
      responseBody: {
        intent: "out_of_scope",
        confidence: 0.99,
        needs_clarification: false,
        follow_up_question: null,
        user_friendly_summary: "I cannot provide political advice.",
        recommended_flow_id: null
      }
    }
  ];

  it.each(FIXTURES)('should classify %s as %s', async ({ input, expectedIntent, responseBody }) => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => JSON.stringify(responseBody)
      }
    });

    const result = await classifyIntent(input);
    expect(result.intent).toBe(expectedIntent);
  });

  it('passes clarification context as untrusted user data', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => JSON.stringify({
          intent: 'shift_residence',
          confidence: 0.92,
          needs_clarification: false,
          follow_up_question: null,
          user_friendly_summary: 'You need help updating your address.',
          recommended_flow_id: 'shift-residence',
        }),
      },
    });

    await classifyIntent('I moved recently', 'User was asked for their old constituency');

    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    const request = mockGenerateContent.mock.calls[0][0] as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    };
    expect(request.contents[0]?.parts[0]?.text).toContain(
      '"context":"User was asked for their old constituency"'
    );
  });
});
