let handler = async (m, { conn, args }) => {
    if (!args.length) {
        return m.reply('*يرجى إدخال الوصف الجديد لتحديثه. مثال: .تغير-الوصف الوصف الجديد هنا. ✍️*');
    }

    try {
        const newDesc = args.join(" ");
        await conn.groupUpdateDescription(m.chat, newDesc);
        m.reply(`*✅ تم تحديث الوصف بنجاح! الوصف الجديد هو: "${newDesc}". شكرًا لتعاونك!*`);
    } catch (e) {
        m.reply('*❌ عذرًا، حدثت مشكلة أثناء محاولة تغيير الوصف. يرجى المحاولة مرة أخرى لاحقًا.*');
    }
}

handler.help = ['Setdesc <text>']
handler.tags = ['group']
handler.command = /^تغيرالوصف|تغيرالبايو|تغير-البايو|تغير-الوصف$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler