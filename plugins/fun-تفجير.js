const handler = async (m, { conn, command, text }) => {
  const lovePercentage = Math.floor(Math.random() * 100);
  const isHighLove = lovePercentage >= 50;
  const loveMessages = [
    "💥🌟 ¡Explosión cósmica de amor! ¡Ve y confiesa tus sentimientos ahora mismo!",
    "🚀🌠 ¡Una chispa intergaláctica entre ustedes dos! ¡Atrévete a intentarlo!",
    "🪐✨ ¡Puede haber algo especial aquí! ¡Dale una oportunidad en la galaxia!",
    "🌌☕ Hmm, el amor está en el aire cósmico. ¡Quizás un café estelar juntos!",
    "🌟💖 ¡Las estrellas brillan con potencial romántico! ¡Haz tu movimiento galáctico!",
    "📜🚀 ¡Una épica historia de amor podría estar esperando ser escrita en las estrellas!",
    "⏳🌌 No subestimes el poder del tiempo y la paciencia en el amor cósmico. ¡Grandes cosas vienen!",
    "🌍💫 ¡Recuerda que el amor es un viaje estelar, y cada paso es valioso, sin importar la distancia!",
    "🌠💞 ¡Las conexiones cósmicas fuertes pueden convertirse en relaciones intergalácticas hermosas!",
    "💫🔮 ¡El amor verdadero a menudo requiere tiempo y esfuerzo estelar. ¡No renuncies nunca!",
  ];
  const notSoHighLoveMessages = [
    "🌌🚀 A veces, la amistad es el comienzo de algo estelar, pero no siempre se convierte en amor cósmico.",
    "🌟👫 El amor no lo es todo, ¡la amistad estelar también es genial! Mantengan su vínculo especial.",
    "✨💬 Recuerda que las mejores relaciones comienzan con una amistad cósmica. ¡No subestimen su conexión!",
    "⏳🛸 A veces, el amor puede crecer con el tiempo estelar. ¡Sigan fortaleciendo su conexión cósmica!",
    "🌠🌟 La vida es una sorpresa intergaláctica. ¡Quién sabe qué depara el futuro estelar! No pierdan la esperanza.",
    "💫💖 Aunque el amor no florezca como esperaban, su conexión cósmica sigue siendo valiosa.",
    "🪐🔭 Los corazones pueden tardar en sincronizarse, pero eso no disminuye lo especial que son juntos en la galaxia.",
    "🌌🎉 A pesar de los desafíos del amor cósmico, su amistad estelar es un regalo que merece ser celebrado.",
    "✨🌠 El tiempo puede revelar cosas sorprendentes. ¡Sigamos explorando juntos en el universo!",
    "🪐🌌 La vida está llena de giros inesperados. ¡Permanezcan abiertos a las posibilidades estelares!",
  ];

  const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
  const loveMessage = isHighLove ? getRandomMessage(loveMessages) : getRandomMessage(notSoHighLoveMessages);

  // تعريف الدوال getRandomAge و getRandomWeight
  const getRandomAge = () => Math.floor(Math.random() * 100) + 1;
  const getRandomWeight = () => (Math.random() * 100).toFixed(2);

  const response = 
    `━━━━━━━⬣ *🚀🌌 انفجار كوني لجروب* ⬣━━━━━━━\n` +
    `*💫 معلومات لجروب الذي تم تفجيره 💫*\n` +
    `*الاسم:* ${text}\n` +
    `*الموقع:* واتساب\n` +
    `*العمر:* ${getRandomAge()} مليار سنة\n` +
    `*الوزن:* ${getRandomWeight()} كتلة كونية\n` +
    `*الرمز السري:* أعضاء الأجرام السماوية\n` +
    `*IPV6:* 7e4:8fe3:1265:ff9f:42b:سعادة:مضحك:وقت%42\n` +
    `*UPNP:* متاح في جميع الأبعاد الكونية\n` +
    `*DMZ:* 42.42.42.42\n` +
    `*عنوان الكوني MAC:* 42:42:42:42:42:42\n` +
    `*مزود الخدمة:* شركة المجرات واتساب\n` +
    `*DNS:* 42.42.42.42\n` +
    `*DNS البديل:* 42.42.42.1\n` +
    `*DNS فائض الأبعاد:* DNS جهاز كمبيوتر مارك الفضائي\n` +
    `*WAN:* 42.42.42.42\n` +
    `*نوع WAN:* محرك الانطلاق الكوني\n` +
    `*بوابة:* 42.0.0.1\n` +
    `*قناع الشبكة:* 255.255.255.0\n` +
    `*منافذ UDP المفتوحة:* 8080، 8081، 8082\n` +
    `*منافذ TCP المفتوحة:* 80، 443\n` +
    `*بائع الموجه:* موجه المرح الكوني\n` +
    `*نموذج الجهاز:* ExoPC-42\n` +
    `*نوع الاتصال:* محرك الانطلاق الكوني\n` +
    `*عدد قفزات ICMP:* 42، 42، 42\n` +
    `*عنوان الكوني MAC الخارجي:* 42:42:42:42:42:42\n` +
    `*قفزات المودم للجروب:* 42.42.42.42\n` +
    `*في واتساب الذي تم تفجيره:* مشرفين، دخول، خروج، بوابة 9\n` +
    `*HTTP:* عطارد:42 -> لجروب:43\n` +
    `*HTTP:* مارس:42 -> لجروب:44\n` +
    `*HTTP:* زحل:42 -> لجروب:45\n` +
    `*UDP:* كيوتو:42 -> الكون:46\n` +
    `*TCP:* الأرض:42 -> لجروب:47\n` +
    `*TCP:* زهرة:42 -> لجروب:48\n` +
    `*TCP:* معدل:42 -> ضرر:49\n` +
    `*عنوان لجروب MAC:* 42:42:42:42:42:42\n` +
    `*قفزات لجروب للمودم:* 42، 42، 42*\n` +
    `━━━━━━━⬣ *🚀🌌 انفجار كوني لجروب* ⬣━━━━━━━`;

  async function loading() {
    var hawemod = [
      "☠️ تم تفعيل المحرك الكوني...",
      "🌚 جاري تحصين النجم المشرق...",
      "🫡 تم تحصين النجم...",
      "🫵🏻 جاري تبنيد مشرفين الأبعاد...",
      "🗣   تم تبنيد مشرفين المجرة...",
      "🌌  جاري حساب معدل الأضرار الكونية...",
      "🦾 حدث خطأ أثناء التبني، تم تصحيح الخطأ بواسطة فريق الأجرام...",
      "🚀   تم حساب المعدل وجاري عرض النتائج الكونية...",
      "✨ نجاح عملية تفجير الجروب الكوني!"
    ];
    
    let { key } = await conn.sendMessage(m.chat, { text: `_*🚀🌌 ابدأ التفجير الكوني للجروب 🌠*_`, mentions: conn.parseMention(response) }, { quoted: m });
    
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    
    // تأخير ثانيتين قبل إرسال الرسالة الثانية
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    const neww = 100; // قم بتحديث هذا الرقم وفقًا للعدد الجديد
    const old = 50; // قم بتحديث هذا الرقم وفقًا للعدد القديم
    const additionalMessage = `✨🌌 اكتمل تبنيد مشرفين الأبعاد ${neww - old} ولم يتبقى سوى كانا! 🛸🌠`;
    await conn.sendMessage(m.chat, { text: additionalMessage, mentions: conn.parseMention(response) }, { quoted: m });

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^اخترق|اختراق-كوني|تفجير|مرح-كوني/i;
handler.rowner = false;

export default handler;