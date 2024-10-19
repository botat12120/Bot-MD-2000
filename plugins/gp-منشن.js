let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata, args, command }) => {
    // Ensure the user is an admin or the group owner
    if (!isAdmin && !isOwner) {
        global.dfail('admin', m, conn);
        throw false;
    }

    // Fetch group participant data and filter admins, members, and owners
    let admins = participants.filter(u => u.admin !== null).map(u => u.id);
    let members = participants.filter(u => u.admin === null && !admins.includes(u.id)).map(u => u.id);
    let owners = participants.filter(u => u.isOwner).map(u => u.id);

    // Set default role type to 'all' (no need for validation)
    let roleType = 'all';

    // Auto-detect language based on group settings (defaults to 'ar')
    let groupLang = groupMetadata.lang || 'ar';
    let translations = {
        en: {
            mention: "📣 Group Mention",
            adminsTitle: "👑 Admins",
            membersTitle: "👥 Members",
            ownersTitle: "👑 Owners",
            totalMembers: "Total Members",
            triggeredBy: "Triggered by",
            date: "Date & Time",
            message: "Message",
        },
        ar: {
            mention: "📣 منشن جماعي",
            adminsTitle: "👑 المشرفين",
            membersTitle: "👥 الأعضاء",
            ownersTitle: "👑 المالكين",
            totalMembers: "📊 إجمالي الأعضاء",
            triggeredBy: "🚀 منشن بواسطة",
            date: "📅 التاريخ والوقت",
            message: "✉️ الرسالة",
        }
    };

    let t = translations[groupLang] || translations.en;

    // Custom or default message with emoji support
    let customMessage = `✉️ الرسالة: ${args.slice(1).join(' ') || 'اجتماع لكل الاعضاء د'}`;
    let now = new Date();

    // Separate date and time
    let datePart = now.toLocaleDateString(groupLang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    let timePart = now.toLocaleTimeString(groupLang === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    });

    // Choose the target participants (all participants)
    let targetParticipants = participants.map(p => p.id);

    // Initialize global.lastMentionTime if not already defined
    if (!global.lastMentionTime) {
        global.lastMentionTime = {};
    }

    // Rate limit: prevent spamming
    if (global.lastMentionTime[m.chat] && (new Date() - global.lastMentionTime[m.chat]) < 10000) {
        conn.reply(m.chat, `🕑 *انتظر قليلًا قبل إرسال منشن جماعي آخر.*`, m);
        return;
    }
    global.lastMentionTime[m.chat] = new Date();

    // Build the message
    let mentionPrefix = `❏ ${t.mention} : *${groupMetadata.subject}*`;
    let mentionSuffix = `*✦━━─━━⌠❄️⌡━━─━━✦*-\n*『❄┇𝚃𝙰𝚁𝙱𝙾𝙾-𝙱𝙾𝚃』*`;

    let message = `
${mentionPrefix}
❏ ${t.totalMembers}: *${participants.length}*
❏ 📅 التاريخ: *${datePart}*
❏ 🕰️ الوقت: *${timePart}*
❏ ${customMessage}

*✦━━─━━⌠❄️⌡━━─━━✦*
*⤹✥ ${t.triggeredBy} ✥⤸* @${m.sender.replace(/@.+/, '')}

*✦━━【${t.adminsTitle}】━━✦*
${admins.map((v, i) => `  ${i + 1}. @${v.replace(/@.+/, '')} │•❈↲`).join('\n')}

*✦━━【${t.membersTitle}】━━✦*
${members
  .filter(v => !admins.includes(v)) // Ensure only non-admin members are included
  .map((v, i) => `  ${i + 1}. @${v.replace(/@.+/, '')} │•❈↲`)
  .join('\n')}

${mentionSuffix}`;

    // Send the mention message to the group
    await conn.sendMessage(m.chat, { text: message, mentions: targetParticipants.concat([m.sender]) });

    // Log the action
    console.log(`📣 Mentioned ${targetParticipants.length} participants by ${m.sender} in group ${groupMetadata.subject} at ${datePart} ${timePart}`);
};

handler.help = ['mentionall <message>'];
handler.tags = ['group'];
handler.command = /^(mentionall|منشن|invocar|tagall|todos)$/i;
handler.admin = true;
handler.group = true;

export default handler;