const handler = async (m, {conn, text, command, usedPrefix, args}) => {
  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';

  // 60000 = 1 دقيقة // 30000 = 30 ثانية // 15000 = 15 ثانية // 10000 = 10 ثانية
  const time = global.db.data.users[m.sender].wait + 10000;
  if (new Date - global.db.data.users[m.sender].wait < 10000) throw `*🕓 سوف تضطر للانتظار ${Math.floor((time - new Date()) / 1000)} ثواني قبل أن تتمكن من اللعب مرة أخرى*`;

  conn.sendButton(m.chat, `*حجرة 🗿, ورقة 📄 مقص ✂️*\n\n*—◉ استخدم الأزرار للعب أو استخدم هذه الأوامر:*\n*◉ ${usedPrefix + command} حجرة*\n*◉ ${usedPrefix + command} ورقة*\n*◉ ${usedPrefix + command} مقص*`, wm, pp, [['حجرة 🗿', `${usedPrefix + command} حجرة`], ['ورقة 📄', `${usedPrefix + command} ورقة`], ['مقص ✂️', `${usedPrefix + command} مقص`]], m);

  let astro = Math.random();
  if (astro < 0.34) {
    astro = 'حجرة';
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'مقص';
  } else {
    astro = 'ورقة';
  }

  const textm = text.toLowerCase();
  if (textm == astro) {
    global.db.data.users[m.sender].exp += 500;
    m.reply(`🔰 تعادل!\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +500 نقطة`);
  } else if (text == 'ورقة') {
    if (astro == 'حجرة') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\nالبوت: ${astro}\n❌ تم خصم -300 نقطة`);
    }
  } else if (text == 'مقص') {
    if (astro == 'ورقة') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\نالبوت: ${astro}\n❌ تم خصم -300 نقطة`);
    }
  } else if (text == 'حجر') {
    if (astro == 'مقص') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\نالبوت: ${astro}\ن🎁 لقد حصلت علي +1000 نقطة`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`☠️ انت تخسر! ❌\ن\nانت: ${text}\نالبوت: ${astro}\ن❌ تم خصم -300 نقطة`);
    }
  }
  global.db.data.users[m.sender].wait = new Date * 1;
};
handler.help = ['ppt'];
handler.tags = ['games'];
handler.command = /^(لاعبني)$/i;
export default handler;