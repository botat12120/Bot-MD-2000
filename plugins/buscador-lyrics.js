import { find_lyrics } from '@brandond/findthelyrics';
import { getTracks } from '@green-code/music-track-data';
import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
  if (!teks) throw `⚠️ من فضلك اكتب اسم الأغنية!\nمثال: *${usedPrefix + command} Billie Eilish bored* 🎶`;

  try {
    const result = await getTracks(teks);
    const lyrics = await find_lyrics(`${result[0].artist} ${result[0].title}`);
    let img;

    try {
      img = result.album.artwork;
    } catch {
      try {
        img = json.thumbnail.genius;
      } catch {
        const bochil = await googleImage(`${result[0].artist} ${result[0].title}`);
        img = await bochil.getRandom();
      }
    }

    await conn.sendButton(m.chat, 
      `🎶 *اسم الأغنية*: 💚 *${result[0].title || ''}*\n\n🎤 *الفنان*: 💜 *${result[0].artist || ''}*\n\n📝 *كلمات الأغنية*: ${lyrics || ''}`, 
      null, 
      img, 
      [
        ['🎧 تحميل | Download 🚀', `/play ${text}`],
        ['🔍 قائمة البحث | Search Menu', '#buscarmenu'],
        ['⬅️ الرجوع للقائمة | Back to Menu', '/menu']
      ], 
      null, null, m
    );

    await conn.sendMessage(m.chat, {
      audio: { url: result[0].preview },
      fileName: `${result[0].artist} ${result[0].title}.mp3`,
      mimetype: 'audio/mp4'
    }, { quoted: m });

  } catch (e) {
    await conn.reply(m.chat, `❌ حدث خطأ، من فضلك حاول مرة أخرى. لو استمر الخطأ، برجاء إبلاغ المطور باستخدام الأمر #report.`, m);
    console.log(`⚠️ خطأ في تنفيذ الأمر ${usedPrefix + command}`);
    console.log(e);
  }

  handler.limit = 0;
};

handler.help = ['ليريكس', 'كلمات'].map(v => v + ' <اسم الأغنية>');
handler.tags = ['الانترنت'];
handler.command = /^(ليريكس|lyrics|lyric|كلمات)$/i;
handler.limit = 1;

export default handler;