const handler = async (m, {conn, text, isROwner, isOwner}) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply('> *تمت 🩵*');
  } else throw `*اكتب الأمر و جنبه الترحيب (اذا تبي تمنشن العضو الجديد حط @user اذا تبي بايو القروب ينرسل مع ترحيب حط @desc)*\n\n> مثال : *#ترحيب اهلا بـ@user المرجوا قرائة الوصف التالي : @desc*`;
};
handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['ترحيب','الترحيب'];
handler.admin = true;
export default handler;