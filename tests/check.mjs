import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const context = { globalThis: null };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(`${read("js/lessons.js")}\n${read("js/illustrations.js")}\nglobalThis.LESSONS = CYNTHIA_LESSONS;\nglobalThis.THEMES = CYNTHIA_THEMES;\nglobalThis.ART = CynthiaArt;`, context);

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

const siteFiles = [
  "index.html",
  "css/styles.css",
  "js/lessons.js",
  "js/illustrations.js",
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
if (!read(".github/workflows/pages.yml").includes("actions/deploy-pages")) fail("pages workflow missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok ${lessons.length} lessons, ${sounds.size} sounds`);
