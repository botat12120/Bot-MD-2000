
let handler = async (m, { conn, groupMetadata }) => {
  let users = global.db.data.users // جلب جميع المستخدمين من قاعدة البيانات
  let warningList = []
  
  for (let jid in users) {
    if (!(jid in users)) { // التحقق إذا كان المستخدم موجود في قاعدة البيانات
      m.reply(`✳️ المستخدم مع معرف ${jid} غير موجود في قاعدة البيانات.`)
      return // الخروج من الدالة إذا كان المستخدم غير موجود
    }
    
    if (users[jid].warn > 0) { // التحقق إذا كان لدى المستخدم إنذارات
      let mention = '@' + jid.split('@')[0] // إنشاء منشن باستخدام JID
      let reason = users[jid].warnReason || 'لا يوجد سبب' // جلب السبب إذا كان موجودًا، أو إظهار "لا يوجد سبب"
      warningList.push(`> *المنشن :* ${mention} \n> *الإنذارات :* ${users[jid].warn}\n> *السبب :* ${reason}\n`)
    }
  }
  
  if (warningList.length === 0) {
    m.reply('✳️ لا يوجد أي إنذارات مسجلة.')
  } else {
    m.reply(`*قائمة الإنذارات:*\n\n${warningList.join('\n')}`, null, {
      mentions: Object.keys(users).filter(jid => users[jid].warn > 0) // إضافة المنشنات إلى الرسالة
    })
  }
}

handler.help = ['warnlist']
handler.tags = ['group']
handler.command = ['الانذارات', 'warnlist'] // الأمر الذي يقوم بعرض القائمة
handler.group = true

export default handler
