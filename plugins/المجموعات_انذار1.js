let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw `✳️ يرجى الإشارة إلى شخص\n\n📌 مثال: ${usedPrefix + command} @مستخدم`
    
    // التأكد من وجود قاعدة البيانات والمستخدم
    if (!global.db || !global.db.data || !global.db.data.users) throw `✳️ قاعدة البيانات غير مهيأة بشكل صحيح`
    if (!(who in global.db.data.users)) throw `✳️ غير موجود في بياناتي`
    
    // التأكد من أن خاصية الإنذارات موجودة
    if (!global.db.data.users[who].warn) global.db.data.users[who].warn = 0;

    let name = conn.getName(m.sender)
    let warn = global.db.data.users[who].warn || 0;

    if (warn < war) {
        global.db.data.users[who].warn += 1
        console.log(`تحذير جديد: ${global.db.data.users[who].warn}`);
        
        m.reply(`
⚠️ *إنذار مستخدم* ⚠️

▢ *المشرف:* ${name}
▢ *المستخدم:* @${who.split`@`[0]}
▢ *الإنذارات:* ${warn + 1}/${war}
▢ *السبب:* ${text}`, null, { mentions: [who] }) 

        m.reply(`
⚠️ *تحذير* ⚠️
حصل على إنذار من مشرف

▢ *تحذير:* ${warn + 1}/${war} 
إذا كنت تعتقد أن الإنذار ظلم، كلم المشرف`, who)

    } else if (warn === war) {
        global.db.data.users[who].warn = 0
        m.reply(`⛔ المستخدم تجاوز عدد الإنذارات *${war}* سيتم إزالته`)
        await time(3000)
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
        m.reply(`♻️ تم إزالتك من المجموعة *${groupMetadata.subject}* لأنك تجاوزت عدد الإنذارات`, who)
    }
}

handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['إنذار'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
