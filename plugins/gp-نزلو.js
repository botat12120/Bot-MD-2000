var handler = async (m, { conn, usedPrefix, command, text }) => {
    // تعريف الرسالة الوهمية
    var fake = {
        key: { 
            participant: "0@s.whatsapp.net", 
            remoteJid: "status@broadcast" 
        }, 
        message: { 
            conversation: "رسالة وهمية" 
        }
    }

    // التحقق من الإدخال إذا كان ليس رقمًا أو لا يحتوي على علامة @
    if (isNaN(text) && !text.match(/@/g)) {
        return conn.reply(m.chat, `🚫 *يجب أن يكون الإدخال رقم أو منشن*`, m, fake)
    }

    // إذا كان الإدخال هو منشن
    let number;
    if (isNaN(text)) {
        number = text.split`@`[1]
    } else {
        number = text
    }

    // التحقق من صحة الإدخال أو الاقتباس
    if (!text && !m.quoted) return conn.reply(m.chat, `🎌 *ضع منشن للمشرف الذي تريد تنزيليه*\n\nمثال, !خفض @منشن\n!خفض *الرد على رسالة*`, m, fake)

    // التحقق من طول الرقم المدخل
    if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `🚩 *رقم غير صحيح*`, m, fake)

    try {
        // تحديد المستخدم الذي سيتم تنزيله من المشرفين
        let user;
        if (text) {
            user = number + '@s.whatsapp.net'
        } else if (m.quoted && m.quoted.sender) {
            user = m.quoted.sender
        } else if (m.mentionedJid && m.mentionedJid.length) {
            user = m.mentionedJid[0]
        } 

        // تحديث المشاركين في المجموعة
        await conn.groupParticipantsUpdate(m.chat, [user], 'demote')

        // رسالة النجاح بعد التنزيل
        conn.reply(m.chat, `🚯 *تبآ لك كنت أدمن فاشل*`, m, fake)
        
    } catch (e) {
        // التعامل مع الأخطاء بدون توقف الكود
        conn.reply(m.chat, `❗ حدث خطأ أثناء محاولة تنزيل المشرف.`, m, fake)
    }
}

// إعدادات الأوامر
handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['نزلو', 'نزل', 'تنزيل']

// التأكد من تفعيل الأوامر فقط في المجموعات وللمشرفين
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler