import { batch, createSignal } from 'solid-js';
import { DeckEntry } from 'types:Deck';

const VOID_BOUNDS = { top: 0, left: 0, width: 0, height: 0 };

const [focusedCard, setFocusedCardValue] = createSignal<DeckEntry | null>(null);
const [focusedCardBounds, setBounds] = createSignal(VOID_BOUNDS);

export { focusedCard, focusedCardBounds };

export function setFocusedCard(card: DeckEntry, element: HTMLElement) {
  const bounds = element.getBoundingClientRect();
  const { top, left, width, height } = bounds;

  batch(() => {
    setFocusedCardValue(card);
    setBounds({ top, left, width, height });
  });
}

export function clearFocusedCard() {
  batch(() => {
    setFocusedCardValue(null);
    setBounds(VOID_BOUNDS);
  });
}
