# Vitalik’s World design system

## Overview

An illustrated reading and discovery page for people curious about Vitalik Buterin and Ethereum. A cream paper surface, literary headings, lilac accents, and original unicorn/rabbit stickers carry the requested playful character. The hero is a scrapbook composition around a real portrait. The rest of the page uses shared edges, generous section space, and simple native controls.

The source of truth is `src/style.css`. Page structure and state behavior are in `src/main.ts`; vector artwork is in `src/illustrations.ts`. This is a vanilla TypeScript application, not a component-framework library.

## Colors

Canonical values are hex CSS properties in `src/style.css:5`. Semantic properties map the main roles to palette primitives.

| Role / token | Value | Usage |
| --- | --- | --- |
| `--color-page` / `--cream-50` | `#faf8f1` | Page and light text on dark actions |
| `--cream-100` | `#f0ece2` | Quiet hover surfaces |
| `--color-line` / `--cream-300` | `#ded8cb` | Neutral dividers and outlined controls |
| `--color-text` / `--ink-900` | `#302b34` | Main text, selected options, dark action |
| `--color-muted` / `--ink-600` | `#655f68` | Supporting prose and captions |
| `--color-accent` / `--purple-600` | `#7046a1` | Primary actions, brand flower, emphasized headings |
| `--color-accent-hover`, `--color-focus` / `--purple-700` | `#593580` | Primary hover and keyboard outlines |
| `--color-on-accent` | `#ffffff` | Text on purple actions |
| `--color-section` / `--purple-50` | `#f4eff8` | World-computer section |
| `--color-selected` / `--purple-100` | `#ece3f4` | Option hover, lilac reading card, hero artwork |
| `--purple-200` | `#dfcdeb` | Text selection |
| `--green-100` | `#e8eedb` | Ethereum reading card and decorative sticker |
| `--peach-100` | `#f6e4d8` | Community reading card |
| `--yellow-100` | `#f3e6b9` | Closing invitation surface |

Illustration-specific colors stay with the SVG art; they do not communicate app status. Selected controls use a dark fill plus `aria-pressed`. Demo success uses checkmarks and explicit text, so it does not depend on color.

Measured by the rendered probe: main text on cream 12.99:1, muted hero prose on cream 5.83:1, white primary-button text on purple 6.82:1, muted computer-section text 5.47:1, and reading-category text on lilac 4.97:1. The final probe passed all measured text pairs. No dark theme is implemented.

## Typography

Local faces in `public/assets/`:

- **DM Sans**, variable normal, `dm-sans-latin.woff2`; fallback `Arial, sans-serif`. Body and controls use 400; controls, branding, and results use 600.
- **Lora**, variable normal and italic, `lora-latin.woff2` and `lora-italic-latin.woff2`; fallback `Georgia, serif`. Headings and illustrated annotations use 600. Italic emphasis is an actual loaded face.

All three faces were observed loaded in Chromium at the checked widths. Body line height is 1.6; h1 is 1.13 desktop / 1.16 phone; h2 is 1.2; h3 is 1.35. Short annotations use 1.5–1.6. Heading tracking is −0.055em for h1, −0.045em for h2, and −0.025em for h3. Body tracking is natural.

| Token | Desktop | 390px | Role |
| --- | --- | --- | --- |
| `--text-small` | 14px | 14px | Navigation, metadata, secondary actions |
| `--text-body` | 16px | 16px | Prose and main controls |
| `--text-lead` | 20px | 20px | Hero lead on desktop; phone brand |
| `--text-title` | 24px | 24px | Card headings and desktop brand |
| `--text-heading` | 40px | 32px | Section headings |
| `--text-hero` | 76px | 52px | Hero title |

The hero steps to 64px at ≤1150px, 56px at ≤900px, and 44px below 360px. Section headings use 36px at ≤900px, then 32px at ≤650px. Card headings use 20px from 651–900px and 24px on phones and wide screens. There are six font sizes per viewport, with two families and two weights. Hero prose is capped at 425px; section prose around 410–510px. Headings balance and paragraphs use pretty wrapping. Text is never truncated with ellipses.

## Layout

`.wrap` is the shared alignment primitive: max-width 1200px with a centered responsive gutter. Its width is `100% - 112px` by default, `100% - 80px` at ≤1150px, `100% - 64px` at ≤900px, `100% - 40px` at ≤650px, and `100% - 32px` below 360px.

The spacing tokens cover 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Component geometry also uses 20 and 28px padding/gaps where the design calls for it. `.section-space` is 96px vertically on wide screens, 64px at ≤900px, and 52px at ≤650px.

