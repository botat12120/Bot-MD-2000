import MessageType from '@adiwajshing/baileys'

let handler = async (m, { conn, usedPrefix, command }) => {
    // البحث عن غرفة الشطرنج التي يوجد بها اللاعب
    let room = Object.values(conn.game).find(room => room.id.startsWith('chess') && [room.game.playerWhite, room.game.playerBlack].includes(m.sender))
    
    // إذا لم يكن اللاعب في لعبة شطرنج
    if (room == undefined) {
        return conn.sendButton(m.chat, '*[❗] انت لست في لعبه شطرنج حالياً*', wm, null, [['ابدأ غرفة جديدة', `${usedPrefix}chess مباراه جديدة`]], m)
    }

    // حذف غرفة الشطرنج
    delete conn.game[room.id]
    await m.reply('*[ ✔ ] تمت إزالة غرفة الشطرنج بنجاح*')
}

handler.command = /^(delchess|حذفشطرنج|delشطرنج|deltictactoe)$/i
handler.fail = null
export default handler
