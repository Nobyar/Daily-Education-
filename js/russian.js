/* Russian words for Noah, age 4. Cyrillic is the spelling to read.
   say is an English-letter guide: the CAPITALS are the strong beat.
   KH is a soft h. ZH is the sound in "treasure". */

const RUSSIAN_THEMES = [
  {
    id: "hello",
    name: "The Doorway",
    place: "A front door in the snow",
    note: "Friends say привет. When you meet a teacher or someone new, здравствуйте is the polite hello. Пока is a quick bye. До свидания is the longer goodbye.",
  },
  {
    id: "colors",
    name: "The Color Garden",
    place: "Painted flowers",
    note: "Russian folk painting loves red, gold, and black. Long ago, the word красный also meant beautiful. Red Square in Moscow uses that old meaning: a beautiful square.",
  },
  {
    id: "numbers",
    name: "The Counting Path",
    place: "Ten stepping stones",
    note: "Count slowly and let Noah tap one stone for each word. One is один. Ten is десять.",
  },
  {
    id: "forest",
    name: "The Snowy Forest",
    place: "A fairy-tale wood",
    note: "Russian fairy tales are set in a deep, snowy forest. A clever fox, a wolf, and a big bear show up again and again. The Firebird, жар-птица, glows like fire, and story heroes search for her feathers.",
  },
  {
    id: "family",
    name: "The Family House",
    place: "A warm wooden house",
    note: "Бабушка means grandma and дедушка means grandpa. A matryoshka is a wooden doll, often painted like a girl, with smaller dolls nested inside.",
  },
  {
    id: "kitchen",
    name: "The Kitchen",
    place: "A pot on the stove",
    note: "Борщ is a soup made with beets, so it turns a deep red. People eat it hot, with bread and often a spoon of sour cream. Bread, хлеб, is an honored food.",
  },
  {
    id: "body",
    name: "Point and Say",
    place: "A mirror",
    note: "Point and say the word. One eye is глаз. Рука means the hand and the arm together. Нога means the foot and the leg together.",
  },
];

