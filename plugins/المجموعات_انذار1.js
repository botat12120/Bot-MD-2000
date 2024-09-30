const handler = async (m, {conn, text, command, usedPrefix}) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ?
      m.mentionedJid[0] :
      m.quoted ?
      m.quoted.sender :
      text;
  } else who = m.chat;

  if (!who) {
    const warntext = `*[❗] قم بالرد على رسالة أو منشن المستخدم*\n\n*—◉ مثال:*\n*${
      usedPrefix + command
    } @${global.suittag}*`;
    throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  }

  const user = global.db.data.users[who];
  if (!user) { // التحقق إذا كان المستخدم موجود في قاعدة البيانات
    return m.reply(`*[❗] المستخدم @${who.split`@`[0]} غير موجود في قاعدة البيانات*`, null, {
      mentions: [who]
    });
  }

  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'بدون سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');

  user.warn += 1;
  await m.reply(
      `${
      user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
      } لقد تلقيت تحذيرا في القروب!\nالسبب: ${sdms}\n*التحذيرات ${
        user.warn
      }/3*`,
      null,
      {mentions: [who]},
  );

  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply(
          '*[❗𝐈𝐍𝐅𝐎❗] المالك لم يفعل الطرد، فعّله ليتم الطرد*',
      );
    }
    user.warn = 0;
    await m.reply(
        `تم تحذيرك 3 مرات!\n*@${
          who.split`@`[0]
        }* لقد تجاوزت *3* تحذيرات، سيتم طردك ❗️`,
        null,
        {mentions: [who]},
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
  return !1;
};

handler.command = /^(advertir|advertencia|تحذير|انذار)$/i;
handler.group = true;
handler.admin = true;

export default handler;
