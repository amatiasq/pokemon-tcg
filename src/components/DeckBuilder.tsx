import decks from 'virtual:all-decks';
import { setFocusedCard } from '../stores/focusedCard';
import { SelectableCard, newDeckCards, setCardCount } from '../stores/newDeck';
import { CardData } from './CardData';
import './DeckBuilder.css';

const cards = deckBuilderCards();
const count = (list: SelectableCard[]) =>
  list.reduce((acc, card) => acc + card.selected, 0);

export function DeckBuilder() {
  const total = count(newDeckCards());
  const usedIds = newDeckCards().map((x) => x.id);

  const unused = cards
    .filter((x) => !usedIds.includes(x.id))
    .sort((a, b) =>
      a.supertype === b.supertype
        ? a.name.localeCompare(b.name)
        : a.supertype.localeCompare(b.supertype)
    );

  const maxLength = Math.max(...usedIds.map((x) => x.length));
  const code = newDeckCards()
    .map((card) => {
      const id = card.id.padEnd(maxLength, ' ');
      const amount =
        card.selected === 1 ? '   ' : `x${card.selected}`.padEnd(3, ' ');
      return `${id} ${amount}  ${card.name} ${card.emojis}`;
    })
    .join('\n');

  return (
    <div class="deck-builder">
      <h1>Deck Builder {total ? `(${total})` : null}</h1>
      <ul>
        {newDeckCards().map((card) => (
          <li>
            <DeckBuilderCard card={card} />
          </li>
        ))}
      </ul>

      {code ? (
        <>
          <textarea
            rows={newDeckCards().length}
            value={code}
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
          />
          <hr />
        </>
      ) : null}
      <ul>
        {unused.map((card) => (
          <li>
            <DeckBuilderCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeckBuilderCard({ card }: { card: SelectableCard }) {
  const target = (event: Event) => event.target as HTMLInputElement;

  return (
    <CardData
      card={card}
      class="card-selector"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        setFocusedCard(card, target.closest('.card-selector')!);
      }}
    >
      <div class="input" onClick={(event) => event.stopPropagation()}>
        <button
          disabled={card.selected <= 0}
          onClick={() => setCardCount(card, card.selected - 1)}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={card.count}
          value={card.selected ?? 0}
          onClick={(event) => target(event).select()}
          onChange={(event) =>
            setCardCount(card, parseInt(target(event).value, 10))
          }
        />
        <span>/ {card.count}</span>
        <button
          disabled={card.selected >= card.count}
          onClick={() => setCardCount(card, card.selected + 1)}
        >
          +
        </button>
      </div>

      <span class="used-amount">{card.selected || card.count}</span>
    </CardData>
  );
}

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
