import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  if (!m.quoted && !text) return m.reply(`⚠️ وين النص؟`)
  try {
    let fakegif = {
      key: { participant: `0@s.whatsapp.net`, ...("6289643739077-1613049930@g.us" ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) },
      message: {
        "videoMessage": {
          "title": '🐱⸽⃕❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭ - MD🍁⃨፝⃕✰',
          "h": `Hmm`,
          'seconds': '99999',
          'gifPlayback': 'true',
          'caption': '🐱⸽⃕❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭ - MD🍁⃨፝⃕✰',
          'jpegThumbnail': false
        }
      }
    }
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m || m.text || m.sender
    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
    let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c } }, { quoted: fakegif, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch {
    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)
    let more = String.fromCharCode(8206)
    let masss = more.repeat(850)
    let htextos = `${text ? text : "*مرحبا!!*"}`

    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users }, { quoted: m })
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m })
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m })
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, { text: text ? text : '', mentions: users }, { quoted: null, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })
    }
  }
}

handler.command = /^(اخفاء|اعلام|تنبيه|مخفي)$/i
handler.group = true
handler.admin = true

export default handler