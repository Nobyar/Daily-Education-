import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const context = { globalThis: null };
context.globalThis = context;
vm.createContext(context);
vm.runInContext([
  read("js/lessons.js"),
  read("js/vera.js"),
  read("js/mayla.js"),
  read("js/noah.js"),
  read("js/illustrations.js"),
  read("js/art-vera.js"),
  read("js/art-noah.js"),
  read("js/art-russian.js"),
  read("js/children.js"),
  read("js/russian.js"),
  "globalThis.LESSONS = CYNTHIA_LESSONS;",
  "globalThis.THEMES = CYNTHIA_THEMES;",
  "globalThis.ART = CynthiaArt;",
  "globalThis.VERA = VERA_LESSONS;",
  "globalThis.MAYLA = MAYLA_LESSONS;",
  "globalThis.NOAH = NOAH_LESSONS;",
  "globalThis.RUSSIAN_WORDS = RUSSIAN_WORDS;",
  "globalThis.RUSSIAN_THEMES = RUSSIAN_THEMES;",
  "globalThis.russianWord = russianWord;",
  "globalThis.russianWordForDate = russianWordForDate;",
  "globalThis.russianTheme = russianTheme;",
  "globalThis.russianWordsIn = russianWordsIn;",
  "globalThis.CHILDREN = EDU_CHILDREN;",
  "globalThis.ageLabel = ageLabel;",
  "globalThis.displayedAge = displayedAge;",
].join("\n"), context);

const lessons = context.LESSONS;
const themes = new Set(context.THEMES.map((theme) => theme.id));
const failures = [];
const fail = (message) => failures.push(message);

if (lessons.length < 60) fail(`expected at least 60 lessons, found ${lessons.length}`);

const ids = new Set();
const firstWords = ["Mama", "Dada", "Hi", "Bye-bye", "More", "All done", "Milk", "Ball", "Dog", "Up please"];
firstWords.forEach((word, index) => {
  if (!lessons[index] || lessons[index].word !== word) {
    fail(`lesson ${index + 1} should be ${word}, found ${lessons[index] && lessons[index].word}`);
  }
});

const audio = read("js/audio.js");
const sounds = new Set([...audio.matchAll(/\n\s{4}(\w+)\(c, at\)/g)].map((match) => match[1]));
const svgs = [];

lessons.forEach((lesson, index) => {
  if (!lesson.id || ids.has(lesson.id)) fail(`bad or duplicate id at ${index}: ${lesson.id}`);
  ids.add(lesson.id);
  for (const key of ["word", "say", "sentence", "theme", "motion", "particles"]) {
    if (!lesson[key]) fail(`${lesson.id} missing ${key}`);
  }
  if (!themes.has(lesson.theme)) fail(`${lesson.id} has unknown theme ${lesson.theme}`);
  if (!Array.isArray(lesson.related) || lesson.related.length < 1 || lesson.related.length > 2) {
    fail(`${lesson.id} needs 1 or 2 related words`);
  }
  lesson.related.forEach((item) => {
    if (!item.word || !item.say) fail(`${lesson.id} has a related word without text`);
  });
  for (const key of ["minutes", "how", "activity", "question", "followup", "why"]) {
    if (!lesson.guide || !lesson.guide[key]) fail(`${lesson.id} guide missing ${key}`);
  }
  if (lesson.sound && !sounds.has(lesson.sound)) fail(`${lesson.id} uses unknown sound ${lesson.sound}`);
  const svg = context.ART.svg(lesson.id);
  if (!svg.includes("<svg") || !svg.includes("</svg>")) fail(`${lesson.id} has no svg`);
  if (!context.ART.ids().includes(lesson.id)) fail(`${lesson.id} is using the fallback picture`);
  svgs.push({ id: lesson.id, svg });
});

const python = spawnSync("python3", ["-c", `
import json, sys, xml.etree.ElementTree as ET
items = json.load(sys.stdin)
bad = []
for item in items:
    try:
        ET.fromstring(item["svg"])
    except ET.ParseError as err:
        bad.append(f"{item['id']}: {err}")
print("\\n".join(bad))
`], { input: JSON.stringify(svgs) });
if (python.status !== 0) fail(python.stderr.toString());
const xmlErrors = python.stdout.toString().trim();
if (xmlErrors) fail(xmlErrors);

