import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*[❗غلط❗] مثال علي الأمر: ${usedPrefix + command} إنسان*`
  if (m.text.includes('gore') || m.text.includes('cp') || m.text.includes('porno') || m.text.includes('Gore') || m.text.includes('rule') || m.text.includes('CP') || m.text.includes('Rule34')) {
    return m.reply('[❗غلط❗] مش هقدر أجيب المحتوى ده، المجموعة دي ممنوعة \n لو انت أدمن وعايز تشغلها، كلمني المطور')
  }
  
  const res = await googleImage(text)
  let image = await res.getRandom()
  let link = image

  let captionn = `🔎 *النتيجة لـ:* ${text}\n🔗 *الرابط:* ${link}\n🌎 *محرك البحث:* Google`
  await conn.sendButton(m.chat, captionn, '𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️)', link, [['🔄 صورة تانية 🔄', `#imagen ${text}`]], m)
}

handler.help = ['gimage <كلمة البحث>', 'imagen <كلمة البحث>']
handler.tags = ['انترنت', 'أدوات']
handler.command = /^(gimage|image|تخيل|imagen)$/i

export default handler