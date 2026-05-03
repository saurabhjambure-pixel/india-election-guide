import { describe, expect, it } from 'vitest'
import { redactSensitiveIds } from '@/lib/privacy'

describe('redactSensitiveIds', () => {
  it('redacts EPIC-like identifiers', () => {
    expect(redactSensitiveIds('My EPIC is ABC1234567')).toContain(
      '[redacted-epic]'
    )
  })

  it('redacts Aadhaar-like identifiers', () => {
    expect(redactSensitiveIds('My Aadhaar is 1234 5678 9012')).toContain(
      '[redacted-id]'
    )
  })
})
