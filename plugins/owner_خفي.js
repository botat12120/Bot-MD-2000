import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
let handler = async (m, { conn, text, participants, isOwner }) => {
  if (!isOwner) {
    throw 'هذا الأمر للمطور فقط!'
  }

  let fakegif = { 
    key: { 
      participant: `0@s.whatsapp.net`, 
      ...("6289643739077-1613049930@g.us" ? { remoteJid: "6289643739077-1613049930@g.us" } : {})
    },
    message: {
      "videoMessage": { 
        "title": '🆃🅰🆁🅱🅾🅾❥🅱🅾🆃', 
        "h": `Hmm`,
        'seconds': '99999', 
        'gifPlayback': 'true', 
        'caption': '𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️)', 
        'jpegThumbnail': false 
      }
    }
  }

  let users = participants.map(u => conn.decodeJid(u.id))
  let q = m.quoted ? m.quoted : m || m.text
  let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text
  let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, { quoted: fakegif, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['hidetag']
handler.tags = ['owner']
handler.command = /^(hidetag|notificar|خفي)$/i
handler.owner = true
export default handler