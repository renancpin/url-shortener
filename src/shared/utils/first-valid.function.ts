export function firstValid<
  V,
  T extends (_: V) => U,
  U = T extends (_: V) => infer U ? U : V,
>(values: V[], opts: { test: (_: U) => boolean; transform?: T }): U | null {
  for (let i = 0; i < values.length; i++) {
    let value: U | V = values[i];

    if (opts.transform) {
      value = opts.transform(values[i]);
    }

    const isValid = opts.test(value as U);
    if (isValid) return value as U;
  }

  return null;
}

export function firstPositiveInt(values: any[]): number | null {
  const validNumber = firstValid(values, {
    transform: Number,
    test: (n) => n > 0,
  });

  return validNumber;
}
