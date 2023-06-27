// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 16, b: 4, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  // continue cases for other actions
];

const testCases2 = [
  { a: 1, b: 2, action: 'Dancing' },
  { a: 2, b: 2, action: 5 },
  { a: '2', b: '2', action: '5' },
  { a: 2, b: '2', action: '5' },
  { a: '2', b: 2, action: '5' },
  { a: '2', b: '2', action: Action.Add },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table as a variable', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });

  test.each(testCases2)(
    'table as a variable with null result',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull;
    },
  );
});
