import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    // التحقق من إمكانية رفع المستوى
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
┌───⊷ *المستوي*
▢ الاسم : *${name}*
▢ المستوي الحالي : *${user.level}*
▢ نقاط XP الحالية : *${user.exp}*
▢ نقاط XP اللازمة للوصول إلى المستوى التالي : *${max - user.exp} XP*
▢ مجموع نقاط XP المطلوبة للمستوى التالي : *${xp} XP*
└──────────────

انت تحتاج إلى *${max - user.exp} XP* لرفع مستواك.
`.trim()
    }

    let before = user.level * 1

    // زيادة المستوى حتى الوصول إلى الحد الأعلى بناءً على XP
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

    if (before !== user.level) {
        let teks = `🎊 مبروك لدخولك المستوى الجديد ${name}! المستوى:`
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let progressPercentage = ((user.exp - min) / xp) * 100 // نسبة التقدم

        // تحميل قالب الصورة
        let imgPath = '/mnt/data/E9833673-03D6-4A48-9A76-C8E967D5E801.webp' // مسار الخلفية التي تم رفعها
        const template = await loadImage(imgPath)
        
        // إعداد canvas
        const canvas = createCanvas(template.width, template.height)
        const ctx = canvas.getContext('2d')
        
        // رسم الصورة
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height)

        // إعداد النصوص
        ctx.font = 'bold 35px Arial'
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        
        // كتابة مستوى المستخدم
        ctx.fillText(`Level: ${user.level}`, canvas.width / 2, 50)
        
        // كتابة نقاط XP الحالية والمتبقية
        ctx.fillText(`XP: ${user.exp} / ${xp}`, canvas.width / 2, 100)
        ctx.fillText(`Remaining XP: ${max - user.exp}`, canvas.width / 2, 150)

        // رسم شريط التقدم
        ctx.fillStyle = '#00FF00' // اللون الأخضر للتقدم
        ctx.fillRect(100, 300, (canvas.width - 200) * (progressPercentage / 100), 50)

        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 5
        ctx.strokeRect(100, 300, canvas.width - 200, 50) // الحدود الخارجية لشريط التقدم

        // حفظ الصورة
        const buffer = canvas.toBuffer()
        fs.writeFileSync('/tmp/levelup.jpg', buffer)

        let str = `
┌─⊷ *المستوي*
▢ المستوي السابق : *${before}*
▢ المستوي الحالي : *${user.level}*
▢ نقاط XP الحالية : *${user.exp}*
▢ نقاط XP اللازمة للوصول إلى المستوى التالي : *${max - user.exp} XP*
└──────────────

✨ استمر في التفاعل مع البوت لرفع مستواك أكثر! ✨
`.trim()

        try {
            // إرسال الصورة المعدلة مع النص
            conn.sendFile(m.chat, '/tmp/levelup.jpg', 'levelup.jpg', str, m)
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
