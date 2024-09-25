import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    // التحقق من إمكانية رفع المستوى
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
┌───⊷ *المستوي*
▢ الاسم : *${name}*
▢ المستوي : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
└──────────────

انت تحتاج الي *${max - user.exp}* *XP* لرفع مستواك
`.trim()
    }

    let before = user.level * 1

    // زيادة المستوى حتى الوصول إلى الحد الأعلى بناءً على XP
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

    if (before !== user.level) {
        let teks = `🎊 مبروك لدخواك المستوى الجديد ${name}! المستوي:`
        let str = `
┌─⊷ *المستوي*
▢ المستوي السابق : *${before}*
▢ المستوي الحالي : *${user.level}*
└──────────────

*_كلما تفاعلت مع البوت ارتفع مستواك_*
`.trim()

        try {
            // إنشاء صورة المستوى الجديد باستخدام canvas
            const img = await levelup(teks, user.level)
            // إرسال الصورة مع النص التوضيحي
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            // في حالة وجود خطأ أثناء توليد الصورة، إرسال النص فقط
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['xp']

// الأوامر التي يمكن أن تستدعي هذا المعالج
handler.command = ['لفل', 'lvl', 'levelup', 'مستواي', 'مستوا']

export default handler
