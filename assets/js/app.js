(function(){
'use strict';
const {DESIGNS,paint}=window.VIPCards;

/* النصوص الأساسية — بتتستبدل بمحتوى content.json لو اتقرا */
const DEFAULT_CONTENT={
  title:"دعوة",
  honorifics:["سيادة","معالي","سعادة","النائب","اللواء","المستشار","الدكتور","المهندس","الأستاذ","الحاج"],
  defaultHonorific:"سيادة",greeting:"بعد التحية والتقدير،،",
  bodyLine1:"يسعدني دعوة سيادتكم لحضور",bodyLine2:"حفل الاحتفال بتخرج نجلي",
  graduate:"الملازم / وليد حسن بركات",academy:"من الكلية الحربية",
  date:"الخميس 22 أكتوبر 2026",time:"بعد صلاة المغرب",location:"فيلاتي بمدينة سرس الليان – المنوفية",
  mapUrl:"https://maps.app.goo.gl/xL8nt7S2hbxiP6ge8?g_st=ac",qrLabel:"امسح للوصول للموقع",
  closingLine1:"حضوركم يُضفي على الحفل قيمةً ومكانة",closingLine2:"ويزيدنا شرفًا وسعادة",
  signature:"المهندس / حسن عبدالعزيز بركات",presentedTo:"مقدّمة إلى",sealLetter:"و",fileNamePrefix:"دعوة"
};

/* حقول محرر النصوص — key, ar, en, type */
const FIELD_GROUPS=[
  {ar:'الحفل',en:'Event',f:[['title','عنوان الكارت','Card title'],['greeting','التحية','Greeting'],['bodyLine1','سطر الدعوة الأول','Invitation line 1'],['bodyLine2','سطر الدعوة التاني','Invitation line 2'],['graduate','اسم الخريج','Graduate name'],['academy','الجهة / الكلية','Academy']]},
  {ar:'الموعد والمكان',en:'Date & place',f:[['date','التاريخ','Date','date'],['time','الوقت','Time'],['location','المكان','Location'],['mapUrl','لينك اللوكيشن (الباركود)','Location link (QR)','url'],['qrLabel','النص تحت الباركود','Text under QR']]},
  {ar:'الختام والتوقيع',en:'Closing & signature',f:[['closingLine1','سطر الختام الأول','Closing line 1'],['closingLine2','سطر الختام التاني','Closing line 2'],['signature','التوقيع','Signature'],['presentedTo','عنوان خانة المدعو','Guest plaque label'],['sealLetter','حرف الختم','Seal letter','short']]},
  {ar:'الألقاب والملف',en:'Titles & file',f:[['honorifics','الألقاب (كل لقب في سطر)','Titles (one per line)','list'],['defaultHonorific','اللقب الافتراضي','Default title','combo'],['fileNamePrefix','بداية اسم الملف','File name prefix']]}
];

const SIZES=[
  {id:'feed',w:1080,h:1350,ar:'واتساب / إنستجرام',en:'WhatsApp / Instagram',r:'4:5'},
  {id:'story',w:1080,h:1920,ar:'حالة / ستوري',en:'Status / Story',r:'9:16'},
  {id:'square',w:1080,h:1080,ar:'مربع',en:'Square post',r:'1:1'},
  {id:'screen',w:1920,h:1080,ar:'شاشة عرض',en:'Screen / TV',r:'16:9'},
  {id:'a5',w:1748,h:2480,ar:'طباعة A5',en:'Print A5',r:'300dpi'},
  {id:'custom',w:0,h:0,ar:'مقاس مخصص',en:'Custom size',r:'px'}
];

const I18N={
 ar:{docTitle:'كروت دعوة VIP — صمّم كارت دعوة فاخر وشاركه على واتساب في ثواني',appTitle:'كروت دعوة VIP',subtitle:'اختار التصميم، اكتب اسم المدعو، وشاركه في ثانية',designs:'التصميمات',
  filterAll:'الكل',filterTop:'الاسم فوق',filterBottom:'الاسم تحت',prev:'السابق',next:'التالي',
  guestSection:'بيانات المدعو',honorLabel:'اللقب',honorPh:'اختار أو اكتب اللقب',showTitles:'عرض الألقاب',honorHint:'اكتب أول حروف اللقب عشان تفلتر القائمة، أو اكتب لقب جديد.',
  comboEmpty:'مفيش لقب بالاسم ده — «{v}» هيتكتب زي ما هو',actionsLabel:'مشاركة وتنزيل',
  pickDate:'اختار التاريخ',todayBtn:'النهارده',prevMonth:'الشهر اللي فات',nextMonth:'الشهر الجاي',pastDisabled:'الأيام اللي فاتت مقفولة',
  nameLabel:'اسم المدعو',namePh:'مثال: محمد عبدالرحمن',sizeSection:'المقاس والجودة',width:'العرض',height:'الارتفاع',
  q1:'عادية',q2:'عالية ×2',output:'الصورة النهائية:',fontSection:'حجم الخط',reset:'رجوع للأصل',
  fontHint:'الخط بيكبر ويصغر والتصميم بيظبط المسافات تلقائيًا على أي مقاس.',
  editorTitle:'نصوص الكارت',editorHint:'عدّل أي نص أو لينك اللوكيشن واضغط «حفظ» عشان يتغير في كل التصميمات.',unsaved:'تعديلات مش محفوظة',
  save:'حفظ وتطبيق',resetTexts:'رجوع للنصوص الأصلية',importJson:'استيراد content.json',exportJson:'تصدير content.json',openMap:'فتح',
  savedTexts:'اتحفظت النصوص واتغيرت في الكروت',resetDone:'رجعت النصوص الأصلية',noChanges:'مفيش تعديلات جديدة',confirmReset:'ترجع كل النصوص للأصل وتمسح تعديلاتك؟',
  badUrl:'لينك اللوكيشن مش سليم',
  textsOk:'بتستخدم النصوص الأصلية من content.json.',textsEdited:'بتستخدم النصوص اللي عدّلتها (محفوظة على الجهاز ده).',
  textsFallback:'بتستخدم النصوص الأصلية المدمجة في الصفحة.',
  jsonBad:'الملف ده مش JSON سليم',share:'مشاركة',download:'تنزيل',zip:'الكل ZIP',preparing:'جاري التجهيز',
  saved:'اتنزّل الكارت',zipSaved:'اتنزّل ملف الـ ZIP',
  counter:'{i} من {n}',failed:'حصلت مشكلة، جرّب تاني',
  shareTitle:'مشاركة الكارت',close:'إغلاق',shareImageGroup:'الصورة',shareTextGroup:'نص الدعوة + لينك اللوكيشن',
  pvPreparing:'جاري تجهيز الصورة…',pvReady:'الصورة جاهزة',
  sAll:'كل التطبيقات',sWaImg:'واتساب صورة',sCopyImg:'نسخ الصورة',sDownload:'تنزيل',
  sWa:'واتساب',sTg:'تليجرام',sFb:'فيسبوك',sX:'X',sMail:'إيميل',sSms:'رسالة SMS',sMoreText:'تطبيقات تانية',sCopyText:'نسخ النص',
  waPickHint:'اختار واتساب من القائمة، والصورة هتتبعت كرسالة عادية',waDesktop:'اتنسخت الصورة ✓ افتح المحادثة في واتساب واضغط Ctrl+V (أو لصق)',
  waDesktopDl:'اتنزّلت الصورة. افتح المحادثة في واتساب واسحبها أو أرفقها',
  imgCopied:'اتنسخت الصورة ✓',textCopied:'اتنسخ النص ✓',copyUnsupported:'النسخ مش مدعوم في المتصفح ده، فنزّلنا الصورة',
  nativeUnsupported:'المشاركة المباشرة مش مدعومة هنا، فنزّلنا الصورة. ابعتها كمرفق من أي تطبيق.',
  invitedHonor:'إلى {h} / {n}',mapLine:'📍 اللوكيشن:',
  about:'كروت دعوة VIP: 16 تصميم ذهبي فاخر لدعوات حفلات التخرج والمناسبات. اختار اللقب واكتب اسم المدعو، عدّل النصوص ولينك اللوكيشن (الباركود بيتعمل تلقائيًا)، ونزّل الكارت بمقاس واتساب أو ستوري أو طباعة A5، وشاركه على كل التطبيقات.'},
 en:{docTitle:'VIP Invitation Cards — Design a luxury invitation and share it on WhatsApp',appTitle:'VIP Invitation Cards',subtitle:'Pick a design, add the guest name, share in seconds',designs:'Designs',
  filterAll:'All',filterTop:'Name on top',filterBottom:'Name at bottom',prev:'Previous',next:'Next',
  guestSection:'Guest details',honorLabel:'Title',honorPh:'Pick or type a title',showTitles:'Show titles',honorHint:'Type the first letters to filter the list, or write a new title.',
  comboEmpty:'No matching title — “{v}” will be used as typed',actionsLabel:'Share & download',
  pickDate:'Pick the date',todayBtn:'Today',prevMonth:'Previous month',nextMonth:'Next month',pastDisabled:'Past days are disabled',
  nameLabel:'Guest name',namePh:'e.g. محمد عبدالرحمن',sizeSection:'Size & quality',width:'Width',height:'Height',
  q1:'Standard',q2:'HD ×2',output:'Output:',fontSection:'Text size',reset:'Reset',
  fontHint:'Text scales up or down and the layout re-balances itself for any size.',
  editorTitle:'Card texts',editorHint:'Edit any text or the location link, then press “Save” to apply it to every design.',unsaved:'Unsaved changes',
  save:'Save & apply',resetTexts:'Reset to original texts',importJson:'Import content.json',exportJson:'Export content.json',openMap:'Open',
  savedTexts:'Texts saved and applied to the cards',resetDone:'Original texts restored',noChanges:'No new changes',confirmReset:'Reset all texts to the original and discard your edits?',
  badUrl:"The location link isn't valid",
  textsOk:'Using the original texts from content.json.',textsEdited:'Using your edited texts (saved on this device).',
  textsFallback:'Using the built-in original texts.',
  jsonBad:"That file isn't valid JSON",share:'Share',download:'Download',zip:'All ZIP',preparing:'Preparing',
  saved:'Card downloaded',zipSaved:'ZIP downloaded',
  counter:'{i} of {n}',failed:'Something went wrong, try again',
  shareTitle:'Share the card',close:'Close',shareImageGroup:'Image',shareTextGroup:'Invitation text + location link',
  pvPreparing:'Preparing the image…',pvReady:'Image ready',
  sAll:'All apps',sWaImg:'WhatsApp image',sCopyImg:'Copy image',sDownload:'Download',
  sWa:'WhatsApp',sTg:'Telegram',sFb:'Facebook',sX:'X',sMail:'Email',sSms:'SMS',sMoreText:'Other apps',sCopyText:'Copy text',
  waPickHint:'Pick WhatsApp from the list — the image is sent as a normal message',waDesktop:'Image copied ✓ Open the chat in WhatsApp and press Ctrl+V (paste)',
  waDesktopDl:'Image downloaded. Open the chat in WhatsApp and attach it',
  imgCopied:'Image copied ✓',textCopied:'Text copied ✓',copyUnsupported:"Copying isn't supported in this browser, so the image was downloaded",
  nativeUnsupported:"Direct sharing isn't supported here, so the image was downloaded. Attach it in any app.",
  invitedHonor:'To {h} / {n}',mapLine:'📍 Location:',
  about:'VIP Invitation Cards: 16 luxury gold designs for graduation and special-occasion invitations. Pick a title, type the guest name, edit the texts and location link (the QR code is generated automatically), download in WhatsApp, Story or A5 print size, and share to any app.'}
};

/* ---------- state ---------- */
const store={get(k,d){try{const v=localStorage.getItem('vipcards:'+k);return v===null?d:JSON.parse(v)}catch(_){return d}},
  set(k,v){try{localStorage.setItem('vipcards:'+k,JSON.stringify(v))}catch(_){}},del(k){try{localStorage.removeItem('vipcards:'+k)}catch(_){}}};
const S={
  lang:store.get('lang','ar'),filter:'all',index:0,
  size:store.get('size','feed'),cw:store.get('cw',1200),ch:store.get('ch',1600),
  q:store.get('q',2),fmt:store.get('fmt','jpg'),fs:store.get('fs',100),
  honor:'',honorTouched:false,name:'',
  base:Object.assign({},DEFAULT_CONTENT),baseSrc:'fallback',C:Object.assign({},DEFAULT_CONTENT),edited:false
};
const $=id=>document.getElementById(id);
const t=k=>(I18N[S.lang]||I18N.ar)[k]||I18N.ar[k]||k;
const DPR=()=>Math.min(window.devicePixelRatio||1,2);
const reduced=()=>window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let list=DESIGNS.slice(),canvases={},slides=[];

/* ---------- content ---------- */
function cleanContent(j){
  const o={};if(!j||typeof j!=='object')return o;
  Object.keys(DEFAULT_CONTENT).forEach(k=>{if(!(k in j))return;const v=j[k];
    if(k==='honorifics'){if(Array.isArray(v))o[k]=v.map(x=>String(x).trim()).filter(Boolean)}else if(v!=null)o[k]=String(v)});
  return o;
}
async function loadBase(){
  try{const r=await fetch('content.json',{cache:'no-cache'});if(!r.ok)throw 0;const j=await r.json();S.base=Object.assign({},DEFAULT_CONTENT,cleanContent(j));S.baseSrc='json'}
  catch(_){S.base=Object.assign({},DEFAULT_CONTENT);S.baseSrc='fallback'}
}
function applyContent(){
  const saved=store.get('content',null);
  S.edited=!!saved;S.C=Object.assign({},S.base,cleanContent(saved));
}
function textsStatus(){$('textsStatus').textContent=S.edited?t('textsEdited'):S.baseSrc==='json'?t('textsOk'):t('textsFallback')}

/* ---------- i18n ---------- */
function applyLang(){
  const ar=S.lang==='ar';document.documentElement.lang=S.lang;document.documentElement.dir=ar?'rtl':'ltr';
  document.title=t('docTitle');const lb=$('langBtn');lb.textContent=ar?'EN':'ع';lb.setAttribute('aria-label',ar?'EN — English':'ع — العربية');lb.lang=ar?'en':'ar';
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));
  document.querySelectorAll('[data-i18n-aria]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.i18nAria)));
  buildHonors();buildSizes();buildEditorLabels();buildShareGrids();textsStatus();updateNow();
}

/* ---------- honorifics ---------- */
function buildHonors(){
  /* لو المستخدم لسه مختارش لقب، نحط اللقب الافتراضي من النصوص */
  if(!S.honorTouched){S.honor=S.C.defaultHonorific||(S.C.honorifics||[])[0]||'';$('honorInput').value=S.honor}
}

/* ---------- combobox: قائمة مخصصة بتتفلتر وانت بتكتب ---------- */
const normAr=v=>String(v||'').toLowerCase().replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/\s+/g,' ').trim();
function combo(input,list,cfg){
  const box=input.parentNode,id=list.id;let items=[],active=-1,open=false;
  function setActive(i){active=i;[].forEach.call(list.children,(li,k)=>li.classList.toggle('active',k===i));
    if(i>-1&&list.children[i]){input.setAttribute('aria-activedescendant',id+'_'+i);const li=list.children[i];
      if(li.offsetTop<list.scrollTop)list.scrollTop=li.offsetTop;else if(li.offsetTop+li.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=li.offsetTop+li.offsetHeight-list.clientHeight}
    else input.removeAttribute('aria-activedescendant')}
  function render(q){
    const all=cfg.options(),n=normAr(q),cur=input.value.trim();
    items=n?all.filter(o=>normAr(o).indexOf(n)>-1):all.slice();
    if(n)items.sort((a,b)=>(normAr(a).indexOf(n)===0?0:1)-(normAr(b).indexOf(n)===0?0:1));
    list.innerHTML='';
    items.forEach((o,i)=>{const li=document.createElement('li');li.id=id+'_'+i;li.setAttribute('role','option');li.dataset.i=i;
      li.setAttribute('aria-selected',String(o===cur));
      const k=n&&normAr(o).length===o.length?normAr(o).indexOf(n):-1;
      if(k>-1){li.appendChild(document.createTextNode(o.slice(0,k)));const b=document.createElement('mark');b.textContent=o.slice(k,k+n.length);li.appendChild(b);li.appendChild(document.createTextNode(o.slice(k+n.length)))}
      else li.textContent=o;
      list.appendChild(li)});
    if(!items.length){const li=document.createElement('li');li.className='combo-empty';li.textContent=t('comboEmpty').replace('{v}',q.trim());list.appendChild(li)}
    setActive(items.indexOf(cur));
  }
  function show(q){render(q==null?'':q);list.hidden=false;open=true;input.setAttribute('aria-expanded','true');box.classList.add('open')}
  function hide(){if(!open)return;list.hidden=true;open=false;input.setAttribute('aria-expanded','false');box.classList.remove('open');input.removeAttribute('aria-activedescendant')}
  function pick(i){const v=items[i];if(v==null)return;input.value=v;hide();cfg.onChange(v)}
  input.addEventListener('focus',()=>show(''));
  input.addEventListener('click',()=>{if(!open)show('')});
  input.addEventListener('input',()=>{show(input.value);cfg.onChange(input.value)});
  input.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown'){e.preventDefault();if(!open)show('');else if(items.length)setActive(Math.min(items.length-1,active+1))}
    else if(e.key==='ArrowUp'){e.preventDefault();if(open&&items.length)setActive(Math.max(0,active-1))}
    else if(e.key==='Enter'){if(open){e.preventDefault();if(active>-1)pick(active);else hide()}}
    else if(e.key==='Escape'){if(open){e.preventDefault();e.stopPropagation();hide()}}
    else if(e.key==='Tab')hide()});
  input.addEventListener('blur',()=>setTimeout(()=>{if(document.activeElement!==input)hide()},150));
  list.addEventListener('mousedown',e=>e.preventDefault());
  list.addEventListener('click',e=>{const li=e.target.closest('li[role="option"]');if(li)pick(+li.dataset.i)});
  const tg=box.querySelector('.combo-toggle');
  if(tg){tg.addEventListener('mousedown',e=>e.preventDefault());tg.addEventListener('click',()=>{if(open)hide();else{input.focus();show('')}})}
  return{hide:hide};
}

