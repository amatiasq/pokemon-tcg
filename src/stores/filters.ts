import { createSignal } from 'solid-js';
import { SuperType } from 'types:Card';
import { DeckEntry } from 'types:Deck';

export const [cardTypeFilter, setCardTypeFilter] =
  createSignal<SuperType | null>(null);

const [excludedEmojis, setExcludedEmojis] = createSignal<Set<string>>(
  new Set()
);

export function isEmojiExcluded(emoji: string) {
  return excludedEmojis().has(emoji);
}

export function check(card: DeckEntry) {
  if (cardTypeFilter() && card.supertype !== cardTypeFilter()) {
    return false;
  }

  if (card.emojis.some(isEmojiExcluded)) {
    return false;
  }

  return true;
}

export function toggleEmojiFilter(emoji: string) {
  setExcludedEmojis((data) => toggle(data, emoji));
}

function toggle<T>(data: Set<T>, value: T) {
  const copy = new Set(data);

  if (copy.has(value)) {
    copy.delete(value);
  } else {
    copy.add(value);
  }

  return copy;
}