function checkChild(name, list, themes, options) {
  if (list.length < 60) fail(`${name} expected at least 60 lessons, found ${list.length}`);
  const seen = new Set();
  const themeIds = new Set(themes.map((theme) => theme.id));
  list.forEach((lesson, index) => {
    if (!lesson.id || seen.has(lesson.id)) fail(`${name} bad or duplicate id at ${index}: ${lesson.id}`);
    seen.add(lesson.id);
    for (const key of ["word", "say", "sentence", "theme", "motion", "particles"]) {
      if (!lesson[key]) fail(`${name} ${lesson.id} missing ${key}`);
    }
    if (!themeIds.has(lesson.theme)) fail(`${name} ${lesson.id} has unknown theme ${lesson.theme}`);
    if (!Array.isArray(lesson.related) || lesson.related.length < 1) fail(`${name} ${lesson.id} needs related words`);
    for (const key of ["minutes", "how", "activity", "question", "followup", "why"]) {
      if (!lesson.guide || !lesson.guide[key]) fail(`${name} ${lesson.id} guide missing ${key}`);
    }
    if (lesson.sound && !sounds.has(lesson.sound)) fail(`${name} ${lesson.id} uses unknown sound ${lesson.sound}`);
    const picture = lesson.picture || lesson.id;
    const svg = context.ART.svg(picture);
    if (!svg.includes("<svg") || !svg.includes(`id="${picture}-`) && svg.includes("fallback-bg")) {
      fail(`${name} ${lesson.id} is using the fallback picture`);
    }
    if (!context.ART.ids().includes(picture)) fail(`${name} ${lesson.id} picture ${picture} is missing`);
    svgs.push({ id: `${name}-${lesson.id}`, svg });
  });
  if (options.firstWords) {
    options.firstWords.forEach((word, index) => {
      if (!list[index] || list[index].word !== word) {
        fail(`${name} lesson ${index + 1} should be ${word}, found ${list[index] && list[index].word}`);
      }
    });
  }
  if (options.sentenceHas) {
    list.forEach((lesson) => {
      if (!lesson.sentence.includes(options.sentenceHas)) {
        fail(`${name} ${lesson.id} sentence should include ${options.sentenceHas}`);
      }
    });
  }
}

checkChild("Vera", context.VERA, context.CHILDREN.find((child) => child.id === "vera").themes, {
  firstWords: ["Mama", "Dada", "Hi", "Ball", "Peekaboo"],
});
checkChild("Mayla", context.MAYLA, context.CHILDREN.find((child) => child.id === "mayla").themes, {
  firstWords: ["Hi", "Mama", "Dada", "Ball", "More", "Milk", "Bye-bye", "Dog", "Up", "All done"],
  sentenceHas: "Mayla",
});
checkChild("Noah", context.NOAH, context.CHILDREN.find((child) => child.id === "noah").themes, {});

context.NOAH.forEach((lesson, index) => {
  const expect = index % 2 === 0 ? "history" : "science";
  if (lesson.subject !== expect) fail(`Noah ${lesson.id} should be ${expect}`);
  const quiz = lesson.quiz;
  if (!lesson.read) fail(`Noah ${lesson.id} missing read`);
  if (!quiz || !Array.isArray(quiz.choices) || quiz.choices.length !== 3) fail(`Noah ${lesson.id} needs 3 quiz choices`);
  if (!Number.isInteger(quiz.answer) || quiz.answer < 0 || quiz.answer > 2) fail(`Noah ${lesson.id} has a bad quiz answer`);
  if (!quiz.prompt || !quiz.explain) fail(`Noah ${lesson.id} quiz needs a prompt and an explanation`);
});

