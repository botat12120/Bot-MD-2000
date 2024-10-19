import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

var handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, '🚩 *استخدم هذا الأمر مباشرة في الرقم الرئيسي للبوت*', m);
  }
  
  await conn.reply(m.chat, '🚯 *بدء عملية حذف جميع ملفات الجلسة باستثناء الملف creds.json...*', m);
  m.react(rwait);

  let sessionPath = './MysticSession/';

  try {
    if (!existsSync(sessionPath)) {
      return await conn.reply(m.chat, '🚩 *المجلد غير موجود*', m);
    }

    let files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    if (filesDeleted === 0) {
      await conn.reply(m.chat, '🚩 *لا توجد ملفات للحذف باستثناء ملف creds.json*', m);
    } else {
      m.react(done);
      await conn.reply(m.chat, `🎌 *تم الحذف بنجاح ${filesDeleted} ملفاً باستثناء ملف creds.json*`, m);
      conn.reply(m.chat, `👾 *¡مرحبا! ¿هل تراني يخوي?*`, m);
    }
  } catch (err) {
    console.error('حدث خطأ أثناء قراءة المجلد أو الملفات:', err);
    await conn.reply(m.chat, '🚩 *حدث فشل في العملية*', m);
  }
};

handler.help = ['dsowner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|تنظيف|clearallsession)$/i;

handler.rowner = true;

export default handler;