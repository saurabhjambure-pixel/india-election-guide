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
    description: 'Step-by-step guide to registering on the electoral roll for the first time using Form 6.',
    eligibilityNote: 'You must be an Indian citizen, 18 years or older on the qualifying date (January 1 of the year of revision), and ordinarily resident at the address you are registering with.',
    steps: [
      {
        id: 'step-1',
        title: 'Confirm your eligibility',
        body: 'You are eligible to register if: (1) You are an Indian citizen. (2) You are 18 years or older on January 1 of the current year\'s roll revision. (3) You live at the address you want to register — this must be your ordinary place of residence, not a temporary address.',
        sourceIds: ['sveep-general-voters']
      },
      {
        id: 'step-2',
        title: 'Gather your documents',
        body: 'You will need: (1) A recent passport-size photograph. (2) Age proof — Aadhaar card, birth certificate, school leaving certificate, or passport. (3) Address proof — Aadhaar card, utility bill (electricity/water/gas), bank passbook with address, or rent agreement. Note: the same Aadhaar can serve as both age proof and address proof if it shows your current address.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-3',
        title: 'Fill Form 6 on the Voters\' Service Portal',
        body: 'Go to the Voters\' Service Portal (voters.eci.gov.in) and click "New Registration (Form 6)". Create an account or log in, then fill in your personal details, upload your photograph and documents, and select your constituency based on your current address. Alternatively, download Form 6, fill it offline, and submit it to your local Booth Level Officer (BLO).',
        sourceIds: ['eci-voter-portal', 'sveep-general-voters']
      },
      {
        id: 'step-4',
        title: 'Submit and note your reference number',
        body: 'After submitting online, you will receive a reference number (Application ID). Save this — you will need it to track the status of your application. The Electoral Registration Officer (ERO) may contact you for verification.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-5',
        title: 'Track your application status',
        body: 'Log in to the Voters\' Service Portal and enter your Application ID to check the status. Processing typically takes 30–45 days. Your application may be accepted, queried (if documents are insufficient), or rejected (with a reason given). You can appeal a rejection to the ERO.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-6',
        title: 'Collect your EPIC card',
        body: 'Once approved, your Electors\' Photo Identity Card (EPIC / Voter ID) will be delivered to your registered address by your Booth Level Officer (BLO), or you can collect it from the ERO office. You can also download an e-EPIC (digital voter ID) from the Voters\' Service Portal — this is accepted as valid identity at polling booths.',
        sourceIds: ['eci-voter-portal']
      }
    ],
    requiredInfo: [
      'Passport-size photograph',
      'Age proof: Aadhaar card, birth certificate, school leaving certificate, or passport',
      'Address proof: Aadhaar card, utility bill (electricity/water/gas), bank passbook with address, or rent agreement'
    ],
    documents: [
      {
        category: 'age',
        name: 'Age Proof',
        note: 'Proves you are 18+ on the qualifying date. One document required.',
        examples: ['Aadhaar card (with date of birth)', 'Birth certificate', 'Class 10 school leaving certificate / mark sheet', 'Passport', 'PAN card']
      },
      {
        category: 'address',
        name: 'Address Proof',
        note: 'Must show your current residential address — the one you are registering at. One document required.',
        examples: ['Aadhaar card (if it shows current address)', 'Electricity / water / gas bill (within last 3 months)', 'Bank or post office passbook with address', 'Rent agreement', 'Passport']
      },
      {
        category: 'identity',
        name: 'Photograph',
        note: 'Recent passport-size photograph with a plain light background.',
        examples: ['Passport-size photo (colour, recent)']
      }
    ],
    nextActions: [
      { label: 'Start Form 6 Registration', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: [
      'Do not submit multiple Form 6 applications for the same address — duplicate submissions can cause delays or rejection.',
      'If you already have an EPIC number from a previous address, do not fill Form 6 again. Use Form 8 (Shift of Residence) instead.'
    ],
    updatedAt: '2026-04-30T00:00:00Z'
  },

  {
    id: 'check-enrollment',
    intent: 'check_enrollment',
    title: 'Check Enrollment Status',
    description: 'Verify whether your name is on the electoral roll before election day.',
    steps: [
      {
        id: 'step-1',
        title: 'Search by your personal details',
        body: 'Go to electoralsearch.eci.gov.in and click "Search by Details". Enter your name, date of birth, and state/district. The search will show if your name appears on the electoral roll, along with your polling station.',
        sourceIds: ['eci-electoral-search']
      },
      {
        id: 'step-2',
        title: 'Search by EPIC number (faster)',
        body: 'If you have your Voter ID card (EPIC), click "Search by EPIC No." on the Electoral Search portal and enter the 10-character EPIC number printed on your card. This is the quickest and most accurate way to verify enrollment.',
        sourceIds: ['eci-electoral-search']
      },
      {
        id: 'step-3',
        title: 'If your name is not found',
        body: 'If your name does not appear: (1) Check if you registered recently — new registrations may take up to 45 days to reflect. (2) Try alternate spellings of your name. (3) Contact your Booth Level Officer (BLO) — they maintain the local electoral roll and can check manually. (4) Call the national Voter Helpline: 1950.',
        sourceIds: ['eci-electoral-search', 'sveep-general-voters']
      },
      {
        id: 'step-4',
        title: 'Download or print your enrollment slip',
        body: 'Once found, you can download a print-out of your electoral details showing your polling station. Keep this for reference on election day. You can also download your e-EPIC (digital voter ID) from the Voters\' Service Portal if you haven\'t received a physical card.',
        sourceIds: ['eci-electoral-search', 'eci-voter-portal']
      }
    ],
    nextActions: [
      { label: 'Search Electoral Roll', href: 'https://electoralsearch.eci.gov.in/', type: 'external' }
    ],
    warnings: [
      'Your name must be on the roll before election day — you cannot vote using only your Aadhaar or other identity documents if your name is absent from the electoral roll.',
      'The voter roll is updated periodically. Always check close to the election date.'
    ],
    updatedAt: '2026-04-30T00:00:00Z'
  },

  {
    id: 'correct-details',
    intent: 'correct_details',
    title: 'Correct Voter Details',
    description: 'Fix errors in your name, date of birth, photo, or other details on the electoral roll using Form 8.',
    steps: [
      {
        id: 'step-1',
        title: 'Identify the error on your voter record',
        body: 'First verify the error by checking your current details on the Electoral Search portal (electoralsearch.eci.gov.in) or by looking at your physical EPIC card. Common errors: misspelled name, wrong date of birth, wrong father/mother/spouse name, or outdated photo.',
        sourceIds: ['eci-electoral-search']
      },
      {
        id: 'step-2',
        title: 'Gather supporting documents',
        body: 'You will need documentary proof for the correction. (1) Name/spelling correction: Aadhaar card, PAN card, passport, or school leaving certificate showing the correct spelling. (2) Date of birth correction: birth certificate, school leaving certificate, Aadhaar, or passport. (3) Address correction: use Shift of Residence (Form 8) instead — see the separate guide.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-3',
        title: 'Fill and submit Form 8 online',
        body: 'Go to voters.eci.gov.in, log in, and select "Correction of Entries in Electoral Roll (Form 8)". Fill in your EPIC number, the field you want to correct, and the correct value. Upload a clear scan of your supporting document. Submit the form — you will get a reference number.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-4',
        title: 'Track your correction request',
        body: 'Use your reference number on the Voters\' Service Portal to track the status. The ERO may call or visit for verification. Processing typically takes 30–45 days after the summary revision period begins.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-5',
        title: 'Receive your corrected EPIC',
        body: 'Once the correction is approved and the roll is published, your details will be updated. You can download an updated e-EPIC from the portal, or collect a new physical EPIC card from your BLO or ERO office.',
        sourceIds: ['eci-voter-portal']
      }
    ],
    requiredInfo: [
      'Your current EPIC Number',
      'Proof of the correct detail: Aadhaar card, PAN card, birth certificate, passport, or school leaving certificate'
    ],
    documents: [
      {
        category: 'identity',
        name: 'Your EPIC Number',
        note: 'The 10-character alphanumeric number on your current Voter ID card. Required to identify your existing record.',
        examples: ['Printed on your EPIC / Voter ID card (e.g. ABC1234567)']
      },
      {
        category: 'other',
        name: 'Correction Proof',
        note: 'Document showing the correct version of the detail you want to fix. Must clearly show your name as it should appear.',
        examples: ['Aadhaar card', 'PAN card', 'Passport', 'Class 10 certificate (for name or DOB correction)', 'Birth certificate']
      }
    ],
    nextActions: [
      { label: 'Submit Form 8 for Correction', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: [
      'Corrections are only processed during designated Summary Revision periods. If corrections are not open, your request will be queued for the next revision cycle.',
      'Do not submit multiple correction requests for the same field — this may cause delays.'
    ],
    updatedAt: '2026-04-30T00:00:00Z'
  },

  {
    id: 'shift-residence',
    intent: 'shift_residence',
    title: 'Shift Residence',
    description: 'Update your registered address when you move to a new home using Form 8.',
    steps: [
      {
        id: 'step-1',
        title: 'Understand what this process covers',
        body: 'Form 8 for "Shifting of Residence" handles two scenarios: (1) Moving within the same assembly constituency — your part number changes but the constituency stays the same. (2) Moving to a different assembly constituency — your name will be deleted from the old roll and added to the new one. Both are handled through the same Form 8 process.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-2',
        title: 'Gather your new address proof',
        body: 'You will need proof of your new address. Acceptable documents: Aadhaar card with new address, utility bill (electricity/water/gas, not older than 3 months), bank passbook/statement with new address, rent agreement, or passport with new address. Make sure the document clearly shows your full name and the new address.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-3',
        title: 'Fill Form 8 online — select "Shifting of Residence"',
        body: 'Go to voters.eci.gov.in, log in, and select "Shifting of Residence (Form 8)". Enter your current EPIC number, your new address, and your new constituency (the portal will help you identify it). Upload your new address proof. Submit — you will receive a reference number.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-4',
        title: 'Track and await verification',
        body: 'Track your application using your reference number on the Voters\' Service Portal. The BLO for your new address will verify your residency in person. Be available at your new address for this visit. Processing takes 30–45 days.',
        sourceIds: ['eci-voter-portal']
      },
      {
        id: 'step-5',
        title: 'Confirm your new enrollment',
        body: 'Once approved, verify your updated address on the Electoral Search portal (electoralsearch.eci.gov.in). You will be listed at your new address with a new part/serial number. Download an updated e-EPIC from the portal showing the new constituency.',
        sourceIds: ['eci-electoral-search', 'eci-voter-portal']
      }
    ],
    requiredInfo: [
      'Your current EPIC Number',
      'New address proof: Aadhaar card, utility bill (within 3 months), bank passbook/statement, rent agreement, or passport — all showing the new address'
    ],
    documents: [
      {
        category: 'identity',
        name: 'Your EPIC Number',
        note: 'Required to locate your existing registration before the shift is processed.',
        examples: ['Printed on your Voter ID card — 10 characters (e.g. ABC1234567)']
      },
      {
        category: 'address',
        name: 'New Address Proof',
        note: 'Must show your full new address clearly. Must be in your name.',
        examples: ['Aadhaar card (if updated to new address)', 'Electricity / water / gas bill — dated within last 3 months', 'Bank or post office passbook / statement', 'Rent agreement / lease deed', 'Passport']
      }
    ],
    nextActions: [
      { label: 'Submit Form 8 for Address Change', href: 'https://voters.eci.gov.in/', type: 'external' }
    ],
    warnings: [
      'You should only be registered at one address. Do not fill a new Form 6 if you already have an EPIC number — use Form 8 for address changes.',
      'If you recently moved and your Aadhaar still shows your old address, use an alternative address proof document (utility bill, rent agreement) until you update your Aadhaar.'
    ],
    updatedAt: '2026-04-30T00:00:00Z'
  },

  {
    id: 'polling-info',
    intent: 'find_polling_info',
    title: 'Find Your Polling Station',
    description: 'Locate your assigned polling booth and understand what to bring on election day.',
    steps: [
      {
        id: 'step-1',
        title: 'Search for your polling station',
        body: 'Go to electoralsearch.eci.gov.in/pollingstation and enter your EPIC number. The portal will show your exact polling booth — name of the school/building, full address, and the area it covers. Write this down or screenshot it before election day.',
        sourceIds: ['eci-kyc']
      },
      {
        id: 'step-2',
        title: 'Confirm your voter slip details',
        body: 'Before election day, verify your name, part number, and serial number on the electoral roll via Electoral Search. These details must match what the polling officer reads from their list. Your serial number (क्रमांक / S.No.) is how you are located in the booth register.',
        sourceIds: ['eci-electoral-search']
      },
      {
        id: 'step-3',
        title: 'Know what to bring on election day',
        body: 'Bring any ONE of these accepted photo identity documents: Aadhaar card, EPIC (Voter ID), PAN card, passport, driving licence, MGNREGA job card, health insurance smart card issued by Ministry of Labour, service identity card with photo (government employees), passbook with photo from bank/post office, or pension document with photo. Your EPIC is not mandatory — any of the above is sufficient.',
        sourceIds: ['eci-voter-portal', 'sveep-general-voters']
      },
      {
        id: 'step-4',
        title: 'What to expect at the polling booth',
        body: 'Arrive at your polling station on election day during polling hours (typically 7 AM – 6 PM, varies by constituency). Present your identity document. The polling officer will verify your name in the register. You will receive a voter slip and proceed to the voting compartment. The entire process takes around 5–10 minutes.',
        sourceIds: ['sveep-general-voters']
      }
    ],
    nextActions: [
      { label: 'Find My Polling Station', href: 'https://electoralsearch.eci.gov.in/pollingstation', type: 'external' }
    ],
    warnings: [
      'Your name must be on the electoral roll at your assigned booth — you cannot vote at a booth where your name is not listed, even if you live nearby.',
      'Polling hours vary by constituency and phase. Check the ECI notification for your specific constituency\'s timings.'
    ],
    updatedAt: '2026-04-30T00:00:00Z'
  }
];
