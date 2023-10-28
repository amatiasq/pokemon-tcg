import { DeckEntry } from 'types:Deck';
import './CardData.css';
import { CardView } from './CardView';

export interface CardViewProps {
  card: DeckEntry;
  large?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function CardData({ card, large = false, onClick }: CardViewProps) {
  return (
    <div className="card-data" onClick={onClick}>
      <CardView card={card} large={large} />
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </div>
  );
}