Wide hero, story, and computer sections use two columns; the hero action row switches to horizontal at ≥1200px. At ≤900px desktop navigation becomes an inline mobile disclosure. At ≤650px the hero, story, computer layout, reading grid, and closing invitation stack. Text and the primary action precede the hero artwork in both DOM and visual order. Decorative artwork uses proportional positions within its own aspect-ratio box, not viewport overlays.

The reading grid has three equal columns with a 24px gap, reduced to 16px at ≤900px. At ≤650px it becomes one column. Card width remains consistent when filters hide siblings. Native controls wrap rather than clip. `.network-node > span` allows word wrapping under text enlargement.

The export was checked for overflow at 320, 390, 768, 1024, and 1440px; screenshots were inspected at phone, intermediate, and desktop widths. 200% root text enlargement at 390px also passed. Native zoom and RTL mirroring were not performed; the delivered language is English.

## Elevation & Depth

The interface is predominantly flat. Reading cards and the closing section use tonal fills without shadows or borders. The portrait’s `.polaroid` alone uses `0 8px 24px #3d284516` to read as a piece of paper. The photo has a black 10% inset outline. Sticker illustrations use a cream drop-shadow to suggest a cut paper edge. The hero is an isolated stacking context, with the portrait at z-index 1 and stickers at 2. Only the keyboard skip link uses a page-level overlay, at z-index 10.

Dividers and selection borders communicate structure. There are no nested UI cards, floating persistent controls, dialogs, or animated page entrances.

## Shapes

`--radius-small: 8px` belongs to idea options and reset; `--radius-medium: 16px` to reading cards and the closing surface; `--radius-pill: 100px` to main actions, category filters, and the header action. The mobile menu trigger and Ethereum sticker are circular. The irregular lilac hero blob, paper tape, and rotations belong only to the scrapbook illustration.

## Components

| Pattern | Source | Behavior and reuse |
| --- | --- | --- |
| Brand and navigation | `src/main.ts:8`, `.site-header`, `.brand`, `.mobile-nav` | Native links; mobile button exposes `aria-expanded` and `aria-controls`. Escape closes the inline disclosure and restores focus. Resize above 900px closes it. |
| Actions | `.button`, `.button-primary`, `.button-dark`, `.text-link` | Purple identifies the primary action; the closing invitation uses the dark variant. Actions are at least 48–52px tall; secondary links are 44px. Text links underline on hover. |
| Focus | `src/style.css:25` | A 3px purple outline with 5px offset. Forced colors use `Highlight`; controls retain borders. A first-focus skip link leads to `main`. |
| Hero collage | `src/main.ts:35`, `.hero-art` | One accessible image description covers the portrait and decorative stickers. Internal art is not interactive. Keep scrapbook geometry isolated from content layout. |
| Idea picker and results | `src/main.ts:76`, `src/main.ts:125` onward | Native buttons in a labeled fieldset, one pressed state, stable result area, explicit ready/completed text. Run repeats with an example count. Reset restores the carrot and returns focus to Run. A stable polite live region announces updates. State is in memory. |
| Reading filters and cards | `src/main.ts:85`, `src/main.ts:180` onward | Native pressed buttons filter the three real links. `[hidden]` removes nonmatching cards from layout and keyboard order. A live result count updates. Entire cards are links; no nested buttons. |
| Artwork and icons | `src/illustrations.ts` | `arrow(direction)`, `flower`, `ethereum`, `star`, `bunny`, `unicorn`, `planet`, and `book`. Decorative SVGs are hidden from accessibility APIs. Navigation icons use `currentColor`. |

There are no server requests, loading screens, form errors, destructive actions, or empty search states. Each filter has a matching resource. Do not invent those states when extending this small local illustration.

Hover effects are gated by `(hover: hover)`. Under `prefers-reduced-motion: no-preference`, primary actions use 150ms color/transform transitions and a 0.96 press scale; checkmarks fade over 150ms and hash scrolling is smooth. Reduced motion removes those effects. Nothing animates endlessly.

## Do’s and Don’ts

- Start new sections with `.wrap`, a real heading, and the existing six-step type scale. Use the prose widths and section gaps already implemented.
- Keep one prominent action per local view and give actions descriptive verb labels. Keep external reading destinations as native links.
- Reuse the original SVGs for the unicorn/rabbit character; keep decorative overlap inside artwork. Keep important captions clear of stickers.
- Use live text and selected-state semantics alongside visual changes. Preserve keyboard access and the motion guard.
- Keep assets local and Vite’s relative base. After changing a runtime asset or source, rebuild `dist/` and recheck the export.
- For another on-page section, reuse the existing heading/prose/action pattern, add its hash link, and check the 320px layout and enlarged text. Do not introduce a new font, type size, wallet connection, or autoplay effect to extend this editorial page.
