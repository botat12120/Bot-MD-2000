let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: '*🤖 قـائـمـه الـاوامـر 🤖*'
            },
            body: {
              text: '*اهلا بك/ي في قائمه الاوامر*\n*اصبحت القائمه تتحكم عن طريق الازرار*\n*لاتلعب كثير بالازرار*😊\n\n> *تــحــيــات بـــوت فـــيـــرجـــل️*'
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: 'اضغط هنا للأختيار 💎',
                    sections: [
                      {
                        title: 'List',
                        highlight_label: 'لاتلعب بالازرار 🌚',
                        rows: [
                          {
                            header: 'قــســم الجروبات',
                            title: 'القروبات',
                            description: 'بيجيب لك اوامر الجروبات',
                            id: '.قسم-الجروب'
                          },
                          {
                            header: 'قــســم الترفيه',
                            title: '.الالعاب',
                            description: 'بيجيب لك اوامر الالعاب',
                            id: '.قسم-الترفيه'
                          },
                          {
                            header: 'قــســم التحويل',
                            title: 'التحويلات',
                            description: 'بيجيب لك اوامر التحويل',
                            id: '.قسم-التحويل'
                          },
                          {
                            header: 'قــســم التنزيلات',
                            title: 'التحميلات',
                            description: 'بيجيب لك اوامر التحميل',
                            id: '.قسم-التنزيلات'
                          },
                          {
                            header: 'قــســم الايديت',
                            title: 'تصاميم',
                            description: 'بيجيب لك اوامر الايديت',
                            id: '.قسم-الايديت'
                          },
                          {
                            header: 'قــســم الذكاء',
                            title: 'ذكاء اصطناعي',
                            description: 'بيجيب لك اوامر الذكاء الاصطناعي',
                            id: '.قسم-الذكاء'
                          },
                          {
                            header: 'قــســم البحث',
                            title: '.البحث',
                            description: 'بيجيب لك اوامر البحث',
                            id: '.قسم-البحث'
                          },
                          {
                            header: 'قــســم العشوائيات',
                            title: 'عشوائي',
                            description: 'بيجيب لك اوامر العشوائيات',
                            id: '.قسم-العشوائيه'
                          },
                          {
                            header: 'قــســم البنك',
                            title: 'البنك',
                            description: 'بيجيب لك اوامر البنك',
                            id: '.قسم-البنك'
                          },
                                                      {
                            header: 'قــســم الدين الاسلامي',
                            title: 'الاسلام ديننا',
                            description: 'بيجيب لك اوامر الدين',
                            id: '.قسم-الدين'
                          },
                                                      {
                            header: 'قــســم الدعم',
                            title: 'الدعم',
                            description: 'بيجيب لك اوامر الدعم',
                            id: '.قسم-الدعم'
                          },
                          {
                            header: 'قــســم المطور',
                            title: 'المطور',
                            description: 'بيجيب لك اوامر المطور',
                            id: '.قسم-المطور'
                          },
                          {
                            header: 'ســرعــة الــبــوت',
                            title: 'البينج',
                            description: '',
                            id: '.ping'
                        }
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
handler.command = ['اوامر', 'الاوامر', 'أوامر']

export default handler
