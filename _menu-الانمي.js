let handler = async (m, { conn, args, usedPrefix, command }) => {
 const taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
  
 conn.relayMessage(m.chat, {
  viewOnceMessage: {
   message: {
    interactiveMessage: {
     header: {
      title: `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
*🐉✬⃝╿↵ مرحــبـا ➻${m.pushName}*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
🌄│قسم الانمي│`
     },
     body: {
      text: ''
     },
     nativeFlowMessage: {
      buttons: [
       {
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
         title: 'الانمي',
         sections: [
          {
           title: 'الانمي',
           highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
           rows: [
{ header: 'صور انمي', title: '🎨 ❛╏فانرت', description: '', id: '.فانرت' },
{ header: 'صور انمي', title: '💥 ❛╏هوسبو', description: '', id: '.هوسبو' },
{ header: 'صور انمي', title: '🌟 ❛╏كانا', description: '', id: '.كانا' },
{ header: 'صور انمي', title: '💥 ❛╏ميغومين', description: '', id: '.ميغومين' },
{ header: 'صور انمي', title: '🐾 ❛╏نيكو', description: '', id: '.نيكو' },
{ header: 'صور انمي', title: '🎯 ❛╏شوتا', description: '', id: '.شوتا' },
{ header: 'صور انمي', title: '💍 ❛╏وايف', description: '', id: '.وايف' },
{ header: 'صور انمي', title: '🌸 ❛╏الينا', description: '', id: '.الينا' },
{ header: 'صور انمي', title: '❤️ ❛╏مراتي', description: '', id: '.مراتي' },
{ header: 'صور انمي', title: '👧 ❛╏بنت', description: '', id: '.بنت' },
{ header: 'صور انمي', title: '👰 ❛╏وايفو', description: '', id: '.وايفو' },
{ header: 'صور انمي', title: '🍭 ❛╏لولي', description: '', id: '.لولي' },
{ header: 'صور انمي', title: '🍬 ❛╏لولي2', description: '', id: '.لولي2' },
{ header: 'صور انمي', title: '🎭 ❛╏كوسبلاي', description: '', id: '.كوسبلاي' },
{ header: 'صور انمي', title: '🌸 ❛╏ساكورا', description: '', id: '.ساكورا' },
{ header: 'صور انمي', title: '⚔️ ❛╏ساسكي', description: '', id: '.ساسكي' },
{ header: 'صور انمي', title: '🎨 ❛╏ساجيري', description: '', id: '.ساجيري' },
{ header: 'صور انمي', title: '🌿 ❛╏نيزوكو', description: '', id: '.نيزوكو' },
{ header: 'صور انمي', title: '🍥 ❛╏ناروتو', description: '', id: '.ناروتو' },
{ header: 'صور انمي', title: '💛 ❛╏ميناتو', description: '', id: '.ميناتو' },
{ header: 'صور انمي', title: '🎤 ❛╏ميكو', description: '', id: '.ميكو' },
{ header: 'صور انمي', title: '⚔️ ❛╏ميكاسا', description: '', id: '.ميكاسا' },
{ header: 'صور انمي', title: '💀 ❛╏مادارا', description: '', id: '.مادارا' },
{ header: 'صور انمي', title: '🔪 ❛╏جوزو', description: '', id: '.جوزو' },
{ header: 'صور انمي', title: '🎭 ❛╏كوترو', description: '', id: '.كوترو' },
{ header: 'صور انمي', title: '👹 ❛╏كانيكي', description: '', id: '.كانيكي' },
{ header: 'صور انمي', title: '🎻 ❛╏كاوري', description: '', id: '.كاوري' },
{ header: 'صور انمي', title: '🔥 ❛╏كاجيرو', description: '', id: '.كاجيرو' },
{ header: 'صور انمي', title: '🦸‍♂️ ❛╏كاجا', description: '', id: '.كاجا' },
{ header: 'صور انمي', title: '🧛 ❛╏ايتوري', description: '', id: '.ايتوري' },
{ header: 'صور انمي', title: '🌙 ❛╏ايتاتشي', description: '', id: '.ايتاتشي' },
{ header: 'صور انمي', title: '🔫 ❛╏ايسوزي', description: '', id: '.ايسوزي' },
{ header: 'صور انمي', title: '🌸 ❛╏اينوري', description: '', id: '.اينوري' },
{ header: 'صور انمي', title: '💜 ❛╏هيناتا', description: '', id: '.هيناتا' },
{ header: 'صور انمي', title: '🔥 ❛╏هيستيا', description: '', id: '.هيستيا' },
{ header: 'صور انمي', title: '❄️ ❛╏ايميليا', description: '', id: '.ايميليا' },
{ header: 'صور انمي', title: '🤖 ❛╏ايبا', description: '', id: '.ايبا' },
{ header: 'صور انمي', title: '🗡️ ❛╏ايرزا', description: '', id: '.ايرزا' },
{ header: 'صور انمي', title: '💣 ❛╏ديدارا', description: '', id: '.ديدارا' },
{ header: 'صور انمي', title: '🎀 ❛╏شيتوجي', description: '', id: '.شيتوجي' },
{ header: 'صور انمي', title: '🍙 ❛╏تشيهو', description: '', id: '.تشيهو' },
{ header: 'صور انمي', title: '⚡ ❛╏بوروتو', description: '', id: '.بوروتو' },
{ header: 'صور انمي', title: '🔧 ❛╏أيوزاوا', description: '', id: '.أيوزاوا' },
{ header: 'صور انمي', title: '⚔️ ❛╏اسونا', description: '', id: '.اسونا' },
{ header: 'صور انمي', title: '❄️ ❛╏اناا', description: '', id: '.اناا' },
{ header: 'صور انمي', title: '💼 ❛╏اكياما', description: '', id: '.اكياما' },
{ header: 'صور انمي', title: '🚀 ❛╏اكيرا', description: '', id: '.اكيرا' }
           ]
          }
         ]
        }),
        messageParamsJson: ''
       }
      ]
     }
    }
   }
  }
 }, {})
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['الانمي']

export default handler