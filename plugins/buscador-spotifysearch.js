import axios from 'axios';
import { load } from 'cheerio';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🔴 لازم تدخل اسم الفنان أو الأغنية!\n🔹 مثال:\n${usedPrefix + command} tini`;

  try {
    // جلب النتائج من Spotify
    let resultados = await spotifyxv(text);
    
    if (resultados.length === 0) throw `⚠️ مع الأسف مش لاقي حاجة تطابق بحثك 😔`;
    
    let cards = [];
    for (let i = 0; i < Math.min(resultados.length, 5); i++) {
      const result = resultados[i];
      const albumInfo = await obtenerAlbumInfo(result.album);

      // تجهيز رسالة الصورة
      const imageMessage = await generateWAMessageContent({
        image: { url: albumInfo.imagen }
      }, { upload: conn.waUploadToServer });

      // إضافة التفاصيل لكل أغنية في الكاروسيل
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `*🎶 العنوان:* ${result.nombre}\n👤 *الفنانين:* ${result.artistas.join(', ')}\n🗂️ *الألبوم:* ${result.album}\n⏰ *المدة:* ${timestamp(result.duracion)}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "🔎 Spotify Search"
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: true,
          imageMessage: imageMessage.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
          name: "cta_url",
          buttonParamsJson: `{"display_text":"رابط الأغنية 🎶","Url":"${result.link}"}`
        }]
      })
    });
  }

    // إنشاء رسالة الكاروسيل
    const interactiveMessage = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🎶 نتائج البحث عن: ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "🔎 Spotify Search"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, { quoted: m });

    // إرسال الرسالة
    await conn.relayMessage(m.chat, interactiveMessage.message, { messageId: interactiveMessage.key.id });
  } catch (e) {
    await conn.reply(m.chat, `❗ حدث خطأ أثناء البحث. حاول مرة أخرى. ${usedPrefix + command}\n\n${wm}`, m);
    console.log(`❗❗ خطأ: ${usedPrefix + command} ❗❗`);
    console.log(e);
    handler.limit = false;
  }
}

handler.command = /^(بحث_سبوتيفاي)$/i;
handler.limit = 1;
handler.level = 1;
handler.register = true;

export default handler;

// وظائف مساعدة لجلب البيانات من Spotify
async function spotifyxv(query) {
  const token = await obtenerTokenSpotify();
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.data.tracks.items.map(item => ({
    nombre: item.name,
    artistas: item.artists.map(artist => artist.name),
    album: item.album.name,
    duracion: item.duration_ms,
    url: item.external_urls.spotify
  }));
}

// وظيفة للحصول على التوكن الخاص بـ Spotify
async function obtenerTokenSpotify() {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + Buffer.from("cda875b7ec6a4aeea0c8357bfdbab9c2:c2859b35c5164ff7be4f979e19224dbe").toString("base64")
      }
    });
    return response.data.access_token;
  } catch (err) {
    console.error("Error fetching token:", err);
  }
}

// جلب معلومات الألبوم
async function obtenerAlbumInfo(albumName) {
  const token = await obtenerTokenSpotify();
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(albumName)}&type=album`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const albums = response.data.albums.items;
  if (albums.length > 0) {
    const album = albums[0];
    return { nombre: album.name, imagen: album.images[0].url };
  }
  return { nombre: albumName };
}

// تحويل المدة الزمنية
function timestamp(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}