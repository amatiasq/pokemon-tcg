import { createRef, useMemo } from 'react';

export function useTransitionClasses<T extends HTMLElement>(className: string) {
  const ref = createRef<T>();

  return useMemo(() => {
    return {
      set current(value: T | null) {
        if (ref.current === value) return;

        if (value == null) {
          handleNodeDisappear(ref.current!);
        } else {
          handleNodeAppear(value);
        }

        Object.assign(ref, { current: value });
      },

      remove() {
        if (ref.current == null) return;
        handleNodeDisappear(ref.current);
        Object.assign(ref, { current: null });
      },
    };

    function handleNodeDisappear(node: T) {
      const clone = node.cloneNode(true) as T;
      node.parentElement!.insertBefore(clone, node);
      clone.addEventListener('transitionend', () => {
        clone.remove();
      });

      clone.classList.remove(`${className}--enter`);
      clone.classList.remove(`${className}--enter-active`);
      clone.classList.remove(`${className}--ready`);
      clone.classList.add(`${className}--exit`);

      setTimeout(() => {
        clone.classList.add(`${className}--exit-active`);
      }, 0);
    }

    function handleNodeAppear(node: T) {
      node.addEventListener('transitionend', handleTransitionEnd);
      node.classList.add(`${className}--enter`);

      setTimeout(() => {
        node.classList.add(`${className}--enter-active`);
      }, 0);
    }

    function handleTransitionEnd(event: TransitionEvent) {
      const node = event.target as T;
      node.classList.remove(`${className}--enter`);
      node.classList.remove(`${className}--enter-active`);
      node.classList.add(`${className}--ready`);
    }
  }, [className]);
}
