const name = 'Klefki';
const index = 96;

const { cards } = await fetch(`https://api.tcgdex.net/v2/en/name/${name}`).then(
  (x) => x.json()
);

const cleanId = cards.map((x) => ({
  ...x,
  id: x.id.replace(/(?<!\d)0/g, ''),
}));

const byName = cleanId.filter((x) => x.name === name);
const withId = byName.filter((x) => x.id.endsWith(index));

console.log(withId.lenth ? withId : byName);
