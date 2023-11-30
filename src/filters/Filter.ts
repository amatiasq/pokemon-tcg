export class Filter<TTarget, TNeedle extends string> {
  #counts: Record<TNeedle, number> = {} as Record<TNeedle, number>;
  #getter: (item: TTarget) => TNeedle | TNeedle[];

  constructor(getter: (item: TTarget) => TNeedle | TNeedle[]) {
    this.#getter = getter;
  }

  visit(target: TTarget) {
    const value = this.#getter(target);

    if (Array.isArray(value)) {
      for (const item of value) {
        this.#increment(item);
      }
    } else {
      this.#increment(value);
    }
  }

  #increment(needle: TNeedle) {
    this.#counts[needle] = (this.#counts[needle] || 0) + 1;
  }

  get(needle: TNeedle) {
    return this.#counts[needle];
  }

  keys() {
    return Object.keys(this.#counts) as TNeedle[];
  }

  checker(needle: TNeedle) {
    return (target: TTarget) => {
      const value = this.#getter(target);

      if (Array.isArray(value)) {
        return value.includes(needle as any);
      } else {
        return value === needle;
      }
    };
  }

  reset() {
    this.#counts = {} as Record<TNeedle, number>;
  }
}
