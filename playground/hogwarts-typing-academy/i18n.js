/* Localize the existing view without rebuilding focused inputs or live sessions. */
(() => {
 const KEY='hogwarts-typing-academy-language';
 let language='en';try{if(localStorage.getItem(KEY)==='zh')language='zh';}catch{}
 const phrases={
 '先安排，再把魔法交给她。':'Plan the lesson. Let her make the magic.',
 '设置好今天的轮数。接下来孩子只会看见当前阶段的练习。':'Set today’s rounds. Your child will see just one practice stage at a time.',
 '今天的魔法课表':'Today’s magical lesson', '安排今天的练习':'Plan today’s practice',
 '家长 · 今日课表':'Parent · Daily plan','家长 · 本地学习记录':'Parent · Learning journal',
 '手指热身（轮）':'Warm-up rounds','魔法练习（轮）':'Spell rounds',
 '练习日期':'Practice date','同时作为以后每天的默认计划':'Use as the default for future days',
 '保存课表':'Save plan','课表准备好了，交给孩子 →':'Ready — hand over to your child →',
 '每项可设 0–20 轮，至少安排一项。当天已完成轮数保留；未单独安排的日期使用默认计划。练习中请先暂停再修改。':'Choose 0–20 rounds for each activity, with at least one activity enabled. Completed rounds stay saved. Unscheduled days use the default. Pause practice before editing.',
 '一轮：依次走完八根手指的完整键位地图。':'One round: a complete key journey for all eight fingers.',
 '一轮：完成三个咒语，按十个咒语顺序轮换。':'One round: three spells, rotating through the ten-spell collection.',
 '先热身，再施法。完成的轮数自动保存。':'Warm up first, then cast spells. Completed rounds save automatically.',
 '准备出发':'Ready for adventure','准备迎接魔法':'Get ready for magic','返回课表':'Back to plan',
 '退出全屏':'Exit full screen','全屏':'Full screen',
 '让手指先热起来。':'Let’s warm up your fingers.', '现在，施放你的魔法。':'Now, cast your magic.',
 '找到 F 和 J 的小凸点。跟随高亮的按键，伸出手指，敲击，然后回家。':'Find the bumps on F and J. Follow the glowing key: reach, press, and return home.',
 '每轮完成三个咒语，十个咒语依次轮换。看清字母，使用正确的手指。':'Cast three spells each round, rotating through all ten. Watch each letter and use the right finger.',
 '开始热身 →':'Start warm-up →','开始魔法练习 →':'Start spell practice →',
 '使用英文输入法 · 将手指轻放在 A S D F · J K L ;':'Use English input · Rest your fingers on A S D F · J K L ;',
 '一次一个按键':'One key at a time','准备开始':'Ready to begin','暂停练习':'Pause practice',
 '八根手指的魔法地图':'The eight-finger key map',
 '一轮走完八个区域。敲错不前进；敲完记得让手指回家。':'Visit all eight finger zones. Mistakes stay on the current key. Return your fingers home after each press.',
 '跟着高亮键和手指路线，用英文输入法敲击。':'Follow the glowing key and finger path. Type with English input.',
 '很好！手指回家，准备下一个字母。':'Well done! Return home and get ready for the next letter.',
 '当前应该移动的手指':'Your next finger','其他手指轻放在基准行，手腕自然放松。':'Keep the other fingers on the home row and relax your wrists.',
 '键位图会显示手指从基准键走到目标键的路线。':'The keyboard shows the path from the home key to the target.',
 '每个颜色代表一根手指 · 光点演示从基准键出发的方向 · 网页只能检测按键，无法判断实际用了哪根手指':'One color per finger · Follow the path from the home key · The game detects keys, not which finger you use.',
 '左手负责':'Left hand','右手负责':'Right hand','F · J 是定位点':'F · J have home bumps',
 '拇指轻按空格，其他手指留在基准行。':'Tap Space with your thumb; keep the other fingers on the home row.',
 '每轮练习三个咒语。十个咒语依次轮换，敲错留在当前字母。':'Practice three spells per round, rotating through ten spells. Mistakes stay on the current letter.',
 '每轮三个咒语 · 十个咒语轮换练习':'Three spells per round · A rotating collection of ten',
 '三次施法挑战':'Three-spell challenge','魔法灯等你唤醒':'Your magic awaits',
 '荧光闪烁 · 点亮魔杖':'Wand-Lighting Charm · Light your wand',
 '熄灭灯光':'Wand-Extinguishing Charm · Put out the light',
 '飞来咒 · 召来物品':'Summoning Charm · Call an object to you',
 '修复如初 · 修复物品':'Mending Charm · Repair an object',
 '阿拉霍洞开 · 开启魔法门':'Unlocking Charm · Open a locked door',
 '盔甲护身 · 形成护盾':'Shield Charm · Create a protective shield',
 '除你武器 · 解除武装':'Disarming Charm · Disarm an opponent',
 '滑稽滑稽 · 让博格特变得可笑':'Boggart-Banishing Spell · Make a Boggart look funny',
 '羽加迪姆勒维奥萨 · 让物体漂浮':'Levitation Charm · Make an object float',
 '呼神护卫 · 召唤守护神':'Patronus Charm · Conjure a guardian',
 '荧光闪烁 · 点亮魔法灯':'Wand-Lighting Charm · Light the lamp',
 '做得好，手指回家！':'Well done — fingers home!',
 '放松手腕，准备下一段练习。':'Relax your wrists for the next practice.',
 '正确比速度更重要。':'Accuracy matters more than speed.',
 '练习完成！':'Practice complete!','施法成功':'Spell cast!',
 '今天的魔法课，完成了！':'Today’s magic is complete!',
 '放松手指，给自己一点掌声。':'Relax your fingers. Give yourself a little applause.',
 '查看本地历史记录':'View learning history','本地历史记录':'Learning history','交还家长':'Back to parent',
 '每一点进步，都记在这里。':'Every little improvement, remembered.',
 '练习记录只保存在当前浏览器，刷新不会清除。':'Records stay in this browser and survive a refresh.',
 '记录只保存在这台设备的当前浏览器。建议先看准确率和手指动作，再慢慢加快速度。':'Records stay in this browser on this device. Focus on accuracy and finger movement before increasing speed.',
 '今日练习记录':'Today’s practice','练习次数':'Attempts','按键准确率':'Accuracy','练习用时':'Practice time',
 '最近的施法':'Practice history',
 '还没有记录。完成第一个咒语，就能看到尝试次数、用时与准确率。':'No records yet. Complete some practice to see attempts, time and accuracy.',
 '需要再练的字母':'Keys to practise',
 '按错键时，这里会记录当时应该敲的目标字母。':'Mistakes are grouped by the key you were meant to press.',
 '已经敲对的字母':'Keys typed correctly','完成按键后，这里会累计每个字母的正确次数。':'Correct presses are counted here for each key.',
 '最近七天':'Last seven days','导出 CSV 记录':'Export CSV','清空记录':'Clear records',
 '自由加练（不属于每日流程）':'Extra practice (outside the daily lesson)',
 '自由热身':'Free warm-up','自由魔法练习':'Free spell practice','自由指法练习':'Free finger practice',
 '选择一个区域，练习“伸出 → 敲击 → 回家”':'Choose a finger: reach → press → return home',
 '手指区域热身':'Finger zones','选择魔法咒语':'Choose a spell','完成一次可反复挑战':'Repeat any spell as often as you like',
 '已暂停。完成的整轮已保存；未完成的一轮下次从头开始。':'Paused. Completed rounds are saved. Restart an unfinished round next time.',
 '已暂停，完整轮次已保存。准备好后交给孩子继续。':'Paused; completed rounds are saved. Hand over to your child when ready.',
 '新的一天开始了，请开始今天的课程。':'A new day has started. Begin today’s lesson.',
 '今天的课表已完成。你可以自由加练，或让手指休息一下。':'Today’s plan is complete. Enjoy extra practice, or rest your fingers.',
 '请填写有效日期和 0–20 的整数轮数，至少安排一项。':'Enter a valid date and whole numbers from 0 to 20. Enable at least one activity.',
 '请选择今天的日期，再交给孩子开始练习。':'Select today’s date before handing over to your child.',
 '咒语加练不计入三次施法的完整魔法轮数。':'An individual spell does not count as a complete three-spell round.',
 '加练完成，记录已保存。':'Extra practice complete. Your record is saved.',
 '当前浏览器不支持全屏，可直接在本窗口练习。':'Full screen is unavailable. Keep practising in this window.',
 '上次未完成的练习已保存，整轮需要重新开始。':'The unfinished attempt was saved. Restart that round when ready.',
 '无法保存或读取本地记录。请先导出可用记录并检查浏览器存储；当前练习不会写入进度。':'Local records are unavailable. Export available records and check browser storage; progress cannot be saved.',
 '清空本游戏的课表、每日轮数和全部练习记录？其他小游戏不受影响。':'Clear this game’s plans, rounds and learning records? Other games are not affected.',
 '另一个标签页已更新练习记录。请在一个标签页练习。':'Another tab updated the records. Please practise in just one tab.',
 '重新加载':'Reload','左小指':'Left little finger','左无名指':'Left ring finger','左中指':'Left middle finger','左食指':'Left index finger','右食指':'Right index finger','右中指':'Right middle finger','右无名指':'Right ring finger','右小指':'Right little finger','拇指':'Thumb',
 '手指热身':'Finger warm-up','魔法练习':'Spell practice','魔法咒语':'Spells','今日课程完成':'Daily lesson complete','今日课程':'Daily lesson','每日课程':'Daily lesson','拇指轻按空格。':'Tap Space with your thumb.',
 '✦ 今日达成':'✦ Goal complete','练习进行中':'Practice in progress','等待你的魔法':'Ready for your magic',
 '查看今日成果 ✦':'View today’s results ✦','继续今日课程 →':'Continue today’s lesson →','开始今日课程 →':'Start today’s lesson →',
 '今日准确率':'Today’s accuracy','轮热身':'warm-up rounds','轮魔法练习':'spell rounds',
 '未完成':'Incomplete','左手':'Left','右手':'Right','空格':'Space','基准键':'Home key','个按键 · 已尝试':'keys · attempts:',
 '次':'times','本轮完成':'Round complete','本轮进行中':'Round in progress','日期':'Date','模式':'Mode','用时秒':'Seconds','正确按键':'Correct keys','目标错键统计':'Target errors','实际错键对应':'Mistyped keys','错键':'Errors','练习':'Practice','完成':'Completed','是':'Yes','否':'No',
 '先找 F 和 J 的小凸点':'Find the bumps on F and J',
 '准备好后，将八根手指轻放在 A S D F · J K L ;。':'Rest your fingers on A S D F · J K L ;.',
 '选择上方手指区域，或点击“开始今天的热身”。使用英文输入法和实体键盘输入。':'Choose a finger zone or start the daily lesson. Use English input and a physical keyboard.',
 '⌨ 触摸 F、J 定位点':'⌨ Find the F and J bumps','当前输入序列':'Current typing sequence',
 '自由加练':'Extra practice','魔法打字课':'Magical typing lessons'
 };
 const entries=Object.entries(phrases).sort((a,b)=>b[0].length-a[0].length);
 const fragments=text=>{for(const [zh,en]of entries)text=text.split(zh).join(en);return text;};
 function english(text){
  const trimmed=text.trim();if(phrases[trimmed])return text.replace(trimmed,phrases[trimmed]);
  const rules=[
   [/^(\d+) \/ (\d+) 个正确按键 · (\d+) 次错键$/,(_,a,b,c)=>`${a} / ${b} correct keys · ${c} errors`],
   [/^今日还需 (\d+) 轮热身、(\d+) 轮魔法练习。完整轮次才计入目标。$/,(_,a,b)=>`${a} warm-up and ${b} spell rounds left today. Only complete rounds count.`],
   [/^已保存 (.+)：热身 (\d+) 轮，魔法练习 (\d+) 轮。$/,(_,d,a,b)=>`Saved ${d}: ${a} warm-up rounds, ${b} spell rounds.`],
   [/^本轮第 (\d+) \/ 3 次施法；三次全部完成才计一轮。$/,(_,a)=>`Spell ${a} / 3. Finish all three to complete this round.`],
   [/^目标是 (.+)，请用(.+)再试一次。$/,(_,k,f)=>`The target is ${fragments(k)}. Try again with your ${fragments(f).toLowerCase()}.`],
   [/^用时 (.+) · 准确率 (\d+)% · 错键 (\d+) 次。$/,(_,a,b,c)=>`Time ${a} · Accuracy ${b}% · Errors ${c}`],
   [/^从 (.+) 出发，敲击目标键，再回家。分区加练不计入完整热身轮数。$/,(_,k)=>`Start at ${k}, press the target, then return home. A single zone does not count as a full warm-up round.`],
   [/^敲完后回到 (.+)，其他手指尽量留在基准行。$/,(_,k)=>`Return to ${k}; keep your other fingers on the home row.`],
   [/^从 (.+?) (.*?)，敲 (.*?)。$/,(_,home,dir,target)=>`From ${home.trim()||'Space'}, ${direction(dir)}. Press ${target.trim()||'Space'}.`],
   [/^第 (\d+) \/ (\d+) 轮(.*)$/,(_,a,b,rest)=>`Round ${a} / ${b}${rest.replace(/ · 第 (\d+) \/ 3 次施法/,' · Spell $1 / 3')}`],
   [/^(.+) · 还需 (\d+) 轮$/,(_,stage,n)=>`${fragments(stage)} · ${n} rounds remaining`],
   [/^热身 (\d+)\/(\d+) · 魔法 (\d+)\/(\d+)$/,(_,a,b,c,d)=>`Warm-up ${a}/${b} · Spells ${c}/${d}`]
  ];
  for(const [pattern,replace]of rules)if(pattern.test(trimmed))return text.replace(trimmed,trimmed.replace(pattern,replace));
  return fragments(text).replace(/(\d+) \/ (\d+) 轮/g,'$1 / $2 rounds').replace(/个咒语/g,'spells').replace(/% · 错 /g,'% · errors ').replace(/ · 错 /g,' · errors ');
 }
 function direction(dir){if(dir==='在基准键上轻轻敲击')return 'tap the home key';return 'reach '+dir.replace('向上','up ').replace('向下','down ').replace('向左','left ').replace('向右','right ').replace('伸过去','').replace('伸向目标键','toward the target').trim();}
 window.typingLanguage=language;window.translateTyping=text=>language==='en'?english(text):text;
 const originals=new WeakMap(),attributes=new WeakMap();
 const observer=new MutationObserver(apply);
 function apply(){
  observer.disconnect();document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=language==='en'?'Hogwarts Typing Academy · Magical Typing':'Hogwarts Typing Academy · 魔法打字课';
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  for(let node;node=walker.nextNode();){if(node.parentElement?.closest('script,style,#languageToggle'))continue;
   let item=originals.get(node);if(!item||node.nodeValue!==item.rendered)item={source:node.nodeValue};
   item.rendered=language==='en'?english(item.source):item.source;node.nodeValue=item.rendered;originals.set(node,item);
  }
  document.querySelectorAll('[aria-label]').forEach(el=>{if(el.id==='languageToggle')return;let value=attributes.get(el);if(!value)value=el.getAttribute('aria-label');attributes.set(el,value);el.setAttribute('aria-label',language==='en'?english(value):value);});
  const button=document.getElementById('languageToggle');if(button){button.textContent=language==='en'?'中文':'English';button.setAttribute('aria-label',language==='en'?'Switch to Chinese':'切换为英文');}
  observer.observe(document.body,{childList:true,subtree:true,characterData:true});
 }
 document.getElementById('languageToggle').addEventListener('click',()=>{language=language==='en'?'zh':'en';window.typingLanguage=language;try{localStorage.setItem(KEY,language);}catch{}window.dispatchEvent(new Event('typing-language-change'));apply();});
 window.addEventListener('DOMContentLoaded',apply);
})();
