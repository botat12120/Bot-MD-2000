const handler = async (m, { conn, usedPrefix, text }) => {
  let numbers = [];
  let users = [];

  // التحقق من وجود إدخال سواء نص أو رد على رسالة
  if (!text && !m.quoted) {
    return conn.reply(m.chat, `> *╮┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*\n> *┊[❗] الاستخدام الصحيح*\n> *┊${usedPrefix}رفع مشرف @منشن*\n> *┊${usedPrefix}رفع مشرف -> الرد على الرسالة*\n> *╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*`, m);
  }

  // تقسيم النص في حال وجود أكثر من مستخدم
  if (text) {
    numbers = text.split(',').map(num => num.trim());
  }

  if (m.quoted) {
    numbers.push(m.quoted.sender.split('@')[0]);
  }

  // التحقق من صحة كل رقم أو معرف
  for (let number of numbers) {
    if (isNaN(number) && !number.match(/@/g)) {
      return conn.reply(m.chat, `> *[ ⚠️ ] يرجى إدخال رقم صحيح أو منشن صحيح*`, m);
    }
    
    if (isNaN(number)) {
      number = number.split`@`[1];
    }

    if (number.length > 13 || number.length < 11) {
      return conn.reply(m.chat, `> *[ ⚠️ ] الرقم ${number} غير صحيح، الرجاء إدخال رقم صحيح.*`, m);
    }
    
    users.push(number + '@s.whatsapp.net');
  }

  try {
    for (let user of users) {
      // التحقق إذا كان المستخدم بالفعل مشرف
      const groupMetadata = await conn.groupMetadata(m.chat);
      const isAlreadyAdmin = groupMetadata.participants.find(participant => participant.id === user && participant.isAdmin);

      if (isAlreadyAdmin) {
        conn.reply(m.chat, `> *[ ℹ️ ] المستخدم ${user.split('@')[0]} هو بالفعل مشرف.*`, m);
      } else {
        // ترقية المستخدم
        await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
        conn.reply(m.chat, `*[ ✅ ] تم ترقية المستخدم ${user.split('@')[0]} إلى مشرف بنجاح! 🎉*\n\n📅 *التاريخ والوقت:* ${new Date().toLocaleString('ar-EG')}`, m);
      }
    }
  } catch (e) {
    // في حالة حدوث خطأ
    conn.reply(m.chat, `*> [ ❗️ ] عذراً، حدث خطأ أثناء محاولة الترقية. الرجاء المحاولة لاحقاً.*`, m);
  }
};

// إعداد الأوامر
handler.help = ['*201225655×××*', '*@اسم المستخدم*', '*محادثة المستجيب*'].map((v) => 'promote ' + v);
handler.tags = ['group'];
handler.command = /^(ترقية|ترقيه|رفع|ارفعو|رول)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;