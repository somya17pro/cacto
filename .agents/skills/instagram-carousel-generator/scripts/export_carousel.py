import argparse
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

VIEW_W = 420
VIEW_H = 525
SCALE = 1080 / 420  # 2.57142857

async def export_slides(html_path: Path, output_dir: Path, total_slides: int):
    output_dir.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )
        
        html_content = html_path.read_text(encoding="utf-8")
        await page.set_content(html_content, wait_until="networkidle")
        await page.wait_for_timeout(3000)  # Wait for Google Fonts

        # Hide frame chrome and isolate viewport
        await page.evaluate("""() => {
            document.querySelectorAll('.ig-header,.ig-dots,.ig-actions,.ig-caption')
                .forEach(el => el.style.display='none');
            const frame = document.querySelector('.ig-frame');
            if (frame) {
                frame.style.cssText = 'width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;overflow:hidden;margin:0;';
            }
            const viewport = document.querySelector('.carousel-viewport');
            if (viewport) {
                viewport.style.cssText = 'width:420px;height:525px;aspect-ratio:unset;overflow:hidden;cursor:default;';
            }
            document.body.style.cssText = 'padding:0;margin:0;display:block;overflow:hidden;';
        }""")
        await page.wait_for_timeout(500)

        for i in range(total_slides):
            await page.evaluate("""(idx) => {
                const track = document.querySelector('.carousel-track');
                if (track) {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(' + (-idx * 420) + 'px)';
                }
            }""", i)
            await page.wait_for_timeout(400)
            
            output_file = output_dir / f"slide_{i+1}.png"
            await page.screenshot(
                path=str(output_file),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H}
            )
            print(f"✅ Exported 1080x1350 PNG slide {i+1}/{total_slides} to {output_file}")

        await browser.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Export Instagram Carousel HTML slides to 1080x1350 PNGs")
    parser.add_argument("--html", required=True, type=Path, help="Path to input HTML carousel file")
    parser.add_argument("--output", required=True, type=Path, help="Output directory for PNG slides")
    parser.add_argument("--total-slides", required=True, type=int, help="Total number of slides in carousel")
    args = parser.parse_args()

    asyncio.run(export_slides(args.html, args.output, args.total_slides))
