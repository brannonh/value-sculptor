import sculpt from '../src';
import { GeneratorType } from '../src/types';

describe('sculpt : select', () => {
  test('should return one value from provided array (SO: { possibles })', () => {
    let value = sculpt({
      type: GeneratorType.Select,
      possibles: ['one', 'two', 'three'],
    });
    expect(value).toMatch(/^(one|two|three)$/);

    value = sculpt({
      type: GeneratorType.Select,
      possibles: ['1', '2', '3'],
    });
    expect(value).toMatch(/^(1|2|3)$/);
  });

  test('should return undefined (invalid GeneratorType) (SO: { possibles })', () => {
    const value = sculpt({
      type: 4,
      possibles: ['one', 'two', 'three'],
    });
    expect(value).toBeUndefined();
  });
});
