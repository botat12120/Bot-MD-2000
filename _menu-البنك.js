import fetch from 'node-fetch';
import fs from 'fs';

// Para configurar o idioma, na raiz do projeto altere o arquivo config.json
// Para configurar el idioma, en la raíz del proyecto, modifique el archivo config.json.
// To set the language, in the root of the project, modify the config.json file.

const handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.menu_menu;

    // URLs for different languages
    const imageUrls = {
      'es': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg',
      'pt-br': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg',
      'fr': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg',
      'en': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg',
      'ru': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg',
      'default': 'https://telegra.ph/file/744bc3124eaa81176347a.jpg'
    };

    // Get the appropriate image URL based on the language
    const imageUrl = imageUrls[idioma] || imageUrls['default'];

    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const d = new Date(new Date() + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const { money, joincount } = global.db.data.users[m.sender];
    const { exp, limit, level, role } = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
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
> *╮───[ اوامــر الــبــنــك]───✧*
> *┤ 〚 .البنك 〛*
> *┤ 〚 .ايداع 〛*
> *┤ 〚 .سحب 〛*  
> *┤ 〚 .تحويل 〛*
> *╯────────────···* 
> *╮────────────···*    
> *┤ 〚 .اهداء 〛*  
> *┤ 〚 .عمل 〛*  
> *┤ 〚 .راتب 〛*  
> *┤ 〚 .عملات 〛*  
> *┤ 〚 .عملاتي 〛*  
> *┤ 〚 .تعدين 〛*  
> *┤ 〚 .تعدين2 〛*
> *┤ 〚 .هجوم 〛*  
> *┤ 〚 .صندوق 〛*  
> *┤ 〚 .يومي 〛* 
> *┤ 〚 .اسبوعي 〛*
> *╯────────────···* 
> *╮────────────···*    
> *┤ 〚 .المحفظة 〛*  
> *┤ 〚 .الرتبة 〛* 
> *┤ 〚 .المتصدرين 〛*   
> *╯────────────···* 
> *╮────────────···*    
> *┤ 〚 .تسوق 〛*  
> *┤ 〚 .شراء 〛* 
> *┤ 〚 .شراء-الماس 〛*  
> *┤ 〚 .شراء_الدجاج 〛*  
> *┤ 〚 .لجواهر 〛*
> *╯────────────···*
*✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢* `.trim();

    if (m.isGroup) {
      const fkontak2 = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
      conn.sendMessage(m.chat, { image: buffer, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') }, { quoted: m });
    } else {
      const fkontak2 = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
      conn.sendMessage(m.chat, { image: buffer, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') }, { quoted: fkontak2 });
    }
  } catch (e) {
    console.error(e);
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.menu_menu;

    conn.reply(m.chat, tradutor.texto1[29], m);
  }
};

handler.command = /^(اوامر-البنك)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
