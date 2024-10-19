import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const المعالج = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsMalused}\n*${usedPrefix + command} موسوعة*`
  
  const نص_مترجم = await translateToEnglish(text);  // ترجم النص إلى الإنجليزية

  wikipedia(`${نص_مترجم}`).then((res) => {
    const رد_مترجم = await translateToArabic(res.result.isi);  // ترجم الرد إلى العربية
    conn.reply(m.chat, `${mid.buscador9}\n\n` + رد_مترجم, fkontak, { contextInfo: { externalAdReply: { 
      mediaUrl: null, 
      mediaType: 1, 
      description: null, 
      title: '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 | ويكيبيديا', 
      body: 'روبوت واتساب رائع 🐱❤️', 
      previewType: 0, 
      thumbnail: imagen2, 
      sourceUrl: accountsgb 
    }}})
  }).catch((e) => {
    conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
    console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
    console.log(e)
    المعالج.limit = false
  });
};

المعالج.help = ['wikipedia'].map((v) => v + ' <apa>');
المعالج.tags = ['الإنترنت'];
المعالج.command = /^(wiki|wikipedia)$/i;
المعالج.exp = 40;
المعالج.level = 3;
المعالج.limit = 1;
المعالج.register = true;
export default المعالج;

async function wikipedia(query) {
  try {
    const link = await axios.get(`https://es.wikipedia.org/wiki/${query}`);
    const $ = cheerio.load(link.data);
    const العنوان = $('#firstHeading').text().trim();
    const الصورة = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
    const المحتوى = [];
    
    $('#mw-content-text > div.mw-parser-output').each(function(rayy, Ra) {
      const الشرح = $(Ra).find('p').text().trim();
      المحتوى.push(الشرح);
    });
    
    for (const i of المحتوى) {
      const data = {
        status: link.status,
        result: {
          العنوان: العنوان,
          الصورة: 'https:' + الصورة,
          المحتوى: i
        }
      };
      return data;
    }
  } catch (err) {
    const notFound = {
      status: link.status,
      message: eror
    };
    return notFound;
  }
}

// كود الترجمة
async function translateToArabic(text) {
  const response = await fetch(
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=" +
      encodeURIComponent(text),
  );
  const data = await response.json();
  return data[0][0][0];
}

async function translateToEnglish(text) {
  const response = await fetch(
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=" +
      encodeURIComponent(text),
  );
  const data = await response.json();
  return data[0][0][0];
}