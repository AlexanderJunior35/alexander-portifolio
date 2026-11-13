# Design System — Alexander Junior Portfolio

## Direction
Dark, technical, terminal-inspired. Feels like a dev's workspace, not a template. Restrained: one accent color, monospace for labels and accents, generous spacing.

## Colors (CSS variables in styles.css)
- --bg: #0b0f14 (base background)
- --bg-elev: #111821 (cards)
- --border: #1f2a37
- --fg: #e6edf3 (primary text)
- --fg-muted: #8b98a5 (secondary text)
- --accent: #3ddc97 (terminal green — links, highlights, prompts)
- --accent-2: #58a6ff (secondary accent, sparingly)

## Typography
- Display / body: Poppins (400, 500, 600, 700)
- Labels, tags, code-like accents: JetBrains Mono (400, 500)
- Scale: h1 56px/1.05, h2 32px/1.2, h3 20px/1.3, body 16px/1.7, label 13px mono uppercase tracking 0.08em

## Spacing
8px base. Section padding 96px desktop / 64px mobile. Max content width 1080px.

## Components
- Section header: mono prompt prefix ("$ cat sobre.md") + h2
- Card: bg-elev, 1px border, radius 12px, hover border accent
- Tag/chip: mono 12px, border accent at 40%, text accent
- Button primary: accent bg, dark text. Secondary: border only
- Timeline item for experience: left rule with accent dot

## Layout
Single page, sticky top nav with section anchors and PT/EN toggle. Hero is asymmetric: text left, photo right with a subtle accent offset frame.

## Motion
One staggered fade-up on load (hero elements, 80ms steps). Hover transitions 200ms. Respect prefers-reduced-motion.

## Backgrounds
Subtle grid pattern at 4% opacity behind hero. No gradients blobs.

## Anti-patterns avoided
No purple gradients, no generic card grids without hierarchy, no Inter/Roboto.
