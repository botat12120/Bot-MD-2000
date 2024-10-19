const dir = [
'https://telegra.ph/file/47980b59ec8bb7536b8c3.mp4',
'https://telegra.ph/file/f5b44250d09185cdc5ceb.mp4',
'https://telegra.ph/file/cc3c936f1c8a3011f4f61.mp4',
'https://telegra.ph/file/720e5d6fd5b1db1d84fd1.mp4',
'https://telegra.ph/file/73f99720578e60a185065.mp4',
'https://telegra.ph/file/801bc2b575205d84fdd8c.mp4',
'https://telegra.ph/file/984bb87dd03a92eee1a17.mp4',
'https://telegra.ph/file/7097fb382329e9ad40b36.mp4',
'https://telegra.ph/file/906199e5f8749000d0423.mp4',
'https://telegra.ph/file/77348305d0298f1863b16.mp4',
'https://telegra.ph/file/d91c04ed0c7ec4d93cf45.mp4',
'https://telegra.ph/file/dac6f6ba7cf2e4f85f9f0.mp4',

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
  m.react('⚽');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['ايديت3'] 

export default handler
