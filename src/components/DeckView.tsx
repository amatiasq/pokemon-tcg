import { Deck, DeckEntry } from 'types:Deck';
import { useCardFilters } from '../hooks/useCardFilters';
import { DeckStats } from './DeckStats';
import './DeckView.css';

export function DeckView({
  deck,
  children,
}: {
  deck: Deck;
  children: (card: DeckEntry) => JSX.Element;
}) {
  const { isExcluded } = useCardFilters();
  const count = (list: DeckEntry[]) =>
    list.reduce((acc, card) => acc + card.count, 0);

  const cards = deck.cards.filter((card) => !card.emojis.some(isExcluded));
  const total = count(deck.cards);
  const visible = count(cards);

  return (
    <details className="deck" key={deck.name}>
      <summary>
        <h2>
          {deck.name}{' '}
          <small>
            ({total === visible ? `${total}` : `${visible}/${total}`})
          </small>
        </h2>
      </summary>

      <DeckStats cards={deck.cards} />

      <ul className="card-list">
        {cards.map((card) => (
          <li key={card.id}>{children(card)}</li>
        ))}
      </ul>
    </details>
  );
}