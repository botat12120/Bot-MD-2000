import Presence from '@whiskeysockets/baileys';
const handler = async (m, {conn, args, text}) => {
  if (!text) throw `*تمت ✨*`;
  try {
    const text = args.join` `;
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text);
    }
  } catch (e) {
    throw '> *لا تتجاوز الـ25 حرف او رقم في الاسم ❗*';
  }
};
handler.help = ['setname <text>'];
handler.tags = ['group'];
handler.command = /^(وضع-اسم)$/i;
handler.group = true;
handler.admin = true;
export default handler;
