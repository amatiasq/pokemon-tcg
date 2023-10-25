import { ScaledImage } from '../components/ScaledImage';
import { DeckEntry } from '../types/Deck';
import { CardEffect } from './CardEffect';
import './CardView.css';

const hasEffects = false;
const MaybeEffects = hasEffects ? CardEffect : 'div';

export interface CardViewProps {
  card: DeckEntry;
  large?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function CardView({ card, large = false, onClick }: CardViewProps) {
  return (
    <MaybeEffects className="card" onClick={onClick}>
      {large ? (
        <ScaledImage small={card.images.small} large={card.images.large} />
      ) : (
        <img src={card.images.small} />
      )}
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </MaybeEffects>
  );
}
