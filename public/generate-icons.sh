#!/bin/bash
# Generate simple icon placeholders using ImageMagick (if available)

if command -v convert &> /dev/null; then
  # Create icons with ImageMagick
  convert -size 16x16 xc:#10b981 -gravity center -pointsize 10 -fill white -annotate +0+0 "P" icon16.png
  convert -size 48x48 xc:#10b981 -gravity center -pointsize 32 -fill white -annotate +0+0 "P" icon48.png
  convert -size 128x128 xc:#10b981 -gravity center -pointsize 96 -fill white -annotate +0+0 "P" icon128.png
  echo "Icons generated with ImageMagick"
else
  echo "ImageMagick not found. Creating placeholder files..."
  # Create minimal PNG placeholders
  echo "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wEUBgYxM8dFbQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAALklEQVQ4y2Nk+M/wn4EIwEgwYNRAhgEjRowYiQ0DokMRbwD8Z2T4T2wYjBowtgAAUskC/4P6HREAAAAASUVORK5CYII=" | base64 -d > icon16.png
  cp icon16.png icon48.png
  cp icon16.png icon128.png
  echo "Placeholder icons created (use ImageMagick for better results)"
fi
