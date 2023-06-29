// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;

const books = [
  { id: 1, name: 'Titanic' },
  { id: 2, name: 'War and peace' },
  { id: 3, name: 'Catcher in the rye' },
];

beforeEach(() => {
  mockedAxios.create = jest.fn(() => mockedAxios);
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: books }),
  );
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/books');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/books');

    expect(mockedAxios.get).toHaveBeenCalledWith('/books');
  });

  test('should return response data', async () => {
    mockedAxios.get.mockResolvedValueOnce(books);
    const res = await throttledGetDataFromApi('/books');

    expect(res).toEqual(books);
  });
});
