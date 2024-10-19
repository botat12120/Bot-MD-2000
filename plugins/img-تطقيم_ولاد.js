import fs from 'fs/promises';

let handler = async (m, { conn }) => {
  try {
    // قراءة ملف JSON من المسار المحلي
    let data = JSON.parse(await fs.readFile('src/game/طقم2.json', 'utf-8'));
    let cita = data[Math.floor(Math.random() * data.length)];

    let cowi = await (await fetch(cita.cowo)).buffer();
    await conn.sendFile(m.chat, cowi, '', '*❮ ولـد ❯ ✓*\n> 🅃🄰🅁🄱🄾🄾☞🄱🄾🅃', m);
    let ciwi = await (await fetch(cita.cewe)).buffer();
    await conn.sendFile(m.chat, ciwi, '', '*❮ ولـد ❯ ✓*\n> 🅃🄰🅁🄱🄾🄾☞🄱🄾🅃', m);
  } catch (error) {
    console.error(error);
  }
}

handler.help = ['Miku bot'];
handler.tags = ['Miku bot'];
handler.command = /^طقم2|طقم-اولاد|تطقيم_ولاد|تطقيم-ولاد$/i;
handler.limit = true;

export default handler;