import { createRef, useMemo } from 'react';

export function useTransitionClass<T extends HTMLElement>(
  className: string,
  { activeClass = '--active' } = {}
) {
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
      // just in case it was there
      node.classList.remove(`${className}${activeClass}`);

      setTimeout(() => {
        node.classList.add(`${className}${activeClass}`);
      }, 0);
    }

    function handleNodeDisappear(node: T) {
      const clone = node.cloneNode(true) as T;
      node.parentElement!.insertBefore(clone, node);

      clone.addEventListener('transitionend', () => clone.remove());

      clone.classList.add(`${className}${activeClass}`);

      setTimeout(() => {
        clone.classList.remove(`${className}${activeClass}`);
      }, 0);
    }
  }, [className, activeClass]);
}