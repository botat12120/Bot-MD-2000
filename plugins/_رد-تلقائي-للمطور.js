import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import fetch from 'node-fetch';

let handler = m => m;

handler.all = async function (m, conn) {
    // منع البوت من الرد على نفسه
    if (m.fromMe) return;

    let developerImgs = [
        "https://telegra.ph/file/581e6160af36def7872da.png", // الصورة الأولى للمطور
        "https://telegra.ph/file/4e84292a76a07ab824228.png",
        "https://telegra.ph/file/c591a6b4199f3521b732e.jpg", 
        "https://telegra.ph/file/7af10c05bba5a507bc166.jpg", 
        "https://telegra.ph/file/3c276bad105bd2da68b11.jpg", 
        "https://telegra.ph/file/e016ef40cfb87c9ff1c76.jpg", 
        "https://telegra.ph/file/9ac5b956aa2b4ad378531.jpg", 
        "https://telegra.ph/file/0473be9ccb093cbf78449.jpg", 
        "https://telegra.ph/file/df1a063b2fd7b2d39fab6.jpg"
    ];
    
    let botImg = "https://telegra.ph/file/6f4ad00e3b76b229e82d2.jpg"; // صورة البوت
    ];

    let developerNum = "201225655220"; // رقم المطور
    let botNum = "201016948771"; // رقم البوت

    if (m.mentionedJid && m.mentionedJid[0]) {
        let phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');

        let imgToSend;
        if (phoneNumber === developerNum) {
            // اختيار صورة عشوائية من صور المطور
            imgToSend = developerImgs[Math.floor(Math.random() * developerImgs.length)];
        } else if (phoneNumber === botNum) {
            imgToSend = botImg;
        } else if (phoneNumber === assistantNum) {
            // اختيار صورة عشوائية من صور المساعد
            imgToSend = assistantImgs[Math.floor(Math.random() * assistantImgs.length)];
        }

        if (imgToSend) {
            // تحميل الصورة
            let response = await fetch(imgToSend);
            let buffer = await response.buffer();

            // تحويل الصورة إلى ملصق
            let sticker = new Sticker(buffer, {
                pack: 'Sticker Pack',
                author: 'Your Name',
                type: StickerTypes.FULL,
                quality: 50
            });

            let stickerBuffer = await sticker.toBuffer();

            // إرسال الملصق
            return this.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
        }
    } else {
        return;
    }
}

export default handler;