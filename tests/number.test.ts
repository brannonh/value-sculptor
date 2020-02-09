import sculpt from '../src';
import { GeneratorType } from '../src/types';

describe('sculpt : number', () => {
  test('should generate number between 0 and max (GO: { max })', () => {
    const value = sculpt(GeneratorType.Number, { max: 100 });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  test('should generate number between min and max (GO: { min, max })', () => {
    let value = sculpt(GeneratorType.Number, { min: 6, max: 100 });
    expect(value).toBeGreaterThanOrEqual(6);
    expect(value).toBeLessThanOrEqual(100);

    value = sculpt(GeneratorType.Number, { min: -42, max: 0 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(0);

    value = sculpt(GeneratorType.Number, { min: -42, max: -3 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(-3);
  });
});
