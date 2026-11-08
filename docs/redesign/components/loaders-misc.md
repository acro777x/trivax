# Loaders and misc

## Uiverse Loader — TXT 15757-16021
CSS-driven text loader (variables for size, text color, shine, shadow at lines about 15766-15769). Recolor with tokens. Use as the optional preloader word "KAVIROX" or as a skeleton shimmer. Max 1.2 s, never blocks content; skip on repeat visits and under reduced motion.

## Intro Loader — TXT 16458-16468 (easyui command; unverified)
Optional alternative to the Uiverse Loader. Use one preloader at most. If the install command fails, use the Uiverse Loader.

## Target Cursor — TXT 13103-13573 (owner: also recommended)
Deps: none beyond React and react-dom (createPortal), per its import lines. Selector default `.cursor-target` (line 13169): add that class to interactive elements (links, buttons, cards). Optional `data-cursor-label` attribute shows a label (line 13388). It already disables itself unless the device has hover and a fine pointer (line about 13215). Colors from tokens (primary). Mount once at the app root, desktop only. Pass hideDefaultCursor as false (default true hides the cursor over targets with `cursor: none`; keep native cursors visible). Ensure the cursor-target class is added to links, buttons and cards.
