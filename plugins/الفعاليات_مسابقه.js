import fetch from 'node-fetch';

let points = 50;
let maxPlayers = 5;

let handler = async (m, { conn, command, usedPrefix }) => {
    let id = m.chat;
    conn.tekateki1 = conn.tekateki1 ? conn.tekateki1 : {};

    if (command === "مسابقه") {
        if (id in conn.tekateki1) {
            conn.reply(m.chat, 'المسابقه شغاله ينجم', conn.tekateki1[id][0]);
            throw false;
        }

        conn.tekateki1[id] = [
            await conn.reply(m.chat, '1 - جاوب علي السوأل بسرعه\n2 - جمع  50 نقطه\n3 - اتبع التعليمات', m), [], []
        ];

        conn.reply(m.chat, '🎡| المسابقة بدأت اكتب " #انضمام" لانضمام الاعبين ', m);
        throw false;
    } else if (command === "انضمام") {
        if (!(id in conn.tekateki1)) {
            conn.reply(m.chat, 'لا يوجد مسابقة قائمة حالياً!', m);
            throw false;
        } else if (command === "حذف-مسابقه")
if (!tekateki1.isActive) {
        m.reply('لـم تـبـدأ الـمـبـاره بـعـد');
      } else {
        tekateki1.isActive = false;
        tekateki1.players = {};
        m.reply(`تـم حـذف الـلـعـبـه بـنـجـاح`);
}

        if (conn.tekateki1[id][2].length >= maxPlayers) {
            conn.reply(m.chat, 'اكتمل العدد', m);
            throw false;
        }

        if (conn.tekateki1[id][2].findIndex(player => player === m.sender) !== -1) {
            conn.reply(m.chat, 'أنت مسجل بالفعل', m);
            throw false;
        }

        conn.tekateki1[id][2].push(m.sender);
        conn.reply(m.chat, 'تم التسجيل بنجاح!', m);

        if (conn.tekateki1[id][2].length >= 2) {
            let tekateki1 = await (await fetch(`https://raw.githubusercontent.com/Dnaielle/Dani/master/src/game/acertijo.json?token=GHSAT0AAAAAACN6WEVVWRUK3JFAF4I3UI5AZPO5AOA`)).json();
            let json = tekateki1[Math.floor(Math.random() * tekateki1.length)];
            conn.tekateki1[id][1] = json;
            let playersList = conn.tekateki1[id][2].map((player, i) => `${i + 1} - @${player.split('@')[0]} [${points} نقطة]`).join('\n');
            let question = `السؤال: ${json.question}\n\n${playersList}`;
            conn.reply(m.chat, question, m);
        }
    }
};

handler.before = async function (m) {
    let id = m.chat;
    this.tekateki1 = this.tekateki1 ? this.tekateki1 : {};

    if (!(id in this.tekateki1)) return;

    let json = this.tekateki1[id][1];
    let players = this.tekateki1[id][2];

    if (m.text.toLowerCase().includes("انضمام") && players.length >= 2) {
        let playersList = players.map((player, i) => `${i + 1} - @${player.split('@')[0]} [${points} نقطة]`).join('\n');
        let question = `السؤال: ${json.question}\n\n${playersList}`;
        this.sendText(m.chat, question);
    } else if (command === "حذف-مسابقه")
if (!tekateki1.isActive) {
        m.reply('لـم تـبـدأ الـمـبـاره بـعـد');
      } else {
        tekateki1.isActive = false;
        tekateki1.players = {};
        m.reply(`تـم حـذف الـلـعـبـه بـنـجـاح`);
}
};

handler.command = /^(مسابقه|انضمام)$/i;

export default handler;
