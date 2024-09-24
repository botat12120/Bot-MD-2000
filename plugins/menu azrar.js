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
  await conn.sendMessage(m.chat, { react: { text: '🐺', key: m.key } })
  const Elsony = 'https://telegra.ph/file/b1d7db23103bcc9dd896d.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `gataVidMenu`}, body: { text: `*مــرحــبــا بــك* @${mentionId.split('@')[0]} 

◉━━━─ •༺ 🔰 ༻• ─━━━◉
📮╎⌟ مـعلـومـات الــ🐺ـبـوت ⌜╎📮
> •إســم الــبــوت: روب ستارك
> •الــمــطــور :  فارس 🔰
> •مــدة الــتــشــغــيل : ${uptime}
*◉━━━─⪻🔰⪼─━━━◉*
📮╎⌟ مــعلـ🔰ـومــاتــك ⌜╎📮
> •مــســتــواك : ${level}
> •بــريــمــيــوم : ${user.premiumTime > 0 ? 'مــمـ🔰ـيز' : (isPrems ? 'مــمـ🔰ـيز' : 'عــ🐺ــادي') || ''}
> •.رتــبــتــك : ${role}
*◉━━━─⪻🔰⪼─━━━◉*
*~⌬ تــ✍︎ــوقــيــع ↡~*🐺
*⌞🔰┊ 𝑹𝑶𝑩 𝑩𝑶𝑻 ┊🔰⌝*
*◉━━━─ •༺ 🔰 ༻• ─━━━◉*
> Copyright © 2024 𝐑𝐎𝐁 𝐊𝐒𝐀`,subtitle: "Elsony",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: Elsony } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🔰╎الــقــوائـــم╎🔰⌋',
                                    sections: [
                                        {
                                            title: 'مــرحـ🛡ـبــا بــك فـي مــ☑هــام روب بـ🦍ـوت',
                                            highlight_label: ' القائمة المفضلة 🦍',
                                            rows: [
                                                {
                                                    header: '👑 ➀ الــقــســم',
                                                    title: 'استدعاء_قسم_الاعضاء #الاعضاء',
                                                    description: '',
                                                    id: '.م1'
                                                },
                                                {
                                                    header: '👨🏻‍💻 ➁ الــقــســم',
                                                    title: 'استدعاء_قسم_المشرفين #المشرفين',
                                                    description: '',
                                                    id: '.م11'
                                                },
                                                {
                                                    header: '🕋 ➂ الــقــســم',
                                                    title: 'استدعاء_قسم_الدين #الدين',
                                                    description: '',
                                                    id: '.م2'
                                                },
                                                {
                                                    header: '💻 ➃ الــقــســم',
                                                    title: 'استدعاء_قسم_المطور #المطور',
                                                    description: '',
                                                    id: '.م3'
                                                },
                                                {
                                                    header: '🛡 ➄ الــقــســم',
                                                    title: 'استدعاء_قسم_التنزيلات #التنزيلات',
                                                    description: '',
                                                    id: '.م4'
                                                },
                                                {
                                                    header: '🕹 ➅ الــقــســم',
                                                    title: 'استدعاء_قسم_الالعاب #الالعاب',
                                                    description: '',
                                                    id: '.م5'
                                                },
                                                {
                                                    header: '🌀 ➆ الــقــســم',
                                                    title: 'استدعاء_قسم_التحويلات #التحويلات',
                                                    description: '',
                                                    id: '.م6'
                                                },
                                                {
                                                    header: '🎧 ➇ الــقــســم',
                                                    title: 'استدعاء_قسم_الصوتيات #الصوتيات',
                                                    description: '',
                                                    id: '.م7'
                                                },
                                                {
                                                    header: '🤖 ➈ الــقــســم',
                                                    title: 'استدعاء_قسم_الذكاء #الذكاء',
                                                    description: '',
                                                    id: '.م8'
                                                },
                                                {
                                                    header: '🚨 ➉ الــقــســم',
                                                    title: 'استدعاء_قسم_الدعم #الدعم',
                                                    description: '',
                                                    id: '.م9'
                                                },
                                                {
                                                    header: '🔍 ⑪ الــقــســم',
                                                    title: 'استدعاء_قسم_ابحث #البحث',
                                                    description: '',
                                                    id: '.م12'
                                                },
                                                {
                                                    header: '📽️ ⑫ الــقــســم',
                                                    title: 'استدعاء_قسم_الافلام #الافلام',
                                                    description: '',
                                                    id: '.م13'
                                                },
                                                {
                                                    header: '👨🏻‍💻 ⑬ الــقــســم',
                                                    title: 'سكربت_بوت_جاهز_للتعديل_👨🏻‍💻',
                                                    description: '',
                                                    id: '.م10'
                                               }
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                },
                {
              name: "quick_reply",
              buttonParamsJson: '{"display_text":"⌈🦍╎الدردشه المجهوله╎🦍⌋","id":".chathom"}'
                     },
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"⌈🦍╎قـنـاة الـمـطـور╎🦍⌋","url":"https://chat.whatsapp.com/Ck3mQdmm0Ty3FMrJSNsG90","merchant_url":"https://chat.whatsapp.com/Ck3mQdmm0Ty3FMrJSNsG90"}'
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
handler.command = ['menu', 'مهام', 'اوامر','الاوامر','قائمة','القائمة']

export default handler;
