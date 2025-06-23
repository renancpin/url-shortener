import {
  ALPHANUM_MAX,
  getAlphanumFromIndex,
} from './convert-charcode.function';
import { firstPositiveInt } from './first-valid.function';

export function generateRandomNumber(opts?: {
  min?: number;
  max?: number;
}): number {
  const { min = 0, max = 1 } = opts ?? {};

  return Math.floor(Math.random() * (max - min) + min);
}

export function generateRandomString(length?: number): string {
  const rounds = firstPositiveInt([length, process.env.SHORT_URL_LENTGH]) ?? 6;

  const numbers = Array.from({ length: rounds }, () =>
    generateRandomNumber({ max: ALPHANUM_MAX }),
  );

  const result = numbers.map(getAlphanumFromIndex).join('');
  return result;
}
