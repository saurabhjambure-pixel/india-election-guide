# India Election Guide

> **Disclaimer:** This application is an informational assistant designed to guide users through civic processes in India. It is not an official authority, nor is it affiliated with the Election Commission of India (ECI). Users are directed to official government portals (e.g., [voters.eci.gov.in](https://voters.eci.gov.in)) for all final actions and submissions.

## 1. Chosen Vertical

**Civic Education and Voter Guidance (India Focus)**
The product focuses on demystifying the complex electoral processes governed by the Election Commission of India (ECI) and the Systematic Voters' Education and Electoral Participation (SVEEP) program. It empowers citizens to understand their voting rights, eligibility, and the exact steps required to participate in Indian democracy.

## 2. Approach and Logic

| Feature                             | Design Decision                                                                   | Rationale                                                                                                                                                                                           |
| :---------------------------------- | :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Guided-Flow vs. Generic Chatbot** | Implemented structured, deterministic flows over an open-ended conversational UI. | Ensures users receive standardized, accurate civic information without the risk of AI hallucination in critical procedural details.                                                                 |
| **Two-Tier Architecture**           | Separation of a deterministic civic content layer and an AI explanation layer.    | Core procedures remain hardcoded and safe. The AI is utilized strictly to parse complex user queries and route them to the correct deterministic flow.                                              |
| **Resource Safety**                 | **Strict Rate Limiting** (3 queries/day per user) for all AI features.            | Prevents API abuse, manages costs, and ensures fair access for all users during the judging period.                                                                                                 |
| **Official-Source-First**           | All actionable advice culminates in direct links to official portals.             | Maintains trust and security by ensuring users only submit PII on official government infrastructure.                                                                                               |
| **Gemini Integration**              | Used as an intelligent router (Classification API) and content summarizer.        | Gemini interprets natural language intents to suggest the right civic flow. It is strictly prompt-engineered to _prevent_ giving political opinions, legal advice, or acting on behalf of the user. |

## 3. How the Solution Works

### User Journey Walkthrough

1.  **Homepage:** The user is presented with a search bar and quick-action cards for common civic processes.
2.  **Intent Classification:** When a user types a query (e.g., "I just moved to Bangalore"), the `api/classify` endpoint uses Gemini to determine the underlying civic intent.
3.  **Flow Routing:** The user is seamlessly routed to the correct deterministic flow (e.g., "Shift Residence").
4.  **Actionable Output:** The flow provides step-by-step guidance, required documents, and a direct link to the relevant ECI portal (e.g., Form 8).
5.  **Explain with AI:** If a user finds the formal steps complex, they can click "Explain in simple language" to get a Gemini-powered brief of that specific flow.

### Core Features

- **Registration Flows:** Guides for first-time voters (Form 6), NRI registration (Form 6A), and details on required age and residency proofs.
- **Required Documents Guide:** A dedicated section on `/learn` that provides a clear matrix of accepted documents for age, address, and photo ID across different forms.
- **Voter Glossary:** A comprehensive dictionary of Indian electoral terms (EPIC, BLO, ERO, etc.) with anchor-link accessibility from anywhere in the app.
- **Election Timelines:** A dynamic timeline tracking upcoming state and general elections. It includes an AI-powered summary banner that highlights the most immediate milestones.
- **Enrollment & Correction:** Direct links and procedural help for verifying names on the electoral roll and correcting record errors via Form 8.

### AI Implementation Details

- **Classification (`api/classify`):** Uses Gemini with structured output to map natural language to internal `flowId`s. Treats user input as untrusted data with strict JSON validation.
- **Explanation (`api/explain`):** Provides a simplified, step-by-step breakdown of official flows. Uses IP-based rate limiting to prevent quota exhaustion.
- **Timeline Summary:** Summarizes Firestore timeline records into a high-signal brief. Includes logic to correctly distinguish between "Upcoming" and "Pending" statuses.

### UI Trust Indicators

- **Source Chips:** Every piece of procedural advice is tagged with visual "Source Chips" indicating the origin of the information (e.g., "Source: ECI Guidelines").
- **Official Links Only:** A security helper ensures all external calls-to-action direct exclusively to verified `.gov.in` and `.nic.in` domains.
- **Lucide Icons:** Uses a curated set of Lucide icons for high-contrast, accessible visual cues.

## 4. Assumptions Made

- **Official Sources:** All procedural content is based on publicly available information from the ECI and SVEEP guidelines as of May 2026.
- **Deferred Execution:** The application assumes the role of a _guide_. It explicitly does not collect application forms or upload documents to the government on the user's behalf.
- **AI Safety Tradeoffs:** The system trades conversational flexibility for safety. If the AI cannot confidently map a query to a verified civic flow, it falls back to a generic help state.
- **Excluded Scope:** The product explicitly excludes providing political commentary, candidate information, voting recommendations, or legal interpretation.

## 5. Google Services Integration

| Service                  | Contribution to Product                                                                                                                                         |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gemini API**           | Powers intent classification, plain-language flow explanation, and the Timeline summary card. Uses structured JSON output and explicit safety settings.         |
| **Firestore**            | Stores structured civic flows, source metadata, and timeline records. The app uses a real-time data layer with local fallback support.                          |
| **Firebase App Hosting** | Next.js SSR and API routes are deployed via Cloud Run (integrated with Firebase App Hosting) for high availability and low latency in the `asia-south1` region. |
| **Firebase Analytics**   | Tracks usage via `ai_explain_used`, `flow_completed`, `task_selected`, and `out_of_scope_triggered` to improve guidance accuracy.                               |

## 6. Judging Rubric Alignment

- **Code Quality:** Built with Next.js 16+, TypeScript, and Lucide React. Employs modular components, strict type checking (`zod`), and standardized formatting.
- **Security:** Implements **strict rate limiting** on AI endpoints and a **domain allow-list** for external links. Hides all sensitive keys in server-side environment variables.
- **Efficiency:** Uses server-side caching (`stale-while-revalidate`) for AI explanations and static generation for content pages. Firestore queries are optimized for retrieval.
- **Testing:** Comprehensive suite utilizing Vitest for unit tests and Playwright for end-to-end flow validation and accessibility smoke checks.
- **Accessibility:** Implements semantic HTML, anchor-navigation for the glossary, and adheres to WCAG 2.1 guidelines.
- **Google Services:** Deeply integrated with Firebase (Hosting, Firestore, Analytics) and the Gemini Pro model.

---

## Local Setup

### Prerequisites

- Node.js (v20+)
- `pnpm`
- Google Gemini API Key
- Firebase Project Credentials

### Installation

1.  **Clone and install:**

    ```bash
    git clone <repository-url>
    cd india-election-guide
    pnpm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file:

    ```env
    GEMINI_API_KEY=...
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    # ... other standard Firebase keys
    ```

3.  **Seed Firestore (Optional):**

    ```bash
    pnpm run seed:firestore
    ```

4.  **Run Development:**
    ```bash
    pnpm run dev
    ```

### Testing & Verification

- **Unit Tests:** `pnpm run test`
- **E2E Tests:** `pnpm run test:e2e`
- **Link Check:** `pnpm exec tsx scripts/verify-links.ts`
- **Lint:** `pnpm run lint`
