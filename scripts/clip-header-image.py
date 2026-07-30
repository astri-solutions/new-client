#!/usr/bin/env python3
"""
Aplica o recorte do page-header-split em uma imagem fonte e salva como PNG transparente.

Uso:
    python3 scripts/clip-header-image.py <imagem-fonte> <saida.png>

Exemplo:
    python3 scripts/clip-header-image.py assets/headers/visao-geral-source.jpg \
                                         assets/headers/visao-geral-header.png

A forma do recorte espelha o SVG mask do CSS:
    M 20 0 L 100 0 L 100 100 L 6 100 Q 0 100 0 88 C 4 68 14 22 20 0 Z
"""

import sys
from PIL import Image, ImageDraw


def quad_bezier(p0, p1, p2, steps=80):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = (1-t)**2 * p0[0] + 2*(1-t)*t * p1[0] + t**2 * p2[0]
        y = (1-t)**2 * p0[1] + 2*(1-t)*t * p1[1] + t**2 * p2[1]
        pts.append((x, y))
    return pts


def cubic_bezier(p0, c1, c2, p3, steps=160):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = ((1-t)**3 * p0[0] + 3*(1-t)**2*t * c1[0]
             + 3*(1-t)*t**2 * c2[0] + t**3 * p3[0])
        y = ((1-t)**3 * p0[1] + 3*(1-t)**2*t * c1[1]
             + 3*(1-t)*t**2 * c2[1] + t**3 * p3[1])
        pts.append((x, y))
    return pts


def clip_image(src_path: str, out_path: str, width: int = 1440, height: int = 700):
    img = Image.open(src_path).convert("RGBA")

    # Redimensiona mantendo proporção, depois centraliza e recorta
    scale = max(width / img.width, height / img.height)
    new_w = round(img.width * scale)
    new_h = round(img.height * scale)
    img = img.resize((new_w, new_h), Image.LANCZOS)

    left = (new_w - width) // 2
    top  = (new_h - height) // 2
    img = img.crop((left, top, left + width, top + height))

    # ── Monta o polígono da máscara (coordenadas em % → pixels) ─────────────
    def s(px, py):
        return (px / 100 * width, py / 100 * height)

    polygon = []
    polygon.append(s(20, 0))          # M 20 0
    polygon.append(s(100, 0))         # L 100 0
    polygon.append(s(100, 100))       # L 100 100
    polygon.append(s(0, 100))          # L 0 100 - bottom-left pontudo (sem arredondamento)
    # C 3 76  14 24  20 0 - borda esquerda diagonal
    polygon += cubic_bezier(s(0, 100), s(3, 76), s(14, 24), s(20, 0))
