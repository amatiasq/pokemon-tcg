import { useDispatch } from 'react-redux';
import { DeckEntry } from '../types/Deck';
import './CardView.css';
import { set as setFocusedCard } from './focused-card';

export function CardView({ card }: { card: DeckEntry }) {
  const dispatch = useDispatch();

  return (
    <div className="card" onClick={() => dispatch(setFocusedCard(card))}>
      <img src={card.images.small} />
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </div>
  );
}
