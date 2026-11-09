#!/usr/bin/env bash
# Pemeriksaan akhir: statis, data, build produksi, lalu uji rute sungguhan.
# Jalankan: bash scripts/qa.sh   (butuh beberapa menit di HP)
cd "$(dirname "$0")/.." || exit 1

PORT=3200
BASE="http://localhost:$PORT"
BUILD_LOG="$HOME/qa-build.log"
START_LOG="$HOME/qa-start.log"
FAILS=0
SERVER_PID=""

pass() { echo "PASS $1"; }
fail() { echo "FAIL $1"; FAILS=$((FAILS + 1)); }
section() { printf '\n== %s ==\n' "$1"; }

cleanup() {
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null
  pkill -f "next start" 2>/dev/null
}
trap cleanup EXIT

SITE=$(grep -E '^NEXT_PUBLIC_SITE_URL=' .env.local 2>/dev/null | cut -d= -f2- | tr -d '\r' | sed 's#/*$##')
SITE=${SITE:-http://localhost:3000}
echo "NEXT_PUBLIC_SITE_URL terbaca: $SITE"

section "1. Pemeriksaan statis"
grep -rnE '<img[ >]' src && fail "ada <img> mentah (pakai next/image)" || pass "tanpa <img> mentah"
# qa.sh dikecualikan: file ini memuat teks pola itu sendiri.
grep -rnE ':\s*any\b|<any>|as any' src scripts --exclude=qa.sh && fail "ada any" || pass "tanpa any"
grep -rnE 're_[A-Za-z0-9_]{20,}' . --exclude-dir=node_modules --exclude-dir=.next \
  --exclude-dir=.git --exclude=.env.local --exclude=bun.lock >/dev/null \
  && fail "ada string mirip API key Resend di file" || pass "tanpa API key di file"
git check-ignore -q .env.local && pass ".env.local diabaikan git" || fail ".env.local TIDAK diabaikan git"
git ls-files --error-unmatch .env.local >/dev/null 2>&1 \
  && fail ".env.local terlacak git" || pass ".env.local tidak terlacak"
git ls-files --error-unmatch .env.example >/dev/null 2>&1 \
  && pass ".env.example terlacak" || fail ".env.example belum di-commit (git add)"
test -f public/og.jpg && pass "public/og.jpg ada" || fail "public/og.jpg tidak ada (python3 scripts/make-og.py)"
test -f src/proxy.ts && pass "src/proxy.ts ada" || fail "src/proxy.ts tidak ada"
for a in home about skills projects journey contact; do
  grep -rqE "id=\"$a\"" src/components/sections \
    && pass "section id=\"$a\" ada" || fail "section id=\"$a\" tidak ada"
done

section "2. TypeScript, lint, data"
bunx tsc --noEmit && pass "tsc" || fail "tsc"
bun run lint >/dev/null 2>&1 && pass "lint" || { fail "lint"; bun run lint 2>&1 | tail -n 15; }
bun run scripts/validate-data.ts && pass "data valid" || fail "data valid"

section "3. Build produksi"
pkill -f next 2>/dev/null
rm -rf .next
if bun run build > "$BUILD_LOG" 2>&1; then
  pass "build"
else
  fail "build"
  grep -E "Error|error|Failed" "$BUILD_LOG" | head -n 25
  echo "Log lengkap: $BUILD_LOG"
  echo; echo "HASIL: build gagal, uji rute dilewati."
  exit 1
fi

section "4. Uji rute (server produksi)"
./node_modules/.bin/next start -p "$PORT" > "$START_LOG" 2>&1 &
SERVER_PID=$!
READY=0
for _ in $(seq 1 40); do
  curl -s -o /dev/null --max-time 3 "$BASE/" && { READY=1; break; }
  sleep 1
done
[ "$READY" = "1" ] && pass "server produksi menyala" || { fail "server tidak menyala"; tail -n 15 "$START_LOG"; exit 1; }

status() { curl -s -o /dev/null -w '%{http_code}' --max-time 60 "$BASE$1"; }
fetch() { curl -s --max-time 60 "$BASE$1"; }

check_page() {
  local path="$1" code html
  code=$(status "$path")
  if [ "$code" != "200" ]; then fail "$path -> $code"; return; fi
  pass "$path -> 200"
  html=$(fetch "$path")
  [ "$(printf '%s' "$html" | grep -o '<h1' | wc -l | tr -d ' ')" = "1" ] \
    && pass "$path: tepat 1 <h1>" || fail "$path: jumlah <h1> bukan 1"
  printf '%s' "$html" | grep -qF "rel=\"canonical\" href=\"$SITE" \
    && pass "$path: canonical ke $SITE" || fail "$path: canonical tidak ke $SITE"
  for p in 'property="og:title"' 'property="og:image"' 'name="twitter:card"' \
    'name="description"' 'application/ld+json'; do
    printf '%s' "$html" | grep -qF "$p" && pass "$path: $p" || fail "$path: $p hilang"
  done
  printf '%s' "$html" | grep -q 'noindex' && fail "$path: ada noindex" || pass "$path: tanpa noindex"
  printf '%s' "$html" | grep -oE '<img[^>]*>' | grep -v 'alt=' | head -n 1 | grep -q . \
    && fail "$path: ada <img> tanpa alt" || pass "$path: semua gambar punya alt"
}

SLUGS=$(grep -oE 'slug: "[a-z0-9-]+"' src/data/projects.ts | cut -d'"' -f2)
check_page "/"
check_page "/projects"
for s in $SLUGS; do check_page "/projects/$s"; done

CODE=$(status /projects/tidak-ada-slug-ini)
[ "$CODE" = "404" ] && pass "slug tak dikenal -> 404" || fail "slug tak dikenal -> $CODE (harus 404)"
fetch /projects/tidak-ada-slug-ini | grep -q 'noindex' \
  && pass "halaman 404 proyek memuat noindex" || fail "halaman 404 proyek tanpa noindex"
CODE=$(status /halaman-tidak-ada)
[ "$CODE" = "404" ] && pass "rute tak dikenal -> 404" || fail "rute tak dikenal -> $CODE (harus 404)"

SM=$(fetch /sitemap.xml)
printf '%s' "$SM" | grep -qF "$SITE" && pass "sitemap memakai $SITE" || fail "sitemap tidak memakai $SITE"
for s in $SLUGS; do
  printf '%s' "$SM" | grep -qF "/projects/$s" && pass "sitemap memuat $s" || fail "sitemap tidak memuat $s"
done
RB=$(fetch /robots.txt)
printf '%s' "$RB" | grep -qi 'Sitemap:' && pass "robots.txt memuat Sitemap" || fail "robots.txt tanpa Sitemap"
printf '%s' "$RB" | grep -q 'Disallow: /api/' && pass "robots.txt blokir /api/" || fail "robots.txt tidak blokir /api/"

OG=$(curl -s -o /dev/null -w '%{http_code} %{content_type}' --max-time 30 "$BASE/og.jpg")
[ "$OG" = "200 image/jpeg" ] && pass "/og.jpg -> $OG" || fail "/og.jpg -> $OG (harus 200 image/jpeg)"

API=$(curl -s --max-time 30 -X POST "$BASE/api/contact" -H 'Content-Type: application/json' \
  -d '{"name":"A","email":"x","message":"hi"}')
printf '%s' "$API" | grep -q '"invalid"' && pass "API kontak menolak data tidak valid" || fail "API kontak: $API"
CODE=$(status /api/contact)
[ "$CODE" = "405" ] && pass "GET /api/contact -> 405" || fail "GET /api/contact -> $CODE (harus 405)"

section "HASIL"
if [ "$FAILS" -eq 0 ]; then
  echo "SEMUA LULUS. Siap deploy."
else
  echo "$FAILS pemeriksaan gagal. Kirim baris FAIL di atas."
  exit 1
fi