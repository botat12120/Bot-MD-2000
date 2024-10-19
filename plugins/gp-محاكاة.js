let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
if (!event) return await m.reply(`${mid.smsMalused7}

${usedPrefix + command} الترحيب @user
${usedPrefix + command} الوداع @user
${usedPrefix + command} الترقية @user
${usedPrefix + command} التنزيل @user`) 

let mentions = text.replace(event, '').trimStart()
let who = mentions ? conn.parseMention(mentions) : []
let part = who.length ? who : [m.sender]
let act = false
m.reply(`*جاري محاكاة ${event}...*`)
switch (event.toLowerCase()) {
case 'إضافة':
case 'دعوة':
case 'الترحيب':
case 'bienvenida':       
act = 'add'
break
case 'الوداع':
case 'طرد':
case 'مغادرة':
case 'إزالة':
case 'sacar':
act = 'remove'
break
case 'الترقية':
case 'إعطاءصلاحية':
case 'إعطاءقوة':
act = 'promote'
break
case 'التنزيل':
case 'سحبصلاحية':
case 'سحبقوة':
act = 'demote'
break
default:
throw 'خطأ، يرجى إدخال خيار صالح'
}
if (act) return conn.participantsUpdate({
id: m.chat,
participants: part,
action: act
})}
handler.help = ['محاكاة <الحدث> [@ذكر]','simular <الحدث>'] 
handler.tags = ['المالك']
handler.command = /^محاكاة|simular$/i
handler.group = true
export default handler