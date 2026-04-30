import { describe, it, expect } from 'vitest';
import { ClassifyResponseSchema, ExplainResponseSchema } from '@/lib/ai/schemas';
import { INTENT_TO_FLOW_ID } from '@/lib/ai/intents';

// ---------------------------------------------------------------------------
// Schema validation unit tests (no Gemini API calls — pure Zod)
// ---------------------------------------------------------------------------

describe('ClassifyResponseSchema', () => {
  it('accepts a valid register_new response', () => {
    const input = {
      intent: 'register_new',
      confidence: 0.97,
      needs_clarification: false,
      follow_up_question: null,
      user_friendly_summary: 'You want to register as a new voter.',
      recommended_flow_id: 'register-new',
    };
    expect(() => ClassifyResponseSchema.parse(input)).not.toThrow();
  });

  it('rejects an unknown intent', () => {
    const input = {
      intent: 'vote_for_candidate', // not in our taxonomy
      confidence: 0.9,
      needs_clarification: false,
      follow_up_question: null,
      user_friendly_summary: 'Vote for candidate X',
      recommended_flow_id: null,
    };
    expect(() => ClassifyResponseSchema.parse(input)).toThrow();
  });

  it('rejects confidence > 1', () => {
    const input = {
      intent: 'register_new',
      confidence: 1.5,
      needs_clarification: false,
      follow_up_question: null,
      user_friendly_summary: 'ok',
      recommended_flow_id: null,
    };
    expect(() => ClassifyResponseSchema.parse(input)).toThrow();
  });

  it('accepts out_of_scope with null flow id', () => {
    const input = {
      intent: 'out_of_scope',
      confidence: 0.8,
      needs_clarification: false,
      follow_up_question: null,
      user_friendly_summary: 'This question is outside the scope.',
      recommended_flow_id: null,
    };
    expect(() => ClassifyResponseSchema.parse(input)).not.toThrow();
  });
});

describe('ExplainResponseSchema', () => {
  it('accepts a valid explain response', () => {
    const input = {
      summary: 'To register, fill Form 6 on the official portal.',
      steps: ['Check eligibility', 'Fill Form 6', 'Submit documents'],
    };
    expect(() => ExplainResponseSchema.parse(input)).not.toThrow();
  });

  it('rejects if steps exceed 10 items', () => {
    const input = {
      summary: 'Summary',
      steps: Array(11).fill('Step'),
    };
    expect(() => ExplainResponseSchema.parse(input)).toThrow();
  });
});

describe('INTENT_TO_FLOW_ID', () => {
  it('maps register_new to register-new', () => {
    expect(INTENT_TO_FLOW_ID['register_new']).toBe('register-new');
  });

  it('maps check_enrollment to check-enrollment', () => {
    expect(INTENT_TO_FLOW_ID['check_enrollment']).toBe('check-enrollment');
  });

  it('does not map out_of_scope', () => {
    expect(INTENT_TO_FLOW_ID['out_of_scope']).toBeUndefined();
  });
});
