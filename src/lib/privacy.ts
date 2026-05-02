const EPIC_PATTERN = /\b[A-Z]{3}\d{7}\b/gi;
const AADHAAR_PATTERN = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;

export function redactSensitiveIds(input: string): string {
  return input
    .replace(EPIC_PATTERN, '[redacted-epic]')
    .replace(AADHAAR_PATTERN, '[redacted-id]');
}
