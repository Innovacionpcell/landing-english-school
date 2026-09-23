#!/usr/bin/env python3
"""Genera public/og-growth-digital.jpg (1200×630) — imagen al compartir en WhatsApp/LinkedIn/Facebook/X.
Uso: python3 scripts/og-image.py  (requiere Pillow y los TTF de Montserrat/Roboto indicados en FONTS)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = {  # rutas a TTF estáticos (Montserrat 800/700, Roboto 400/700)
    'h': os.environ.get('OG_FONT_HEAD', '/tmp/Montserrat-800.ttf'),
    'h2': os.environ.get('OG_FONT_HEAD2', '/tmp/Montserrat-700.ttf'),
    'b': os.environ.get('OG_FONT_BODY', '/tmp/Roboto-400.ttf'),
    'bb': os.environ.get('OG_FONT_BODY_BOLD', '/tmp/Roboto-700.ttf'),
}
W, H = 1200, 630
BLUE, RED, YELLOW, GREEN = '#0386fb', '#ff4234', '#f5b400', '#00a94f'
INK, BG1, BG2, MUTED = '#ffffff', (9, 18, 36), (14, 32, 66), (168, 182, 204)

def font(k, size): return ImageFont.truetype(FONTS[k], size)

# ---------- fondo con degradado + brillo ----------
img = Image.new('RGB', (W, H), BG1)
grad = Image.new('RGB', (W, H))
gp = grad.load()
for y in range(H):
    for x in range(W):
        t = (x / W) * 0.6 + (y / H) * 0.4
        gp[x, y] = tuple(int(BG1[i] + (BG2[i] - BG1[i]) * t) for i in range(3))
img = grad
glow = Image.new('RGB', (W, H), (0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((-200, 250, 520, 900), fill=(3, 60, 140))
glow = glow.filter(ImageFilter.GaussianBlur(160))
img = Image.blend(img, Image.composite(glow, img, glow.convert('L').point(lambda v: min(255, v * 2))), 0.35)

# ---------- foto (derecha) con fundido hacia el fondo ----------
photo = Image.open(os.path.join(ROOT, 'src/assets/andres/andres-hero.jpg')).convert('RGB')
# recorte: cara y torso, proporción ~ 620×630
# recorte centrado en el rostro (evita el texto de la camiseta): 760×772 desde (230, 30)
photo = photo.crop((230, 30, 990, 802)).resize((620, 630), Image.LANCZOS)
# oscurecer un poco y teñir hacia el azul del fondo para integrarla
tint = Image.new('RGB', photo.size, BG2)
photo = Image.blend(photo, tint, 0.18)
mask = Image.new('L', photo.size, 255)
mp = mask.load()
for x in range(photo.width):
    a = 0 if x < 40 else min(255, int((x - 40) / 260 * 255))
    for y in range(photo.height):
        mp[x, y] = a
img.paste(photo, (W - photo.width, 0), mask)

d = ImageDraw.Draw(img)
# ---------- franja Google arriba ----------
seg = W / 4
for i, col in enumerate([BLUE, RED, YELLOW, GREEN]):
    d.rectangle((i * seg, 0, (i + 1) * seg, 8), fill=col)

# ---------- marca ----------
icon = Image.open(os.path.join(ROOT, 'src/assets/brand/logo-icon.png')).convert('RGBA')
icon.thumbnail((58, 58), Image.LANCZOS)
img.paste(icon, (64, 44), icon)
x = 64 + icon.width + 14
letters = [('G', BLUE), ('r', RED), ('o', YELLOW), ('w', BLUE), ('t', GREEN), ('h', RED), (' ', INK),
           ('D', RED), ('i', YELLOW), ('g', BLUE), ('i', GREEN), ('t', RED), ('a', BLUE), ('l', RED)]
fw = font('h', 34)
for ch, col in letters:
    d.text((x, 54), ch, font=fw, fill=col)
    x += d.textlength(ch, font=fw)
d.text((64 + icon.width + 14, 96), 'Agencia de marketing digital · Medellín', font=font('b', 17), fill=MUTED)

# ---------- titular (dolor + curiosidad) ----------
fh = font('h', 60)
y = 168
d.text((64, y), '¿Tu web y tus anuncios', font=fh, fill=INK); y += 70
d.text((64, y), 'no te traen', font=fh, fill=INK)
xx = 64 + d.textlength('no te traen ', font=fh)
d.text((xx, y), 'clientes?', font=fh, fill=YELLOW); y += 88

# ---------- promesa concreta ----------
fs = font('h2', 27)
d.text((64, y), 'Te digo exactamente por qué en 30 minutos.', font=fs, fill=INK); y += 36
d.text((64, y), 'Gratis y sin compromiso.', font=fs, fill=MUTED); y += 62

# ---------- prueba social ----------
def star(cx, cy, r, col):
    import math
    pts = []
    for i in range(10):
        ang = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.45
        pts.append((cx + rr * math.cos(ang), cy + rr * math.sin(ang)))
    d.polygon(pts, fill=col)
fb = font('bb', 20)
label_sp = '4.9 · 73 reseñas en Google'
pill_w = 148 + d.textlength(label_sp, font=fb) + 22
d.rounded_rectangle((64, y, 64 + pill_w, y + 44), radius=22, fill=(24, 40, 70), outline=(70, 95, 130))
for i in range(5):
    star(64 + 26 + i * 22, y + 22, 9, YELLOW)
d.text((64 + 148, y + 11), label_sp, font=fb, fill=INK)
y += 66

# ---------- CTA ----------
fc = font('h2', 24)
label = 'Agenda tu diagnóstico gratis'
tw = d.textlength(label, font=fc)
bw = tw + 56 + 34
d.rounded_rectangle((64, y, 64 + bw, y + 58), radius=29, fill=BLUE)
d.text((64 + 28, y + 15), label, font=fc, fill=INK)
ax = 64 + 28 + tw + 14; ay = y + 29  # flecha dibujada (el subset de la fuente no trae '→')
d.line((ax, ay, ax + 18, ay), fill=INK, width=3)
d.line((ax + 10, ay - 7, ax + 18, ay), fill=INK, width=3); d.line((ax + 10, ay + 7, ax + 18, ay), fill=INK, width=3)
d.text((64 + bw + 22, y + 19), 'growthdigital.marketing', font=font('b', 19), fill=MUTED)

# Nombre con versión: WhatsApp/Facebook cachean por URL; al cambiar el diseño, sube el sufijo aquí y en Base.astro.
out = os.path.join(ROOT, 'public/og-growth-digital-v3.jpg')
# JPEG baseline (no progresivo): algunos generadores de vista previa (WhatsApp) no muestran bien los progresivos
img.save(out, 'JPEG', quality=88, optimize=True, progressive=False)
print('OK', out, os.path.getsize(out) // 1024, 'KB')
