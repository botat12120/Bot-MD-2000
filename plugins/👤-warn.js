const handler = async (m, {conn, text, command, usedPrefix}) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const pp = 'https://telegra.ph/file/4a5bf4e8bd372c3d0cd8f.png';
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ?
      m.mentionedJid[0] :
      m.quoted ?
      m.quoted.sender :
      text;
  } else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'مافي سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*❗ ┇ يرجى استعمال الأمر كما هو موضح اسفه :*\n\n*- مثال:*\n*${
    usedPrefix + command
  } @${global.suittag}*`;
  if (!who) {
    throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  }
  user.warn += 1;
  await m.reply(
      `${
      user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
      } تم اعطاء إنذار بنجاح !\n - السبب : ${sdms}\n*عدد الإنذارات ${
        user.warn
      }/3*`,
      null,
      {mentions: [who]},
  );
  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply(
          '*المرجوا من مؤسس المجموعة كتابة الأمر التالي (#تفعيل الريس) لإكمال*',
      );
    }
    user.warn = 0;
    await m.reply(
        `لقد وصل العضو للحد الأقصى للانذارات!!\n*@${
          who.split`@`[0]
        }* تتربى ثاني و نرجع 👽`,
        null,
        {mentions: [who]},
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
  return !1;
};

handler.command = /^(انذار|إنذار|تحذير|حدك)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
