const items = ['limit', 'exp'];
let confirmation = {};

async function handler(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return m.reply('*⚠️ أنت تقوم بالتحويل*');
    let user = global.db.data.users[m.sender];
    const item = items.filter(v => v in user && typeof user[v] == 'number');
    let lol = `*⚠️ استخدام الأمر*
${usedPrefix + command}  [العنصر] [الكمية] [@المستخدم]

📝 مثال : ${usedPrefix + command} exp 65 @user

📍 العناصر القابلة للتحويل

💎 *حد* = الماس
✨ *اكسبي* = خبرة`.trim();
    const type = (args[0] || '').toLowerCase();
    if (!item.includes(type)) return m.reply(lol);
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
    if (!who) return m.reply('*⚠️ ضع منشن على المستخدم*');
    if (!(who in global.db.data.users)) return m.reply(`*⚠️ المستخدم ${who} ليس في قاعدة البيانات*`);
    if (user[type] * 1 < count) return m.reply(`*⚠️  ${type}  غير كافية للنقل*`);
    let confirm = `
هل أنت متأكد أنك تريد النقل *${count}* ${type} إلى *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ؟

يملك *60* ثانية

اكتب:(موافقة) لتأكيد الأمر
اكتب: (رفض) للإلغاء
`.trim();
    let c = 'TARBOO_BOT';
    await conn.sendButton(m.chat, confirm, c, null, [['موافقة', `${usedPrefix}موافقة`], ['رفض', `${usedPrefix}رفض`]], m, { mentions: [who] });
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        timeout: setTimeout(() => (m.reply('انتهى الوقت'), delete confirmation[m.sender]), 60 * 1000)
    };
}

handler.before = async m => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;
    let { timeout, sender, message, to, type, count } = confirmation[m.sender];
    if (m.id === message.id) return;
    let user = global.db.data.users[sender];
    let _user = global.db.data.users[to];
    if (m.text.toLowerCase() === 'no' || m.text.toLowerCase() === 'رفض') {
        clearTimeout(timeout);
        delete confirmation[sender];
        return m.reply('*تم الإلغاء*');
    }
    if (m.text.toLowerCase() === 'yes' || m.text.toLowerCase() === 'موافقة') {
        let previous = user[type] * 1;
        let _previous = _user[type] * 1;
        user[type] -= count * 1;
        _user[type] += count * 1;
        if (previous > user[type] * 1 && _previous < _user[type] * 1) {
            m.reply(`✅ نقل ناجح ل\n\n*${count}* *${type}* إلى @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to] });
        } else {
            user[type] = previous;
            _user[type] = _previous;
            m.reply(`حدث خطأ أثناء النقل *${count}* ${type} إلى *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] });
        }
        clearTimeout(timeout);
        delete confirmation[sender];
    }
};

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]');
handler.tags = ['rg'];
handler.command = ['payxp', 'تحويل', 'darxp'];

handler.disabled = false;

export default handler;

function isNumber(x) {
    return !isNaN(x);
}