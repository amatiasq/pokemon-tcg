import { SuperType } from 'types:Card';
import { DeckEntry } from 'types:Deck';
import { create } from 'zustand';

export interface CardFilters {
  cardType: SuperType | null;
  excludedEmojis: Set<string>;
  isEmojiExcluded: (emoji: string) => boolean;
  check: (card: DeckEntry) => boolean;
}

export const useCardFilters = create<CardFilters>((_, get) => ({
  cardType: null,
  excludedEmojis: new Set(),
  isEmojiExcluded: (emoji: string) => get().excludedEmojis.has(emoji),

  check(card) {
    const { cardType, isEmojiExcluded } = get();

    if (cardType && card.supertype !== cardType) {
      return false;
    }

    if (card.emojis.some(isEmojiExcluded)) {
      return false;
    }

    return true;
  },
}));

export function setCardTypeFilter(cardType: SuperType | null) {
  useCardFilters.setState((state) => ({
    cardType: cardType === state.cardType ? null : cardType,
  }));
}

export function toggleEmojiFilter(emoji: string) {
  useCardFilters.setState((state) => ({
    excludedEmojis: toggle(state.excludedEmojis, emoji),
  }));
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
