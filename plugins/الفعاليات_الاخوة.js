let handler = async (m, { conn, command, text }) => {
let love = `*✨🫡 نسبه الاخوة 🫡 ✨*
*نسبة الاخوة ${text} عندك ✨🫡* *${Math.floor(Math.random() * 100)}%* *من 100%*
*كفو تنطح كفو !!*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(الاخوة)$/i
export default handler
