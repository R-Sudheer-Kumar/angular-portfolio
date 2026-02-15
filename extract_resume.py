import fitz
import re

doc = fitz.open("SudheerResume--now.pdf")
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    html = page.get_text("html")
    # Extract all text spans with their positions
    spans = re.findall(r'style="top:([\d.]+)pt;left:([\d.]+)pt[^"]*"[^>]*>(?:<span[^>]*>)?([^<]+)', html)
    # Sort by top (y), then left (x)
    spans.sort(key=lambda s: (float(s[0]), float(s[1])))
    prev_top = -1
    for top, left, text in spans:
        t = text.strip()
        if not t or len(t) < 2:
            continue
        top_f = float(top)
        if abs(top_f - prev_top) > 5:
            print()  # New line for new vertical position
        print(f"  {t}", end="")
        prev_top = top_f
    print()
