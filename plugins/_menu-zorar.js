import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {
    let d = new Date();
    d.setTime(d.getTime() + 3600000); // تعديل وقت الساعة بإضافة ساعة
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender) || 'مستخدم';
    let { money = 0, joincount = 0, diamond = 0 } = user;
    let { exp = 0, limit = 0, level = 0, role = 'مستخدم' } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    await conn.sendMessage(m.chat, { react: { text: '📂', key: m.key } });

    // إرسال المقطع الصوتي أولاً
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://files.catbox.moe/rwgiqt.aac' 
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    // تجهيز الصورة والقائمة
    const images = [
        'https://telegra.ph/file/bd87aef51ebbbba4901c8.jpg',
        'https://telegra.ph/file/b9c7242b2ea534c9fea51.jpg',
        'https://telegra.ph/file/0e611ef0f5898f84e06ff.jpg',
        'https://telegra.ph/file/e40751a79e8f69137c772.jpg',
        'https://telegra.ph/file/81ef617af171d1263bca4.jpg', 
        'https://telegra.ph/file/9ece2dc7647c5bc552f7a.jpg', 
        'https://telegra.ph/file/5a22e9d6a3db8a26c2a8d.jpg', 
        'https://telegra.ph/file/5122cb52f3d3e6a15d27d.jpg', 
        'https://telegra.ph/file/7d69133c3dae7d2cb988e.jpg', 
        'https://telegra.ph/file/7af98c215f23a0c7bfc6a.jpg', 
        'https://telegra.ph/file/e704ae1c0637553a0bff0.jpg', 
        'https://telegra.ph/file/f4fe5a6340ca9f5890cb4.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    var messa = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    // إرسال القائمة
    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `> ╮━━━━━━━━━━━━━━╭
        ┃    【 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 】    ┃
> ╯━━━━━━━━━━━━━━╰
> *┤ *مرحبا يا ${name}*
> *┤ 🤴🏻 المطور: Mahmoud Mahmed*
> *┤ #️⃣ رقم المطور: 01225655220*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···* 
> *✧────[الـﻤـسـتـخـدم]────╮*
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤ 🏆 *الـرتبة: ${role}*
> *┤ 🎮 *الخبـرة: ${exp}* 
> *┤ 💎 *الألـماس: ${diamond}* 
> *┤ 🪙 *تربو كوينز: ${money}*
> *┤ 🎟️ *الرموز: ${joincount}*
> *┤ 🌟 *الـبـرﯾـمـيـوم: ${user.premiumTime > 0 ? 'مـمـيز✅' : (isPrems ? 'مـمـيز ✅' : 'عـادي ❌') || ''}* 
> *┤────────────···* 
> *✧────[ الـوقـت ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*`
                    },
                    footer: {
                        text: '✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪'
                    },
                    header: {
                        title: '',
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
buttonParamsJson: JSON.stringify({
    title: '『』اوامر البوت《',
    sections: [
        {
            title: '『』قسم المالك《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'المطور', title: '⌬ ❛╏المطور', description: 'تواصل مع المطور', id: '.المطور', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'تعريف المطور', title: '⌬ ❛╏تعريف المطور', description: 'تعرف على المطور', id: '.المعرف', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'قائمه المطور', title: '⌬ ❛╏قائمه المطور', description: 'قسم خاص بالمطور فقط', id: '.قائمتي', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الادوات《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'التنزيلات', title: '⌬ ❛╏التنزيلات', description: 'جميع التحميلات هنا', id: '.اوامر-التحميل', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'البحث', title: '⌬ ❛╏قائمه البحث', description: 'بحث في مختلف المواقع', id: '.اوامر-البحث', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الذكاء الاصطناعي', title: '⌬ ❛╏قائمة الذكاء الاصطناعي', description: 'قسم الذكاء الاصطناعي', id: '.اوامر-الذكاء', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم التحويلات《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'التصميم', title: '⌬ ❛╏اوامر التصميم', description: 'اوامر التصميم والتحويلات', id: '.اوامر-التصميم', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الايديت', title: '⌬ ❛╏الايديت', description: 'اوامر الايديت واتعديل علي الصور', id: '.اوامر-الايدت', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الصوتيات', title: '⌬ ❛╏الصوتيات', description: 'قائمة التعديل علي الصوت', id: '.اوامر-الصوت', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الجروبات والاعضاء《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'الرومات', title: '⌬ ❛╏اوامر الرومات', description: 'قسم خاص بالمجموعات', id: '.اوامرالرومات', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الالقاب', title: '⌬ ❛╏اوامر الالقاب', description: 'قسم خاص بلالقاب والنقابات', id: '.اوامر-الالقاب', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الاعضاء', title: '⌬ ❛╏اوامر الاعضاء', description: 'قسم خاص بالاعضاء', id: '.اوامر-الاعضاء', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』القسم الاسلامي《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'الاوامر الدينية', title: '⌬ ❛╏القائمة الدينية', description: 'قسم خاص بالاوامر الاسلامية', id: '.الاوامر-الدينية', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الصور والفيديوهات《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'الانمي', title: '⌬ ❛╏قائمة الانمي', description: 'قائمة صور انمي متنوعة', id: '.الانمي', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الخلفيات', title: '⌬ ❛╏قائمة الخلفيات', description: 'قائمة خلفيات متنوعة', id: '.الخلفيات', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الفيديوهات', title: '⌬ ❛╏قائمة الفيديوهات', description: 'قائمة فديوهات متنوعة', id: '.الفيديوهات', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الانمي والخلفيات والفيديوهات', title: '⌬ ❛╏قائمة الانمي والخلفيات والفيديوهات', description: 'كل قوائم الانمي والخلفيات والفيديوهات', id: '.الانمي2', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم المرح والجيمز《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'الالعاب', title: '⌬ ❛╏قائمة الالعاب', description: 'قائمة متنوعة من الالعاب', id: '.اوامرالجيمز', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الالعاب 2', title: '⌬ ❛╏قائمة الالعاب 2', description: 'قائمة خاصة بأوامر الفاعليات', id: '.اوامرالالعاب', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الترفية', title: '⌬ ❛╏قائمة الترفية', description: 'قائمة خاصة بأوامر التسلية مع الاصدقاء', id: '.اوامرالمرح', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'المرح', title: '⌬ ❛╏قائمة المرح', description: 'قائمة المزاح والتسلية', id: '.مرح', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        }
    ]
}),
messageParamsJson: ''
                            },
                            {
    name: "single_select",
buttonParamsJson: JSON.stringify({
    title: "『』المعلومات《",
    sections: [
        {
            title: '『』قسم المالك《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'المطور', title: '⌬ ❛╏المطور', description: 'تواصل مع المطور', id: '.المطور', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'تعريف المطور', title: '⌬ ❛╏تعريف المطور', description: 'تعرف على المطور', id: '.المعرف', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم الدعم والمعلومات《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'السورس', title: '⌬ ❛╏السورس', description: 'معلومات عن البوت', id: '.السورس', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الدعم', title: '⌬ ❛╏الدعم', description: 'مجموعات الدعم', id: '.الدعم', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'الشروط', title: '⌬ ❛╏الشروط', description: 'شروط استخدام البوت', id: '.الشروط', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم معلومات البوت《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'السيرفر', title: '⌬ ❛╏معلومات السيرفر', description: 'تفاصيل السيرفر المستخدم', id: '.تست', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'البنج والسرعة', title: '⌬ ❛╏معلومات البنج والسرعه', description: 'سرعة البنج', id: '.بنج', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'المستخدمين', title: '⌬ ❛╏المستخدمين', description: 'عدد مستخدمين البوت', id: '.المستخدمين', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' },
                { header: 'المستخدمين الآن', title: '⌬ ❛╏اللذين يستخدمون البوت حالياً', description: 'المستخدمين الآن', id: '.الان', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        },
        {
            title: '『』قسم المعلومات《',
            highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
            rows: [
                { header: 'المعلومات', title: '⌬ ❛╏المعلومات', description: 'كل المعلومات', id: '.اوامر-المعلومات', highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓' }
            ]
        }
    ]
}),
messageParamsJson: "TARBOO bot"
},
{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "『』قيم البوت《",
        id: ".تقييم"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』رقم المطور《",
        url: "https://wa.me/201225655220",
        merchant_url: "https://wa.me/201225655220"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』قناة البوت《",
        url: "https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45",
        merchant_url: "https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "『』موقع المطور《",
        url: "https://linkbio.co/el-tarboo",
        merchant_url: "https://linkbio.co/el-tarboo"
    })
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
handler.command = ['اوامر', 'الاوامر', 'menu', 'المهام'];

export default handler;
``