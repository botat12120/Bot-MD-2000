const handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) return; // لو الرسالة من البوت نفسه، ما تعملش حاجة

  if (isAdmin) {
    m.reply('*[🔓] إنت أدمن يا معلم، مش محتاج ترقيات!*');
    return;
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    m.reply('*[✅] مبروك! بقيت أدمن في الجروب يا زعيم!*');
  } catch (e) {
    m.reply('*[❌] معلش، ماقدرتش أرفعك لأدمن. حاول تاني بعدين!*');
  }
};

handler.command = /^ترقيني|رفعني|أدمن$/i;
handler.rowner = true;
handler.group = true;
handler.premium = true; 
handler.botAdmin = true;

export default handler;