import { JSX, onCleanup, onMount } from 'solid-js';

export function Transition({
  children,
  activeClass,
}: {
  children: JSX.Element;
  activeClass: string;
}) {
  const el = children as HTMLElement;

  if (!(el instanceof HTMLElement)) {
    throw new Error('<Transition>children</Transition> must be an HTMLElement');
  }

  onMount(() => {
    el.classList.remove(activeClass);

    setTimeout(() => {
      el.classList.add(activeClass);
    }, 0);
  });

  onCleanup(() => {
    const clone = el.cloneNode(true) as HTMLDivElement;
    el.parentElement!.insertBefore(clone, el);

    clone.addEventListener('transitionend', () => clone.remove());
    clone.classList.add(activeClass);

    setTimeout(() => {
      clone.classList.remove(activeClass);
    }, 0);
  });

  return el;
}
