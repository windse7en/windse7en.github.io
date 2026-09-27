const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
const ctx=await b.newContext();await ctx.addInitScript(()=>{const RealDate=Date;window.testDay='2026-09-26T12:00:00';window.Date=class extends RealDate{constructor(...args){super(...(args.length?args:[window.testDay]))}static now(){return new RealDate(window.testDay).getTime()}}});
const p=await ctx.newPage();const url=process.env.GAME_URL||'http://127.0.0.1:8765/playground/hogwarts-typing-academy/';await p.goto(url);await p.click('#languageToggle');await p.fill('#warmupTarget','0');await p.fill('#magicTarget','2');await p.check('#saveDefault');await p.locator('#planForm button').click();await p.click('#handoff');await p.click('#startDaily');assert.ok((await p.locator('#lessonTitle').textContent()).startsWith('LUMOS'));
for(let i=0;i<6;i++){await p.waitForSelector('.glyph.current');const seq=(await p.locator('.glyph').allTextContents()).join('').toLowerCase();await p.keyboard.type(seq);if(i<5)await p.waitForTimeout(1100)}
await p.waitForFunction(()=>document.body.dataset.screen==='complete');let data=await p.evaluate(()=>JSON.parse(localStorage.getItem('hogwarts-typing-academy-v2')));assert.equal(data.rounds.length,2);assert.ok(data.rounds.every(r=>r.kind==='magic'));
await p.evaluate(()=>window.testDay='2026-09-27T12:00:00');await p.click('#exitLesson');await p.fill('#planDate','2026-09-27');await p.click('#handoff');await p.click('#startDaily');assert.equal(await p.locator('#magicProgress').textContent(),'0 / 2 轮');assert.equal(await p.locator('#warmupProgress').textContent(),'0 / 0 轮');
// Midnight during a round stops old-day practice and gives no free credit.
await p.keyboard.type('l');await p.evaluate(()=>window.testDay='2026-09-28T12:00:00');await p.keyboard.type('u');assert.equal(await p.evaluate(()=>document.body.dataset.screen),'setup');data=await p.evaluate(()=>JSON.parse(localStorage.getItem('hogwarts-typing-academy-v2')));assert.equal(data.rounds.length,2);
// A sibling update freezes this tab instead of creating a reload/write loop.
const sibling=await ctx.newPage();await sibling.goto(url);await sibling.fill('#warmupTarget','1');await sibling.locator('#planForm button').click();await p.waitForSelector('#tabNotice');assert.equal(await p.locator('#startDaily').isDisabled(),true);
console.log('PASS: zero-warmup plan, multiple magic rounds, next-day targets, midnight interruption and sibling-tab guard.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exit(1)});
