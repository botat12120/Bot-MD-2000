let handler = async (m, { conn, usedPrefix, args, command }) => {
  conn.war = conn.war || {}
  conn.war2 = conn.war2 || {}

  if (!args[0] || args[0] == "help") {
    return m.reply(`*❏ W A R - Z O N E *

[1] War Zone هي لعبة حرب بنظام هجوم الأدوار أو الهجوم بالتناوب
[2] يمكن أن تبدأ اللعبة بـ 1 ضد 1 وحتى 5 ضد 5
[3] رأس المال الحربي هو غنائم الحرب إذا فاز فريقك
[4] سيحصل كل لاعب على 5000 نقطة صحة (نقاط صحية)
[5] يعتمد نجاح الهجوم على مستواك ومستوى العدو الذي تهاجمه
[6] فرصة الهجوم هي 40 ثانية، وأكثر من ذلك يعتبر AFK (تخفيض 2500 حصان)
[7] سيفوز الفريق إذا خسر الفريق المنافس كل (نقاط الصحة <= 0) وحصل على غنائم الحرب

*❏ C O M M A N D S *
*${usedPrefix + command} انضم A/B* = الانضمام إلى اللعبة
*${usedPrefix + command} يسار* = اللعبة اليسرى
*${usedPrefix + command} مال 10xx* = الرهان على المال
*${usedPrefix + command} لاعب* = لعبة لاعب
*${usedPrefix + command} ابدا* = بدء اللعبة`)
  }

  // ... متابعة الكود الباقي بناءً على التحسينات المقترحة ...

}

handler.help = ['war']
handler.tags = ['game']
handler.command = /^(حرب)$/i
handler.group = true
export default handler
