# Cynthia's Daily Education

A calm daily lesson for Cynthia, about 20 months, and a short guide for her parents. Each day shows one word or tiny phrase: a big picture, a slow spoken voice, and a two-to-five minute way to play with it in real life.

There is no build step, no account, no ads, and no tracking. Pictures are original SVG. Speech uses the browser’s own voice. Stars are saved in `localStorage` on that device only.

## Open it on your computer

From this folder:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

The first time the site opens, that calendar day becomes **Day 1: Mama**. The next day is Dada, then Hi, Bye-bye, More, All done, Milk, Ball, Dog, and Up please. Later days move through body words, home, animals, food, actions, kind phrases, and only then colors and counting. After the last lesson, the path starts again at Mama for another gentle round.

Use the arrows, a swipe, or the **Days** calendar to open yesterday or a day still ahead. **Stars** marks a lesson practiced. Tap the picture to hear the word. Animal lessons also have a sound button.

## Add a lesson

Lessons live in `js/lessons.js` as an array. The order of the array is the teaching order.

1. Add an object to `CYNTHIA_LESSONS`.
2. Keep `id` unique. Do not change an id later if you want existing stars to stay attached to that word.
3. Add a picture with the same `id` in `PICTURES` inside `js/illustrations.js`.
4. If the word needs a sound, set `sound` to a name already in `js/audio.js` (`woof`, `meow`, `tweet`, `moo`, `quack`, `blub`, `boing`, `oink`, `neigh`, `baa`, `ribbit`), or add a new one there, and set `soundLabel` to the word you want on the button.
5. Refresh the page.

Each lesson needs:

| Field | What it is |
| --- | --- |
| `id` | Stable short name, used for stars |
| `word` | The big text on the page |
| `say` | What the voice should speak |
| `sentence` | One short line to say together |
| `theme` | One of the theme ids at the top of the file |
| `related` | One or two `{ word, say }` chips |
| `motion` | `pulse`, `bounce`, `wiggle`, `hop`, `wave`, `spin`, or `float` |
| `particles` | `hearts`, `stars`, `sparks`, `drops`, `bubbles`, or `leaves` |
| `guide` | `minutes`, `how`, `activity`, `question`, `followup`, and `why` |

`node tests/check.mjs` checks that every lesson has those fields, a picture, and valid SVG.

## For parents

Around 20 months, many toddlers are gathering names for people, food, animals, and body parts, plus a few useful chunks such as “bye-bye,” “all done,” and “up please.” A close sound counts. Point, say the word once, and wait a few quiet seconds. Stop while it still feels like play.

This site is not a screening tool. If you ever wonder about hearing, speech, or development, a pediatrician or speech-language pathologist is the right person to ask.

## Publish with GitHub Pages

The site is plain HTML, CSS, and JavaScript, so GitHub Pages can host it with no build server. The workflow in `.github/workflows/pages.yml` checks the lessons and, on the `main` branch, publishes the static files.

1. Merge this project into the `main` branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The **Deploy to GitHub Pages** workflow runs on the next push to `main`. You can also run it by hand from the Actions tab.

The published site should be:

[https://nobyar.github.io/Daily-Education-/](https://nobyar.github.io/Daily-Education-/)

The repository name ends with a hyphen, and the Pages address does too. Paths in the site are relative, so they work in that project folder.

## Fonts

Nunito and Baloo 2 are included in `fonts/` under the SIL Open Font License. See `fonts/OFL-Nunito.txt` and `fonts/OFL-Baloo-2.txt`.
