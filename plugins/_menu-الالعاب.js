let handler = async (m, { conn, args, usedPrefix, command }) => {
 const taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

 conn.relayMessage(m.chat, {
  viewOnceMessage: {
   message: {
    interactiveMessage: {
     header: {
      title: `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
*🎮🎲 مرحبا ➻${m.pushName}*
── • ◈ • ──
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
➻🎯🎮│الألعاب│🕹️
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*`
     },
     body: {
      text: ''
     },
     nativeFlowMessage: {
      buttons: [
       {
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
         title: 'اختر لعبة',
         sections: [
          {
           title: 'قسم الألعاب',
           highlight_label: 'ألعاب جديدة',
           rows: [
            { header: 'الألعاب', title: '🎲 ❛╏ألعاب', description: '', id: '.العاب' },
            { header: 'الألعاب', title: '🎲 ❛╏ثقافة', description: '', id: '.ثقافة' },
            { header: 'الألعاب', title: '🎲 ❛╏لوجوهات', description: '', id: '.لوجوهات' },
            { header: 'الألعاب', title: '🎲 ❛╏أحزر', description: '', id: '.أحزر' },
            { header: 'الألعاب', title: '🎲 ❛╏ألغاز', description: '', id: '.ألغاز' },
            { header: 'الألعاب', title: '🎲 ❛╏إيموجي', description: '', id: '.إيموجي' },
            { header: 'الألعاب', title: '🎲 ❛╏أنميات', description: '', id: '.أنميات' },
            { header: 'الألعاب', title: '🎲 ❛╏سؤال_أنمي', description: '', id: '.سؤال_أنمي' },
            { header: 'الألعاب', title: '🎲 ❛╏رياضة', description: '', id: '.رياضة' },
            { header: 'الألعاب', title: '🎲 ❛╏كرة', description: '', id: '.كرة' },
            { header: 'الألعاب', title: '🎲 ❛╏ذكاء', description: '', id: '.ذكاء' },
            { header: 'الألعاب', title: '🎲 ❛╏علم', description: '', id: '.علم' },
            { header: 'الألعاب', title: '🎲 ❛╏عين', description: '', id: '.عين' },
            { header: 'الألعاب', title: '🎲 ❛╏فكك', description: '', id: '.فكك' },
            { header: 'الألعاب', title: '🎲 ❛╏كت', description: '', id: '.كت' },
            { header: 'الألعاب', title: '🎲 ❛╏دين', description: '', id: '.دين' },
            { header: 'الألعاب', title: '🎲 ❛╏مسابقة', description: '', id: '.مسابقة' },
            { header: 'الألعاب', title: '🎲 ❛╏مسابقة-صور', description: '', id: '.مسابقة-صور' }
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
handler.command = ['اوامرالالعاب']

export default handler