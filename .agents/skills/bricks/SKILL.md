---
name: bricks
description: Self-hosted local data enrichment, autonomous web research agent, AI email finder/verifier, Puppeteer stealth scraping, and dual-agent outreach system.
---

# Bricks 🧱 — Data Enrichment & Outreach Automation

Use this skill whenever building or running local data enrichment, lead enrichment, autonomous web scraping, AI email finding/verification, Puppeteer stealth scraping, or dual-agent outreach loops (Writer + Prospect Critique).

---

## 🚀 Key Capabilities & Modules

### 1. **Autonomous Web Research Agent**
- Takes natural language research prompts (e.g. *"Find this company's latest funding round and lead investor"*).
- Executes search queries via `/api/search` and page parsing via `/api/reader`.
- Extracts structured facts into markdown or table cells using local/remote LLMs.

### 2. **AI Email Finder & Multi-Tier Verifier**
- Generates email pattern variations (`{first}.{last}@domain.com`, `{first}@domain.com`).
- Runs verification cascades across Hunter ➔ MillionVerifier ➔ QuickEmailVerification.
- Returns deliverable status flags (valid, catch-all, invalid) at $0 cost on free tiers.

### 3. **Dual-Agent Outreach System (Writer + Prospect Persona Critique)**
- Runs a 2-agent optimization loop:
  1. **Writer Agent**: Drafts cold DM / email outreach using lead data and offer context.
  2. **Prospect Agent**: Role-plays as the recipient (e.g. Founder, CMO, E-commerce Director), critiques the draft for friction, fluff, or salesiness, and requests revisions.
- Loops until the prospect persona approves the message.

### 4. **Built-In Stealth Puppeteer Browser Pool**
- Executes JavaScript-heavy page rendering, bypasses scraper blocks with human-like delays and connection pooling.
- Blocks 30+ analytics/tracker domains to prevent network hangs.

### 5. **Free AI Waterfall Gateway (`/api/ai/v1`)**
- OpenAI-compatible endpoint that cascades chat completions across providers:
  `Ollama` ➔ `Nvidia NIM` ➔ `Cloudflare AI` ➔ `OpenRouter` ➔ `Google AI Studio` ➔ `Groq`
- Automatically skips rate-limited providers and cools down failing endpoints.

---

## 🛠️ Usage Guidelines

- **Lead Enrichment**: Use Bricks patterns when enriching Instagram creator leads, ecommerce brand emails, or B2B prospect lists for Cacto DM/email campaigns.
- **Web Scraping**: Use Puppeteer stealth strategies for dynamic page data extraction.
- **Outreach Crafting**: Apply the Writer + Prospect Persona critique loop for writing Instagram DM triggers and high-converting copy.
