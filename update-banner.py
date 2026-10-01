from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "index.html"
IMAGE_DIR = ROOT / "images"

# Nama file banner baru
NEW_BANNER = IMAGE_DIR / "banner-jual-servis-kulkas.png"

# Cari banner PNG yang sudah ada di project.
# Jika nama file ini ada, gunakan sebagai sumber banner.
SOURCE_CANDIDATES = [
    ROOT / "Banner Elektronik Ridwan A.P Jaya.png",
    ROOT / "banner-ridwan-ap-jaya.png",
    ROOT / "banner-ridwan-ap-jaya.webp",
]

if not HTML.exists():
    raise SystemExit("❌ index.html tidak ditemukan.")

IMAGE_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------
# 1. BACKUP index.html
# ---------------------------------------------------------
backup = ROOT / "index.html.backup-before-banner"
shutil.copy2(HTML, backup)
print(f"✅ Backup dibuat: {backup.name}")

# ---------------------------------------------------------
# 2. CARI GAMBAR BANNER YANG SUDAH ADA
# ---------------------------------------------------------
source = None

for candidate in SOURCE_CANDIDATES:
    if candidate.exists():
        source = candidate
        break

if source is None:
    # Cari file gambar besar di folder project
    image_extensions = {".png", ".jpg", ".jpeg", ".webp"}
    candidates = []

    for path in ROOT.rglob("*"):
        if (
            path.is_file()
            and path.suffix.lower() in image_extensions
            and "node_modules" not in path.parts
            and ".git" not in path.parts
        ):
            candidates.append(path)

    # Prioritaskan nama yang mengandung banner/ridwan
    priority = [
        p for p in candidates
        if "banner" in p.name.lower() or "ridwan" in p.name.lower()
    ]

    if priority:
        source = priority[0]
    elif candidates:
        source = candidates[0]

if source is None:
    raise SystemExit(
        "❌ Tidak menemukan file gambar banner. "
        "Masukkan banner PNG/JPG ke folder project terlebih dahulu."
    )

# ---------------------------------------------------------
# 3. SALIN BANNER KE FOLDER images
# ---------------------------------------------------------
shutil.copy2(source, NEW_BANNER)

print(f"✅ Banner ditemukan : {source.name}")
print(f"✅ Banner baru      : {NEW_BANNER.relative_to(ROOT)}")

# ---------------------------------------------------------
# 4. BACA index.html
# ---------------------------------------------------------
html = HTML.read_text(encoding="utf-8")

# Path yang akan digunakan website
new_src = "images/banner-jual-servis-kulkas.png"

# ---------------------------------------------------------
# 5. CARI GAMBAR YANG BERKAITAN DENGAN KULKAS/BANNER
# ---------------------------------------------------------
pattern = re.compile(
    r'<img\b[^>]*>',
    re.IGNORECASE | re.DOTALL
)

images = list(pattern.finditer(html))

target = None

keywords = [
    "kulkas",
    "fridge",
    "refrigerator",
    "banner",
    "servis",
    "service",
    "electronics",
    "elektronik"
]

for match in images:
    tag = match.group(0).lower()

    if any(keyword in tag for keyword in keywords):
        target = match
        break

# ---------------------------------------------------------
# 6. JIKA TIDAK KETEMU, CARI GAMBAR DENGAN UKURAN BESAR
# ---------------------------------------------------------
if target is None and images:
    for match in images:
        tag = match.group(0).lower()

        # Hindari logo/icon kecil
        if not any(x in tag for x in ["logo", "icon", "favicon"]):
            target = match
            break

# ---------------------------------------------------------
# 7. GANTI SRC GAMBAR TANPA MERUSAK ATRIBUT LAIN
# ---------------------------------------------------------
if target is not None:
    old_tag = target.group(0)

    # Ganti src="..."
    new_tag = re.sub(
        r'(\bsrc\s*=\s*)(["\']).*?\2',
        rf'\1"{new_src}"',
        old_tag,
        count=1,
        flags=re.IGNORECASE | re.DOTALL
    )

    # Jika tag img tidak memiliki src, tambahkan
    if new_tag == old_tag and "src=" not in old_tag.lower():
        new_tag = old_tag.replace(
            "<img",
            f'<img src="{new_src}"',
            1
        )

    html = html[:target.start()] + new_tag + html[target.end():]

    HTML.write_text(html, encoding="utf-8")

    print("✅ Gambar lama berhasil diganti.")
    print(f"✅ Sekarang menggunakan: {new_src}")

else:
    print("⚠️ Tidak menemukan tag <img> di index.html.")
    print("⚠️ Banner tetap sudah disiapkan di folder images.")

# ---------------------------------------------------------
# 8. TAMPILKAN HASIL
# ---------------------------------------------------------
print("")
print("==============================================")
print("        UPDATE BANNER SELESAI ✅")
print("==============================================")
print("")
print("Banner : images/banner-jual-servis-kulkas.png")
print("HTML   : index.html")
print("Backup : index.html.backup-before-banner")
print("")
print("Selanjutnya jalankan:")
print("git status")
print("git add .")
print('git commit -m "Update banner jual dan servis kulkas"')
print("git push")
print("")
