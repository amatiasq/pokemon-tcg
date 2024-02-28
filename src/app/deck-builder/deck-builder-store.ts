import { createSignal } from 'solid-js';

export interface SelectableCard extends DeckEntry {
  selected?: number;
}

const [cards, setCards] = createSignal<SelectableCard[]>([]);

export { cards as newDeckCards };

export function setCardCount(card: SelectableCard, count: number) {
  if (count === 0) {
    setCards(cards().filter((x) => x.id !== card.id));
    return;
  }

  const newEntry = { ...card, selected: count };
  const index = cards().findIndex((x) => x.id === card.id);

  if (index === -1) {
    setCards([...cards(), newEntry]);
    return;
  }

  const copy = [...cards()];
  copy[index] = newEntry;
  setCards(copy);
}

export const allCards = deckBuilderCards();

function deckBuilderCards() {
  const cards: Record<string, SelectableCard> = {};

  for (const deck of decks) {
    for (const card of deck.cards) {
      if (cards[card.key]) {
        cards[card.key].count += card.count;
      } else {
        cards[card.key] = { ...card, selected: 0 };
      }
    }
  }

  return Object.values(cards);
}
