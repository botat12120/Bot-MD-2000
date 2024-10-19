const dir = [
'https://telegra.ph/file/cc6d4378b0f69321fc411.mp4',
'https://telegra.ph/file/7a9aa4eea49f57a6b4bbd.mp4',
'https://telegra.ph/file/4a88571acda4a27a63e1a.mp4',
'https://telegra.ph/file/efc14834b500cc4bdf9c8.mp4',
'https://telegra.ph/file/c955e7ca813d4de8a19df.mp4',
'https://telegra.ph/file/7956de26d4668a54e7ae2.mp4',
'https://telegra.ph/file/ba1d8ef255b92dc55203b.mp4',
'https://telegra.ph/file/0b6e8ced9862ab599ed29.mp4',
'https://telegra.ph/file/40026324773266c520930.mp4',
'https://telegra.ph/file/9b34e07ee9df9dc1e7e99.mp4',
'https://telegra.ph/file/67b0e866a983ef7c22154.mp4',
'https://telegra.ph/file/423af6af01b0479955aeb.mp4',
'https://telegra.ph/file/0f70a2398490d0171e685.mp4',
'https://telegra.ph/file/f7fab2c5a69c983099964.mp4', 
'https://telegra.ph/file/22a442314b4b3733baf32.mp4',
'https://telegra.ph/file/7d0b69a05aaf954cf27d5.mp4',
'https://telegra.ph/file/7a0a811c505b96e737cda.mp4',
'https://telegra.ph/file/06e3664532dd3e69bbcfa.mp4',
'https://telegra.ph/file/f83a7ff1219afc2b6cc08.mp4',
'https://telegra.ph/file/7fbf46c96271b91498006.mp4',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
  m.react('🔀');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['ايديت4'] 

export default handler
