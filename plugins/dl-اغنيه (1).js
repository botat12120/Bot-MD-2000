import {find_lyrics} from '@brandond/findthelyrics';
import {getTracks} from '@green-code/music-track-data';
import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
    const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
    if (!teks) throw `⚠️ مفيش اسم أغنية مذكور! 🧐\n📝 مثال: *${usedPrefix + command} Billie Eilish bored*`;

    try {
        const result = await getTracks(teks);
        const lyrics = await find_lyrics(`${result[0].artist} ${result[0].title}`);
        const res = await fetch(global.API('https://some-random-api.com', '/lyrics', {title: result[0].artist + result[0].title}));
        const json = await res.json();
        let img; 
        try {
            img = result.album.artwork;
        } catch {
            try {
                img = json.thumbnail.genius;
            } catch {
                const bochil = await googleImage(`${result[0].artist} ${result[0].title}`);
                img = await bochil.getRandom();
            }
        }
        await conn.sendButton(m.chat, `🎵 *العنوان:* \n💚 *${result[0].title || ''}*\n\n🎤 *المغني:* \n💜 *${result[0].artist || ''}*\n\n📝 *الكلمات:* \n${lyrics || ''}`, null, img, [
            ['🎶 تحميل الأغنية 🚀', `/play ${text}`],
            ['🔍 قائمة البحث', '#buscarmenu'],
            ['🔙 الرجوع للقائمة الرئيسية ☘️', '/menu']
        ], null, null, m);

        await conn.sendMessage(m.chat, {
            audio: {url: result[0].preview}, 
            fileName: `${result[0].artist} ${result[0].title}.mp3`, 
            mimetype: 'audio/mp4'
        }, {quoted: m});
    } catch (e) {
        await conn.reply(m.chat, `❗ حصل خطأ! جرب تاني 🛠️\n🔧 استخدم #report لو المشكلة استمرت`, null, m);
        console.log(`❗❗ خطأ في تنفيذ الأمر ${usedPrefix + command} ❗❗`);
        console.log(e);
    }
}

handler.help = ['اغنيه', 'كلمات'].map(v => v + ' <اسم الأغنية>');
handler.tags = ['انترنت'];
handler.command = /^(lirik|lyrics|lyric|letra|كلمات|اغنيه)$/i;
handler.limit = 1;

export default handler;