let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = false
m.reply('*ابسط ي عم البان اتفك ليكم اهو قولو شكرا بقا لعمو التربو 😂♥*')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^رفع-بانشات|الغاء-الحظر|unbanchat|رفع-الحظر$/i
handler.rowner = true
export default handler