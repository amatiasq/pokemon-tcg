export class Filter<TTarget, TNeedle extends string> {
  #counts: Record<TNeedle, number> = {} as Record<TNeedle, number>;
  #getter: (item: TTarget) => TNeedle | TNeedle[];

  constructor(getter: (item: TTarget) => TNeedle | TNeedle[]) {
    this.#getter = getter;
  }

  visit(target: TTarget, amount = 1) {
    const value = this.#getter(target);

    if (Array.isArray(value)) {
      for (const item of value) {
        this.#increment(item, amount);
      }
    } else {
      this.#increment(value, amount);
    }
  }

  #increment(needle: TNeedle, amount = 1) {
    this.#counts[needle] = (this.#counts[needle] || 0) + amount;
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
