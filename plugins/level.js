import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createCanvas, loadImage } from 'canvas'

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

    // زيادة المستوى بناءً على XP
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
            // إنشاء الرسم البياني للمستوى الجديد باستخدام صورة كخلفية
            const img = await generateLevelUpImage(name, user.level, user.exp, global.multiplier)
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

// دالة لإنشاء صورة المستوى باستخدام Canvas وخلفية معينة
async function generateLevelUpImage(name, level, exp, multiplier) {
    const { min, xp, max } = xpRange(level, multiplier)
    const progress = (exp - min) / xp * 100 // النسبة المئوية لتقدم XP
    
    const width = 800
    const height = 300
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // تحميل صورة الخلفية
    const backgroundImage = await loadImage('path/to/your/background/image.jpg') // ضع المسار الصحيح للصورة
    ctx.drawImage(backgroundImage, 0, 0, width, height) // رسم الصورة كخلفية

    // عنوان المستوى
    ctx.font = 'bold 36px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`🎉 تهانينا ${name}!`, 50, 50)
    ctx.fillText(`المستوى: ${level}`, 50, 100)

    // شريط التقدم
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(50, 150, 700, 30) // الإطار الخارجي لشريط التقدم

    ctx.fillStyle = '#7289DA' // لون التقدم
    ctx.fillRect(50, 150, (700 * progress) / 100, 30) // تقدم شريط المستوى

    // النص الذي يظهر نسبة التقدم
    ctx.font = 'bold 24px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`XP: ${exp - min}/${xp} (${Math.round(progress)}%)`, 50, 210)

    return canvas.toBuffer()
}

handler.help = ['levelup']
handler.tags = ['xp']

// الأوامر التي تستدعي الكود
handler.command = ['لفل', 'lvl', 'levelup', 'مستواي', 'مستوا'] 

export default handler
