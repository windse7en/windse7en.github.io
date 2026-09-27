const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ timezoneId: 'America/Los_Angeles' });
    await context.addInitScript(() => {
      const RealDate = Date;
      window.fakeNow = '2026-09-21T19:00:00Z';
      window.Date = class extends RealDate {
        constructor(...args) { super(...(args.length ? args : [window.fakeNow])); }
        static now() { return new RealDate(window.fakeNow).getTime(); }
      };
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.GAME_URL || 'http://127.0.0.1:8765/playground/m-math-hogwarts/');
    await page.waitForFunction(() => recordsReady && recordsDb);
    // Exercise the real settlement/storage engine with completed round fixtures.
    const pass = () => page.evaluate(async () => {
      levelIndex = weekly.level;
      phase = 'setup'; start();
      run.startedAt = Date.now() - 1000;
      run.questionStartedAt = run.startedAt;
      run.status = 'running';
      run.startDay = dateKey(); run.startWeek = weekKey();
      run.answers = run.questions.map(q => ({ value: q.answer, correct: true }));
      run.attempts = run.questions.map(q => [q.answer]);
      run.events = run.questions.map(q => [{ value: q.answer, correct: true, at: Date.now(), questionElapsedMs: 20, runElapsedMs: 1000, penaltyMs: 0 }]);
      phase = 'question'; await finishRound('passed');
    });
    const day = value => page.evaluate(value => { window.fakeNow = value; syncWeekly(); }, value);
    for (let i = 0; i < 4; i++) await pass();
    assert.equal(await page.evaluate(() => weekly.pieces), 3);
    assert.equal(await page.evaluate(() => run.reward.reason), 'day');
    for (const d of ['22', '23', '24']) {
      await day(`2026-09-${d}T19:00:00Z`);
      for (let i = 0; i < 3; i++) await pass();
    }
    assert.equal(await page.evaluate(() => weekly.pieces), 12);
    assert.equal(await page.evaluate(() => openLevel(1)), false);
    await page.evaluate(() => awardRound());
    assert.equal(await page.evaluate(() => weekly.pieces), 12);
    await day('2026-09-28T07:00:00Z');
    assert.equal(await page.evaluate(() => weekly.level), 1);
    assert.equal(await page.evaluate(() => weekly.pieces), 0);
    await pass();
    await day('2026-10-05T07:00:00Z');
    assert.equal(await page.evaluate(() => weekly.level), 1);
    assert.equal(await page.evaluate(() => weekly.pieces), 0);
    assert.equal(await page.evaluate(() => cleared.size), 1);
    assert.equal(await page.evaluate(() => history.length), 14);
    // Reloading an expired running round must settle as a timeout, without reward.
    await page.evaluate(async () => {
      phase = 'setup'; start();
      run.startedAt = Date.now() - run.budgetMs - 1;
      run.questionStartedAt = run.startedAt; run.status = 'running';
      run.startDay = dateKey(); run.startWeek = weekKey();
      phase = 'question'; await persistActive();
    });
    // Persist the advanced clock for this reload.
    await page.addInitScript(() => { window.fakeNow = '2026-10-05T07:00:00Z'; });
    await page.reload();
    await page.waitForFunction(() => recordsReady && phase === 'result');
    assert.equal(await page.evaluate(() => run.status), 'timeout');
    assert.equal(await page.evaluate(() => weekly.pieces), 0);
    assert.equal(await page.evaluate(() => history.length), 15);
    assert.deepEqual(errors, []);
    console.log('PASS: daily cap, weekly puzzle, next-Monday unlock, incomplete reset, retained records, expired reload.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
