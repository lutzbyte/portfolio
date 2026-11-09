#!/usr/bin/env python3
"""Buat public/og.jpg (1200x630) dari src/data/profile.ts dan artwork hero.

Jalankan ulang setiap kali nama, jabatan, tagline, atau artwork hero berubah:
    python3 scripts/make-og.py
"""
import glob
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PROFILE = ROOT / "src/data/profile.ts"
HERO = ROOT / "public/images/profile/hero.png"
OUT = ROOT / "public/og.jpg"

W, H = 1200, 630
BG = (8, 11, 20)
WHITE = (248, 250, 252)
LAVENDER = (167, 139, 250)
MUTED = (165, 180, 207)
INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)

BOLD_FONTS = [
    "/system/fonts/Roboto-Bold.ttf",
    "/system/fonts/RobotoStatic-Bold.ttf",
    "/system/fonts/GoogleSans-Bold.ttf",
    "/system/fonts/NotoSans-Bold.ttf",
    "/system/fonts/DroidSans-Bold.ttf",
]
REGULAR_FONTS = [
    "/system/fonts/Roboto-Regular.ttf",
    "/system/fonts/RobotoStatic-Regular.ttf",
    "/system/fonts/GoogleSans-Regular.ttf",
    "/system/fonts/NotoSans-Regular.ttf",
    "/system/fonts/DroidSans.ttf",
]


def load_font(size: int, bold: bool) -> ImageFont.ImageFont:
    names = BOLD_FONTS if bold else REGULAR_FONTS
    pattern = "/system/fonts/*Bold*.ttf" if bold else "/system/fonts/*Regular*.ttf"
    for path in names + sorted(glob.glob(pattern)):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def profile_value(text: str, key: str) -> str:
    match = re.search(rf'^  {key}: "(.+?)",\s*$', text, re.M)
    if not match:
        sys.exit(f"Tidak menemukan '{key}' di {PROFILE}")
    return match.group(1)


def glow(base: Image.Image, color, center, radius: int, strength: float) -> None:
    gradient = Image.radial_gradient("L").resize(
        (radius * 2, radius * 2), Image.Resampling.BICUBIC
    )
    mask = ImageOps.invert(gradient).point(lambda v: int(v * strength))
    layer = Image.new("RGB", mask.size, color)
    base.paste(layer, (center[0] - radius, center[1] - radius), mask)


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def spaced(draw: ImageDraw.ImageDraw, xy, text: str, font, fill, gap: int) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += draw.textlength(char, font=font) + gap


def main() -> None:
    if not HERO.is_file():
        sys.exit(f"Artwork tidak ditemukan: {HERO}")

    source = PROFILE.read_text(encoding="utf-8")
    name = profile_value(source, "name")
    job = profile_value(source, "jobTitle")
    tagline = profile_value(source, "tagline")

    canvas = Image.new("RGB", (W, H), BG)
    glow(canvas, INDIGO, (1020, 60), 520, 0.55)
    glow(canvas, VIOLET, (80, 640), 420, 0.35)

    art = Image.open(HERO).convert("RGB")
    scale = H / art.height
    art = art.resize((round(art.width * scale), H), Image.Resampling.LANCZOS)
    mask = Image.new("L", art.size, 255)
    fade_width = min(240, art.width)
    fade = Image.linear_gradient("L").rotate(90, expand=True).resize((fade_width, H))
    mask.paste(fade, (0, 0))
    canvas.paste(art, (W - art.width, 0), mask)

    draw = ImageDraw.Draw(canvas)
    left = 80

    spaced(draw, (left, 70), job.upper(), load_font(24, False), MUTED, 4)

    big = load_font(130, True)
    parts = name.split(" ", 1)
    draw.text((left, 125), parts[0], font=big, fill=WHITE)
    if len(parts) > 1:
        draw.text((left, 262), parts[1], font=big, fill=LAVENDER)

    small = load_font(30, False)
    y = 440
    for line in wrap(draw, tagline, small, 520):
        draw.text((left, y), line, font=small, fill=MUTED)
        y += 42

    canvas.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"OK {OUT.relative_to(ROOT)} {W}x{H} {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()