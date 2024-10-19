import fs from 'fs';

const handler = async (m, { conn, usedPrefix, text, isPrems }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  try {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.menu_menu;

    const imageUrls = {
      'es': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg',
      'pt-br': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg',
      'fr': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg',
      'en': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg',
      'ru': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg',
      'default': 'https://telegra.ph/file/72d83cb6c5c3ab72ba4f7.jpg'
    };

    const imageUrl = imageUrls[idioma] || imageUrls['default'];

    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const d = new Date(new Date().getTime() + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = datas.db.data.users[m.sender];
    const { money, joincount, name, diamond } = user;
    const { exp, limit, level, role } = user;
    const rtotalreg = Object.values(datas.db.data.users).filter(user => user.registered == true).length;
    const rtotal = Object.entries(datas.db.data.users).length || '0';
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
> *╮───[ الاوامــر الاسـلامـيـة]───✧*
> *┤ 〚 .الله 〛*
> *┤ 〚 .القران 〛*  
> *┤ 〚 .قران 〛*  
> *┤ 〚 .سوره 〛*
> *┤ 〚 .ايات 〛*  
> *┤ 〚 .حديث 〛*
> *┤ 〚 .احاديث 〛*  
> *┤ 〚 .اذكار الصباح 〛*  
> *┤ 〚 .اذكار المساء 〛*  
> *┤ 〚 .اذكار النوم 〛*  
> *╯────────────···*
*✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`.trim();

    const fkontak2 = {
      'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo' },
      'message': {
        'contactMessage': {
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      },
      'participant': '0@s.whatsapp.net'
    };

    conn.sendMessage(m.chat, { image: buffer, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') }, { quoted: m.isGroup ? m : fkontak2 });

  } catch (e) {
    console.error(e);
    const idioma = global.db.data.users[m.sender].language;
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.menu_menu;

    conn.reply(m.chat, tradutor.texto1[29], m);
  }
};

handler.command = /^(الاوامر-الدينية)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}