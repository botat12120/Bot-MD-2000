let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw '✳️ *منشن شخص ما*\n\n📌 مثال: .ريموف @user'
    if (!global.owner.includes(who.split('@')[0])) throw 'هذا الشخص مش مستخدم بريميام!'
    
    // حذف المستخدم من قائمة المميزين
    global.owner = global.owner.filter(owner => owner[0] !== who.split('@')[0])

    const caption = `
    *❌ تم إلغاء البريميام*

*@${who.split`@`[0]} لم تعد مستخدم بريميام !!*
┌───────────
▢ *╏ المنشن:* @${who.split`@`[0]}
└───────────
`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['removeowner']
handler.tags = ['owner']
handler.command = /^(removeowner|ريموف|الغاء)$/i
handler.owner = true

export default handler