let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `✳️ قم بالأشارة الى شخص\n\n📌 مثال : ${usedPrefix + command} @مستخدم`
        if (!(who in global.db.data.users)) throw `✳️ غير موجود في بياناتيe`
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`
⚠️ *انذار مستخدم* ⚠️

▢ *المشرف:* ${name}
▢ *المستخدم:* @${who.split`@`[0]}
▢ *انذارات:* ${warn + 1}/${war}
▢ *السبب:* ${text}`, null, { mentions: [who] }) 
            m.reply(`
⚠️ *تحذير* ⚠️
حصل على انذار من مشرف

▢ *تحذير:* ${warn + 1}/${war} 
اذا كنت تعتقد *${war}* ان الانذار ظلم كلم المشرف`, who)
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`⛔ المستخدم تجاوز عدد الانذاراتe *${war}* سيتم ازالته`)
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
            m.reply(`♻️ تم ازالتك من المجموعة *${groupMetadata.subject}* لانك تجاوزت عدد الانذارات`, who)
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['انذار'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
