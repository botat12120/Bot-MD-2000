import fs from 'fs';

let handler = async (m, { text }) => {
  if (!text) throw `يا حبيبي، لازم تدخل اسم للملف بتاع الصورة وامتدادها، زي كده: اسم.png، اسم.jpg، وهكذا.`;
  if (!m.quoted || !m.quoted.fileSha256) throw `رد على الصورة اللي عايز تحفظها.`;
  let media = await m.quoted.download();
  // هنا اختار مكان ما تحب تحفظ فيه الصور
  const path = `src/${text}`;
  await fs.writeFileSync(path, media);
  m.reply(`الصورة اتحفظت باسم ${path}`);
};

handler.help = ['saveimage <اسم>'];
handler.tags = ['tools'];
handler.command = /^(saveimage|sp|حفظ-الصوره)$/i;
handler.owner = true;

export default handler;