const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const url=process.env.GAME_URL || 'http://127.0.0.1:8765/playground/hogwarts-typing-academy/';
const key='hogwarts-typing-academy-v2';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1100}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
 const data=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const typeLesson=async()=>{await page.waitForSelector('.glyph.current');const seq=await page.locator('.glyph:not(.done)').allTextContents();await page.keyboard.type(seq.join('').replaceAll('␣',' ').toLowerCase());};
 await page.locator('#parentSettings summary').click();await page.fill('#warmupTarget','1');await page.fill('#magicTarget','1');await page.check('#saveDefault');await page.locator('#planForm button').click();
 assert.deepEqual((await data()).defaults,{warmup:1,magic:1});
 await page.click('#startDaily');assert.equal(await page.locator('.glyph').count(),68);
 assert.equal(await page.locator('#warmupTarget').isDisabled(),true);
 await page.keyboard.type('z');assert.equal(await page.locator('.glyph.current').textContent(),'A');
 await typeLesson();await page.waitForFunction(()=>document.querySelector('#lessonTitle').textContent.startsWith('LUMOS'));
 assert.equal((await data()).rounds.length,1);
 for(const spell of ['LUMOS','NOX','LUMOS']){await page.waitForFunction(spell=>document.querySelector('#lessonTitle').textContent.startsWith(spell)&&document.querySelector('.glyph.current'),spell);await typeLesson();}
 await page.waitForFunction(()=>document.querySelector('#lessonTitle').textContent==='今日课程完成！');
 let d=await data();assert.equal(d.rounds.length,2);assert.equal(d.records.length,4);assert.equal(d.records.reduce((n,r)=>n+r.errors,0),1);
 assert.equal(await page.locator('#dailyBadge').textContent(),'✦ 今日达成');
 await page.screenshot({path:'/tmp/typing-complete.png',fullPage:true});
 await page.reload();assert.equal(await page.locator('#dailyBadge').textContent(),'✦ 今日达成');
 // Editing settings never counts as a typing attempt. Invalid all-zero plan is rejected.
 await page.locator('#parentSettings summary').click();await page.fill('#warmupTarget','0');await page.fill('#magicTarget','0');await page.locator('#planForm button').click();
 assert.equal((await data()).records.length,4);assert.ok((await page.locator('#planFeedback').textContent()).includes('至少'));
 // A future date has its own plan, and changing it does not alter today's progress.
 await page.fill('#planDate','2099-01-01');await page.fill('#warmupTarget','0');await page.fill('#magicTarget','2');await page.locator('#planForm button').click();
 assert.equal((await data()).plans['2099-01-01'].magic,2);assert.equal(await page.locator('#warmupProgress').textContent(),'1 / 1 轮');
 // Full spell includes its space and thumb cue.
 await page.click('[data-spell="3"]');await page.keyboard.type('expecto');assert.equal(await page.locator('.glyph.current').textContent(),'␣');assert.ok((await page.locator('#fingerName').textContent()).includes('拇指'));
 await page.keyboard.press('Space');await page.keyboard.type('patronum');assert.equal((await data()).rounds.length,2);
 // An unfinished attempt survives reload as an incomplete record, never a reward.
 await page.click('#startWarmup');await page.keyboard.type('a');await page.reload();d=await data();assert.equal(d.active,null);assert.equal(d.records[0].completed,false);assert.equal(d.rounds.length,2);
 // Cancelling an automatic transition cannot start an unwanted lesson later.
 await page.click('#startGame');await typeLesson();await page.click('#pausePractice');await page.waitForTimeout(1200);assert.equal(await page.locator('.glyph.current').count(),0);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/typing-mobile.png',fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 const downloadPromise=page.waitForEvent('download');await page.click('#exportBtn');assert.ok((await downloadPromise).suggestedFilename().endsWith('.csv'));
 await page.evaluate(()=>localStorage.setItem('unrelated','keep'));page.once('dialog',dialog=>dialog.accept());await page.click('#resetBtn');await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).records.length===0,key);assert.equal(await page.evaluate(()=>localStorage.getItem('unrelated')),'keep');
 assert.deepEqual(errors,[]);console.log('PASS: daily plan, warmup + magic auto course, errors, persistence, future plans, space/typing guidance, interruptions, CSV, reset and mobile.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
