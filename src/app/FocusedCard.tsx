import { useDispatch, useSelector } from 'react-redux';
import { CardView } from './CardView';
import './FocusedCard.css';
import { clear as clearFocusedCard } from './focused-card';
import { RootState } from './store';
import { useTransitionClasses } from './useTransitionClasses';

export function FocusedCard() {
  const { card, bounds } = useSelector((state: RootState) => state.focusedCard);
  const dispatch = useDispatch();
  const ref = useTransitionClasses<HTMLDivElement>('focused-card');

  if (card === null) {
    ref.current = null;
    return null;
  }

  return (
    <div
      ref={ref}
      className="focused-card"
      onClick={() => dispatch(clearFocusedCard())}
      style={{
        '--card-top': `${bounds.top}px`,
        '--card-left': `${bounds.left}px`,
        '--card-width': `${bounds.width}px`,
        '--card-height': `${bounds.height}px`,
      }}
    >
      <CardView card={card} large />
    </div>
  );
}
