import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        
        if (/webp|image|video/g.test(mime)) {
            if (/video/g.test(mime)) {
                if ((q.msg || q).seconds > 10) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] الفيديو ماينفعش يكون طوله أكتر من 10 ثواني!*')
            }
            
            let img = await q.download?.()
            if (!img) throw '*[❗𝐈𝐍𝐅𝐎❗] لازم تبعت فيديو أو صورة، أو تحط الصورة في البوست، الصورة هتتحول لاستكر. لو محتاج تحط صورة بصيغة .jpg، هيتحول لاستكر. لازم تبعت صورة أو تستخدم الأمر ' + usedPrefix + command + '*'
            
            let out
            try {
                stiker = await sticker(img, false, global.packname, global.author)
            } catch (e) {
                console.error(e)
            } finally {
                if (!stiker) {
                    if (/webp/g.test(mime)) out = await webp2png(img)
                    else if (/image/g.test(mime)) out = await uploadImage(img)
                    else if (/video/g.test(mime)) out = await uploadFile(img)
                    if (typeof out !== 'string') out = await uploadImage(img)
                    stiker = await sticker(false, out, global.packname, global.author)
                }
            }
        } else if (args[0]) {
            if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
            else return m.reply('*[❗𝐈𝐍𝐅𝐎❗] اللينك اللي بعتته مش صحيح، لازم يكون بصيغة .jpg. مثال: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*')
        }
    } catch (e) {
        console.error(e)
        if (!stiker) stiker = e
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        else throw '*الأمر ده مخصص لتحويل صورة أو فيديو كامل لاستكر، يعني من غير تقطيع، علشان تحصل على استكر كامل جميل!*'
    }
}

handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^استيكر|لستيكر$/i

export default handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}