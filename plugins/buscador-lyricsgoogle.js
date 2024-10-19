import { googleIt } from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : "";
  if (!teks) throw `⚠️ النص مفقود، من فضلك أرسل نص الأغنية!`;

  try {
    // ترجمة النص من اللغة العربية إلى الإنجليزية باستخدام خدمة الترجمة
    let translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(teks)}`);
    let translatedText = translationResponse.data[0][0][0];  // النص المترجم إلى الإنجليزية

    // البحث عن كلمات الأغنية المترجمة
    let searchResults = await googleIt({ query: `${translatedText} lyrics` });
    let searchResult = searchResults.find(result => result.link.includes('lyrics'));  // جلب أول نتيجة تحتوي على كلمات

    if (!searchResult) throw '⚠️ لم يتم العثور على كلمات الأغنية المطلوبة. حاول البحث باسم أدق.';

    let res = await axios.get(searchResult.link);
    let pageContent = res.data;

    // عزل الكلمات
    let lyricsMatch = pageContent.match(/<div class="lyrics">(.*?)<\/div>/s);  // محاولة لاستخراج الكلمات
    if (!lyricsMatch) throw '⚠️ لم أتمكن من العثور على الكلمات على الصفحة المطلوبة.';

    let lyrics = lyricsMatch[1].replace(/<[^>]+>/g, '').trim();  // تنظيف HTML

    // ترجمة الكلمات المجمعة مرة أخرى إلى العربية
    let lyricsTranslationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(lyrics)}`);
    let translatedLyrics = lyricsTranslationResponse.data[0].map(item => item[0]).join(" ");  // النص المترجم إلى العربية

    let txt = `🎶 *كلمات الأغنية من جوجل 🎵*\n\n${translatedLyrics}`;

    m.reply(txt);
  } catch (e) {
    await conn.reply(m.chat, `حدث خطأ! 🚨 من فضلك استخدم الأمر: #report ${usedPrefix + command}\n\n${wm}`, m);
    console.log(`❗❗ حدث خطأ أثناء تنفيذ الأمر ${usedPrefix + command} ❗❗`);
    console.log(e);
  }

  handler.limit = false;
};

handler.command = handler.help = [
  "كلمات-جوجل",
  "جوجل-كلمات",
  "جوجل-الأغاني",
];

handler.limit = 1;
handler.register = true;

export default handler;