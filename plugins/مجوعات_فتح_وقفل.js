// حقوق فلكس  //
let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    // إرسال الأزرار لاختيار قفل أو فتح
    await conn.sendButton(m.chat, 
      `❒ أخــتر من الأزرار:`, 
      ' > اسم البوت | 🐼❤️', 
      null, 
      [
        ['قفل المجموعة 🔒', `.قروب قفل`],
        ['فتح المجموعة 🔓', `.قروب فتح`]
      ], 
      m
    );
    return;
  }

  // تحديد حالة المجموعة بناءً على الاختيار
  let isClose = {
    'فتح': 'not_announcement',
    'قفل': 'announcement',
  }[(args[0] || '')];

  if (isClose === undefined) {
    throw `
*❒ أخــتر :*
*❒ .قروب قفل*
*❒ .قروب فتح*
`.trim();
  }

  // تحديث إعدادات المجموعة (فتح أو قفل)
  await conn.groupSettingUpdate(m.chat, isClose);

  // إرسال رسالة تأكيد بعد التنفيذ
  let captionn = isClose === 'announcement' ? '*تم قفل المجموعة!*' : '*تم فتح المجموعة!*';
  await conn.sendMessage(m.chat, { text: captionn });
}

handler.help = ['group *open/close*']
handler.tags = ['group']
handler.command = ['group', 'قروب'] 
handler.admin = true
handler.botAdmin = true

export default handler;
