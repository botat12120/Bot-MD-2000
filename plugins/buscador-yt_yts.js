import ytSearch from "yt-search"
const handler = async (m, { conn, usedPrefix, args, command }) => {
  try {
    const text = args.length >= 1 ? args.slice(0).join(" ") : (m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;
    
    if (!text || text.length < 3) return m.reply(`💬 أدخل نصًا أطول قليلاً أو قم بالرد على رسالة بالنص الذي تريد البحث عنه على YouTube.\n🌐 مثال على الاستخدام:\n*${usedPrefix + command} GataBot*`);

    const { all: [bestItem, ...moreItems] } = await ytSearch(text);
    const videoItems = moreItems.filter(item => item.type === 'video');

    if (videoItems.length === 0) {
      return conn.reply(m.chat, `❌ لم يتم العثور على نتائج لـ "${text}". حاول البحث باستخدام كلمات أخرى.`, m);
    }

    // تحسين التنسيق العربي للنتائج
    const formattedData = {
      title: "                *[ نتائج بحث YouTube ]*\n",
      rows: [{
        title: "الفيديو الأكثر شيوعًا",
        highlight_label: "الأكثر شيوعًا",
        rows: [{
          header: bestItem.title,
          id: `${usedPrefix}yta ${bestItem.url}`,
          title: bestItem.description || "لا يوجد وصف",
          description: ""
        }]
      }, {
        title: "المزيد من النتائج",
        rows: videoItems.map(({
          title,
          url,
          description
        }, index) => ({
          header: `${index + 1}). ${title}`,
          id: `.yta ${url}`,
          title: description || "لا يوجد وصف",
          description: ""
        }))
      }]
    };

    const emojiMap = {
      type: "🎥",
      videoId: "🆔",
      url: "🔗",
      title: "📺",
      description: "📝",
      image: "🖼️",
      thumbnail: "🖼️",
      seconds: "⏱️",
      timestamp: "⏰",
      ago: "⌚",
      views: "👀",
      author: "👤"
    };
    
    const caption = Object.entries(bestItem).map(([key, value]) => {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      const valueToDisplay = key === 'views' 
        ? new Intl.NumberFormat('ar', { notation: 'compact' }).format(value) 
        : key === 'author' 
          ? `📋 الاسم: ${value.name || 'غير معروف'}\n🔗 الرابط: ${value.url || 'غير معروف'}` 
          : value || 'غير معروف';
      return ` ${emojiMap[key] || '🔹'} *${formattedKey}:* ${valueToDisplay}`;
    }).join('\n');

    await conn.sendButtonMessages(m.chat, [
      [formattedData.title + caption, wm, bestItem.image || bestItem.thumbnail || logo, [
        ['📜 قائمة الخيارات', usedPrefix + 'menu']
      ], null, [
        ['🌐 القناة الرسمية', canal2]
      ],
      [["🔍 النتائج هنا", formattedData.rows]]
      ]], m);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `🚨 حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى لاحقًا أو الإبلاغ عن المشكلة.`, m);
  }
}

handler.command = /^يوتيوب$/i
export default handler;