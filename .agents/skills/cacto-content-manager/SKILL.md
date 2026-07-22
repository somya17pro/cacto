---
name: cacto-content-manager
description: Manage, update, write, generate preview graphics, interlink, and QA audit Cacto's 17 growth tools and 17 blogs using the complete AEO + SEO playbook.
---

# Cacto Content Manager & AEO/SEO Playbook Skill

This skill provides a standardized blueprint, verification checklists, and automated script pipelines to handle content updates, visual preview assets, AEO (AI Engine Optimization), SEO (Search Engine Optimization), interlinking loops, structured JSON-LD schemas, and QA audits for Cacto's pages, 17 blogs, and 17 tools.

---

## 🛠️ Content Architecture & AEO/SEO Standards

### 1. Quick Answer & Summary Block (AI Overviews Extraction)
- Every blog post page (`blog/[slug]/page.tsx`) must feature a **Quick Answer & Summary** card at the top.
- Includes a 40–60 word direct answer paragraph (`post.excerpt`) formatted in bold text to allow AI Overviews, ChatGPT, Gemini, Perplexity, and Claude to extract immediate answers.
- Followed by a 3–4 bullet point summary list (`post.tldr`).

### 2. Question-Based H2 Headings
- All `<h2>` headings inside article bodies (`blogData.ts`) must be phrased as direct questions (e.g., *"How Do Meta's Platform Rules for DM Automation Work?"* or *"Why is the Instagram Link-in-Bio Costing You Conversions?"*).
- AI engines prioritize extracting content from question-format heading blocks.

### 3. Structured Data Architecture (JSON-LD Schemas)
Every page must embed dynamic `<script type="application/ld+json">` elements:
- **Homepage (`/`)**: `WebSite` (with `SearchAction`), `Organization`, and `FAQPage`.
- **About Page (`/about`)**: `AboutPage`, `Organization`, and `Person` (Entity Anchoring).
- **Blog Detail (`/blog/[slug]`)**: `Article`, `FAQPage`, `Organization`, and `ImageObject`.
- **Tools Detail (`/tools/[tool]`)**: `SoftwareApplication`, `BreadcrumbList`, and `FAQPage`.
- **Index Pages (`/blog`, `/tools`)**: `WebPage` and `BreadcrumbList`.

### 4. AI Engine Crawling & Discovery
- **`public/llms.txt`**: Maintain a clean markdown map of site capabilities, tool URLs, and article slugs for LLM crawlers.
- **`public/robots.txt`**: Maintain `Allow: /` rules for all user agents to ensure AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) can index all pages.

### 5. Bi-Directional Internal Linking
- Every blog post must contain inline `<a>` anchors targeting related blogs and tools.
- Page footers on `/`, `/blog`, `/tools`, and `/tools/[tool]` must include internal resource directories linking cross-category pages.

### 6. Unique Visual Preview Assets
- Every blog post must point to a **100% unique** static image path (`/blog_1.jpg` to `/blog_17.jpg`).

---

## 🧪 Automated QA Validation Commands

To check code integrity, heading formats, and calculations without launching heavy subagents, run the following scripts:

### A. Blog & AEO QA Audit (Checks word counts, question H2s, links, headings, and images)
```bash
node C:/Users/Somya/Desktop/Cacto/.agents/skills/cacto-content-manager/scripts/qa_blogs.js
```

### B. Tools Logic Validation (Checks formulas, rounding, bounds, and divisions)
```bash
node C:/Users/Somya/Desktop/Cacto/.agents/skills/cacto-content-manager/scripts/verify_formulas.js
```