/* ---------- date picker: تقويم مخصص، أقل تاريخ النهارده ---------- */
const AR_MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const EN_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const AR_DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const WD={ar:['ح','ن','ث','ر','خ','ج','س'],en:['Su','Mo','Tu','We','Th','Fr','Sa']};
const MONTH_ALIASES=[['يناير','january','jan'],['فبراير','february','feb'],['مارس','march','mar'],['ابريل','april','apr'],['مايو','may'],['يونيو','يونيه','june','jun'],['يوليو','يوليه','july','jul'],['اغسطس','august','aug'],['سبتمبر','september','sep'],['اكتوبر','october','oct'],['نوفمبر','november','nov'],['ديسمبر','december','dec']];
function today0(){const d=new Date();d.setHours(0,0,0,0);return d}
function fmtArDate(d){return AR_DAYS[d.getDay()]+' '+d.getDate()+' '+AR_MONTHS[d.getMonth()]+' '+d.getFullYear()}
function parseDate(str){
  let v=String(str||'').replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/[۰-۹]/g,c=>c.charCodeAt(0)-1776);
  let y,m=-1,d;const iso=v.match(/(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/),dmy=v.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/);
  if(iso){y=+iso[1];m=+iso[2]-1;d=+iso[3]}else if(dmy){d=+dmy[1];m=+dmy[2]-1;y=+dmy[3]}
  else{const ym=v.match(/\d{4}/);if(!ym)return null;y=+ym[0];const dm=v.replace(ym[0],'').match(/\d{1,2}/);if(!dm)return null;d=+dm[0];
    const n=normAr(v);MONTH_ALIASES.some((a,i)=>{if(a.some(x=>new RegExp('(^|[^a-z])'+normAr(x)+'([^a-z]|$)').test(n))){m=i;return true}return false})}
  if(m<0||m>11||!d)return null;const out=new Date(y,m,d);return out.getMonth()===m?out:null;
}
function datePicker(wrap,onPick){
  const btn=wrap.querySelector('.date-btn'),txt=wrap.querySelector('.date-txt'),hid=wrap.querySelector('input[type="hidden"]'),cal=wrap.querySelector('.cal');
  let view=null,sel=null,focus=null;
  const sameDay=(a,b)=>a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  function sync(){sel=parseDate(hid.value);txt.textContent=hid.value||t('pickDate');btn.classList.toggle('empty',!hid.value)}
  function render(){
    const T=today0(),ar=S.lang==='ar',start=ar?6:0;
    const y=view.getFullYear(),mo=view.getMonth();
    const canPrev=y>T.getFullYear()||(y===T.getFullYear()&&mo>T.getMonth());
    let h='<div class="cal-head"><button type="button" class="cal-nav" data-nav="-1" aria-label="'+t('prevMonth')+'"'+(canPrev?'':' disabled')+'><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(ar?'M9 6l6 6-6 6':'M15 6l-6 6 6 6')+'"/></svg></button>'
      +'<b aria-live="polite">'+(ar?AR_MONTHS:EN_MONTHS)[mo]+' '+y+'</b>'
      +'<button type="button" class="cal-nav" data-nav="1" aria-label="'+t('nextMonth')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(ar?'M15 6l-6 6 6 6':'M9 6l6 6-6 6')+'"/></svg></button></div><div class="cal-grid" role="grid">';
    for(let i=0;i<7;i++)h+='<span class="cal-wd" aria-hidden="true">'+WD[ar?'ar':'en'][(start+i)%7]+'</span>';
    const first=new Date(y,mo,1),lead=(first.getDay()-start+7)%7,dim=new Date(y,mo+1,0).getDate();
    for(let i=0;i<lead;i++)h+='<span></span>';
    for(let d=1;d<=dim;d++){const dt=new Date(y,mo,d),past=dt<T,isSel=sameDay(dt,sel),isT=sameDay(dt,T),isF=sameDay(dt,focus);
      h+='<button type="button" class="cal-day'+(isT?' today':'')+(isSel?' sel':'')+'" data-d="'+d+'" tabindex="'+(isF?0:-1)+'"'+(past?' disabled':'')
        +' aria-pressed="'+isSel+'" aria-label="'+fmtArDate(dt)+'">'+d+'</button>'}
    h+='</div><div class="cal-foot"><small>'+t('pastDisabled')+'</small><button type="button" class="link" data-today>'+t('todayBtn')+'</button></div>';
    cal.innerHTML=h;
  }
  function focusDay(){const b=cal.querySelector('.cal-day[tabindex="0"]');if(b)b.focus()}
  function moveTo(d){const T=today0();if(d<T)d=T;focus=d;if(d.getMonth()!==view.getMonth()||d.getFullYear()!==view.getFullYear())view=new Date(d.getFullYear(),d.getMonth(),1);render();focusDay()}
  function openCal(){sync();const T=today0();focus=sel&&sel>=T?sel:T;view=new Date(focus.getFullYear(),focus.getMonth(),1);render();cal.hidden=false;btn.setAttribute('aria-expanded','true');wrap.classList.add('open');focusDay()}
  function closeCal(refocus){if(cal.hidden)return;cal.hidden=true;btn.setAttribute('aria-expanded','false');wrap.classList.remove('open');if(refocus)btn.focus()}
  function choose(d){hid.value=fmtArDate(d);sync();closeCal(true);onPick(hid.value)}
  btn.addEventListener('click',()=>cal.hidden?openCal():closeCal(false));
  cal.addEventListener('click',e=>{const n=e.target.closest('[data-nav]');
    if(n&&!n.disabled){view=new Date(view.getFullYear(),view.getMonth()+(+n.dataset.nav),1);const T=today0();focus=view<T?T:view;render();return}
    const d=e.target.closest('.cal-day');if(d&&!d.disabled){choose(new Date(view.getFullYear(),view.getMonth(),+d.dataset.d));return}
    if(e.target.closest('[data-today]'))choose(today0())});
  cal.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeCal(true);return}
    if(!e.target.classList.contains('cal-day'))return;
    const rtl=document.documentElement.dir==='rtl',f=focus||today0();let n=null;
    if(e.key==='ArrowRight')n=new Date(f.getFullYear(),f.getMonth(),f.getDate()+(rtl?-1:1));
    else if(e.key==='ArrowLeft')n=new Date(f.getFullYear(),f.getMonth(),f.getDate()+(rtl?1:-1));
    else if(e.key==='ArrowUp')n=new Date(f.getFullYear(),f.getMonth(),f.getDate()-7);
    else if(e.key==='ArrowDown')n=new Date(f.getFullYear(),f.getMonth(),f.getDate()+7);
    else if(e.key==='PageUp')n=new Date(f.getFullYear(),f.getMonth()-1,f.getDate());
    else if(e.key==='PageDown')n=new Date(f.getFullYear(),f.getMonth()+1,f.getDate());
    else if(e.key==='Home')n=today0();
    if(n){e.preventDefault();moveTo(n)}});
  document.addEventListener('mousedown',e=>{if(!cal.hidden&&!wrap.contains(e.target))closeCal(false)});
  document.addEventListener('touchstart',e=>{if(!cal.hidden&&!wrap.contains(e.target))closeCal(false)},{passive:true});
  wrap.addEventListener('focusout',e=>{if(e.relatedTarget&&!wrap.contains(e.relatedTarget))closeCal(false)});
  return{sync:sync,close:closeCal};
}
let edDate=null;

