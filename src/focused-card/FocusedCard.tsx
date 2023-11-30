import { Show } from 'solid-js';
import { CardData } from '../card/CardData';
import { Transition } from '../components/Transition';
import './FocusedCard.css';
import {
  clearFocusedCard,
  focusedCard,
  focusedCardBounds,
} from './focused-card-store';

export function FocusedCard() {
  return (
    <Show when={focusedCard()}>
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
    </Show>
  );
}
