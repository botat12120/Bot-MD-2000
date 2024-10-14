import fetch from 'node-fetch';

let points = 50;
let maxPlayers = 10;
let maxQuestions = 50;
let questionTimeout = 25 * 1000; // 25 ثانيه لو عايز تغيرها براحتك

let handler = async (m, { conn, command }) => {
    let id = m.chat;
    conn.venom3mk = conn.venom3mk ? conn.venom3mk : {};

    if (command === "مسابقه-صور") {
        if (id in conn.venom3mk) {
            conn.reply(m.chat, '*المسابقه قيد العمل استمر في اللعب وفوز*', conn.venom3mk[id][0]);
            throw false;
        }

        conn.venom3mk[id] = [
            await conn.reply(m.chat, '1 - جاوب علي السوأل بسرعه\n2 - جمع  50 نقطه\n3 - اتبع التعليمات', m), [], [], 0, 0, null
        ];

        conn.reply(m.chat, '🎡| المسابقة بدأت اكتب " #انضم-صور" لانضمام الاعبين ', m);
        throw false;
    } else if (command === "انضم-صور") {
        if (!(id in conn.venom3mk)) {
            conn.reply(m.chat, 'لا يوجد مسابقة قائمة حالياً!', m);
            throw false;
        }

        if (conn.venom3mk[id][2].length >= maxPlayers) {
            conn.reply(m.chat, 'اكتمل العدد', m);
            throw false;
        }

        if (conn.venom3mk[id][2].findIndex(player => player.id === m.sender) !== -1) {
            conn.reply(m.chat, 'أنت مسجل بالفعل', m);
            throw false;
        }

        conn.venom3mk[id][2].push({ id: m.sender, points: 0, correctAnswers: 0 });
        conn.reply(m.chat, `تم التسجيل بنجاح! العدد المتبقي للمشاركة: ${maxPlayers - conn.venom3mk[id][2].length}`, m);

        if (conn.venom3mk[id][2].length >= 2) {
            let venom3mk = await (await fetch(`https://raw.githubusercontent.com/DK3MK/worker-bot/main/eye.json`)).json();
            let json = venom3mk[Math.floor(Math.random() * venom3mk.length)];
            conn.venom3mk[id][1] = json;
            let playersList = conn.venom3mk[id][2].map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
            let caption = `━ ───── • ⟐ • ───── ━
*• السؤال رقم ${conn.venom3mk[id][4] + 1}*
*• جاوب بسرعه بحلو*
*• الجائزة:* ⌊ ${points} ⌉ *نقطة* , \`لكل إجابه صحيحه\`
━ ───── • ⟐ • ───── ━`.trim()//\n\n${playersList}
            conn.sendFile(m.chat, json.img, '', caption, m)

            conn.venom3mk[id][5] = setTimeout(() => {
                conn.reply(m.chat, `الوقت انتهى! الإجابة الصحيحة هي: ${json.name}`, conn.venom3mk[id][0]);
                clearTimeout(conn.venom3mk[id][5]);
                conn.venom3mk[id][5] = null;

                setTimeout(async () => {
                    let newJson = venom3mk[Math.floor(Math.random() * venom3mk.length)];
                    conn.venom3mk[id][1] = newJson;
                    conn.venom3mk[id][3]++;
                    conn.venom3mk[id][4]++;

                    let newCaption = `━ ───── • ⟐ • ───── ━
*• السؤال رقم ${conn.venom3mk[id][4] + 1}*
*• جاوب بسرعه بحلو*
*• الجائزة:* ⌊ ${points} ⌉ *نقطة* , \`لكل إجابه صحيحه\`
━ ───── • ⟐ • ───── ━`.trim()//\n\n${playersList}
                    conn.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); // Delay sending new question for better visualization
            }, questionTimeout);
        }
    } else if (command === "حذف-صور") {
        if (!conn.venom3mk[id]) {
            conn.reply(m.chat, 'لـم تـبـدأ الـمـبـاره بـعـد', m);
        } else {
            clearTimeout(conn.venom3mk[id][5]); // Clear timeout if any
            delete conn.venom3mk[id];
            conn.reply(m.chat, 'تـم حـذف الـلـعـبـه بـنـجـاح', m);
        }
    }
};

handler.before = async function (m, { conn }) {
    let id = m.chat;
    this.venom3mk = this.venom3mk ? this.venom3mk : {};

    if (!(id in this.venom3mk)) return;

    let json = this.venom3mk[id][1];
    let players = this.venom3mk[id][2];
    let questionCount = this.venom3mk[id][3];

    if (json && json.name && m.text.toLowerCase() === json.name.toLowerCase()) {
        clearTimeout(this.venom3mk[id][5]); // Clear timeout
        let playerIndex = players.findIndex(player => player.id === m.sender);
        players[playerIndex].points += points;
        players[playerIndex].correctAnswers++;
        questionCount++;

        if (questionCount >= maxQuestions) {
            let sortedPlayers = players.sort((a, b) => b.points - a.points);
            let playersList = sortedPlayers.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة, ${player.correctAnswers} إجابات صحيحة]`).join('\n');
            this.reply(m.chat, `المسابقة انتهت! هنا النتائج:\n\n${playersList}`, m, { mentions: conn.parseMention(playersList) });
            delete this.venom3mk[id];
        } else {
            let venom3mk = await (await fetch(`https://raw.githubusercontent.com/DK3MK/worker-bot/main/eye.json`)).json();
            json = venom3mk[Math.floor(Math.random() * venom3mk.length)];
            this.venom3mk[id][1] = json;
            this.venom3mk[id][3] = questionCount;
            this.venom3mk[id][4]++;
            let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة, ${player.correctAnswers} إجابات صحيحة]`).join('\n');
            let caption = `━ ───── • ⟐ • ───── ━
*• السؤال رقم ${this.venom3mk[id][4] + 1}*
*• جاوب بسرعه بحلو*
*• الجائزة:* ⌊ ${points} ⌉ *نقطة* , \`لكل إجابه صحيحه\`
━ ───── • ⟐ • ───── ━`.trim()//\n\n${playersList}
            this.sendFile(m.chat, json.img, '', caption, m)

 
            this.venom3mk[id][5] = setTimeout(() => {
                this.reply(m.chat, `الوقت انتهى! الإجابة الصحيحة هي: ${json.name}`, this.venom3mk[id][0]);
                clearTimeout(this.venom3mk[id][5]);
                this.venom3mk[id][5] = null;

                setTimeout(async () => {
                    let newJson = venom3mk[Math.floor(Math.random() * venom3mk.length)];
                    this.venom3mk[id][1] = newJson;
                    this.venom3mk[id][3]++;
                    this.venom3mk[id][4]++;

                    let newCaption = `━ ───── • ⟐ • ───── ━
*• السؤال رقم ${this.venom3mk[id][4] + 1}*
*• جاوب بسرعه بحلو*
*• الجائزة:* ⌊ ${points} ⌉ *نقطة* , \`لكل إجابه صحيحه\`
━ ───── • ⟐ • ───── ━`.trim()//\n\n${playersList}
                    this.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); // Delay sending new question for better visualization
            }, questionTimeout);
        }
    }
};
handler.command = /^(مسابقه-صور|انضم-صور|حذف-صور)$/i;

export default handler;