/* ---------- sizes ---------- */
function curSize(){const z=SIZES.find(x=>x.id===S.size)||SIZES[0];if(z.id!=='custom')return{w:z.w,h:z.h};
  const c=v=>Math.max(300,Math.min(6000,Math.round(+v||0)));return{w:c(S.cw),h:c(S.ch)}}
function outDims(){const {w,h}=curSize();let q=S.q;while(q>1&&Math.max(w,h)*q>8000)q--;return{w:w*q,h:h*q}}
function outLabel(){const o=outDims();$('outSize').textContent=o.w+' × '+o.h+' px · '+S.fmt.toUpperCase()}
function buildSizes(){
  const box=$('sizes');box.innerHTML='';
  SIZES.forEach(z=>{const b=document.createElement('button');b.type='button';b.className='size';b.setAttribute('role','radio');b.dataset.size=z.id;
    b.setAttribute('aria-checked',String(S.size===z.id));
    const i=document.createElement('i');const rw=z.id==='custom'?14:z.w,rh=z.id==='custom'?18:z.h;const k=22/Math.max(rw,rh);i.style.width=Math.round(rw*k)+'px';i.style.height=Math.round(rh*k)+'px';
    if(z.id==='custom'){i.style.borderStyle='dashed';i.style.background='none'}
    const tx=document.createElement('span');const bb=document.createElement('b');bb.textContent=z[S.lang]||z.ar;const sm=document.createElement('small');
    sm.textContent=z.id==='custom'?(S.lang==='ar'?'اكتب الأبعاد':'Set dimensions'):z.w+'×'+z.h+' · '+z.r;tx.appendChild(bb);tx.appendChild(sm);b.appendChild(i);b.appendChild(tx);
    b.addEventListener('click',()=>{if(S.size===z.id)return;S.size=z.id;store.set('size',S.size);buildSizes();sizeChanged()});box.appendChild(b)});
  $('customWrap').hidden=S.size!=='custom';
  document.querySelectorAll('#quality button').forEach(b=>b.setAttribute('aria-checked',String(+b.dataset.q===S.q)));
  document.querySelectorAll('#format button').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.f===S.fmt)));
  outLabel();
}
function sizeChanged(){outLabel();invalidateShare();resizeCanvases();requestAnimationFrame(()=>{padTrack();go(S.index,false)})}

