// Optional asset regeneration: node scripts/create-share.mjs /absolute/path/to/playwright/index.mjs
import { readFile, mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { flower, unicorn, bunny, ethereum, star } from '../src/illustrations.ts'

const modulePath = process.argv[2]
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright')
const font = await readFile(new URL('../public/assets/lora-latin.woff2', import.meta.url))
const sans = await readFile(new URL('../public/assets/dm-sans-latin.woff2', import.meta.url))
const browser = await chromium.launch({ headless: true, args: process.env.CHROMIUM_SINGLE_PROCESS === '1' ? ['--single-process', '--no-zygote', '--disable-gpu'] : [] })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html lang="en"><head><style>
    @font-face{font-family:Lora;src:url(data:font/woff2;base64,${font.toString('base64')})}
    @font-face{font-family:DM;src:url(data:font/woff2;base64,${sans.toString('base64')})}
    *{box-sizing:border-box}body{margin:0;background:#faf8f1;color:#302b34;font-family:DM,sans-serif;padding:56px 64px}svg{width:100%;height:100%;display:block}.brand{display:flex;gap:14px;align-items:center;font-size:26px;font-weight:600}.flower{width:42px;height:42px;color:#7046a1}h1{font:600 82px/1.12 Lora,serif;letter-spacing:-4px;margin:65px 0 24px;position:relative;z-index:2}h1 span{color:#7046a1}.sub{font-size:22px;max-width:470px;line-height:1.5}.blob{position:absolute;right:48px;top:95px;width:430px;height:430px;background:#ece3f4;border-radius:48% 55% 42% 50%;transform:rotate(-12deg)}.unicorn{position:absolute;right:160px;top:185px;width:330px;height:310px;transform:rotate(-10deg)}.bunny{position:absolute;right:42px;top:260px;width:160px;height:230px;transform:rotate(10deg)}.eth{position:absolute;right:110px;top:100px;width:65px;height:90px}.star{position:absolute;right:425px;top:102px;width:60px;height:60px;color:#e5bb5b}.small-star{position:absolute;right:175px;top:505px;width:35px;height:35px;color:#7046a1}.footer{position:absolute;bottom:40px;left:64px;font-size:16px;color:#655f68}
  </style></head><body><div class="brand"><span class="flower">${flower}</span>vitalik’s world.</div><h1>A big mind.<br><span>A little magic.</span></h1><div class="sub">Vitalik Buterin, the world computer,<br>and a more colorful internet.</div><div class="blob"></div><div class="unicorn">${unicorn}</div><div class="bunny">${bunny}</div><div class="eth">${ethereum}</div><div class="star">${star}</div><div class="small-star">${star}</div><div class="footer">An independent tribute to curiosity.</div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await mkdir(new URL('../public/assets/', import.meta.url), { recursive: true })
  await page.screenshot({ path: new URL('../public/assets/share-card.png', import.meta.url).pathname })
  process.stdout.write('Created public/assets/share-card.png (1200 × 630).\n')
} finally {
  await browser.close()
}
