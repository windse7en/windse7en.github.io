const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const context=await browser.newContext();
    const page=await context.newPage();
    const url=process.env.GAME_URL || 'http://127.0.0.1:8765/playground/m-math-hogwarts/';
    await page.goto(url);await page.waitForFunction(()=>recordsReady);
    await page.evaluate(async()=>{
      player.name='Reset Test';house='ravenclaw';savePlayer();
      localStorage.setItem('another-game-save','keep');
      localStorage.setItem('m-math-hogwarts-music-volume','20');
      phase='setup';start();phase='encounter';await beginClock();await finishRound('abandoned');
      showView('parents');
    });
    page.once('dialog',dialog=>dialog.dismiss());
    await page.click('#reset-local-data');
    assert.equal(await page.evaluate(()=>history.length),1);
    const sibling=await context.newPage();
    await sibling.goto(url);await sibling.waitForFunction(()=>recordsReady);
    await sibling.evaluate(async()=>{phase='setup';start();phase='encounter';await beginClock()});
    page.once('dialog',dialog=>dialog.accept());
    const reloaded=page.waitForEvent('load');
    const siblingReloaded=sibling.waitForEvent('load');
    await page.click('#reset-local-data');await reloaded;await siblingReloaded;
    for(const tab of [page,sibling]){
      await tab.waitForFunction(()=>recordsReady);
      assert.equal(await tab.evaluate(()=>phase),'welcome');
      assert.equal(await tab.evaluate(()=>player.house),null);
      assert.equal(await tab.evaluate(()=>weekly.pieces),0);
      assert.equal(await tab.evaluate(()=>history.length),0);
      assert.equal(await tab.evaluate(()=>localStorage.getItem('m-math-hogwarts-music-volume')),null);
      assert.equal(await tab.evaluate(()=>localStorage.getItem('another-game-save')),'keep');
      assert.equal(await tab.evaluate(async()=>!!(await dbRead('active','current'))),false);
    }
    console.log('PASS: cancel preserves data; reset clears profile, history, active round and preferences; sibling refresh; unrelated data retained.');
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});