/* ---------- slider ---------- */
let pvW=0,pvH=0;
function previewDims(){
  /* حجم الكانفاس = حجم عرضه الفعلي × كثافة الشاشة (بحد أقصى ×2) — أسرع بكتير من رسم صورة كبيرة */
  const {w,h}=curSize();const ar=w/h;
  const c=slides[0]&&slides[0].firstChild;let cssW=c&&c.clientWidth;
  if(!cssW){const vw=document.documentElement.clientWidth,vh=window.innerHeight;cssW=Math.min(vw*0.8,Math.min(vh*0.62,760)*ar,900)}
  const long=Math.max(cssW,cssW/ar)*DPR();const k=Math.min(1500,Math.max(480,long))/Math.max(w,h);
  return{w:Math.round(w*k),h:Math.round(h*k)};
}
function setAR(){const {w,h}=curSize();document.documentElement.style.setProperty('--ar',(w/h).toFixed(4))}
function resizeCanvases(force){
  setAR();const p=previewDims();
  if(!force&&Math.abs(p.w-pvW)<8&&Math.abs(p.h-pvH)<8)return;
  pvW=p.w;pvH=p.h;Object.keys(canvases).forEach(id=>{const c=canvases[id];c.width=p.w;c.height=p.h});renderAll();
}
function buildSlider(){
  list=DESIGNS.filter(d=>S.filter==='all'||d.pos===S.filter);
  const track=$('track');track.innerHTML='';slides=[];
  setAR();const p=previewDims();pvW=p.w;pvH=p.h;
  const frag=document.createDocumentFragment();
  list.forEach((d,i)=>{
    let c=canvases[d.id];if(!c){c=document.createElement('canvas');canvases[d.id]=c;c.width=p.w;c.height=p.h}
    else if(c.width!==p.w||c.height!==p.h){c.width=p.w;c.height=p.h;dirty[d.id]=1}
    c.setAttribute('role','img');c.setAttribute('aria-label',d.ar+' — '+d.en);
    const s=document.createElement('div');s.className='slide';s.dataset.i=i;s.appendChild(c);
    s.addEventListener('click',()=>{if(i!==S.index)go(i)});frag.appendChild(s);slides.push(s)});
  track.appendChild(frag);
  const th=$('thumbs');th.innerHTML='';
  list.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',d[S.lang]||d.ar);b.addEventListener('click',()=>go(i));th.appendChild(b)});
  S.index=Math.min(S.index,list.length-1);
  requestAnimationFrame(()=>{padTrack();go(S.index,false);resizeCanvases()});
  renderAll();
}
function padTrack(){const tr=$('track'),s=slides[0];if(!s)return;const p=Math.max(12,(tr.clientWidth-s.offsetWidth)/2)+'px';tr.style.paddingLeft=p;tr.style.paddingRight=p}
function go(i,smooth){
  i=Math.max(0,Math.min(list.length-1,i));const s=slides[i],tr=$('track');if(!s)return;
  const tb=tr.getBoundingClientRect(),sb=s.getBoundingClientRect();
  const delta=(sb.left+sb.width/2)-(tb.left+tb.width/2);
  if(smooth!==false&&!reduced()){try{tr.scrollBy({left:delta,behavior:'smooth'})}catch(_){tr.scrollLeft+=delta}}
  else{/* قفزة فورية: نلغي scroll-behavior:smooth مؤقتًا عشان الـ snap ميمسكش كارت تاني */
    tr.style.scrollBehavior='auto';tr.scrollLeft+=delta;tr.offsetWidth;tr.style.scrollBehavior=''}
  setIndex(i);
}
function setIndex(i){
  const changed=S.index!==i;S.index=i;slides.forEach((s,k)=>s.classList.toggle('is-active',k===i));
  [].forEach.call($('thumbs').children,(b,k)=>b.setAttribute('aria-current',String(k===i)));
  $('prevBtn').disabled=i===0;$('nextBtn').disabled=i===list.length-1;updateNow();
  if(changed){invalidateShare();pump()}
}
function updateNow(){const d=list[S.index];if(!d)return;$('designName').textContent=S.lang==='ar'?d.ar:d.en;
  $('counter').textContent=t('counter').replace('{i}',S.index+1).replace('{n}',list.length);
  [].forEach.call($('thumbs').children,(b,k)=>b.setAttribute('aria-label',list[k][S.lang]||list[k].ar))}