const RUSSIAN_WORDS = [
  { id: "ru-privet", theme: "hello", cyrillic: "Привет", say: "pree-VYET", en: "Hi", hint: "A hello for friends and family." },
  { id: "ru-hello", theme: "hello", cyrillic: "Здравствуйте", say: "ZDRAHST-vooy-tye", en: "Hello", hint: "The polite hello. The first в is often quiet." },
  { id: "ru-bye", theme: "hello", cyrillic: "Пока", say: "pa-KAH", en: "Bye", hint: "A short goodbye for people you know." },
  { id: "ru-goodbye", theme: "hello", cyrillic: "До свидания", say: "duh svee-DAH-nee-ya", en: "Goodbye", hint: "A fuller goodbye." },
  { id: "ru-please", theme: "hello", cyrillic: "Пожалуйста", say: "pa-ZHAHL-sta", en: "Please", hint: "It also means you're welcome." },
  { id: "ru-thanks", theme: "hello", cyrillic: "Спасибо", say: "spa-SEE-ba", en: "Thank you" },
  { id: "ru-yes", theme: "hello", cyrillic: "Да", say: "DAH", en: "Yes" },
  { id: "ru-no", theme: "hello", cyrillic: "Нет", say: "NYET", en: "No" },
  { id: "ru-how", theme: "hello", cyrillic: "Как дела?", say: "kahk dee-LAH", en: "How are you?" },
  { id: "ru-good", theme: "hello", cyrillic: "Хорошо", say: "kha-ra-SHO", en: "Good" },
  { id: "ru-name", theme: "hello", cyrillic: "Меня зовут Ноа", say: "mee-NYA za-VOOT NO-ah", en: "My name is Noah", hint: "Ноа is Noah. The capitals are the strong beats." },

  { id: "ru-red", theme: "colors", cyrillic: "Красный", say: "KRAHS-niy", en: "Red" },
  { id: "ru-blue", theme: "colors", cyrillic: "Синий", say: "SEE-neey", en: "Blue" },
  { id: "ru-yellow", theme: "colors", cyrillic: "Жёлтый", say: "ZHOL-tiy", en: "Yellow" },
  { id: "ru-green", theme: "colors", cyrillic: "Зелёный", say: "zee-LYOH-niy", en: "Green" },
  { id: "ru-white", theme: "colors", cyrillic: "Белый", say: "BYEH-liy", en: "White" },
  { id: "ru-black", theme: "colors", cyrillic: "Чёрный", say: "CHOR-niy", en: "Black" },

  { id: "ru-1", theme: "numbers", cyrillic: "Один", say: "a-DEEN", en: "One" },
  { id: "ru-2", theme: "numbers", cyrillic: "Два", say: "DVAH", en: "Two" },
  { id: "ru-3", theme: "numbers", cyrillic: "Три", say: "TREE", en: "Three" },
  { id: "ru-4", theme: "numbers", cyrillic: "Четыре", say: "chi-TI-rye", en: "Four" },
  { id: "ru-5", theme: "numbers", cyrillic: "Пять", say: "PYAHT", en: "Five" },
  { id: "ru-6", theme: "numbers", cyrillic: "Шесть", say: "SHEST", en: "Six" },
  { id: "ru-7", theme: "numbers", cyrillic: "Семь", say: "SYEM", en: "Seven" },
  { id: "ru-8", theme: "numbers", cyrillic: "Восемь", say: "VOH-syem", en: "Eight" },
  { id: "ru-9", theme: "numbers", cyrillic: "Девять", say: "DYEH-vyat", en: "Nine" },
  { id: "ru-10", theme: "numbers", cyrillic: "Десять", say: "DYEH-syat", en: "Ten" },

  { id: "ru-bear", theme: "forest", cyrillic: "Медведь", say: "myed-VYET", en: "Bear" },
  { id: "ru-fox", theme: "forest", cyrillic: "Лиса", say: "lee-SAH", en: "Fox" },
  { id: "ru-wolf", theme: "forest", cyrillic: "Волк", say: "VOLK", en: "Wolf" },
  { id: "ru-hare", theme: "forest", cyrillic: "Заяц", say: "ZAH-yits", en: "Hare" },
  { id: "ru-owl", theme: "forest", cyrillic: "Сова", say: "sa-VAH", en: "Owl" },
  { id: "ru-squirrel", theme: "forest", cyrillic: "Белка", say: "BYEL-ka", en: "Squirrel" },
  { id: "ru-firebird", theme: "forest", cyrillic: "Жар-птица", say: "zhar-PTEE-tsa", en: "Firebird", hint: "A glowing bird from Russian fairy tales." },

  { id: "ru-mom", theme: "family", cyrillic: "Мама", say: "MAH-ma", en: "Mom" },
  { id: "ru-dad", theme: "family", cyrillic: "Папа", say: "PAH-pa", en: "Dad" },
  { id: "ru-brother", theme: "family", cyrillic: "Брат", say: "BRAHT", en: "Brother" },
  { id: "ru-sister", theme: "family", cyrillic: "Сестра", say: "sye-STRAH", en: "Sister" },
  { id: "ru-grandma", theme: "family", cyrillic: "Бабушка", say: "BAH-boosh-ka", en: "Grandma" },
  { id: "ru-grandpa", theme: "family", cyrillic: "Дедушка", say: "DYEH-doosh-ka", en: "Grandpa" },
  { id: "ru-doll", theme: "family", cyrillic: "Матрёшка", say: "mat-RYOSH-ka", en: "Nesting doll", hint: "A doll with smaller dolls inside." },

  { id: "ru-bread", theme: "kitchen", cyrillic: "Хлеб", say: "KHLYEP", en: "Bread" },
  { id: "ru-milk", theme: "kitchen", cyrillic: "Молоко", say: "ma-la-KOH", en: "Milk" },
  { id: "ru-apple", theme: "kitchen", cyrillic: "Яблоко", say: "YAB-luh-ka", en: "Apple" },
  { id: "ru-soup", theme: "kitchen", cyrillic: "Суп", say: "SOOP", en: "Soup" },
  { id: "ru-borscht", theme: "kitchen", cyrillic: "Борщ", say: "BORSHCH", en: "Borscht", hint: "A beet soup. It is deep red." },
  { id: "ru-water", theme: "kitchen", cyrillic: "Вода", say: "va-DAH", en: "Water" },

  { id: "ru-nose", theme: "body", cyrillic: "Нос", say: "NOHS", en: "Nose" },
  { id: "ru-eye", theme: "body", cyrillic: "Глаз", say: "GLAHS", en: "Eye", hint: "Глаз is one eye." },
  { id: "ru-hand", theme: "body", cyrillic: "Рука", say: "roo-KAH", en: "Hand", hint: "Рука is the hand and the arm." },
  { id: "ru-foot", theme: "body", cyrillic: "Нога", say: "na-GAH", en: "Foot", hint: "Нога is the foot and the leg." },
  { id: "ru-ear", theme: "body", cyrillic: "Ухо", say: "OO-kha", en: "Ear" },
  { id: "ru-mouth", theme: "body", cyrillic: "Рот", say: "ROHT", en: "Mouth" },
];

function russianTheme(id) {
  return RUSSIAN_THEMES.find((theme) => theme.id === id) || null;
}

function russianWord(id) {
  return RUSSIAN_WORDS.find((word) => word.id === id) || null;
}

function russianWordsIn(themeId) {
  return RUSSIAN_WORDS.filter((word) => word.theme === themeId);
}

function russianWordForDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const epoch = new Date(2025, 0, 1);
  const days = Math.round((date - epoch) / 86400000);
  const index = ((days % RUSSIAN_WORDS.length) + RUSSIAN_WORDS.length) % RUSSIAN_WORDS.length;
  return RUSSIAN_WORDS[index];
}
