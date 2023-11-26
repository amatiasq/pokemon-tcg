import { CardData } from '../card/CardData';
import { setFocusedCard } from '../focused-card/focused-card-store';
import { SelectableCard, setCardCount } from './deck-builder-store';

export function DeckBuilderCard({ card }: { card: SelectableCard }) {
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
