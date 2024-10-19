function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '🚀', key: m.key } })
  const Eltarboo = 'https://telegra.ph/file/9b32c2e2264e40805b247.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `Eltarboo`}, body: { text: `
⎔⋅• ━ ╼╃ ⌬〔﷽〕⌬ ╄╾ ━ •⋅⎔
> ‹ B꯭Y꯭┋❥ T꯭A꯭R꯭B꯭O꯭O꯭☞B꯭O꯭T ،|
> 〔قـسـم الدردشه المجهوله ˼‏ 👻 〕↶
*⌬∙ • ──╾⊱﹝⚜️﹞⊰╼── • ∙⌬*
            *زينو🐢ن بــ🤖ــوت*
*⌬∙ • ──╾⊱﹝⚜️﹞⊰╼── • ∙⌬*
> 👻 الدردشه المجهوله هي تقوم ب التحدث مع الاشخاص بسريه تامه لايظهر رقمك اثناء التحدث
> 👻 اختر من الاسفل للبدأ
*⌬∙ • ──╾⊱﹝⚜️﹞⊰╼── • ∙⌬*
*~⌬ تــ✍︎ــوقــيــع ↡~*🖋️
*⌞⚜️┊:┋𝐓𝐀𝐑𝐁𝐎𝐎❥𝐁𝐎𝐓┋:┊⚜️⌝*
*⌬∙ • ──╾⊱﹝⚜️﹞⊰╼── • ∙⌬*
> Copyright © 2024 ستيفن`,subtitle: "ستيفن",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: Eltarboo } }, { upload: conn.waUploadToServer }, {quoted: m}))},nativeFlowMessage: { buttons: [


                            {
                                name: "quick_reply",
                                buttonParamsJson: '{"display_text":"⌈🚀╎ابدأ المحادثه╎🚀⌋","id":".start"}'
                            },
                            {
                          name: "quick_reply",
                          buttonParamsJson: '{"display_text":"⌈🚀╎تغير المحادثه╎🚀⌋","id":".next"}'
                                 },
                                 {
                          name: "quick_reply",
                          buttonParamsJson: '{"display_text":"⌈🚀╎انهاء المحادثه╎🚀⌋","id":".leave"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = /^(ggft|chathom)$/i

export default handler;
