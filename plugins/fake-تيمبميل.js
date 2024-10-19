//thanks to inrl: https://github.com/inrl-official
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const response = await fetch('https://inrl-web-fkns.onrender.com/api/getmail?apikey=inrl')
      const data = await response.json()

      if (data.status && data.result && data.result.length > 0) {
        const tempMails = data.result.join('\n')
        const replyMessage = `*عناوين البريد الإلكتروني المؤقتة:*\n\n${tempMails}\n\n استخدم \`\`\`\.checkmail <عنوان البريد>\`\`\`\ إذا كنت تريد التحقق من صندوق الوارد لأي بريد مؤقت من العناوين المذكورة أعلاه.`
        m.reply(replyMessage)
      } else {
        m.reply('لم يتم العثور على أي عناوين بريد إلكتروني مؤقتة.')
      }
    } catch (error) {
      console.error('خطأ:', error)
      m.reply('فشل في جلب عناوين البريد الإلكتروني المؤقتة.')
    }
  } else if (command === 'checkmail') {
    if (!text && !(m.quoted && m.quoted.text)) {
      m.reply('يرجى تقديم نص أو اقتباس رسالة للحصول على الرد.')
      return
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`
    }

    try {
      const response = await fetch(
        `https://inrl-web-fkns.onrender.com/api/getmailinfo?email=${encodeURIComponent(text)}&apikey=inrl`
      )
      const data = await response.json()

      if (data.status && data.result && data.result.length > 0) {
        const messages = data.result
          .map(message => {
            return `
*المرسل:* ${message.from}
*الموضوع:* ${message.subject}
*التاريخ:* ${message.date}
*النص:*
${message.text}
          `
          })
          .join('\n\n---\n\n')
        const replyMessage = `*الرسائل في* ${text}:\n\n${messages}`
        m.reply(replyMessage)
      } else {
        m.reply(`لم يتم العثور على رسائل في ${text}.`)
      }
    } catch (error) {
      console.error('خطأ:', error)
      m.reply(`فشل في التحقق من الرسائل في ${text}.`)
    }
  }
}
handler.help = ['tempmail']
handler.tags = ['tools']
handler.command = ['tempmail', 'checkmail','تيمب']
handler.diamond = false

export default handler