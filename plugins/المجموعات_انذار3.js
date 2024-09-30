let handler = async (m, { conn, groupMetadata }) => {
  let users = global.db.data.users // جلب جميع المستخدمين من قاعدة البيانات
  let warningList = []
  
  for (let jid in users) {
    if (users[jid].warn > 0) { // التحقق إذا كان المستخدم لديه إنذارات
      let name = conn.getName(jid) || 'Unknown' // جلب الاسم أو استخدام 'Unknown' في حالة عدم وجوده
      warningList.push(`▢ *الاسم:* ${name} \n▢ *الإنذارات:* ${users[jid].warn}\n`)
    }
  }
  
  if (warningList.length === 0) {
    m.reply('✳️ لا يوجد أي إنذارات مسجلة.')
  } else {
    m.reply(`*قائمة الإنذارات:*\n\n${warningList.join('\n')}`)
  }
}

handler.help = ['warnlist']
handler.tags = ['group']
handler.command = ['الانذارات', 'warnlist'] // الأمر الذي يقوم بعرض القائمة
handler.group = true

export default handler
