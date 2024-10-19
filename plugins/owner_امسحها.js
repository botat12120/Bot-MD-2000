 var handler = async (m, { conn }) => {

  // قائمة أرقام المطورين
  const developers = ['201225655220@s.whatsapp.net', '201016948771@s.whatsapp.net']; // ضع أرقام المطورين هنا

  if (!developers.includes(m.sender)) {
    throw `*⚠️ هذا الأمر خاص بالمطورين فقط*`;
  }

  if (!m.quoted) throw `*⚠️ قم بالرد على الرسالة التي تريد حذفها*`;

  try {
    let key = {};

    try {
      key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid;
      key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe;
      key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id;
      key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant;
    } catch (e) {
      console.error(e);
    }
    return conn.sendMessage(m.chat, { delete: key });
  } catch {
    return conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
  }
};

handler.help = ['delete'];
handler.tags = ['implementos'];
handler.command = /^احذفها|امسحها|امسحو|احذفو?$/i;
handler.group = false;
handler.admin = false; // الغاء التحقق من كونه أدمن
handler.botAdmin = false; // الغاء التحقق من كون البوت أدمن

export default handler;