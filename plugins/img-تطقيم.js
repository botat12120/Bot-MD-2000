import fetch from "node-fetch"
let handler = async (m, { conn }) => {

  let data = await (await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')).json()
  let cita = data[Math.floor(Math.random() * data.length)]
  
  let cowi = await(await fetch(cita.cowo)).buffer()
  await conn.sendFile(m.chat, cowi, '', '*❮ لـلـولـد ❯ ✓*\n> 𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️)', m)
  let ciwi = await(await fetch(cita.cewe)).buffer()
  await conn.sendFile(m.chat, ciwi, '', '*❮ لـلـبنـت ❯ ✓*\n> 𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️)', m)
}
handler.help = ['ppcouple', 'ppcp']
handler.tags = ['internet']
handler.command = ['طقم','تطقيم'] 


export default handler