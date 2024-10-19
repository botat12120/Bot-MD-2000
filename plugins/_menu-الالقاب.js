import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs/promises'; // استخدام fs/promises مباشرة

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(Date.now() + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`;

    let user = global.db.data.users[who];
    let { money, joincount } = global.db.data.users[m.sender];
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who];
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let rtotal = Object.entries(global.db.data.users).length || '0';
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let taguser = conn.getName(m.sender); // تعديل هنا للحصول على الاسم بدلاً من الرقم
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}};
   await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // الانتظار لمدة ثانيتين
    await new Promise(resolve => setTimeout(resolve, 300));

    await conn.sendMessage(m.chat, { text: '*جاري تحضير قائمة الاوامر*' }, { quoted: global.fcontact });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const img = './Menu5.png';
    const str = `
> *✧────[ 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 ]────╮*
> *┤ *مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: Mahmoud Mahmed*
> *┤ #️⃣ الرقم: wa.me/201225655220*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *╯────────────···*  
> *╮──[ معـلـومـات الـمسـتـخـدم ]──✧* 
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤────> *✧────[ 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 ]────╮*
> *┤ *مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: Mahmoud Mahmed*
> *┤ #️⃣ الرقم: wa.me/201225655220*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *╯────────────···*  
> *╮──[ معـلـومـات الـمسـتـخـدم ]──✧* 
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *╯─────────────────···*  
> *╮───[ اوامر الالقاب ]───✧*
> *┤ .تسجيل.* 
> *┤ { تضع القب بعد الامر للادمن فقط }*
> *┤ .لقبي.*
> *┤ { لمعرفة لقبك المسجل }*
> *┤ .لقبه.* 
> *┤ { لمعرفة لقب شخص للادمن فقط }*
> *┤ .الالقاب.* 
> *┤ { لمعرفة الالقاب المسجله }*
> *┤ .حذف_لقب.*
> *┤ { لحذف لقب من الالقاب المسجله }*
> *╯────────────────···* 
`;

    await conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: `⟣𓆩༺ شــرح الــالــقــاب ༻𓆪⟢`,
                        image: {
                            url: 'https://telegra.ph/file/66977b2c35e28a75c8cb0.jpg' // تأكد من وجود الصورة في المسار المحدد
                        }
                    },
                    body: {
                        text: str
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: 'اضغط هنا',
                                    sections: [
                                        {
                                            title: 'قسم الأوامر',
                                            highlight_label: 'جديد',
                                            rows: [
                                                {
                                                    header: 'الأوامر',
                                                    title: '⌬ ❛╏لقبي',
                                                    description: 'عرض لقبك المسجل',
                                                    id: '.لقبي'
                                                },
                                                {
                                                    header: 'الأوامر',
                                                    title: '⌬ ❛╏الالقاب',
                                                    description: 'عرض جميع الألقاب المسجلة',
                                                    id: '.الالقاب'
                                                },
                                                {
                                                    header: 'الأوامر',
                                                    title: '⌬ ❛╏استماره',
                                                    description: 'فتح الاستماره',
                                                    id: '.استماره'
                                                },
                                                {
                                                    header: 'الأوامر',
                                                    title: '⌬ ❛╏استماره2',
                                                    description: 'فتح الاستماره2',
                                                    id: '.استماره2'
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
    }, { quoted: global.fcontact });
};

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(اوامر-الالقاب)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

export default handler;