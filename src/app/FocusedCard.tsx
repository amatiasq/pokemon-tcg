import { useDispatch, useSelector } from 'react-redux';
import { CardView } from './CardView';
import './FocusedCard.css';
import { clear as clearFocusedCard } from './focused-card';
import { RootState } from './store';

export function FocusedCard() {
  const card = useSelector((state: RootState) => state.focusedCard.card);
  const dispatch = useDispatch();

  if (card === null) return null;

  return (
    <div className="focused-card" onClick={() => dispatch(clearFocusedCard())}>
      <CardView card={card} />
    </div>
  );
}
