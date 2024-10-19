//ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `*⌜🧞‍♂️⌝*
*ادخل رابط او اسم الاغنيه او الفيديو الذي تريدهم*`;

  try {
    const yt_play = await search(args.join(' '));
    let additionalText = '';
    if (command === 'تشغيل_كملف' || command === 'تشغيل_كملف') {
      additionalText = 'الصوت 🔊';
    } else if (command === 'play4' || command === 'playdoc2') {
      additionalText = 'الفيديو 🎥';
    }

    const texto1 = `*✧━════━⊰🎞️⊱━════━✧*
*❐⤶العنوان↜${yt_play[0].title}*

*❐⤶منذ↜${yt_play[0].ago}*

*❐⤶المدة↜${secondString(yt_play[0].duration.seconds)}*

*❐⤶مشاهدات↜* ${MilesNumber(yt_play[0].views)}

*❐⤶القناة↜* *${yt_play[0].author.name}*

*❐⤶رابط⇠القناة↜* ${yt_play[0].author.url}

*❐⤶معرف الفيديو↜${yt_play[0].videoId}*

*❐⤶النوع↜${yt_play[0].type}*

*❐⤶رابط⇠الفيديو↜* ${yt_play[0].url}\n
*✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*`.trim();

await conn.sendMessage(m.chat, { react: { text: "📄",key: m.key,}
  })
    conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1 }, { quoted: m });

    if (command === 'شغل_كصوت' || command === 'شغل_كصوت') {
      try {
        const q = '128kbps';
        const v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
        const dl_url = await yt.audio[q].download();
        const ttl = await yt.title;
        const size = await yt.audio[q].fileSizeH;
        await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
      } catch {
        await conn.reply(m.chat, '*『🚫┇فـشـل⟢الـتـحـمـيـل』*', m);
      }
    }
await conn.sendMessage(m.chat, { react: { text: "🎬",key: m.key,}
  })
    if (command === 'شغل_كفيديو' || command === 'شغل_كفيديو') {
      try {
        const qu = '360';
        const q = qu + 'p';
        const v = yt_play[0].url;
        const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
        const dl_url = await yt.video[q].download();
        const ttl = await yt.title;
        const size = await yt.video[q].fileSizeH;
        await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `*✧━════━⊰🎥⊱━════━✧*
*❐⤶العنوان↜${ttl}*\n

*❐⤶الحجم↜${size}*
   *✠ ─── ✷ ─ ‹🕷️› ─ ✷ ─── ✠*  `, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
      } catch {
        await conn.reply(m.chat, '*『🚫┇فـشـل⟢الـتـحـمـيـل』*', m);
      }
    }
  } catch {
    throw '*『🚫┇فـشـل⟢الـتـحـمـيـل』*';
  }
};

handler.help = ['play3', 'play4'].map((v) => v + ' <بحث>');
handler.tags = ['downloader'];
handler.command = /^(شغل_كصوت|شغل_كفيديو)$/i;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' يوم، ' : ' أيام، ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' ساعة، ' : ' ساعات، ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' دقيقة، ' : ' دقائق، ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' ثانية' : ' ثواني') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

async function ytMp3(url) {
  
}

async function ytMp4(url) {
  
}