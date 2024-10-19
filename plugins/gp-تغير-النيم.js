// استخدام Presence من المكتبة
let Presence = (await import(global.baileys)).default

// تعريف handler
let handler = async (m, { conn, args, text }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg'
    
    // التحقق من وجود النص
    if (!text) return conn.reply(m.chat, lenguajeGB['smsNam2'](), fkontak, m)

    try {
        // استخدام النص القادم من المدخلات (args)
        let newName = args.join(' ')
        
        if (!args || !args[0]) {
            // لا يحدث شيء إذا لم يكن هناك اسم جديد
        } else {
            // تحديث اسم المجموعة
            await conn.groupUpdateSubject(m.chat, newName)
        }

        // إرسال رسالة تأكيد تغيير الاسم
        conn.reply(m.chat, lenguajeGB.smsNam1(), fkontak, m)

    } catch (e) {
        // التعامل مع الخطأ
        throw lenguajeGB['smsNam3']()
    }
}

// إعداد الأوامر الخاصة بالهاندلر
handler.command = /^(setname|newnombre|nuevonombre|تغير-الاسم|تغيرالنيم|تغير-النيم|الاسم|تغيرالاسم)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler