/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: '*سوي الأمر على رقم المفعول فيه السيرفر العام*'}, {quoted: m});
  }
  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
  const sessionPath = './Miku-Session/';
  try {
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      for (const id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          break;
        }
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '*🌸 ¦ مالقيت ملف فيه ID الشاتات*'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `*🌸 ¦ تم حذف ${filesDeleted} ملفات تشفير الـSession*`}, {quoted: m});
    }
  } catch (err) {
    console.error('خطأ في قرائة السيشنات :', err);
    await conn.sendMessage(m.chat, {text: '*🌸 ¦ صار ايرور أثناء حذف ملفات التشفير، حاول بعدين!*'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `*امممم تشوف رسايلي الحين ولا لسا مشرفين؟ 🦄*`}, {quoted: m});
};
handler.help = ['fixmsgespera'];
handler.tags = ['fix'];
handler.command = /^(تصليح|تشفير|فك|صلح)$/i;
export default handler;
