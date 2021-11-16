export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getFunName() {
  const adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'ugliest',
    'unsightly',
    'angry',
    'bewildered',
    'clumsy',
    'defeated',
    'embarrassed',
    'fierce',
    'grumpy',
    'helpless',
    'itchy',
    'jealous',
    'lazy',
    'mysterious',
    'nervous',
    'obnoxious',
    'panicky',
    'repulsive',
    'scary',
    'thoughtless',
    'uptight',
    'worried',
  ];

  const nouns = [
    'sour',
    'julep',
    'tonic',
    'cosmo',
    'collins',
    'elixir',
    'goblet',
    'delight',
    'splash',
    'martini',
    'martini',
    'martini',
    'sour',
    'sour',
    'G & T',
    'escape',
    'rye',
    'beer',
    'ice-tea',
    'tonic',
    'single-malt',
    'cup',
    'splash',
    'oases',
    'sour',
    'julep',
    'splash',
  ];

  return `${rando(adjectives)} ${rando(adjectives)} ${rando(nouns)}`;
}
