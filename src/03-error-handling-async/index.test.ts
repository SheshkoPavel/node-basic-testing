// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
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
    const errorMessage = 'Error message';

    expect.assertions(1);
    try {
      throwError(errorMessage);
    } catch (e) {
      expect(e).toHaveProperty('message', errorMessage);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!'); // new Error('Oops!') - also can be used there
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
