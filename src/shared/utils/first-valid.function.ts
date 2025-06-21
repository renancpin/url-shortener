export function firstValid<T, U = T>(
  values: T[],
  opts: { test: (_: T | U) => boolean; transform?: (_: T) => U },
): T | U | null {
  for (let i = 0; i < values.length; i++) {
    let value: T | U = values[i];
    if (opts.transform) value = opts.transform(value);

    const isValid = opts.test(value);
    if (isValid) return value;
  }

  return null;
}

export function firstPositiveInt(values: any[]): number | null {
  return firstValid(values, {
    transform: Number,
    test: (n) => n > 0,
  });
}
