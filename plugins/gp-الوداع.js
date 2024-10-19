// Import database (assumed to be implemented elsewhere)
// import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner, participants, groupMetadata }) => {
    try {
        // Ensure that chat and database exist
        const chat = global.db?.data?.chats?.[m.chat];
        if (!chat) throw new Error('الداتا الخاصة بالجروب غير متوفرة! تحقق من قاعدة البيانات.');

        // If no text is provided, show the current farewell message
        if (!text) {
            if (chat.sBye) {
                return m.reply(`💬 *رسالة الوداع الحالية*: \n\n${chat.sBye}`);
            } else {
                throw new Error('*❌ لا توجد رسالة وداع محددة لهذا الجروب حالياً!*');
            }
        }

        // Handle reset command
        if (text.toLowerCase() === 'reset') {
            chat.sBye = '*👋 تم إعادة رسالة الوداع إلى الإفتراضية!*';
            return m.reply('🔄 *تم إعادة تعيين رسالة الوداع إلى الإفتراضية!*');
        }

        // Handle setting a temporary farewell message
        if (text.startsWith('temp:')) {
            const [_, tempMsg, duration] = text.split('|').map(str => str.trim());
            if (!tempMsg || !duration) throw new Error('❌ تنسيق الرسالة المؤقتة غير صحيح! استخدم temp:<message>|<minutes>');

            chat.sBye = tempMsg;
            m.reply(`🕑 *تم تعيين رسالة وداع مؤقتة لمدة ${duration} دقائق*`);

            setTimeout(() => {
                chat.sBye = '*👋 تم انتهاء صلاحية رسالة الوداع المؤقتة!*';
                conn.sendMessage(m.chat, '*🚨 رسالة الوداع المؤقتة انتهت صلاحيتها!*', 'conversation');
            }, parseInt(duration) * 60 * 1000);
            return;
        }

        // Replace dynamic placeholders in the message
        const farewellMessage = text
            .replace(/@user/g, `@${m.sender.split('@')[0]}`)
            .replace(/@admin/g, '@' + (participants.find(p => p.isAdmin)?.id || 'admin'))
            .replace(/@groupName/g, groupMetadata?.subject || 'الجروب')
            .replace(/@datetime/g, new Date().toLocaleString('ar-EG'));

        // Update the database with the new farewell message
        chat.sBye = farewellMessage;

        // Notify the user that the farewell message has been updated
        m.reply(`✅ *تم تحديث رسالة الوداع بنجاح!*\n\n🔔 **الرسالة الجديدة**:\n${farewellMessage}`);

        // Optionally alert the entire group about the update (if needed)
        conn.sendMessage(m.chat, `📢 *تم تحديث رسالة الوداع من قبل أحد المسؤولين!*`, 'conversation');

        // Log the changes (optional)
        console.log(`✏️ Farewell message updated for group ${groupMetadata?.subject || 'Unknown'}: ${farewellMessage}`);
    } catch (err) {
        // Catch any errors and provide detailed information
        console.error('Error in setbye handler:', err);
        m.reply(`⚠️ *حدث خطأ أثناء محاولة تحديث رسالة الوداع!*\n⛔ **تفاصيل الخطأ**:\n${err.message || 'خطأ غير معروف.'}`);
    }
};

// Add extra command information
handler.help = ['setbye <text>', 'setbye reset', 'setbye temp:<message>|<minutes>'];
handler.tags = ['group'];
handler.command = ['المغادره', 'تغيرالوداع', 'تغير-الوداع', 'الوداع', 'عرضالوداع'];

// Set necessary permissions
handler.admin = true;
handler.owner = false;
handler.group = true;

export default handler;