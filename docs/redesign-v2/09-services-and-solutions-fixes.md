# 09 — Services and Solutions fixes

## Services section (currently: 11 identical dark boxes, dead space)
1. Heading block: eyebrow "Services" (plain), heading "Everything around a product, built properly." Sub: use the profile line "Alongside our products, we provide custom software, product engineering, web and mobile, AI and automation, cybersecurity, cloud and DevOps, e-commerce and digital growth support."
2. Controls row: category chips (All, Commerce, Automation, Data and AI, Engineering) plus Expandable Search (TXT 16469-16486; if the easyui source cannot be installed, build a search that expands from an icon on focus). Chips show counts. Filter changes animate with Flip (gsap Flip): cards reposition smoothly, not jump.
3. Layout: desktop 3 columns with a **featured first row** (first card spans 2 columns with a richer layout: large icon, deliverables visible, tool chips), then regular cards. Mobile: snap rail 1.15 cards.
4. Each card: icon tile (lucide icon inside a rounded square with a gradient tint by category: commerce = lime, automation = mint, data-ai = teal, engineering = soft white-green), number in plain numerals "01", title, tagline, bottom row with "5 deliverables" and a small arrow. Back face: first 4 deliverables as a checklist, then up to 4 tool chips.
5. No `//` anywhere. Replace "Flip for deliverables" mono hint with a small circular flip icon button, and on touch a tap hint appears once only.
6. Add the **capability strip** under the grid (see 02 "Also"): horizontally auto-scrolling pill chips (CSS marquee), pausing on hover.
7. Fill the empty space: remove fixed min-heights that create gaps; align card contents with flex so footers sit at the bottom.

## Solutions section (currently: blank left column, one huge dense card)
1. Rebuild as a **sticky split**: left column (5/12) is sticky and shows the section heading, a vertical step list of the 4 solutions with the active one highlighted and a progress line, and a large **blueprint visual** for the active solution (input, engine, output as three connected nodes with a traveling dot); right column (7/12) scrolls through the 4 solution panels. The left column must never be empty.
2. Each panel is shorter and scannable: tag, title, subtitle, a 2-line description, **three** key points (pick the best three of `architecturePoints`), stack chips, then the metric trio labeled "Targets we design for" in small print with a "?" tooltip explaining these are design targets, not client results.
3. Pixel Swap before/after (TXT 4278-4805) lives in panel 1 (storefronts) as a visual instead of text.
4. Remove "// Architecture Guarantee", "// Architecture Comparison (Hover to Swap)" and similar. Rename: "How it works", "Before and after".
5. Mobile: no sticky; each solution is a card in a vertical stack with the blueprint as a compact 3-step row.

## Process and engagement
Use `deliverySteps` for the timeline (card type 3) and `engagementModels` for card type 5. Add the four "ways to work" (02) before it. Remove "03 // Value Architecture", "04 // Process", "05 // Partnership", "06 // Domain Specialization"; use headings: "Why teams choose Kavirox", "How a project runs", "Ways to work with us", "Domains we know".

## FAQ
Keep the custom accordion. Add questions about products: "Can I use a ready-built product?", "What if a product does not fit?", "Is every product available today?" (answer from 03 statuses), "How do you handle security?" (profile wording), all grounded in the profile only.
