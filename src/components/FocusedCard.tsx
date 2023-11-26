import {
  clearFocusedCard,
  focusedCard,
  focusedCardBounds,
} from '../stores/focusedCard';
import { CardData } from './CardData';
import './FocusedCard.css';
import { Transition } from './Transition';

export function FocusedCard() {
  return (
    <>
      {focusedCard() ? (
        <Transition activeClass="focused-card--active">
          <div
            class="focused-card"
            onClick={clearFocusedCard}
            style={{
              '--card-top': `${focusedCardBounds().top}px`,
              '--card-left': `${focusedCardBounds().left}px`,
              '--card-width': `${focusedCardBounds().width}px`,
              '--card-height': `${focusedCardBounds().height}px`,
            }}
          >
            <CardData card={focusedCard()!} large />
          </div>
        </Transition>
      ) : null}
    </>
  );
}
