const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const base = process.env.PLAYGROUND_URL || 'http://127.0.0.1:8765/playground/';
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    assert.equal(await page.locator('.game-card').count(), 7);
    for (const link of await page.locator('.game-link').evaluateAll(items => items.map(item => item.href))) {
      assert.equal((await page.request.get(link)).status(), 200, link);
    }
    await page.locator('.thumbnail img').evaluateAll(async images => {
      await Promise.all(images.map(async image => { image.loading = 'eager'; await image.decode(); }));
    });
    for (const [category, count] of Object.entries({ typing: 3, math: 1, music: 2, chinese: 1, all: 7 })) {
      await page.locator(`[data-filter="${category}"]`).click();
      assert.equal(await page.locator('.game-card:visible').count(), count);
      assert.equal(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed'), 'true');
    }
    await page.screenshot({ path: '/tmp/playground-gallery-desktop.png', fullPage: true });
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: '/tmp/playground-gallery-mobile.png', fullPage: true });
    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const fallback = await noJS.newPage();
    await fallback.goto(base);
    assert.equal(await fallback.locator('.game-card:visible').count(), 7);
    assert.equal(await fallback.locator('.filters').isVisible(), false);
    assert.deepEqual(errors, []);
    console.log('PASS: seven game links and images, subject filters, mobile/tablet layout, no-JavaScript fallback.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
