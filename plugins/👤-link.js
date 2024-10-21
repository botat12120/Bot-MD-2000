import fs from 'fs';
const handler = async (m, {conn, args}) => {
  const group = m.chat;
  conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group), m, {
    contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null,
      title: 'رابط المجموعة',
      body: 'Miku VX',
      previewType: 0, thumbnail: fs.readFileSync('./Menu2.jpg'),
      sourceUrl: `https://whatsapp.com/channel/0029VaUpcIqJuyA4hiyNYR1K`}}});
};
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^الرابط|رابط(gro?up)?$/i;
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
export default handler;
