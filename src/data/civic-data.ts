import { CivicFlow, SourceRef } from '@/lib/types/civic';

export const SOURCES: Record<string, SourceRef> = {
  'eci-voter-portal': {
    id: 'eci-voter-portal',
    name: 'Voters\' Service Portal',
    url: 'https://voters.eci.gov.in/',
    organization: 'Election Commission of India'
  },
  'sveep-general-voters': {
    id: 'sveep-general-voters',
    name: 'SVEEP - General Voters',
    url: 'https://ecisveep.nic.in/voters/general-voters/',
    organization: 'SVEEP'
  },
  'eci-electoral-search': {
    id: 'eci-electoral-search',
    name: 'Electoral Search',
    url: 'https://electoralsearch.eci.gov.in/',
    organization: 'Election Commission of India'
  },
  'eci-kyc': {
    id: 'eci-kyc',
    name: 'Know Your Polling Station',
    url: 'https://electoralsearch.eci.gov.in/pollingstation',
    organization: 'Election Commission of India'
  }
};

export const CIVIC_FLOWS: CivicFlow[] = [
  {
    id: 'register-new',
    intent: 'register_new',
    title: 'Register as a new voter',
    description: 'Understand eligibility and the registration path.',
    eligibilityNote: 'You must be an Indian citizen, 18 years or older on the qualifying date, and ordinarily resident of the polling area.',
    steps: [
      {
        id: 'step-1',
        title: 'Fill Form 6',
        body: 'To register as a new voter, you need to fill Form 6 on the official Voters\' Service Portal.',
        sourceIds: ['eci-voter-portal', 'sveep-general-voters']
      }
    ],
    requiredInfo: ['Passport size photograph', 'Age proof (e.g., Birth Certificate, Aadhaar)', 'Address proof (e.g., Aadhaar, Utility Bill)'],
    nextActions: [
      { label: 'Start Form 6 Registration', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: ['Do not submit multiple Form 6 applications.'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'check-enrollment',
    intent: 'check_enrollment',
    title: 'Check Enrollment Status',
    description: 'Verify if your name is already on the electoral roll.',
    steps: [
      {
        id: 'step-1',
        title: 'Search Electoral Roll',
        body: 'Use the official Electoral Search portal to find your name using your details or EPIC number.',
        sourceIds: ['eci-electoral-search']
      }
    ],
    nextActions: [
      { label: 'Search by Details/EPIC', href: 'https://electoralsearch.eci.gov.in/', type: 'external' }
    ],
    warnings: [],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'correct-details',
    intent: 'correct_details',
    title: 'Correct Voter Details',
    description: 'Fix spelling mistakes, age, or address issues on your voter ID.',
    steps: [
      {
        id: 'step-1',
        title: 'Fill Form 8',
        body: 'Submit Form 8 on the Voters\' portal and select the option for correction of entries.',
        sourceIds: ['eci-voter-portal']
      }
    ],
    requiredInfo: ['Your EPIC Number', 'Documentary proof for the correction (e.g., correct spellings on Aadhaar)'],
    nextActions: [
      { label: 'Submit Form 8', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: [],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'shift-residence',
    intent: 'shift_residence',
    title: 'Shift Residence',
    description: 'Update your address if you moved to a new place.',
    steps: [
      {
        id: 'step-1',
        title: 'Fill Form 8 for Shifting',
        body: 'Submit Form 8 on the Voters\' portal and select "Shifting of Residence". This works for shifting within or outside the assembly constituency.',
        sourceIds: ['eci-voter-portal']
      }
    ],
    requiredInfo: ['EPIC Number', 'New Address Proof'],
    nextActions: [
      { label: 'Submit Form 8', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: ['You should only be registered at one location. Do not fill a new Form 6 if you already have an EPIC number.'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'polling-info',
    intent: 'find_polling_info',
    title: 'Find Your Polling Station',
    description: 'Know where to go and vote on election day.',
    steps: [
      {
        id: 'step-1',
        title: 'Use Know Your Polling Station Tool',
        body: 'Enter your EPIC number on the Electoral Search portal to find your exact polling booth.',
        sourceIds: ['eci-kyc']
      }
    ],
    nextActions: [
      { label: 'Find Polling Station', href: 'https://electoralsearch.eci.gov.in/pollingstation', type: 'external' }
    ],
    warnings: [],
    updatedAt: new Date().toISOString()
  }
];
