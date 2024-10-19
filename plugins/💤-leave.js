const handler = async (m, {conn, text, command}) => {
  const id = text ? text : m.chat;
  await conn.reply(id, '> *bye bye, 🤫🧏🏻*');
  await conn.groupLeave(id);
};
handler.command = /^(غادري|ghayerha|غيريها|ghayriha)$/i;
handler.group = true;
handler.rowner = true;
export default handler;
