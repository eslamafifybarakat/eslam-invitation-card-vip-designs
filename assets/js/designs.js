/* Eslam VIP Invitation Cards — design catalogue + canvas renderer
   كل التصميمات بتترسم على canvas بوحدات منطقية: الضلع الأقصر = 1080 */
(function (global) {
  'use strict';

  const F_BODY = 'Alexandria', F_TITLE = 'Aref Ruqaa';
  const GOLD   = ['#7d5e22','#dcc077','#a8822f','#f5e3a6','#b08b3a','#7d5e22'];
  const ROSE   = ['#80513f','#e6b8a4','#a86f5b','#f5d4c4','#a06a56','#7b4c3b'];
  const BRASS  = ['#5e4e22','#d0b86e','#958034','#eddca4','#8f7a35','#5e4e22'];
  const COPPER = ['#6e3b1f','#d99c6e','#9c5a33','#f2c3a0','#8a4b28','#6e3b1f'];
  const CHAMP  = ['#7a6a55','#eadcc2','#b49d7a','#f8eedc','#9a8466','#7a6a55'];
  const DGOLD  = ['#6b4f1a','#b8933f','#8c6a28','#d2b263','#7a5c20'];
  const DEEP   = ['#2a1d08','#5c4318','#3a2a0c','#6b4f1d','#2a1d08'];

  const DESIGNS = [
    {id:'t1',ar:'أسود ملكي',en:'Royal Onyx',pos:'top',bg:['radial','#221d14','#030303'],ov:['rays','grain','vignette'],frame:'deco',foil:GOLD,text:'#e7dcc3',strong:'#f7ecd1',muted:'#b3a582',qr:['#111','#f7f0dc'],son:'bar'},
    {id:'t2',ar:'زمردي مخملي',en:'Emerald Velvet',pos:'top',bg:['radial','#14583f','#02140c'],ov:['girih','grain','vignette'],frame:'double',foil:GOLD,text:'#e3eadf',strong:'#fbf3dc',muted:'#a7c0ae',qr:['#06261a','#f7f0dc'],son:'text'},
    {id:'t3',ar:'عنابي بقوس',en:'Bordeaux Arch',pos:'top',bg:['linear','#621424','#1c0408'],ov:['diag','grain','vignette'],frame:'arch',foil:GOLD,text:'#f2e3dd',strong:'#fff2e0',muted:'#cda7a2',qr:['#2a070e','#f8efdc'],son:'bar'},
    {id:'t4',ar:'عاجي بختم الشمع',en:'Ivory Wax Seal',pos:'top',bg:['linear','#fcf9f2','#eee3cb'],ov:['linen','grain'],frame:'double',foil:DGOLD,light:true,text:'#3a3223',strong:'#1c170e',muted:'#7d6d4f',qr:['#1c170e','#ffffff'],son:'text',seal:'red'},
    {id:'t5',ar:'الكارت الذهبي',en:'Gold Card',pos:'top',bg:['gold'],ov:['brushed','grain'],frame:'thin',foil:DEEP,light:true,gold:true,text:'#3a2c12',strong:'#1e1508',muted:'#5c4826',qr:['#1e1508','#fffaf0'],son:'barDark'},
    {id:'t6',ar:'باذنجاني وشامبين',en:'Aubergine Champagne',pos:'top',bg:['radial','#3e1a3b','#0e040c'],ov:['bokeh','stars','grain','vignette'],frame:'double',foil:CHAMP,text:'#eee3ea',strong:'#fbf1f4',muted:'#bfa6b8',qr:['#1a0818','#faf3ea'],son:'bar'},
    {id:'t7',ar:'رخام أسود وذهب',en:'Black Marble Gold',pos:'top',bg:['linear','#1d1c1e','#09090a'],ov:['marble','kintsugi','grain','vignette'],frame:'thin',foil:GOLD,text:'#e9e4dc',strong:'#faf4e8',muted:'#aaa298',qr:['#0d0d0e','#f7f0dc'],son:'text'},
    {id:'t8',ar:'كريمي بأغصان ذهبية',en:'Cream Gold Olive',pos:'top',bg:['linear','#fffdf8','#f2e8d3'],ov:['branches','grain'],frame:'thin',foil:DGOLD,light:true,text:'#3b3121',strong:'#1f190e',muted:'#7d6c4d',qr:['#1f190e','#ffffff'],son:'bar'},
    {id:'b1',ar:'زيتي عسكري',en:'Military Olive',pos:'bottom',bg:['radial','#454c2d','#13160c'],ov:['chevron','grain','vignette'],frame:'thin',foil:BRASS,laurel:true,text:'#e4e2d0',strong:'#f4efd6',muted:'#b0ad8e',qr:['#13160c','#f2edd8'],son:'bar'},
    {id:'b2',ar:'فحمي ونحاسي',en:'Charcoal Copper',pos:'bottom',bg:['linear','#2b2927','#0f0e0d'],ov:['girih','grain','vignette'],frame:'deco',foil:COPPER,text:'#ece2da',strong:'#fbf0e6',muted:'#b6a597',qr:['#140f0c','#faf0e6'],son:'text'},
    {id:'b3',ar:'رملي وعنابي',en:'Sand & Maroon',pos:'bottom',bg:['linear','#f4ead5','#d8c198'],ov:['dots','grain'],frame:'arch',foil:DGOLD,light:true,text:'#4a1c22',strong:'#5a1220',muted:'#7c5a4a',qr:['#3c0d16','#fffaf0'],son:'text'},
    {id:'b4',ar:'لؤلؤي بلمعة ذهب',en:'Pearl Gold Dust',pos:'bottom',bg:['linear','#ffffff','#f4f0e7'],ov:['confetti','grain'],frame:'deco',foil:DGOLD,light:true,text:'#2a2a28',strong:'#111110',muted:'#77736a',qr:['#111110','#ffffff'],son:'bar'},
    {id:'b5',ar:'أخضر غابات بإضاءة',en:'Forest Bokeh',pos:'bottom',bg:['radial','#22412e','#050e08'],ov:['bokeh','grain','vignette'],frame:'double',foil:GOLD,text:'#e2e9df',strong:'#f6f1df',muted:'#a3b6a6',qr:['#071209','#f6efdc'],son:'bar'},
    {id:'b6',ar:'أسود بشريحة ذهب',en:'Gold Slice Noir',pos:'bottom',bg:['split'],ov:['grain','vignette'],frame:'gilded',foil:GOLD,text:'#e7e1d6',strong:'#faf3e3',muted:'#a69d8c',qr:['#0b0b0b','#f7f0dc'],son:'text'},
    {id:'b7',ar:'عنابي مخملي بختم ذهبي',en:'Velvet Gold Seal',pos:'bottom',bg:['radial','#6d1628','#170306'],ov:['rays','grain','vignette'],frame:'double',foil:GOLD,text:'#f3e3df',strong:'#fff2e1',muted:'#d0a9a6',qr:['#22050a','#f8efdc'],son:'text',seal:'gold'},
    {id:'b8',ar:'رخام أبيض وروز جولد',en:'White Marble Rose',pos:'bottom',bg:['linear','#fbf9f8','#ebe5e1'],ov:['marbleLight','kintsugi','grain'],frame:'thin',foil:ROSE,light:true,text:'#3a2e2b',strong:'#221a18',muted:'#85716b',qr:['#221a18','#ffffff'],son:'bar'}
  ];

  let W = 1080, H = 1350, QR = null, QR_URL = '';

  /* ---------- helpers ---------- */
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function hash(s){let h=7;for(const c of s)h=Math.imul(h^c.charCodeAt(0),2654435761);return h}
  function foil(ctx,x0,y0,x1,y1,stops){const g=ctx.createLinearGradient(x0,y0,x1,y1);stops.forEach((c,i)=>g.addColorStop(i/(stops.length-1),c));return g}
  function font(w,s,f){return `${w} ${s}px "${f}", "Alexandria", Tahoma, sans-serif`}
  function fit(ctx,text,w,s,f,maxW){let size=s;ctx.font=font(w,size,f);while(maxW&&ctx.measureText(text).width>maxW&&size>12){size-=1.5;ctx.font=font(w,size,f)}return size}
  function txt(ctx,text,x,y,fill,w,s,f,maxW,align,shadow){
    if(!text)return s;
    const size=fit(ctx,text,w,s,f,maxW);ctx.font=font(w,size,f);
    ctx.textAlign=align||'center';ctx.textBaseline='middle';ctx.direction='rtl';
    ctx.save();if(shadow){ctx.shadowColor=shadow[0];ctx.shadowBlur=shadow[1];ctx.shadowOffsetY=shadow[2]||0}
    ctx.fillStyle=fill;ctx.fillText(text,x,y);ctx.restore();return size}
  function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
  function diamond(ctx,x,y,s){ctx.beginPath();ctx.moveTo(x,y-s);ctx.lineTo(x+s,y);ctx.lineTo(x,y+s);ctx.lineTo(x-s,y);ctx.closePath();ctx.fill()}
  function star8(ctx,cx,cy,r,k){ctx.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8-Math.PI/2;const rr=i%2?r*(k||0.62):r;ctx.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a))}ctx.closePath()}
  /* ملمس الحبيبات: بيتولد صفوف صفوف (نفس النتيجة بالظبط) عشان التسخين يقسمه على كذا مهمة صغيرة */
  /* كانفاس في الصفحة، أو OffscreenCanvas جوه الـ worker */
  function mkCanvas(w,h){if(typeof document!=='undefined'){const c=document.createElement('canvas');c.width=w;c.height=h;return c}return new OffscreenCanvas(w,h)}
  let NOISE=null,NOISE_X=null,NOISE_R=null,NOISE_ROWS=0;
  function noiseRows(n){
    /* willReadFrequently = كانفاس على المعالج، مبيستناش تجهيز كارت الشاشة */
    if(!NOISE){NOISE=mkCanvas(240,240);NOISE_X=NOISE.getContext('2d',{willReadFrequently:true})||NOISE.getContext('2d');NOISE_R=rng(99)}
    const end=Math.min(240,NOISE_ROWS+n);if(end<=NOISE_ROWS)return;
    const im=NOISE_X.createImageData(240,end-NOISE_ROWS),r=NOISE_R;
    for(let i=0;i<im.data.length;i+=4){const v=r()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}
    NOISE_X.putImageData(im,0,NOISE_ROWS);NOISE_ROWS=end;
  }
  function noise(){noiseRows(240);return NOISE}

  function qrMatrix(url){
    if(QR&&QR_URL===url)return QR;
    QR_URL=url;QR=null;
    /* الباركود بيتحفظ على الجهاز، فالزيارة الجاية متحسبهوش تاني */
    const key='vipcards:qr:'+url;
    try{const c=url&&localStorage.getItem(key);if(c){QR=JSON.parse(c);return QR}}catch(_){}
    if(!url||typeof global.qrcode!=='function')return null;
    try{const q=global.qrcode(0,'M');q.addData(url);q.make();const n=q.getModuleCount();QR=[];for(let r=0;r<n;r++){let row='';for(let c=0;c<n;c++)row+=q.isDark(r,c)?'1':'0';QR.push(row)}}catch(e){QR=null}
    if(QR)try{localStorage.setItem(key,JSON.stringify(QR))}catch(_){}
    return QR;
  }

  /* ---------- background ---------- */
  function drawBg(ctx,d,lay){
    const t=d.bg[0];let g;
    if(t==='radial'){g=ctx.createRadialGradient(W/2,H*0.36,40,W/2,H*0.5,Math.max(W,H)*0.85);g.addColorStop(0,d.bg[1]);g.addColorStop(1,d.bg[2]);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
    else if(t==='linear'){g=ctx.createLinearGradient(0,0,W*0.35,H);g.addColorStop(0,d.bg[1]);g.addColorStop(1,d.bg[2]);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
    else if(t==='gold'){ctx.fillStyle=foil(ctx,0,0,W,H,['#b48d3c','#f0d996','#c9a352','#f9e9bb','#c39b4a','#a9823a']);ctx.fillRect(0,0,W,H);
      const s=ctx.createRadialGradient(W*0.3,H*0.2,20,W*0.3,H*0.2,Math.max(W,H));s.addColorStop(0,'rgba(255,250,230,.45)');s.addColorStop(1,'rgba(255,250,230,0)');ctx.fillStyle=s;ctx.fillRect(0,0,W,H)}
    else if(t==='split'){
      ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,W,H);
      const yb=lay.titleBottom+30,tilt=Math.min(62,W*0.06);
      const g2=ctx.createLinearGradient(0,0,0,yb);g2.addColorStop(0,'#24211b');g2.addColorStop(1,'#16140f');
      ctx.fillStyle=g2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(W,yb-tilt);ctx.lineTo(0,yb);ctx.closePath();ctx.fill();
      ctx.strokeStyle=foil(ctx,0,yb-tilt,W,yb,GOLD);ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,yb);ctx.lineTo(W,yb-tilt);ctx.stroke();
      ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,yb-16);ctx.lineTo(W,yb-tilt-16);ctx.stroke();
      ctx.fillStyle='#1a1813';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W,H);ctx.lineTo(W,H-110);ctx.lineTo(0,H-48);ctx.closePath();ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle=foil(ctx,0,H-110,W,H-48,GOLD);ctx.beginPath();ctx.moveTo(0,H-48);ctx.lineTo(W,H-110);ctx.stroke()}
  }
  function overlay(ctx,d,o){
    const L=d.light,c=L?'rgba(140,105,40,':'rgba(220,190,120,';const r=rng(hash(d.id+o));ctx.save();
    switch(o){
    case 'rays':{const rg=ctx.createLinearGradient(0,0,0,H*0.62);rg.addColorStop(0,c+'0.16)');rg.addColorStop(0.55,c+'0.06)');rg.addColorStop(1,c+'0)');
      ctx.strokeStyle=rg;ctx.lineWidth=1.2;const n=Math.ceil(W/80)+6;
      for(let i=-n;i<=n;i++){ctx.beginPath();ctx.moveTo(W/2,-60);ctx.lineTo(W/2+i*80,H*0.62);ctx.stroke()}
      for(let rad=140;rad<=560;rad+=56){ctx.beginPath();ctx.arc(W/2,-60,rad,0,Math.PI);ctx.stroke()}break}
    case 'stars':{ctx.strokeStyle=c+(L?'0.16)':'0.07)');ctx.lineWidth=1.3;
      for(let y=0;y<H+120;y+=135)for(let x=(y/135%2)*67;x<W+120;x+=135){star8(ctx,x,y,34);ctx.stroke();ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.stroke()}break}
    case 'girih':{ctx.strokeStyle=c+(L?'0.18)':'0.085)');ctx.lineWidth=1.3;const s=110;
      for(let y=-s;y<H+s;y+=s)for(let x=-s;x<W+s;x+=s){star8(ctx,x,y,s*0.42,0.72);ctx.stroke();ctx.beginPath();ctx.rect(x-s*0.17,y-s*0.17,s*0.34,s*0.34);ctx.stroke();
        ctx.beginPath();ctx.moveTo(x+s*0.42,y);ctx.lineTo(x+s*0.58,y);ctx.moveTo(x,y+s*0.42);ctx.lineTo(x,y+s*0.58);ctx.stroke();
        ctx.save();ctx.translate(x+s/2,y+s/2);ctx.rotate(Math.PI/4);ctx.strokeRect(-s*0.11,-s*0.11,s*0.22,s*0.22);ctx.restore()}break}
    case 'diag':{ctx.strokeStyle=c+'0.055)';ctx.lineWidth=1;for(let k=-H;k<W+H;k+=24){ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k+H,H);ctx.stroke()}break}
    case 'dots':{ctx.fillStyle='rgba(90,18,32,0.10)';for(let y=28;y<H;y+=32)for(let x=28;x<W;x+=32){ctx.beginPath();ctx.arc(x,y,1.7,0,Math.PI*2);ctx.fill()}break}
    case 'chevron':{ctx.strokeStyle='rgba(230,220,170,0.045)';ctx.lineWidth=14;for(let y=-200;y<H+200;y+=70){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W/2,y+160);ctx.lineTo(W,y);ctx.stroke()}break}
    case 'linen':{for(let y=0;y<H;y+=3){ctx.fillStyle=`rgba(120,95,50,${0.012+r()*0.025})`;ctx.fillRect(0,y,W,1)}for(let x=0;x<W;x+=3){ctx.fillStyle=`rgba(120,95,50,${0.01+r()*0.02})`;ctx.fillRect(x,0,1,H)}break}
    case 'brushed':{for(let y=0;y<H;y+=2){ctx.fillStyle=r()>0.5?`rgba(255,250,225,${r()*0.10})`:`rgba(90,60,10,${r()*0.07})`;ctx.fillRect(0,y,W,1)}break}
    case 'marble':case 'marbleLight':{const n=Math.round(30*W*H/(1080*1350));
      for(let i=0;i<n;i++){ctx.strokeStyle=o==='marble'?`rgba(255,245,240,${0.02+r()*0.06})`:`rgba(90,80,78,${0.03+r()*0.07})`;ctx.lineWidth=0.6+r()*2.4;
        let x=r()*W,y=r()*H;ctx.beginPath();ctx.moveTo(x,y);
        for(let j=0;j<5;j++){const nx=x+(r()-0.3)*420,ny=y+(r()-0.5)*300;ctx.bezierCurveTo(x+(r()-0.5)*200,y+(r()-0.5)*200,nx+(r()-0.5)*200,ny+(r()-0.5)*200,nx,ny);x=nx;y=ny}ctx.stroke()}break}
    case 'kintsugi':{ctx.strokeStyle=foil(ctx,0,0,W,H,d.foil);ctx.shadowColor=L?'rgba(160,110,80,.35)':'rgba(230,190,110,.55)';ctx.shadowBlur=8;
      [[-20,H*0.07,1],[W+20,H*0.04,-1],[-20,H*0.6,1],[W+20,H*0.93,-1],[-20,H*0.96,1]].forEach(([x,y,dir])=>{ctx.lineWidth=1.6+r()*1.8;ctx.beginPath();ctx.moveTo(x,y);let cx=x,cy=y;
        for(let j=0;j<4;j++){const nx=cx+dir*(35+r()*45),ny=cy+(r()-0.5)*70;ctx.lineTo(nx,ny);if(r()>0.55){ctx.moveTo(nx,ny);ctx.lineTo(nx+dir*(20+r()*30),ny+(r()-0.3)*60);ctx.moveTo(nx,ny)}cx=nx;cy=ny}ctx.stroke()});break}
    case 'bokeh':{const n=Math.round(34*W*H/(1080*1350));for(let i=0;i<n;i++){const x=r()*W,y=r()*H,rad=12+r()*70;const g=ctx.createRadialGradient(x,y,0,x,y,rad);const a=0.05+r()*0.12;
        g.addColorStop(0,`rgba(240,205,130,${a})`);g.addColorStop(0.7,`rgba(240,205,130,${a*0.5})`);g.addColorStop(1,'rgba(240,205,130,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,rad,0,Math.PI*2);ctx.fill()}break}
    case 'confetti':{ctx.fillStyle=foil(ctx,0,0,W,H,d.foil);
      for(let i=0;i<260;i++){let x,y;const k=r();if(k<0.5){x=r()*W*0.45*r();y=r()*H*0.3*r()}else{x=W-r()*W*0.45*r();y=H-r()*H*0.3*r()}
        ctx.globalAlpha=0.25+r()*0.6;const s=1+r()*3.2;if(r()>0.6)diamond(ctx,x,y,s*1.4);else{ctx.beginPath();ctx.arc(x,y,s,0,Math.PI*2);ctx.fill()}}break}
    case 'branches':{const g=foil(ctx,0,0,W,H,d.foil);branch(ctx,W-70,80,-1,1,g);branch(ctx,70,H-80,1,-1,g);break}
    case 'grain':{const p=ctx.createPattern(noise(),'repeat');ctx.globalAlpha=L?0.035:0.05;ctx.globalCompositeOperation=L?'multiply':'overlay';ctx.fillStyle=p;ctx.fillRect(0,0,W,H);break}
    case 'vignette':{const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.max(W,H)*0.62);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.5)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);break}
    }
    ctx.restore();
  }
  function branch(ctx,x,y,sx,sy,fill){
    ctx.save();ctx.translate(x,y);ctx.scale(sx*0.78,sy*0.78);ctx.strokeStyle=fill;ctx.fillStyle=fill;ctx.lineWidth=2;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(60,40,140,90,300,110);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(40,60,80,140,100,290);ctx.stroke();
    const leaves=pts=>pts.forEach(([px,py,a,s])=>{ctx.save();ctx.translate(px,py);ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,-s,s*0.36,s,0,0,Math.PI*2);ctx.lineWidth=1.6;ctx.stroke();ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-s*1.8);ctx.lineWidth=0.8;ctx.stroke();ctx.restore()});
    leaves([[50,30,-0.6,18],[80,48,2.2,20],[120,66,-0.4,22],[160,80,2.4,20],[205,94,-0.3,19],[250,104,2.6,16],[290,110,-0.1,13]]);
    leaves([[30,50,0.9,18],[48,85,-2.4,20],[66,125,0.6,22],[80,165,-2.6,20],[90,210,0.3,19],[96,252,-2.9,15]]);
    [[140,72],[70,140],[230,100]].forEach(([px,py])=>{ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill()});ctx.restore();
  }
  function drawFrame(ctx,d){
    const g=foil(ctx,0,0,W,H,d.foil);ctx.save();ctx.strokeStyle=g;ctx.fillStyle=g;
    switch(d.frame){
    case 'double':ctx.lineWidth=3;ctx.strokeRect(38,38,W-76,H-76);ctx.lineWidth=1.2;ctx.strokeRect(54,54,W-108,H-108);[[54,54],[W-54,54],[54,H-54],[W-54,H-54]].forEach(([x,y])=>diamond(ctx,x,y,9));break;
    case 'thin':ctx.lineWidth=1.5;ctx.strokeRect(44,44,W-88,H-88);
      [[44,44,1,1],[W-44,44,-1,1],[44,H-44,1,-1],[W-44,H-44,-1,-1]].forEach(([x,y,sx,sy])=>{ctx.lineWidth=3.5;ctx.beginPath();ctx.moveTo(x,y+sy*90);ctx.lineTo(x,y);ctx.lineTo(x+sx*90,y);ctx.stroke();diamond(ctx,x+sx*18,y+sy*18,6)});break;
    case 'deco':ctx.lineWidth=2;ctx.strokeRect(40,40,W-80,H-80);
      [[40,40,1,1],[W-40,40,-1,1],[40,H-40,1,-1],[W-40,H-40,-1,-1]].forEach(([x,y,sx,sy])=>{ctx.lineWidth=1.2;for(let k=1;k<=3;k++){ctx.beginPath();ctx.moveTo(x+sx*k*16,y+sy*(16+k*26));ctx.lineTo(x+sx*k*16,y+sy*k*16);ctx.lineTo(x+sx*(16+k*26),y+sy*k*16);ctx.stroke()}diamond(ctx,x+sx*12,y+sy*12,5)});
      ctx.lineWidth=1;ctx.strokeRect(62,62,W-124,H-124);break;
    case 'arch':{ctx.lineWidth=2.5;ctx.strokeRect(34,34,W-68,H-68);const x0=64,x1=W-64,yb=H-64,ys=330,apex=72,hw=Math.min(180,W*0.17);
      ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x0,yb);ctx.lineTo(x0,ys);ctx.bezierCurveTo(x0,170,W/2-hw,110,W/2,apex);ctx.bezierCurveTo(W/2+hw,110,x1,170,x1,ys);ctx.lineTo(x1,yb);ctx.closePath();ctx.stroke();diamond(ctx,W/2,apex-2,8);break}
    case 'gilded':ctx.lineWidth=16;ctx.strokeRect(8,8,W-16,H-16);ctx.lineWidth=1.2;ctx.strokeRect(34,34,W-68,H-68);break;
    }
    ctx.restore();
  }
  function laurel(ctx,cx,cy,r,fill){
    ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=fill;ctx.lineWidth=2.4;
    [1,-1].forEach(side=>{ctx.beginPath();for(let t=0;t<=1.0001;t+=0.02){const a=Math.PI*(0.42-0.7*t);const x=cx+side*r*Math.cos(a),y=cy+r*Math.sin(a);t===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke();
      for(let i=0;i<11;i++){const t=i/10,a=Math.PI*(0.42-0.7*t);const x=cx+side*r*Math.cos(a),y=cy+r*Math.sin(a);const tang=Math.atan2(Math.cos(a),-side*Math.sin(a));
        [1,-1].forEach(io=>{ctx.save();ctx.translate(x,y);ctx.rotate(tang+io*0.55*side+(side<0?Math.PI:0));ctx.beginPath();ctx.ellipse(0,-io*12*side,6,14-(t*3),0,0,Math.PI*2);ctx.fill();ctx.restore()})}});
    ctx.restore();
  }
  function seal(ctx,x,y,R,kind,letter){
    const r=rng(31);ctx.save();const base=kind==='red'?['#a82a2a','#5a0c0c','#3a0606']:['#f2d98f','#a8822f','#6b4f1a'];
    ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=14;ctx.shadowOffsetY=6;ctx.beginPath();
    for(let i=0;i<=40;i++){const a=i/40*Math.PI*2;const rr=R*(0.94+r()*0.1);ctx.lineTo(x+rr*Math.cos(a),y+rr*Math.sin(a))}ctx.closePath();
    const g=ctx.createRadialGradient(x-R*0.35,y-R*0.4,R*0.1,x,y,R*1.05);g.addColorStop(0,base[0]);g.addColorStop(0.65,base[1]);g.addColorStop(1,base[2]);ctx.fillStyle=g;ctx.fill();ctx.restore();
    ctx.save();ctx.strokeStyle=kind==='red'?'rgba(40,0,0,.45)':'rgba(70,45,10,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,R*0.72,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle=kind==='red'?'rgba(255,170,160,.25)':'rgba(255,245,210,.5)';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y+1.5,R*0.72,0,Math.PI*2);ctx.stroke();
    if(letter){ctx.font=font(700,R*0.82,F_TITLE);ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='rtl';
      ctx.fillStyle=kind==='red'?'rgba(255,190,180,.35)':'rgba(255,248,220,.6)';ctx.fillText(letter,x,y+2);
      ctx.fillStyle=kind==='red'?'rgba(40,0,0,.6)':'rgba(80,55,15,.75)';ctx.fillText(letter,x,y-1)}
    ctx.restore();
  }
  function divider(ctx,w,fill){ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=fill;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(-18,0);ctx.moveTo(18,0);ctx.lineTo(w/2,0);ctx.stroke();
    ctx.save();ctx.rotate(Math.PI/4);ctx.lineWidth=1.4;ctx.strokeRect(-7,-7,14,14);ctx.restore();diamond(ctx,0,0,4);diamond(ctx,-w/2,0,3);diamond(ctx,w/2,0,3);ctx.restore()}
  function iconCal(ctx,x,y,c){ctx.save();ctx.strokeStyle=c;ctx.lineWidth=2.4;rrect(ctx,x-14,y-12,28,26,4);ctx.stroke();ctx.beginPath();ctx.moveTo(x-14,y-3);ctx.lineTo(x+14,y-3);ctx.moveTo(x-7,y-17);ctx.lineTo(x-7,y-8);ctx.moveTo(x+7,y-17);ctx.lineTo(x+7,y-8);ctx.stroke();ctx.restore()}
  function iconMoon(ctx,x,y,c){ctx.save();ctx.beginPath();ctx.arc(x,y,14,0,Math.PI*2);ctx.clip();ctx.fillStyle=c;ctx.beginPath();ctx.rect(x-20,y-20,40,40);ctx.arc(x+8,y-6,12,0,Math.PI*2);ctx.fill('evenodd');ctx.restore()}
  function iconPin(ctx,x,y,c){ctx.save();ctx.strokeStyle=c;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(x,y-5,11,Math.PI*0.85,Math.PI*2.15);ctx.lineTo(x,y+16);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(x,y-5,4,0,Math.PI*2);ctx.stroke();ctx.restore()}
  function drawQR(ctx,x,y,size,d,M){
    ctx.save();ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=12;ctx.shadowOffsetY=4;ctx.fillStyle=d.qr[1];rrect(ctx,x,y,size,size,16);ctx.fill();ctx.restore();
    ctx.save();ctx.strokeStyle=foil(ctx,x,y,x+size,y+size,d.foil);ctx.lineWidth=3;rrect(ctx,x-7,y-7,size+14,size+14,20);ctx.stroke();
    if(M){const n=M.length,pad=size*0.1,m=(size-pad*2)/n;ctx.fillStyle=d.qr[0];for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(M[r][c]==='1')ctx.fillRect(x+pad+c*m,y+pad+r*m,m+0.35,m+0.35)}
    ctx.restore();
  }
  function dots(ctx,y,w,c){ctx.save();ctx.strokeStyle=c;ctx.setLineDash([3,9]);ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-w,y);ctx.lineTo(w,y);ctx.stroke();ctx.restore()}

  /* ---------- layout ---------- */
  // [key, base height, scales with font?]
  function sigLines(C){return String(C.signature||'').split('\n').map(x=>x.trim()).filter(Boolean)}
  function blocks(d,C,general,pos){
    const top=pos==='top';const b=[];
    b.push(['title',d.laurel?200:160,true]);
    if(top){if(!general)b.push(['honor',42,true],['name',80,true]);b.push(['div',46,false]);if(C.greeting)b.push(['greet',44,true])}
    if(C.bodyLine1)b.push(['body1',48,true]);if(C.bodyLine2)b.push(['body2',48,true]);
    b.push(['son',(d.son==='bar'||d.son==='barDark')?110:86,true]);
    if(C.academy)b.push(['academy',50,true]);
    b.push(['div',52,false],['details',282,false]);
    if(C.closingLine1)b.push(['close1',46,true]);if(C.closingLine2)b.push(['close2',46,true]);
    /* التوقيع ممكن يبقى كذا سطر — كل سطر زيادة بياخد 50 */
    if(C.signature)b.push(['sig',66+50*(sigLines(C).length-1),true]);
    if(!top&&!general)b.push(['plaque',236,false]);
    return b;
  }
  function layout(d,C,fs,general,namePos){
    const list=blocks(d,C,general,namePos);
    const heights=list.map(([,h,t])=>h*(t?fs:1));
    const Hc=heights.reduce((a,b)=>a+b,0);
    const padT=70,padB=d.bg[0]==='split'?96:80, Ha=H-padT-padB;
    const s=Math.min((W-150)/900,Ha/Hc,1.25);
    let extra=Ha-Hc*s;const gaps=list.length-1;
    let gap=Math.max(0,Math.min(extra/(gaps+2),64*s));
    let y=padT+(extra-gap*gaps)/2;
    const pos=[];list.forEach((b,i)=>{const h=heights[i]*s;pos.push({k:b[0],y:y+h/2,h});y+=h+gap});
    const t=pos[0];
    return {s,pos,titleBottom:t.y+t.h/2};
  }

  /* ---------- main render (ctx already scaled to logical units) ---------- */
  function render(ctx,d,o){
    W=o.LW;H=o.LH;const C=o.C,fs=o.fs||1,L=d.light;
    const pos=o.pos||d.pos,lay=layout(d,C,fs,o.general,pos),s=lay.s;
    ctx.clearRect(0,0,W,H);drawBg(ctx,d,lay);d.ov.forEach(v=>overlay(ctx,d,v));drawFrame(ctx,d);
    const glow=L?['rgba(255,255,255,.7)',0,1.5]:['rgba(0,0,0,.45)',10,2];
    const goldW=foil(ctx,-500,-200,500,200,d.foil);
    const accent=d.gold||L?d.strong:foil(ctx,-320,-30,320,30,d.foil);
    const nameFill=()=>d.gold||L?d.strong:foil(ctx,-360,-40,360,40,d.foil);
    const M=qrMatrix(C.mapUrl);
    const T=(k)=>C[k]||'';
    lay.pos.forEach(p=>{
      ctx.save();ctx.translate(W/2,p.y);ctx.scale(s,s);
      switch(p.k){
      case 'title':{const g=foil(ctx,-320,-100,320,100,d.foil);
        if(d.laurel){laurel(ctx,0,0,118*fs,foil(ctx,-200,-200,200,200,d.foil));txt(ctx,T('title'),0,0,g,700,78*fs,F_TITLE,200*fs,'center',glow)}
        else txt(ctx,T('title'),0,-6,g,700,132*fs,F_TITLE,820,'center',glow);break}
      case 'honor':txt(ctx,(o.honor||'')+' /',0,0,d.muted,300,30*fs,F_BODY,760);break;
      case 'name':if(o.name)txt(ctx,o.name,0,0,nameFill(),700,58*fs,F_BODY,780,'center',L?null:glow);else dots(ctx,20,260,d.muted);break;
      case 'div':divider(ctx,p===lay.pos.find(q=>q.k==='div')&&pos==='top'?240:520,goldW);break;
      case 'greet':txt(ctx,T('greeting'),0,0,d.muted,300,26*fs,F_BODY,780);break;
      case 'body1':txt(ctx,T('bodyLine1'),0,0,d.text,400,34*fs,F_BODY,800);break;
      case 'body2':txt(ctx,T('bodyLine2'),0,0,d.text,400,34*fs,F_BODY,800);break;
      case 'son':{const son=T('graduate');
        if(d.son==='bar'||d.son==='barDark'){const sz=fit(ctx,son,700,48*fs,F_BODY,700);ctx.font=font(700,sz,F_BODY);const tw=ctx.measureText(son).width;const bw=tw+110,bh=sz+46;
          ctx.save();ctx.shadowColor='rgba(0,0,0,.3)';ctx.shadowBlur=18;ctx.shadowOffsetY=6;
          ctx.fillStyle=d.son==='barDark'?foil(ctx,-bw/2,0,bw/2,0,['#1c1408','#3b2a10','#1c1408']):foil(ctx,-bw/2,-bh/2,bw/2,bh/2,['#c9a554','#f3dd9c','#d8b768','#f6e6b2','#c19a4a']);
          rrect(ctx,-bw/2,-bh/2,bw,bh,18);ctx.fill();ctx.restore();
          if(d.son!=='barDark'){ctx.save();ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=1.2;rrect(ctx,-bw/2+6,-bh/2+6,bw-12,bh-12,13);ctx.stroke();ctx.restore()}
          txt(ctx,son,0,2,d.son==='barDark'?foil(ctx,-tw/2,0,tw/2,0,GOLD):'#1c160c',700,sz,F_BODY)}
        else txt(ctx,son,0,0,nameFill(),700,58*fs,F_BODY,820,'center',L?null:glow);break}
      case 'academy':txt(ctx,T('academy'),0,0,d.text,400,32*fs,F_BODY,780);break;
      case 'details':{const qs=196,qx=-390,top=-141;const ig=foil(ctx,0,top,0,top+qs,d.foil);
        drawQR(ctx,qx,top,qs,d,M);txt(ctx,T('qrLabel'),qx+qs/2,top+qs+34,d.muted,300,21*fs,F_BODY,240);
        const ix=380,tx=345,rows=[top+32,top+98,top+164];
        iconCal(ctx,ix,rows[0],ig);iconMoon(ctx,ix,rows[1],ig);iconPin(ctx,ix,rows[2],ig);
        txt(ctx,T('date'),tx,rows[0],d.strong,600,32*fs,F_BODY,480,'right');
        txt(ctx,T('time'),tx,rows[1],d.text,400,30*fs,F_BODY,480,'right');
        txt(ctx,T('location'),tx,rows[2],d.text,400,30*fs,F_BODY,480,'right');break}
      case 'close1':txt(ctx,T('closingLine1'),0,0,accent,400,32*fs,F_BODY,800);break;
      case 'close2':txt(ctx,T('closingLine2'),0,0,accent,400,32*fs,F_BODY,800);break;
      case 'sig':{const ls=sigLines(C),lh=50*fs;ls.forEach((l,i)=>txt(ctx,l,0,(i-(ls.length-1)/2)*lh,d.strong,700,36*fs,F_BODY,780));break}
      case 'plaque':{const pw=780,ph=210;
        ctx.save();ctx.fillStyle=L?'rgba(140,105,40,0.07)':'rgba(255,240,210,0.06)';rrect(ctx,-pw/2,-ph/2,pw,ph,18);ctx.fill();
        ctx.strokeStyle=goldW;ctx.lineWidth=2;rrect(ctx,-pw/2,-ph/2,pw,ph,18);ctx.stroke();ctx.lineWidth=1;rrect(ctx,-pw/2+10,-ph/2+10,pw-20,ph-20,12);ctx.stroke();ctx.restore();
        txt(ctx,T('presentedTo'),0,-ph/2+40,d.muted,300,24*fs,F_BODY,600);
        if(o.name)txt(ctx,(o.honor||'')+' / '+o.name,0,16,nameFill(),700,48*fs,F_BODY,680,'center',L?null:glow);
        else{txt(ctx,(o.honor||'')+' /',0,8,d.muted,300,28*fs,F_BODY,600);dots(ctx,40,230,d.muted)}break}
      }
      ctx.restore();
    });
    const ss=Math.max(0.7,Math.min(1.1,s));
    /* لما الاسم تحت، الختم الأحمر بيطلع فوق عشان ميغطيش خانة الاسم */
    if(d.seal==='red'){if(pos==='bottom'&&!o.general)seal(ctx,150,170,64*ss,'red',C.sealLetter);else seal(ctx,150,H-150,64*ss,'red',C.sealLetter)}
    if(d.seal==='gold')seal(ctx,165,175,62*ss,'gold',C.sealLetter);
  }

  /* render into a canvas of pixel size pw×ph */
  function paint(canvas,d,o){
    const pw=canvas.width,ph=canvas.height,k=Math.min(pw,ph)/1080;
    const ctx=canvas.getContext('2d');ctx.setTransform(1,0,0,1,0,0);ctx.scale(k,k);
    render(ctx,d,Object.assign({},o,{LW:pw/k,LH:ph/k}));
    ctx.setTransform(1,0,0,1,0,0);
  }

  /* تسخين قبل أول رسم: كل خطوة مهمة صغيرة لوحدها عشان الصفحة متهنجش (الباركود، الملمس، كل وزن خط) */
  function warmSteps(C){
    const wc=mkCanvas(8,8).getContext('2d');wc.direction='rtl';
    const sample=[C.title,C.greeting,C.bodyLine1,C.graduate,C.date,C.location,C.signature,'سيادة / 0123456789'].filter(Boolean).join(' ');
    const shape=(w,s,f,t)=>()=>{wc.font=font(w,s,f);wc.measureText(t)};
    const grain=[0,1,2,3,4,5].map(()=>()=>noiseRows(40));
    return [()=>qrMatrix(C.mapUrl)].concat(grain,[shape(300,30,F_BODY,sample),shape(400,34,F_BODY,sample),shape(600,32,F_BODY,sample),shape(700,48,F_BODY,sample),shape(700,120,F_TITLE,C.title||'دعوة')]);
  }

  global.VIPCards={DESIGNS,paint,qrMatrix,warmSteps};
})(typeof window!=='undefined'?window:self);
