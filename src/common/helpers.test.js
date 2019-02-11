import { convertAmount } from './helpers';

describe('convertAmount', () => {
  test('should convert correctly', () => {
    expect(convertAmount(10, 1.5)).toEqual('15.00');
    expect(convertAmount(21, 3.141592)).toEqual('65.97');
  });

  test('should return message if not possible to convert', () => {
    expect(convertAmount(10, undefined)).toEqual("Couldn't calculate");
  });
});
