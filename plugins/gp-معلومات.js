let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg' 
const groupAdmins = participants.filter(p => p.admin) 
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = 
`✦ - - معلومات الجروب - - ✦

⇢ معرف الجروب:
・ ${groupMetadata.id}

⇢ اسم الجروب:
・ ${groupMetadata.subject}

⇢ وصف الجروب:
・ ${groupMetadata.desc?.toString() || 'لا يوجد وصف متاح 🙃'}

⇢ عدد الأعضاء:
・ ${participants.length} أعضاء 👥

⇢ مالك الجروب:
・ @${owner.split('@')[0]}

⇢ قائمة الأدمنز:
${listAdmin}

*《 - - - - - 𓃠 ${vs} - - - - - 》*
`.trim()
  
await conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })   
}

handler.help = ['معلومات_الجروب']
handler.tags = ['جروب']
handler.command = /^(معلومات_الجروب|معلومات_المجموعه|معلومات_gc)$/i
handler.group = true
export default handler