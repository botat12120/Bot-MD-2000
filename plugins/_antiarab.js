const handler = (m) => m;
handler.before = async function(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
  /* if (m.message) {
    console.log(m.message)
  }*/
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  if (isBotAdmin && chat.antiArab2 && !isAdmin && !isOwner && !isROwner && bot.restrict) {
    if (m.sender.startsWith('1' || '1')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('91' || '91')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('84' || '84')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('63' || '63')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('994' || '994')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('31' || '31')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('49' || '49')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('44' || '44')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('371' || '371')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('880' || '880')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('62' || '62')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('66' || '66')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('86' || '86')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
        if (m.sender.startsWith('7' || '7')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
    if (m.sender.startsWith('92' || '92')) {
      m.reply(`*⚒️ | نظام الحماية : رقمك وهمي تعال انضم بالاساسي*`);
      const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (responseb[0].status === '404') return;
    }
  }
};
export default handler;
