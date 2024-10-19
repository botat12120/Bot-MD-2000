// Import database (assumed to be implemented elsewhere)
// import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner, participants, groupMetadata }) => {
    try {
        // Ensure that chat and database exist
        const chat = global.db?.data?.chats?.[m.chat];
        if (!chat) throw new Error('الداتا الخاصة بالجروب غير متوفرة! تحقق من قاعدة البيانات.');

        // If no text is provided, show the current welcome message
        if (!text) {
            if (chat.sWelcome) {
                return m.reply(`💬 *رسالة الترحيب الحالية*: \n\n${chat.sWelcome}`);
            } else {
                throw new Error('*❌ لا توجد رسالة ترحيب محددة لهذا الجروب حالياً!*');
            }
        }

        // Handle reset command
        if (text.toLowerCase() === 'reset') {
            chat.sWelcome = '*🎉 تم إعادة رسالة الترحيب إلى الإفتراضية!*';
            return m.reply('🔄 *تم إعادة تعيين رسالة الترحيب إلى الإفتراضية!*');
        }

        // Handle setting a temporary welcome message
        if (text.startsWith('temp:')) {
            const [_, tempMsg, duration] = text.split('|').map(str => str.trim());
            if (!tempMsg || !duration) throw new Error('❌ تنسيق الرسالة المؤقتة غير صحيح! استخدم temp:<message>|<minutes>');

            chat.sWelcome = tempMsg;
            m.reply(`🕑 *تم تعيين رسالة ترحيب مؤقتة لمدة ${duration} دقائق*`);

            setTimeout(() => {
                chat.sWelcome = '*🎉 تم انتهاء صلاحية رسالة الترحيب المؤقتة!*';
                conn.sendMessage(m.chat, '*🚨 رسالة الترحيب المؤقتة انتهت صلاحيتها!*', 'conversation');
            }, parseInt(duration) * 60 * 1000);
            return;
        }

        // Replace dynamic placeholders in the message
        const welcomeMessage = text
            .replace(/@user/g, `@${m.sender.split('@')[0]}`)
            .replace(/@admin/g, '@' + (participants.find(p => p.isAdmin)?.id || 'admin'))
            .replace(/@groupName/g, groupMetadata?.subject || 'الجروب')
            .replace(/@datetime/g, new Date().toLocaleString('ar-EG'));

        // Update the database with the new welcome message
        chat.sWelcome = welcomeMessage;

        // Notify the user that the welcome message has been updated
        m.reply(`✅ *تم تحديث رسالة الترحيب بنجاح!*\n\n🔔 **الرسالة الجديدة**:\n${welcomeMessage}`);

        // Optionally alert the entire group about the update (if needed)
        conn.sendMessage(m.chat, `📢 *تم تحديث رسالة الترحيب من قبل أحد المسؤولين!*`, 'conversation');

        // Log the changes (optional)
        console.log(`✏️ Welcome message updated for group ${groupMetadata?.subject || 'Unknown'}: ${welcomeMessage}`);
    } catch (err) {
        // Catch any errors and provide detailed information
        console.error('Error in setwelcome handler:', err);
        m.reply(`⚠️ *حدث خطأ أثناء محاولة تحديث رسالة الترحيب!*\n⛔ **تفاصيل الخطأ**:\n${err.message || 'خطأ غير معروف.'}`);
    }
};

// Add extra command information
handler.help = ['setwelcome <text>', 'setwelcome reset', 'setwelcome temp:<message>|<minutes>'];
handler.tags = ['group'];
handler.command = ['الترحيب', 'تغيرالترحيب', 'تغير-الترحيب', 'عرضالترحيب'];

// Set necessary permissions
handler.admin = true;
handler.owner = false;
handler.group = true;

export default handler;