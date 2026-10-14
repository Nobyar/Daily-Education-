# Daily Education

A calm daily lesson for four children, and a short guide for their parents. The child picker at the top remembers the last child on this device. Each child has a separate set of stars.

- **Cynthia, 20 months.** One word or tiny phrase a day, starting with Mama. Her stars stay in the original browser keys.
- **Vera, 9 months.** High-contrast pictures, single words, peekaboo, songs, and touch games a parent leads.
- **Mayla, 19 months.** First words and short phrases in her own order, starting with Hi, with her name in every sentence.
- **Noah, 4 years.** Days alternate between United States history and how nature works. Each lesson has a short true paragraph, a read-aloud button, and a three-tap question.

There is no build step, no account, no ads, and no tracking. Pictures are original SVG. Speech uses the browser’s own voice. Stars are saved in `localStorage` on that device only.

## Open it on your computer

From this folder:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

The first time a child’s tab opens, that calendar day becomes **Day 1** for that child only. Cynthia’s Day 1 is Mama, then Dada, Hi, Bye-bye, More, All done, Milk, Ball, Dog, and Up please. Mayla’s Day 1 is Hi. Vera’s Day 1 is Mama. Noah’s Day 1 is the flag. After the last lesson, the path starts again.

Use the arrows, a swipe, or the **Days** calendar to open yesterday or a day still ahead. **Stars** marks a lesson practiced. Tap the picture to hear the word. Animal lessons also have a sound button.

## Children

The picker is the row of names under the title. The choice is saved as `cynthia-edu-child`.

| Child | Lessons | Stars |
| --- | --- | --- |
| Cynthia | `js/lessons.js` | `cynthia-start`, `cynthia-done`, `cynthia-welcomed` |
| Vera | `js/vera.js` | `cynthia-edu-vera-start`, `cynthia-edu-vera-done`, `cynthia-edu-vera-welcomed` |
| Mayla | `js/mayla.js` | `cynthia-edu-mayla-start`, `cynthia-edu-mayla-done`, `cynthia-edu-mayla-welcomed` |
| Noah | `js/noah.js` | `cynthia-edu-noah-start`, `cynthia-edu-noah-done`, `cynthia-edu-noah-welcomed` |

Vera’s pictures are in `js/art-vera.js`. Noah’s are in `js/art-noah.js`. Mayla reuses Cynthia’s pictures through a `picture` field, and her own ids keep her stars separate. Profiles live in `js/children.js`.

## Add a lesson

Cynthia’s lessons live in `js/lessons.js` as an array. The order of the array is the teaching order. Vera, Mayla, and Noah use the same shape in their own files. Noah also needs `read` and `quiz` with three `choices`, an `answer` index, and an `explain` sentence. Keep the history and science days alternating.

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
