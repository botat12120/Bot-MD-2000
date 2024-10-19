const handler = async (m, {conn, text, command, usedPrefix}) => {
  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const warntext = `*المرجوا كتابة الأمر بشكل صحيح*\n\n*- مثال :*\n*${usedPrefix + command} @${global.suittag}*`;
  if (!who) throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  if (user.warn == 0) throw '*المستخدم بالفعل لديه 0 إنذار ❗*';
  user.warn -= 1;
  await m.reply(`${user.warn == 1 ? `*@${who.split`@`[0]}*` : `♻️ *@${who.split`@`[0]}*`} لقد تم تصفير عدد انذاراته \n*رجع الان لـ ${user.warn}/3*`, null, {mentions: [who]});
};
handler.command = /^(عفو|العفو|إزالة-انذار)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
