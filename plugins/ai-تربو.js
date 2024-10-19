import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

// Function to clean and translate text to Arabic
async function cleanAndTranslateToArabic(text) {
  try {
    // الخطوة 1: تنظيف النص من الرموز غير الضرورية
    const cleanedText = text.replace(/[^\w\s.,!?؟]/g, '').trim();
    
    // الخطوة 2: تقسيم النص إلى جمل للحصول على ترجمة أفضل
    const sentences = cleanedText.match(/[^.!?]+[.!?]+/g) || [cleanedText];
    let translatedSentences = [];

    for (const sentence of sentences) {
      // ترجمة كل جملة وإضافتها إلى المصفوفة
      const result = await translate(sentence, { to: 'ar' });
      translatedSentences.push(result.text.trim());
    }

    // الخطوة 3: جمع الجمل المترجمة بتنسيق مناسب
    return translatedSentences.join(' ').replace(/\s([.,!?؟])/g, '$1');
  } catch (error) {
    console.error('خطأ في الترجمة:', error);
    return text;  // إعادة النص الأصلي في حالة حدوث خطأ في الترجمة
  }
}

let handler = async (m, { text, conn, usedPrefix, command }) => {
  // مصفوفة الصور
  const images = [
    'https://telegra.ph/file/796cd08ec4d1bbc19dc20.jpg'
  ];

  // اختيار صورة عشوائية من المصفوفة
  const randomImage = images[Math.floor(Math.random() * images.length)];

  if (!text && !(m.quoted && m.quoted.text)) {
    await conn.sendButton(m.chat, `> *"مرحبًا! أنا ، مساعد الذكاء الاصطناعي يقدم خدمات تحليل الدردشة والنصوص لتعزيز تجربتك. أنا هنا لمساعدتك في أي استعلام في ذهنك."*`, author, randomImage, [['المطور', `${usedPrefix}المطور`]], null, [['قناة البوت', `https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45`]], m);
    return;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    m.react(rwait);
    
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru1 = `https://api.gurusensei.workers.dev/llama?prompt=${prompt}`;

    try {
      let response = await fetch(guru1);
      let data = await response.json();
      let result = data.response.response;

      if (!result) {
        throw new Error('لا توجد استجابة JSON صالحة من API الأول');
      }

      // ترجمة النتيجة إلى العربية بعد تنظيف النص
      let translatedResult = await cleanAndTranslateToArabic(result);

      // عرض الرد مع الصورة والأزرار
      await conn.sendButton(m.chat, `*${translatedResult}*`, author, randomImage, [['المطور', `${usedPrefix}المطور`]], null, [['قناة البوت', `https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45`]], m);
      m.react(done);
    } catch (error) {
      console.error('خطأ من API الأول:', error);

      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

      let response = await fetch(guru2);
      let data = await response.json();
      let result = data.completion;

      // ترجمة النتيجة إلى العربية بعد تنظيف النص
      let translatedResult = await cleanAndTranslateToArabic(result);

      // عرض الرد مع الصورة والأزرار
      await conn.sendButton(m.chat, `*${translatedResult}*`, author, randomImage, [['المطور', `.المطور`]], null, [['قناة البوت', `https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45`]], m);
      m.react(done);
    }
  } catch (error) {
    console.error('خطأ:', error);
    throw `*خطأ*`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['AI'];
handler.command = ['تربو', 'chatgpt', 'ai', 'gpt'];

export default handler;