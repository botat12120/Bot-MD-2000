let handler = async (m, { conn, args, text, usedPrefix, command }) => {

    let amount = parseInt(args[0]);
    let color = args[1]?.toLowerCase();
    
    if (args.length < 2) throw `*✳️ استخدام الأمر كالتالي:**\n${usedPrefix + command} <المبلغ> <اللون>*\n\n*مثال: ${usedPrefix + command} 500 احمر*`;
    
    let colores = ['احمر', 'اسود'];
    let selectedColor = colores[Math.floor(Math.random() * colores.length)];
    let user = global.db.data.users[m.sender];
    
    if (isNaN(amount) || amount < 500) throw `*✳️ الحد الأدنى للرهان هو 500 جولد*`;
    if (!colores.includes(color)) throw '✳️ يجب عليك اختيار اللون من القائمة: احمر أو اسود';
    if (user.credit < amount) throw '*✳️ ليس لديك مال كافي*';
    if (amount > 100000) throw `🟥 *لا يمكن استخدام أكثر من 100000 جولد*`;
    
    let result = '';
    if (selectedColor === color) {
        result = `الكرة هبطت على ${selectedColor == 'احمر' ? '🔴' : '⚫'}\n\nلقد فزت بـ ${amount} جولد`;
        user.credit += amount * 2;
    } else {
        result = `الكرة هبطت على ${selectedColor == 'احمر' ? '🔴' : '⚫'}\n\nلقد خسرت ${amount} جولد`;
        user.credit -= amount;
    }
    
    m.reply(result);
}

handler.help = ['spin <amount> <color(red/black)>'];
handler.tags = ['economy'];
handler.command = ['spin', 'play', 'دوران'];

handler.group = true;

export default handler;