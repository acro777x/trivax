import os
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Users\ashis\AppData\Local\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"C:\Users\Public\Downloads\chrome downloads\kavirox ui redesign\docs\redesign\screenshots\sections"
os.makedirs(OUTPUT_DIR, exist_ok=True)

sections = ["services", "solutions", "process", "trust", "faq", "contact"]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    
    # Desktop
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    page.goto("http://localhost:3000/?qa=1", wait_until="networkidle")
    page.wait_for_timeout(1000)

    for sec in sections:
        loc = page.locator(f"#{sec}")
        if loc.count() > 0:
            loc.scroll_into_view_if_needed()
            page.wait_for_timeout(400)
            # Temporarily hide fixed floating header so section content is unoccluded
            page.evaluate("document.querySelector('header')?.style.setProperty('display', 'none')")
            loc.screenshot(path=os.path.join(OUTPUT_DIR, f"desktop-{sec}.png"))
            page.evaluate("document.querySelector('header')?.style.removeProperty('display')")
            print(f"Captured desktop section: {sec}")
        else:
            print(f"Section not found: {sec}")

    # Footer
    footer = page.locator("footer")
    if footer.count() > 0:
        footer.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        footer.screenshot(path=os.path.join(OUTPUT_DIR, "desktop-footer.png"))
        print("Captured desktop footer")

    context.close()

    # Mobile
    m_context = browser.new_context(
        viewport={"width": 390, "height": 844},
        is_mobile=True,
        has_touch=True,
        device_scale_factor=2
    )
    m_page = m_context.new_page()
    m_page.goto("http://localhost:3000/?qa=1", wait_until="networkidle")
    m_page.wait_for_timeout(1000)

    for sec in sections:
        loc = m_page.locator(f"#{sec}")
        if loc.count() > 0:
            loc.scroll_into_view_if_needed()
            m_page.wait_for_timeout(400)
            loc.screenshot(path=os.path.join(OUTPUT_DIR, f"mobile-{sec}.png"))
            print(f"Captured mobile section: {sec}")

    # Mobile Footer
    m_footer = m_page.locator("footer")
    if m_footer.count() > 0:
        m_footer.scroll_into_view_if_needed()
        m_page.wait_for_timeout(300)
        m_footer.screenshot(path=os.path.join(OUTPUT_DIR, "mobile-footer.png"))
        print("Captured mobile footer")

    m_context.close()
    browser.close()

print("Section captures complete!")
