import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn }) => {
    // منع البوت من الرد على نفسه
    if (m.fromMe) return;

    // إذا لم يكن هناك sticker وكان المحادثة في مجموعة، قم بإلقاء استثناء
    if (!db.data.chats[m.chat].stickers && m.isGroup) throw 0;
 
    let nombre = '201225655220';
    let nombre2 = '201225655220';
 
    const s = [
        'https://telegra.ph/file/581e6160af36def7872da.png'
    ];  
 
    let stiker = await sticker(null, s[Math.floor(Math.random() * s.length)], nombre, nombre2);
    await delay(5 * 5000);
    
    // تعريف المتغير nn بالكلام "بوت"
    let nn = 'بوت';

    // استخدام المتغير nn داخل الكود
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: wm, body: `h`, mediaType: 2, sourceUrl: nn, thumbnail: imagen1 } } }, { quoted: m });
}

// يحدد الكود كيفية استجابة الروبوت على الرسائل التي تبدأ بكلمة يوهان
handler.customPrefix = /^يامطور|ياتربو|يامحمود$/i;
handler.command = new RegExp;
handler.exp = 50;
export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));