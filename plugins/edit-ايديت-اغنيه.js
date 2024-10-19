const dir = [
'https://telegra.ph/file/d8a038658584737977b32.mp4',
'https://telegra.ph/file/4099194e423701cd45ec4.mp4',
'https://telegra.ph/file/33ee81733aacb33c9dc8a.mp4',
'https://telegra.ph/file/d1a2114cd22a7ef0ebaf8.mp4',
'https://telegra.ph/file/e50333c270097f259605c.mp4',
'https://telegra.ph/file/dd308796a1e3dabef923a.mp4',
'https://telegra.ph/file/99e8c69c19fa086f012de.mp4',
'https://telegra.ph/file/e0fc224e4f14d583e7504.mp4',
'https://telegra.ph/file/1effeffd52143bd3e082f.mp4',
'https://telegra.ph/file/e948e7403041b6b12da61.mp4',
'https://telegra.ph/file/8875a079f8747b755a181.mp4',
'https://telegra.ph/file/e74e3fffa975adcd87a0b.mp4',
'https://telegra.ph/file/f856715f46b49083c3c20.mp4',
'https://telegra.ph/file/27bb6263320d645dfdd24.mp4',
'https://telegra.ph/file/d41a27413d898857c40e7.mp4', 
'https://telegra.ph/file/d1a4ef74ca1757b1a63a8.mp4',
'https://telegra.ph/file/6de0a174779f71973476d.mp4',
'https://telegra.ph/file/ff8187126de0c6e86f69c.mp4',
'https://telegra.ph/file/237a73f4a1833a2e2020e.mp4',
'https://telegra.ph/file/1b2678a3dac3c79f138e1.mp4',
'https://telegra.ph/file/b1d1c4af4527e94b574e1.mp4',
'https://telegra.ph/file/5518002a845904d802837.mp4',
'https://telegra.ph/file/86e9e045767b637b11854.mp4',
'https://telegra.ph/file/9b073bf9f85edf994f015.mp4',
'https://telegra.ph/file/6ba2df16d65f6ec9bb0c3.mp4',
'https://telegra.ph/file/fb61ad501912bd696f0f6.mp4',
'https://telegra.ph/file/83a8cd84d42745c748bb3.mp4', 
'https://telegra.ph/file/75bb562381bf73391a3fd.mp4', 
'https://telegra.ph/file/e279fd0aca204c8583b21.mp4', 
'https://telegra.ph/file/62d2520e438580fa13cd5.mp4', 
'https://telegra.ph/file/e41985f25d31b99df2ca5.mp4', 
'https://telegra.ph/file/45d9a036c5d81069d7e22.mp4', 
'https://telegra.ph/file/c7f3222e37050b4acacd7.mp4', 
'https://telegra.ph/file/5b7441d496a85efd0a347.mp4', 
'https://telegra.ph/file/9bd9ea5ec6fa6a0c7a7e9.mp4', 

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
  m.react('🎧');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['ايديت7', 'ايديت-اغنيه'] 

export default handler