let scrollRaf=0;
function onScroll(){cancelAnimationFrame(scrollRaf);scrollRaf=requestAnimationFrame(()=>{const tb=$('track').getBoundingClientRect();const mid=tb.left+tb.width/2;let best=0,bd=1e9;
  slides.forEach((s,k)=>{const r=s.getBoundingClientRect();const dd=Math.abs(r.left+r.width/2-mid);if(dd<bd){bd=dd;best=k}});if(best!==S.index)setIndex(best)})}

/* ---------- rendering: كارت واحد في كل مرة، الأقرب للي ظاهر الأول، والباقي وقت فراغ المتصفح ---------- */
const dirty={};let pumping=false,canPaint=false;
const idle=window.requestIdleCallback?(f=>requestIdleCallback(f,{timeout:400})):(f=>setTimeout(f,32));
function opts(){return{C:S.C,honor:S.honor,name:S.name,fs:S.fs/100}}
function renderAll(){DESIGNS.forEach(d=>{dirty[d.id]=1});pump()}
function nextDirty(){let best=-1,bd=1e9;list.forEach((d,i)=>{if(dirty[d.id]&&canvases[d.id]){const dd=Math.abs(i-S.index);if(dd<bd){bd=dd;best=i}}});return best<0?null:{i:best,near:bd<=1}}
function pump(){if(pumping||!canPaint)return;const n=nextDirty();if(!n)return;pumping=true;(n.near?requestAnimationFrame:idle)(tick)}
function tick(){pumping=false;const n=nextDirty();if(!n)return;
  if(!n.near&&document.hidden){return}
  const d=list[n.i];delete dirty[d.id];try{paint(canvases[d.id],d,opts())}catch(e){}
  pump()}
let timer;function schedule(){clearTimeout(timer);invalidateShare();timer=setTimeout(renderAll,120)}

/* ---------- export ---------- */
function safe(s){return String(s||'').replace(/[\\/:*?"<>|]+/g,'').replace(/\s+/g,' ').trim()}
function fileName(d,fmt){const o=outDims();return safe([S.C.fileNamePrefix||'دعوة',S.name,d.ar,o.w+'x'+o.h].filter(Boolean).join(' - '))+'.'+(fmt||S.fmt)}
function exportBlob(d,fmt){
  fmt=fmt||S.fmt;const o=outDims();const c=document.createElement('canvas');c.width=o.w;c.height=o.h;paint(c,d,opts());
  const type=fmt==='png'?'image/png':'image/jpeg';
  return new Promise((res,rej)=>{
    if(c.toBlob)c.toBlob(b=>{c.width=c.height=0;b?res(b):rej(new Error('blob'))},type,0.93);
    else{try{const u=c.toDataURL(type,0.93);const bin=atob(u.split(',')[1]);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);res(new Blob([a],{type:type}))}catch(e){rej(e)}}
  });
}
function saveBlob(blob,name){
  if(window.navigator.msSaveOrOpenBlob){navigator.msSaveOrOpenBlob(blob,name);return}
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),8000)}
async function busy(btn,fn){if(btn.disabled)return;btn.disabled=true;btn.setAttribute('aria-busy','true');const sp=btn.querySelector('span');const old=sp.textContent;sp.textContent=t('preparing')+'…';
  try{await fn(sp)}catch(e){if(!(e&&e.name==='AbortError'))toast(t('failed'))}finally{btn.disabled=false;btn.removeAttribute('aria-busy');sp.textContent=old}}
function onDownload(){busy($('dlBtn'),async()=>{const d=list[S.index];const b=await exportBlob(d);saveBlob(b,fileName(d));toast(t('saved'))})}
let zipLoading=null;
function loadJSZip(){if(window.JSZip)return Promise.resolve();if(zipLoading)return zipLoading;
  zipLoading=new Promise((res,rej)=>{const s=document.createElement('script');s.src='assets/js/vendor/jszip.min.js';s.async=true;s.onload=()=>res();s.onerror=()=>{zipLoading=null;rej(new Error('zip'))};document.head.appendChild(s)});return zipLoading}
