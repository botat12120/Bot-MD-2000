const handler = async (m, {conn, participants, usedPrefix, command}) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*المرجوا من مؤسس المجموعة ارسال إحدى الاوامر التالية (#تفعيل الريس /#تعطيل الريس)*';
  const kicktext = `> اكتب الأمر و منشن حدا عشان اطرده`;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, {mentions: conn.parseMention(kicktext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  const owr = m.chat.split`-`[0];
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};
handler.command = /^(طرد|برا|اوت|ختفو)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
