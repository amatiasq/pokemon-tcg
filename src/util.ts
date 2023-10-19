export function deck(list: string) {
  return list
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}
