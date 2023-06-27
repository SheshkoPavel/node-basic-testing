// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)('table as a variable', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
