let handler = async (m, { conn, text, command }) => {
  let id = text ? text : m.chat  
  await conn.reply(id, '*يلا سلام يا جماعة، هشوفكم في حتة تانية! (≧ω≦)*') 
  await conn.groupLeave(id)
}

// لو حد غير المطور حاول يتكلم، الرد هيكون:
handler.other = async (m, { conn }) => {
  await conn.reply(m.chat, '*هو انت فاكر نفسك المطور يا نجم؟ مفيش خروج من هنا إلا بأمر المطور! 😂*')
}

handler.tags = ['owner']
handler.command = /^(اخرج|اطلع|leavegc|برا|salirdelgrupo)$/i
handler.group = true
handler.rowner = true
export default handler