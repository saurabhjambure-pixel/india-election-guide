import { describe, it, expect } from 'vitest'
import { CIVIC_FLOWS, SOURCES } from '@/data/civic-data'

// ---------------------------------------------------------------------------
// Civic data integrity tests — no AI calls, pure deterministic assertions
// ---------------------------------------------------------------------------

describe('CIVIC_FLOWS integrity', () => {
  it('every flow has a non-empty id', () => {
    CIVIC_FLOWS.forEach((f) => {
      expect(f.id).toBeTruthy()
    })
  })

  it('every step in every flow references at least one source', () => {
    CIVIC_FLOWS.forEach((flow) => {
      flow.steps.forEach((step) => {
        expect(step.sourceIds.length).toBeGreaterThan(0)
      })
    })
  })

  it('every source referenced in steps exists in SOURCES map', () => {
    CIVIC_FLOWS.forEach((flow) => {
      flow.steps.forEach((step) => {
        step.sourceIds.forEach((sourceId) => {
          expect(SOURCES[sourceId]).toBeDefined()
        })
      })
    })
  })

  it('every next action href is an official ECI or government domain', () => {
    const ALLOWLISTED_DOMAINS = [
      'voters.eci.gov.in',
      'electoralsearch.eci.gov.in',
      'ecisveep.nic.in',
      'eci.gov.in',
      'nvsp.in',
    ]
    CIVIC_FLOWS.forEach((flow) => {
      flow.nextActions.forEach((action) => {
        if (action.type === 'external') {
          const url = new URL(action.href)
          const isAllowed = ALLOWLISTED_DOMAINS.some((d) =>
            url.hostname.endsWith(d)
          )
          expect(
            isAllowed,
            `${action.href} is not from an allowlisted domain`
          ).toBe(true)
        }
      })
    })
  })

  it('no flow has an empty title or description', () => {
    CIVIC_FLOWS.forEach((f) => {
      expect(f.title.trim()).toBeTruthy()
      expect(f.description.trim()).toBeTruthy()
    })
  })
})

describe('SOURCES integrity', () => {
  it('every source has a valid https url', () => {
    Object.values(SOURCES).forEach((s) => {
      expect(s.url).toMatch(/^https:\/\//)
    })
  })

  it('every source has an organization', () => {
    Object.values(SOURCES).forEach((s) => {
      expect(s.organization.trim()).toBeTruthy()
    })
  })
})
