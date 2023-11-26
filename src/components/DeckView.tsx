import { JSX, createMemo } from 'solid-js';
import { Deck, DeckEntry } from 'types:Deck';
import { check } from '../stores/filters';
import { DeckStats } from './DeckStats';
import './DeckView.css';

export function DeckView(props: {
  deck: Deck;
  children: (card: DeckEntry) => JSX.Element;
}) {
  const count = (list: DeckEntry[]) =>
    list.reduce((acc, card) => acc + card.count, 0);

  const cards = createMemo(() => props.deck.cards.filter(check));
  const total = createMemo(() => count(props.deck.cards));
  const visible = createMemo(() => count(cards()));

  return (
    <div class="deck">
      <h2>
        {props.deck.name}{' '}
        <small>
          ({total() === visible() ? `${total()}` : ` ${visible()}/${total()}`}{' '}
          cards)
        </small>
      </h2>

      <DeckStats cards={props.deck.cards} />

      <ul class="card-list">
        {cards().map((card) => (
          <li>{props.children(card)}</li>
        ))}
      </ul>
    </div>
  );
}
