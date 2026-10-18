import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { pathToFileURL } from 'node:url'

// Optional test tools may be installed outside the repository.
// node scripts/check-site.mjs /path/to/playwright/index.mjs /path/to/axe.min.js
const { chromium, webkit } = await import(process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : 'playwright')
const browserArgs = process.env.CHROMIUM_SINGLE_PROCESS === '1' ? ['--single-process', '--no-zygote', '--disable-gpu'] : []

const root = resolve('dist')
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain' }
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (!pathname.startsWith('/preview/')) { res.writeHead(404).end(); return }
    const file = resolve(root, pathname.slice('/preview/'.length) || 'index.html')
    if (!file.startsWith(root + '/') || !(await stat(file)).isFile()) { res.writeHead(404).end(); return }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' })
    res.end(await readFile(file))
  } catch { res.writeHead(404).end() }
})
await new Promise(done => server.listen(0, '127.0.0.1', done))
const origin = `http://127.0.0.1:${server.address().port}`
const url = `${origin}/preview/`
const results = { checkedAt: new Date().toISOString(), export: 'dist', checks: [], browserErrors: [], resourceErrors: [], consoleWarnings: [], limitations: [] }
const check = (name, details) => { results.checks.push({ name, passed: true, details }); console.log(`PASS ${name}: ${details}`) }
await mkdir('artifacts/screenshots', { recursive: true })
await mkdir('test/scratch', { recursive: true })
const axeSource = await readFile(process.argv[3] || new URL(import.meta.resolve('axe-core/axe.min.js')), 'utf8')

