const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const local = process.env.PLAYGROUND_ORIGIN || 'http://127.0.0.1:8765';
const storageKey = 'hogwarts-typing-academy-v2';
(async () => {
  const source = fs.readFileSync(path.join(__dirname, '../shared/practice-id.js'), 'utf8');
  const legacy = { window: {} };
  vm.runInNewContext(source, legacy);
  const fallbackIds = Array.from({ length: 1000 }, () => legacy.window.createPracticeId());
  assert.equal(new Set(fallbackIds).size, 1000);
  const native = { window: { crypto: { randomUUID: () => 'native-id' } } };
  vm.runInNewContext(source, native);
  assert.equal(native.window.createPracticeId(), 'native-id');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    // Preserve a real insecure origin while serving repository files locally.
    for (const mode of ['http', 'older-browser']) {
      const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, hasTouch: true });
      const origin = mode === 'http' ? 'http://playground.test' : local;
      if (mode === 'http') await context.route(`${origin}/**`, async route => {
        await route.fulfill({ response: await route.fetch({ url: route.request().url().replace(origin, local) }) });
      });
      else await context.addInitScript(() => Object.defineProperty(window.crypto, 'randomUUID', { value: undefined }));
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${origin}/playground/hogwarts-typing-academy/`);
      assert.equal(await page.evaluate(() => typeof crypto.randomUUID), 'undefined');
      if (mode === 'http') assert.equal(await page.evaluate(() => isSecureContext), false);
      const ids = await page.evaluate(() => Array.from({ length: 1000 }, () => createPracticeId()));
      assert.equal(new Set(ids).size, 1000);
      assert.ok(ids.every(id => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)));
      await page.fill('#warmupTarget', '1'); await page.fill('#magicTarget', '1');
      await page.tap('#handoff'); await page.tap('#startDaily');
      await page.waitForFunction(() => document.body.dataset.screen === 'practice');
      const typeLesson = async () => {
        const chars = await page.locator('.glyph:not(.done)').allTextContents();
        await page.keyboard.type(chars.join('').replaceAll('␣', ' ').toLowerCase());
      };
      await typeLesson();
      await page.waitForFunction(() => document.body.dataset.screen === 'ready');
      await page.tap('#startDaily');
      for (const spell of ['LUMOS', 'NOX', 'ACCIO']) {
        await page.waitForFunction(spell => document.querySelector('#lessonTitle').textContent.startsWith(spell) && document.querySelector('.glyph.current'), spell);
        await typeLesson();
      }
      await page.waitForFunction(() => document.body.dataset.screen === 'complete');
      await page.reload();
      const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), storageKey);
      assert.equal(saved.rounds.length, 2); assert.equal(saved.records.length, 4);
      await page.goto(`${origin}/playground/m-math-hogwarts/`);
      await page.waitForFunction(() => recordsReady);
      await page.tap('#enter-game'); await page.tap('#confirm-house');
      await page.tap('#quick-school'); await page.tap('#current-level');
      await page.tap('#begin'); await page.tap('#practise'); await page.tap('#meet');
      for (let i = 0; i < 3; i++) await page.tap('#walk');
      await page.tap('#ready'); await page.waitForFunction(() => phase === 'question');
      for (let i = 0; i < 50; i++) {
        await page.fill('#answer', String(await page.evaluate(() => run.questions[run.index].answer)));
        await page.press('#answer', 'Enter'); await page.waitForFunction(() => !submitting);
      }
      await page.waitForFunction(() => phase === 'result');
      assert.equal(await page.evaluate(() => weekly.pieces), 1);
      await page.reload(); await page.waitForFunction(() => recordsReady);
      assert.equal(await page.evaluate(() => history.length), 1);
      assert.equal(await page.evaluate(() => weekly.pieces), 1);
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${mode}: touch navigation, warmup + spells, 50 math answers, persisted history and puzzle progress.`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
