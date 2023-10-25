import { useDispatch, useSelector } from 'react-redux';
import { CardView } from './CardView';
import './FocusedCard.css';
import { clear as clearFocusedCard } from './FocusedCard.slice';
import { RootState } from './store';
import { useTransitionClasses } from './useTransitionClasses';

export function FocusedCard() {
  const { card, bounds } = useSelector((state: RootState) => state.focusedCard);
  const dispatch = useDispatch();
  const transition = useTransitionClasses<HTMLDivElement>('focused-card');

  if (card === null) {
    transition.remove();
    return null;
  }

  return (
    <div
      ref={transition}
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
