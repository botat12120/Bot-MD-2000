/*
╮────────────────────╭
*│ By :* *`✪┋𝐓𝐀𝐑𝐁𝐎𝐎┋✪`*

*│ `Channel Tarboo` :* https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45

*`تغييرك للحقوق دليل على فشلك ، حاول تتطور وحط حقوقك`* 🤡. 
*╯────────────────────╰*
*/

import axios from 'axios';
import { load } from 'cheerio';
const { proto } = (await import("@whiskeysockets/baileys")).default;

let currentPage = 1; 

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text) throw `- *🔱 قم بأدخال اسم الفيلم للبحث*\n\n- *معلومه الكود من صنع تيربو وجميع حقوق الكود محفوظه له*`;
  
  // Send a reaction indicating search
  await conn.sendMessage(m.chat, { react: { text: "🔎", key: m.key } });

  let نتائج;

  try {
    نتائج = await searchC(text);
  } catch {
    نتائج = await searchTMDB(text);
  }

  if (نتائج.length === 0) throw `- *🔱 لم اجد ما طلبته او لا يوجد نتائج بحث اخري للفيلم المطلوب*`;

  const result = نتائج[0];
  const صورة = result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : 'https://elcomercio.pe/resizer/RJM30xnujgfmaODGytH1rRVOrAA=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BJ2L67XNRRGHTFPKPDOEQ2AH5Y.jpg';

  const messageText = `*🎬 • العنوان:* ${result.title}\n\n🔗 *رابط الفيلم:* ${result.link}`;
  const footer = "";

  // Send message with buttons
  await conn.sendMessage(m.chat, {
    image: { url: صورة }, // Image URL or use other media like video/audio
    caption: messageText,
    footer: footer,
    buttons: [
      { buttonId: `${usedPrefix}${command} ${text} ${currentPage + 1}`, buttonText: { displayText: '🔱 بـحـث اخــر' }, type: 1 },
      { buttonId: result.link, buttonText: { displayText: '🔗 رابــط الفيلم' }, type: 1 },
      { buttonId: 'https://whatsapp.com/channel/0029ValNLOS7IUYNlsgu9X3w', buttonText: { displayText: 'قـنـاة الـبـوت' }, type: 1 }
    ],
    headerType: 4 // Optional: header type for text/media message
  });

  // Send a reaction after success
  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  currentPage++;
};

handler.command = ['سينما_بلس'];
handler.level = 1;
handler.register = true;
export default handler;

// Function to safely load a webpage
const safeLoad = async (url, options = {}) => {
  try {
    const { data: pageData } = await axios.get(url, options);
    const $ = load(pageData);
    return $;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.statusText);
    }
    throw err;
  }
};

// Function to search for movies on a custom site
async function searchC(query, numberPage = 1) {
  const $ = await safeLoad(`https://cuevana3.mu/page/${numberPage}/`, {
    params: { s: query }
  });
  const resultSearch = [];
  $('.results-post > article').each((_, e) => {
    const element = $(e);
    const title = element.find('header > h2').text();
    const link = element.find('.lnk-blk').attr('href');
    resultSearch.push({ title: title, link: link });
  });
  return resultSearch;
}

// Function to search for movies using TMDB API
async function searchTMDB(query, page = 1) {
  const apiKey = '737e5a009698e5a21fb916bb7e75f776';
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: apiKey,
      query: query,
      page: page
    }
  });
  const resultSearch = response.data.results.map(movie => ({
    title: movie.title,
    link: `https://www.themoviedb.org/movie/${movie.id}`,
    poster_path: movie.poster_path
  }));
  return resultSearch;
}