function onZip(){busy($('zipBtn'),async(sp)=>{
  await loadJSZip();const z=new window.JSZip();
  for(let i=0;i<DESIGNS.length;i++){sp.textContent=(i+1)+'/'+DESIGNS.length;const d=DESIGNS[i];const b=await exportBlob(d);
    z.file(String(i+1).padStart(2,'0')+' - '+fileName(d),b);await new Promise(r=>setTimeout(r,0))}
  const o=outDims();const zb=await z.generateAsync({type:'blob',compression:'STORE'});
  saveBlob(zb,safe([S.C.fileNamePrefix||'دعوة',S.name,DESIGNS.length+' designs',o.w+'x'+o.h].filter(Boolean).join(' - '))+'.zip');toast(t('zipSaved'))})}

/* ---------- share sheet ---------- */
const UA=navigator.userAgent||'';
const isMobile=/Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|Opera Mini/i.test(UA)||(navigator.maxTouchPoints>1&&/Macintosh/.test(UA));
const ICONS={
  all:'<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  wa:'<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z"/><path d="M9.2 8.6c.2-.4.6-.5.9-.4l.8 1.7c.1.3 0 .5-.2.7l-.5.5c.6 1.2 1.6 2.2 2.8 2.8l.5-.5c.2-.2.5-.3.7-.2l1.7.8c.2.3 0 .7-.4 1-1.6 1.2-6.6-2.6-6.3-6.4z" fill="currentColor" stroke="none"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  dl:'<path d="M12 3v12M7 10l5 5 5-5M5 19h14"/>',
  tg:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/><path d="M9 13l8-6-6 8"/>',
  fb:'<path d="M14 21v-7h3l.5-3H14V9c0-1 .4-1.6 1.6-1.6H17.6V4.6c-.4 0-1.6-.2-2.8-.2-2.6 0-4 1.5-4 4.2V11H8v3h2.8v7"/>',
  x:'<path d="M4 4l16 16M20 4L4 20" stroke-width="2.4"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  sms:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  more:'<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>',
  text:'<path d="M5 6h14M5 11h14M5 16h9"/>'
};
const IMG_ACTIONS=[['all','sAll','all','#7d5e22'],['waImg','sWaImg','wa','#25d366'],['copyImg','sCopyImg','copy','#475569'],['download','sDownload','dl','#9a7630']];
const TEXT_ACTIONS=[['wa','sWa','wa','#25d366'],['tg','sTg','tg','#229ed9'],['fb','sFb','fb','#1877f2'],['x','sX','x','#111111'],['mail','sMail','mail','#ea4335'],['sms','sSms','sms','#0ea5e9'],['moreText','sMoreText','more','#6d28d9'],['copyText','sCopyText','text','#475569']];
function canShareFiles(){try{if(!navigator.canShare||!navigator.share)return false;const f=new File([new Blob(['x'],{type:'image/png'})],'x.png',{type:'image/png'});return navigator.canShare({files:[f]})}catch(_){return false}}
function canCopyImage(){return!!(navigator.clipboard&&navigator.clipboard.write&&window.ClipboardItem&&window.isSecureContext)}
function buildShareGrids(){
  const mk=(box,acts)=>{box.innerHTML='';acts.forEach(a=>{
    if(a[0]==='copyImg'&&!canCopyImage())return;
    if(a[0]==='moreText'&&!navigator.share)return;
    if(a[0]==='sms'&&!isMobile)return;
    const b=document.createElement('button');b.type='button';b.className='share-btn';b.dataset.act=a[0];
    b.innerHTML='<i style="background:'+a[3]+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS[a[2]]+'</svg></i><span></span>';
    b.querySelector('span').textContent=t(a[1]);box.appendChild(b)})};
  mk($('shareImageGrid'),IMG_ACTIONS);mk($('shareTextGrid'),TEXT_ACTIONS);
}
/* الصورة بتتجهز أول ما القائمة تفتح، فلما تدوس مشاركة بتتبعت فورًا (مهم لسفاري وأندرويد) */
let shareCache=null,shareGen=0,pvUrl='';
function invalidateShare(){shareGen++;shareCache=null}
function prepareShare(){
  if(shareCache)return shareCache.p;
  const my=shareGen,d=list[S.index];
  const p=exportBlob(d).then(b=>{const name=fileName(d);const file=new File([b],name,{type:b.type,lastModified:Date.now()});
    if(my===shareGen&&shareCache){shareCache.file=file;shareCache.blob=b}return{file:file,blob:b,d:d}});
  shareCache={p:p,file:null,blob:null,png:null,d:d};
  p.catch(()=>{if(my===shareGen)shareCache=null});
  return p;
}
function pngPromise(){
  if(!shareCache)prepareShare();
  if(!shareCache.png)shareCache.png=(shareCache.blob&&shareCache.blob.type==='image/png')?Promise.resolve(shareCache.blob):exportBlob(shareCache.d,'png');
  return shareCache.png;
}
let lastFocus=null;
function openSheet(){
  lastFocus=document.activeElement;const sh=$('shareSheet');sh.hidden=false;document.documentElement.classList.add('locked');
  requestAnimationFrame(()=>sh.classList.add('open'));
  const d=list[S.index];$('sharePvName').textContent=(S.lang==='ar'?d.ar:d.en)+(S.name?' · '+S.name:'');
  const img=$('sharePreview');img.removeAttribute('src');$('shareStatus').textContent=t('pvPreparing');sh.classList.add('loading');
  const my=shareGen;
  prepareShare().then(r=>{if(my!==shareGen||sh.hidden)return;if(pvUrl)URL.revokeObjectURL(pvUrl);pvUrl=URL.createObjectURL(r.blob);img.src=pvUrl;
    $('shareStatus').textContent=t('pvReady')+' · '+outDims().w+'×'+outDims().h;sh.classList.remove('loading')}).catch(()=>{$('shareStatus').textContent=t('failed')});
  setTimeout(()=>{const f=sh.querySelector('.share-btn');(f||sh.querySelector('.sheet-panel')).focus()},60);
}
function closeSheet(){const sh=$('shareSheet');if(sh.hidden)return;sh.classList.remove('open');document.documentElement.classList.remove('locked');
  setTimeout(()=>{sh.hidden=true},reduced()?0:220);if(lastFocus&&lastFocus.focus)lastFocus.focus()}

