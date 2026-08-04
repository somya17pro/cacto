---
name: houtini-seo-audit-console
description: Merges Search Console data with a first-party site crawl into a prioritized technical SEO audit, ranking 93 checks by expected clicks per dev-hour with paste-ready fixes.
---

# Houtini SEO Audit Console 🔍

Use this skill whenever performing technical SEO audits, Search Console data merging, first-party web crawling, keyword cannibalisation detection, internal PageRank calculation, structured data verification, AI-search readiness audits, or priority-ranked click recovery.

---

## ⚡ What It Does

**SEO Audit Console** by Houtini (`@houtini/seo-audit-console`) merges your **Google Search Console** history, a **first-party site crawl**, and optional market data into a prioritized, evidence-backed technical SEO audit.

- **93 Technical Checks**: Spanning crawlability, indexation, canonicalisation, structured data, Core Web Vitals, hreflang, keyword cannibalisation, and AI-search readiness.
- **Yield & Click Prioritization**: Findings are ranked by **expected clicks recovered per developer-hour** rather than raw cosmetic severity.
- **Paste-Ready Fixes**: Generates exact 301 redirect rules, JSON-LD schema snippets, internal link donor recommendations, and grounded title/copy rewrites.
- **First-Party Crawl Engine**: Discovers pages via link following, XML sitemaps, and Search Console traffic URLs (catches ghost pages missed by standard crawlers).

---

## 🛠️ Key Audit Commands & Workflow

```bash
# 1. Refresh GSC & Execute Audit
"refresh sc-domain:cacto.cc"
"run an SEO audit on cacto.cc"

# 2. Generate Immediate Fixes
"generate the fix for #1"
"draft the missing content for /tools/engagement-calculator"

# 3. Detect Keyword Cannibalisation
"show me the cannibalisation findings with evidence"

# 4. Score AI-Search Readiness
"score the passages on cacto.cc"
"check agent readiness for cacto.cc"

# 5. Template & Monitoring Plays
"list the page templates"
"detect changes on cacto.cc"
"show me the dashboard"
```

---

## 📋 93 Technical Check Families

1. **Crawlability & Indexation**: Broken links (404), redirect chains (301/302), orphan pages, index bloat, spider traps, robots-blocked pages earning traffic.
2. **On-Page & Rich Results**: Title tags, meta descriptions, H1 hierarchy, alt text, and local validator covering ~30 Schema.org rich-result types.
3. **GSC Trends over Time**: Click loss trends, ranking position slips, vanished search queries, rising traffic pages, year-on-year content decay.
4. **Merged GSC + Crawl Insights**: Cannibalisation, striking distance queries (positions 11-20), ghost pages, internal PageRank equity leaks on 404s/no-clicks.
5. **AI-Search & RAG Readiness**: Unsaid ranking phrases, unanswered queries in single passages, chunking quality for AI engines (ChatGPT, Claude, Gemini, Perplexity).

---

## 📦 System & CLI Integration

- **Globally Installed Package**: `@houtini/seo-audit-console`
- **MCP Server Binary**: `npx -y @houtini/seo-audit-console`
- **In-Repo Repository**: `scratch/seo-audit`
