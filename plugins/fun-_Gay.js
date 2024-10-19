const handler = async (m, { conn, command, text, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.fun_calculador;

  if (!text) throw `${tradutor.textو26}`;
  const percentages = (500).getRandom();
  let emoji = '';
  let description = '';
  
  switch (command) {
    case 'شاذ':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `${tradutor.textو1[0]} ${text.toUpperCase()} ${tradutor.textو1[1]} ${percentages}% شاذ. ${emoji}*\n${tradutor.textو1[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو2[0]} ${text.toUpperCase()} ${tradutor.textو2[1]} ${percentages}% شاذ. ${emoji}*\n${tradutor.textو2[2]}`;
      } else {
        description = `${tradutor.textو3[0]} ${text.toUpperCase()} ${tradutor.textو3[1]} ${percentages}% شاذ. ${emoji}*\n${tradutor.textو3[2]}`;
      }
      break;
      
    case 'ليزبيان':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `${tradutor.textو4[0]} ${text.toUpperCase()} ${tradutor.textو4[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو4[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو5[0]} ${text.toUpperCase()} ${tradutor.textو5[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو5[2]}`;
      } else {
        description = `${tradutor.textو6[0]} ${text.toUpperCase()} ${tradutor.textو6[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو6[2]}`;
      }
      break;
      
    case 'مراهق':
    case 'مراهقة':
      emoji = '😏💦';
      if (percentages < 50) {
        description = `${tradutor.textو7[0]} ${text.toUpperCase()} ${tradutor.textو7[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو7[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو8[0]} ${text.toUpperCase()} ${tradutor.textو8[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو8[2]}`;
      } else {
        description = `${tradutor.textو9[0]} ${text.toUpperCase()} ${tradutor.textو9[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو9[2]}`;
      }
      break;
      
    case 'خلبوص':
    case 'خلبوصة':
      emoji = '🔥🥵';
      if (percentages < 50) {
        description = `${tradutor.textو10[0]} ${text.toUpperCase()} ${tradutor.textو10[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو10[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو11[0]} ${text.toUpperCase()} ${tradutor.textو11[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو11[2]}`;
      } else {
        description = `${tradutor.textو12[0]} ${text.toUpperCase()} ${tradutor.textو12[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو12[2]}`;
      }
      break;
      
    case 'فاشل':
    case 'فاشلة':
      emoji = '💩';
      if (percentages < 50) {
        description = `${tradutor.textو13[0]} ${text.toUpperCase()} ${tradutor.textو13[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو13[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو14[0]} ${text.toUpperCase()} ${tradutor.textو14[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو14[2]}`;
      } else {
        description = `${tradutor.textو15[0]} ${text.toUpperCase()} ${tradutor.textو15[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو15[2]}`;
      }
      break;
      
    case 'فار':
      emoji = '🐁';
      if (percentages < 50) {
        description = `${tradutor.textو16[0]} ${text.toUpperCase()} ${tradutor.textو16[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو16[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو17[0]} ${text.toUpperCase()} ${tradutor.textو17[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو17[2]}`;
      } else {
        description = `${tradutor.textو18[0]} ${text.toUpperCase()} ${tradutor.textو18[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو18[2]}`;
      }
      break;
      
    case 'شرموطة':
    case 'شرموط':
      emoji = '🫦👅';
      if (percentages < 50) {
        description = `${tradutor.textو19[0]} ${text.toUpperCase()} ${tradutor.textو19[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو19[2]}`;
      } else if (percentages > 100) {
        description = `${tradutor.textو20[0]} ${text.toUpperCase()} ${tradutor.textو20[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو20[2]}`;
      } else {
        description = `${tradutor.textو21[0]} ${text.toUpperCase()} ${tradutor.textو21[1]} ${percentages}% ${command}. ${emoji}*\n${tradutor.textو21[2]}`;
      }
      break;
      
    default:
      throw `${tradutor.textو22}`;
  }
  
  const responses = tradutor.textو23;
  const response = responses[Math.floor(Math.random() * responses.length)];
  const cal = `━━━━⬣ ${tradutor.textو24} ⬣━━━━

—◉ ${description}

*"${response}"*

━━━━⬣ ${tradutor.textو24} ⬣━━━━`.trim();

  async function loading() {
    var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];
    
    let { key } = await conn.sendMessage(m.chat, {text: `${tradutor.textو25}`, mentions: conn.parseMention(cal)}, {quoted: m});
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(cal)}, {quoted: m}); 
    }
    await conn.sendMessage(m.chat, {text: cal, edit: key, mentions: conn.parseMention(cal)}, {quoted: m});         
  }
  
  loading();    
};

handler.help = ['gay2', 'شاذ', 'ليزبيان', 'مراهق', 'خلبوص', 'خلبوصة', 'فاشل', 'فاشلة', 'فار', 'شرموطة', 'شرموط'].map((v) => v + ' @tag | اسم');
handler.tags = ['calculator'];
handler.command = /^(شاذ|ليزبيان|مراهق|مراهقة|خلبوص|خلبوصة|فاشل|فاشلة|فار|شرموطة|شرموط)$/i;
export default handler;