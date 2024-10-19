import fetch from 'node-fetch';
import fs from 'fs';
let handler = m => m;

handler.all = async function (m, conn) {
  console.log("Handler invoked");

  // منع البوت من الرد على نفسه
  if (m.fromMe) return;

  const fakecontact = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': '• 𝙱𝙾𝚃 𝙴𝙻𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️) ء' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
  
  const vn = './media/الكلب.mp3'; //src sounds
  const vn2 = './media/سقيتك كاس.mp3'; 
  
  let num = "201225655220"; //number owner
  let num2 = "201016948771"; //number bot
  let sender = m.sender.split('@')[0];
  let ownerJid = num + '@s.whatsapp.net'; // JID of the owner
  let ownerName = "اسم المطور"; // اسم المطور

  const ownerReplies = [
    `*عاوز اي من مطوري يا {@${m.pushName}} 🤨*`,
    `*ايه يا معلم، عاوز اي من المطور؟{${m.pushName}}*`,
  ];

  const botReplies = [
    `*احمم أنا هنا يا قلبي 👾*`,
    `*ايوا يا {${m.pushName}} عاوز أي 👀*`,
    `*انا في الخدمة يا {${m.pushName}}*`,
  ];

  let usedOwnerReplies = new Set();
  let usedBotReplies = new Set();

  function getRandomReply(replies, usedReplies) {
    if (usedReplies.size === replies.length) {
      usedReplies.clear(); // Reset if all replies have been used
    }
    let reply;
    do {
      reply = replies[Math.floor(Math.random() * replies.length)];
    } while (usedReplies.has(reply));
    usedReplies.add(reply);
    return reply;
  }
  
  if (m.mentionedJid && m.mentionedJid[0]) {
    let taguser = m.mentionedJid[0].split('@')[0];

    let phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
    console.log(`Mentioned phone number: ${phoneNumber}`);
    
    if (phoneNumber === num) {
      console.log("Owner mentioned");
      await this.sendMessage(m.chat, {audio: {url: vn2}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
      await this.sendMessage(m.chat, {text: getRandomReply(ownerReplies, usedOwnerReplies)}, {quoted: fakecontact, mentions: [ownerJid]});
      return;
    } else if (phoneNumber === num2) {
      console.log("Bot mentioned");
      if (sender === num) {
        console.log("Owner is the sender");
        await this.sendMessage(m.chat, {text: '*احمم أنا هنا ي قلبي 👾*'}, {quoted: fakecontact});
        return;
      } else {
        console.log("Bot is mentioned by someone else");
        await this.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
        await this.sendMessage(m.chat, {text: getRandomReply(botReplies, usedBotReplies)}, {quoted: fakecontact});
        return;
      }
    } 
  } else {
    console.log("No one mentioned");
    return;
  }
}

export default handler;