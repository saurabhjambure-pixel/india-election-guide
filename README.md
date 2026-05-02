# India Election Guide

> **Disclaimer:** This application is an informational assistant designed to guide users through civic processes in India. It is not an official authority, nor is it affiliated with the Election Commission of India (ECI). Users are directed to official government portals (e.g., voters.eci.gov.in) for all final actions and submissions.

## 1. Chosen Vertical
**Civic Education and Voter Guidance (India Focus)**
The product focuses on demystifying the complex electoral processes governed by the Election Commission of India (ECI) and the Systematic Voters' Education and Electoral Participation (SVEEP) program. It empowers citizens to understand their voting rights, eligibility, and the exact steps required to participate in Indian democracy.

## 2. Approach and Logic

| Feature | Design Decision | Rationale |
| :--- | :--- | :--- |
| **Guided-Flow vs. Generic Chatbot** | Implemented structured, deterministic flows over an open-ended conversational UI. | Ensures users receive standardized, accurate civic information without the risk of AI hallucination in critical procedural details. |
| **Two-Tier Architecture** | Separation of a deterministic civic content layer and an AI explanation layer. | Core procedures remain hardcoded and safe. The AI is utilized strictly to parse complex user queries and route them to the correct deterministic flow. |
| **Official-Source-First** | All actionable advice culminates in direct links to official portals. | Maintains trust and security by ensuring users only submit PII on official government infrastructure. |
| **Gemini Integration** | Used as an intelligent router (Classification API) and content summarizer. | Gemini interprets natural language intents to suggest the right civic flow. It is strictly prompt-engineered to *prevent* giving political opinions, legal advice, or acting on behalf of the user. |

## 3. How the Solution Works

### User Journey Walkthrough
1. **Homepage:** The user is presented with a search bar and quick-action cards for common civic processes.
2. **Intent Classification:** When a user types a query (e.g., "I just moved to Bangalore"), the `api/classify` endpoint uses Gemini to determine the underlying civic intent.
3. **Flow Routing:** The user is seamlessly routed to the correct deterministic flow (e.g., "Shift Residence").
4. **Actionable Output:** The flow provides step-by-step guidance, required documents, and a direct link to the relevant ECI portal (e.g., Form 8).

### Core Flows
*   **Registration:** Guides first-time voters (18+ citizens) on submitting Form 6, detailing the required age and residency proofs.
*   **Enrollment Check:** Directs users to the Electoral Search portal to verify their name on the electoral roll.
*   **Correction:** Explains how to use Form 8 to correct typos or outdated information in existing voter records.
*   **Shift Residence:** Clarifies the process for migrating a voter ID to a new constituency, also utilizing Form 8.
*   **Polling Info:** Helps users locate their designated polling station ahead of election day.
*   **Election Timelines:** A dynamic timeline tracking upcoming state and general election phases based on official ECI schedules.

### AI Classify Endpoint (`api/classify`)
This Next.js Route Handler uses the Gemini API with structured output generation (Zod validation). It receives the user's natural language input and returns a strictly typed JSON response containing the classified intent (e.g., `REGISTRATION`, `CORRECTION`) and a brief, helpful explanation.

### UI Trust Indicators
*   **Source Chips:** Every piece of procedural advice is tagged with visual "Source Chips" indicating the origin of the information (e.g., "Source: ECI Guidelines").
*   **Official Links:** All external calls-to-action are clearly marked as external links and direct exclusively to `.gov.in` domains.

## 4. Assumptions Made

*   **Official Sources:** All procedural content is based on publicly available information from the ECI (voters.eci.gov.in) and SVEEP guidelines.
*   **Deferred Execution:** The application assumes the role of a *guide*. It explicitly does not collect application forms, upload documents, or submit requests to the government on the user's behalf.
*   **AI Safety Tradeoffs:** The system trades conversational flexibility for safety. If the AI cannot confidently map a query to a verified civic flow, it falls back to a generic help state rather than attempting to generate an unverified answer.
*   **Excluded Scope:** The product explicitly excludes providing political commentary, candidate information, voting recommendations, or legal interpretation of electoral law.

## 5. Google Services Integration

| Service | Contribution to Product |
| :--- | :--- |
| **Gemini API** | Powers the core natural language understanding. It drives the `api/classify` endpoint, matching user queries to appropriate civic flows with high accuracy and strict schema validation. |
| **Firestore** | Serves as the database for the deterministic civic content layer, storing structured data for flows, timelines, and FAQs, enabling rapid updates without code deployment. |
| **Firebase Analytics** | Tracks user engagement with different civic flows, helping identify which processes citizens find most confusing or seek help with most frequently. |
| **Firebase Hosting** | Provides fast, secure, globally distributed hosting for the Next.js application, ensuring high availability during traffic spikes around election events. |

## 6. Judging Rubric Alignment

*   **Code Quality:** Built with Next.js 16+, TypeScript, and Tailwind CSS. Employs modular components, strict type checking (`zod`), and standardized formatting (`prettier`, `eslint`).
*   **Security:** Avoids collecting sensitive PII by deferring all actual applications to official portals. Server-side API routes hide Gemini API keys from the client.
*   **Efficiency:** Uses static generation where possible and lightweight AI classification endpoints. Firestore queries are optimized for fast content retrieval.
*   **Testing:** Comprehensive test suite utilizing Vitest for unit/integration testing and Playwright for end-to-end user flow validation.
*   **Accessibility:** Implements semantic HTML, ARIA attributes, keyboard navigation, and adheres to WCAG guidelines. Validated using `axe-core`.
*   **Google Services:** Deeply integrated with the Firebase ecosystem (Hosting, Firestore, Analytics) and heavily reliant on the Gemini API for its core value proposition.

---

## Local Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v20 or higher)
*   `pnpm` (The project uses pnpm for dependency management)
*   A Google Gemini API Key
*   A Firebase Project configuration

### Installation

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone <repository-url>
    cd india-election-guide
    pnpm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the necessary keys:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    # Add your Firebase configuration variables here
    ```

3.  **Seed the Database (Optional but recommended):**
    Populate your local Firestore instance with the baseline civic data:
    ```bash
    pnpm run seed:firestore
    ```

4.  **Run the Development Server:**
    ```bash
    pnpm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Testing & Linting
*   Run unit/integration tests: `pnpm run test`
*   Run end-to-end tests: `pnpm run test:e2e`
*   Typecheck: `pnpm run typecheck`
*   Lint: `pnpm run lint`
