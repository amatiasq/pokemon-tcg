import { createSignal } from 'solid-js';
import { DeckEntry } from 'types:Deck';

export interface SelectableCard extends DeckEntry {
  selected: number;
}

// const [name, setName] = createSignal('');
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
