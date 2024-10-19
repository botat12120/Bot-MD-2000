import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

let texto = `*فين الرساله الي عايزني امسحها*`
	
if (!m.quoted) return await conn.reply(m.chat, texto, m)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
 } catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^(حذف|del(ete)?)$/i

handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
