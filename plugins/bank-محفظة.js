import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
//import db from '../lib/database.js'

const MAX_WARN = 5; // تحديد قيمة افتراضية لـ maxwarn

let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`

    let pp
    try {
        pp = await conn.profilePictureUrl(who, 'image')
    } catch (error) {
        console.error('Error fetching profile picture:', error)
        pp = './Menu3.png' // تحديث المسار هنا
    }

    let user = global.db.data.users[who]
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = user
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')

    let str = `
┏━──━✦⊱⋟🌩️⋞⊰✦━──━┓
*⤶❏ الاسم 👤:* ${username} ${registered ? '\n   • ' + name + ' ': ''}   
*⤶❏ المنشن 📧 : @${who.replace(/@.+/, '')}*
*⤶❏ الرقم ☎️ : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}*
*⤶❏ الرابط 🖇️ : wa.me/${who.split`@`[0]}${registered ? '\n⤶❏ *🎈العمر*: ' + age + ' years' : ''}*
*⤶❏ التحذيرات ⛔ : ${warn}/${MAX_WARN}*
*⤶❏ الجواهر 💎 : ${diamond}*
*⤶❏ المستوى 📊 : ${level}*
*⤶❏ الاكس بي 📈* : المجموع ${exp} (${user.exp - min} / ${xp})\n${math <= 0 ? `*${usedPrefix}levelup*` : `فاضل لك *${math}اكس بي للصعود الى لفل اخر*`}
*⤶❏ التصنيف 🧮 : ${role}*
*⤶❏ التسجيل 📄 : ${registered ? 'يب' : 'لا'}*
*⤶❏ بريميام 🌩️ : ${prem ? 'يب' : 'لا'}*
┗━──━✦⊱⋟🌩️⋞⊰✦━──━┛`

    try {
        console.log('Sending file and message...')
        await conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false, { mentions: [who] })
        m.react('✅') // استخدم رمز تعبيرية مؤكدة كبديل لـ done
    } catch (error) {
        console.error('Error sending file and message:', error)
        m.react('❌') // استخدم رمز تعبيرية خطأ
    }
}

handler.help = ['perfil']
handler.tags = ['group']
handler.command = ['profile', 'المحفظة']

export default handler