const byId = Object.fromEntries(context.NOAH.map((lesson) => [lesson.id, lesson]));
const expectFact = (id, snippet) => {
  const lesson = byId[id];
  const blob = `${lesson.read} ${lesson.quiz.explain}`;
  if (!blob.includes(snippet)) fail(`Noah ${id} should mention ${snippet}`);
};
expectFact("n-flag", "13 stripes");
expectFact("n-flag", "50 stars");
expectFact("n-flag", "Seven stripes are red and six are white");
expectFact("n-flag", "July 4, 1960");
expectFact("n-states", "50 states");
expectFact("n-states", "Alaska is the largest");
expectFact("n-states", "Rhode Island is the smallest");
expectFact("n-washington", "1789 to 1797");
expectFact("n-leaf", "carbon dioxide");
expectFact("n-leaf", "oxygen");
expectFact("n-leaf", "chlorophyll");
expectFact("n-lincoln", "16th president");
expectFact("n-lincoln", "January 1, 1863");
expectFact("n-cheetah", "60 to 70 miles an hour");
expectFact("n-gettysburg", "1863");
expectFact("n-peregrine", "faster than 200 miles an hour");
expectFact("n-peregrine", "dive");
expectFact("n-liberty", "October 28, 1886");
expectFact("n-liberty", "France");
expectFact("n-whale", "80 to 100 feet");
expectFact("n-liberty-size", "151 feet");
expectFact("n-liberty-size", "305 feet");
expectFact("n-elephant", "largest land animal");
expectFact("n-july4", "July 4, 1776");
expectFact("n-giraffe", "16 to 18 feet");
expectFact("n-thanks", "fourth Thursday of November");
expectFact("n-thanks", "Wampanoag");
expectFact("n-thanks", "1941");
expectFact("n-insects", "6 legs");
expectFact("n-bell", "Philadelphia");
expectFact("n-bell", "1752");
expectFact("n-bell", "1846");
expectFact("n-bell", "Leviticus 25:10");
expectFact("n-spider", "8 legs");
expectFact("n-constitution", "September 17, 1787");
expectFact("n-polarbear", "Arctic");
expectFact("n-whitehouse", "1600 Pennsylvania Avenue");
expectFact("n-whitehouse", "1800");
expectFact("n-penguin", "Antarctica");
expectFact("n-capital", "not a state");
expectFact("n-oceans", "Pacific, the Atlantic, the Indian, the Southern, and the Arctic");
expectFact("n-congress", "100 senators");
expectFact("n-congress", "435");
expectFact("n-pacific", "largest ocean");
expectFact("n-pacific", "one third");
expectFact("n-vote", "18");
expectFact("n-vote", "26th Amendment");
expectFact("n-water", "71 percent");
expectFact("n-anthem", "1814");
expectFact("n-anthem", "1931");
expectFact("n-anthem", "Fort McHenry");
expectFact("n-trench", "36,000 feet");
expectFact("n-rushmore", "1927 to 1941");
expectFact("n-rushmore", "Gutzon Borglum");
expectFact("n-continents", "Africa, Antarctica, Asia, Australia, Europe, North America, and South America");
expectFact("n-king", "August 28, 1963");
expectFact("n-africa", "Lions live in parts of Africa");
expectFact("n-parks", "December 1, 1955");
expectFact("n-parks", "Montgomery");
expectFact("n-antarctica", "No cities stay there all year");
expectFact("n-apollo", "July 20, 1969");
expectFact("n-apollo", "Michael Collins");
expectFact("n-asia", "largest continent");
expectFact("n-asia", "Giant pandas");
expectFact("n-juneteenth", "June 19, 1865");
expectFact("n-juneteenth", "2021");
expectFact("n-australia", "smallest continent");
expectFact("n-australia", "Kangaroos");
expectFact("n-veterans", "November 11");
expectFact("n-europe", "European hedgehog");
expectFact("n-memorial", "last Monday in May");
expectFact("n-bison", "American bison");
expectFact("n-term", "4 years");
expectFact("n-term", "22nd Amendment");
expectFact("n-jaguar", "Central America");
expectFact("n-court", "9 justices");
expectFact("n-cycle", "The Sun warms water");
expectFact("n-yellowstone", "1872");
expectFact("n-spin", "24 hours");
expectFact("n-hawaii", "January 3, 1959");
expectFact("n-hawaii", "August 21, 1959");
expectFact("n-tilt", "23.5 degrees");
expectFact("n-california", "39,538,223");
expectFact("n-year", "365 days");
expectFact("n-rhode", "smallest state by area");
expectFact("n-moon", "29.5 days");
expectFact("n-revere", "William Dawes");
expectFact("n-revere", "Samuel Prescott");
expectFact("n-planets", "Eight planets");
expectFact("n-planets", "dwarf planet");
expectFact("n-eagle", "1782");
expectFact("n-sun", "93 million miles");
expectFact("n-hall", "Philadelphia");
expectFact("n-dinosaurs", "66 million years");

