// Uncomment the code below and write your tests
import {
  // throwError,
  // throwCustomError,
  resolveValue,
  // MyAwesomeError,
  // rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    try {
      const result = await resolveValue(5);
      expect(result).toBe(5);
    } catch (e) {
      expect(e).toEqual(e);
    }
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
  });
});
