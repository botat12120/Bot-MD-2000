import fetch from 'node-fetch'

var handler = async (m, { conn, isOwner, usedPrefix, command, text, }) => {

conn.dropmail = conn.dropmail ? conn.dropmail : {}
let id = 'بريد'

let lister = ['انشاء', 'رساله', 'حذف']

const [feature, inputs, inputs_, inputs__, inputs___] = text.split(' ')
if (!lister.includes(feature)) return m.reply('*❕ مثال:*\n' + usedPrefix + command + ' انشاء\n\n*حدد نوعًا موجودًا*\n' + lister.map((v, index) => '  ○ ' + v).join('\n'))

if (lister.includes(feature)) {
if (feature == 'انشاء') {
try {
let eml = await random_mail();
const timeDiff = new Date(eml[2]) - new Date();
conn.dropmail[id] = [
await m.reply('*ايميل:*\n' + eml[0] + '\n\n' + '*تعريف:*\n' + eml[1] + '\n\n*الصلاحيه:*\n' + msToTime(timeDiff) + '\n\nمثال *' + usedPrefix + command + ' تأكيد الرساله'),
eml[0],
eml[1],
eml[2],
]
} catch (e) {
        
await m.reply(eror);
}
}

if (feature == 'رساله') {
if (!conn.dropmail[id]) return m.reply('*⚠️ لا توجد رسائل، قم بإنشاء بريد إلكتروني أولاً*\n\n❕ مثال\n*' + usedPrefix + command + ' انشاء*')

try {
const eml = await get_mails(conn.dropmail[id][2]);
const teks = eml[0].map((v, index) => {
return `*ايميل [ ${index + 1} ]*
*De* : ${v.fromAddr}
*Para* : ${v.toAddr}

*رساله* : ${v.text}
*مقاس* : ${formatSize(v.rawSize)}
*راس* : ${v.headerSubject}
*تسريح* : ${v.downloadUrl}`.trim()
}).filter((v) => v).join('\n\n________________________\n\n');
await m.reply(teks || '*فارغ*' + '\n\n❕ مثال: *' + usedPrefix + command + ' حذف* لحذف رسائل البريد الإلكتروني')
} catch (e) {
await m.reply(eror)
}
}
if (feature == 'حذف') {
if (!conn.dropmail[id]) return m.reply('*⚠️ لا يوجد بريد إلكتروني صالح*')

try {
delete conn.dropmail[id];
await m.reply('*✅ تم حذف البريد الإلكتروني بنجاح*')
} catch (e) {
await m.reply(eror)
}}}

}
handler.help = ['dropmail']
handler.tags = ['implementos']
handler.command = /^(بريد)$/i

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100)
var seconds = Math.floor((duration / 1000) % 60)
var minutes = Math.floor((duration / (1000 * 60)) % 60)
var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
}

function formatSize(sizeInBytes) {
var units = ['B', 'KB', 'MB', 'GB', 'TB']
let index = 0

while (sizeInBytes >= 1024 && index < units.length - 1) {
sizeInBytes /= 1024
index++
}

return sizeInBytes.toFixed(2) + ' ' + units[index]
}

async function random_mail() {
const link = 'https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D';

try {
const response = await fetch(link)
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`)
}

var data = await response.json()
var email = data['data']['introduceSession']['addresses'][0]['address']
var id_ = data['data']['introduceSession']['id']
var time = data['data']['introduceSession']['expiresAt']

return [email, id_, time]
} catch (error) {
console.log(error)
}
}

async function get_mails(id_) {
const link = `https://dropmail.me/api/graphql/web-test-wgq6m5i?query=query%20(%24id%3A%20ID!)%20%7Bsession(id%3A%24id)%20%7B%20addresses%20%7Baddress%7D%2C%20mails%7BrawSize%2C%20fromAddr%2C%20toAddr%2C%20downloadUrl%2C%20text%2C%20headerSubject%7D%7D%20%7D&variables=%7B%22id%22%3A%22${id_}%22%7D`

try {
const response = await fetch(link)
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
var data = await response.json();
var inbox = data['data']['session']['mails'];

return [inbox, inbox.length]
} catch (error) {
console.log(error)
}}