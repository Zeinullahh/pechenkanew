import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const locales = ["ja", "zh", "ko", "fr", "de", "ru", "ar", "tr"];
const guides = [
  "AI_CSD_PENTESTER_USER_GUIDE.md",
  "Silence_AI_Server_Security_User_Guide(1).md",
];

const localizedName = (source, locale) => source.replace(/\.md$/, `.${locale}.md`);
const lines = (text) => text.replace(/\r/g, "").split("\n");
const headings = (text) => lines(text).flatMap((line) => {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  return match ? [{ level: match[1].length, number: match[2].match(/^(\d+(?:\.\d+)*\.?)(?:\s|$)/)?.[1] || "" }] : [];
});
const tableShape = (text) => lines(text).filter((line) => /^\|.*\|\s*$/.test(line)).map((line) => line.split("|").length - 2);
const listShape = (text) => lines(text).flatMap((line) => {
  const match = line.match(/^(\s*)(?:(\d+)\.|([-*+]))\s+/);
  return match ? [`${match[1].replace(/\t/g, "    ").length}:${match[2] ? `o${match[2]}` : `u${match[3]}`}`] : [];
});
const blockquotes = (text) => lines(text).filter((line) => /^>\s/.test(line)).length;
const multiset = (values) => [...values].sort().join("\n");
const multisetContains = (actual, expected) => {
  const counts = new Map();
  for (const value of actual) counts.set(value, (counts.get(value) || 0) + 1);
  for (const value of expected) {
    const count = counts.get(value) || 0;
    if (count === 0) return false;
    counts.set(value, count - 1);
  }
  return true;
};
const matches = (text, regex) => [...text.matchAll(regex)].map((match) => match[1] ?? match[0]);
const codeSpans = (text) => matches(text, /`([^`\n]+)`/g);
const linkTargets = (text) => matches(text, /\[[^\]]+\]\(([^)]+)\)/g);
const urls = (text) => matches(text.replace(/`[^`\n]+`/g, ""), /https?:\/\/[^\s)>`]+/g).map((url) => url.replace(/[.,;:!?]+$/, ""));
const longProseLines = (text) => new Set(lines(text).map((line) => line.trim()).filter((line) => {
  if (!line || /^(#|>|\||[-*+]\s|\d+\.\s)/.test(line) || /[`[\]]/.test(line)) return false;
  return (line.match(/[A-Za-z]{3,}/g) || []).length >= 8;
}));

