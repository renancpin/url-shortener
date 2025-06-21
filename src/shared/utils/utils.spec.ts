import { getAlphanumFromIndex, getCharCode } from './convert-charcode.function';
import { firstValid } from './first-valid.function';
import {
  generateRandomNumber,
  generateRandomString,
} from './generate-random.function';

describe('Utils', () => {
  describe('CharCode', () => {
    describe('getCharCode', () => {
      it('should get correct charcode from string (first character)', () => {
        const char = 'c';
        const expected = char.charCodeAt(0);
        const code = getCharCode(char);
        expect(code).toBe(expected);
      });

      it('should get correct charcode from numeric string (first character)', () => {
        const char = '0';
        const expected = char.charCodeAt(0);
        const code = getCharCode(char);
        expect(code).toBe(expected);
      });
    });

    describe('getAlphanumFromIndex', () => {
      it('should convert index to Alphanumeric correspondence (0-9,a-z,A-Z)', () => {
        const indexNums = [20, 5, 32, 49];
        const expectedChars = ['k', '5', 'w', 'N'];
        const results = indexNums.map(getAlphanumFromIndex);
        results.forEach((result, i) => expect(result).toBe(expectedChars[i]));
        expect.assertions(4);
      });
    });
  });

  describe('FirstValid', () => {
    describe('firstValid', () => {
      it('should get first valid number from array', () => {
        const items = ['ksld', '0', 2, undefined];
        const result = firstValid(items, {
          test: (n) => typeof n === 'number',
        });
        expect(result).not.toBeNull();
        expect(result).toEqual(2);
      });

      it('should get first convertible number (not NaN) from array', () => {
        const items = ['ksld', '0', 2, undefined];
        const result = firstValid(items, {
          test: (n) => !Number.isNaN(Number(n)),
        });
        expect(result).not.toBeNull();
        expect(result).toEqual('0');
      });

      it('should convert and get first valid number', () => {
        const items = ['a', '50', undefined, 7];
        const result = firstValid(items, {
          transform: Number,
          test: (n) => !Number.isNaN(n),
        });
        expect(result).not.toBeNull();
        expect(result).toEqual(50);
      });
    });
  });

  describe('GenerateRandom', () => {
    describe('generateRandomNumber', () => {
      it('should generate a number between 0 (inclusive) and 10 (exclusive)', () => {
        const max = 10;
        const result = generateRandomNumber({ max });

        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(10);
      });

      it('should generate multiple random numbers', () => {
        const max = 30;

        const results = Array.from({ length: 3 }, () =>
          generateRandomNumber({ max }),
        );

        results.forEach((result) => {
          expect(result).toBeGreaterThanOrEqual(0);
          expect(result).toBeLessThan(30);
        });
        expect.assertions(3 * 2);
      });
    });

    describe('generateRandomString', () => {
      const shortUrlRegex = /[a-zA-Z0-9]{6}/;

      it('should generate a valid random string', () => {
        const result = generateRandomString();
        expect(result).toMatch(shortUrlRegex);
      });

      it('should generate different random strings', () => {
        const firstShortUrl = generateRandomString();
        const secondShortUrl = generateRandomString();
        const thirdShortUrl = generateRandomString();

        expect(firstShortUrl).toMatch(shortUrlRegex);
        expect(secondShortUrl).toMatch(shortUrlRegex);
        expect(thirdShortUrl).toMatch(shortUrlRegex);

        expect(firstShortUrl).not.toMatch(secondShortUrl);
        expect(secondShortUrl).not.toMatch(thirdShortUrl);
      });
    });
  });
});
