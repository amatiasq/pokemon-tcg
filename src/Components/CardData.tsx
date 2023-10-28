import { PropsWithChildren } from 'react';
import { DeckEntry } from 'types:Deck';
import './CardData.css';
import { CardView } from './CardView';

export interface CardViewProps {
  card: DeckEntry;
  large?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function CardData({
  card,
  large = false,
  className = '',
  onClick,
  children,
}: PropsWithChildren<CardViewProps>) {
  return (
    <div className={`card-data ${className}`} onClick={onClick}>
      <CardView card={card} large={large} />
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
      {children}
    </div>
  );
}
