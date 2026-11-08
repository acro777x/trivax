import os
import cv2
import numpy as np
from PIL import Image

# 1. Load original logo
src_path = "public/Kavirox_logo.png"
im = cv2.imread(src_path, cv2.IMREAD_UNCHANGED)
emblem = im[9:631, 387:1134]  # Height: 622, Width: 747
h, w = emblem.shape[:2]

alpha = emblem[:, :, 3]
thresh = (alpha > 80).astype(np.uint8) * 255

# Find external contours
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

# Separate brackets from ring/K/pixels
# Center is w / 2 = 373.5, h / 2 = 311
svg_paths_brackets = []
svg_paths_gradient = []

# ViewBox: we can set viewBox="0 0 760 640" or normalize to "0 0 100 85" or keep 0 0 760 640
viewBox = "0 0 760 640"

for i, cnt in enumerate(contours):
    area = cv2.contourArea(cnt)
    if area < 100:
        continue
    x, y, cw, ch = cv2.boundingRect(cnt)
    # Approx with polyDP
    # Brackets and pixel squares get tighter approximation; curved arcs get smooth representation
    eps = 1.6 if (cw > 100 or ch > 100) else 1.2
    approx = cv2.approxPolyDP(cnt, eps, True)
    
    # Generate SVG path d
    pts = approx.reshape(-1, 2)
    # Offset slightly to center in 760x640 (+6 x offset, +9 y offset)
    pts = pts + np.array([6, 9])
    
    d = f"M {pts[0][0]} {pts[0][1]} " + " ".join([f"L {p[0]} {p[1]}" for p in pts[1:]]) + " Z"
    
    # Determine if bracket or gradient mark
    # Left bracket has x < 120 and y between 200 and 400
    # Right bracket has x > 630 and y between 200 and 400
    is_left_bracket = (x < 120 and 200 < y < 400 and cw < 120)
    is_right_bracket = (x > 630 and 200 < y < 400 and cw < 120)
    
    if is_left_bracket or is_right_bracket:
        svg_paths_brackets.append(d)
    else:
        svg_paths_gradient.append(d)

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewBox}" fill="none">
  <defs>
    <linearGradient id="kavirox-brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9bd400" />
      <stop offset="45%" stop-color="#72c50e" />
      <stop offset="100%" stop-color="#1b8f1b" />
    </linearGradient>
    <filter id="kavirox-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <!-- Brackets: light / 80% opacity on dark backgrounds -->
  <g class="kavirox-brackets" fill="currentColor" fill-opacity="0.8">
    {' '.join([f'<path d="{d}" />' for d in svg_paths_brackets])}
  </g>
  <!-- Core emblem & pixel squares with brand gradient -->
  <g class="kavirox-emblem" fill="url(#kavirox-brand-grad)">
    {' '.join([f'<path d="{d}" />' for d in svg_paths_gradient])}
  </g>
</svg>
'''

with open("public/kavirox-mark.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Generated public/kavirox-mark.svg: {len(svg_paths_brackets)} brackets, {len(svg_paths_gradient)} gradient parts")
