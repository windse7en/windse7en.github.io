const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
const page=await browser.newPage({viewport:{width:1440,height:950}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const url=process.env.GAME_URL||'http://127.0.0.1:8765/playground/hogwarts-typing-academy/';await page.goto(url);
const noChinese=async()=>assert.equal(await page.locator('body').innerText().then(s=>/[\u4e00-\u9fff]/.test(s.replace('中文',''))),false);
assert.equal(await page.locator('html').getAttribute('lang'),'en');await noChinese();
await page.fill('#warmupTarget','1');await page.fill('#magicTarget','4');await page.click('#handoff');await noChinese();await page.click('#startDaily');await noChinese();
const checkKeys=async()=>{const keys=await page.evaluate(()=>Object.fromEntries(['q','a','z','i','k',',','l','.',';','/'].map(k=>{const r=document.querySelector(`[data-key="${k}"]`).getBoundingClientRect();return[k,{x:r.x+r.width/2,y:r.y+r.height/2,w:r.width}]})));assert.ok(keys.a.x>keys.q.x&&keys.z.x>keys.a.x);assert.ok(keys[','].x>keys.k.x&&keys[','].y>keys.k.y);assert.ok(keys['.'].x>keys.l.x&&keys['/'].x>keys[';'].x);assert.ok(Math.max(...Object.values(keys).map(k=>k.w))-Math.min(...Object.values(keys).map(k=>k.w))<1);};
await checkKeys();await page.keyboard.type('aq');
const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('hogwarts-typing-academy-v2')));
const before=(await read()).active;
await page.click('#languageToggle');assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');assert.equal((await read()).active.index,before.index);assert.equal((await read()).active.id,before.id);assert.ok((await page.locator('#fingerName').textContent()).includes('左'));
await page.click('#languageToggle');await page.keyboard.type('x');await noChinese();assert.equal((await read()).active.errors,1);
// Complete the warm-up, then four rounds rotate through every spell.
await page.keyboard.type((await page.locator('.glyph:not(.done)').allTextContents()).join('').toLowerCase());await page.waitForFunction(()=>document.body.dataset.screen==='ready');await noChinese();await page.click('#startDaily');
for(let i=0;i<12;i++){await page.waitForSelector('.glyph.current');await noChinese();const seq=(await page.locator('.glyph').allTextContents()).join('').replaceAll('␣',' ').toLowerCase();await page.keyboard.type(seq);if(i<11)await page.waitForTimeout(1100);}
await page.waitForFunction(()=>document.body.dataset.screen==='complete');await noChinese();
const spells=(await read()).records.filter(r=>r.mode==='game').map(r=>r.sequence.toUpperCase());assert.equal(new Set(spells).size,10);
await page.locator('[data-view=complete] [data-screen=history]').click();await page.locator('.extra-practice summary').click();await noChinese();assert.equal(await page.locator('.spell-card').count(),10);
assert.ok(!spells.some(s=>['AVADA KEDAVRA','CRUCIO','IMPERIO'].includes(s)));
await page.click('[data-spell="9"]');await page.keyboard.type('expecto');assert.equal(await page.locator('.glyph.current').textContent(),'␣');assert.ok((await page.locator('#fingerName').textContent()).includes('Thumb'));await noChinese();
await page.setViewportSize({width:390,height:844});await checkKeys();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:'/tmp/typing-keyboard-mobile.png',fullPage:true});
await page.click('#languageToggle');await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');assert.equal((await read()).rounds.length,5);assert.deepEqual(errors,[]);
console.log('PASS: English default, full bilingual screens, live switch persistence, physical keyboard offsets at desktop/mobile, all ten rotating spells, no Unforgivable Curses, space/thumb input.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
