import os
import math
from PIL import Image, ImageDraw, ImageFilter

def create_composed_stage(slug, screen_filenames, output_path):
    # Canvas 16:9
    canvas_w = 1920
    canvas_h = 1080
    bg_color = (6, 11, 7, 255) # Near-black #060b07
    
    stage = Image.new("RGBA", (canvas_w, canvas_h), bg_color)
    
    # 1. Soft lime radial glow in center
    glow = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    center_x = canvas_w // 2
    center_y = canvas_h // 2 + 30
    
    # Draw radial glow circles
    for r in range(500, 50, -30):
        alpha = int(28 * (1.0 - (r / 500.0)))
        glow_draw.ellipse(
            [center_x - r, center_y - int(r * 0.7), center_x + r, center_y + int(r * 0.7)],
            fill=(168, 230, 46, alpha)
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=60))
    stage = Image.alpha_composite(stage, glow)

    # Helper to create phone mock with rounded corners and bezel
    def create_phone_frame(img_path, target_h=820, round_r=44, bezel=14):
        src = Image.open(img_path).convert("RGBA")
        aspect = src.width / src.height
        target_w = int(target_h * aspect)
        
        # Resize screen
        screen = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Rounded mask for screen
        mask = Image.new("L", (target_w, target_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, target_w, target_h], radius=round_r, fill=255)
        
        # Outer phone device
        frame_w = target_w + bezel * 2
        frame_h = target_h + bezel * 2
        frame = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
        frame_draw = ImageDraw.Draw(frame)
        
        # Phone body (dark titanium bezel with specular rim)
        frame_draw.rounded_rectangle(
            [0, 0, frame_w, frame_h],
            radius=round_r + bezel,
            fill=(14, 22, 16, 255),
            outline=(255, 255, 255, 45),
            width=2
        )
        
        # Dynamic Island at top
        notch_w = int(target_w * 0.32)
        notch_h = 24
        notch_x = (frame_w - notch_w) // 2
        notch_y = bezel + 10
        frame_draw.rounded_rectangle(
            [notch_x, notch_y, notch_x + notch_w, notch_y + notch_h],
            radius=12,
            fill=(0, 0, 0, 255)
        )
        
        # Paste screen
        frame.paste(screen, (bezel, bezel), mask)
        
        # Re-paste dynamic island over screen
        frame_draw.rounded_rectangle(
            [notch_x, notch_y, notch_x + notch_w, notch_y + notch_h],
            radius=12,
            fill=(0, 0, 0, 255)
        )
        
        return frame

    # Load screens
    phones = []
    for f in screen_filenames:
        if os.path.exists(f):
            phones.append(create_phone_frame(f))
            
    if not phones:
        print(f"No screens found for {slug}")
        return

    # Secondary peeking left screen (rotated -7 deg)
    if len(phones) > 1:
        left_phone = phones[1].resize(
            (int(phones[1].width * 0.88), int(phones[1].height * 0.88)),
            Image.Resampling.LANCZOS
        )
        left_rot = left_phone.rotate(7, expand=True, resample=Image.Resampling.BICUBIC)
        # Dim slightly
        dim_left = Image.new("RGBA", left_rot.size, (0, 0, 0, 60))
        left_rot.paste(dim_left, (0, 0), left_rot)
        
        lx = center_x - phones[0].width // 2 - left_rot.width + 120
        ly = center_y - left_rot.height // 2 + 20
        stage.paste(left_rot, (lx, ly), left_rot)

    # Secondary peeking right screen (rotated +7 deg)
    if len(phones) > 2:
        right_phone = phones[2].resize(
            (int(phones[2].width * 0.88), int(phones[2].height * 0.88)),
            Image.Resampling.LANCZOS
        )
        right_rot = right_phone.rotate(-7, expand=True, resample=Image.Resampling.BICUBIC)
        # Dim slightly
        dim_right = Image.new("RGBA", right_rot.size, (0, 0, 0, 60))
        right_rot.paste(dim_right, (0, 0), right_rot)
        
        rx = center_x + phones[0].width // 2 - 120
        ry = center_y - right_rot.height // 2 + 20
        stage.paste(right_rot, (rx, ry), right_rot)

    # Primary Center Phone
    main_phone = phones[0]
    mx = center_x - main_phone.width // 2
    my = center_y - main_phone.height // 2
    stage.paste(main_phone, (mx, my), main_phone)

    # Save webp
    stage.save(output_path, "WEBP", quality=90)
    print(f"Generated composed stage: {output_path}")

base_dir = r"C:\Users\Public\Downloads\chrome downloads\kavirox ui redesign"

# 1. Rakshak Setu
rakshak_screens = [
    os.path.join(base_dir, "public", "projects", "rakshak-setu", "01_in_call_threat_hud.webp"),
    os.path.join(base_dir, "public", "projects", "rakshak-setu", "03_defense_dashboard.webp"),
    os.path.join(base_dir, "public", "projects", "rakshak-setu", "02_forensic_evidence_dossier.webp"),
]
create_composed_stage(
    "rakshak-setu",
    rakshak_screens,
    os.path.join(base_dir, "public", "projects", "rakshak-setu", "stage_composed_16_9.webp")
)

# 2. GBU One
gbu_screens = [
    os.path.join(base_dir, "public", "projects", "gbu-one", "screen_tecno_student_app.webp"),
    os.path.join(base_dir, "public", "projects", "gbu-one", "screen_tecno_events_fixed.webp"),
    os.path.join(base_dir, "public", "projects", "gbu-one", "screen_verification_pyq.webp"),
]
create_composed_stage(
    "gbu-one",
    gbu_screens,
    os.path.join(base_dir, "public", "projects", "gbu-one", "stage_composed_16_9.webp")
)

# 3. Try-Out
try_out_screens = [
    os.path.join(base_dir, "public", "projects", "try-out", "01_try_out_hero.webp"),
    os.path.join(base_dir, "public", "projects", "try-out", "02_try_out_gallery.webp"),
    os.path.join(base_dir, "public", "projects", "try-out", "03_try_out_desktop.webp"),
]
create_composed_stage(
    "try-out",
    try_out_screens,
    os.path.join(base_dir, "public", "projects", "try-out", "stage_composed_16_9.webp")
)
