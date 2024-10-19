import fetch from 'node-fetch';

// تحويل الرقم لمينشن
let toM = a => '@' + a.split('@')[0];

async function handler(m, { conn, groupMetadata }) {
    // مش هنخصم أي حاجة من جواهر أو فلوس هنا، الموضوع هزار وبس!

    // نبدأ بقرعة طريفة عشان نحدد الضحية
    let participants = groupMetadata.participants.map(v => v.id);
    let a = participants[Math.floor(Math.random() * participants.length)];
    let b;
    do {
        b = participants[Math.floor(Math.random() * participants.length)];
    } while (b === a);

    // رابط الصورة اللي عايزين نبعتها
    const imageUrl = 'https://telegra.ph/file/2b0efc99afc0cfc69c3d8.jpg';

    // إرسال الصورة مع الرسالة المرحة
    await conn.sendFile(m.chat, imageUrl, 'image.jpg', 
    `*✦┇لنكوّن بعض الأصدقاء┇✦*\n\n*✦يا ${toM(a)} لتتحدث ف الخاص ↞${toM(b)} حتى يتمكنوا من اللعب ويصبحوا أصدقاء ✦*\n\n*✦┇تبدأ أفضل الصداقات بالالعاب 😉┇✦*`, 
    m, false, { mentions: [a, b] });
}

// معلومات المساعدة والأوامر
handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['صداقه','صداقة'];
handler.group = true;

export default handler;