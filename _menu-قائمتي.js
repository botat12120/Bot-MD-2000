import fetch from 'node-fetch';
import fs from 'fs';

// Function to convert milliseconds to a readable time string
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

// قائمة معرفات المطورين
const devs = ['201225655220@s.whatsapp.net', '201016948771@s.whatsapp.net', '994403938879@s.whatsapp.net'];

const handler = async (m, { conn }) => {
  // إضافة حالة fakegif
  let fakegif = { 
    key: { 
      participant: `0@s.whatsapp.net`, 
      ...("6289643739077-1613049930@g.us" ? { remoteJid: "6289643739077-1613049930@g.us" } : {})
    },
    message: {
      "videoMessage": { 
        "title": '🐱⸽⃕❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭ - MD🍁⃨፝⃕✰', 
        "h": `Hmm`,
        'seconds': '99999', 
        'gifPlayback': 'true', 
        'caption': '🐱⸽⃕❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭ - MD🍁⃨፝⃕✰', 
        'jpegThumbnail': false 
      }
    }
  };

  if (!devs.includes(m.sender)) {
    return conn.reply(m.chat, 'هذا الأمر مخصص للمطورين فقط.', m, { quoted: fakegif }); // استخدام الحالة الجديدة هنا
  }

  try {
    const datas = global;
    const idioma = datas.db.data.users[m.sender]?.language || 'default';

    // Load translation file
    const langFilePath = `./language/${idioma}.json`;
    if (!fs.existsSync(langFilePath)) {
      throw new Error(`Language file not found: ${langFilePath}`);
    }
    const _translate = JSON.parse(fs.readFileSync(langFilePath));
    const tradutor = _translate.plugins.menu_menu;

    // Image URLs
    const imageUrls = {
      'es': 'https://telegra.ph/file/20e7b01ed8cc14b190ff0.jpg',
      'default': 'https://telegra.ph/file/20e7b01ed8cc14b190ff0.jpg'
    };
    const imageUrl = imageUrls[idioma] || imageUrls['default'];

    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.buffer();

    const str = `
> *╮───[ اوامر المطور ]───✧*
> *┤ 〚 .بريم 〛*
> *┤ 〚 .خفض-بريم 〛*
> *┤ 〚 .المميزين 〛*
> *┤────────────···*
> *┤ 〚 .فحص 〛*  
> *┤ 〚 .انضم 〛* 
> *┤ 〚 .عقد_الايجار 〛* 
> *┤ 〚 .انهاء_العقد 〛* 
> *┤ 〚 .اخرج 〛*
> *┤ 〚 .الجروبات 〛* 
> *┤────────────···* 
> *┤ 〚 .ارفعني 〛*
> *┤ 〚 .هاك 〛*   
> *┤ 〚 .اسحبها 〛* 
> *┤ 〚 .نزلهم 〛* 
> *┤────────────···* 
> *┤ 〚 .بان 〛*
> *┤ 〚 .رفع-البان 〛* 
> *┤ 〚 .بانشات 〛* 
> *┤ 〚 .بانشات_فك 〛* 
> *┤ 〚 .المبندين 〛* 
> *┤ 〚 .بلوك 〛*
> *┤ 〚 .رفع-البلوك 〛*
> *┤ 〚 .البلوكات 〛*
> *┤ 〚 .حظر 〛*
> *┤ 〚 .الغاء-الحظر 〛*
> *┤ 〚 .الغاء-المنع 〛* 
> *┤ 〚 .المحظورين 〛*
> *┤────────────···* 
> *┤ 〚 .تشغيل 〛*
> *┤ 〚 .ريستارت 〛* 
> *┤ 〚 .ايقاف 〛*
> *┤ 〚 .رسترهم 〛* 
> *┤ 〚 .تحديث 〛* 
> *┤ 〚 .ريستارت 〛*
> *┤ 〚 .إعادة 〛* 
> *┤────────────···* 
> *┤ 〚 .تنظيف 〛* 
> *┤ 〚 .تنظيف2 〛* 
> *┤────────────···* 
> *┤ 〚 .ضيف_اكسبي 〛* 
> *┤ 〚 .ضيف_جواهر 〛*
> *┤ 〚 .ضيف-دولارات 〛*
> *┤────────────···*  
> *┤ 〚 .الامردا 〛* 
> *┤ 〚 .الملف-دا 〛* 
> *┤ 〚 .جيب 〛* 
> *┤ 〚 .بحوث 〛* 
> *┤ 〚 .باتش-اضاف 〛* 
> *┤ 〚 .باتش-حذف 〛* 
> *┤ 〚 .باتش-عرض 〛* 
> *┤ 〚 .باتش-تعديل 〛* 
> *┤ 〚 .باتش-الكل 〛* 
> *┤ 〚 .قاعده_بيانات 〛* 
> *┤ 〚 .حفظ-الصوره 〛*  
> *┤────────────···*
> *┤ 〚 .المستخدمين 〛* 
> *┤ 〚 .الان 〛*  
> *┤ 〚 .سبام 〛* 
> *┤ 〚 .خفي 〛* 
> *┤ 〚 .حطها_بروفايل 〛* 
> *┤ 〚 .ستوري 〛* 
> *╯────────────···*
*✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`.trim();

    // Send the message with the image
    const fkontak2 = {
      'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' },
      'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
      'participant': '0@s.whatsapp.net'
    };
    conn.sendMessage(m.chat, { image: buffer, caption: str, mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') }, { quoted: m.isGroup ? m : fkontak2 });

  } catch (e) {
    console.error('Error:', e.message);
    const datas = global;
    const idioma = datas.db.data.users[m.sender]?.language || 'default';
    
    // Load translation file
    const langFilePath = `./language/${idioma}.json`;
    const _translate = fs.existsSync(langFilePath) ? JSON.parse(fs.readFileSync(langFilePath)) : { texto1: ['حدث خطأ، حاول مرة أخرى لاحقًا'] };
    const tradutor = _translate.plugins?.menu_menu || { texto1: ['حدث خطأ، حاول مرة أخرى لاحقًا'] };

    // إرسال رسالة خطأ مع استخدام الحالة fakegif
    conn.reply(m.chat, tradutor.texto1[29] || 'حدث خطأ، حاول مرة أخرى لاحقًا', m, { quoted: fakegif });
  }
};

handler.command = /^(قائمتي)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;