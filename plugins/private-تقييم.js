import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';

const handler = async (message, { conn, text, usedPrefix }) => {
    const deviceType = await getDevice(message.key.id);

    // Check if the device is mobile (not desktop or web)
    if (deviceType !== "desktop" && deviceType !== "web") {
        // Prepare image media
        const mediaMessage = await prepareWAMessageMedia({
            image: { url: "https://telegra.ph/file/1e09b9a4be53cb8c08ffd.jpg" }
        }, { upload: conn.waUploadToServer });

        // Define interactive message content
        const interactiveContent = {
            body: { text: '' },
            footer: { text: "يمكنك إستخدامه عبر الاختيار من الاسفل\n*─[ BY EL♡TARBOO ]*🌟✨" },
            header: {
                title: "مرحبا يا حب 👋 أتمنى أنك بخير ♥️\nالان يمكنك تقييم البوت لكي يتحسن اكثر",
                subtitle: "خـلــيك صـــادق فــي تــقــيــمـك يا حب ❤️🥹\n\n\n\n.",
                hasMediaAttachment: true,
                imageMessage: mediaMessage.imageMessage
            },
            nativeFlowMessage: {
                buttons: [
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐\",\"id\":\".قيم 1\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐\",\"id\":\".قيم 2\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐\",\"id\":\".قيم 3\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐⭐\",\"id\":\".قيم 4\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐⭐⭐\",\"id\":\".قيم 5\"}" }
                ],
                messageParamsJson: ''
            }
        };

        // Generate the message
        let waMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: { message: { interactiveMessage: interactiveContent } }
        }, {
            userJid: conn.user.jid,
            quoted: message
        });

        // Relay the message
        conn.relayMessage(message.chat, waMessage.message, { messageId: waMessage.key.id });
    } else {
        // Send an error image if the device is desktop or web
        conn.sendFile(message.chat, "JoAnimi•Error.jpg", message);
    }
};

// إعداد ردة الفعل عند تلقي التقييم
const sendFeedbackResponse = (stars, m, conn) => {
    let feedbackMessage = '';
    let developerContact = '201225655220@s.whatsapp.net'; // رقم المطور للتواصل

    // إعداد الرد بناءً على عدد النجوم
    switch (stars) {
        case 1:
            feedbackMessage = '*❒═[تقييم بنجمة واحدة]═❒*\n\n*❒ أوووه يا حب، تقييم نجمة بس؟ قولنا إيه اللي مضايقك ونحسنه! 🙁*';
            break;
        case 2:
            feedbackMessage = '*❒═[تقييم بنجمتين]═❒*\n\n*❒ مش بطال بس نقدر نعمل أحسن من كده، قول لنا نغير إيه! 😅*';
            break;
        case 3:
            feedbackMessage = '*❒═[تقييم بثلاث نجوم]═❒*\n\n*❒ تقييم لطيف، مبسوط إنك معانا، بس عايزين نوصل للكمال يا حب 🌟*';
            break;
        case 4:
            feedbackMessage = '*❒═[تقييم بأربع نجوم]═❒*\n\n*❒ تقييم جامد يا نجم! بنوعدك دايمًا نبقى على مستوى توقعاتك 💪*';
            break;
        case 5:
            feedbackMessage = '*❒═[تقييم بخمس نجوم]═❒*\n\n*❒ الله عليك يا أسطورة! شكراً على دعمك، انت كده بتخلينا نطير من الفرحة! 🚀❤️*';
            break;
        default:
            feedbackMessage = '*❒═[تقييم غير صالح]═❒*\n\n*❒ من فضلك اختار عدد النجوم من 1 لحد 5 يا حب 😅*';
            break;
    }

    // رسالة للمطور تحتوي على التقييم واسم المستخدم
    let developerMessage = `*❒═[تم استلام تقييم للبوت]═❒*\n\n*❒ التقييم: [ ${stars} نجوم ]*\n*❒ بواسطة: [ +${m.sender.split`@`[0]} ]*\n\n*❒ نأمل أن نكون عند حسن ظنك.*`;

    // إرسال رسالة للمطور
    conn.reply(developerContact, developerMessage, null, { contextInfo: { mentionedJid: [m.sender] } });

    // رد البوت للمستخدم
    m.reply(feedbackMessage + `\n\n*رابط التواصل مع المطور:* wa.me/${developerContact.split('@')[0]}`);
};

handler.customPrefix = /تقييم|تقيم/i;
handler.command = new RegExp();

export default handler;