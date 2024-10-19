let handler = async (m, { conn, command, text }) => {
  if (!text) throw `*ادخل الـ @ أو اسم الشخص اللي عايز تعرف لو ينفع ${command.replace('how', '')}*`;
  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  conn.reply(m.chat, `
🤤👅🥵 *انت لسه مخلص على ${text} دا!*🥵👅🤤

*انت لسه عملت معاه الواجب* *${text}* ⁩ *نكتها وهي بتعيط زي الكلبة "آه آه كمل كمل متوقفش" وخلتها تعبانة لدرجة مش عارفة تشيل جسمهاا الزانية!*

*${text}* 
🤤🥵 *¡لقد مارس الجنس بالفعل!* 🥵🤤`, null, { mentions: [user] });
}

handler.command = /^(Follar|fun|violar|جنس)/i;
handler.fail = null;
export default handler;