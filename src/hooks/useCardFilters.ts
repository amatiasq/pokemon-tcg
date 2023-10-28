import { create } from 'zustand';

export interface CardFilters {
  exclude: Set<string>;
  isExcluded: (emoji: string) => boolean;
}

export const useCardFilters = create<CardFilters>((_, get) => ({
  exclude: new Set(),
  isExcluded: (emoji: string) => get().exclude.has(emoji),
}));

export function toggleFilter(emoji: string) {
  useCardFilters.setState((state) => ({
    exclude: toggle(state.exclude, emoji),
  }));
}

function toggle<T>(data: Set<T>, value: T) {
  const copy = new Set(data);

  if (copy.has(value)) {
    copy.delete(value);
  } else {
    copy.add(value);
  }

  return copy;
}
