let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata,const handler = async (m, {conn, text, command, usedPrefix}) => {
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
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'بدون سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*[❗] قم بالرد علي الرساله او منشن المستخدم مع ذكر السبب*\n\n*—◉ مثال:*\n*${
    usedPrefix + command
  } @${global.suittag}*`;
  if (!who) {
    throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  }
  user.warn += 1;
  await m.reply(
      `${
      user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
      }تلقي انذار في هذه المجموعه!\n السبب: ${sdms}\n*الانذارات ${
        user.warn
      }/3*`,
      null,
      {mentions: [who]},
  );
  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply(
          '*[❗معاومه❗] مالك البوت لم يقم بتفعيلهج كلمه عشان يفهلها*',
      );
    }
    user.warn = 0;
    await m.reply(
        `لقد حذرتك عده مرات!!\n*@${
          who.split`@`[0]
        }*لقد تجاوزت 3 انذارات*, الان سيتم رمي النعال براسك/اا 👽`,
        null,
        {mentions: [who]},
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'ازاله');
  }
  return !1;
};

handler.command = /^(advertir|advertencia|warn|انذار)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
