export function deck(list: string) {
  return list
    .split('\n')
    .map((x) => {
      const match = x.match(/^([^ ]+)( x\d+)?/);

      if (!match) {
        console.error('Invalid deck item:', x);
        return;
      }

      const [, id, count] = match;
      return { id, count: count ? parseInt(count.slice(2)) : 1 };
    })
    .filter(Boolean);
}
