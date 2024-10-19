class SnakeAndLadder {
    constructor() {
        this.snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
        this.ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
        this.players = {};
    }

    movePlayer(player, steps) {
        const currentPosition = this.players[player] || 0;
        let newPosition = currentPosition + steps;

        if (newPosition > 100) {
            newPosition = 100 - (newPosition - 100);
        }

        if (this.snakes[newPosition]) {
            newPosition = this.snakes[newPosition];
        }

        if (this.ladders[newPosition]) {
            newPosition = this.ladders[newPosition];
        }

        this.players[player] = newPosition;
        return newPosition;
    }

    resetGame() {
        this.players = {};
    }
}

const game = new SnakeAndLadder();

const handler = async (m, { conn, text, command }) => {
    if (!text) return await conn.reply(m.chat, `🎲 تحتاج إلى إرسال عدد اللاعبين.\nمثال: ${command} 3`, m);

    const numOfPlayers = parseInt(text);
    if (isNaN(numOfPlayers) || numOfPlayers < 2) return await conn.reply(m.chat, `🎲 يجب أن يكون عدد اللاعبين على الأقل 2.`, m);

    game.resetGame();
    const players = Array.from({ length: numOfPlayers }, (_, i) => `اللاعب_${i + 1}`);

    let currentPlayer = 0;
    let winner = '';
    let gameLog = '';

    while (!winner) {
        const steps = Math.floor(Math.random() * 6) + 1;
        const newPosition = game.movePlayer(players[currentPlayer], steps);
        gameLog += `🎲 ${players[currentPlayer]} تحرك ${steps} خطوات إلى الموضع ${newPosition}\n`;

        if (newPosition === 100) {
            winner = players[currentPlayer];
            gameLog += `🏁 الفائز: ${winner}!`;
            break;
        }
        currentPlayer = (currentPlayer + 1) % numOfPlayers;
    }

    await conn.reply(m.chat, gameLog, m);
};

handler.help = ['الأفعى_والسلم 🐍🏁'].map(v => v + ' [عدد_اللاعبين]');
handler.tags = ['game'];
handler.command = /^(الأفعى_والسلم|سلم_وثعبان)$/i;

export default handler;
