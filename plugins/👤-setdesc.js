const handler = async (m, {conn, args}) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`);
  m.reply('> *تم تغيير وصف المجموعة بنجاح ✅*');
};
handler.help = ['وضع-وصف <نص>'];
handler.tags = ['group'];
handler.command = /^وضع-وصف|وضع-الوصف$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
