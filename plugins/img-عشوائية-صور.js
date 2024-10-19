import axios from 'axios';
import cheerio from 'cheerio';
const handler = async (m, {command, conn}) => {
  const apikey = global.keysxxx;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName[who];
  const fgif = m;

  if (command == 'جبل') {
    const anu = await wallpaper('mountain');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "استنى عليا ثانية عشان أجبلك أحلى منظر للجبل...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'ببجي') {
    const pug = ['pubg', 'playerunknowns battlegrounds', 'pubg mobile'];
    const pug2 = pug[Math.floor(Math.random() * pug.length)];
    const anu = await wallpaper(pug2);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "واحدة ببجي سريعة جاية ليك...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'جيمينج') {
    const ga = ['gaming', 'gamers', 'video game'];
    const ga2 = ga[Math.floor(Math.random() * ga.length)];
    const anu = await wallpaper(ga2);
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "جيمينج؟ هاتلعب ولا ايه؟ ثانية كده...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'استايل') {
    const anu = await wallpaper('aesthetic');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "واحدة كده على الاستايل...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'عشوائي') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/wprandom.json`)).data;
    const res2 = await res[Math.floor(res.length * Math.random())];
    conn.sendMessage(m.chat, {image: {url: res2}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'كوفي') {
    const haha = await conn.getFile(`https://coffee.alexflipnote.dev/random`);
    await conn.reply(m.chat, "شوية كافيين كده ع الماشي؟ جايبلك واحد...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'بنتول') {
    const anu = await wallpaper('milk y mocha');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "صورة كيوت كده جايالك...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'كرتون') {
    const anu = await wallpaper('cartoon network');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "كرتون في السريع؟ جايبلك لقطة...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'فضاء') {
    const anu = await wallpaper('cyberspace');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "سايبر إيه؟ في ثانية هتلاقيها...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'تكنولوجيا') {
    const anu = await wallpaper('technology');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "تكنولوجيا بقى؟ خليك جاهز...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'درايمون') {
    const anu = await wallpaper('doraemon');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "درايمون؟ مستنيك كده على السريع...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'هكر') {
    const anu = await wallpaper('hacker');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "هكر؟ ربنا يستر...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'كوكب') {
    const anu = await wallpaper('planet');
    const result = anu[Math.floor(Math.random() * anu.length)];
    const haha = result.image[0];
    await conn.reply(m.chat, "رحلة للفضاء؟ بس بلاش تتوه...", m);
    conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'بروفايل-عشوائي') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomimage/profil?apikey=${apikey}`);
    await conn.reply(m.chat, "واحدة عشوائية لبروفايلك جاية...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'عربية') {
    const haha = await conn.getFile(`https://api.popcat.xyz/car?apikey=${apikey}`);
    await conn.reply(m.chat, "تحب تشوف عربية جديدة؟ واحدة جاية في الطريق...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `${command}`.trim()}, {quoted: m});
}

if (command == 'استايل2') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomimage/aesthetic?apikey=${apikey}`);
    await conn.reply(m.chat, "حاجة كده تفتح النفس...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'انميشن') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomanime/anime?apikey=${apikey}`);
    await conn.reply(m.chat, "انمي على الماشي؟ جايلك اهو...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'عربية2') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomimage/mobil?apikey=${apikey}`);
    await conn.reply(m.chat, "عربية حلوة؟ جاية لك...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'خلفية-موبايل') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomimage/wallhp?apikey=${apikey}`);
    await conn.reply(m.chat, "وول بيبر جميلة للبيت؟ جاية اهو...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}

if (command == 'موتسيكل') {
    const haha = await conn.getFile(`https://api.zahwazein.xyz/randomimage/motor?apikey=${apikey}`);
    await conn.reply(m.chat, "موتسيكل سريع كده؟ جايلك...", m);
    conn.sendMessage(m.chat, {image: {url: haha.data}, caption: `_${command}_`.trim()}, {quoted: m});
}
};
handler.help = ['جبل', 'ببجي', 'جيمينج', 'انمي', 'عشوائي', 'كوفي', 'عربية', 'كرتون', 'فضاء', 'تكنولوجيا', 'درايمون', 'هكر', 'كوكب', 'بروفايل-عشوائي', 'استايل2', 'عربية2', 'خلفية-موبايل', 'موتسيكل'];
handler.tags = ['صور'];
handler.command = ['جبل', 'ببجي', 'جيمينج', 'انمي', 'عشوائي', 'كوفي', 'عربية', 'كرتون', 'فضاء', 'تكنولوجيا', 'درايمون', 'هكر', 'كوكب', 'بروفايل-عشوائي', 'استايل2', 'عربية2', 'خلفية-موبايل', 'موتسيكل'];
export default handler;

async function wallpaper(title, page = '1') {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`).then(({data}) => {
      const $ = cheerio.load(data);
      const hasil = [];
      $('div.grid-item').each(function(a, b) {
        hasil.push({
          title: $(b).find('div.info > a > h3').text(),
          type: $(b).find('div.info > a:nth-child(2)').text(),
          source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
          image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')],
        });
      });
      resolve(hasil);
    });
  });
  }
