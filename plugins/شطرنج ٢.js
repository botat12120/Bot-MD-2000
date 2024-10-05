import { format } from 'util'
import Chess from 'chess.js' // استيراد مكتبة الشطرنج

let debugMode = !1

let winScore = 4999
let playScore = 99

export async function before(m) {
    let ok
    let isWin = !1
    let isTie = !1
    let isSurrender = !1
    this.game = this.game ? this.game : {}
    
    // البحث عن غرفة الشطرنج
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('chess') && [room.game.playerWhite, room.game.playerBlack].includes(m.sender) && room.state == 'PLAYING')
    
    if (room) {
        // التأكد من النص المدخل (حركة الشطرنج أو انسحاب)
        if (!/^([a-h][1-8] [a-h][1-8]|(me)?nyerah|surr?ender)$/i.test(m.text))
            return !0
        isSurrender = !/^[a-h][1-8] [a-h][1-8]$/.test(m.text)
        
        // التأكد من دور اللاعب
        if (m.sender !== room.game.turn()) { // إذا لم يكن دور اللاعب
            if (!isSurrender)
                return !0
        }

        if (debugMode)
            m.reply('[DEBUG]\n' + format({
                isSurrender,
                text: m.text
            }))

        // إذا كان اللاعب قد استسلم
        if (isSurrender) {
            isWin = true
        } else {
            // محاولة تنفيذ الحركة
            let move = room.game.move(m.text)
            if (!move) { // إذا كانت الحركة غير صحيحة
                m.reply('حركة غير صالحة')
                return !0
            }
        }

        // تحقق من حالة اللعبة بعد الحركة
        if (room.game.in_checkmate()) {
            isWin = true
        } else if (room.game.in_draw()) {
            isTie = true
        }

        // عرض اللوحة الحالية
        let board = renderBoard(room.game)

        // إذا كان اللاعب قد استسلم أو كان هناك فائز
        let winner = isSurrender ? room.game.turn() : m.sender
        let str = `
${isWin ? `@${winner.split('@')[0]} انت الفائز 🎉 *+${winScore} XP*` : isTie ? `انتهت اللعبة بالتعادل *+${playScore} XP*` : `لقد حان دورك (@${room.game.turn() === 'w' ? room.game.playerWhite.split('@')[0] : room.game.playerBlack.split('@')[0]})`} 

${board}

▩ *اللاعب الأبيض* ♔ : @${room.game.playerWhite.split('@')[0]} 
▩ *اللاعب الأسود* ♚ : @${room.game.playerBlack.split('@')[0]}

اكتب *surrender* للانسحاب 
`.trim()

        let users = global.global.db.data.users
        if ((room.game.turn() === 'w' ? room.x : room.o) !== m.chat)
            room[room.game.turn() === 'w' ? 'x' : 'o'] = m.chat
        
        if (room.x !== room.o) {
            await this.reply(room.x, str, m, {
                mentions: this.parseMention(str)
            })
            await this.reply(room.o, str, m, {
                mentions: this.parseMention(str)
            })
        }

        // منح النقاط وإزالة اللعبة بعد انتهاء المباراة
        if (isTie || isWin) {
            users[room.game.playerWhite].exp += playScore
            users[room.game.playerBlack].exp += playScore
            if (isWin)
                users[winner].exp += winScore - playScore
            if (debugMode)
                m.reply('[DEBUG]\n' + format(room))
            delete this.game[room.id]
        }
    }
    return !0
}

// دالة لعرض لوحة الشطرنج الحالية
function renderBoard(game) {
    let board = game.board()
    let str = ''
    for (let row of board) {
        for (let square of row) {
            str += square ? (square.color === 'w' ? square.type.toUpperCase() : square.type) : '⬜️'
            str += ' '
        }
        str += '\n'
    }
    return str
}
