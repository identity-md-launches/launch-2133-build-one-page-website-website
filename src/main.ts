import './style.css'
import { arrow, flower, ethereum, star, bunny, unicorn, planet, book } from './illustrations'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="brand" href="#" aria-label="Vitalik’s World, back to top"><span class="brand-flower">${flower}</span><span>vitalik’s world<span class="brand-dot">.</span></span></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#story">The human</a>
      <a href="#world-computer">The world computer</a>
      <a href="#rabbit-holes">Rabbit holes</a>
    </nav>
    <a class="header-action" href="#rabbit-holes">Stay curious ${arrow('diagonal')}</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation"><svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button>
  </header>
  <nav class="mobile-nav wrap" id="mobile-nav" aria-label="Mobile navigation" hidden>
    <a href="#story">The human ${arrow()}</a>
    <a href="#world-computer">The world computer ${arrow()}</a>
    <a href="#rabbit-holes">Rabbit holes ${arrow()}</a>
  </nav>

  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title">A big mind.<br><em>A little magic.</em></h1>
        <p class="hero-intro">Explore Vitalik Buterin’s world of Ethereum, colorful unicorns, and boundless curiosity.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#world-computer">Explore the world computer ${arrow()}</a>
          <a class="text-link" href="#story">Meet the human ${arrow('down')}</a>
        </div>
        <div class="hero-footnote"><span class="mini-flower">${flower}</span><p>Big ideas are better with a little wonder.</p></div>
      </div>
      <div class="hero-art" role="img" aria-label="A scrapbook portrait of Vitalik Buterin surrounded by a rainbow-maned unicorn, a rabbit, stars, and the Ethereum symbol.">
        <div class="art-blob"></div>
        <svg class="art-orbit" viewBox="0 0 560 550" fill="none" aria-hidden="true"><ellipse cx="280" cy="280" rx="250" ry="161" transform="rotate(-32 280 280)" stroke="#b9a3cd" stroke-width="1.5" stroke-dasharray="5 7"/><path d="M100 64c-21 11-23 35-12 42m-15-4 16 5 4-16M426 459c18-5 31-18 32-35m-10 8 11-10 8 13" stroke="#7046a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="art-spark art-spark-one">${star}</div>
        <div class="art-spark art-spark-two">${star}</div>
        <div class="eth-sticker">${ethereum}</div>
        <div class="polaroid"><img src="./assets/vitalik.jpg" alt="" width="2305" height="1977" fetchpriority="high"><span>Vitalik Buterin</span><span class="tape"></span></div>
        <div class="unicorn-sticker">${unicorn}</div>
        <div class="bunny-sticker">${bunny}</div>
        <span class="art-note">a wonderfully<br>different kind of builder</span>
        <svg class="tiny-spark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7 7l26 26M7 33 33 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      </div>
    </section>

    <div class="values-strip wrap" aria-label="A world built on curiosity, openness, and imagination">
      <span>${planet} A world for everyone</span>
      <span>${ethereum} Open by design</span>
      <span>${flower} Room for a little weird</span>
    </div>

    <section class="story section-space wrap" id="story" aria-labelledby="story-title">
      <div class="story-heading"><span class="section-doodle">${flower}</span><h2 id="story-title">Behind the code,<br><em>there’s a curious human.</em></h2></div>
      <div class="story-copy"><p>Meet Vitalik Buterin: Ethereum co-founder, writer, and a thinker who keeps asking what the internet could become.</p><p>This little corner of the web celebrates that spirit. Big, open ideas sit alongside colorful unicorns and curious rabbits. Because imagining a different world should leave room for play.</p><a class="text-link" href="https://ethereum.org/en/history/">Explore Ethereum’s story ${arrow('diagonal')}</a></div>
    </section>

    <section class="computer-section" id="world-computer" aria-labelledby="computer-title">
      <div class="computer-layout wrap">
        <div class="computer-copy">
          <h2 id="computer-title">One computer.<br><em>Everyone invited.</em></h2>
          <p>Ethereum is a shared computer, maintained by a network of people rather than one company. Anyone can build applications on it.</p>
          <p>Here’s a tiny way to picture it: choose an idea, run it, and watch our three example computers agree.</p>
          <a class="text-link" href="https://ethereum.org/en/what-is-ethereum/">Get to know Ethereum ${arrow('diagonal')}</a>
          <div class="computer-doodle">${planet}<span>One shared idea,<br>many computers.</span></div>
        </div>
        <div class="playground">
          <div class="computer-visual" aria-hidden="true">
            <svg class="network-lines" viewBox="0 0 500 120" preserveAspectRatio="none"><path d="M80 47h340M80 47l170 55L420 47" fill="none" stroke="#b49bcf" stroke-width="2" stroke-dasharray="5 5"/></svg>
            <div class="network-node"><svg viewBox="0 0 70 65" fill="none"><rect x="5" y="4" width="60" height="43" rx="5" fill="#f9f6fc" stroke="#70538d" stroke-width="2"/><rect x="11" y="10" width="48" height="29" rx="2" fill="#d6e8b8"/><path d="M29 47v9m12-9v9M19 57h32" stroke="#70538d" stroke-width="2" stroke-linecap="round"/><path class="node-check" d="m25 24 7 7 13-13" stroke="#46683a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Computer 1</span></div>
            <div class="network-node"><svg viewBox="0 0 70 65" fill="none"><rect x="5" y="4" width="60" height="43" rx="5" fill="#f9f6fc" stroke="#70538d" stroke-width="2"/><rect x="11" y="10" width="48" height="29" rx="2" fill="#f3d7b3"/><path d="M29 47v9m12-9v9M19 57h32" stroke="#70538d" stroke-width="2" stroke-linecap="round"/><path class="node-check" d="m25 24 7 7 13-13" stroke="#46683a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Computer 2</span></div>
            <div class="network-node"><svg viewBox="0 0 70 65" fill="none"><rect x="5" y="4" width="60" height="43" rx="5" fill="#f9f6fc" stroke="#70538d" stroke-width="2"/><rect x="11" y="10" width="48" height="29" rx="2" fill="#e3cfed"/><path d="M29 47v9m12-9v9M19 57h32" stroke="#70538d" stroke-width="2" stroke-linecap="round"/><path class="node-check" d="m25 24 7 7 13-13" stroke="#46683a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Computer 3</span></div>
          </div>
          <fieldset class="idea-picker"><legend>Choose a little idea</legend><div class="idea-options"><button class="idea-option" aria-pressed="true" data-idea="carrot">Plant a carrot</button><button class="idea-option" aria-pressed="false" data-idea="rainbow">Send a rainbow</button><button class="idea-option" aria-pressed="false" data-idea="unicorn">Adopt a unicorn</button></div></fieldset>
          <div class="demo-output"><div class="demo-output-art">${bunny}</div><div><span class="demo-step">Ready when you are</span><p id="demo-message">A tiny idea, waiting to be shared.</p></div></div>
          <div class="demo-actions"><button class="button button-primary" id="run-idea">Run this idea ${arrow()}</button><button class="reset-button" id="reset-demo" disabled>Reset</button></div>
          <p class="demo-disclaimer">An illustration, not a real transaction. Nothing is sent or saved.</p>
          <span class="sr-only" id="demo-announcement" role="status" aria-live="polite"></span>
        </div>
      </div>
    </section>

    <section class="rabbit-holes section-space wrap" id="rabbit-holes" aria-labelledby="rabbit-title">
      <div class="section-heading"><div><h2 id="rabbit-title">Good ideas have <em>rabbit holes.</em></h2><p>Pick a path. See where your curiosity takes you.</p></div><span class="heading-bunny">${bunny}</span></div>
      <div class="reading-filters" role="group" aria-label="Filter reading links"><button class="filter-button" aria-pressed="true" data-filter="all">All rabbit holes</button><button class="filter-button" aria-pressed="false" data-filter="ideas">Big ideas</button><button class="filter-button" aria-pressed="false" data-filter="ethereum">Ethereum</button><button class="filter-button" aria-pressed="false" data-filter="play">A little play</button></div>
      <div class="reading-grid">
        <a class="reading-card reading-lilac" href="https://vitalik.ca/" data-category="ideas"><span class="reading-art">${book}</span><span class="reading-category">From Vitalik’s notebook</span><h3>A mind that<br>keeps wandering.</h3><p>Essays on technology, cooperation, and the world we could build.</p><span class="card-action">Read Vitalik’s blog ${arrow('diagonal')}</span></a>
        <a class="reading-card reading-green" href="https://ethereum.org/en/learn/" data-category="ethereum"><span class="reading-art">${planet}</span><span class="reading-category">A shared world</span><h3>The internet,<br>with more possibility.</h3><p>Start with the basics of Ethereum. Bring questions, leave the jargon.</p><span class="card-action">Explore Ethereum ${arrow('diagonal')}</span></a>
        <a class="reading-card reading-peach" href="https://ethereum.org/en/community/" data-category="play"><span class="reading-art reading-unicorn">${unicorn}</span><span class="reading-category">Find your people</span><h3>A serious amount<br>of imagination.</h3><p>Meet a community of builders, artists, and wonderfully curious people.</p><span class="card-action">Find the community ${arrow('diagonal')}</span></a>
      </div>
      <p class="filter-status" role="status" aria-live="polite">Showing all 3 rabbit holes.</p>
    </section>

    <section class="closing wrap" aria-labelledby="closing-title"><span class="closing-flower">${flower}</span><div><h2 id="closing-title">Stay curious.<br><em>Keep a little magic.</em></h2><p>The future is still a work in progress. There’s room for you in it.</p></div><a class="button button-dark" href="https://vitalik.ca/">Keep exploring ${arrow('diagonal')}</a><span class="closing-star">${star}</span></section>
  </main>
  <footer class="site-footer wrap"><div class="footer-top"><a class="brand" href="#" aria-label="Vitalik’s World, back to top"><span class="brand-flower">${flower}</span><span>vitalik’s world.</span></a><p>An independent tribute to curiosity.<br>Made with a soft spot for unicorns and rabbits.</p><a class="back-top" href="#">Back to top ${arrow('up')}</a></div><div class="footer-bottom"><span>A fan-made exploration. Not affiliated with Vitalik or the Ethereum Foundation.</span><a href="https://commons.wikimedia.org/wiki/File:VitalikButerinProfile.jpg">Photo: Romanpoet, CC BY-SA 4.0</a></div></footer>
