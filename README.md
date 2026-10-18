# Vitalik’s World

A one-page, illustrated introduction to Vitalik Buterin and Ethereum’s world computer, with colorful unicorns, rabbits, a small interactive learning demo, and filterable reading links.

The site uses Vite and TypeScript with native HTML controls. It has no runtime framework or external asset requests. The demo is an explicitly labeled local illustration: it does not connect a wallet, send a transaction, or persist state.

## Install, develop, and preview

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Create and check the production export:

```sh
npm run typecheck
npm run build
npm run preview
```

Open the local URL printed by Vite. The finished export is **`dist/`**. Serve that directory over HTTP; opening an ES-module site directly with `file://` is not supported. `vite.config.ts` sets `base: './'`, all navigation is on-page or uses hashes, and runtime images, fonts, favicon, and share image are included locally. A static host needs no route rewrites or build step.

Source, package lockfile, and the completed `dist/` are included in this delivery. No dependency directories, npm caches, vendored registries, or archives are part of the deliverable. The task’s file restrictions were respected without adding or changing an ignore file.

## Interactions

- **Explore the world computer** goes directly to the learning demo.
- Choose **Plant a carrot**, **Send a rainbow**, or **Adopt a unicorn**, then run the idea. The three illustrated computers show agreement, and a live text region announces the example. Run again or reset to the initial state.
- Reading filters show the matching resource; **All rabbit holes** restores all three.
- Mobile navigation opens inline, closes with Escape or a chosen link, and returns focus to its trigger on Escape.
- The logo and footer link return to the top. Resource cards link to Vitalik’s blog and Ethereum’s official learning/community pages.

## Actual validation

The final source passed `npm run typecheck` and `npm run build` on 18 October 2026. The build emitted the complete static export. Build tools were installed in a temporary directory during the assignment; the delivered lockfile supports the ordinary `npm ci` workflow above.

Chromium validation of **the production export served under `/preview/`** passed **24 named check groups**: responsive layout at 320, 390, 768, 1024, and 1440px; primary actions; all three demo outcomes and repeated runs; reset; all filters; mobile navigation; keyboard operation; local assets/fonts; share metadata; and resource/console checks. The 390px primary action is fully visible at y=334–386px in an 844px-high viewport. There were **zero browser errors, zero failed local resources, zero console warnings, and zero external requests on initial load**.

Axe found zero violations in the inspected initial and demo-success states at 390 and 1440px. The pinned **taste@1 probe passed 16/16 checks**, including offline loading, overflow, measured text contrast, targets, type scale, copy budget, motion, and sharing metadata. The Better Interface review covered all six domains; applicable findings were repaired and rechecked.

Limitations: WebKit could not launch because required runtime libraries were unavailable, so Safari is unverified. No physical-device or screen-reader session was performed. Root text enlargement to 200% was checked; browser-native zoom was not. These worker checks are not independent certification.

See [the review and commands](artifacts/validation.md), [interaction results](artifacts/interaction-results.json), [probe results](artifacts/taste-results.json), and [screenshots](artifacts/screenshots/). The implemented design system is documented in [DESIGN.md](DESIGN.md).

## Repeat the browser checks

`scripts/check-site.mjs` owns and closes its own temporary static server and browser sessions. Optional validation dependencies may be installed outside the repository:

```sh
npm install --prefix /tmp/vitaliks-world-checks playwright@1 axe-core@4
PLAYWRIGHT_BROWSERS_PATH=/tmp/vitaliks-world-browsers /tmp/vitaliks-world-checks/node_modules/.bin/playwright install chromium webkit
PLAYWRIGHT_BROWSERS_PATH=/tmp/vitaliks-world-browsers npm run check:browser -- /tmp/vitaliks-world-checks/node_modules/playwright/index.mjs /tmp/vitaliks-world-checks/node_modules/axe-core/axe.min.js
```

If the host has a strict process/thread limit, set `CHROMIUM_SINGLE_PROCESS=1` for the last command. The check writes results to `artifacts/interaction-results.json`, representative screenshots to `artifacts/screenshots/`, and additional inspection images to `test/scratch/`. It records an unavailable WebKit runtime as a limitation; a failed Chromium assertion exits nonzero.

The supplied probe was run unchanged with its `--out test/scratch/taste --offline` options. Its pinned source is an assignment input and is removed before delivery; the final results are retained in `artifacts/taste-results.json`.

## Assets, sources, and attribution

- [Ethereum introduction](https://ethereum.org/en/what-is-ethereum/) and [technical introduction](https://ethereum.org/developers/docs/intro-to-ethereum) support the beginner explanation of the shared world computer. The three example computers are an analogy, not network telemetry.
- [Ethereum history](https://ethereum.org/en/history/), [learning resources](https://ethereum.org/en/learn/), [community](https://ethereum.org/en/community/), and [Vitalik’s blog](https://vitalik.ca/) are the page’s reading destinations. The unicorn/rabbit motif follows the creative brief; the page does not invent personal quotations or claim endorsement.
- Portrait: [Romanpoet, VitalikButerinProfile.jpg](https://commons.wikimedia.org/wiki/File:VitalikButerinProfile.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The original JPEG is included unchanged, displayed with a CSS crop and rotation. Attribution appears on the site and in `public/assets/credits.txt`.
- DM Sans and Lora are bundled WOFF2 Latin variable fonts from Fontsource, with their SIL Open Font License texts in `public/assets/`.
- Original vector artwork lives in `src/illustrations.ts`. The share image is a real 1200×630 PNG. Optional regeneration: `node scripts/create-share.mjs /path/to/playwright/index.mjs`, followed by `npm run build`.
- Design guidance: Jakub Krehel’s [Better Interface](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills/better-interface), MIT, pinned commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`. Documentation method: Paul Bakaus’s [Impeccable](https://github.com/pbakaus/impeccable/blob/9d715cc4f5564a990ca8345abfdd5df6dc9b41c8/skill/reference/document.md), Apache-2.0, pinned commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`. Included license notices are preserved in `licenses/design-guidance.txt`.
