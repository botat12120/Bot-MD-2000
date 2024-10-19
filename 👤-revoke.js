/* Creditos a https://github.com/ALBERTO9883 */

const handler = async (m, {conn}) => {
  const revoke = await conn.groupRevokeInvite(m.chat);
  await conn.reply(m.chat, `> *لقد تم تغيير رابط المجموعة بنجاح*\n- الرابط الجديد : ${'https://chat.whatsapp.com/' + revoke}`, m);
};
handler.command = ['رزت', 'تغيير'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
export default handler;
