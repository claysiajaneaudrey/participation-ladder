// One-off script: crop individual card images out of the source screenshot
// collages (from singaporeculinarypairs.com) into public/cards/<theme>/.
//
// The source images are browser screenshots (1024x559) showing a grid of
// cards. We detect each card by a fixed grid geometry measured from the
// screenshots, crop the inner illustration (dropping the number badge header
// and the baked-in name strip so the app can render its own bilingual labels),
// and write a clean square PNG per card.
//
// Run: npm run crop-cards
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '_source')
const OUT = join(__dirname, '..', 'public', 'cards')

// Grid geometry, measured from the 1024x559 screenshots.
// Each card: a colored header (number badge), a light illustration band, and a
// colored name strip. We crop the illustration band as a centered square.
const SHEETS = [
  {
    src: 'sgfood-a.jpg',
    theme: 'sg-food',
    cols: 4,
    rows: 2,
    grid: { left: 132, top: 56, cardW: 180, cardH: 222, colGap: 14, rowGap: 20 },
    names: [
      'hainan-chicken-rice', 'laksa', 'roti-prata', 'satay',
      'chili-crab', 'kaya-toast-kopi', 'ice-kachang', 'fish-head-curry',
    ],
  },
  {
    src: 'sgfood-b.jpg',
    theme: 'sg-food',
    cols: 4,
    rows: 2,
    grid: { left: 132, top: 56, cardW: 180, cardH: 222, colGap: 14, rowGap: 20 },
    // first row duplicates sheet A's first row; only crop the new second row
    skipFirstRow: true,
    names: [
      null, null, null, null,
      'nonya-kueh-lapis', 'bak-kut-teh', 'durian', 'oyster-omelette',
    ],
  },
  {
    src: 'animals.jpg',
    theme: 'animals',
    cols: 6,
    rows: 3,
    grid: { left: 85, top: 52, cardW: 135, cardH: 148, colGap: 9, rowGap: 13 },
    names: [
      'lion', 'elephant', 'giraffe', 'zebra', 'cheetah', 'hippopotamus',
      'orangutan', 'rhinoceros', 'komodo-dragon', 'shark', 'flamingo', 'whale',
      // NB: card #17 is labelled "SLOTHS" on the source sheet but the
      // illustration is clearly a giant panda — we name it to match the image.
      'octopus', 'kangaroo', 'sea-turtle', 'chimpanzee', 'panda', 'jellyfish',
    ],
  },
]

// Fraction of the card height taken by the number-badge header (top) and the
// name strip (bottom). The middle band is the clean illustration.
const HEADER_FRAC = 0.20
const FOOTER_FRAC = 0.18

async function run() {
  for (const sheet of SHEETS) {
    await mkdir(join(OUT, sheet.theme), { recursive: true })
    const { left, top, cardW, cardH, colGap, rowGap } = sheet.grid
    const img = sharp(join(SRC, sheet.src))
    const meta = await img.metadata()

    for (let r = 0; r < sheet.rows; r++) {
      if (sheet.skipFirstRow && r === 0) continue
      for (let c = 0; c < sheet.cols; c++) {
        const idx = r * sheet.cols + c
        const name = sheet.names[idx]
        if (!name) continue

        const cardLeft = left + c * (cardW + colGap)
        const cardTop = top + r * (cardH + rowGap)
        // illustration band within the card
        const bandTop = Math.round(cardTop + cardH * HEADER_FRAC)
        const bandH = Math.round(cardH * (1 - HEADER_FRAC - FOOTER_FRAC))
        // center a square of side = bandH horizontally within the card
        const side = Math.min(bandH, cardW)
        const sqLeft = Math.round(cardLeft + (cardW - side) / 2)

        // clamp to image bounds
        const cropLeft = Math.max(0, sqLeft)
        const cropTop = Math.max(0, bandTop)
        const cropW = Math.min(side, (meta.width ?? 1024) - cropLeft)
        const cropH = Math.min(side, (meta.height ?? 559) - cropTop)

        const outPath = join(OUT, sheet.theme, `${name}.png`)
        await sharp(join(SRC, sheet.src))
          .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
          .resize(400, 400, { fit: 'cover' })
          .png()
          .toFile(outPath)
        console.log('wrote', outPath)
      }
    }
  }

  // Build verification montages so alignment can be eyeballed.
  await buildMontage('sg-food', [
    'hainan-chicken-rice', 'laksa', 'roti-prata', 'satay',
    'chili-crab', 'kaya-toast-kopi', 'ice-kachang', 'fish-head-curry',
    'nonya-kueh-lapis', 'bak-kut-teh', 'durian', 'oyster-omelette',
  ], 4)
  await buildMontage('animals', SHEETS[2].names, 6)
}

async function buildMontage(theme, names, cols) {
  const cell = 120
  const rows = Math.ceil(names.length / cols)
  const composites = []
  for (let i = 0; i < names.length; i++) {
    const buf = await sharp(join(OUT, theme, `${names[i]}.png`))
      .resize(cell, cell)
      .toBuffer()
    composites.push({
      input: buf,
      left: (i % cols) * cell,
      top: Math.floor(i / cols) * cell,
    })
  }
  await sharp({
    create: { width: cols * cell, height: rows * cell, channels: 3, background: '#ffffff' },
  })
    .composite(composites)
    .png()
    .toFile(join(__dirname, `_montage-${theme}.png`))
  console.log('wrote montage', theme)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
