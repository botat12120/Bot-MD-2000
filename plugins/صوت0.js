let handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {
    // التحقق مما إذا كانت الرسالة مرسلة من البوت
    if (m.key.fromMe) {
        return; // إيقاف التنفيذ إذا كانت الرسالة مرسلة من البوت
    }

    const vn = './media/خدت_الصدمة.mp3';
    conn.sendPresenceUpdate('recording', m.chat);
    conn.sendMessage(m.chat, {audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: `خدت_الصدمة.mp3`}, {quoted: m});
};

// دي كلمات المساعدة والأوسمة الخاصة بالأمر
handler.help = ['notification'];
handler.tags = ['notification'];

// دي الكلمات اللي الكود هيتفاعل معاها
handler.customPrefix = /ايه ده|إنت بتهزر|لا يا راجل|معقول|بجد|🙂🙂/i;
handler.command = new RegExp;

export default handler;