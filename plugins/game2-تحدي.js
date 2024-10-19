const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;

const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) 
    throw '*[❗] خلص الجيم اللي إنت شغال فيه الأول قبل ما تبدأ واحد جديد*';

  const textquien = `*اعمل منشن للاعب اللي عايز تتحداه*\n\n*—◉ بالطريقة دي*\n${usedPrefix}تحدي @${global.suittag}`;
  if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});

  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) 
    throw `*[❗] اللاعب اللي عايز تتحداه لسه بيلعب جيم تاني، استنى لما يخلص*`;

  const id = 'suit_' + new Date() * 1;
  const caption = `🎮 *لعبة حجر ورقه مقص* 🎮\n\n—◉ @${m.sender.split`@`[0]} بيتحداك في اللعبه دي @${m.mentionedJid[0].split`@`[0]}\n◉ اكتب "نعم" من غير نقطه لو موافق\n◉ اكتب "لا" من غير نقطه لو رافض\n`;
  const imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`;

  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {text: caption}, {mentions: await conn.parseMention(caption)}),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `[ ⏳ ] اللاعب التاني اتأخر، حاول تاني لما يكون متاح`, m);

      delete conn.suit[id];
    }, timeout), poin, poin_lose, poin_bot, timeout,
  };
};

handler.command = /^تحدي|suit(pvp)?$/i;
handler.group = true;
handler.game = true;

export default handler;