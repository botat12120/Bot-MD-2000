import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn }) => {
  if (!db.data.chats[m.chat].stickers && m.isGroup) throw 0

  let nombre = '❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭'
  let nombre2 = '❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭'
  const s = [
    'https://telegra.ph/file/784a05acc195cdb35ca29.jpg',
  ]

  let stiker = await sticker(null, s[Math.floor(Math.random() * s.length)], nombre, nombre2)
  setTimeout(() => {
    conn.sendFile(m.chat, stiker, null, { asSticker: true })
  },) // تاخير 5 ثواني
}

handler.customPrefix = /كسمك/i
handler.command = new RegExp
handler.exp = 50

export default handler