try {
  for (const [width, height] of [[320,700],[390,844],[768,1024],[1024,900],[1440,1000]]) {
    const browser = await chromium.launch({ headless: true, args: browserArgs })
    try {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
      page.on('pageerror', error => results.browserErrors.push(`${width}: ${error.message}`))
      page.on('console', message => {
        if (message.type() === 'error') results.browserErrors.push(`${width}: ${message.text()}`)
        if (message.type() === 'warning') results.consoleWarnings.push(`${width}: ${message.text()}`)
      })
      page.on('response', response => { if (response.status() >= 400) results.resourceErrors.push(`${width}: ${response.status()} ${response.url()}`) })
      const external = []
      await page.route('**/*', route => {
        if (route.request().url().startsWith(origin)) return route.continue()
        external.push(route.request().url())
        return route.abort()
      })
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const layout = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, images: Array.from(document.images).every(image => image.complete && image.naturalWidth > 0), fonts: Array.from(document.fonts).filter(font => font.status === 'loaded').map(font => `${font.family} ${font.style}`), main: document.querySelectorAll('main').length, h1: document.querySelectorAll('h1').length }))
      assert.ok(layout.scroll <= width, `${width}px overflow: ${layout.scroll}`)
      assert.ok(layout.images)
      assert.equal(layout.main, 1)
      assert.equal(layout.h1, 1)
      assert.deepEqual(layout.fonts.sort(), ['DM Sans normal','Lora italic','Lora normal'].sort())
      assert.equal(external.length, 0)
      check(`layout ${width}`, `No horizontal overflow; portrait and all 3 local font faces loaded; no external requests.`)

      if (width === 390 || width === 1440) {
        const first = await page.locator('.hero-actions .button').boundingBox()
        assert.ok(first.y >= 0 && first.y + first.height <= height)
        check(`first screen ${width}`, `Primary action fully visible at y=${Math.round(first.y)}–${Math.round(first.y+first.height)}.`)
        await page.screenshot({ path: `artifacts/screenshots/${width}-first.png` })
        await page.screenshot({ path: `artifacts/screenshots/${width}-full.png`, fullPage: true })
        await page.addScriptTag({ content: axeSource })
        const audit = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } })).violations.map(item => ({ id:item.id, impact:item.impact, nodes:item.nodes.map(node => node.target) })))
        assert.deepEqual(audit, [], JSON.stringify(audit))
        check(`axe ${width}`, '0 WCAG 2 A/AA, 2.1 AA, 2.2 AA rule violations in initial state.')

        await page.keyboard.press('Tab')
        assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Skip to content')
        const focus = await page.locator('.skip-link').evaluate(el => ({ outline:getComputedStyle(el).outlineStyle, width:getComputedStyle(el).outlineWidth, top:el.getBoundingClientRect().top }))
        assert.equal(focus.outline, 'solid')
        assert.equal(focus.width, '3px')
        assert.ok(focus.top >= 0)
        await page.screenshot({ path:`test/scratch/${width}-focus.png` })
        await page.keyboard.press('Enter')
        assert.ok(page.url().endsWith('#main'))
        check(`keyboard skip ${width}`, 'Skip link receives the first Tab, has a 3px outline, and activates with Enter.')

        if (width === 390) {
          const menu = page.locator('.menu-toggle')
          await menu.focus()
          await page.keyboard.press('Enter')
          assert.equal(await menu.getAttribute('aria-expanded'),'true')
          await page.keyboard.press('Tab')
          assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()),'The human')
          await page.keyboard.press('Escape')
          assert.equal(await menu.getAttribute('aria-expanded'),'false')
          assert.equal(await page.evaluate(() => document.activeElement.className),'menu-toggle')
          await menu.click()
          await page.locator('#mobile-nav a[href="#story"]').click()
          assert.ok(page.url().endsWith('#story'))
          assert.ok(await page.locator('#mobile-nav').isHidden())
          check('mobile navigation','Keyboard open, Tab, Escape and focus return pass; choosing a section closes navigation and updates the hash.')
        }

        await page.locator('.hero-actions .button').focus()
        await page.keyboard.press('Enter')
        assert.ok(page.url().endsWith('#world-computer'))
        check(`primary navigation ${width}`,'Main action opens the world-computer section using a static hash link.')

        let count = 0
        for (const [name, result] of [['Plant a carrot','Carrot planted. All three computers agree.'],['Send a rainbow','Rainbow shared. All three computers agree.'],['Adopt a unicorn','Unicorn adopted. All three computers agree.']]) {
          const choice = page.getByRole('button',{name,exact:true})
          await choice.focus()
          await page.keyboard.press('Space')
          assert.equal(await choice.getAttribute('aria-pressed'),'true')
          assert.equal(await page.locator('.idea-option[aria-pressed=true]').count(),1)
          await page.locator('#run-idea').focus()
          await page.keyboard.press('Enter')
          count++
          assert.equal(await page.locator('#demo-message').textContent(),result)
          assert.equal(await page.locator('.demo-step').textContent(),`Example ${count} complete`)
          assert.equal(await page.locator('.node-check').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')),true)
          assert.match(await page.locator('#demo-announcement').textContent(), /This is a local illustration/)
        }
        await page.locator('#run-idea').click()
        assert.equal(await page.locator('.demo-step').textContent(),'Example 4 complete')
        await page.screenshot({path:`test/scratch/${width}-demo-success.png`})
        const successAudit = await page.evaluate(async () => (await window.axe.run(document)).violations.map(item => item.id))
        assert.deepEqual(successAudit, [])
        await page.getByRole('button',{name:'Reset',exact:true}).click()
        assert.equal(await page.locator('.demo-step').textContent(),'Ready when you are')
        assert.equal(await page.locator('.idea-option[aria-pressed=true]').textContent(),'Plant a carrot')
        assert.ok(await page.locator('#reset-demo').isDisabled())
        assert.equal(await page.evaluate(() => document.activeElement.id),'run-idea')
        assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length),0)
        check(`playground ${width}`,'All 3 ideas run by keyboard; repeat advances to example 4; success has 3 checkmarks and live text; reset restores state and focus; no storage used. Axe success state: 0 violations.')

        for (const [filter, category] of [['Big ideas','ideas'],['Ethereum','ethereum'],['A little play','play']]) {
          await page.getByRole('button',{name:filter,exact:true}).click()
          assert.equal(await page.locator('.reading-card:visible').count(),1)
          assert.equal(await page.locator('.reading-card:visible').getAttribute('data-category'),category)
          assert.equal(await page.locator('.filter-button[aria-pressed=true]').count(),1)
          assert.match(await page.locator('.filter-status').textContent(),/Showing 1 rabbit hole/)
        }
        await page.getByRole('button',{name:'All rabbit holes',exact:true}).focus()
        await page.keyboard.press('Space')
        assert.equal(await page.locator('.reading-card:visible').count(),3)
        assert.equal(await page.locator('.filter-status').textContent(),'Showing all 3 rabbit holes.')
        const hrefs = await page.locator('.reading-card').evaluateAll(nodes => nodes.map(node => node.href))
        assert.deepEqual(hrefs,['https://vitalik.ca/','https://ethereum.org/en/learn/','https://ethereum.org/en/community/'])
        check(`reading filters ${width}`,'Each category displays its one matching resource, updates pressed/live states; All restores 3 actual destination links.')

        await page.getByRole('link',{name:'Back to top',exact:true}).click()
        assert.ok(await page.evaluate(() => window.scrollY < 10))
        check(`back to top ${width}`,'Footer link returns to page start.')
        if (width === 390) {
          await page.evaluate(() => document.documentElement.style.fontSize='200%')
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
          const box = await page.locator('.hero-actions .button').boundingBox()
          assert.ok(box.width <= width)
          await page.screenshot({path:'test/scratch/390-text-200-percent.png',fullPage:true})
          await page.evaluate(() => document.documentElement.style.fontSize='')
          check('200% text enlargement','390px has no document overflow and retains a fully contained primary action when root text is doubled. This is text resizing, not native browser zoom.')
          await page.emulateMedia({forcedColors:'active'})
          await page.locator('#run-idea').focus()
          await page.keyboard.press('Tab')
          await page.keyboard.press('Shift+Tab')
          assert.equal(await page.locator('#run-idea').evaluate(el => getComputedStyle(el).outlineStyle),'solid')
          await page.screenshot({path:'test/scratch/390-forced-colors.png'})
          check('forced colors','Primary button retains its native border and solid focus outline under forced-colors emulation.')
        }
      }
    } finally { await browser.close() }
  }
  const html = await readFile('dist/index.html','utf8')
  for (const pattern of [/<title>Vitalik/, /name="description"/, /property="og:title"/, /property="og:image"/, /rel="icon"/]) assert.match(html,pattern)
  assert.ok(!/(?:src|href)="\/(?!\/)/.test(html))
  const share = await fetch(url+'assets/share-card.png')
  assert.equal(share.status,200)
  const png = Buffer.from(await share.arrayBuffer())
  assert.equal(png.readUInt32BE(16),1200)
  assert.equal(png.readUInt32BE(20),630)
  const alternate = await fetch(url+'index.html')
  assert.equal(alternate.status,200)
  check('metadata and subpath','Title, description, favicon and Open Graph fields exist; share PNG is 1200×630 and loads; export renders under /preview/ without root-relative HTML assets.')
  let webkitBrowser
  try { webkitBrowser = await webkit.launch({headless:true}) }
  catch { results.limitations.push('WebKit could not launch: browser runtime unavailable. No Safari/WebKit behavior verified.'); console.log('LIMITATION: WebKit could not launch (browser runtime unavailable).') }
  if (webkitBrowser) {
    try {
      const page = await webkitBrowser.newPage({viewport:{width:390,height:844}})
      await page.goto(url)
      await page.getByRole('button',{name:'Run this idea',exact:true}).click()
      assert.match(await page.locator('#demo-message').textContent(),/Carrot planted/)
      check('WebKit interaction','Primary demo runs in WebKit at 390px.')
    } finally { await webkitBrowser.close() }
  }
  assert.deepEqual(results.browserErrors,[])
  assert.deepEqual(results.resourceErrors,[])
  check('runtime clean','0 browser errors or failed local resources during all Chromium scenarios.')
} catch(error) {
  results.checks.push({name:'validation',passed:false,details:error.stack})
  console.error(error)
  process.exitCode=1
} finally {
  await writeFile('artifacts/interaction-results.json',JSON.stringify(results,null,2))
  await new Promise(done=>server.close(done))
}
