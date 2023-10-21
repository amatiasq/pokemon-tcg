import { createRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardView } from './CardView';
import './FocusedCard.css';
import { clear as clearFocusedCard } from './focused-card';
import { RootState } from './store';

export function FocusedCard() {
  const { card, bounds } = useSelector((state: RootState) => state.focusedCard);
  const dispatch = useDispatch();
  const ref = useMagic<HTMLDivElement>('focused-card');

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
      <CardView card={card} />
    </div>
  );
}

function useMagic<T extends HTMLElement>(className: string) {
  const ref = createRef<T>();

  return useMemo(() => {
    function handleTransitionEnd(event: TransitionEvent) {
      console.log('transitionend');
      const node = event.target as T;
      node.classList.remove(`${className}--enter`);
      node.classList.remove(`${className}--enter-active`);
      node.classList.add(`${className}--ready`);
      console.log(`${className}--ready`);
    }

    function handleNodeAppear(node: T) {
      node.addEventListener('transitionend', handleTransitionEnd);
      node.classList.add(`${className}--enter`);
      console.log(`${className}--enter`);

      setTimeout(() => {
        node.classList.add(`${className}--enter-active`);
        console.log(`${className}--enter-active`);
      }, 0);
    }

    function handleNodeDisappear(node: T) {
      const clone = node.cloneNode(true) as T;
      node.parentElement!.insertBefore(clone, node);
      clone.addEventListener('transitionend', () => {
        console.log('gone');
        clone.remove();
      });

      clone.classList.remove(`${className}--enter`);
      clone.classList.remove(`${className}--enter-active`);
      clone.classList.remove(`${className}--ready`);
      clone.classList.add(`${className}--exit`);
      console.log(`${className}--exit`);

      setTimeout(() => {
        clone.classList.add(`${className}--exit-active`);
        console.log(`${className}--exit-active`);
      }, 0);
    }

    return {
      set current(value: T | null) {
        if (ref.current === value) return;

        console.log(value);

        if (value == null) {
          handleNodeDisappear(ref.current!);
        } else {
          handleNodeAppear(value);
        }

        Object.assign(ref, { current: value });
      },
    };
  }, [className]);
}
