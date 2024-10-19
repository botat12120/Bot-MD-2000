import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants }) {
    if (!m.messageStubType || !m.isGroup) return true;
    const groupName = (await conn.groupMetadata(m.chat)).subject;
    const groupAdmins = participants.filter((p) => p.admin);
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
    const img = await (await fetch(pp)).buffer();
    const chat = global.db.data.chats[m.chat];
    const mentionsString = [m.sender, m.messageStubParameters[0], ...groupAdmins.map((v) => v.id)];
    const mentionsContentM = [m.sender, m.messageStubParameters[0]];
    const fkontak2 = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'remoteJid': 'status@broadcast',
            'fromMe': false,
            'id': 'Halo'
        },
        'message': {
            'contactMessage': {
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        'participant': '0@s.whatsapp.net'
    };

    if (chat.detect2 && m.messageStubType == 29) {
        let txt1 = `*🎉 مبروك يا جماعة، فيه أدمن جديد في الجروب!* \n\n`;
        txt1 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt1 += `*👤 الأدمن الجديد:* @${m.messageStubParameters[0].split`@`[0]}\n`;
        txt1 += `*👥 اللي عين الأدمن:* @${m.sender.split`@`[0]}`;
        await conn.sendMessage(m.chat, { image: img, caption: txt1, mentions: mentionsString }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 30) {
        let txt2 = `*😢 للأسف، الأدمن ده اتشال من الجروب.* \n\n`;
        txt2 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt2 += `*👤 الأدمن اللي اتشال:* @${m.messageStubParameters[0].split`@`[0]}\n`;
        txt2 += `*👥 اللي شاله:* @${m.sender.split`@`[0]}`;
        await conn.sendMessage(m.chat, { image: img, caption: txt2, mentions: mentionsString }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 27) {
        let txt3 = `*👋 أهلًا وسهلًا، فيه عضو جديد في الجروب!* \n\n`;
        txt3 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt3 += `*👤 العضو الجديد:* @${m.messageStubParameters[0].split`@`[0]}\n`;
        if (!m.sender.endsWith('@g.us')) {
            txt3 += `*👥 اللي ضاف العضو:* @${m.sender.split`@`[0]}`;
        }
        await conn.sendMessage(m.chat, { image: img, caption: txt3, mentions: mentionsContentM }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 28) {
        let txt4 = `*🚫 للأسف، عضو من الأعضاء اتشال من الجروب.* \n\n`;
        txt4 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt4 += `*👤 العضو اللي اتشال:* @${m.messageStubParameters[0].split`@`[0]}\n`;
        if (!m.sender.endsWith('@g.us')) {
            txt4 += `*👥 اللي شاله:* @${m.sender.split`@`[0]}`;
        }
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt4, mentions: mentionsContentM }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 32) {
        let action;
        if (m.messageStubParameters[0] === m.sender) {
            action = 'ساب الجروب';
        } else {
            action = 'اتشال';
        }
        let txt5 = `*⚠️ خلى بالك: فيه عضو ${action} من الجروب.* \n\n`;
        txt5 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt5 += `*👤 العضو اللي مشي:* @${m.messageStubParameters[0].split`@`[0]}\n`;
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt5, mentions: mentionsContentM }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 26) {
        let status;
        if (m.messageStubParameters[0].split`@`[0] === 'on') {
            status = 'مقفول';
        } else {
            status = 'مفتوح';
        }
        let txt6 = `*🔄 إعدادات الجروب اتغيرت يا جماعة.* \n\n`;
        txt6 += `*📛 اسم الجروب:* ${groupName}\n`;
        txt6 += `*🔐 حالة الجروب:* ${'```' + status + '```'}\n`;
        txt6 += `*👥 اللي عمل التغيير:* @${m.sender.split`@`[0]}`;
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt6, mentions: mentionsContentM }, { quoted: fkontak2 });
    }

    if (chat.detect2 && m.messageStubType == 21) {
        let txt7 = `*🔄 اسم الجروب اتغير!* \n\n`;
        txt7 += `*📛 الاسم الجديد:* ${'```' + groupName + '```'}\n`;
        txt7 += `*👥 اللي غير الاسم:* @${m.sender.split`@`[0]}`;
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt7, mentions: mentionsContentM }, { quoted: fkontak2 });
    }
} /* نهاية الدالة */