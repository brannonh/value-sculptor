import generateValue from '../src';
import { GeneratorOptions, GeneratorType } from '../src/types';

describe('generateValue : number', () => {
  test('should generate number between 0 and max (GO: { max })', () => {
    const value = generateValue(GeneratorType.Number, { max: 100 });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  test('should generate number between min and max (GO: { min, max })', () => {
    let value = generateValue(GeneratorType.Number, { min: 6, max: 100 });
    expect(value).toBeGreaterThanOrEqual(6);
    expect(value).toBeLessThanOrEqual(100);

    value = generateValue(GeneratorType.Number, { min: -42, max: 0 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(0);

    value = generateValue(GeneratorType.Number, { min: -42, max: -3 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(-3);
  });
});
