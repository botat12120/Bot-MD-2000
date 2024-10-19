const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

const chessboard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'board') {
        let board = '```\n';
        for (let row = 0; row < chessboard.length; row++) {
            board += chessboard[row].join(' ') + '\n';
        }
        board += '```';
        message.channel.send(board);
    }
        // تحريك القطعة
        if (command === 'move') {
    const from = args[0];
    const to = args[1];

    // التحقق مما إذا كانت القيم المدخلة صحيحة
    if (!isValidSquare(from) || !isValidSquare(to)) {
        message.channel.send('الرجاء إدخال مربعات شطرنج صحيحة. مثال: `!move e2 e4`');
        return;
    }

    // الحصول على موقع القطعة التي تم اختيارها
    const piece = getPieceAtSquare(from);

    // التحقق مما إذا كانت هناك قطعة في الموقع المحدد
    if (piece === '.') {
        message.channel.send('لا يوجد قطعة في الموقع المحدد.');
        return;
    }

    // تحريك القطعة إلى الموقع الجديد
    movePiece(from, to, piece);

    // إرسال رسالة التأكيد
    message.channel.send(`تم تحريك ${piece} من ${from} إلى ${to}.`);
}

// التحقق مما إذا كانت المربعات متوافقة مع شطرنج
function isValidSquare(square) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = square.charCodeAt(1) - '1'.charCodeAt(0);
    return file >= 0 && file < 8 && rank >= 0 && rank < 8;
}

// الحصول على القطعة في المربع المحدد
function getPieceAtSquare(square) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = square.charCodeAt(1) - '1'.charCodeAt(0);
    return chessboard[rank][file];
}

// تحريك القطعة إلى الموقع الجديد
function movePiece(from, to, piece) {
    const fromFile = from.charCodeAt(0) - 'a'.charCodeAt(0);
    const fromRank = from.charCodeAt(1) - '1'.charCodeAt(0);
    const toFile = to.charCodeAt(0) - 'a'.charCodeAt(0);
    const toRank = to.charCodeAt(1) - '1'.charCodeAt(0);
    chessboard[toRank][toFile] = piece;
    chessboard[fromRank][fromFile] = '.';
}

});

client.login('YOUR_DISCORD_TOKEN');