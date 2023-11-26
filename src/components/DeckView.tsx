import { JSX } from 'solid-js';
import { Deck, DeckEntry } from 'types:Deck';
import { check } from '../stores/filters';
import { DeckStats } from './DeckStats';
import './DeckView.css';

export interface DeckViewProps {
  deck: Deck;
  children: (card: DeckEntry) => JSX.Element;
}

export function DeckView({ deck, children }: DeckViewProps) {
  const count = (list: DeckEntry[]) =>
    list.reduce((acc, card) => acc + card.count, 0);

  const cards = deck.cards.filter(check);
  const total = count(deck.cards);
  const visible = count(cards);

  return (
    <div class="deck">
      <h2>
        {deck.name}{' '}
        <small>
          ({total === visible ? `${total}` : `${visible}/${total}`} cards)
        </small>
      </h2>

      <DeckStats cards={deck.cards} />

      <ul class="card-list">
        {cards.map((card) => (
          <li>{children(card)}</li>
        ))}
      </ul>
    </div>
  );
}
