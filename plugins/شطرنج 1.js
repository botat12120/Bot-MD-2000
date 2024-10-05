import Chess from '../chess.js' // استيراد مكتبة الشطرنج

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}
    
    // التأكد إذا كان اللاعب موجود بالفعل في لعبة شطرنج
    if (Object.values(conn.game).find(room => room.id.startsWith('chess') && [room.game.playerWhite, room.game.playerBlack].includes(m.sender))) {
        throw `❏ انت مازلت في اللعبة، لحذف اللعبة اكتب: *${usedPrefix}حذف*`
    }

    // إذا لم يتم إدخال رقم الغرفة
    if (!text) throw `✳️ يجب وضع رقم للغرفة`

    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))

    if (room) {
        m.reply('*تم إيجاد اللاعب الآخر*')
        room.black = m.chat
        room.game.playerBlack = m.sender
        room.state = 'PLAYING'

        let boardStr = renderBoard(room.game)

        let str = `
انتظر @${room.game.currentTurn.split('@')[0]} هو اللاعب الأول (الأبيض)

${boardStr}

▢ *Room ID* ${room.id}

❏ *القوانين*
‣ حرك قطعك وفقًا لقواعد الشطرنج ‣ اكتب *surrender* للانسحاب
`.trim()
        if (room.white !== room.black) {
            await conn.reply(room.white, str, m, {
                mentions: conn.parseMention(str)
            })
        }
        await conn.reply(room.black, str, m, {
            mentions: conn.parseMention(str)
        })
    } else {
        room = {
            id: 'chess-' + (+new Date),
            white: m.chat,
            black: '',
            game: new Chess(), // إنشاء لعبة شطرنج جديدة
            playerWhite: m.sender,
            state: 'WAITING'
        }
        if (text) room.name = text

        conn.reply(m.chat, `❏ *تم إنشاء غرفة انتظار*\nاكتب الأمر التالي للدخول في نفس اللعبة:
❏ *${usedPrefix + command} ${text}*

❏ *الجائزة: 9999* XP`, m, {
            mentions: conn.parseMention(text)
        })

        conn.game[room.id] = room
    }
}

// دالة لعرض اللوحة
function renderBoard(game) {
    let board = game.board()
    let boardStr = ''
    for (let row of board) {
        for (let square of row) {
            boardStr += square ? (square.type === 'p' ? '♙' : square.type.toUpperCase()) : '⬜️'
            boardStr += ' '
        }
        boardStr += '\n'
    }
    return boardStr
}

handler.help = ['chess <tag number>']
handler.tags = ['game']
handler.command = ['chess', 'شطرنج']

export default handler
