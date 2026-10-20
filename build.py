"""Builds dist/index.html by inlining src/parts.js into src/calculadora.html."""
from pathlib import Path

root = Path(__file__).parent
page = (root / "src/calculadora.html").read_text(encoding="utf-8")
parts = (root / "src/parts.js").read_text(encoding="utf-8")
assert "/*PARTS*/" in page, "placeholder /*PARTS*/ missing in src/calculadora.html"
out = root / "dist"
out.mkdir(exist_ok=True)
(out / "index.html").write_text(page.replace("/*PARTS*/", parts), encoding="utf-8")
print("dist/index.html built")
