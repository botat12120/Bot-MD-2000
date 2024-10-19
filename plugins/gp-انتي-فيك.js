import fs from 'fs'
let numerosPrefijos, contenido, reply

const handler = async (m, { conn, command, text, usedPrefix, isOwner, isROwner, isAdmin }) => {
if (!isOwner || !isROwner || !isAdmin) return m.reply(`🚫 *معندكش صلاحيات لاستخدام الأمر ده*`)

if (!text || !/\d/.test(text)) {
m.reply(`ℹ️ *ضيف البادئة بتاعت كود البلد أو اكتب رقم المستخدم اللي عايز تعمله تعديل.*\n\n> لو فيه أكتر من رقم، افصلهم بفاصلة (,)\n\n*مثال:*\n- *${usedPrefix + command}* +20\n- *${usedPrefix + command}* +20, +212, @tag, +num\n\n⚠️ *خلي بالك، بمجرد ما تحط الأرقام دي، المستخدمين اللي عندهم البادئات دي هيتم حذفهم لو انضموا أو كتبوا في الجروب*`)
return
}
await obtenerPrefijos(text)  
async function obtenerPrefijos(input) {
const prefijos = input.split(',').map(prefijo => prefijo.trim())
const prefijosLimpios = prefijos.map(prefijo => {
let prefijoLimpio = prefijo.replace(/[^0-9+]/g, '')
if (prefijoLimpio.startsWith('+')) {
prefijoLimpio = prefijoLimpio.slice(1)
}
return `+${prefijoLimpio}`
})
numerosPrefijos = prefijosLimpios.map(prefijo => parseInt(prefijo.replace(/\D/g, ''), 10)).filter((valor, indice, self) => self.indexOf(valor) === indice)
  
const prefijosJSON = JSON.stringify(numerosPrefijos)
if (!fs.existsSync('./prefijos.json')) {
await fs.promises.writeFile('prefijos.json', 'false')
}
  
try {
await fs.promises.access('prefijos.json', fs.constants.F_OK)
contenido = await fs.promises.readFile('prefijos.json', 'utf-8')
if (contenido === 'false') {
await fs.promises.writeFile('prefijos.json', prefijosJSON)
const prefijosGuardados = JSON.parse(prefijosJSON)
const prefijosConSigno = prefijosGuardados.map(prefijo => `+${prefijo}`);
m.reply(`✅ *تم حفظ الإعدادات:* *${prefijosConSigno.join(', ')}*\n\n> ممكن تضيف أكتر لو حابب`)
} else {
const prefijosGuardados = JSON.parse(contenido)
const prefijosConSigno = prefijosGuardados.map(prefijo => `+${prefijo}`)
reply = (await conn.reply(m.chat, `ℹ️ > *لقينا أرقام/بادئات محفوظة من قبل:*
*جديد:* \`\`\`${numerosPrefijos.map(prefijo => `+${prefijo}`).join(', ')}\`\`\`
*قديم:* \`\`\`${prefijosConSigno.join(', ')}\`\`\`\n 
*اختار حاجة من الاختيارات دي:*
\`\`\`[A]\`\`\` \`دمج\` _الأرقام الجديدة هتتجمع مع القديمة._\n
\`\`\`[B]\`\`\` \`استبدال\` _الأرقام القديمة هتتحذف ويتضاف الجديدة._\n
\`\`\`[C]\`\`\` \`حذف\` _كل الأرقام هتتحذف وهيبقى الإعدادات الافتراضية._\n
\`\`\`[D]\`\`\` \`إلغاء\` _مش هيحصل أي تغيير._`, m)).key.id
}} catch (error) {
if (error.code === 'ENOENT') {
m.reply('❌ *ملف "prefijos.json" مش موجود.*')
} else {
console.error('حصل خطأ في تعديل البادئات في ملف "prefijos.json": ', error)
}}
}}
  
handler.before = async function (m, { conn, isOwner, isROwner, isAdmin }) {
if (m.quoted && m.quoted.id === reply && ['a', '1', 'combinar'].includes(m.text.toLowerCase())) {
if (!isOwner || !isROwner || !isAdmin) return m.reply(`❌ *العملية دي مش من صلاحياتك*`)
try {
await fs.promises.access('prefijos.json', fs.constants.F_OK)
contenido = await fs.promises.readFile('prefijos.json', 'utf-8')
const prefijosExistentes = JSON.parse(contenido)
const prefijosActualizados = [...new Set([...prefijosExistentes, ...numerosPrefijos])]
const prefijosJSON = JSON.stringify(prefijosActualizados)
await fs.promises.writeFile('prefijos.json', prefijosJSON)
contenido = await fs.promises.readFile('prefijos.json', 'utf-8')
const prefijosGuardados = JSON.parse(contenido)
const prefijosConSigno = prefijosGuardados.map(prefijo => `+${prefijo}`)
m.reply(`✅ *تم دمج البادئات بنجاح.*\n\n*الإعدادات الجديدة:* \`\`\`${prefijosConSigno.join(', ')}\`\`\``)
} catch (error) {
if (error.code === 'ENOENT') {
m.reply('❌ *ملف "prefijos.json" مش موجود.*')
} else {
console.log('حصل خطأ أثناء تحديث البادئات في ملف "prefijos.json":', error)
}}
}
if (m.quoted && m.quoted.id === reply && ['b', '2', 'reemplazar'].includes(m.text.toLowerCase())) {
if (!isOwner || !isROwner || !isAdmin) return m.reply(`❌ *العملية دي مش من صلاحياتك*`)
try {
await fs.promises.access('prefijos.json', fs.constants.F_OK)
await fs.promises.unlink('prefijos.json')
} catch (error) {
if (error.code !== 'ENOENT') {
console.error('حصل خطأ أثناء حذف ملف "prefijos.json":', error)
return
}}
const prefijosJSON = JSON.stringify(numerosPrefijos)
await fs.promises.writeFile('prefijos.json', prefijosJSON)
contenido = await fs.promises.readFile('prefijos.json', 'utf-8')
const prefijosGuardados = JSON.parse(contenido)
const prefijosConSigno = prefijosGuardados.map(prefijo => `+${prefijo}`)
m.reply(`✅ *تم استبدال البادئات بنجاح.*\n\n*الإعدادات الجديدة:* \`\`\`${prefijosConSigno.join(', ')}\`\`\``)
}
if (m.quoted && m.quoted.id === reply && ['c', '3', 'eliminar'].includes(m.text.toLowerCase())) {
if (!isOwner || !isROwner || !isAdmin) return m.reply(`❌ *العملية دي مش من صلاحياتك*`)
try {
await fs.promises.access('prefijos.json', fs.constants.F_OK)
await fs.promises.unlink('prefijos.json')
m.reply('🗑️ *تم حذف الإعدادات المخصصة بنجاح.*\n\n> *هيتم استخدام الإعدادات الافتراضية*')
} catch (error) {
if (error.code === 'ENOENT') {
m.reply('❌ *ملف "prefijos.json" مش موجود.*')
} else {
console.log('حصل خطأ أثناء حذف ملف "prefijos.json":', error)
}}
}
if (m.quoted && m.quoted.id === reply && ['d', '4', 'cancelar'].includes(m.text.toLowerCase())) {
if (!isOwner || !isROwner || !isAdmin) return m.reply(`❌ *العملية دي مش من صلاحياتك*`)
m.reply('❌ *مفيش تغييرات حصلت.*')
return
}
  
}
handler.command = /^(تعديل_الـantifake|تعديلfake|editantifake|editfake)$/i
handler.register = true
handler.group = true
export default handler