(() => {
'use strict';
const STORAGE='hogwarts-typing-academy-v2';
const $=s=>document.querySelector(s);
const fingerDefs=[
 {id:'lp',name:'左小指',home:'a',keys:'qaz',color:'#d495a8',warm:'aqazaqza'},
 {id:'lr',name:'左无名指',home:'s',keys:'wsx',color:'#d5a474',warm:'swsxswxs'},
 {id:'lm',name:'左中指',home:'d',keys:'edc',color:'#e0ce79',warm:'dedcdecd'},
 {id:'li',name:'左食指',home:'f',keys:'rftgvb',color:'#95c99b',warm:'frftfgfvfb'},
 {id:'ri',name:'右食指',home:'j',keys:'yhnujm',color:'#83c9cd',warm:'jujyjhjnjm'},
 {id:'rm',name:'右中指',home:'k',keys:'ik,',color:'#8bb8e3',warm:'kik,ki,k'},
 {id:'rr',name:'右无名指',home:'l',keys:'ol.',color:'#b5a0db',warm:'lol.lo.l'},
 {id:'rp',name:'右小指',home:';',keys:'p;/',color:'#de9bcb',warm:';p;/;p/;'}
];
const keyFinger={};fingerDefs.forEach(f=>[...f.keys].forEach(k=>keyFinger[k]=f));
keyFinger[' ']={id:'thumb',name:'拇指',home:' ',keys:' ',color:'#dfcda2'};
// Names and effects checked against the official Harry Potter spell encyclopedia.
const spells=[
 {name:'LUMOS',meaning:'荧光闪烁 · 点亮魔杖',icon:'☀'},
 {name:'NOX',meaning:'熄灭灯光',icon:'☾'},
 {name:'ACCIO',meaning:'飞来咒 · 召来物品',icon:'↗'},
 {name:'REPARO',meaning:'修复如初 · 修复物品',icon:'◇'},
 {name:'ALOHOMORA',meaning:'阿拉霍洞开 · 开启魔法门',icon:'✧'},
 {name:'PROTEGO',meaning:'盔甲护身 · 形成护盾',icon:'◈'},
 {name:'EXPELLIARMUS',meaning:'除你武器 · 解除武装',icon:'⚡'},
 {name:'RIDDIKULUS',meaning:'滑稽滑稽 · 让博格特变得可笑',icon:'☺'},
 {name:'WINGARDIUM LEVIOSA',meaning:'羽加迪姆勒维奥萨 · 让物体漂浮',icon:'❧'},
 {name:'EXPECTO PATRONUM',meaning:'呼神护卫 · 召唤守护神',icon:'✦'}
];
const SPELLS_PER_ROUND=3;
const fresh=()=>({version:2,defaults:{warmup:2,magic:3},plans:{},records:[],rounds:[],active:null});
let data=fresh(),storageHealthy=true;
try {
 const raw=localStorage.getItem(STORAGE);
 if(raw){const parsed=JSON.parse(raw);if(parsed.version!==2||!Array.isArray(parsed.records)||!Array.isArray(parsed.rounds)||!parsed.plans||!validTargets(parsed.defaults))throw Error('Invalid save');data=parsed;}
}catch{storageHealthy=false;}
let session=null,game=null,dailyActive=false,timerId=null,flashTimer=null,toastTimer=null,nextTimer=null;
let generation=0,lastDay=nowDate(),view='setup',currentStage=null;
function nowDate(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function validTargets(p){return p&&[p.warmup,p.magic].every(n=>Number.isInteger(n)&&n>=0&&n<=20)&&p.warmup+p.magic>0;}
function plan(day=nowDate()){return validTargets(data.plans[day])?data.plans[day]:data.defaults;}
function totals(day=nowDate()){return {warmup:data.rounds.filter(r=>r.day===day&&r.kind==='warmup').length,magic:data.rounds.filter(r=>r.day===day&&r.kind==='magic').length};}
function formatTime(ms){const s=Math.max(0,Math.floor(ms/1000));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function save(){if(!storageHealthy)return false;try{localStorage.setItem(STORAGE,JSON.stringify(data));return true;}catch{storageHealthy=false;warnStorage();return false;}}
function warnStorage(){let el=$('#saveWarning');if(!el){el=document.createElement('p');el.id='saveWarning';el.className='save-warning';el.setAttribute('role','alert');$('main').before(el);}el.textContent='无法保存或读取本地记录。请先导出可用记录并检查浏览器存储；当前练习不会写入进度。';}
function elapsed(){return session?session.elapsedMs+Math.max(0,performance.now()-session.tickAt):0;}
function checkpoint(){if(!session||session.finished)return;data.active={...session,elapsedMs:elapsed(),tickAt:0};save();}
function cancelNext(){generation++;clearTimeout(nextTimer);nextTimer=null;}
function later(fn){const token=generation;nextTimer=setTimeout(()=>{nextTimer=null;if(token!==generation||document.hidden)return;fn();},1000);}
function startManual(fn){cancelNext();if(session&&!session.finished)finish(false);dailyActive=false;game=null;fn();}
function begin(opts){
 if(!data.plans[nowDate()])data.plans[nowDate()]={...data.defaults};
 session={...opts,id:crypto.randomUUID(),day:nowDate(),date:new Date().toISOString(),index:0,correct:0,errors:0,mistakes:{},correctLetters:{},wrongKeys:{},elapsedMs:0,tickAt:performance.now(),finished:false};
 clearInterval(timerId);timerId=setInterval(()=>{if(session&&!session.finished)$('#timer').textContent=formatTime(elapsed());},250);
 $('#timer').textContent='00:00';$('#modeLabel').textContent=dailyActive?'每日课程 · '+(opts.mode==='warmup'?'手指热身':'魔法练习'):opts.mode==='game'?'自由魔法练习':'自由指法练习';
 $('#lessonTitle').textContent=opts.title;$('#lessonDesc').textContent=opts.description;
 $('#feedback').textContent='跟着高亮键和手指路线，用英文输入法敲击。';$('#feedback').className='feedback';
 document.querySelectorAll('.zone').forEach(z=>z.classList.toggle('selected',Number(z.dataset.zone)===opts.zone));
 showScreen('practice');$('#practicePanel .section-head h2').textContent=opts.mode==='warmup'||opts.mode==='zone'?'手指热身':'魔法咒语';$('[data-view=practice]').dataset.stage=opts.mode==='warmup'||opts.mode==='zone'?'warmup':'magic';checkpoint();renderSession();renderDaily();renderStageProgress();
}
function startWarmup(){game=null;begin({mode:'warmup',zone:-1,title:'八根手指的魔法地图',description:'一轮走完八个区域。敲错不前进；敲完记得让手指回家。',sequence:fingerDefs.map(f=>f.warm).join('')});}
function startZone(i){const f=fingerDefs[i];begin({mode:'zone',zone:i,title:f.name+' · '+f.keys.toUpperCase(),description:`从 ${f.home.toUpperCase()} 出发，敲击目标键，再回家。分区加练不计入完整热身轮数。`,sequence:f.warm});}
function startSpell(name,fromGame=false){const item=spells.find(s=>s.name===name);begin({mode:fromGame?'game':'spell',zone:-1,title:name+' · '+item.meaning,description:fromGame?`本轮第 ${game.step+1} / 3 次施法；三次全部完成才计一轮。`:'咒语加练不计入三次施法的完整魔法轮数。',sequence:name.toLowerCase()});renderSpellScene(name,false);}
function startGame(){const offset=data.rounds.filter(r=>r.kind==='magic').length*SPELLS_PER_ROUND;game={id:crypto.randomUUID(),step:0,day:nowDate(),spells:Array.from({length:SPELLS_PER_ROUND},(_,i)=>spells[(offset+i)%spells.length].name)};renderQuest();startSpell(game.spells[0],true);}
function startDaily(){
 cancelNext();if(session&&!session.finished)finish(false);game=null;currentStage=null;dailyActive=true;nextDaily();
}
function nextDaily(){
 if(!dailyActive)return;
 const p=plan(),done=totals();
 if(done.warmup<p.warmup){if(currentStage!=='warmup')stageIntro('warmup');else startWarmup();}else if(done.magic<p.magic){if(currentStage!=='magic')stageIntro('magic');else startGame();}else{
  dailyActive=false;game=null;renderDaily();showCompletion();
 }
}
function pausePractice(){cancelNext();if(session&&!session.finished)finish(false);dailyActive=false;game=null;renderDaily();renderQuest();$('#feedback').textContent='已暂停。完成的整轮已保存；未完成的一轮下次从头开始。';currentStage=null;showScreen('setup');$('#planFeedback').textContent='已暂停，完整轮次已保存。准备好后交给孩子继续。';}
function currentChar(){return session?.sequence[session.index]||null;}
function onKey(e){
 if(view!=='practice'||!session||session.finished||document.hidden||e.metaKey||e.ctrlKey||e.altKey||e.isComposing||e.repeat)return;
 if(e.target.closest('input,textarea,select,[contenteditable=true]'))return;
 if(e.key.length!==1)return;
 const key=e.key.toLowerCase();if(!/^[a-z,.;/ ]$/.test(key))return;
 e.preventDefault();
 if(session.day!==nowDate()){pausePractice();renderDaily();showToast('新的一天开始了，请开始今天的课程。');return;}
 const target=currentChar();
 if(key===target){session.correct++;session.correctLetters[target]=(session.correctLetters[target]||0)+1;session.index++;$('#feedback').textContent='很好！手指回家，准备下一个字母。';$('#feedback').className='feedback success';if(session.index===session.sequence.length)finish(true);else{checkpoint();renderSession();}}
 else{session.errors++;session.mistakes[target]=(session.mistakes[target]||0)+1;const pair=target+'→'+(key===' '?'空格':key);session.wrongKeys[pair]=(session.wrongKeys[pair]||0)+1;$('#feedback').textContent=`目标是 ${target===' '?'空格':target.toUpperCase()}，请用${keyFinger[target].name}再试一次。`;$('#feedback').className='feedback error';const k=document.querySelector(`[data-key="${CSS.escape(key)}"]`);k?.classList.add('wrong-key');clearTimeout(flashTimer);flashTimer=setTimeout(()=>k?.classList.remove('wrong-key'),430);checkpoint();renderSession();}
}
function credit(kind,id,day){if(day===nowDate()&&!data.rounds.some(r=>r.id===id))data.rounds.push({id,kind,day,completedAt:new Date().toISOString()});}
function finish(completed){
 if(!session||session.finished)return;
 const duration=elapsed();session.finished=true;clearInterval(timerId);
 const row={...session,completed,durationMs:duration};delete row.tickAt;delete row.elapsedMs;delete row.finished;
 data.records.unshift(row);data.active=null;
 if(completed&&session.mode==='warmup')credit('warmup',session.id,session.day);
 if(completed&&session.mode==='game'&&game){
  game.step++;renderSpellScene(session.sequence.toUpperCase(),true);
  if(game.step===SPELLS_PER_ROUND)credit('magic',game.id,game.day);
 }
 save();renderRecords();renderDaily();renderQuest();
 $('#lessonCount').textContent=`${session.index} / ${session.sequence.length} 个正确按键 · ${session.errors} 次错键`;
 $('#timer').textContent=formatTime(duration);$('#pathLayer').style.display='none';document.querySelectorAll('.target-key,.finger.active').forEach(e=>e.classList.remove('target-key','active'));
 if(!completed)return;
 $('#progressFill').style.width='100%';$('#prompt').innerHTML='<span style="color:var(--gold)">✦ 练习完成！✦</span>';
 $('#feedback').textContent=`用时 ${formatTime(duration)} · 准确率 ${Math.round(100*session.correct/(session.correct+session.errors))}% · 错键 ${session.errors} 次。`;$('#feedback').className='feedback success';
 $('#fingerName').textContent='做得好，手指回家！';$('#moveText').textContent='放松手腕，准备下一段练习。';$('#returnText').textContent='正确比速度更重要。';
 if(game&&game.step<SPELLS_PER_ROUND)later(()=>startSpell(game.spells[game.step],true));
 else if(dailyActive)later(()=>{game=null;nextDaily();});
 else later(()=>{game=null;showScreen('history');renderRecords();showToast('加练完成，记录已保存。');});
}
function renderSpellScene(name,complete){const spell=spells.find(s=>s.name===name);if(!spell)return;const light=name==='LUMOS'||name==='NOX';$('#magicScene .lantern').hidden=!light;$('#spellSymbol').hidden=light;$('#spellSymbol').textContent=spell.icon;$('#magicScene').dataset.lit=String(name==='LUMOS'&&complete);$('#sceneCaption').textContent=spell.name+' · '+spell.meaning+(complete?' · 施法成功':'');}
function renderQuest(){const step=game?.step||0;$('#questMeter').style.width=100*step/3+'%';$('#questStatus').textContent=game?`${step===3?'本轮完成':'本轮进行中'} · ${step} / 3 个咒语`:'每轮三个咒语 · 十个咒语轮换练习';}
function renderDaily(){
 const p=plan(),n=totals(),complete=n.warmup>=p.warmup&&n.magic>=p.magic,working=dailyActive||!!game&&game.step<3||!!session&&!session.finished;
 $('#dateLabel').textContent=new Intl.DateTimeFormat(window.typingLanguage==='zh'?'zh-CN':'en-US',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
 for(const [kind,id] of [['warmup','warmup'],['magic','magic']]){$('#'+id+'Progress').textContent=`${n[kind]} / ${p[kind]} 轮`;$('#'+id+'Meter').max=p[kind]||1;$('#'+id+'Meter').value=p[kind]===0?1:Math.min(n[kind],p[kind]);}
 $('#dailyBadge').textContent=complete?'✦ 今日达成':working?'练习进行中':'等待你的魔法';
 $('#dailyMessage').textContent=complete?'今天的课表已完成。你可以自由加练，或让手指休息一下。':`今日还需 ${Math.max(0,p.warmup-n.warmup)} 轮热身、${Math.max(0,p.magic-n.magic)} 轮魔法练习。完整轮次才计入目标。`;
 $('#startDaily').textContent=complete?'查看今日成果 ✦':n.warmup||n.magic?'继续今日课程 →':'开始今日课程 →';
 $('#startDaily').disabled=false;$('#pausePractice').disabled=!working;
 $('#planForm').querySelectorAll('input,button').forEach(el=>el.disabled=working);
}
function loadPlanFields(){const p=plan($('#planDate').value||nowDate());$('#warmupTarget').value=p.warmup;$('#magicTarget').value=p.magic;$('#planFeedback').textContent='';}
function savePlan(e){e.preventDefault();const day=$('#planDate').value,p={warmup:Number($('#warmupTarget').value),magic:Number($('#magicTarget').value)};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!validTargets(p)){$('#planFeedback').textContent='请填写有效日期和 0–20 的整数轮数，至少安排一项。';return;}
 if(!storageHealthy){warnStorage();return;}
 data.plans[day]=p;if($('#saveDefault').checked)data.defaults={...p};
 if(save()){$('#planFeedback').textContent=`已保存 ${day}：热身 ${p.warmup} 轮，魔法练习 ${p.magic} 轮。`;renderDaily();renderRecords();return true;}return false;
}
function renderRecords(){
 const today=data.records.filter(r=>r.day===nowDate());const right=today.reduce((n,r)=>n+r.correct,0),wrong=today.reduce((n,r)=>n+r.errors,0);
 $('#todayAttempts').textContent=today.length;$('#todayAccuracy').textContent=right+wrong?Math.round(100*right/(right+wrong))+'%':'—';$('#todaySeconds').textContent=Math.round(today.reduce((n,r)=>n+r.durationMs,0)/1000)+'s';
 $('#history').innerHTML=data.records.map(r=>`<li><div><b>${escapeHtml(r.title)}</b><span>${escapeHtml(r.day)}${r.completed?'':' · 未完成'}</span></div><em>${formatTime(r.durationMs)}<br>${r.correct+r.errors?Math.round(100*r.correct/(r.correct+r.errors)):0}% · 错 ${r.errors}</em></li>`).join('');$('#historyEmpty').hidden=!!data.records.length;
 const mistakes={},correct={};for(const r of data.records){for(const [c,n]of Object.entries(r.mistakes||{}))mistakes[c]=(mistakes[c]||0)+n;for(const [c,n]of Object.entries(r.correctLetters||{}))correct[c]=(correct[c]||0)+n;}
 const chips=obj=>Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,16).map(([c,n])=>`<span class="mistake"><b>${escapeHtml(c===' '?'空格':c.toUpperCase())}</b> · ${n} 次</span>`).join('');
 $('#mistakes').innerHTML=chips(mistakes);$('#correctLetters').innerHTML=chips(correct);$('#mistakesEmpty').hidden=!!Object.keys(mistakes).length;$('#correctEmpty').hidden=!!Object.keys(correct).length;
 spells.forEach((s,i)=>$('#count-'+i).textContent=data.records.filter(r=>r.sequence===s.name.toLowerCase()).length);
 $('#weeklyHistory').innerHTML=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-i);const day=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,n=totals(day),p=plan(day);return `<div class="week-row"><span>${day.slice(5)}</span><span>热身 ${n.warmup}/${p.warmup} · 魔法 ${n.magic}/${p.magic}</span></div>`;}).join('');
}
function exportCsv(){const header=['日期','模式','练习','完成','用时秒','正确按键','错键','目标错键统计','实际错键对应'];const rows=data.records.map(r=>[r.day,r.mode,r.title,r.completed?'是':'否',(r.durationMs/1000).toFixed(1),r.correct,r.errors,JSON.stringify(r.mistakes),JSON.stringify(r.wrongKeys)]);const csv='\ufeff'+[header,...rows].map(row=>row.map(v=>'"'+window.translateTyping(String(v)).replaceAll('"','""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`hogwarts-typing-${nowDate()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function resetRecords(){if(!confirm(window.translateTyping('清空本游戏的课表、每日轮数和全部练习记录？其他小游戏不受影响。')))return;cancelNext();clearInterval(timerId);localStorage.removeItem(STORAGE);localStorage.removeItem('hogwarts-typing-academy-language');location.reload();}
function direction(from,to){if(from===to)return'在基准键上轻轻敲击';const a=document.querySelector(`[data-key="${CSS.escape(from)}"]`),b=document.querySelector(`[data-key="${CSS.escape(to)}"]`);if(!a||!b)return'伸向目标键';const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),dx=br.x-ar.x,dy=br.y-ar.y;const vertical=dy< -12?'向上':dy>12?'向下':'';const horizontal=dx< -12?'向左':dx>12?'向右':'';return vertical+horizontal+'伸过去'}
function renderSession(){if(!session)return;const target=currentChar(),f=keyFinger[target];$('#lessonCount').textContent=`${session.index} / ${session.sequence.length} 个正确按键 · ${session.errors} 次错键`;$('#progressFill').style.width=(100*session.index/session.sequence.length)+'%';$('#prompt').innerHTML=[...session.sequence].map((c,i)=>`<span class="glyph ${i<session.index?'done':i===session.index?'current':''}">${c===' '?'␣':c.toUpperCase()}</span>`).join('');document.querySelectorAll('.key.target-key').forEach(e=>e.classList.remove('target-key'));document.querySelectorAll('.finger.active').forEach(e=>e.classList.remove('active'));if(!f){$('#pathLayer').style.display='none';return}const k=document.querySelector(`[data-key="${CSS.escape(target)}"]`);k?.classList.add('target-key');document.querySelector(`[data-finger="${f.id}"]`)?.classList.add('active');$('#fingerName').textContent=`${f.name} → ${target===' '?'空格':target.toUpperCase()}`;$('#moveText').textContent=target===' '?'拇指轻按空格。':`从 ${f.home.toUpperCase()} ${direction(f.home,target)}，敲 ${target.toUpperCase()}。`;$('#returnText').textContent=target===' '?'拇指轻按空格，其他手指留在基准行。':`敲完后回到 ${f.home.toUpperCase()}，其他手指尽量留在基准行。`;requestAnimationFrame(()=>{updateRoute();const current=$('#prompt .current');if(current)$('#prompt').scrollTop=Math.max(0,current.offsetTop-$('#prompt').offsetTop-40);})}
function updateRoute(){if(!session||session.finished)return;const t=currentChar(),f=keyFinger[t],svg=$('#pathLayer');if(!f||!t){svg.style.display='none';return}const from=document.querySelector(`[data-key="${CSS.escape(f.home)}"]`),to=document.querySelector(`[data-key="${CSS.escape(t)}"]`);if(!from||!to)return;const rect=$('#keyboard').getBoundingClientRect(),a=from.getBoundingClientRect(),b=to.getBoundingClientRect(),x1=a.left+a.width/2-rect.left,y1=a.top+a.height/2-rect.top,x2=b.left+b.width/2-rect.left,y2=b.top+b.height/2-rect.top;svg.style.display='block';svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);const path=`M ${x1} ${y1} Q ${(x1+x2)/2} ${Math.min(y1,y2)-24} ${x2} ${y2}`;$('#pathLine').setAttribute('d',path);$('#pathStart').setAttribute('cx',x1);$('#pathStart').setAttribute('cy',y1);const dot=$('#pathDot');dot.style.offsetPath=`path('${path}')`;dot.style.offsetDistance='0%';dot.setAttribute('cx','0');dot.setAttribute('cy','0')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function showScreen(next){
 view=next;document.body.dataset.screen=next;
 document.querySelectorAll('[data-view]').forEach(el=>el.hidden=el.dataset.view!==next);
 $('#screenLabel').textContent=({setup:'家长 · 今日课表',ready:'准备迎接魔法',practice:'一次一个按键',complete:'今日课程完成',history:'家长 · 本地学习记录'})[next];
 $('#exitLesson').hidden=next==='setup';
 window.scrollTo({top:0,behavior:'instant'});
 const heading=$(`[data-view="${next}"] h1`);if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
}
function stageIntro(stage){
 currentStage=stage;renderDaily();showScreen('ready');const p=plan(),n=totals(),warm=stage==='warmup';
 $('#stageSymbol').textContent=warm?'⌨':'✧';$('#stageEyebrow').textContent=warm?'STAGE 01 · FINGER WARM-UP':'STAGE 02 · SPELL PRACTICE';
 $('#stageTitle').textContent=warm?'让手指先热起来。':'现在，施放你的魔法。';
 $('#stageDescription').textContent=warm?'找到 F 和 J 的小凸点。跟随高亮的按键，伸出手指，敲击，然后回家。':'每轮完成三个咒语，十个咒语依次轮换。看清字母，使用正确的手指。';
 $('#stageSummary').textContent=`${warm?'手指热身':'魔法练习'} · 还需 ${p[stage]-n[stage]} 轮`;
 $('#startDaily').textContent=warm?'开始热身 →':'开始魔法练习 →';
}
function renderStageProgress(){const warm=session.mode==='warmup'||session.mode==='zone',kind=warm?'warmup':'magic',p=plan(),n=totals();
 $('#stageProgress').textContent=warm?'01 · 手指热身':'02 · 魔法咒语';
 $('#stageRound').textContent=dailyActive?`第 ${Math.min(n[kind]+1,p[kind])} / ${p[kind]} 轮${game?' · 第 '+(game.step+1)+' / 3 次施法':''}`:'自由加练';
}
function showCompletion(){const n=totals(),rows=data.records.filter(r=>r.day===nowDate()),right=rows.reduce((n,r)=>n+r.correct,0),wrong=rows.reduce((n,r)=>n+r.errors,0);
 $('#completionStats').innerHTML=`<div><strong>${n.warmup}</strong><span>轮热身</span></div><div><strong>${n.magic}</strong><span>轮魔法练习</span></div><div><strong>${right+wrong?Math.round(right/(right+wrong)*100):0}%</strong><span>今日准确率</span></div>`;showScreen('complete');
}

function build(){
 $('#zones').innerHTML=fingerDefs.map((f,i)=>`<button class="zone" data-zone="${i}"><b>${f.name}</b><span>${f.keys.toUpperCase().split('').join(' · ')}</span><small>基准键 ${f.home.toUpperCase()}</small></button>`).join('');
 $('#spells').innerHTML=spells.map((s,i)=>`<button class="spell-card" data-spell="${i}"><span class="icon">${s.icon}</span><b>${s.name}</b><span>${s.meaning}</span><small>${s.name.length} 个按键 · 已尝试 <span id="count-${i}">0</span> 次</small></button>`).join('');
 for(const [handId,ids]of [['leftHand',['lp','lr','lm','li','thumb']],['rightHand',['rp','rr','rm','ri']]])$('#'+handId).innerHTML=ids.map(id=>`<div class="finger ${id==='thumb'?'thumb':''}" data-finger="${id}"></div>`).join('');
 const kb=$('#keyboard');['qwertyuiop','asdfghjkl;','zxcvbnm,./'].forEach((row,index)=>{const div=document.createElement('div');div.className='key-row';div.dataset.row=String(index);let column=[1,2,4][index];for(const k of row){const f=keyFinger[k],el=document.createElement('div');el.className='key'+(f.home===k?' home':'');el.dataset.key=k;el.textContent=k.toUpperCase();el.style.setProperty('--finger-color',f.color);el.style.gridColumn=column+' / span 4';column+=4;div.append(el);}kb.append(div);});
 const space=document.createElement('div');space.className='key-row space-row';space.innerHTML='<div class="key other">⌘</div><div class="key spacebar" data-key=" " style="--finger-color:#dfcda2">SPACE · 拇指</div><div class="key other">⌥</div>';kb.append(space);
 document.querySelectorAll('[data-zone]').forEach(b=>b.onclick=()=>startManual(()=>startZone(Number(b.dataset.zone))));
 document.querySelectorAll('[data-spell]').forEach(b=>b.onclick=()=>startManual(()=>startSpell(spells[Number(b.dataset.spell)].name)));
 $('#startDaily').onclick=()=>{if(currentStage==='warmup')startWarmup();else if(currentStage==='magic')startGame();};$('#startWarmup').onclick=()=>startManual(startWarmup);$('#startGame').onclick=()=>startManual(startGame);$('#pausePractice').onclick=pausePractice;
 $('#planDate').value=nowDate();loadPlanFields();$('#planDate').onchange=loadPlanFields;$('#planForm').onsubmit=savePlan;
 $('#exportBtn').onclick=exportCsv;$('#resetBtn').onclick=resetRecords;
 $('#handoff').onclick=()=>{if(!$('#planForm').reportValidity())return;if($('#planDate').value!==nowDate()){$('#planFeedback').textContent='请选择今天的日期，再交给孩子开始练习。';return;}if(savePlan({preventDefault(){}}))startDaily();};
 document.querySelectorAll('[data-screen]').forEach(b=>b.onclick=()=>{if(session&&!session.finished||nextTimer)pausePractice();showScreen(b.dataset.screen);if(b.dataset.screen==='history')renderRecords();});
 $('#exitLesson').onclick=()=>{pausePractice();showScreen('setup');};
 $('#fullscreenButton').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{showToast('当前浏览器不支持全屏，可直接在本窗口练习。');}};
 document.addEventListener('fullscreenchange',()=>{$('#fullscreenButton').textContent=document.fullscreenElement?'退出全屏':'全屏';requestAnimationFrame(updateRoute);});
 window.addEventListener('typing-language-change',()=>{$('#dateLabel').textContent=new Intl.DateTimeFormat(window.typingLanguage==='zh'?'zh-CN':'en-US',{month:'long',day:'numeric',weekday:'long'}).format(new Date());requestAnimationFrame(updateRoute);});
 window.addEventListener('keydown',onKey);window.addEventListener('resize',()=>requestAnimationFrame(updateRoute));
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&(session&&!session.finished||nextTimer))pausePractice();else if(lastDay!==nowDate()){lastDay=nowDate();pausePractice();renderRecords();$('#planDate').value=nowDate();loadPlanFields();}});
 window.addEventListener('pagehide',checkpoint);
 // A refreshed partial attempt stays visible in the record, but never earns a round.
 if(data.active){const r=data.active;data.records.unshift({...r,completed:false,durationMs:r.elapsedMs||0});data.active=null;save();showToast('上次未完成的练习已保存，整轮需要重新开始。');}
 // Freeze a day's plan so later default changes cannot rewrite past targets.
 if(!data.plans[nowDate()]){data.plans[nowDate()]={...data.defaults};save();}
 renderDaily();renderRecords();renderQuest();showScreen('setup');if(!storageHealthy)warnStorage();
 window.addEventListener('storage',e=>{if(e.key===STORAGE&&e.newValue===localStorage.getItem(STORAGE)&&e.newValue!==JSON.stringify(data)){cancelNext();clearInterval(timerId);session=null;dailyActive=false;game=null;document.querySelectorAll('button,input').forEach(el=>el.disabled=true);let notice=$('#tabNotice');if(!notice){notice=document.createElement('div');notice.id='tabNotice';notice.className='save-warning';notice.innerHTML='另一个标签页已更新练习记录。请在一个标签页练习。 <button class="btn secondary" id="reloadTab">重新加载</button>';$('main').before(notice);$('#reloadTab').onclick=()=>location.reload();}}});
}
build();
})();
