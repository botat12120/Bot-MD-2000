import fetch from 'node-fetch';
import fs from 'fs';

// Function to convert milliseconds to a readable time string
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

const handler = async (m, { conn, usedPrefix, __dirname, isPrems }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;

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
      'es': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg',
      'pt-br': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg',
      'fr': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg',
      'en': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg',
      'ru': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg',
      'default': 'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg'
    };
    const imageUrl = imageUrls[idioma] || imageUrls['default'];

    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.buffer();

    // User data
    const d = new Date(new Date().getTime() + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = datas.db.data.users[m.sender];
    const { money = 0, joincount = 0, exp = 0, limit = 0, level = 0, role = 'غير محدد', diamond = 0 } = user || {};
    const rtotalreg = Object.values(datas.db.data.users).filter(user => user.registered == true).length;
    const rtotal = Object.entries(datas.db.data.users).length || '0';
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    
    const str = `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
*🐉✬⃝╿↵ مرحبا يا ➻${taguser}
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
> *✧────[الـﻤـسـتـخـدم]────╮*
> *┤ 🔃 المستوي: ${level}*
> *┤ 🏆 *الـرتبة: ${role}*
> *┤ 🎮 *الخبـرة: ${exp}* 
> *┤ 💎 *الألـماس: ${diamond}* 
> *┤ 🪙 *تربو كوينز: ${money}*
> *┤ 🎟️ *الرموز: ${joincount}*
> *┤ 🌟 *الـبـرﯾـمـيـوم: ${user.premiumTime > 0 ? 'مـمـيز✅' : (isPrems ? 'مـمـيز ✅' : 'عـادي ❌') || ''}* 
> *╯────────────···* 
> *╮───[ اوامـر الــذکـاء]───✧*
> *┤ 〚 .بوت 〛*
> *┤ 〚 .تربو 〛*
> *┤ 〚 .شات 〛*  
> *┤ 〚 .بلاك 〛*
> *┤ 〚 .سمسم 〛*  
> *┤ 〚 .تخيل 〛* 
> *┤ 〚 .ارسم 〛*  
> *┤ 〚 .احسب 〛* 
> *┤ 〚 .عمري 〛*
> *╯────────────···*
*✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢* `.trim();

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

    conn.reply(m.chat, tradutor.texto1[29] || 'حدث خطأ، حاول مرة أخرى لاحقًا', m);
  }
};

handler.command = /^(اوامر-الذكاء)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;