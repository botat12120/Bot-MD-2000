let handler = async (m, {conn, text}) => {
  if (!text) throw "*🚨 اعمل منشن للمستخدم*"
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw "*🚨 اعمل منشن للمستخدم*"
  let users = global.db.data.users
  users[who].banned = false
  conn.reply(m.chat, `*⏤͟͟͞͞🚨 تم الغاء حظر هذا المستخدم بنجاح*`, m)}
handler.help = ["unbanuser"]
handler.tags = ["owner"]
handler.command = /^بان_فك$/i
handler.rowner = true
export default handler
