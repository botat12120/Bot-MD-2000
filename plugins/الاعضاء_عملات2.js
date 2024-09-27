const handler = async (m, {usedPrefix}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  const name = conn.getName(who);
  m.reply(`
┓━━⊰ _🪙قائمه عملاتك🪙_ ⊱━━⊰
┣⊱⧪⟫ الاسـم : ${name}
┣⊱⧪⟫ عـمـلاتـك : ${global.db.data.users[who].limit}
┛━━━━━━⊰🪙🪙🪙⊱━━━━━⊰ـ
`);
};
handler.help = ['ami'];
handler.tags = ['xp'];
handler.command = ['عملاتي'];
export default handler;
