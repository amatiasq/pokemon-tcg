import { CardData } from '../card/CardData';
import { store } from '../store';
import { SelectableCard, setCardCount } from './deck-builder-store';

export function DeckBuilderCard({ card }: { card: SelectableCard }) {
  const target = (event: Event) => event.target as HTMLInputElement;
  const selected = () => card.selected ?? 0;

  return (
    <CardData
      card={card}
      class="card-selector"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        store.setFocusCard(card, target.closest('.card-selector')!);
      }}
    >
      <div class="input" onClick={(event) => event.stopPropagation()}>
        <button
          disabled={selected() <= 0}
          onClick={() => setCardCount(card, selected() - 1)}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={card.count}
          value={selected() ?? 0}
          onClick={(event) => target(event).select()}
          onChange={(event) =>
            setCardCount(card, parseInt(target(event).value, 10))
          }
        />
        <span>/ {card.count}</span>
        <button
          disabled={selected() >= card.count}
          onClick={() => setCardCount(card, selected() + 1)}
        >
          +
        </button>
      </div>

      <span class="used-amount">{card.selected || card.count}</span>
    </CardData>
  );
}
