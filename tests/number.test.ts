import sculpt from '../src';
import { GeneratorType } from '../src/types';

describe('sculpt : number', () => {
  test('should generate number between 0 and max (SO: { max })', () => {
    const value = sculpt({ type: GeneratorType.Number, max: 100 });
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(100);
  });

  test('should generate number between min and max (SO: { min, max })', () => {
    let value = sculpt({ type: GeneratorType.Number, min: 6, max: 100 });
    expect(value).toBeGreaterThanOrEqual(6);
    expect(value).toBeLessThanOrEqual(100);

    value = sculpt({ type: GeneratorType.Number, min: -42, max: 0 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(0);

    value = sculpt({ type: GeneratorType.Number, min: -42, max: -3 });
    expect(value).toBeGreaterThanOrEqual(-42);
    expect(value).toBeLessThanOrEqual(-3);
  });

  test('should generate array of two numbers between 0 and max (SO: { max })', () => {
    let value = sculpt([
      { type: GeneratorType.Number, max: 100 },
      { type: GeneratorType.Number, max: 200 },
    ]);
    expect(value).toHaveLength(2);
    value = value as Record<number, string | number>;
    expect(value[0]).toBeGreaterThanOrEqual(0);
    expect(value[0]).toBeLessThanOrEqual(100);
    expect(value[1]).toBeGreaterThanOrEqual(0);
    expect(value[1]).toBeLessThanOrEqual(200);
  });
});