function inviteText(){
  const C=S.C,L=[];const add=v=>{if(v)L.push(v)};
  add(C.title?'*'+C.title+'*':'');
  if(S.name)add(t('invitedHonor').replace('{h}',S.honor||'').replace('{n}',S.name));
  add(C.greeting);add([C.bodyLine1,C.bodyLine2].filter(Boolean).join(' '));
  add([C.graduate?'*'+C.graduate+'*':'',C.academy].filter(Boolean).join(' '));
  L.push('');
  if(C.date)add('📅 '+C.date);if(C.time)add('🕰️ '+C.time);if(C.location)add('📍 '+C.location);
  if(C.mapUrl)add('🗺️ '+C.mapUrl);
  L.push('');
  add([C.closingLine1,C.closingLine2].filter(Boolean).join(' '));add(C.signature);
  return L.join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
function plain(s){return s.replace(/\*/g,'')}
function openUrl(u,newTab){
  const a=document.createElement('a');a.href=u;if(newTab){a.target='_blank';a.rel='noopener noreferrer'}
  document.body.appendChild(a);a.click();a.remove();
}
async function copyText(txt){
  if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(txt);return true}catch(_){}}
  const ta=document.createElement('textarea');ta.value=txt;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
  let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();return ok;
}
async function copyImage(){
  /* ClipboardItem بياخد Promise عشان سفاري يقبل النسخ جوه نفس الضغطة */
  const item=new window.ClipboardItem({'image/png':pngPromise()});
  await navigator.clipboard.write([item]);
}
async function shareFile(withText){
  const r=shareCache&&shareCache.file?{file:shareCache.file}:await prepareShare();
  const data={files:[r.file]};
  if(withText){data.title=S.C.title||'دعوة';data.text=plain(inviteText())}
  if(navigator.canShare&&!navigator.canShare(data))delete data.text;
  await navigator.share(data);
}
async function downloadPrepared(){const r=shareCache&&shareCache.file?{file:shareCache.file,blob:shareCache.blob,d:shareCache.d}:await prepareShare();saveBlob(r.blob,fileName(r.d))}
async function shareAction(act,btn){
  const txt=inviteText(),enc=encodeURIComponent;
  try{
    switch(act){
      case 'all':
        if(canShareFiles()){await shareFile(false)}else{await downloadPrepared();toast(t('nativeUnsupported'))}break;
      case 'waImg':
        if(canShareFiles()){toast(t('waPickHint'));await shareFile(false)}
        else{let copied=false;if(canCopyImage()){try{await copyImage();copied=true}catch(_){}}
          if(!copied)await downloadPrepared();toast(t(copied?'waDesktop':'waDesktopDl'));
          openUrl(isMobile?'whatsapp://send':'https://web.whatsapp.com/',!isMobile)}break;
      case 'copyImg':
        try{await copyImage();toast(t('imgCopied'))}catch(e){await downloadPrepared();toast(t('copyUnsupported'))}break;
      case 'download':await downloadPrepared();toast(t('saved'));break;
      case 'wa':openUrl((isMobile?'https://api.whatsapp.com/send?text=':'https://web.whatsapp.com/send?text=')+enc(txt),true);break;
      case 'tg':openUrl('https://t.me/share/url?url='+enc(S.C.mapUrl||location.href)+'&text='+enc(plain(txt)),true);break;
      case 'fb':openUrl('https://www.facebook.com/sharer/sharer.php?u='+enc(S.C.mapUrl||location.href),true);break;
      case 'x':openUrl('https://twitter.com/intent/tweet?text='+enc(plain(txt).slice(0,250)),true);break;
      case 'mail':openUrl('mailto:?subject='+enc(S.C.title||'دعوة')+'&body='+enc(plain(txt)));break;
      case 'sms':openUrl('sms:'+(/iPhone|iPad|iPod/.test(UA)?'&':'?')+'body='+enc(plain(txt)));break;
      case 'moreText':await navigator.share({title:S.C.title||'دعوة',text:plain(txt)});break;
      case 'copyText':toast(await copyText(plain(txt))?t('textCopied'):t('failed'));break;
    }
  }catch(e){if(!(e&&e.name==='AbortError'))toast(t('failed'))}
}

/* ---------- texts editor ---------- */
function fieldId(k){return'ed_'+k}
function buildEditor(){
  const box=$('edGroups');box.innerHTML='';
  FIELD_GROUPS.forEach(g=>{
    const fs=document.createElement('fieldset');fs.className='ed-group';const lg=document.createElement('legend');lg.dataset.g=g.ar;fs.appendChild(lg);
    g.f.forEach(f=>{
      const [k,,,type]=f;
      if(type==='date'||type==='combo'){
        /* div مش label عشان الضغط جوه التقويم/القائمة ميفتحش ويقفل الحقل */
        const fd=document.createElement('div');fd.className='field';const lb=document.createElement('label');lb.dataset.k=k;fd.appendChild(lb);
        if(type==='date'){lb.htmlFor='edDateBtn';
          fd.insertAdjacentHTML('beforeend','<div class="datepick"><input type="hidden" id="'+fieldId(k)+'" name="'+k+'">'
            +'<button type="button" class="date-btn" id="edDateBtn" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span class="date-txt"></span><svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'
            +'<div class="cal" role="dialog" aria-label="'+t('pickDate')+'" hidden></div></div>')}
        else{lb.htmlFor=fieldId(k);
          fd.insertAdjacentHTML('beforeend','<div class="combo"><input type="text" id="'+fieldId(k)+'" name="'+k+'" dir="auto" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="'+fieldId(k)+'_list">'
            +'<button type="button" class="combo-toggle" tabindex="-1" aria-label="'+t('showTitles')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'
            +'<ul class="combo-list" id="'+fieldId(k)+'_list" role="listbox" hidden></ul></div>')}
        fs.appendChild(fd);return}
      const lab=document.createElement('label');lab.className='field'+(type==='list'?' wide':'');lab.htmlFor=fieldId(k);
      const sp=document.createElement('span');sp.dataset.k=k;lab.appendChild(sp);
      let inp;
      if(type==='list'){inp=document.createElement('textarea');inp.rows=4}
      else{inp=document.createElement('input');inp.type=type==='url'?'url':'text';if(type==='url'){inp.dir='ltr';inp.inputMode='url';inp.spellcheck=false}if(type==='short')inp.maxLength=3}
      inp.id=fieldId(k);inp.name=k;if(type!=='url')inp.dir='auto';
      if(type==='url'){const wrap=document.createElement('div');wrap.className='url-row';wrap.appendChild(inp);
        const a=document.createElement('a');a.className='btn mini';a.id='edMapOpen';a.target='_blank';a.rel='noopener';a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span></span>';
        wrap.appendChild(a);lab.appendChild(wrap)}
      else lab.appendChild(inp);
      fs.appendChild(lab)});
    box.appendChild(fs)});
  edDate=datePicker(document.querySelector('#editorForm .datepick'),()=>markDirty());
  combo($(fieldId('defaultHonorific')),$(fieldId('defaultHonorific')+'_list'),{
    options:()=>$(fieldId('honorifics')).value.split(/[\n,،]+/).map(x=>x.trim()).filter(Boolean),onChange:()=>markDirty()});
  fillEditor(S.C);
}
function buildEditorLabels(){
  FIELD_GROUPS.forEach(g=>{const lg=document.querySelector('legend[data-g="'+g.ar+'"]');if(lg)lg.textContent=S.lang==='ar'?g.ar:g.en;
    g.f.forEach(f=>{const sp=document.querySelector('#editorForm [data-k="'+f[0]+'"]');if(sp)sp.textContent=S.lang==='ar'?f[1]:f[2]})});
  if(edDate)edDate.sync();
  const a=$('edMapOpen');if(a)a.querySelector('span').textContent=t('openMap');
}
function fillEditor(C){
  FIELD_GROUPS.forEach(g=>g.f.forEach(f=>{const el=$(fieldId(f[0]));if(!el)return;const v=C[f[0]];el.value=Array.isArray(v)?v.join('\n'):(v==null?'':v)}));
  syncMapLink();if(edDate)edDate.sync();markDirty();
}
function readEditor(){
  const o={};
  FIELD_GROUPS.forEach(g=>g.f.forEach(f=>{const el=$(fieldId(f[0]));if(!el)return;let v=el.value;
    if(f[3]==='list')o[f[0]]=v.split(/[\n,،]+/).map(x=>x.trim()).filter(Boolean);
    else o[f[0]]=v.replace(/\s+/g,' ').trim()}));
  if(o.mapUrl&&!/^[a-z][a-z0-9+.-]*:/i.test(o.mapUrl))o.mapUrl='https://'+o.mapUrl;
  return o;
}
function validUrl(u){if(!u)return true;try{const x=new URL(u);return/^https?:$/.test(x.protocol)}catch(_){return/^https?:\/\/\S+\.\S+/.test(u)}}
function sameContent(a,b){return Object.keys(DEFAULT_CONTENT).every(k=>{const x=a[k],y=b[k];return Array.isArray(x)||Array.isArray(y)?JSON.stringify(x||[])===JSON.stringify(y||[]):String(x==null?'':x)===String(y==null?'':y)})}
function markDirty(){const dirtyEd=!sameContent(readEditor(),S.C);$('editorBadge').hidden=!dirtyEd;$('edSave').classList.toggle('pulse',dirtyEd);$('edReset').disabled=!S.edited&&!dirtyEd}
function syncMapLink(){const a=$('edMapOpen');if(!a)return;const u=readEditor().mapUrl;const ok=!!u&&validUrl(u);a.href=ok?u:'#';a.setAttribute('aria-disabled',String(!ok));
  $(fieldId('mapUrl')).setAttribute('aria-invalid',String(!!u&&!ok))}
