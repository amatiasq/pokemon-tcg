import { createRef } from 'react';
import { useDispatch } from 'react-redux';
import { DeckEntry } from '../types/Deck';
import './CardView.css';
import { set as setFocusedCard } from './focused-card';

export function CardView({
  card,
  large = false,
}: {
  card: DeckEntry;
  large?: boolean;
}) {
  const dispatch = useDispatch();
  const ref = createRef<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="card"
      onClick={() => {
        const { top, left, width, height } =
          ref.current!.getBoundingClientRect();

        dispatch(
          setFocusedCard({
            card,
            bounds: { top, left, width, height },
          })
        );
      }}
    >
      <img src={large ? card.images.large : card.images.small} />
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </div>
  );
}
