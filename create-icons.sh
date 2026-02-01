#!/bin/bash

# Create 192x192 icon (medical cross with purple background)
cat > icon-192.svg << 'SVGEOF'
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#8b5cf6" rx="32"/>
  <g transform="translate(96, 96)">
    <rect x="-16" y="-48" width="32" height="96" fill="white" rx="4"/>
    <rect x="-48" y="-16" width="96" height="32" fill="white" rx="4"/>
    <circle cx="0" cy="-32" r="6" fill="#8b5cf6"/>
    <circle cx="-32" cy="0" r="6" fill="#8b5cf6"/>
    <circle cx="32" cy="0" r="6" fill="#8b5cf6"/>
    <circle cx="0" cy="32" r="6" fill="#8b5cf6"/>
  </g>
</svg>
SVGEOF

# Create 512x512 icon
cat > icon-512.svg << 'SVGEOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#8b5cf6" rx="64"/>
  <g transform="translate(256, 256)">
    <rect x="-40" y="-120" width="80" height="240" fill="white" rx="12"/>
    <rect x="-120" y="-40" width="240" height="80" fill="white" rx="12"/>
    <circle cx="0" cy="-80" r="16" fill="#8b5cf6"/>
    <circle cx="-80" cy="0" r="16" fill="#8b5cf6"/>
    <circle cx="80" cy="0" r="16" fill="#8b5cf6"/>
    <circle cx="0" cy="80" r="16" fill="#8b5cf6"/>
  </g>
</svg>
SVGEOF

echo "SVG icons created"

# Convert SVG to PNG if rsvg-convert is available
if command -v rsvg-convert &> /dev/null; then
    echo "Converting SVG to PNG..."
    rsvg-convert icon-192.svg -w 192 -h 192 -o icon-192.png
    rsvg-convert icon-512.svg -w 512 -h 512 -o icon-512.png
    echo "PNG icons created: icon-192.png, icon-512.png"
else
    echo "rsvg-convert not found. Install with: sudo apt-get install librsvg2-bin"
    echo "PNG icons not created - please convert manually or use online tools"
fi
