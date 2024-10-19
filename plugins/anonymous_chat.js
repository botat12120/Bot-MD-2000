async function handler(m, { usedPrefix, command }) {
  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};

  switch (command) {
    case 'next':
    case 'leave': {
      let room = Object.values(this.anonymous).find(room => room.check(m.sender));
      if (!room) return this.sendMessage(m.chat, { text: "لا توجد غرفة مطابقة.\nيرجى بدء غرفة جديدة." }, { quoted: m });
      m.reply("تم الانتقال إلى المستخدم التالي.");
      let other = room.other(m.sender);
      if (other) await this.sendMessage(other, { text: "تم الانتقال إلى مستخدم جديد." }, { quoted: m });
      delete this.anonymous[room.id];
      if (command === 'leave') break;
    }
    case 'start': {
      if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendMessage(m.chat, { text: "أنت بالفعل في غرفة." }, { quoted: m });
      let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender));
      if (room) {
        await this.sendMessage(room.a, { text: "شريكك جاهز للدردشة." }, { quoted: m });
        room.b = m.sender;
        room.state = 'CHATTING';
        await this.sendMessage(m.chat, { text: "تمت إضافة شريكك. يمكنك بدء الدردشة." }, { quoted: m });
      } else {
        let id = + new Date();
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: '',
          state: 'WAITING',
          check: function (who = '') {
            return [this.a, this.b].includes(who);
          },
          other: function (who = '') {
            return who === this.a ? this.b : who === this.b ? this.a : '';
          },
        };
        await this.sendMessage(m.chat, { text: "تم إنشاء غرفة جديدة. انتظر حتى ينضم شريكك." }, { quoted: m });
      }
      break;
    }
  }
}

handler.help = ['start', 'leave', 'next'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave', 'next'];
handler.private = true;
export default handler;