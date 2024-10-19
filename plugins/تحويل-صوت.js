import axios from 'axios';

const defaultLang = 'id';
const apiKey = '08a134b000ccc8017863efc0160ff934'; // مفتاح API لخدمة تحويل النص إلى صوت

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        throw "يرجى كتابة نص لتحويله إلى صوت";
    }
    
    try {
        // تحويل النص إلى صوت باستخدام API
        const audioData = await tts(text, defaultLang);
        
        // إرسال الصوت إلى الدردشة
        await conn.sendFile(m.chat, audioData, 'tts.mp3', null, m, true);
    } catch (error) {
        console.error(error);
        throw "فشل في تحويل النص إلى صوت";
    }
};

handler.help = ['تحويلصوت'];
handler.tags = ['أدوات'];
handler.command = /^تكلم$/i;

handler.register = true;

export default handler;

// دالة لتنفيذ تحويل النص إلى صوت باستخدام خدمة خارجية
async function tts(text, lang = 'id') {
    try {
        const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj', {
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            responseType: 'arraybuffer' // تعيين responseType إلى 'arraybuffer' للحصول على الرد كـ array buffer
        });

        // إرجاع بيانات الصوت كـ buffer
        return Buffer.from(response.data);
    } catch (error) {
        console.error(error);
        throw "حدث خطأ في تحويل النص إلى صوت";
    }
}