const childKeys = context.CHILDREN.map((child) => child.keys.done);
if (new Set(childKeys).size !== 4) fail("each child needs a separate stars key");
if (context.CHILDREN[0].keys.done !== "cynthia-done") fail("Cynthia stars must stay on cynthia-done");

const maylaChild = context.CHILDREN.find((child) => child.id === "mayla");
if (maylaChild.birthday !== "2025-04-09") fail("Mayla birthday should be 2025-04-09");
const ageCases = [
  ["2026-10-14", "18 months"],
  ["2026-10-08", "17 months"],
  ["2026-10-09", "18 months"],
  ["2025-04-09", "0 months"],
  ["2025-05-09", "1 month"],
  ["2026-04-09", "12 months"],
  ["2027-04-08", "23 months"],
  ["2027-04-09", "24 months"],
  ["2027-05-09", "2 years 1 month"],
  ["2028-04-09", "3 years"],
  ["2028-06-09", "3 years 2 months"],
];
ageCases.forEach(([day, label]) => {
  const found = context.ageLabel("2025-04-09", day);
  if (found !== label) fail(`age on ${day} should be ${label}, found ${found}`);
});
if (context.displayedAge(maylaChild, "2026-10-14") !== "18 months") fail("Mayla should show 18 months on 2026-10-14");
if (maylaChild.welcome("18 months").includes("19 months")) fail("Mayla welcome still says 19 months");
if (!maylaChild.welcome("18 months").includes("18 months")) fail("Mayla welcome should use the live age");
if (context.displayedAge(context.CHILDREN[0], "2026-10-14") !== "20 months") fail("Cynthia age stays 20 months");