function contentChanged(){buildHonors();textsStatus();invalidateShare();renderAll()}
function onSave(e){
  e.preventDefault();const o=readEditor();
  if(!validUrl(o.mapUrl)){toast(t('badUrl'));$(fieldId('mapUrl')).focus();return}
  if(!o.honorifics.length)o.honorifics=S.base.honorifics.slice();
  if(sameContent(o,S.C)){toast(t('noChanges'));return}
  const diff={};Object.keys(o).forEach(k=>{if(!sameContent(Object.assign({},S.base,{[k]:o[k]}),S.base))diff[k]=o[k]});
  if(Object.keys(diff).length){store.set('content',diff)}else store.del('content');
  applyContent();fillEditor(S.C);contentChanged();toast(t('savedTexts'));
  if(window.innerWidth<960){try{$('track').scrollIntoView({behavior:reduced()?'auto':'smooth',block:'center'})}catch(_){$('track').scrollIntoView()}}
}
function onReset(){
  if(S.edited&&!window.confirm(t('confirmReset')))return;
  store.del('content');applyContent();fillEditor(S.C);contentChanged();toast(t('resetDone'));
}
function readFileText(f){if(f.text)return f.text();return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsText(f)})}

function toast(m){const e=$('toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove('show'),3600)}

/* ---------- wire up ---------- */
async function init(){
  const fontsP=(document.fonts&&document.fonts.load)?Promise.all(['300','400','600','700'].map(w=>document.fonts.load(w+' 30px "Alexandria"','دعوة سيادة 2026'))
    .concat(document.fonts.load('700 60px "Aref Ruqaa"','دعوة'))).catch(()=>{}):Promise.resolve();
  await loadBase();applyContent();
  $('fs').value=S.fs;$('fsVal').textContent=S.fs+'%';$('cw').value=S.cw;$('ch').value=S.ch;
  const y=$('year');if(y)y.textContent=new Date().getFullYear();
  buildEditor();applyLang();buildSlider();
  /* الرسم بيستنى الخطوط بحد أقصى 2.5 ثانية عشان الكروت متترسمش بخط غلط */
  Promise.race([fontsP,new Promise(r=>setTimeout(r,2500))]).then(()=>{canPaint=true;renderAll();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>renderAll())});

  $('langBtn').addEventListener('click',()=>{S.lang=S.lang==='ar'?'en':'ar';store.set('lang',S.lang);applyLang();requestAnimationFrame(()=>{padTrack();go(S.index,false)})});
  $('filters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.dataset.filter===S.filter)return;S.filter=b.dataset.filter;S.index=0;invalidateShare();
    document.querySelectorAll('#filters button').forEach(x=>x.setAttribute('aria-checked',String(x===b)));buildSlider()});
  $('track').addEventListener('scroll',onScroll,{passive:true});
  $('track').addEventListener('keydown',e=>{const rtl=document.documentElement.dir==='rtl';
    if(e.key==='ArrowRight'){e.preventDefault();go(S.index+(rtl?-1:1))}if(e.key==='ArrowLeft'){e.preventDefault();go(S.index+(rtl?1:-1))}});
  $('prevBtn').addEventListener('click',()=>go(S.index-1));$('nextBtn').addEventListener('click',()=>go(S.index+1));
  combo($('honorInput'),$('honorList'),{options:()=>S.C.honorifics||[],onChange:v=>{S.honorTouched=true;S.honor=v.trim();schedule()}});
  $('guestName').addEventListener('input',e=>{S.name=e.target.value.trim();schedule()});
  $('quality').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.q=+b.dataset.q;store.set('q',S.q);invalidateShare();buildSizes()});
  $('format').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.fmt=b.dataset.f;store.set('fmt',S.fmt);invalidateShare();buildSizes()});
  const cust=()=>{S.cw=$('cw').value;S.ch=$('ch').value;store.set('cw',S.cw);store.set('ch',S.ch);clearTimeout(cust.h);cust.h=setTimeout(sizeChanged,300)};
  $('cw').addEventListener('input',cust);$('ch').addEventListener('input',cust);
  $('fs').addEventListener('input',e=>{S.fs=+e.target.value;$('fsVal').textContent=S.fs+'%';store.set('fs',S.fs);schedule()});
  $('fsReset').addEventListener('click',()=>{S.fs=100;$('fs').value=100;$('fsVal').textContent='100%';store.set('fs',100);schedule()});

  const form=$('editorForm');
  form.addEventListener('submit',onSave);
  form.addEventListener('input',e=>{if(e.target.name==='mapUrl')syncMapLink();markDirty()});
  $('edReset').addEventListener('click',onReset);
  $('jsonFile').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;
    try{const j=cleanContent(JSON.parse(await readFileText(f)));fillEditor(Object.assign({},S.C,j));$('edSave').focus()}
    catch(_){toast(t('jsonBad'))}e.target.value=''});
  $('exportJson').addEventListener('click',()=>{const o=Object.assign({},S.base,readEditor());
    saveBlob(new Blob([JSON.stringify(o,null,2)],{type:'application/json'}),'content.json')});

  $('dlBtn').addEventListener('click',onDownload);$('zipBtn').addEventListener('click',onZip);
  $('shareBtn').addEventListener('click',openSheet);
  $('shareSheet').addEventListener('click',e=>{if(e.target.closest('[data-close]')){closeSheet();return}
    const b=e.target.closest('.share-btn');if(b)shareAction(b.dataset.act,b)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();
    if(e.key==='Tab'&&!$('shareSheet').hidden){const f=[].filter.call($('shareSheet').querySelectorAll('button,[href]'),x=>!x.disabled&&x.offsetParent);if(!f.length)return;
      const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
  let rw,lastW=window.innerWidth;window.addEventListener('resize',()=>{clearTimeout(rw);rw=setTimeout(()=>{padTrack();go(S.index,false);
    if(Math.abs(window.innerWidth-lastW)>40){lastW=window.innerWidth;resizeCanvases()}},150)},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)pump()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
