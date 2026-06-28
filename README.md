# 🪜 Participation Ladder · 参与阶梯

A small, warm planning tool that helps **volunteers run inclusive
memory-engagement activities for seniors**. Every senior can take part in their
own way, at their own pace — and **participation is always a choice**.

## The idea

The **Participation Ladder** describes three gentle, equally-valuable ways a
senior can join in:

| Rung | | What it means |
|---|---|---|
| 👀 **Visual** | 看一看 · 指一指 | Look at and point to a familiar picture |
| 💬 **Verbal** | 说一说 · 答一答 | Name the picture or answer a simple question |
| ❤️ **Sharing** | 分享回忆 | Tell a memory the picture brings back |

Each **session links two games through one shared familiar theme**:

1. A **memory-card game** — match pairs of familiar picture cards.
2. A **riddle game** — the volunteer reads a clue aloud and the *same* cards
   from the memory game reappear as **picture clues**, so the senior can point
   to, name, or share a memory about the answer.

Reusing one set of pictures keeps the whole session connected and easy to
follow.

## Pages

1. **Home** — the Participation Ladder explained (the three rungs).
2. **How It Works** — the four-step session flow (memory → riddle, same theme).
3. **Choose Theme** — pick a theme (starts with *Local SG Food* and *Animals*).
4. **Activity Plan** — a ready-to-run flow for the chosen theme: the card deck,
   a playable memory-matching game, the riddle game reusing the same pictures,
   and sharing prompts. Copy the plan as text.
5. **Prompt Bank** — bilingual EN/中文 phrases to read aloud, grouped by rung.
6. **Reflection** — a short post-session form (what worked, which rungs seniors
   joined at, what to improve). Saved in memory for your visit; copy or download
   the plan + reflection as text.

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router** for navigation
- **No backend** — all content lives in plain TS files under `src/data/`.
  Session state (selected theme, reflection) is held in a React context; nothing
  is persisted to a server or to `localStorage`.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

## Project structure

```
public/cards/         # card images, by theme
  sg-food/            #   12 Local SG Food cards
  animals/            #   18 Animal cards
src/
  data/               # types, ladder + prompts, themes (cards, riddles)
  components/          # Layout, PictureCard, MemoryGame, RiddleGame, common UI
  pages/              # Home, HowItWorks, ChooseTheme, ActivityPlan, PromptBank, Reflection
  util/exportText.ts  # builds the copy/export text for plan + reflection
scripts/crop-cards.mjs # one-off: crops card images from the source sheets
```

## Card images

The card illustrations were cropped from theme "card sheet" screenshots using a
one-off [`sharp`](https://sharp.pixelplumbing.com/) script:

```bash
npm run crop-cards   # reads scripts/_source/*.jpg → public/cards/<theme>/*.png
```

The script detects each card by a measured grid geometry and crops the central
illustration into a clean square PNG. (The source images themselves are not
committed; the generated cards under `public/cards/` are.)

> **Note:** On the source animal sheet, card #17 was labelled "SLOTHS" but the
> illustration is clearly a **giant panda**. It is named `panda` here so the
> picture matches the name — important for a senior naming game.

## Design notes

Clean, calm and warm — a mature clay/sand palette on cream, the Nunito typeface
(with a system fallback), an 18px base font size, large tap targets and generous
spacing. Friendly and clear for an older audience, never childish. A visible
reminder that **seniors should never be pressured to participate** appears
across the app, and `prefers-reduced-motion` is respected.

## Scope

This is an MVP: Home + theme selection + one fully working sample activity flow
(memory cards → riddles on a shared theme) + picture clues + a small bilingual
prompt bank + a reflection form. Two themes ship ready to use.
