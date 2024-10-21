import fs from 'fs';

const toxicRegex = /قحبه|القحبة|القحبه|ممحون|كس|كسي|امك|كسختك|متناك|منيوك|قحبة|شرموطة|شرموط|انيكك|انيكك|زبي|زب|طيز|كسمك|طبون|زامل|مص|مصه|اركب|zap|zpi|dick|bitch|porno|sexe|sexy|mother|suck|cum|hentai/i;

export async function before(m, { conn }) {
  if (m.isBaileys && m.fromMe) {
    return true;
  }
  if (!m.isGroup) {
    return false;
  }

  const isToxic = toxicRegex.exec(m.text);

  if (isToxic) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch (e) {
      console.error(e);
    }
  }
  return false;
}