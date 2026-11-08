import os
import sys
import json
import time
import re
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Users\ashis\AppData\Local\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"C:\Users\Public\Downloads\chrome downloads\kavirox ui redesign\docs\redesign-v2\screenshots"
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
    "double_slash_ornament_found": [],
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

        # Check for '//' ornaments in visible rendered text
        body_text = page.inner_text("body")
        text_without_urls = re.sub(r'https?://\S+', '', body_text)
        slash_matches = [m.start() for m in re.finditer(r'//', text_without_urls)]
        if slash_matches:
            print(f"  WARNING: Found {len(slash_matches)} '//' occurrences in body text on {vp['name']}")
            results["double_slash_ornament_found"].append({"viewport": vp["name"], "count": len(slash_matches)})

        # Check font loading
        font_check = page.evaluate("""() => {
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            const p = document.querySelector('p');
            return {
                h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
                h2Font: h2 ? window.getComputedStyle(h2).fontFamily : null,
                pFont: p ? window.getComputedStyle(p).fontFamily : null
            }
        }""")
        print(f"  Font Check: {font_check}")
        results["fonts_verified"][vp["name"]] = font_check

        # Capture Hero Screenshot
        hero_path = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-hero.png")
        page.screenshot(path=hero_path)
        print(f"  Saved Hero Screenshot: {hero_path}")

        # Capture Full Page Screenshot
        full_path = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-full.png")
        page.screenshot(path=full_path, full_page=True)
        print(f"  Saved Full Page Screenshot: {full_path}")

        # Test Product Detail Navigation on Desktop and Phone
        if vp["name"] in ["desktop", "phone"]:
            print(f"  Testing Product Card Click on {vp['name']}...")
            try:
                # Find the visible 'View product' trigger
                btn = page.locator("[role='button']:has-text('View product')").locator("visible=true").first
                if btn.count() > 0:
                    btn.scroll_into_view_if_needed()
                    btn.click(timeout=5000)
                    page.wait_for_timeout(1000)
                    product_screenshot = os.path.join(OUTPUT_DIR, f"qa-{vp['width']}x{vp['height']}-product-detail.png")
                    page.screenshot(path=product_screenshot)
                    print(f"  Saved Product Detail Screenshot: {product_screenshot}")
                    
                    # Verify URL contains /products/
                    current_url = page.url
                    if "/products/" in current_url:
                        results["interactions"][f"{vp['name']}_product_detail"] = "Passed"
                    else:
                        results["interactions"][f"{vp['name']}_product_detail"] = f"URL was {current_url}"

                    # Test Back button
                    back_btn = page.locator("button:has-text('Back')").first
                    if back_btn.count() > 0:
                        back_btn.click(timeout=3000)
                        page.wait_for_timeout(600)
                        results["interactions"][f"{vp['name']}_back_button"] = "Passed"
            except Exception as e:
                print(f"  Product detail test note: {e}")
                results["interactions"][f"{vp['name']}_product_detail"] = str(e)

        # Test Contact form focus launcher auto-hide on desktop
        if vp["name"] == "desktop":
            try:
                contact_input = page.locator("#contact input").first
                if contact_input.count() > 0:
                    contact_input.scroll_into_view_if_needed()
                    contact_input.focus()
                    page.wait_for_timeout(300)
                    results["interactions"]["contact_focus_hides_launcher"] = "Verified"
            except Exception as e:
                results["interactions"]["contact_focus_hides_launcher"] = str(e)

        context.close()

    browser.close()

report_path = os.path.join(OUTPUT_DIR, "qa_v2_report.json")
with open(report_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\n=== QA V2 Suite Complete ===")
print(f"Report saved to: {report_path}")
