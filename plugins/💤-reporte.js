const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*طريقة التبليغ :*\n\n*مثال :*\n*${usedPrefix + command} رسالتك*`;
  if (text.length < 10) throw `*البلاغ لازم يكون فيه أكثر من ١٠ حروف!*`;
  if (text.length > 1000) throw `*الحد الأقصى للبلاغ ١٠٠٠ حرف!*`;
  const teks = `*❒ بلاغ جديد ❒*\n*≡ صاحب البلاغ :* ${m.sender.split`@`[0]}\n*≡ بلاغه:* *${text}*`;
  conn.reply('966551609722@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}});
  conn.reply('966553211410@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}});
  m.reply(`> *تم ارسال البلاغ*`);
};
handler.help = ['reporte', 'request'].map((v) => v + ' <teks>');
handler.tags = ['info'];
handler.command = /^(بلاغ|تبليغ|خطأ)$/i;
export default handler;
