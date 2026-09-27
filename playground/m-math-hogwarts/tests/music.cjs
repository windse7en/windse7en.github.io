const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const URL = process.env.GAME_URL || 'http://127.0.0.1:8765/playground/m-math-hogwarts/';
async function check(allowAutoplay) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true,
    args: [`--autoplay-policy=${allowAutoplay ? 'no-user-gesture-required' : 'document-user-activation-required'}`] });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(URL);
    await page.waitForFunction(() => recordsReady);
    if (!allowAutoplay) {
      await page.waitForFunction(() => document.getElementById('music-toggle').dataset.status === 'waiting');
      assert.equal(await page.locator('#background-music').evaluate(el => el.paused), true);
      await page.click('#enter-game'); // An ordinary game action unlocks audio.
    }
    await page.waitForFunction(() => { const a=document.getElementById('background-music'); return !a.paused && a.currentTime > 0 && a.readyState >= 2; });
    assert.ok(await page.locator('#background-music').evaluate(el => Number.isFinite(el.duration) && el.duration > 30));
    assert.ok((await page.locator('#background-music').getAttribute('src')).endsWith('assets/hedwigs-theme.mp3'));
    assert.equal(await page.locator('#background-music').evaluate(el => el.volume), 0.12);
    assert.equal(await page.locator('#background-music').evaluate(el => el.loop), true);
    assert.equal(await page.locator('iframe, input[type=file], #music-panel').count(), 0);
    await page.evaluate(async () => { phase='setup'; start(); phase='encounter'; await beginClock(); });
    assert.equal(await page.locator('#background-music').evaluate(el => el.volume), 0.08);
    const audio = await page.locator('#background-music').elementHandle();
    await page.fill('#answer', String(await page.evaluate(() => run.questions[0].answer)));
    await page.press('#answer', 'Enter');
    await page.waitForFunction(() => run.index === 1 && !submitting);
    assert.equal(await audio.evaluate(el => el === document.getElementById('background-music') && !el.paused), true);
    await page.click('#music-toggle');
    assert.equal(await audio.evaluate(el => el.paused), true);
    await page.fill('#answer', String(await page.evaluate(() => run.questions[1].answer)));
    await page.press('#answer', 'Enter');
    await page.waitForFunction(() => run.index === 2 && !submitting);
    assert.equal(await audio.evaluate(el => el.paused), true); // Ordinary actions respect explicit mute.
    await page.click('#language');
    assert.equal(await page.locator('#music-toggle').getAttribute('aria-pressed'), 'false');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    console.log(`PASS: ${allowAutoplay ? 'immediate autoplay' : 'blocked autoplay + first game interaction'}, looping, ducking, stable playback, explicit mute, bilingual mobile UI.`);
  } finally { await browser.close(); }
}
(async () => { await check(true); await check(false); })().catch(error => { console.error(error); process.exit(1); });
