const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply('*تمت ✨*');
  } else throw `*المرجوا وضع كلام لكي يتم كتابة في وداع عند خروج شخص ما:*`;
};
handler.help = ['وداع <نص>'];
handler.tags = ['group'];
handler.command = ['وداع'];
handler.admin = true;
export default handler;
