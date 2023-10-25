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

    function handleNodeAppear(node: T) {
      node.addEventListener('transitionend', () => {
        removeAllClasses(node);
        node.classList.add(`${className}--ready`);
      });

      removeAllClasses(node);
      node.classList.add(`${className}--enter`);

      setTimeout(() => {
        node.classList.add(`${className}--enter-active`);
      }, 0);
    }

    function handleNodeDisappear(node: T) {
      const clone = node.cloneNode(true) as T;
      node.parentElement!.insertBefore(clone, node);

      clone.addEventListener('transitionend', () => clone.remove());

      removeAllClasses(clone);
      clone.classList.add(`${className}--exit`);

      setTimeout(() => {
        clone.classList.add(`${className}--exit-active`);
      }, 0);
    }

    function removeAllClasses(node: T) {
      node.classList.remove(`${className}--enter`);
      node.classList.remove(`${className}--enter-active`);
      node.classList.remove(`${className}--ready`);
      node.classList.remove(`${className}--exit`);
      node.classList.remove(`${className}--exit-active`);
    }
  }, [className]);
}
