import os from 'os'

let handler = async (m, { conn, text }) => {
  let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'ميجابايت'
  let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'ميجابايت'
  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length

  let message = `
*مواصفات البوت بتاعك*:

• *إجمالي المساحة*: ${totalStorage}
• *المساحة الفاضية*: ${freeStorage}
• *موديل المعالج*: ${cpuModel}
• *سرعة المعالج*: ${cpuSpeed} جيجاهرتز
• *عدد أنوية المعالج*: ${cpuCount}
`

  m.reply(message)
}

handler.help = ['botspec']
handler.tags = ['infobot']
handler.command = /^botspec|تست$/i

export default handler