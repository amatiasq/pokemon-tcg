import { Show } from 'solid-js';
import { CardData } from '../card/CardData';
import { Transition } from '../components/Transition';
import { store } from '../store';
import './FocusedCard.css';
export function FocusedCard() {
  const state = store.use();

  return (
    <Show when={state.focusCard}>
      <Transition activeClass="focused-card--active">
        <div
          class="focused-card"
          onClick={store.clearFocusCard}
          style={{
            '--card-top': `${state.focusCardBounds.top}px`,
            '--card-left': `${state.focusCardBounds.left}px`,
            '--card-width': `${state.focusCardBounds.width}px`,
            '--card-height': `${state.focusCardBounds.height}px`,
          }}
        >
          <CardData card={state.focusCard!} large />
        </div>
      </Transition>
    </Show>
  );
}
