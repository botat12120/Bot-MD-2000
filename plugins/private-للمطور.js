 import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {

  if (!text) throw `*فين الرسالة اللي عاوز تبعتها لمطوري ي حوب 🦈*`;
  
  let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
  
  let teks = `*ـــــــــــــــــــــــــــــــــــــــــــــــــــ*\n*┊المرسل : @${who.split`@`[0]}*\n*┊الرسالة :*\n> *${text}\n*ــــــــــــــــــــــــــــــــــــــــــــــــــ*`;
  
  const me = '201225655220@s.whatsapp.net';
  
   try {
   
    let url = await conn.profilePictureUrl(who, 'image')
   
  
  await conn.sendFile(me, url, 'user.png', teks, m, null, { mentions: [who]})
  
  m.reply(`*تم ارسال رسالتك إلي مطوري 👀*\n> أنتظر الرد من مطوري ي صديقي...`)
  
        } catch (error) {
  
  conn.sendMessage(me, {text : teks, mentions: [who]}, { quoted: m });
  
  m.reply(`*تم ارسال رسالتك إلي مطوري ⚡*\n> أنتظر الرد من مطوري ي صديقي...`)
  
  }
//  conn.sendMessage(me, {text : teks}, { quoted: m });
  
  //conn.reply(me, m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] } },{ quoted: m });
  
  
  
};
handler.help = ['massage']
handler.tags = ['infobot']
handler.command = /^(للمطور)$/i
export default handler