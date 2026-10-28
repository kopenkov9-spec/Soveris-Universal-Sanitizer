# Soveris Universal Sanitizer

A **local-first, zero-dependency** browser tool for examining suspicious Unicode, file format signatures, and some embedded metadata. Interface in Bulgarian and English. Open `index.html` locally or upload `index.html`, `styles.css`, `core.js`, and `app.js` to a static web host.

## Current capabilities

- Inspect text for invisible Unicode controls and context-sensitive joiners; remove explicit controls, with separate opt-in for ZWJ/ZWNJ.
- Inspect signatures of PNG, JPEG, WebP, MP3, WAV, MP4/MOV and WebM/MKV.
- Re-encode still PNG/JPEG/WebP images via browser canvas, usually stripping EXIF and application metadata. **May alter pixels, color, orientation, and animation**; keep originals.
- Strip simple MP3 ID3v2 and ID3v1 tags without transcoding audio; malformed formats fail closed.
- Video and WAV are **inspection only** in this version. No unverified metadata removal is attempted.
- No upload endpoint or external dependency. Files are processed entirely in the user's browser.

## Tests

Run `node --test tests/*.test.cjs` with Node.js 18 or newer. A GitHub Actions workflow is included.

## Important limitations

This is **not** a reliable AI-content detector, not a SynthID remover, not a C2PA verifier, and cannot guarantee removal of AI-origin signals or statistical/proprietary watermarks. Image re-encoding is not lossless. Do not rely on cleaned files for evidentiary authenticity. Keep originals. This is an initial functional baseline, not a completed production sanitizer.

## Deployment

The deployed site `contentcleaner.free.bg` is not automatically linked to GitHub. Upload the four web files separately. Review the code and verify against original site before replacing it.

## License

No license granted by default; repository owner to decide.
