const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const url=process.env.GAME_URL || 'http://127.0.0.1:8765/playground/hogwarts-typing-academy/';
const key='hogwarts-typing-academy-v2';
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(url);await page.click('#languageToggle');
 const data=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
 const screen=async(name)=>{await page.waitForFunction(name=>document.body.dataset.screen===name,name);assert.equal(await page.locator('[data-view]:visible').count(),1);};
 const typeLesson=async()=>{await page.waitForSelector('.glyph.current');const seq=await page.locator('.glyph:not(.done)').allTextContents();await page.keyboard.type(seq.join('').replaceAll('␣',' ').toLowerCase());};
 await screen('setup');assert.equal(await page.locator('#keyboard').isVisible(),false);assert.equal(await page.locator('#history').isVisible(),false);
 await page.fill('#warmupTarget','1');await page.fill('#magicTarget','1');await page.check('#saveDefault');await page.click('#handoff');
 await screen('ready');assert.ok((await page.locator('#stageTitle').textContent()).includes('手指'));assert.equal(await page.locator('#planForm').isVisible(),false);
 await page.click('#startDaily');await screen('practice');assert.equal(await page.locator('.glyph').count(),68);assert.equal(await page.locator('#history').isVisible(),false);assert.equal(await page.locator('#zones').isVisible(),false);
 await page.screenshot({path:'/tmp/typing-stage-warmup.png'});
 await page.keyboard.type('z');assert.equal(await page.locator('.glyph.current').textContent(),'A');await typeLesson();
 await screen('ready');assert.ok((await page.locator('#stageTitle').textContent()).includes('魔法'));assert.equal((await data()).rounds.length,1);
 await page.click('#startDaily');await screen('practice');await page.screenshot({path:'/tmp/typing-stage-magic.png'});
 for(const spell of ['LUMOS','NOX','ACCIO']){await page.waitForFunction(spell=>document.querySelector('#lessonTitle').textContent.startsWith(spell)&&document.querySelector('.glyph.current'),spell);await typeLesson();}
 await screen('complete');assert.equal((await data()).rounds.length,2);assert.equal((await data()).records.length,4);assert.equal((await data()).records.reduce((n,r)=>n+r.errors,0),1);
 await page.screenshot({path:'/tmp/typing-stage-complete.png'});
 await page.locator('[data-view=complete] [data-screen=history]').click();await screen('history');assert.equal(await page.locator('#history li').count(),4);assert.equal(await page.locator('#keyboard').isVisible(),false);
 const downloadPromise=page.waitForEvent('download');await page.click('#exportBtn');assert.ok((await downloadPromise).suggestedFilename().endsWith('.csv'));
 await page.reload();await screen('setup');assert.equal(await page.locator('#warmupProgress').textContent(),'1 / 1 轮');
 // Reconfigure the target without losing progress; a partial round can be paused safely.
 await page.fill('#warmupTarget','2');await page.click('#handoff');await screen('ready');await page.click('#startDaily');await page.keyboard.type('a');await page.click('#pausePractice');await screen('setup');assert.equal((await data()).records[0].completed,false);assert.equal((await data()).rounds.length,2);
 // Resume, refresh and preserve the partial attempt without awarding a round.
 await page.click('#handoff');await page.click('#startDaily');await page.keyboard.type('a');await page.reload();await screen('setup');assert.equal((await data()).active,null);assert.equal((await data()).rounds.length,2);
 await page.fill('#warmupTarget','0');await page.fill('#magicTarget','0');await page.click('#handoff');await screen('setup');assert.ok((await page.locator('#planFeedback').textContent()).includes('至少'));
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/typing-stage-mobile.png'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('[data-view=setup] [data-screen=history]').click();await page.evaluate(()=>localStorage.setItem('unrelated','keep'));page.once('dialog',dialog=>dialog.accept());await page.click('#resetBtn');await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).records.length===0,key);assert.equal(await page.evaluate(()=>localStorage.getItem('unrelated')),'keep');
 assert.deepEqual(errors,[]);console.log('PASS: isolated setup/intro/practice/completion/history screens, ordered stages, local history, pause, refresh, settings, CSV, reset and mobile.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
