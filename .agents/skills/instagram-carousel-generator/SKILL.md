---
name: instagram-carousel-generator
description: Design, preview, and export high-converting, brand-consistent 4:5 Instagram carousels as 1080x1350 PNG images using HTML/CSS preview frames and Playwright high-DPI screenshot exports.
---

# Instagram Carousel Generator 📸

Use this skill whenever designing, previewing, or exporting Instagram carousels, swipeable post cards, brand story sequences, or high-converting social media slides.

---

## 🚀 Overview & Capabilities

- **4:5 Aspect Ratio Standard**: Designed at a 420×525px base viewport for interactive preview and scaled up via Playwright `device_scale_factor` to **1080×1350px high-DPI PNGs** for direct Instagram upload.
- **6-Token Automatic Brand Color System**: Derived from a single primary brand hex color:
  - `BRAND_PRIMARY`: Main accent (progress bar, icons, tags)
  - `BRAND_LIGHT`: Secondary accent (pills, light tags)
  - `BRAND_DARK`: CTA text, gradient anchor
  - `LIGHT_BG`: Off-white background (never pure `#FFFFFF`)
  - `LIGHT_BORDER`: Dividers and card borders
  - `DARK_BG`: Near-black with brand tint
- **Visual Rhythm**: Alternates light (`LIGHT_BG`), dark (`DARK_BG`), and brand gradient (`linear-gradient(165deg, BRAND_DARK 0%, BRAND_PRIMARY 50%, BRAND_LIGHT 100%)`) slides across a 5–10 slide narrative arc (7 is optimal).
- **Embedded Components**:
  - Progress bar (`1/7` counter, dynamic fill track)
  - Swipe arrow chevrons (on all slides except the last CTA slide)
  - Tag pills, strikethrough old-tool pills, quote/prompt boxes, numbered step rows (`01`, `02`), feature rows with icons, and brand CTA buttons.
- **Instagram Preview Frame**: Interactive 420px swipeable wrapper complete with header avatar, handle, action icons (heart, comment, share, bookmark), dots indicator, and caption.

---

## 🎨 Typography Pairings

| Style | Heading Font | Body Font |
|---|---|---|
| **Editorial / Premium** | Playfair Display | DM Sans |
| **Modern / Clean** | Plus Jakarta Sans (700) | Plus Jakarta Sans (400) |
| **Warm / Approachable** | Lora | Nunito Sans |
| **Technical / Sharp** | Space Grotesk | Space Grotesk |
| **Bold / Expressive** | Fraunces | Outfit |
| **Classic / Trustworthy** | Libre Baskerville | Work Sans |

---

## 📸 Playwright High-DPI 1080×1350 PNG Exporter

The export script uses Playwright's `device_scale_factor = 1080 / 420 = 2.57142857` to capture crisp 1080×1350px PNG screenshots without reflowing font sizes or layouts.

- Export Script Location: `.agents/skills/instagram-carousel-generator/scripts/export_carousel.py`

### Python Exporter Usage:

```bash
python .agents/skills/instagram-carousel-generator/scripts/export_carousel.py --html path/to/carousel.html --output path/to/output_dir --total-slides 7
```
