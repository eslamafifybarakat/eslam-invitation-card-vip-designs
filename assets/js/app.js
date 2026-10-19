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

/* أيقونات حقول محرر النصوص */
const FIELD_ICONS={"title":"<path d=\"M4 7V4h16v3\"/><path d=\"M9 20h6\"/><path d=\"M12 4v16\"/>","greeting":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/>","bodyLine1":"<path d=\"M21 6H3\"/><path d=\"M21 12H9\"/><path d=\"M21 18H7\"/>","bodyLine2":"<path d=\"M21 6H3\"/><path d=\"M21 12H9\"/><path d=\"M21 18H7\"/>","graduate":"<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\"/><path d=\"M22 10v6\"/><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\"/>","academy":"<path d=\"M10 18v-7\"/><path d=\"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z\"/><path d=\"M14 18v-7\"/><path d=\"M18 18v-7\"/><path d=\"M3 22h18\"/><path d=\"M6 18v-7\"/>","time":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>","location":"<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>","mapUrl":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>","qrLabel":"<rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\"/><path d=\"M21 21v.01\"/><path d=\"M12 7v3a2 2 0 0 1-2 2H7\"/><path d=\"M3 12h.01\"/><path d=\"M12 3h.01\"/><path d=\"M12 16v.01\"/><path d=\"M16 12h1\"/><path d=\"M21 12v.01\"/><path d=\"M12 21v-1\"/>","closingLine1":"<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>","closingLine2":"<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>","signature":"<path d=\"M12 20h9\"/><path d=\"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z\"/>","presentedTo":"<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\"/><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>","sealLetter":"<path d=\"M5 22h14\"/><path d=\"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z\"/><path d=\"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13\"/>","honorifics":"<path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M3 6h.01\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/><path d=\"M8 6h13\"/>","defaultHonorific":"<path d=\"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z\"/><path d=\"M5 21h14\"/>","fileNamePrefix":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/>"};
const fieldIcon=k=>FIELD_ICONS[k]?'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+FIELD_ICONS[k]+'</svg>':'';
/* حقول محرر النصوص — key, ar, en, type */
const FIELD_GROUPS=[
  {ar:'الحفل',en:'Event',f:[['title','عنوان الكارت','Card title'],['greeting','التحية','Greeting'],['bodyLine1','سطر الدعوة الأول','Invitation line 1'],['bodyLine2','سطر الدعوة التاني','Invitation line 2'],['graduate','اسم الخريج','Graduate name'],['academy','الجهة / الكلية','Academy']]},
  {ar:'الموعد والمكان',en:'Date & place',f:[['date','التاريخ','Date','date'],['time','الوقت','Time'],['location','المكان','Location'],['mapUrl','لينك اللوكيشن (الباركود)','Location link (QR)','url'],['qrLabel','النص تحت الباركود','Text under QR']]},
  {ar:'الختام والتوقيع',en:'Closing & signature',f:[['closingLine1','سطر الختام الأول','Closing line 1'],['closingLine2','سطر الختام التاني','Closing line 2'],['signature','التوقيع (ممكن أكتر من سطر)','Signature (multi-line)','multi'],['presentedTo','عنوان خانة المدعو','Guest plaque label'],['sealLetter','حرف الختم','Seal letter','short']]},
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
  posLabel:'مكان الاسم في كل التصميمات',posTop:'الاسم فوق',posBottom:'الاسم تحت',prev:'السابق',next:'التالي',
  guestSection:'بيانات المدعو',honorLabel:'اللقب',honorPh:'اختار أو اكتب اللقب',showTitles:'عرض الألقاب',honorHint:'اكتب أول حروف اللقب عشان تفلتر القائمة، أو اكتب لقب جديد.',
  comboEmpty:'مفيش لقب بالاسم ده — «{v}» هيتكتب زي ما هو',
  generalLabel:'دعوة عامة للكل',generalHint:'إخفاء اللقب واسم المدعو من الكارت عشان تبعته لأي حد.',generalNote:'الكارت جاهز كدعوة عامة — من غير لقب أو اسم.',generalFile:'عامة',actionsLabel:'مشاركة وتنزيل',
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
  posLabel:'Name position for all designs',posTop:'Name on top',posBottom:'Name at bottom',prev:'Previous',next:'Next',
  guestSection:'Guest details',honorLabel:'Title',honorPh:'Pick or type a title',showTitles:'Show titles',honorHint:'Type the first letters to filter the list, or write a new title.',
  comboEmpty:'No matching title — “{v}” will be used as typed',
  generalLabel:'General invitation for everyone',generalHint:'Hide the title and guest name so the card can be sent to anyone.',generalNote:'The card is ready as a general invitation — no title or name.',generalFile:'عامة',actionsLabel:'Share & download',
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
  lang:store.get('lang','ar'),pos:store.get('pos','top')==='bottom'?'bottom':'top',index:0,
  size:store.get('size','feed'),cw:store.get('cw',1200),ch:store.get('ch',1600),
  q:store.get('q',2),fmt:store.get('fmt','jpg'),fs:store.get('fs',100),
  honor:'',honorTouched:false,name:'',general:store.get('general',false),
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
  document.title=t('docTitle');const lb=$('langBtn'),lt=$('langTxt');lt.textContent=ar?'EN':'ع';lt.lang=ar?'en':'ar';lb.setAttribute('aria-label',ar?'EN — English':'ع — العربية');
  document.querySelectorAll('[data-i18n]').forEach(e=>{const v=t(e.dataset.i18n);if(e.textContent!==v)e.textContent=v});
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
  let view=null,sel=null,focus=null,modal=false,backdrop=null;
  const small=()=>window.matchMedia&&matchMedia('(max-width:560px)').matches;
  const sameDay=(a,b)=>a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  function sync(){sel=parseDate(hid.value);txt.textContent=hid.value||t('pickDate');btn.classList.toggle('empty',!hid.value)}
  function render(){
    const T=today0(),ar=S.lang==='ar',start=ar?6:0;
    const y=view.getFullYear(),mo=view.getMonth();
    const canPrev=y>T.getFullYear()||(y===T.getFullYear()&&mo>T.getMonth());
    let h='<div class="cal-head"><button type="button" class="cal-nav" data-nav="-1" aria-label="'+t('prevMonth')+'"'+(canPrev?'':' disabled')+'><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(ar?'m9 18 6-6-6-6':'m15 18-6-6 6-6')+'"/></svg></button>'
      +'<b aria-live="polite">'+(ar?AR_MONTHS:EN_MONTHS)[mo]+' '+y+'</b>'
      +'<button type="button" class="cal-nav" data-nav="1" aria-label="'+t('nextMonth')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(ar?'m15 18-6-6 6-6':'m9 18 6-6-6-6')+'"/></svg></button></div><div class="cal-grid" role="grid">';
    for(let i=0;i<7;i++)h+='<span class="cal-wd" aria-hidden="true">'+WD[ar?'ar':'en'][(start+i)%7]+'</span>';
    const first=new Date(y,mo,1),lead=(first.getDay()-start+7)%7,dim=new Date(y,mo+1,0).getDate();
    for(let i=0;i<lead;i++)h+='<span></span>';
    for(let d=1;d<=dim;d++){const dt=new Date(y,mo,d),past=dt<T,isSel=sameDay(dt,sel),isT=sameDay(dt,T),isF=sameDay(dt,focus);
      h+='<button type="button" class="cal-day'+(isT?' today':'')+(isSel?' sel':'')+'" data-d="'+d+'" tabindex="'+(isF?0:-1)+'"'+(past?' disabled':'')
        +' aria-pressed="'+isSel+'" aria-label="'+fmtArDate(dt)+'">'+d+'</button>'}
    h+='</div><div class="cal-foot"><small>'+t('pastDisabled')+'</small><button type="button" class="link" data-today>'+t('todayBtn')+'</button></div>';
    if(modal)h='<div class="cal-top"><b>'+t('pickDate')+'</b><button type="button" class="icon-btn" data-close-cal aria-label="'+t('close')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></div>'+h;
    cal.innerHTML=h;
  }
  function focusDay(){const b=cal.querySelector('.cal-day[tabindex="0"]');if(b)b.focus()}
  function moveTo(d){const T=today0();if(d<T)d=T;focus=d;if(d.getMonth()!==view.getMonth()||d.getFullYear()!==view.getFullYear())view=new Date(d.getFullYear(),d.getMonth(),1);render();focusDay()}
  function openCal(){sync();const T=today0();focus=sel&&sel>=T?sel:T;view=new Date(focus.getFullYear(),focus.getMonth(),1);
    modal=small();
    if(modal){/* بننقل التقويم للـ body عشان يظهر في نص الشاشة بعرض مناسب */
      backdrop=document.createElement('div');backdrop.className='cal-backdrop';backdrop.addEventListener('click',()=>closeCal(true));
      document.body.appendChild(backdrop);document.body.appendChild(cal);cal.classList.add('cal-modal');cal.setAttribute('aria-modal','true');document.documentElement.classList.add('locked')}
    render();cal.hidden=false;btn.setAttribute('aria-expanded','true');wrap.classList.add('open');focusDay()}
  function closeCal(refocus){if(cal.hidden)return;cal.hidden=true;btn.setAttribute('aria-expanded','false');wrap.classList.remove('open');
    if(modal){modal=false;cal.classList.remove('cal-modal');cal.removeAttribute('aria-modal');wrap.appendChild(cal);if(backdrop){backdrop.remove();backdrop=null}
      if($('shareSheet').hidden)document.documentElement.classList.remove('locked')}
    if(refocus)btn.focus()}
  function choose(d){hid.value=fmtArDate(d);sync();closeCal(true);onPick(hid.value)}
  btn.addEventListener('click',()=>cal.hidden?openCal():closeCal(false));
  cal.addEventListener('click',e=>{const n=e.target.closest('[data-nav]');
    if(n&&!n.disabled){view=new Date(view.getFullYear(),view.getMonth()+(+n.dataset.nav),1);const T=today0();focus=view<T?T:view;render();return}
    const d=e.target.closest('.cal-day');if(d&&!d.disabled){choose(new Date(view.getFullYear(),view.getMonth(),+d.dataset.d));return}
    if(e.target.closest('[data-today]'))choose(today0());
    if(e.target.closest('[data-close-cal]'))closeCal(true)});
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
  const outside=n=>!wrap.contains(n)&&!cal.contains(n)&&n!==backdrop;
  document.addEventListener('mousedown',e=>{if(!cal.hidden&&!modal&&outside(e.target))closeCal(false)});
  document.addEventListener('touchstart',e=>{if(!cal.hidden&&!modal&&outside(e.target))closeCal(false)},{passive:true});
  wrap.addEventListener('focusout',e=>{if(!modal&&e.relatedTarget&&outside(e.relatedTarget))closeCal(false)});
  cal.addEventListener('focusout',e=>{if(!modal&&e.relatedTarget&&outside(e.relatedTarget))closeCal(false)});
  window.addEventListener('resize',()=>{if(!cal.hidden&&modal!==small())closeCal(false)});
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
  if(!cssW){const vw=window.innerWidth,vh=window.innerHeight;/* innerWidth مش بيجبر المتصفح يعيد الحساب */cssW=Math.min(vw*0.8,Math.min(vh*0.62,760)*ar,900)}
  const long=Math.max(cssW,cssW/ar)*DPR();const k=Math.min(1500,Math.max(480,long))/Math.max(w,h);
  return{w:Math.round(w*k),h:Math.round(h*k)};
}
function setAR(){const {w,h}=curSize();document.documentElement.style.setProperty('--ar',(w/h).toFixed(4))}
function resizeCanvases(force){
  setAR();const p=previewDims();
  if(!force&&Math.abs(p.w-pvW)<8&&Math.abs(p.h-pvH)<8)return;
  pvW=p.w;pvH=p.h;Object.keys(canvases).forEach(id=>placeholder(canvases[id]));renderAll();
}
/* الكانفاس بيبدأ صغير بنفس النسبة (ذاكرة أقل بكتير) وبياخد حجمه الحقيقي لحظة الرسم بس */
const csz={};
function placeholder(c){const k=Math.max(pvW,pvH)/64,w=Math.max(1,Math.round(pvW/k)),h=Math.max(1,Math.round(pvH/k));csz[c.__id]={w:w,h:h};
  if(c.__off){W.postMessage({type:'size',id:c.__id,w:w,h:h})}else{c.width=w;c.height=h}}
function buildSlider(){
  list=DESIGNS.slice();
  const track=$('track');track.innerHTML='';slides=[];
  setAR();const p=previewDims();pvW=p.w;pvH=p.h;
  const frag=document.createDocumentFragment();
  list.forEach((d,i)=>{
    let c=canvases[d.id];if(!c){c=document.createElement('canvas');c.__id=d.id;canvases[d.id]=c;placeholder(c);if(wReady)transferCanvas(c)}
    else{const z=csz[d.id];if(!z||z.w!==p.w||z.h!==p.h){placeholder(c);dirty[d.id]=1}}
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

/* ---------- rendering: كارت واحد في كل مرة — الظاهر فورًا، اللي جنبه وقت فراغ المتصفح، والبعيد لما توصله ---------- */
const dirty={};let pumping=false,canPaint=false;
const idle=window.requestIdleCallback?(f=>requestIdleCallback(f,{timeout:400})):(f=>setTimeout(f,32));
/* خطوات التسخين بتتنفذ واحدة واحدة مع فواصل، عشان مفيش مهمة طويلة تعطل الصفحة */
function warmUp(){const steps=window.VIPCards.warmSteps?window.VIPCards.warmSteps(S.C):[];let i=0;
  return new Promise(res=>{const next=()=>{if(i>=steps.length){res();return}try{steps[i++]()}catch(_){}setTimeout(next,0)};next()})}
function guest(){return S.general?'':S.name}
function opts(){return{C:S.C,honor:S.honor,name:guest(),general:S.general,pos:S.pos,fs:S.fs/100}}
function applyPos(){document.querySelectorAll('#posSeg button').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.pos===S.pos)))}
function applyGeneral(){
  $('generalToggle').checked=S.general;$('guestCard').classList.toggle('is-general',S.general);
  $('guestFields').hidden=S.general;$('generalNote').hidden=!S.general;
}
function renderAll(){DESIGNS.forEach(d=>{dirty[d.id]=1});pump()}
const AHEAD=2;
function nextDirty(){let best=-1,bd=1e9;list.forEach((d,i)=>{if(dirty[d.id]&&canvases[d.id]){const dd=Math.abs(i-S.index);if(dd<bd){bd=dd;best=i}}});return best<0||bd>AHEAD?null:{i:best,near:bd===0}}
function pump(){if(pumping||!canPaint)return;const n=nextDirty();if(!n)return;pumping=true;(n.near?requestAnimationFrame:idle)(tick)}
function tick(){pumping=false;if(wBusy)return;const n=nextDirty();if(!n)return;
  if(!n.near&&document.hidden){return}
  const d=list[n.i],c=canvases[d.id];delete dirty[d.id];csz[d.id]={w:pvW,h:pvH};
  /* في وضع الـ worker: كارت واحد في المرة، والكارت الجاي بيتبعت لما ده يخلص */
  if(c.__off){wBusy=true;W.postMessage({type:'paint',id:d.id,w:pvW,h:pvH,o:opts()});return}
  if(c.width!==pvW||c.height!==pvH){c.width=pvW;c.height=pvH}try{paint(c,d,opts())}catch(e){}
  pump()}

/* ---------- رسم في الخلفية (Web Worker + OffscreenCanvas) لو المتصفح بيدعمه ---------- */
let W=null,wReady=false,wBusy=false,reqN=0;const wReqs={};
function workerCapable(){try{return !!(window.Worker&&window.OffscreenCanvas&&HTMLCanvasElement.prototype.transferControlToOffscreen&&
  window.CSS&&CSS.supports&&CSS.supports('aspect-ratio','1')&&document.fonts&&document.fonts.forEach&&new OffscreenCanvas(1,1).getContext('2d'))}catch(_){return false}}
/* الخطوط بتتاخد من قواعد @font-face بتاعة الصفحة نفسها */
function fontDescriptors(){const out=[],base=new URL('assets/fonts/',location.href).href;
  document.fonts.forEach(f=>{const fam=f.family.replace(/["']/g,''),ar=/U\+0?600/i.test(f.unicodeRange);
    const file=fam==='Alexandria'?'Alexandria-'+(ar?'arabic':'latin'):fam==='Aref Ruqaa'?'ArefRuqaa-700-'+(ar?'arabic':'latin'):'';
    if(file)out.push({family:fam,url:base+file+'.woff2',weight:f.weight,style:f.style,unicodeRange:f.unicodeRange})});
  return out}
function startWorker(){return new Promise(res=>{
  if(!workerCapable())return res(false);
  let w;try{w=new Worker('assets/js/paint-worker.js')}catch(_){return res(false)}
  const fail=()=>{clearTimeout(to);try{w.terminate()}catch(_){}res(false)};
  const to=setTimeout(fail,4000);
  w.onerror=e=>{if(!wReady){if(e&&e.preventDefault)e.preventDefault();fail()}};
  w.onmessage=e=>{const m=e.data;
    if(m.type==='ready'){clearTimeout(to);W=w;wReady=true;res(true)}
    else if(m.type==='painted'){wBusy=false;pump()}
    else if(m.type==='blob'){const r=wReqs[m.req];if(r){delete wReqs[m.req];r.res(m.blob)}}
    else if(m.type==='error'){
      if(m.stage==='init'&&!wReady)fail();
      else if(m.req&&wReqs[m.req]){wReqs[m.req].rej(new Error(m.message));delete wReqs[m.req]}
      else if(m.stage==='paint'){wBusy=false;pump()}}};
  w.postMessage({type:'init',fonts:fontDescriptors()});
})}
/* الـ worker بيجهز كارت الشاشة لنفسه، فبنستنى الصفحة ترسم أول مرة الأول عشان الشاشة متفضلش بيضا */
function afterFirstPaint(){return new Promise(res=>{let done=false;const go=()=>{if(!done){done=true;res()}};
  try{if(performance.getEntriesByName('first-contentful-paint').length)return go();
    const po=new PerformanceObserver(l=>{if(l.getEntries().some(e=>e.name==='first-contentful-paint')){po.disconnect();go()}});
    po.observe({type:'paint',buffered:true})}catch(_){}
  setTimeout(go,1500)})}
function transferCanvas(c){if(c.__off)return;const off=c.transferControlToOffscreen();c.__off=true;
  const z=csz[c.__id]||{w:pvW,h:pvH};off.width=z.w;off.height=z.h;W.postMessage({type:'canvas',id:c.__id,canvas:off},[off])}
let timer;function schedule(){clearTimeout(timer);invalidateShare();timer=setTimeout(renderAll,120)}

/* ---------- export ---------- */
function safe(s){return String(s||'').replace(/[\\/:*?"<>|]+/g,'').replace(/\s+/g,' ').trim()}
function fileName(d,fmt){const o=outDims();return safe([S.C.fileNamePrefix||'دعوة',S.general?t('generalFile'):S.name,d.ar,o.w+'x'+o.h].filter(Boolean).join(' - '))+'.'+(fmt||S.fmt)}
function exportBlob(d,fmt){
  fmt=fmt||S.fmt;const o=outDims();const type=fmt==='png'?'image/png':'image/jpeg';
  /* التصدير بالجودة العالية بيحصل في الـ worker، فالصفحة متقفش وهو بيجهز الصورة */
  if(W&&wReady)return new Promise((res,rej)=>{const req=++reqN;wReqs[req]={res:res,rej:rej};W.postMessage({type:'export',req:req,id:d.id,w:o.w,h:o.h,o:opts(),mime:type})});
  const c=document.createElement('canvas');c.width=o.w;c.height=o.h;paint(c,d,opts());
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
  saveBlob(zb,safe([S.C.fileNamePrefix||'دعوة',S.general?t('generalFile'):S.name,DESIGNS.length+' designs',o.w+'x'+o.h].filter(Boolean).join(' - '))+'.zip');toast(t('zipSaved'))})}

/* ---------- share sheet ---------- */
const UA=navigator.userAgent||'';
const isMobile=/Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|Opera Mini/i.test(UA)||(navigator.maxTouchPoints>1&&/Macintosh/.test(UA));
/* أيقونات حديثة بنمط Lucide (خط 2px بحواف دائرية) + شعارات التطبيقات الرسمية */
const ICONS={
  all:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
  copy:'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  sms:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/>',
  more:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  text:'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  wa:'<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
  tg:'<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
  fb:'<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>',
  x:'<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>'
};
const BRAND={wa:1,tg:1,fb:1,x:1};
const IMG_ACTIONS=[['all','sAll','all','linear-gradient(135deg,#7d5e22,#b08b3a)'],['waImg','sWaImg','wa','#25d366'],['copyImg','sCopyImg','copy','#475569'],['download','sDownload','dl','linear-gradient(135deg,#8c6a28,#c9a554)']];
const TEXT_ACTIONS=[['wa','sWa','wa','#25d366'],['tg','sTg','tg','#229ed9'],['fb','sFb','fb','#1877f2'],['x','sX','x','#000000'],['mail','sMail','mail','#ea4335'],['sms','sSms','sms','#0ea5e9'],['moreText','sMoreText','more','#6d28d9'],['copyText','sCopyText','text','#475569']];
function canShareFiles(){try{if(!navigator.canShare||!navigator.share)return false;const f=new File([new Blob(['x'],{type:'image/png'})],'x.png',{type:'image/png'});return navigator.canShare({files:[f]})}catch(_){return false}}
function canCopyImage(){return!!(navigator.clipboard&&navigator.clipboard.write&&window.ClipboardItem&&window.isSecureContext)}
function buildShareGrids(){
  const mk=(box,acts)=>{box.innerHTML='';acts.forEach(a=>{
    if(a[0]==='copyImg'&&!canCopyImage())return;
    if(a[0]==='moreText'&&!navigator.share)return;
    if(a[0]==='sms'&&!isMobile)return;
    const b=document.createElement('button');b.type='button';b.className='share-btn';b.dataset.act=a[0];
    b.innerHTML='<i style="background:'+a[3]+'"><svg'+(BRAND[a[2]]?' class="brand"':'')+' viewBox="0 0 24 24" aria-hidden="true">'+ICONS[a[2]]+'</svg></i><span></span>';
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
  const d=list[S.index];$('sharePvName').textContent=(S.lang==='ar'?d.ar:d.en)+(guest()?' · '+guest():S.general?' · '+t('generalLabel'):'');
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
  if(guest())add(t('invitedHonor').replace('{h}',S.honor||'').replace('{n}',guest()));
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
            +'<button type="button" class="date-btn" id="edDateBtn" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg><span class="date-txt"></span><svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
            +'<div class="cal" role="dialog" aria-label="'+t('pickDate')+'" hidden></div></div>')}
        else{lb.htmlFor=fieldId(k);
          fd.insertAdjacentHTML('beforeend','<div class="combo has-ic">'+fieldIcon(k)+'<input type="text" id="'+fieldId(k)+'" name="'+k+'" dir="auto" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="'+fieldId(k)+'_list">'
            +'<button type="button" class="combo-toggle" tabindex="-1" aria-label="'+t('showTitles')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
            +'<ul class="combo-list" id="'+fieldId(k)+'_list" role="listbox" hidden></ul></div>')}
        fs.appendChild(fd);return}
      const lab=document.createElement('label');lab.className='field'+(type==='list'?' wide':'');lab.htmlFor=fieldId(k);
      const sp=document.createElement('span');sp.dataset.k=k;lab.appendChild(sp);
      let inp;
      if(type==='list'){inp=document.createElement('textarea');inp.rows=4}
      else if(type==='multi'){inp=document.createElement('textarea');inp.rows=2;inp.className='multi'}
      else{inp=document.createElement('input');inp.type=type==='url'?'url':'text';if(type==='url'){inp.dir='ltr';inp.inputMode='url';inp.spellcheck=false}if(type==='short')inp.maxLength=3}
      inp.id=fieldId(k);inp.name=k;if(type!=='url')inp.dir='auto';
      const icw=document.createElement('span');icw.className='has-ic'+(type==='list'||type==='multi'?' ic-top':'');icw.innerHTML=fieldIcon(k);icw.appendChild(inp);
      if(type==='url'){const wrap=document.createElement('div');wrap.className='url-row';wrap.appendChild(icw);
        const a=document.createElement('a');a.className='btn mini';a.id='edMapOpen';a.target='_blank';a.rel='noopener';a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg><span></span>';
        wrap.appendChild(a);lab.appendChild(wrap)}
      else lab.appendChild(icw);
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
    /* multi: نفس التنضيف بس كل سطر لوحده عشان فواصل الأسطر تفضل */
    else if(f[3]==='multi')o[f[0]]=v.split('\n').map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean).join('\n');
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
  /* الـ worker بيبدأ بعد أول رسم للصفحة، بالتوازي مع تحميل النصوص */
  const workerP=afterFirstPaint().then(startWorker);
  await loadBase();applyContent();
  $('fs').value=S.fs;$('fsVal').textContent=S.fs+'%';$('cw').value=S.cw;$('ch').value=S.ch;
  const y=$('year');if(y)y.textContent=new Date().getFullYear();
  applyLang();applyGeneral();applyPos();buildSlider();
  /* محرر النصوص تحت الصفحة، فبيتبني في مهمة لوحده بعد أول رسم */
  setTimeout(()=>{buildEditor();buildEditorLabels();textsStatus()},0);
  workerP.then(ok=>{
    if(ok){Object.keys(canvases).forEach(id=>transferCanvas(canvases[id]));canPaint=true;renderAll();return}
    /* من غير worker: الرسم بيستنى الخطوط بحد أقصى 2.5 ثانية عشان الكروت متترسمش بخط غلط */
    const fontsP=(document.fonts&&document.fonts.load)?Promise.all(['300','400','600','700'].map(w=>document.fonts.load(w+' 30px "Alexandria"','دعوة سيادة 2026'))
      .concat(document.fonts.load('700 60px "Aref Ruqaa"','دعوة'))).catch(()=>{}):Promise.resolve();
    Promise.race([fontsP,new Promise(r=>setTimeout(r,2500))]).then(()=>warmUp()).then(()=>{canPaint=true;renderAll();
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>renderAll())});
  });

  $('langBtn').addEventListener('click',()=>{S.lang=S.lang==='ar'?'en':'ar';store.set('lang',S.lang);applyLang();requestAnimationFrame(()=>{padTrack();go(S.index,false)})});
  $('posSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.dataset.pos===S.pos)return;
    S.pos=b.dataset.pos;store.set('pos',S.pos);applyPos();invalidateShare();renderAll()});
  $('posSeg').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].indexOf(e.key)<0)return;e.preventDefault();
    const b=$('posSeg').querySelector('[data-pos="'+(S.pos==='top'?'bottom':'top')+'"]');b.click();b.focus()});
  $('track').addEventListener('scroll',onScroll,{passive:true});
  $('track').addEventListener('keydown',e=>{const rtl=document.documentElement.dir==='rtl';
    if(e.key==='ArrowRight'){e.preventDefault();go(S.index+(rtl?-1:1))}if(e.key==='ArrowLeft'){e.preventDefault();go(S.index+(rtl?1:-1))}});
  $('prevBtn').addEventListener('click',()=>go(S.index-1));$('nextBtn').addEventListener('click',()=>go(S.index+1));
  combo($('honorInput'),$('honorList'),{options:()=>S.C.honorifics||[],onChange:v=>{S.honorTouched=true;S.honor=v.trim();schedule()}});
  $('guestName').addEventListener('input',e=>{S.name=e.target.value.trim();schedule()});
  $('generalToggle').addEventListener('change',e=>{S.general=e.target.checked;store.set('general',S.general);applyGeneral();schedule()});
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
