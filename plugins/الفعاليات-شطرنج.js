import ChessManager from '../lib/chess.js' // مكتبة الشطرنج

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}

    // الأمر لإنشاء غرفة جديدة
    if (command === 'chess') {
        // تحقق إذا كان المستخدم في لعبة نشطة
        if (Object.values(conn.game).find(room => room.id.startsWith('chess') && [room.game.player1, room.game.player2].includes(m.sender))) {
            throw `❏ أنت ما زلت في لعبة شطرنج. لحذف اللعبة اكتب: *${usedPrefix}deletechess*`
        }
        
        if (!text) throw `✳️ أضف اسمًا للغرفة أو رقمًا`

        let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
        
        if (room) {
            m.reply('*تم إيجاد اللاعب الثاني*')
            room.player2 = m.sender
            room.state = 'PLAYING'

            let boardStr = room.game.board.printBoardToString()

            let str = `
اللاعب الأبيض @${room.game.player1.split('@')[0]} هو اللاعب الأول.

${boardStr}

▢ *Room ID*: ${room.id}

❏ *القوانين*
‣ الشطرنج الكلاسيكي: حرك القطع بكتابة الخانة المبدئية والخانة النهائية (مثال: e2 e4)
‣ اكتب *surrender* للانسحاب
            `.trim()

            // إرسال الرسالة للطرفين
            if (room.player1 !== room.player2) await conn.reply(room.player1, str, m, {
                mentions: conn.parseMention(str)
            })
            await conn.reply(room.player2, str, m, {
                mentions: conn.parseMention(str)
            })
        } else {
            // إنشاء غرفة جديدة
            room = {
                id: 'chess-' + (+new Date),
                player1: m.sender,
                player2: '',
                game: new ChessManager(),  // إنشء لعبة شطرنج جديدة باستخدام مكتبة الشطرنج
                state: 'WAITING',
                name: text // حفظ اسم الغرفة
            }

            conn.reply(m.chat, `❏ *انتظر اللاعب الثاني*\nاكتب الأمر التالي للانضمام إلى نفس اللعبة:
❏ *${usedPrefix + command} ${text}*

❏ *الجائزة*: 4999 اكس بي`, m, {
                mentions: conn.parseMention(text)
            })

            conn.game[room.id] = room
        }
    }

    // أمر لتحريك القطع
    if (command === 'move') {
        let room = Object.values(conn.game).find(room => room.id.startsWith('chess') && [room.game.player1, room.game.player2].includes(m.sender));
        if (!room) throw `❏ أنت لست في غرفة شطرنج. ابدأ غرفة جديدة باستخدام: *${usedPrefix}chess [room name]*`;
        
        // تأكد أن اللاعب هو الذي يحين دوره
        if (m.sender !== room.game.currentTurn) throw `❏ ليس دورك!`;
        
        // تأكد من وجود نص الحركة
        if (!text || text.split(' ').length !== 2) throw `✳️ استخدم التنسيق الصحيح للحركة: <المربع_المبدئي> <المربع_النهائي> (مثال: e2 e4)`;

        // تنفيذ الحركة
        let [from, to] = text.split(' ');
        let moveResult = room.game.move(from, to);

        if (!moveResult) throw `❏ الحركة غير صالحة! تأكد من أن القطعة موجودة في المربع المبدئي.`

        // تحقق إذا كانت اللعبة قد انتهت
        let boardStr = room.game.board.printBoardToString();
        let str = `حركت قطعة من ${from} إلى ${to}.`;

        // تحقق إذا كان هناك فائز
        if (room.game.isCheckmate()) {
            str += `\n❏ انتهت اللعبة، الفائز هو @${room.game.winner.split('@')[0]}!`;
            delete conn.game[room.id]; // حذف الغرفة بعد انتهاء اللعبة
        } else {
            str += `\n${boardStr}`;
            room.game.nextTurn(); // الانتقال للدور التالي
        }

        await conn.reply(room.player1, str, m, { mentions: conn.parseMention(str) });
        await conn.reply(room.player2, str, m, { mentions: conn.parseMention(str) });
    }

    // أمر لحذف الغرفة
    if (command === 'deletechess') {
        let room = Object.values(conn.game).find(room => room.id.startsWith('chess') && [room.game.player1, room.game.player2].includes(m.sender));
        if (!room) return conn.sendButton(m.chat, '*[❗] أنت لست في لعبة شطرنج*', wm, null, [['ابدأ غرفة جديدة', `${usedPrefix}chess [room name]`]], m);
        
        delete conn.game[room.id];
        await m.reply('*[ ✔ ] تمت إزالة الغرفة*');
    }
}

// دعم الأوامر
handler.help = ['chess <room name>', 'move <from> <to>', 'deletechess']
handler.tags = ['game']
handler.command = ['chess', 'move', 'deletechess', 'شطرنج', 'تحريك', 'حذفغرفة']

export default handler
