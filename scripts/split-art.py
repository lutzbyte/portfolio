#!/usr/bin/env python3
"""Pisahkan ilustrasi dua panel menjadi hero.png (kiri) dan about.png (kanan)."""
import sys
from pathlib import Path

from PIL import Image

OUT_DIR = Path("public/images/profile")

# Pecahan lebar, diukur dari gambar asli 1672x941:
# panel kiri x=0..828, panel kanan x=850..1672 (sisanya garis pemisah hitam).
LEFT = (0.0, 0.4952)
RIGHT = (0.5084, 1.0)


def crop(img: Image.Image, span: tuple[float, float]) -> Image.Image:
    width, height = img.size
    return img.crop((round(width * span[0]), 0, round(width * span[1]), height))


def main() -> int:
    if len(sys.argv) != 2:
        print("Pemakaian: python3 scripts/split-art.py <file-gambar>")
        return 1

    source = Path(sys.argv[1])
    if not source.is_file():
        print(f"File tidak ditemukan: {source}")
        return 1

    image = Image.open(source).convert("RGB")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for name, span in (("hero.png", LEFT), ("about.png", RIGHT)):
        part = crop(image, span)
        target = OUT_DIR / name
        part.save(target, optimize=True)
        print(f"OK {target} {part.size[0]}x{part.size[1]}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
