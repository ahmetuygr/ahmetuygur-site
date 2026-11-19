from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF_CANDIDATES = (ROOT / "katalog.pdf", ROOT / "katalok.pdf")
PDF_PATH = next((path for path in PDF_CANDIDATES if path.exists()), PDF_CANDIDATES[0])
OUTPUT_DIR = ROOT / "public" / "images" / "rugs"
MAX_WIDTH = 1200
WEBP_QUALITY = 82


def convert_pdf_pages() -> int:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF bulunamadı: {PDF_PATH}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    existing = sorted(OUTPUT_DIR.glob("au-*.webp"))
    for path in existing:
        path.unlink()

    with fitz.open(PDF_PATH) as document:
        page_count = document.page_count

        for page_index in range(page_count):
            page = document.load_page(page_index)
            page_rect = page.rect
            scale = min(2.0, MAX_WIDTH / page_rect.width)
            pixmap = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)

            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            if image.width > MAX_WIDTH:
                new_height = round(image.height * MAX_WIDTH / image.width)
                image = image.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)

            output_path = OUTPUT_DIR / f"au-{page_index + 1:03d}.webp"
            image.save(output_path, "WEBP", quality=WEBP_QUALITY, method=4)

    return page_count


if __name__ == "__main__":
    count = convert_pdf_pages()
    print(f"{count} görsel çıkarıldı")
