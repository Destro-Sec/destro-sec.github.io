// scripts/generate-og.js — Generates assets/og-image.png from SVG
// Run: node scripts/generate-og.js

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const OUT = path.join(__dirname, '..', 'assets', 'og-image.png');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#0d0d0f"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="600" y2="315" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#ff6b35" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff6b35" stroke-opacity="0.06" stroke-width="0.8"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Grid texture -->
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Glow blob top-left -->
  <ellipse cx="120" cy="120" rx="320" ry="280" fill="url(#accent)"/>

  <!-- Right side wireframe cube (simplified) -->
  <g transform="translate(820, 80)" opacity="0.18" stroke="#ff6b35" stroke-width="1.2" fill="none">
    <!-- Front face -->
    <rect x="80" y="80" width="220" height="220"/>
    <!-- Top face -->
    <path d="M80 80 L140 20 L360 20 L300 80 Z"/>
    <!-- Right face -->
    <path d="M300 80 L360 20 L360 240 L300 300 Z"/>
    <!-- Inner grid lines -->
    <line x1="153" y1="80" x2="153" y2="300"/>
    <line x1="226" y1="80" x2="226" y2="300"/>
    <line x1="80" y1="153" x2="300" y2="153"/>
    <line x1="80" y1="226" x2="300" y2="226"/>
  </g>

  <!-- Top-left vertical accent bar -->
  <rect x="60" y="60" width="3" height="510" fill="#ff6b35" opacity="0.7" rx="2"/>

  <!-- Logo text — "DESTRO SEC" wordmark -->
  <text x="100" y="198"
        font-family="'Arial Black', 'Helvetica Neue', sans-serif"
        font-size="88"
        font-weight="900"
        letter-spacing="-3"
        fill="#e8e8ec">DESTRO</text>
  <text x="100" y="296"
        font-family="'Arial Black', 'Helvetica Neue', sans-serif"
        font-size="88"
        font-weight="900"
        letter-spacing="-3"
        fill="#ff6b35">SEC</text>

  <!-- Tagline -->
  <text x="100" y="360"
        font-family="'Courier New', monospace"
        font-size="26"
        letter-spacing="6"
        fill="#5a5a6a">BUILT FOR BREAK IN</text>

  <!-- Divider line -->
  <rect x="100" y="400" width="480" height="1" fill="#ffffff" opacity="0.08"/>

  <!-- Three verticals -->
  <g font-family="'Courier New', monospace" font-size="18" letter-spacing="2">
    <circle cx="116" cy="440" r="4" fill="#e63946"/>
    <text x="132" y="447" fill="#9090a0">SECURITY</text>

    <circle cx="286" cy="440" r="4" fill="#3a86ff"/>
    <text x="302" y="447" fill="#9090a0">SOFTWARE</text>

    <circle cx="476" cy="440" r="4" fill="#ffbe0b"/>
    <text x="492" y="447" fill="#9090a0">EDUCATION</text>
  </g>

  <!-- URL bottom-right -->
  <text x="1140" y="590"
        font-family="'Courier New', monospace"
        font-size="20"
        fill="#5a5a6a"
        text-anchor="end">destrosec.com</text>

  <!-- Bottom accent line -->
  <rect x="0" y="620" width="1200" height="10" fill="#ff6b35" opacity="0.6" rx="0"/>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(OUT)
  .then(() => console.log(`✅  OG image generated → ${OUT}`))
  .catch(err => { console.error('❌  Error:', err.message); process.exit(1); });
