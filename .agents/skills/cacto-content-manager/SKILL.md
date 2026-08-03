---
name: cacto-content-manager
description: Manage, update, write, generate preview graphics, interlink, and QA audit Cacto's 100 growth tools and 100 blogs using the complete Google + AI Overviews Ranking Blueprint.
---

# 🚀 Cacto Content Manager & Google + AI Overviews Ranking Blueprint

This skill provides a standardized blueprint, verification checklists, and automated script pipelines to handle content updates, visual preview assets, AEO (AI Engine Optimization), SEO (Search Engine Optimization), interlinking loops, structured JSON-LD schemas, and QA audits for Cacto's pages, 100 blogs, and 100 tools.

---

## 📐 The Google + AI Overviews Ranking Blueprint Architecture

```
                         ranks on Google + gets cited by AI Overviews
                                              │
                                              ▼
                                       {your keyword}
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         ▼                                    ▼                                    ▼
┌──────────────────────────────────┐ ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
│        THE ANSWER BLOCK          │ │          THE STRUCTURE           │ │             THE EDGE             │
├──────────────────────────────────┤ ├──────────────────────────────────┤ ├──────────────────────────────────┤
│ - what one question does this    │ │ - what are people also asking?   │ │ - what do the top 5 NOT do?      │
│   page answer?                   │ │ - search {keyword}               │ │ - pick one:                      │
│ - write 100-150 words            │ │ - find the PAA (People Also Ask) │ │   -> original data               │
│   direct answer                  │ │   box                            │ │   -> specific ICP                │
│ - no fluff, no intro             │ │ - each Q = one H2                │ │   -> named framework             │
│ - goes at top of page            │ │ - each H2 stands alone           │ │   -> deeper subtopic             │
│ - AI Overviews pull from this    │ │   {PAA Q1} -> H2                 │ │ - "this page does {X} no one    │
│   block                          │ │   {PAA Q2} -> H2                 │ │   else has"                      │
│ - {keyword} -> {question} ->     │ │   {PAA Q3} -> H2                 │ │ - can't finish it? brief not     │
│   {150w answer}                  │ │   {PAA Q4} -> H2                 │ │   ready                          │
│                                  │ │ - AI reads sections              │ │                                  │
│                                  │ │   independently - each must      │ │                                  │
│                                  │ │   answer on its own              │ │                                  │
└──────────────────────────────────┘ └──────────────────────────────────┘ └──────────────────────────────────┘
                                              │
                                              ▼
         ┌────────────────────────────────────┴────────────────────────────────────┐
         ▼                                                                         ▼
┌──────────────────────────────────────────────────┐             ┌──────────────────────────────────┐
│                   BRIEF OUTPUT                   │             │        PRE-PUBLISH CHECK         │
│                 hand this to Claude              │             ├──────────────────────────────────┤
├──────────────────────────────────────────────────┤             │ 1. first 150w answer core Q      │
│ keyword        | {your keyword}                  │             │    directly?                     │
│ core question  | {the one Q}                     │             │ 2. every H2 maps to a PAA        │
│ AEO block      | {150-word answer}               │             │    question?                     │
│ H2 map         | {PAA questions}                 │             │ 3. every section stands alone?   │
│ reader         | {specific person}               │             │ 4. one cited data point per      │
│ edge           | {the one thing}                 │             │    section?                      │
│ CTA            | {one action}                    │             │ 5. human gets something AI       │
│ EEAT signal    | {quote / data}                  │             │    summary doesn't?              │
└──────────────────────────────────────────────────┘             │ ALL YES -> publish               │
                                                                 └──────────────────────────────────┘
```

---

## 🛠️ Detailed Pillar Execution Guidelines

### 1. THE ANSWER BLOCK (100–150 Word Direct AEO Block)
- **Position**: Must be placed at the absolute top of the page immediately beneath the main H1 heading.
- **Content**: Answers the single primary search intent question in **100 to 150 words** with zero throat clearing, fluff, or introductory filler.
- **Purpose**: Designed specifically for extraction by Google AI Overviews, ChatGPT, Claude, Gemini, and Perplexity.
- **Mapping**: `{keyword}` ➔ `{core question}` ➔ `{100-150 word direct answer}`.

### 2. THE STRUCTURE (Standalone PAA H2 Sections)
- **Search Intent**: Search `{keyword}` in Google and locate the People Also Ask (PAA) box.
- **Heading Mapping**: Every `<h2>` heading must map directly to a verified PAA question.
- **Standalone Independence**: AI engines parse and cite sections independently. Each H2 section **must stand on its own** with complete context, clear answers, and zero dependency on preceding paragraphs.
- **Mapping**: `{PAA Q1} ➔ H2`, `{PAA Q2} ➔ H2`, `{PAA Q3} ➔ H2`, `{PAA Q4} ➔ H2`.

### 3. THE EDGE (Unique Value Proposition & Differentiator)
- **Analysis**: Identify what the top 5 ranking search results fail to cover.
- **Selection**: Every article must include at least ONE of the following four edge pillars:
  - 📊 **Original Benchmark Data**: Empirical metrics (e.g., sub-3-second webhook latency, 40%+ DM link CTRs).
  - 👤 **Specific ICP Focus**: Tailored specifically for solo creators, coaches, and Shopify sellers.
  - 🏷️ **Named Framework**: Proprietary methodology (e.g. Cacto's *3-Second Comment-to-Link Loop*).
  - 🔍 **Deeper Technical Subtopic**: Meta Graph API v20.0 OAuth token encryption and webhook payload architectures.
- **Rule**: If you cannot complete the sentence *"This page does {X} that no one else has"*, the content brief is not ready for publishing.

### 4. BRIEF OUTPUT (Standardized Claude / Subagent Input Schema)
When briefing an agent to write or expand content, pass the following structured schema:
```yaml
keyword: "{your keyword}"
core_question: "{the primary question}"
aeo_block: "{100-150 word direct answer}"
h2_map:
  - "{PAA Question 1}"
  - "{PAA Question 2}"
  - "{PAA Question 3}"
  - "{PAA Question 4}"
reader: "{specific ICP - e.g. Solo Creator selling $49 digital products}"
edge: "{the one unique framework or benchmark dataset}"
cta: "{single high-intent action - e.g. Join Cacto Waitlist}"
eeat_signal: "{empirical data point / official Meta API citation}"
```

### 5. PRE-PUBLISH CHECK (5 Mandatory Validation Rules)
Before publishing any page or blog post, verify:
1. **Direct Answer**: Does the first 100–150 words answer the core question directly with zero fluff?
2. **PAA H2 Mapping**: Does every `<h2>` heading map to a PAA search question?
3. **Standalone Independence**: Does every section stand on its own as a self-contained answer?
4. **Data Citations**: Is there at least one cited metric or empirical data point per section?
5. **Human Value Beyond AI**: Does the human reader receive unique value (framework, calculator, script) that an AI summary alone cannot replace?

---

## 🧪 Automated QA Validation Commands

Run these automated validation tools to enforce compliance across all 100 blogs and 100 tools:

### A. Blog & AEO QA Audit (Validates 100-150w AEO block, question H2s, word count, and links)
```bash
node .agents/skills/cacto-content-manager/scripts/qa_blogs.js
```

### B. Tools Logic Validation (Checks formulas, bounds, and interactive hooks)
```bash
node .agents/skills/cacto-content-manager/scripts/verify_formulas.js
```
