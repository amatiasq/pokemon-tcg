import { clearFocusedCard, useFocusedCard } from '../hooks/useFocusedCard';
import { useTransitionClass } from '../hooks/useTransitionClasses';
import { CardData } from './CardData';
import './FocusedCard.css';

export function FocusedCard() {
  const { card, bounds } = useFocusedCard();
  const transition = useTransitionClass<HTMLDivElement>('focused-card');

  if (card === null) {
    transition.remove();
    return null;
  }

  return (
    <div
      ref={transition}
      className="focused-card"
      onClick={clearFocusedCard}
      style={{
        '--card-top': `${bounds.top}px`,
        '--card-left': `${bounds.left}px`,
        '--card-width': `${bounds.width}px`,
        '--card-height': `${bounds.height}px`,
      }}
    >
      <CardData card={card} large />
    </div>
  );
}
