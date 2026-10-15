/* Pentagonal Daily Education — one lesson a day for each child. */

(function () {
  const KEY_CHILD = "cynthia-edu-child";

  const main = document.getElementById("main");
  const toast = document.getElementById("toast");
  const memory = {};

  let tapCount = 0;
  let speakToken = 0;
  let bubbleTimer = 0;
  let lastCelebrate = 0;
  let slide = "forward";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function activeChild() {
    const saved = storeGet(KEY_CHILD);
    return EDU_CHILDREN.find((item) => item.id === saved) || EDU_CHILDREN[0];
  }

  function lessonList() {
    return activeChild().lessons;
  }

  function themeList() {
    return activeChild().themes;
  }

  function keys() {
    return activeChild().keys;
  }

  function childCopy(child, key) {
    const value = child[key];
    return typeof value === "function" ? value(displayedAge(child, today())) : value;
  }

  function siteTitle() {
    return "Pentagonal Daily Education";
  }

  function artFor(lesson) {
    const id = lesson && (lesson.picture || lesson.id);
    return CynthiaArt.svg(id || lessonList()[0].picture || lessonList()[0].id);
  }

  function storeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return memory[key] ?? null;
    }
  }

  function storeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      memory[key] = value;
    }
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function isoDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function parseISO(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function isValidISO(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    return isoDate(parseISO(value)) === value;
  }

  function addDays(date, days) {
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    next.setDate(next.getDate() + days);
    return next;
  }

  function daysBetween(a, b) {
    const ms = parseISO(isoDate(b)) - parseISO(isoDate(a));
    return Math.round(ms / 86400000);
  }

  function today() {
    return parseISO(isoDate(new Date()));
  }

  function getStart() {
    let saved = storeGet(keys().start);
    if (!saved || !isValidISO(saved)) {
      saved = isoDate(today());
      storeSet(keys().start, saved);
    }
    return parseISO(saved);
  }

  function loadDone() {
    try {
      const raw = JSON.parse(storeGet(keys().done) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (err) {
      return {};
    }
  }

  function saveDone(done) {
    storeSet(keys().done, JSON.stringify(done));
  }

  function themeById(id) {
    return themeList().find((theme) => theme.id === id) || themeList()[0];
  }

  function lessonById(id) {
    return lessonList().find((lesson) => lesson.id === id) || null;
  }

  function lessonForDate(date) {
    const start = getStart();
    const n = daysBetween(start, date);
    if (n < 0) {
      return { status: "before", daysUntil: -n, index: 0, round: 1, lesson: lessonList()[0] };
    }
    const index = n % lessonList().length;
    return {
      status: "ok",
      index,
      day: n + 1,
      round: Math.floor(n / lessonList().length) + 1,
      lesson: lessonList()[index],
    };
  }

  function nextDateForLesson(id) {
    const start = getStart();
    const idx = lessonList().findIndex((lesson) => lesson.id === id);
    const now = today();
    const n = daysBetween(start, now);
    if (n < 0) return addDays(start, idx);
    const delta = (idx - (n % lessonList().length) + lessonList().length) % lessonList().length;
    return addDays(now, delta);
  }

  function formatLong(date) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  function formatMonth(date) {
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch]));
  }

  function parseRoute() {
    const parts = (location.hash.replace(/^#/, "") || "/").split("/").filter(Boolean);
    if (parts[0] === "c" && EDU_CHILDREN.some((item) => item.id === parts[1])) {
      storeSet(KEY_CHILD, parts[1]);
      return { view: "lesson", dateISO: isoDate(today()), wordId: null };
    }
    if (parts[0] === "date" && isValidISO(parts[1] || "")) {
      return { view: "lesson", dateISO: parts[1], wordId: null };
    }
    if (parts[0] === "word" && lessonById(parts[1] || "")) {
      return { view: "lesson", dateISO: isoDate(today()), wordId: parts[1] };
    }
    if (parts[0] === "calendar") {
      const month = /^\d{4}-\d{2}$/.test(parts[1] || "") ? parts[1] : isoDate(today()).slice(0, 7);
      return { view: "calendar", month };
    }
    if (parts[0] === "progress") return { view: "progress" };
    return { view: "lesson", dateISO: isoDate(today()), wordId: null };
  }

  function go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function setBubble(text) {
    const bubble = document.querySelector(".say-bubble");
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.add("show");
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(() => bubble.classList.remove("show"), 1600);
  }

  function burst(el, kind) {
    if (reduceMotion || !el) return;
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.42;
    const count = kind === "hearts" ? 8 : 7;
    for (let i = 0; i < count; i += 1) {
      const spark = document.createElement("span");
      spark.className = `spark spark-${kind || "stars"}`;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 46 + Math.random() * 54;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      spark.style.setProperty("--dy", `${Math.sin(angle) * dist - 18}px`);
      spark.style.setProperty("--rot", `${Math.random() * 80 - 40}deg`);
      document.body.appendChild(spark);
      window.setTimeout(() => spark.remove(), 760);
    }
  }

  function confetti(el) {
    if (reduceMotion) return;
    const rect = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: 180, width: 0, height: 0 };
    const x = rect.left + (rect.width || 0) / 2;
    const y = rect.top + 20;
    const colors = ["#E56B8A", "#F2C14E", "#7DCEA0", "#7EB6FF", "#C9B6F5", "#F6A07A"];
    for (let i = 0; i < 26; i += 1) {
      const bit = document.createElement("i");
      bit.className = "confetti";
      bit.style.left = `${x}px`;
      bit.style.top = `${y}px`;
      bit.style.background = colors[i % colors.length];
      bit.style.setProperty("--dx", `${Math.random() * 220 - 110}px`);
      bit.style.setProperty("--dy", `${Math.random() * -160 - 40}px`);
      bit.style.setProperty("--rot", `${Math.random() * 520 - 260}deg`);
      bit.style.width = `${6 + Math.random() * 8}px`;
      bit.style.height = `${8 + Math.random() * 8}px`;
      bit.style.borderRadius = Math.random() > 0.5 ? "99px" : "3px";
      document.body.appendChild(bit);
      window.setTimeout(() => bit.remove(), 1100);
    }
  }

  function fillPips(count) {
    document.querySelectorAll(".pip").forEach((pip, index) => {
      pip.classList.toggle("on", index < count);
    });
    const hint = document.querySelector(".tap-hint");
    if (hint && count >= 3) hint.textContent = "Three times. That was sweet.";
  }

  async function say(lesson, mode) {
    const mine = ++speakToken;
    CynthiaAudio.unlock();
    const picture = document.querySelector(".picture");
    if (picture) {
      picture.classList.add("speaking");
      window.setTimeout(() => picture.classList.remove("speaking"), 1400);
    }
    if (mode === "sound") {
      setBubble(lesson.soundLabel || "Listen");
      CynthiaAudio.stopSounds();
      CynthiaAudio.play(lesson.sound, 0);
      return;
    }
    if (mode === "sentence") {
      setBubble(lesson.sentence);
      const child = activeChild();
      await CynthiaAudio.speak(lesson.sentence, { rate: child.rates.sentence, pitch: child.pitch.sentence });
      return;
    }
    if (mode === "related") {
      setBubble(mode.say || "");
    }
    const text = mode === "related" ? mode.say : (lesson.say || lesson.word);
    if (mode === "related") setBubble(mode.say);
    else setBubble(lesson.word);
    const withSound = mode === "picture" && lesson.sound;
    if (withSound) {
      CynthiaAudio.stopSounds();
      CynthiaAudio.play(lesson.sound, 0.85);
    }
    const child = activeChild();
    const rate = mode === "yay" ? child.rates.yay : child.rates.word;
    const pitch = mode === "yay" ? child.pitch.yay : child.pitch.word;
    await CynthiaAudio.speak(text, { rate, pitch });
    if (mine !== speakToken) return;
  }

  function react(lesson) {
    const picture = document.querySelector(".picture");
    if (!picture) return;
    const motion = lesson.motion || "pulse";
    picture.classList.remove("react-bounce", "react-wiggle", "react-hop", "react-wave", "react-spin", "react-pulse", "react-float");
    void picture.offsetWidth;
    picture.classList.add(`react-${motion}`);
    window.setTimeout(() => picture.classList.remove(`react-${motion}`), 760);
    burst(picture, lesson.particles || "stars");
    tapCount = Math.min(3, tapCount + 1);
    fillPips(tapCount);
    if (tapCount === 3) CynthiaAudio.celebrate();
  }

  function markDone(lesson, button) {
    const now = Date.now();
    if (now - lastCelebrate < 900) return;
    lastCelebrate = now;
    const done = loadDone();
    const already = Boolean(done[lesson.id]);
    done[lesson.id] = { on: isoDate(today()) };
    saveDone(done);
    const card = document.querySelector(".done-btn");
    if (card) {
      card.classList.add("is-done");
      card.innerHTML = `${starIcon()} Practiced`;
    }
    const undo = document.querySelector(".undo");
    if (undo) undo.hidden = false;
    const ribbon = document.querySelector(".ribbon");
    if (ribbon) ribbon.hidden = false;
    confetti(button || document.querySelector(".picture"));
    CynthiaAudio.unlock();
    CynthiaAudio.celebrate();
    setBubble("Yay!");
    const child = activeChild();
    CynthiaAudio.speak(`Yay! ${lesson.say || lesson.word}`, { rate: child.rates.yay, pitch: child.pitch.yay });
    showToast(already ? `${lesson.word} was already a star.` : `${lesson.word} is a star now.`);
    const starTab = document.querySelector('[data-tab="progress"]');
    if (starTab) {
      starTab.classList.add("pop");
      window.setTimeout(() => starTab.classList.remove("pop"), 500);
    }
  }

  function undoDone(lesson) {
    const done = loadDone();
    delete done[lesson.id];
    saveDone(done);
    showToast(`${lesson.word} is back to not yet.`);
    render();
  }

  function streak(done) {
    const dates = new Set(Object.values(done).map((item) => item && item.on).filter(Boolean));
    let cursor = today();
    if (!dates.has(isoDate(cursor))) cursor = addDays(cursor, -1);
    let count = 0;
    while (dates.has(isoDate(cursor))) {
      count += 1;
      cursor = addDays(cursor, -1);
    }
    return count;
  }

  function starIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 14.4 9l6.1.5-4.7 3.9 1.5 5.8L12 16.8 6.7 19.2 8.2 13.4 3.5 9.5 9.6 9 12 3.2Z"/></svg>`;
  }

  function speakerIcon() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9h4l5-4v14l-5-4H4V9Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10"/></svg>`;
  }

  function chevron(dir) {
    const d = dir < 0 ? "M14 5 L8 12 L14 19" : "M10 5 L16 12 L10 19";
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function renderLesson(route) {
    const date = parseISO(route.dateISO);
    const info = lessonForDate(date);
    const wordMode = Boolean(route.wordId);
    const lesson = wordMode ? lessonById(route.wordId) : info.lesson;
    const theme = themeById(lesson.theme);
    const done = loadDone();
    const isDone = Boolean(done[lesson.id]);
    const isToday = route.dateISO === isoDate(today()) && !wordMode;
    const isFuture = !wordMode && info.status === "ok" && daysBetween(today(), date) > 0;
    const isPast = !wordMode && info.status === "ok" && daysBetween(today(), date) < 0;
    const child = activeChild();
    let kicker = child.kicker;
    if (wordMode) kicker = "From the word list";
    else if (info.status === "before") kicker = "Before Day 1";
    else if (isFuture) kicker = "Coming up";
    else if (isPast) kicker = "A past day";
    if (!wordMode && info.status === "ok" && info.round > 1) kicker += ` · Round ${info.round}`;

    const dayLabel = wordMode
      ? `Word ${lessonList().findIndex((item) => item.id === lesson.id) + 1} of ${lessonList().length}`
      : info.status === "ok"
        ? `Day ${info.day} · ${theme.name}`
        : theme.name;

    document.title = `${lesson.word} · ${siteTitle()}`;

    if (!wordMode && info.status === "before") {
      main.innerHTML = `
        <article class="lesson view-enter ${slide}" data-theme="${theme.id}">
          ${dayBar(date, kicker)}
          <div class="before card">
            <div class="picture-wrap static">${artFor(lessonList()[0])}</div>
            <h1>Day 1 has not started.</h1>
            <p>${esc(lessonList()[0].word)} begins on ${esc(formatLong(getStart()))}. You can peek at any word in the list, and the days after Day 1 are ready to browse.</p>
            <div class="actions">
              <a class="btn primary" href="#/">Go to Day 1</a>
              <a class="btn ghost" href="#/progress">See all the words</a>
            </div>
          </div>
        </article>`;
      return;
    }

    const related = lesson.related.map((item) => (
      `<button type="button" class="chip" data-act="related" data-say="${esc(item.say)}">${esc(item.word)}</button>`
    )).join("");

    const soundBtn = lesson.sound
      ? `<button type="button" class="btn ghost" data-act="hear-sound">${speakerIcon()} Hear ${esc(lesson.soundLabel.toLowerCase())}</button>`
      : "";

    const welcome = isToday && !storeGet(keys().welcome)
      ? `<div class="welcome">
          <p>${esc(childCopy(child, "welcome"))}</p>
          <button type="button" data-act="welcome">Got it</button>
        </div>`
      : "";

    const when = wordMode
      ? `<p class="when-note">Next on the calendar: <a href="#/date/${isoDate(nextDateForLesson(lesson.id))}">${esc(formatLong(nextDateForLesson(lesson.id)))}</a></p>`
      : "";

    const neighbor = wordMode ? null : lessonForDate(addDays(date, 1));
    const tomorrow = !wordMode && neighbor.status === "ok"
      ? `<a class="tomorrow" href="#/date/${isoDate(addDays(date, 1))}">
          <span>${isToday ? "Tomorrow" : "Next day"}</span>
          <strong>${esc(neighbor.lesson.word)}</strong>
          ${chevron(1)}
        </a>`
      : "";

    main.innerHTML = `
      <article class="lesson view-enter ${slide}" data-theme="${theme.id}" data-lesson="${lesson.id}">
        ${dayBar(date, kicker)}
        <div class="stage card">
          <div class="stage-main">
            <p class="say-bubble" aria-hidden="true"></p>
            <button type="button" class="picture" data-act="picture" aria-label="Hear ${esc(lesson.word)}">
              ${artFor(lesson)}
            </button>
            <div class="pips" aria-hidden="true"><span class="pip"></span><span class="pip"></span><span class="pip"></span></div>
            <p class="tap-hint">${esc(child.tapHint)}</p>
          </div>
          <div class="stage-copy">
            <p class="pill">${esc(dayLabel)}</p>
            <p class="ribbon" ${isDone ? "" : "hidden"}>Practiced</p>
            <h1 class="word ${lesson.word.includes(" ") || lesson.word.includes("-") ? "phrase" : ""}">${esc(lesson.word)}</h1>
            <div class="related">${related}</div>
            <p class="sentence">${esc(lesson.sentence)}</p>
            <div class="actions">
              <button type="button" class="btn primary" data-act="hear-word">${speakerIcon()} Hear ${esc(lesson.word)}</button>
              <div class="action-row">
                <button type="button" class="btn ghost" data-act="hear-sentence">${speakerIcon()} Hear a sentence</button>
                ${soundBtn}
              </div>
              ${lesson.read ? `<button type="button" class="btn ghost" data-act="hear-read">${speakerIcon()} Read it to me</button>` : ""}
              <button type="button" class="btn done-btn ${isDone ? "is-done" : ""}" data-act="done">${starIcon()} ${isDone ? "Practiced" : "We did it"}</button>
              <button type="button" class="undo" data-act="undo" ${isDone ? "" : "hidden"}>Not yet</button>
            </div>
            ${when}
          </div>
        </div>
        ${welcome}
        ${tomorrow}
        ${lesson.read ? `<section class="fact card"><h2>Read this</h2><p>${esc(lesson.read)}</p></section>` : ""}
        ${quizBlock(lesson)}
        <details class="guide card">
          <summary>
            <span>
              <strong>For grown-ups</strong>
              <small>About ${esc(lesson.guide.minutes)} · ${child.id === "noah" ? "read, tap, talk" : "point, say, wait"}</small>
            </span>
            ${chevron(1)}
          </summary>
          <div class="guide-body">
            <section>
              <h2>How to teach it</h2>
              <p>${esc(lesson.guide.how)}</p>
            </section>
            <section>
              <h2>A little game</h2>
              <p>${esc(lesson.guide.activity)}</p>
            </section>
            <section>
              <h2>${esc(child.ask)}</h2>
              <p class="ask">“${esc(lesson.guide.question)}”</p>
            </section>
            <section>
              <h2>Later today</h2>
              <p>${esc(lesson.guide.followup)}</p>
            </section>
            <p class="why">${esc(lesson.guide.why)}</p>
            <p class="guide-foot">${esc(child.guideFoot)}</p>
          </div>
        </details>
      </article>`;
    tapCount = 0;
  }

  function quizBlock(lesson) {
    if (!lesson.quiz) return "";
    const choices = lesson.quiz.choices.map((choice, index) => (
      `<button type="button" class="quiz-choice" data-act="quiz" data-choice="${index}">${esc(choice)}</button>`
    )).join("");
    return `<section class="quiz card">
      <h2>Try this</h2>
      <p class="quiz-prompt">${esc(lesson.quiz.prompt)}</p>
      <div class="quiz-choices">${choices}</div>
      <p class="quiz-result" hidden></p>
    </section>`;
  }

  function dayBar(date, kicker) {
    return `<div class="daybar">
      <button type="button" class="nav-arrow" data-act="prev" aria-label="Previous day">${chevron(-1)}</button>
      <div class="day-meta">
        <a class="when" href="#/calendar/${isoDate(date).slice(0, 7)}">${esc(formatLong(date))}</a>
        <p class="kicker">${esc(kicker)}</p>
      </div>
      <button type="button" class="nav-arrow" data-act="next" aria-label="Next day">${chevron(1)}</button>
    </div>`;
  }

  function renderCalendar(route) {
    document.title = `Days · ${siteTitle()}`;
    const [year, month] = route.month.split("-").map(Number);
    const first = new Date(year, month - 1, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const done = loadDone();
    const todayISO = isoDate(today());
    const cells = [];
    for (let i = 0; i < startPad; i += 1) cells.push(`<span class="cal-empty"></span>`);
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month - 1, day);
      const iso = isoDate(date);
      const info = lessonForDate(date);
      const classes = ["cal-day"];
      if (iso === todayISO) classes.push("today");
      if (info.status === "before") classes.push("before");
      else classes.push(`theme-${info.lesson.theme}`);
      const star = info.status === "ok" && done[info.lesson.id] ? `<i class="dot-star" aria-hidden="true"></i>` : "";
      const label = info.status === "before" ? "Before Day 1" : info.lesson.word;
      cells.push(`<a class="${classes.join(" ")}" href="#/date/${iso}" aria-label="${esc(formatLong(date))}, ${esc(label)}"><span>${day}</span>${star}</a>`);
    }
    const infoToday = lessonForDate(today());
    const todayCard = infoToday.status === "ok"
      ? `<a class="preview-card card" href="#/">
          <span class="mini-art">${artFor(infoToday.lesson)}</span>
          <span><small>${esc(activeChild().kicker)}</small><strong>${esc(infoToday.lesson.word)}</strong></span>
          ${chevron(1)}
        </a>`
      : `<a class="preview-card card" href="#/"><span><small>Day 1</small><strong>${esc(lessonList()[0].word)}</strong></span>${chevron(1)}</a>`;

    main.innerHTML = `
      <section class="calendar view-enter">
        <div class="cal-head">
          <button type="button" class="nav-arrow" data-act="month" data-dir="-1" aria-label="Previous month">${chevron(-1)}</button>
          <h1>${esc(formatMonth(first))}</h1>
          <button type="button" class="nav-arrow" data-act="month" data-dir="1" aria-label="Next month">${chevron(1)}</button>
        </div>
        <div class="cal-week" aria-hidden="true"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
        <div class="cal-grid">${cells.join("")}</div>
        ${todayCard}
        <p class="cal-note">A star means that word has been practiced. Days before Day 1 wait quietly.</p>
      </section>`;
  }

  function renderProgress() {
    document.title = `Stars · ${siteTitle()}`;
    const done = loadDone();
    const count = lessonList().filter((lesson) => done[lesson.id]).length;
    const circ = 2 * Math.PI * 52;
    const filled = circ * (count / lessonList().length);
    const run = streak(done);
    const start = getStart();
    const info = lessonForDate(today());
    const journey = info.status === "before"
      ? `Day 1 begins ${formatLong(start)}.`
      : `Day 1 began ${formatLong(start)}. Today is day ${info.day}${info.round > 1 ? `, round ${info.round}` : ""}: ${info.lesson.word}.`;
    const groups = themeList().map((theme) => {
      const items = lessonList().filter((lesson) => lesson.theme === theme.id).map((lesson) => {
        const checked = done[lesson.id] ? `<span class="tick" aria-label="Practiced">${starIcon()}</span>` : "";
        return `<a class="mini" href="#/word/${lesson.id}" data-theme="${theme.id}">
          <span class="mini-art">${artFor(lesson)}</span>
          <span class="mini-word">${esc(lesson.word)}</span>
          ${checked}
        </a>`;
      }).join("");
      return `<section class="theme-block"><h2>${esc(theme.name)}</h2><div class="word-grid">${items}</div></section>`;
    }).join("");

    main.innerHTML = `
      <section class="progress view-enter">
        <div class="hero-stat card">
          <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-track" cx="60" cy="60" r="52"></circle>
            <circle class="ring-value" cx="60" cy="60" r="52" style="stroke-dasharray:${filled} ${circ}"></circle>
          </svg>
          <div>
            <p class="kicker">${esc(activeChild().statLabel)}</p>
            <p class="stat-num">${count}</p>
            <p class="stat-of">of ${lessonList().length}</p>
          </div>
        </div>
        <p class="streak">${run > 0 ? `${run} day${run === 1 ? "" : "s"} in a row` : "Practice a word to start a streak."}</p>
        <div class="journey card">
          <p>${esc(journey)}</p>
          <div class="action-row">
            <button type="button" class="btn ghost" data-act="restart">Make today Day 1</button>
            <button type="button" class="btn ghost" data-act="clear">Clear stars</button>
          </div>
          <p class="fine">Stars stay in this browser only, saved separately for ${esc(activeChild().name)}. Making today Day 1 keeps the stars you already earned.</p>
        </div>
        <p class="age-note">${esc(childCopy(activeChild(), "ageNote"))}</p>
        ${groups}
      </section>`;
  }

  function renderPicker() {
    const nav = document.getElementById("children");
    if (!nav) return;
    const current = activeChild().id;
    nav.innerHTML = EDU_CHILDREN.map((item) => `
      <button type="button" class="child-tab" role="tab" data-act="child" data-child="${item.id}" aria-selected="${item.id === current ? "true" : "false"}">
        <span class="avatar">${item.avatar}</span>
        <span class="child-meta"><strong>${esc(item.name)}</strong><small>${esc(displayedAge(item, today()))}</small></span>
      </button>`).join("");
    const brand = document.querySelector(".brand span");
    if (brand) brand.textContent = siteTitle();
    document.body.dataset.child = current;
  }

  function render() {
    const route = parseRoute();
    renderPicker();
    document.body.dataset.view = route.view;
    if (route.view === "calendar") renderCalendar(route);
    else if (route.view === "progress") renderProgress();
    else renderLesson(route);
    document.querySelectorAll(".tabbar a").forEach((link) => {
      const tab = link.dataset.tab;
      const on = (tab === "today" && route.view === "lesson" && !route.wordId && route.dateISO === isoDate(today()))
        || (tab === "calendar" && route.view === "calendar")
        || (tab === "progress" && route.view === "progress");
      link.setAttribute("aria-current", on ? "page" : "false");
    });
    const live = document.getElementById("live");
    const heading = document.querySelector("h1");
    if (live && heading) live.textContent = heading.textContent;
  }

  function currentLesson() {
    const route = parseRoute();
    if (route.view !== "lesson") return null;
    if (route.wordId) return lessonById(route.wordId);
    const info = lessonForDate(parseISO(route.dateISO));
    if (info.status === "before") return null;
    return info.lesson;
  }

  function shift(delta) {
    const route = parseRoute();
    slide = delta > 0 ? "forward" : "back";
    if (route.view !== "lesson") return;
    if (route.wordId) {
      const index = lessonList().findIndex((lesson) => lesson.id === route.wordId);
      const next = lessonList()[(index + delta + lessonList().length) % lessonList().length];
      go(`#/word/${next.id}`);
      return;
    }
    const date = addDays(parseISO(route.dateISO), delta);
    go(`#/date/${isoDate(date)}`);
  }

  function onClick(event) {
    const target = event.target.closest("[data-act]");
    if (!target) return;
    const act = target.dataset.act;
    const lesson = currentLesson();
    CynthiaAudio.unlock();
    if (act === "prev") shift(-1);
    else if (act === "next") shift(1);
    else if (act === "picture" && lesson) {
      react(lesson);
      say(lesson, "picture");
    } else if (act === "hear-word" && lesson) say(lesson, "word");
    else if (act === "hear-sentence" && lesson) say(lesson, "sentence");
    else if (act === "hear-sound" && lesson) say(lesson, "sound");
    else if (act === "related" && lesson) {
      burst(target, "stars");
      speakToken += 1;
      setBubble(target.dataset.say);
      const child = activeChild();
      CynthiaAudio.speak(target.dataset.say, { rate: child.rates.word, pitch: child.pitch.word });
    } else if (act === "done" && lesson) markDone(lesson, target);
    else if (act === "undo" && lesson) undoDone(lesson);
    else if (act === "child") {
      const id = target.dataset.child;
      if (!id || !EDU_CHILDREN.some((item) => item.id === id)) return;
      storeSet(KEY_CHILD, id);
      slide = "forward";
      go(`#/c/${id}`);
    } else if (act === "hear-read" && lesson) {
      const text = lesson.read || lesson.sentence;
      setBubble("Listen");
      const child = activeChild();
      speakToken += 1;
      CynthiaAudio.speak(text, { rate: child.rates.read, pitch: child.pitch.read });
    } else if (act === "quiz" && lesson && lesson.quiz) {
      const choice = Number(target.dataset.choice);
      const quiz = lesson.quiz;
      const box = target.closest(".quiz");
      if (!box || target.disabled) return;
      box.querySelectorAll("[data-act=quiz]").forEach((btn) => {
        btn.disabled = true;
        const index = Number(btn.dataset.choice);
        if (index === quiz.answer) btn.classList.add("is-right");
        else if (index === choice) btn.classList.add("is-wrong");
      });
      const result = box.querySelector(".quiz-result");
      const ok = choice === quiz.answer;
      result.hidden = false;
      result.textContent = ok ? `Yes. ${quiz.explain}` : `Good try. ${quiz.explain}`;
      if (ok) {
        confetti(target);
        CynthiaAudio.celebrate();
      }
      const child = activeChild();
      CynthiaAudio.speak(ok ? `Yes. ${quiz.explain}` : quiz.explain, { rate: child.rates.read, pitch: child.pitch.read });
    } else if (act === "welcome") {
      storeSet(keys().welcome, "1");
      const note = document.querySelector(".welcome");
      if (note) note.remove();
    } else if (act === "month") {
      const route = parseRoute();
      const [y, m] = route.month.split("-").map(Number);
      const next = new Date(y, m - 1 + Number(target.dataset.dir), 1);
      go(`#/calendar/${next.getFullYear()}-${pad(next.getMonth() + 1)}`);
    } else if (act === "restart") {
      const child = activeChild();
      if (window.confirm(child.restartConfirm)) {
        storeSet(keys().start, isoDate(today()));
        showToast(child.restartToast);
        go("#/");
      }
    } else if (act === "clear") {
      if (window.confirm(`Clear ${activeChild().name}'s stars on this device?`)) {
        saveDone({});
        showToast("Stars cleared.");
        render();
      }
    }
  }

  let swipe = null;
  document.addEventListener("touchstart", (event) => {
    if (event.target.closest("button, a, summary")) {
      swipe = null;
      return;
    }
    const touch = event.changedTouches[0];
    swipe = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!swipe) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipe.x;
    const dy = touch.clientY - swipe.y;
    swipe = null;
    if (document.body.dataset.view !== "lesson") return;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) shift(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea")) return;
    if (event.key === "ArrowLeft") shift(-1);
    if (event.key === "ArrowRight") shift(1);
  });

  document.addEventListener("click", onClick);
  window.addEventListener("hashchange", render);

  if (!window.speechSynthesis) {
    window.setTimeout(() => showToast("This browser will not speak out loud. You can still say the words together."), 600);
  }

  render();
})();
