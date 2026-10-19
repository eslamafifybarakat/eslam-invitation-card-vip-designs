/* رسّام الكروت في الخلفية (Web Worker + OffscreenCanvas)
   كل الرسم والتصدير بيحصل هنا، فالصفحة نفسها بتفضل سريعة ومن غير أي تهنيج */
'use strict';
importScripts('vendor/qrcode.min.js', 'designs.js');

const {DESIGNS, paint, warmSteps} = self.VIPCards;
const byId = {};
DESIGNS.forEach(d => { byId[d.id] = d; });
const canvases = {};

self.onmessage = async (e) => {
  const m = e.data;
  try {
    switch (m.type) {
      case 'init': {
        /* لازم المتصفح يدعم الخطوط والرسم جوه الـ worker، وإلا الصفحة بترسم بالطريقة العادية */
        if (!self.fonts || typeof FontFace === 'undefined') throw new Error('no worker fonts');
        if (!new OffscreenCanvas(1, 1).getContext('2d')) throw new Error('no offscreen 2d');
        const faces = m.fonts.map(f => new FontFace(f.family, 'url(' + f.url + ')', {
          weight: f.weight, style: f.style, unicodeRange: f.unicodeRange
        }));
        faces.forEach(f => self.fonts.add(f));
        await Promise.all(faces.map(f => f.load()));
        warmSteps(m.C).forEach(step => { try { step(); } catch (_) {} });
        postMessage({type: 'ready'});
        break;
      }
      case 'canvas':
        canvases[m.id] = m.canvas;
        break;
      case 'size': {
        const c = canvases[m.id];
        if (c) { c.width = m.w; c.height = m.h; }
        break;
      }
      case 'paint': {
        const c = canvases[m.id];
        if (c) {
          if (c.width !== m.w || c.height !== m.h) { c.width = m.w; c.height = m.h; }
          paint(c, byId[m.id], m.o);
        }
        postMessage({type: 'painted', id: m.id});
        break;
      }
      case 'export': {
        const c = new OffscreenCanvas(m.w, m.h);
        paint(c, byId[m.id], m.o);
        const blob = await c.convertToBlob({type: m.mime, quality: 0.93});
        postMessage({type: 'blob', req: m.req, blob});
        break;
      }
    }
  } catch (err) {
    postMessage({type: 'error', stage: m.type, req: m.req, id: m.id, message: String((err && err.message) || err)});
  }
};
