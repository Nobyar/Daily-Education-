/* Activity log for every child. Dates stay with the child.
   Lessons, quizzes, and Russian words are stored separately from stars. */

const ACTIVITY_KEY = "cynthia-edu-activity";
const ACTIVITY_CHILDREN = ["cynthia", "vera", "mayla", "noah"];

function isActivityISO(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function activityISOFromDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function activityAddDays(iso, days) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return activityISOFromDate(date);
}

function blankActivity() {
  return { cynthia: {}, vera: {}, mayla: {}, noah: {} };
}

function blankDay() {
  return { lessons: [], quizzes: [], russian: [] };
}

function normalizeActivity(raw) {
  const log = blankActivity();
  if (!raw || typeof raw !== "object") return log;
  ACTIVITY_CHILDREN.forEach((childId) => {
    const days = raw[childId];
    if (!days || typeof days !== "object") return;
    Object.keys(days).forEach((iso) => {
      if (!isActivityISO(iso)) return;
      const day = days[iso];
      if (!day || typeof day !== "object") return;
      const next = blankDay();
      if (Array.isArray(day.lessons)) {
        day.lessons.forEach((id) => {
          if (typeof id === "string" && id && !next.lessons.includes(id)) next.lessons.push(id);
        });
      }
      if (Array.isArray(day.quizzes)) {
        day.quizzes.forEach((item) => {
          if (!item || typeof item.id !== "string" || !item.id) return;
          const existing = next.quizzes.find((quiz) => quiz.id === item.id);
          if (existing) existing.ok = Boolean(item.ok);
          else next.quizzes.push({ id: item.id, ok: Boolean(item.ok) });
        });
      }
      if (Array.isArray(day.russian)) {
        day.russian.forEach((id) => {
          if (typeof id === "string" && id && !next.russian.includes(id)) next.russian.push(id);
        });
      }
      if (next.lessons.length || next.quizzes.length || next.russian.length) log[childId][iso] = next;
    });
  });
  return log;
}

function activityEnsureDay(log, childId, iso) {
  if (!log[childId]) log[childId] = {};
  if (!log[childId][iso]) log[childId][iso] = blankDay();
  return log[childId][iso];
}

function activityDropIfEmpty(log, childId, iso) {
  const day = log[childId] && log[childId][iso];
  if (!day) return;
  if (!day.lessons.length && !day.quizzes.length && !day.russian.length) delete log[childId][iso];
}

function activityAddLesson(log, childId, iso, lessonId) {
  if (!isActivityISO(iso) || !lessonId) return;
  const day = activityEnsureDay(log, childId, iso);
  if (!day.lessons.includes(lessonId)) day.lessons.push(lessonId);
}

function activityAddQuiz(log, childId, iso, lessonId, ok) {
  if (!isActivityISO(iso) || !lessonId) return;
  const day = activityEnsureDay(log, childId, iso);
  const existing = day.quizzes.find((quiz) => quiz.id === lessonId);
  if (existing) existing.ok = Boolean(ok);
  else day.quizzes.push({ id: lessonId, ok: Boolean(ok) });
}

function activityAddRussian(log, childId, iso, wordId) {
  if (!isActivityISO(iso) || !wordId) return;
  const day = activityEnsureDay(log, childId, iso);
  if (!day.russian.includes(wordId)) day.russian.push(wordId);
}

function activityRemoveLesson(log, childId, lessonId) {
  const days = log[childId];
  if (!days) return;
  Object.keys(days).forEach((iso) => {
    days[iso].lessons = days[iso].lessons.filter((id) => id !== lessonId);
    activityDropIfEmpty(log, childId, iso);
  });
}

function activityClearLessons(log, childId) {
  const days = log[childId];
  if (!days) return;
  Object.keys(days).forEach((iso) => {
    days[iso].lessons = [];
    activityDropIfEmpty(log, childId, iso);
  });
}

function activityMigrateStars(log, childId, done, fallbackISO) {
  Object.entries(done || {}).forEach(([id, value]) => {
    if (!id) return;
    const stored = typeof value === "string" ? value : value && value.on;
    const iso = isActivityISO(stored) ? stored : fallbackISO;
    if (iso) activityAddLesson(log, childId, iso, id);
  });
}

function activityMigrateRussian(log, stickers, fallbackISO) {
  Object.entries(stickers || {}).forEach(([id, value]) => {
    if (!id) return;
    const iso = isActivityISO(value) ? value : fallbackISO;
    if (iso) activityAddRussian(log, "noah", iso, id);
  });
}

function activityDayEntry(log, childId, iso) {
  const day = log[childId] && log[childId][iso];
  return day ? day : blankDay();
}

function activityDates(log, childId) {
  return Object.keys(log[childId] || {}).filter(isActivityISO).sort();
}

function activityStreak(dates, todayISO) {
  const have = new Set(dates);
  let cursor = todayISO;
  if (!have.has(cursor)) cursor = activityAddDays(todayISO, -1);
  let count = 0;
  while (have.has(cursor)) {
    count += 1;
    cursor = activityAddDays(cursor, -1);
  }
  return count;
}

function activityRecentLessons(log, childId, limit, labelFor) {
  const found = [];
  activityDates(log, childId).slice().reverse().forEach((iso) => {
    activityDayEntry(log, childId, iso).lessons.slice().reverse().forEach((id) => {
      if (found.length >= limit) return;
      const label = labelFor(id);
      if (!label || found.includes(label)) return;
      found.push(label);
    });
  });
  return found;
}

function activityUnique(log, childId, key) {
  const ids = new Set();
  activityDates(log, childId).forEach((iso) => {
    activityDayEntry(log, childId, iso)[key].forEach((item) => {
      ids.add(typeof item === "string" ? item : item.id);
    });
  });
  return ids;
}

function recentDayISOs(todayISO, count) {
  const days = [];
  for (let i = count - 1; i >= 0; i -= 1) days.push(activityAddDays(todayISO, -i));
  return days;
}

function joinAnd(items) {
  if (items.length <= 1) return items[0] || "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function progressBlurb(name, summary) {
  const lessons = summary.lessons || 0;
  const days = summary.days || 0;
  const recent = summary.recent || [];
  const streak = summary.streak || 0;
  const quizzes = summary.quizzes || 0;
  const russian = summary.russian || 0;
  if (!lessons && !days) return `${name} has not practiced on this device yet.`;
  const lessonWord = lessons === 1 ? "lesson" : "lessons";
  const dayWord = days === 1 ? "day" : "days";
  let sentence = lessons
    ? `${name} has done ${lessons} ${lessonWord} over ${days} ${dayWord}`
    : `${name} has been active on ${days} ${dayWord}`;
  if (recent.length) sentence += `, most recently ${joinAnd(recent)}`;
  const extras = [];
  if (russian) extras.push(`${russian} Russian ${russian === 1 ? "word" : "words"}`);
  if (quizzes) extras.push(`${quizzes} ${quizzes === 1 ? "quiz" : "quizzes"}`);
  if (extras.length) sentence += `, with ${joinAnd(extras)}`;
  sentence += streak > 0 ? `; on a ${streak}-day streak.` : "; the streak is ready to start.";
  return sentence;
}
