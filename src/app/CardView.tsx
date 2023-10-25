import { useDispatch } from 'react-redux';
import { ScaledImage } from '../components/ScaledImage';
import { DeckEntry } from '../types/Deck';
import { CardEffect } from './CardEffect';
import './CardView.css';
import { set as setFocusedCard } from './FocusedCard.slice';

const hasEffects = false;
const Component = hasEffects ? CardEffect : 'div';

export function CardView({
  card,
  large = false,
}: {
  card: DeckEntry;
  large?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <Component
      className="card"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const { top, left, width, height } = target
          .closest('.card')!
          .getBoundingClientRect();

        dispatch(
          setFocusedCard({
            card,
            bounds: { top, left, width, height },
          })
        );
      }}
    >
      {large ? (
        <ScaledImage small={card.images.small} large={card.images.large} />
      ) : (
        <img src={card.images.small} />
      )}
      <code className="id">{card.id}</code>
      <span className="emojis">{card.emojis}</span>
      {card.count != 1 ? <span className="amount">{card.count}</span> : null}
    </Component>
  );
}
