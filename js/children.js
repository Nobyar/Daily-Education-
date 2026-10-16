/* Child tabs. Cynthia keeps her original storage keys.
   A birthday is an ISO date. Age is counted in completed months:
   months through 24, then years and months. */

function asLocalDate(onDate) {
  if (!onDate) return new Date();
  if (onDate instanceof Date) return onDate;
  const [year, month, day] = String(onDate).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function ageMonths(birthdayISO, onDate) {
  const [year, month, day] = birthdayISO.split("-").map(Number);
  const date = asLocalDate(onDate);
  let months = (date.getFullYear() - year) * 12 + (date.getMonth() + 1 - month);
  if (date.getDate() < day) months -= 1;
  return Math.max(0, months);
}

function ageLabel(birthdayISO, onDate) {
  const total = ageMonths(birthdayISO, onDate || new Date());
  if (total <= 24) return total === 1 ? "1 month" : `${total} months`;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const yearsText = years === 1 ? "1 year" : `${years} years`;
  if (months === 0) return yearsText;
  const monthsText = months === 1 ? "1 month" : `${months} months`;
  return `${yearsText} ${monthsText}`;
}

function displayedAge(child, onDate) {
  if (child.birthday) return ageLabel(child.birthday, onDate || new Date());
  return child.age;
}

const EDU_CHILDREN = [
  {
    id: "cynthia",
    name: "Cynthia",
    age: "20 months",
    lessons: CYNTHIA_LESSONS,
    themes: CYNTHIA_THEMES,
    keys: { start: "cynthia-start", done: "cynthia-done", welcome: "cynthia-welcomed" },
    rates: { word: 0.7, sentence: 0.82, yay: 0.88, read: 0.82 },
    pitch: { word: 1.05, sentence: 1.02, yay: 1.1, read: 1.02 },
    kicker: "Today's word",
    statLabel: "Words practiced",
    tapHint: "Tap the picture. Say it together.",
    ask: "Ask Cynthia",
    guideFoot: "Say it once. Wait five quiet seconds. A close sound counts. Stop while she is still having fun.",
    welcome: "Each day brings one small word, starting with the words toddlers usually say first. Say it slowly, leave a quiet pause, and end while it still feels like play.",
    ageNote: "These words follow a gentle path many toddlers walk around 20 months: people and social words first, then the body, home, animals, food, and actions. Colors and counting come later because they are ideas, not things she can hold. Every child has their own clock. If a word is already easy, enjoy it. If it is sticky, stay another day. This is play, not a test.",
    restartConfirm: "Make today Day 1? The next word will be Mama. Stars you already earned will stay.",
    restartToast: "Today is Day 1. Hello, Mama.",
    avatar: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#FDE7EE"/><circle cx="32" cy="28" r="12" fill="#F8D0B4"/><path d="M14 26 C16 10 48 10 50 26 C46 18 40 16 32 16 C24 16 18 18 14 26Z" fill="#6B3A34"/><path d="M18 50 Q32 38 46 50 Q42 60 32 60 Q22 60 18 50Z" fill="#F08AA4"/></svg>`,
  },
  {
    id: "vera",
    name: "Vera",
    age: "9 months",
    lessons: VERA_LESSONS,
    themes: VERA_THEMES,
    keys: { start: "cynthia-edu-vera-start", done: "cynthia-edu-vera-done", welcome: "cynthia-edu-vera-welcomed" },
    rates: { word: 0.62, sentence: 0.7, yay: 0.78, read: 0.7 },
    pitch: { word: 1.06, sentence: 1.03, yay: 1.1, read: 1.03 },
    kicker: "Today's word",
    statLabel: "Words practiced",
    tapHint: "Tap the picture. Watch her look.",
    ask: "With Vera",
    guideFoot: "Say it once. Watch her eyes. Stop when she looks away. A look or a coo counts.",
    welcome: "Vera is about 9 months. These days are for looking, listening, and playing together. Follow her eyes, and stop when she looks away.",
    ageNote: "At about 9 months, Vera is learning with her eyes, ears, and hands. High-contrast pictures, one word, a song, or a game of peekaboo is plenty. She does not need to say the word back. If she looks, reaches, or babbles, that is the lesson landing.",
    restartConfirm: "Make today Day 1? The next word will be Mama. Stars you already earned will stay.",
    restartToast: "Today is Day 1. Hello, Mama.",
    avatar: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#111"/><circle cx="32" cy="30" r="14" fill="#fff"/><circle cx="26" cy="28" r="2.5" fill="#111"/><circle cx="38" cy="28" r="2.5" fill="#111"/><path d="M26 36 Q32 42 38 36" fill="none" stroke="#ff2a2a" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: "mayla",
    name: "Mayla",
    birthday: "2025-04-09",
    lessons: MAYLA_LESSONS,
    themes: MAYLA_THEMES,
    keys: { start: "cynthia-edu-mayla-start", done: "cynthia-edu-mayla-done", welcome: "cynthia-edu-mayla-welcomed" },
    rates: { word: 0.7, sentence: 0.82, yay: 0.88, read: 0.82 },
    pitch: { word: 1.05, sentence: 1.02, yay: 1.1, read: 1.02 },
    kicker: "Today's word",
    statLabel: "Words practiced",
    tapHint: "Tap the picture. Say it together.",
    ask: "Ask Mayla",
    guideFoot: "Say it once. Wait five quiet seconds. A close sound counts. Stop while she is still having fun.",
    welcome(age) {
      return `Mayla is ${age}. Each day brings one small word or phrase, in an order made for her. Say it slowly, leave a quiet pause, and end while it still feels like play.`;
    },
    ageNote(age) {
      return `Mayla is ${age}. Her days start with first words and short phrases: Hi, then people, things she can hold, actions, and only later colors and counting. A close sound counts. This is play, not a test.`;
    },
    restartConfirm: "Make today Day 1? The next word will be Hi. Stars you already earned will stay.",
    restartToast: "Today is Day 1. The word is Hi.",
    avatar: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#E5F7F6"/><circle cx="32" cy="28" r="12" fill="#F8D0B4"/><path d="M16 30 C18 8 46 8 50 28 C44 16 24 14 16 30Z" fill="#3A2A22"/><circle cx="22" cy="24" r="6" fill="#3A2A22"/><path d="M18 50 Q32 40 46 50 Q42 60 32 60 Q22 60 18 50Z" fill="#2F9E96"/></svg>`,
  },
  {
    id: "noah",
    name: "Noah",
    birthday: "2023-09-18",
    lessons: NOAH_LESSONS,
    themes: NOAH_THEMES,
    keys: { start: "cynthia-edu-noah-start", done: "cynthia-edu-noah-done", welcome: "cynthia-edu-noah-welcomed" },
    rates: { word: 0.9, sentence: 0.92, yay: 0.95, read: 0.9 },
    pitch: { word: 1.0, sentence: 1.0, yay: 1.05, read: 1.0 },
    kicker: "Today's lesson",
    statLabel: "Lessons practiced",
    tapHint: "Tap the picture, then try the question.",
    ask: "Ask Noah",
    guideFoot: "Read the fact once. Let him tap an answer. A miss is a chance to hear the true sentence again.",
    welcome(age) {
      return `Noah is ${age}. Each day is a short true story from United States history or from how nature works, plus a three-tap question. Read it aloud and let him choose.`;
    },
    ageNote(age) {
      return `Noah is ${age}. His days alternate between United States history and how nature works. The numbers and dates are meant to be said out loud. A wrong tap is a chance to hear the true sentence again, then try the real world later: a flag, a leaf, a map, or the Moon.`;
    },
    restartConfirm: "Make today Day 1? The next lesson will be The flag. Stars you already earned will stay.",
    restartToast: "Today is Day 1. The lesson is The flag.",
    avatar: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="#E5F0FC"/><circle cx="32" cy="28" r="12" fill="#F8D0B4"/><path d="M18 24 C20 12 44 12 46 24 C40 18 24 18 18 24Z" fill="#3A2A22"/><path d="M18 50 Q32 40 46 50 Q42 60 32 60 Q22 60 18 50Z" fill="#3E86B8"/></svg>`,
  },
];