const suspiciousEnglishLines = (text) => {
  const englishWords = new Set(["the", "this", "that", "these", "those", "with", "from", "your", "you", "when", "should", "select", "open", "enter", "review", "confirm", "then", "before", "after", "using", "does", "cannot", "available"]);
  return lines(text).filter((line) => {
    const scrubbed = line.replace(/`[^`]+`/g, "").replace(/\*\*[^*]+\*\*/g, "").replace(/https?:\/\/\S+/g, "");
    const words = (scrubbed.toLowerCase().match(/[a-z]+/g) || []);
    return words.filter((word) => englishWords.has(word)).length >= 5;
  });
};

const latinLanguageLeakLines = (text, locale) => {
  const stopwords = {
    fr: { de: ["der", "die", "das", "und", "mit", "nicht", "wenn", "wird", "werden", "einem"], tr: ["için", "olarak", "değil", "ve", "bir", "ile", "daha"] },
    de: { fr: ["les", "une", "des", "dans", "avec", "pour", "vous", "cette", "sont"], tr: ["için", "olarak", "değil", "ve", "bir", "ile", "daha"] },
    tr: { fr: ["les", "une", "des", "dans", "avec", "pour", "vous", "cette", "sont"], de: ["der", "die", "das", "und", "mit", "nicht", "wenn", "wird", "werden", "einem"] },
  };
  if (!stopwords[locale]) return [];
  return lines(text).filter((line) => {
    const words = (line.toLocaleLowerCase(locale).match(/\p{L}+/gu) || []);
    return Object.values(stopwords[locale]).some((foreignWords) => words.filter((word) => foreignWords.includes(word)).length >= 4);
  });
};
const forbiddenScripts = {
  ja: /[\u0400-\u04ff\u0600-\u06ff\uac00-\ud7af]/u,
  zh: /[\u3040-\u30ff\u0400-\u04ff\u0600-\u06ff\uac00-\ud7af]/u,
  ko: /[\u3040-\u30ff\u0400-\u04ff\u0600-\u06ff]/u,
  fr: /[\u3040-\u30ff\u3400-\u9fff\u0400-\u04ff\u0600-\u06ff\uac00-\ud7af]/u,
  de: /[\u3040-\u30ff\u3400-\u9fff\u0400-\u04ff\u0600-\u06ff\uac00-\ud7af]/u,
  ru: /[\u3040-\u30ff\u3400-\u9fff\u0600-\u06ff\uac00-\ud7af]/u,
  ar: /[\u3040-\u30ff\u3400-\u9fff\u0400-\u04ff\uac00-\ud7af]/u,
  tr: /[\u3040-\u30ff\u3400-\u9fff\u0400-\u04ff\u0600-\u06ff\uac00-\ud7af]/u,
};

let failures = 0;
const fail = (message) => { failures += 1; console.error(`FAIL ${message}`); };
const pass = (message) => console.log(`PASS ${message}`);

for (const sourceName of guides) {
  const sourcePath = path.join(root, sourceName);
  const source = readFileSync(sourcePath, "utf8");
  const sourceHeadings = headings(source);
  const sourceProse = longProseLines(source);

  for (const locale of locales) {
    const targetName = localizedName(sourceName, locale);
    const targetPath = path.join(root, targetName);
    if (!existsSync(targetPath)) {
      fail(`${targetName}: file missing`);
      continue;
    }

    const target = readFileSync(targetPath, "utf8");
    const targetHeadings = headings(target);
    const checks = [
      [targetHeadings.length === sourceHeadings.length, "heading count"],
      [targetHeadings.map(({ level }) => level).join(",") === sourceHeadings.map(({ level }) => level).join(","), "heading-level sequence"],
      [targetHeadings.map(({ number }) => number).join(",") === sourceHeadings.map(({ number }) => number).join(","), "numbered-section sequence"],
      [tableShape(target).join(",") === tableShape(source).join(","), "table row/column shape"],
      [listShape(target).join(",") === listShape(source).join(","), "ordered/unordered list structure"],
      [blockquotes(target) === blockquotes(source), "blockquote count"],
      [multisetContains(codeSpans(target), codeSpans(source)), "source inline code spans preserved"],
      [multiset(linkTargets(target)) === multiset(linkTargets(source)), "link destinations and anchors"],
      [multiset(urls(target)) === multiset(urls(source)), "URLs"],
    ];

    for (const [ok, label] of checks) {
      if (!ok) fail(`${targetName}: ${label}`);
    }

    const untranslated = lines(target).map((line) => line.trim()).filter((line) => sourceProse.has(line));
    if (untranslated.length > 0) fail(`${targetName}: ${untranslated.length} unchanged long English prose line(s)`);

    const proseWithoutProtected = target
      .replace(/`[^`]+`/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/AI-CSD|Pentester|Silence AI|Server Security|GitHub|Suricata/g, "");
    const hasForbiddenScript = forbiddenScripts[locale].test(proseWithoutProtected);
    if (hasForbiddenScript) fail(`${targetName}: characters from another target-language script detected`);

    const englishLeak = suspiciousEnglishLines(target);
    if (englishLeak.length > 0) fail(`${targetName}: ${englishLeak.length} line(s) contain suspicious English instructional prose`);

    const latinLeak = latinLanguageLeakLines(target, locale);
    if (latinLeak.length > 0) fail(`${targetName}: ${latinLeak.length} line(s) contain probable prose from another Latin-script target language`);

    if (checks.every(([ok]) => ok) && untranslated.length === 0 && !hasForbiddenScript && englishLeak.length === 0 && latinLeak.length === 0) {
      pass(`${targetName}: structure, protected-content, and language-isolation checks`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}

console.log("\nAll 16 translated guides passed deterministic validation.");