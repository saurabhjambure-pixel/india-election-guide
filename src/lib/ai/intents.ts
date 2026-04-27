// Bounded set of civic intents this product handles.
// The AI may ONLY classify into one of these values.
export const CIVIC_INTENTS = [
  'register_new',
  'check_enrollment',
  'correct_details',
  'shift_residence',
  'find_polling_info',
  'show_timeline',
  'learn_process',
  'out_of_scope',
] as const;

export type CivicIntent = (typeof CIVIC_INTENTS)[number];

// Map intent to its official flow id in civic-data
export const INTENT_TO_FLOW_ID: Partial<Record<CivicIntent, string>> = {
  register_new: 'register-new',
  check_enrollment: 'check-enrollment',
  correct_details: 'correct-details',
  shift_residence: 'shift-residence',
  find_polling_info: 'polling-info',
};