`

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')!
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!

function closeMenu(restoreFocus = false) {
  mobileNav.hidden = true
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Open navigation')
  if (restoreFocus) menuToggle.focus()
}

menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden
  mobileNav.hidden = !opening
  menuToggle.setAttribute('aria-expanded', String(opening))
  menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation')
})
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()))
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true)
})
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) closeMenu()
})

const ideas = {
  carrot: { art: bunny, initial: 'A tiny idea, waiting to be shared.', result: 'Carrot planted. All three computers agree.' },
  rainbow: { art: planet, initial: 'A little color, ready to go around.', result: 'Rainbow shared. All three computers agree.' },
  unicorn: { art: unicorn, initial: 'One unicorn, looking for a home.', result: 'Unicorn adopted. All three computers agree.' },
}
type Idea = keyof typeof ideas
let selectedIdea: Idea = 'carrot'
let runCount = 0
const ideaButtons = document.querySelectorAll<HTMLButtonElement>('.idea-option')
const message = document.querySelector<HTMLElement>('#demo-message')!
const step = document.querySelector<HTMLElement>('.demo-step')!
const outputArt = document.querySelector<HTMLElement>('.demo-output-art')!
const runButton = document.querySelector<HTMLButtonElement>('#run-idea')!
const resetButton = document.querySelector<HTMLButtonElement>('#reset-demo')!
const announcement = document.querySelector<HTMLElement>('#demo-announcement')!
const visual = document.querySelector<HTMLElement>('.computer-visual')!

function showReady() {
  message.textContent = ideas[selectedIdea].initial
  outputArt.innerHTML = ideas[selectedIdea].art
  step.textContent = 'Ready when you are'
  visual.classList.remove('has-run')
  runButton.innerHTML = `Run this idea ${arrow()}`
}

ideaButtons.forEach(button => button.addEventListener('click', () => {
  const idea = button.dataset.idea
  if (!idea || !(idea in ideas)) return
  selectedIdea = idea as Idea
  ideaButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)))
  showReady()
  resetButton.disabled = false
  announcement.textContent = `${button.textContent} selected. Ready to run.`
}))

runButton.addEventListener('click', () => {
  runCount += 1
  message.textContent = ideas[selectedIdea].result
  step.textContent = `Example ${runCount} complete`
  visual.classList.add('has-run')
  runButton.innerHTML = `Run it again ${arrow()}`
  resetButton.disabled = false
  announcement.textContent = `Example ${runCount}: ${ideas[selectedIdea].result} This is a local illustration.`
})

resetButton.addEventListener('click', () => {
  selectedIdea = 'carrot'
  runCount = 0
  ideaButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.idea === 'carrot')))
  showReady()
  announcement.textContent = 'Demo reset. Plant a carrot is selected.'
  runButton.focus()
  resetButton.disabled = true
})

const filters = document.querySelectorAll<HTMLButtonElement>('.filter-button')
const cards = document.querySelectorAll<HTMLAnchorElement>('.reading-card')
const filterStatus = document.querySelector<HTMLElement>('.filter-status')!
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)))
  let count = 0
  cards.forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected
    if (!card.hidden) count += 1
  })
  filterStatus.textContent = selected === 'all' ? 'Showing all 3 rabbit holes.' : `Showing ${count} rabbit hole for ${button.textContent?.toLowerCase()}.`
}))
