import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // التحقق إذا لم يتم إدخال نص البحث
    if (!text) {
        return conn.reply(m.chat, '- *🔱 اكتب اسم الفيديو او الاغنية الذي تريد البحث عنها في يوتيوب وتشغيلها*', m);
    }

    await m.react('🎧');  // إضافة تفاعل عند بدء البحث
    let res = await yts(text);  // البحث باستخدام yt-search
    let play = res.videos[0];  // أخذ أول نتيجة بحث

    // التحقق من وجود نتيجة
    if (!play) {
        throw `- *🔱 حــدث خــطــأ*`;  // رسالة خطأ في حال عدم العثور على فيديو
    }

    // استخراج البيانات المطلوبة من نتيجة البحث
    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    // بناء النص الذي سيتم إرساله
    let txt = '*✧━═══━⊰🎶⊱━═══━✧*\n';
    txt += `*❐⤶ العنوان ↜* _${title}_\n\n`;
    txt += `*❐⤶ رابط المقطع ↜* _https://www.youtube.com/watch?v=${videoId}_\n`;
    txt += '*✠ ── ✷ ─ ‹🕷️› ─ ✷ ── ✠*\n\n';
    txt += `*❐⤶ تم النشر منذ ↜* _${ago}_\n`;
    txt += `*❐⤶ مدة الفيديو ↜* _${timestamp}_\n`;
    txt += `*❐⤶ عدد المشاهدات ↜* _${views.toLocaleString()}_\n`;
    txt += `*✠ ── ✷ ─ ‹🕷️› ─ ✷ ── ✠*`;

    // إرسال الرسالة مع الأزرار
    await conn.sendButton(m.chat, txt, 'ʙy:ᴛᴀɴᴊɪʀᴏ𖣬ʙᴏᴛ', thumbnail, [
        ['【🎧┇ارســال ⍅  كـصـوت】', `${usedPrefix}اغنية ${url}`],
        ['【📄┇ارســال ⍅ كـمـلـف صـوتي】', `${usedPrefix}شغل_كصوت ${text}`],
        ['【🎬┇ارســال ⍅  كـفـيـديـو】', `${usedPrefix}شغل_كفيديو ${url}`]
    ], m);

    // إضافة تفاعل بعد إتمام العملية بنجاح
    await m.react('✅');
};

// معلومات حول الأوامر
handler.help = ['play', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.command = ['شغل'];  // الأوامر الممكن استخدامها

export default handler;