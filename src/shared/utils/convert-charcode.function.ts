export const ALPHANUM_MAX = 62;

export function getCharCode(char: string) {
  return char.charCodeAt(0);
}

export function getAlphanumFromIndex(num: number) {
  if (num <= 9) return String.fromCharCode(num + getCharCode('0'));
  if (num <= 35) return String.fromCharCode(num - 10 + getCharCode('a'));
  if (num <= 61) return String.fromCharCode(num - 36 + getCharCode('A'));

  return '';
}