const russianWords = context.RUSSIAN_WORDS;
const russianThemes = new Set(context.RUSSIAN_THEMES.map((theme) => theme.id));
if (russianWords.length < 40) fail(`expected at least 40 Russian words, found ${russianWords.length}`);
const russianIds = new Set();
const russianSvgs = [];
russianWords.forEach((word) => {
  if (!word.id || russianIds.has(word.id)) fail(`bad or duplicate Russian id ${word.id}`);
  russianIds.add(word.id);
  if (!word.cyrillic || !/^[\u0400-\u04FF\s?!.\-]+$/.test(word.cyrillic)) {
    fail(`${word.id} needs Cyrillic spelling, found ${word.cyrillic}`);
  }
  if (!word.say || !/^[A-Za-z \-]+$/.test(word.say)) fail(`${word.id} needs a Latin pronunciation guide`);
  if (!word.en) fail(`${word.id} missing English`);
  if (!russianThemes.has(word.theme)) fail(`${word.id} has unknown theme ${word.theme}`);
  const theme = context.russianTheme(word.theme);
  if (!theme || !theme.note) fail(`${word.theme} needs a cultural note`);
  const svg = context.ART.svg(word.id);
  if (!context.ART.ids().includes(word.id) || svg.includes("fallback-bg")) fail(`${word.id} is missing a picture`);
  russianSvgs.push({ id: word.id, svg });
});
for (const theme of context.RUSSIAN_THEMES) {
  if (context.russianWordsIn(theme.id).length < 1) fail(`${theme.id} has no words`);
}
const spelling = {
  "ru-privet": ["Привет", "pree-VYET", "Hi"],
  "ru-hello": ["Здравствуйте", "ZDRAHST-vooy-tye", "Hello"],
  "ru-bye": ["Пока", "pa-KAH", "Bye"],
  "ru-goodbye": ["До свидания", "duh svee-DAH-nee-ya", "Goodbye"],
  "ru-please": ["Пожалуйста", "pa-ZHAHL-sta", "Please"],
  "ru-thanks": ["Спасибо", "spa-SEE-ba", "Thank you"],
  "ru-yes": ["Да", "DAH", "Yes"],
  "ru-no": ["Нет", "NYET", "No"],
  "ru-how": ["Как дела?", "kahk dee-LAH", "How are you?"],
  "ru-good": ["Хорошо", "kha-ra-SHO", "Good"],
  "ru-name": ["Меня зовут Ноа", "mee-NYA za-VOOT NO-ah", "My name is Noah"],
  "ru-red": ["Красный", "KRAHS-niy", "Red"],
  "ru-blue": ["Синий", "SEE-neey", "Blue"],
  "ru-yellow": ["Жёлтый", "ZHOL-tiy", "Yellow"],
  "ru-green": ["Зелёный", "zee-LYOH-niy", "Green"],
  "ru-white": ["Белый", "BYEH-liy", "White"],
  "ru-black": ["Чёрный", "CHOR-niy", "Black"],
  "ru-1": ["Один", "a-DEEN", "One"],
  "ru-2": ["Два", "DVAH", "Two"],
  "ru-3": ["Три", "TREE", "Three"],
  "ru-4": ["Четыре", "chi-TI-rye", "Four"],
  "ru-5": ["Пять", "PYAHT", "Five"],
  "ru-6": ["Шесть", "SHEST", "Six"],
  "ru-7": ["Семь", "SYEM", "Seven"],
  "ru-8": ["Восемь", "VOH-syem", "Eight"],
  "ru-9": ["Девять", "DYEH-vyat", "Nine"],
  "ru-10": ["Десять", "DYEH-syat", "Ten"],
  "ru-bear": ["Медведь", "myed-VYET", "Bear"],
  "ru-fox": ["Лиса", "lee-SAH", "Fox"],
  "ru-wolf": ["Волк", "VOLK", "Wolf"],
  "ru-hare": ["Заяц", "ZAH-yits", "Hare"],
  "ru-owl": ["Сова", "sa-VAH", "Owl"],
  "ru-squirrel": ["Белка", "BYEL-ka", "Squirrel"],
  "ru-firebird": ["Жар-птица", "zhar-PTEE-tsa", "Firebird"],
  "ru-mom": ["Мама", "MAH-ma", "Mom"],
  "ru-dad": ["Папа", "PAH-pa", "Dad"],
  "ru-brother": ["Брат", "BRAHT", "Brother"],
  "ru-sister": ["Сестра", "sye-STRAH", "Sister"],
  "ru-grandma": ["Бабушка", "BAH-boosh-ka", "Grandma"],
  "ru-grandpa": ["Дедушка", "DYEH-doosh-ka", "Grandpa"],
  "ru-doll": ["Матрёшка", "mat-RYOSH-ka", "Nesting doll"],
  "ru-bread": ["Хлеб", "KHLYEP", "Bread"],
  "ru-milk": ["Молоко", "ma-la-KOH", "Milk"],
  "ru-apple": ["Яблоко", "YAB-luh-ka", "Apple"],
  "ru-soup": ["Суп", "SOOP", "Soup"],
  "ru-borscht": ["Борщ", "BORSHCH", "Borscht"],
  "ru-water": ["Вода", "va-DAH", "Water"],
  "ru-nose": ["Нос", "NOHS", "Nose"],
  "ru-eye": ["Глаз", "GLAHS", "Eye"],
  "ru-hand": ["Рука", "roo-KAH", "Hand"],
  "ru-foot": ["Нога", "na-GAH", "Foot"],
  "ru-ear": ["Ухо", "OO-kha", "Ear"],
  "ru-mouth": ["Рот", "ROHT", "Mouth"],
};
Object.entries(spelling).forEach(([id, expected]) => {
  const word = context.russianWord(id);
  if (!word) fail(`missing Russian word ${id}`);
  else if (word.cyrillic !== expected[0] || word.say !== expected[1] || word.en !== expected[2]) {
    fail(`${id} should be ${expected.join(" / ")}, found ${word.cyrillic} / ${word.say} / ${word.en}`);
  }
});
["Жёлтый", "Зелёный", "Чёрный", "Матрёшка"].forEach((word) => {
  if (!word.includes("ё") && !word.includes("Ё")) fail(`${word} should use ё`);
});
if (context.russianWordForDate("2026-10-16").id !== context.russianWordForDate("2026-10-16").id) {
  fail("Russian word of the day is unstable");
}
if (context.russianWordForDate("2026-10-16").id === context.russianWordForDate("2026-10-17").id) {
  fail("the next day should offer a different Russian word");
}
if (context.russianWordForDate("2025-01-01").id !== context.russianWordForDate("2025-02-23").id) {
  fail("Russian word of the day should repeat after the full list");
}
const russianXml = spawnSync("python3", ["-c", `
import json, sys, xml.etree.ElementTree as ET
items = json.load(sys.stdin)
bad = []
for item in items:
    try:
        ET.fromstring(item["svg"])
    except ET.ParseError as err:
        bad.append(f"{item['id']}: {err}")
print("\\n".join(bad))
`], { input: JSON.stringify(russianSvgs) });
if (russianXml.status !== 0) fail(russianXml.stderr.toString());
const russianXmlErrors = russianXml.stdout.toString().trim();
if (russianXmlErrors) fail(russianXmlErrors);
const audioSource = read("js/audio.js");
if (!audioSource.includes('resolve(false)')) fail("Russian speech should resolve false when no ru voice is available");
if (!read("js/app.js").includes('lang: "ru-RU"')) fail("app should request a Russian voice");
if (!read("index.html").includes("js/russian.js") || !read("index.html").includes("js/art-russian.js")) {
  fail("index.html should load the Russian scripts");
}
if (context.NOAH.length < 60) fail("Noah history and science lessons should stay");

