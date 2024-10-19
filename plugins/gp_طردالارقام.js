let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    if (!args[0]) return m.reply(`⚠️ يرجى إدخال رمز الدولة لاستخدام هذا الأمر.\nمثال: ${usedPrefix + command} 593`) 
    if (isNaN(args[0])) return m.reply(`⚠️ يرجى إدخال رمز الدولة الصحيح.\nمثال: ${usedPrefix + command} 593`) 

    let countryCode = args[0].replace(/[+]/g, '')
    let usersToRemove = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(countryCode)) 
    let bot = global.db.data.settings[conn.user.jid] || {}

    if (usersToRemove.length === 0) return m.reply(`⚠️ لا يوجد أي رقم في هذه المجموعة يبدأ بالرمز +${countryCode}.`)

    let userMentions = usersToRemove.map(v => '➥ @' + v.replace(/@.+/, ''))

    switch (command) {
        case "قائمة_الارقام": 
            conn.reply(m.chat, `⚠️ قائمة الأرقام التي تبدأ بالرمز +${countryCode} في المجموعة:\n\n` + userMentions.join('\n'), m, { mentions: usersToRemove })
            break   

        case "طرد_الارقام":  
            if (!isBotAdmin) return m.reply(`⚠️ يجب أن يكون البوت مشرفًا في المجموعة للقيام بهذا الإجراء.`)          

            conn.reply(m.chat, `⚠️ بدء عملية الطرد للأرقام التي تبدأ بالرمز +${countryCode}. سيتم الطرد الآن...`, m)            
            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'

            for (let user of usersToRemove) {
                let error = `@${user.split("@")[0]} قد تم طرده أو غادر المجموعة بالفعل.`    
                let isAdmin = participants.find(p => p.id === user)?.admin !== null

                if (user !== ownerGroup && user !== conn.user.jid && user !== global.owner + '@s.whatsapp.net' && !isSuperAdmin && isBotAdmin && !isAdmin) { 
                    let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
                    if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)})  
                } else if (isAdmin) {
                    m.reply(`⚠️ لا يمكن طرد المسؤولين من المجموعة.`)
                } else {
                    return m.reply(`⚠️ الإجراء محظور.`)
                }
            }
            break            
    }
}

handler.command = /^(قائمة_الارقام|طرد_الارقام)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler