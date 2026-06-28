import type { Theme } from './types'

/**
 * Two starter themes. Each theme's cards are reused in BOTH the memory game
 * and the riddle clues, so the whole session hangs on one familiar idea.
 * Card images were cropped from the source sheets by scripts/crop-cards.mjs.
 */

const sgFood: Theme = {
  id: 'sg-food',
  name: { en: 'Local SG Food', zh: '本地新加坡美食' },
  blurb: {
    en: 'Hawker favourites many seniors grew up with — full of taste, smell and memory.',
    zh: '许多长辈从小吃到大的小贩美食——充满味道、香气和回忆。',
  },
  icon: '🍜',
  accent: 'amber',
  cards: [
    { id: 'hainan-chicken-rice', image: '/cards/sg-food/hainan-chicken-rice.png', name: { en: 'Hainanese Chicken Rice', zh: '海南鸡饭' } },
    { id: 'laksa', image: '/cards/sg-food/laksa.png', name: { en: 'Laksa', zh: '叻沙' } },
    { id: 'roti-prata', image: '/cards/sg-food/roti-prata.png', name: { en: 'Roti Prata', zh: '印度煎饼' } },
    { id: 'satay', image: '/cards/sg-food/satay.png', name: { en: 'Satay', zh: '沙爹' } },
    { id: 'chili-crab', image: '/cards/sg-food/chili-crab.png', name: { en: 'Chilli Crab', zh: '辣椒螃蟹' } },
    { id: 'kaya-toast-kopi', image: '/cards/sg-food/kaya-toast-kopi.png', name: { en: 'Kaya Toast & Kopi', zh: '咖椰吐司配咖啡' } },
    { id: 'ice-kachang', image: '/cards/sg-food/ice-kachang.png', name: { en: 'Ice Kachang', zh: '红豆冰' } },
    { id: 'fish-head-curry', image: '/cards/sg-food/fish-head-curry.png', name: { en: 'Fish Head Curry', zh: '咖喱鱼头' } },
    { id: 'nonya-kueh-lapis', image: '/cards/sg-food/nonya-kueh-lapis.png', name: { en: 'Nonya Kueh Lapis', zh: '娘惹千层糕' } },
    { id: 'bak-kut-teh', image: '/cards/sg-food/bak-kut-teh.png', name: { en: 'Bak Kut Teh', zh: '肉骨茶' } },
    { id: 'durian', image: '/cards/sg-food/durian.png', name: { en: 'Durian', zh: '榴莲' } },
    { id: 'oyster-omelette', image: '/cards/sg-food/oyster-omelette.png', name: { en: 'Oyster Omelette', zh: '蚝煎' } },
  ],
  riddles: [
    {
      id: 'f1',
      clue: {
        en: 'I am white rice cooked in chicken broth, served with tender chicken. Many call me Singapore’s national dish.',
        zh: '我是用鸡汤煮的白饭，配上嫩嫩的鸡肉。很多人说我是新加坡的国民美食。',
      },
      answerCardId: 'hainan-chicken-rice',
      optionCardIds: ['hainan-chicken-rice', 'laksa', 'satay'],
    },
    {
      id: 'f2',
      clue: {
        en: 'I am a spicy coconut noodle soup, often with prawns and a rich red broth.',
        zh: '我是辣辣的椰浆面汤，常常有虾，汤底浓浓红红的。',
      },
      answerCardId: 'laksa',
      optionCardIds: ['laksa', 'fish-head-curry', 'bak-kut-teh'],
    },
    {
      id: 'f3',
      clue: {
        en: 'You tear me with your hands and dip me in curry. I am flat, golden and flaky.',
        zh: '你用手撕开我，蘸咖喱吃。我又扁又金黄，层层酥脆。',
      },
      answerCardId: 'roti-prata',
      optionCardIds: ['roti-prata', 'kaya-toast-kopi', 'satay'],
    },
    {
      id: 'f4',
      clue: {
        en: 'I am grilled meat on a little stick, eaten with sweet peanut sauce.',
        zh: '我是串在小竹签上的烤肉，配甜甜的花生酱吃。',
      },
      answerCardId: 'satay',
      optionCardIds: ['satay', 'chili-crab', 'roti-prata'],
    },
    {
      id: 'f5',
      clue: {
        en: 'I am a sweet icy treat with red beans and colourful syrup — perfect on a hot day.',
        zh: '我是甜甜的刨冰，有红豆和五颜六色的糖浆——大热天最适合吃。',
      },
      answerCardId: 'ice-kachang',
      optionCardIds: ['ice-kachang', 'durian', 'nonya-kueh-lapis'],
    },
    {
      id: 'f6',
      clue: {
        en: 'I am the king of fruits — spiky on the outside, soft and strong-smelling inside.',
        zh: '我是水果之王——外面有刺，里面软软的，味道很浓。',
      },
      answerCardId: 'durian',
      optionCardIds: ['durian', 'ice-kachang', 'oyster-omelette'],
    },
  ],
  prompts: [
    { level: 'verbal', text: { en: 'What food is this?', zh: '这是什么食物？' } },
    { level: 'verbal', text: { en: 'Is it sweet, salty or spicy?', zh: '它是甜的、咸的，还是辣的？' } },
    { level: 'sharing', text: { en: 'Did you eat this often when you were younger?', zh: '你年轻的时候常常吃这个吗？' } },
    { level: 'sharing', text: { en: 'Who used to cook this for you?', zh: '以前是谁煮这个给你吃的？' } },
    { level: 'sharing', text: { en: 'Where did you like to eat this?', zh: '你以前喜欢在哪里吃这个？' } },
  ],
}

const animals: Theme = {
  id: 'animals',
  name: { en: 'Animals', zh: '动物' },
  blurb: {
    en: 'Friendly creatures from the zoo, the farm and far away — easy to recognise and fun to name.',
    zh: '来自动物园、农场和远方的可爱动物——容易认得，叫出名字也很有趣。',
  },
  icon: '🦁',
  accent: 'emerald',
  cards: [
    { id: 'lion', image: '/cards/animals/lion.png', name: { en: 'Lion', zh: '狮子' } },
    { id: 'elephant', image: '/cards/animals/elephant.png', name: { en: 'Elephant', zh: '大象' } },
    { id: 'giraffe', image: '/cards/animals/giraffe.png', name: { en: 'Giraffe', zh: '长颈鹿' } },
    { id: 'zebra', image: '/cards/animals/zebra.png', name: { en: 'Zebra', zh: '斑马' } },
    { id: 'cheetah', image: '/cards/animals/cheetah.png', name: { en: 'Cheetah', zh: '猎豹' } },
    { id: 'hippopotamus', image: '/cards/animals/hippopotamus.png', name: { en: 'Hippopotamus', zh: '河马' } },
    { id: 'orangutan', image: '/cards/animals/orangutan.png', name: { en: 'Orangutan', zh: '红毛猩猩' } },
    { id: 'rhinoceros', image: '/cards/animals/rhinoceros.png', name: { en: 'Rhinoceros', zh: '犀牛' } },
    { id: 'komodo-dragon', image: '/cards/animals/komodo-dragon.png', name: { en: 'Komodo Dragon', zh: '科莫多巨蜥' } },
    { id: 'shark', image: '/cards/animals/shark.png', name: { en: 'Shark', zh: '鲨鱼' } },
    { id: 'flamingo', image: '/cards/animals/flamingo.png', name: { en: 'Flamingo', zh: '火烈鸟' } },
    { id: 'whale', image: '/cards/animals/whale.png', name: { en: 'Whale', zh: '鲸鱼' } },
    { id: 'octopus', image: '/cards/animals/octopus.png', name: { en: 'Octopus', zh: '章鱼' } },
    { id: 'kangaroo', image: '/cards/animals/kangaroo.png', name: { en: 'Kangaroo', zh: '袋鼠' } },
    { id: 'sea-turtle', image: '/cards/animals/sea-turtle.png', name: { en: 'Sea Turtle', zh: '海龟' } },
    { id: 'chimpanzee', image: '/cards/animals/chimpanzee.png', name: { en: 'Chimpanzee', zh: '黑猩猩' } },
    { id: 'panda', image: '/cards/animals/panda.png', name: { en: 'Panda', zh: '熊猫' } },
    { id: 'jellyfish', image: '/cards/animals/jellyfish.png', name: { en: 'Jellyfish', zh: '水母' } },
  ],
  riddles: [
    {
      id: 'a1',
      clue: {
        en: 'I have a very long neck and I eat leaves from the tops of tall trees.',
        zh: '我的脖子很长很长，我吃高高树上的叶子。',
      },
      answerCardId: 'giraffe',
      optionCardIds: ['giraffe', 'zebra', 'elephant'],
    },
    {
      id: 'a2',
      clue: {
        en: 'I have a big golden mane and people call me the king of the animals.',
        zh: '我有金色的大鬃毛，大家叫我万兽之王。',
      },
      answerCardId: 'lion',
      optionCardIds: ['lion', 'cheetah', 'orangutan'],
    },
    {
      id: 'a3',
      clue: {
        en: 'I look a little like a horse, but I am covered in black and white stripes.',
        zh: '我有点像马，但是身上有黑白条纹。',
      },
      answerCardId: 'zebra',
      optionCardIds: ['zebra', 'giraffe', 'panda'],
    },
    {
      id: 'a4',
      clue: {
        en: 'I am black and white, and I love to sit and eat bamboo.',
        zh: '我是黑白色的，最喜欢坐着吃竹子。',
      },
      answerCardId: 'panda',
      optionCardIds: ['panda', 'zebra', 'chimpanzee'],
    },
    {
      id: 'a5',
      clue: {
        en: 'I have a long trunk and very big ears, and I am one of the largest animals on land.',
        zh: '我有长长的鼻子和大大的耳朵，是陆地上最大的动物之一。',
      },
      answerCardId: 'elephant',
      optionCardIds: ['elephant', 'hippopotamus', 'rhinoceros'],
    },
    {
      id: 'a6',
      clue: {
        en: 'I am the biggest animal in the whole ocean, and I swim very gently.',
        zh: '我是整个海洋里最大的动物，游起来很温柔。',
      },
      answerCardId: 'whale',
      optionCardIds: ['whale', 'shark', 'sea-turtle'],
    },
  ],
  prompts: [
    { level: 'verbal', text: { en: 'What animal is this?', zh: '这是什么动物？' } },
    { level: 'verbal', text: { en: 'What sound does it make?', zh: '它会发出什么声音？' } },
    { level: 'sharing', text: { en: 'Have you ever seen this animal in real life?', zh: '你有亲眼见过这个动物吗？' } },
    { level: 'sharing', text: { en: 'Did you ever visit the zoo with your family?', zh: '你有和家人一起去过动物园吗？' } },
    { level: 'sharing', text: { en: 'Did you have a favourite animal when you were young?', zh: '你小时候有最喜欢的动物吗？' } },
  ],
}

export const THEMES: Theme[] = [sgFood, animals]

export function getTheme(id: string | undefined): Theme | undefined {
  return THEMES.find((t) => t.id === id)
}