const siteFiles = [
  "index.html",
  "css/styles.css",
  "js/lessons.js",
  "js/vera.js",
  "js/mayla.js",
  "js/noah.js",
  "js/illustrations.js",
  "js/art-vera.js",
  "js/art-noah.js",
  "js/art-russian.js",
  "js/children.js",
  "js/russian.js",
  "js/audio.js",
  "js/app.js",
  "favicon.svg",
  "manifest.webmanifest",
];
for (const file of siteFiles) {
  const text = read(file).replaceAll("http://www.w3.org/2000/svg", "");
  if (/https?:\/\//.test(text)) fail(`${file} links to a remote URL`);
}
for (const font of ["nunito-400", "nunito-600", "nunito-700", "nunito-800", "baloo-600", "baloo-700", "baloo-800"]) {
  if (!fs.existsSync(path.join(root, "fonts", `${font}.woff2`))) fail(`missing font ${font}`);
}
if (!read("css/styles.css").includes("../fonts/nunito-400.woff2")) fail("css is not using the local fonts");
const brandFiles = ["index.html", "manifest.webmanifest", "README.md", "js/app.js"];
for (const file of brandFiles) {
  const text = read(file);
  if (text.includes("Cynthia's Daily Education")) fail(`${file} still uses the old site name`);
  if (!text.includes("Pentagonal Daily Education")) fail(`${file} is missing Pentagonal Daily Education`);
}
const manifest = JSON.parse(read("manifest.webmanifest"));
if (manifest.name !== "Pentagonal Daily Education") fail("manifest name");
if (manifest.short_name !== "Pentagonal") fail("manifest short_name");
if (!read("index.html").includes("<title>Pentagonal Daily Education</title>")) fail("page title");
if (!read(".github/workflows/pages.yml").includes("actions/deploy-pages")) fail("pages workflow missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok cynthia ${lessons.length}, vera ${context.VERA.length}, mayla ${context.MAYLA.length}, noah ${context.NOAH.length}, russian ${russianWords.length}, ${sounds.size} sounds`);
