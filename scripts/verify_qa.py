import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Users\ashis\AppData\Local\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"C:\Users\Public\Downloads\chrome downloads\kavirox ui redesign\docs\redesign\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "phone", "width": 390, "height": 844, "is_mobile": True, "has_touch": True},
    {"name": "tablet", "width": 768, "height": 1024, "is_mobile": True, "has_touch": True},
    {"name": "laptop", "width": 1280, "height": 800, "is_mobile": False, "has_touch": False},
    {"name": "desktop", "width": 1440, "height": 900, "is_mobile": False, "has_touch": False},
    {"name": "large-desktop", "width": 1920, "height": 1080, "is_mobile": False, "has_touch": False},
]

results = {
    "viewports": {},
    "console_errors": [],
    "horizontal_scroll_issues": [],
    "fonts_verified": {},
    "interactions": {}
}

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=CHROME_PATH,
        headless=True,
        args=["--disable-web-security", "--allow-running-insecure-content"]
    )

    for vp in VIEWPORTS:
        print(f"=== Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ===")
        context = browser.new_context(
            viewport={"width": vp["width"], "height": vp["height"]},
            is_mobile=vp["is_mobile"],
            has_touch=vp["has_touch"],
            device_scale_factor=2 if vp["is_mobile"] else 1
        )
        page = context.new_page()

        console_msgs = []
        page.on("console", lambda msg: console_msgs.append({"type": msg.type, "text": msg.text}))
        page_errors = []
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        # Navigate
        page.goto("http://localhost:3000/?qa=1", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Pre-scroll through page so lazy sections and reveals mount cleanly
        page.evaluate("""async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 400;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        window.scrollTo(0, 0);
                        resolve();
                    }
                }, 100);
            });
        }""")
        page.wait_for_timeout(800)

        # Check console errors
        for msg in console_msgs:
            if msg["type"] in ["error"]:
                print(f"  Console Error: {msg['text']}")
                results["console_errors"].append({"viewport": vp["name"], "msg": msg["text"]})

        if page_errors:
            print(f"  Page Errors: {page_errors}")

        # Check horizontal scroll
        overflow_x = page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                clientWidth: document.documentElement.clientWidth,
                hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
                windowInnerWidth: window.innerWidth
            }
        }""")
        print(f"  Overflow Check: {overflow_x}")
        if overflow_x["hasOverflow"]:
            results["horizontal_scroll_issues"].append({"viewport": vp["name"], "overflow": overflow_x})

        # Check font loading
        font_check = page.evaluate("""() => {
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            const p = document.querySelector('p');
            return {
                h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
                h2Font: h2 ? window.getComputedStyle(h2).fontFamily : null,
                pFont: p ? window.getComputedStyle(p).fontFamily : null,
            };
        }""")
        print(f"  Font Check: {font_check}")
        results["fonts_verified"][vp["name"]] = font_check

        # Viewport Screenshot (Hero)
        vp_shot = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-hero.png")
        page.screenshot(path=vp_shot, full_page=False)
        print(f"  Saved hero screenshot: {vp_shot}")

        # Full Page Screenshot
        full_shot = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-full.png")
        page.screenshot(path=full_shot, full_page=True)
        print(f"  Saved full page screenshot: {full_shot}")

        # Check sections exist and have real height
        sections = page.evaluate("""() => {
            const ids = ['top', 'services', 'solutions', 'process', 'trust', 'faq', 'contact'];
            return ids.map(id => {
                const el = document.getElementById(id);
                return {
                    id,
                    exists: !!el,
                    height: el ? el.clientHeight : 0
                };
            });
        }""")
        print(f"  Sections Present: {sections}")

        # Test mobile menu if mobile
        if vp["is_mobile"]:
            try:
                # Target the actual StaggeredMenu toggle button specifically
                menu_btn = page.locator(".sm-toggle")
                if menu_btn.count() > 0:
                    menu_btn.first.click()
                    page.wait_for_timeout(1400)
                    menu_shot = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-menu-open.png")
                    page.screenshot(path=menu_shot)
                    print(f"  Saved menu open screenshot: {menu_shot}")
                    results["interactions"][f"{vp['name']}_menu"] = "Passed"
                    # Close menu
                    menu_btn.first.click()
                    page.wait_for_timeout(400)
                else:
                    print(f"  .sm-toggle not found for viewport: {vp['name']}")
            except Exception as e:
                print(f"  Menu interaction error: {e}")

        context.close()

    # Reduced motion test
    print("=== Testing Reduced Motion ===")
    rm_context = browser.new_context(
        viewport={"width": 1440, "height": 900},
        reduced_motion="reduce"
    )
    rm_page = rm_context.new_page()
    rm_page.goto("http://localhost:3000/?qa=1", wait_until="networkidle")
    rm_page.wait_for_timeout(1000)
    rm_shot = os.path.join(OUTPUT_DIR, "qa-1440x900-reduced-motion.png")
    rm_page.screenshot(path=rm_shot)
    print(f"  Saved reduced motion screenshot: {rm_shot}")
    rm_context.close()

    browser.close()

with open(os.path.join(OUTPUT_DIR, "qa_report.json"), "w") as f:
    json.dump(results, f, indent=2)

print("\nQA Verification run complete! Report saved.")
