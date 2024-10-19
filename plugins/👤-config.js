let handler = async (m, { conn, args, usedPrefix, command }) => {
let isClose = { // Switch Case Like :v
'فتح': 'not_announcement',
'قفل': 'announcement',
'تشغيل': 'not_announcement',
'دمار': 'announcement',
'سماح': 'not_announcement',
'رفض': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
throw `
> *تتبع المثال !!*

*- ${usedPrefix + command} فتح*
*- ${usedPrefix + command} قفل*
`.trim()
await conn.groupSettingUpdate(m.chat, isClose)
{m.reply('> *تم يا كابتن*')}
}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(المجموعة|القروب)$/i
handler.admin = true
handler.botAdmin = true
export default handler
