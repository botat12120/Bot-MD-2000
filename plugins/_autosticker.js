import {sticker} from '../lib/sticker.js';

// دالة لمعالجة الرسائل
const handler = (m) => m;

// هنا بنضيف دالة للتعامل مع كل الرسائل
handler.all = async function(m) {
  // بنجيب بيانات الشات واليوزر
  const chat = db.data.chats[m.chat];
  const user = db.data.users[m.sender];

  // لو تحويل الاستيكرات مفاعل في الشات وكان في مجموعة
  if (chat.autosticker && m.isGroup) {
    const q = m;
    let stiker = false;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    // لو النوع مش صورة أو فيديو، نرجع
    if (/webp/g.test(mime)) return;

    // لو كان نوع الملف صورة
    if (/image/g.test(mime)) {
      const img = await q.download?.();
      if (!img) return;
      stiker = await sticker(img, false, packname, author);
    }
    // لو كان نوع الملف فيديو
    else if (/video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return await m.reply(`*⚠️ الفيديو لازم يكون طوله أقل من 8 ثواني*`);
      const img = await q.download();
      if (!img) return;
      stiker = await sticker(img, false, packname, author);
    }
    // لو كانت الرسالة نص فيها رابط
    else if (m.text.split(/\n| /i)[0]) {
      if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], packname, author);
      else return;
    }

    // لو اتعمل استيكر، نبعت الاستيكر في الشات
    if (stiker) {
      await conn.sendFile(m.chat, stiker, null, null, fake, {asSticker: true});
    }
  }
  return !0;
};

// دالة بتشيك إذا كان النص رابط
const isUrl = (text) => {
  return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'));
};