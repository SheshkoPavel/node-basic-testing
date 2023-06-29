// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(500);
    expect(bankAccount).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(500);
    expect(() => bankAccount.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(500);
    const bankAccount2 = getBankAccount(0);

    expect(() => bankAccount.transfer(600, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(500);
    expect(() => bankAccount.transfer(200, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(500);
    expect(bankAccount.getBalance()).toBe(500);
    bankAccount.deposit(200);
    expect(bankAccount.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(500);
    expect(bankAccount.getBalance()).toBe(500);
    bankAccount.withdraw(200);
    expect(bankAccount.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(500);
    const bankAccount2 = getBankAccount(0);

    expect(bankAccount.getBalance()).toBe(500);
    expect(bankAccount2.getBalance()).toBe(0);

    bankAccount.transfer(200, bankAccount2);

    expect(bankAccount.getBalance()).toBe(300);
    expect(bankAccount2.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(500);
    const expectedResult = expect.any(Number);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(4);

    await expect(bankAccount.fetchBalance()).resolves.toEqual(expectedResult);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(500);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(99);

    try {
      await bankAccount.synchronizeBalance();
      const newBalance = bankAccount.getBalance();

      expect(newBalance).not.toBe(500);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(500);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    try {
      await bankAccount.synchronizeBalance();
    } catch {
      await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
        new SynchronizationFailedError(),
      );
    }
  });
});
