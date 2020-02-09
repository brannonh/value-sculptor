import sculpt from '../src';
import { GeneratorType } from '../src/types';

describe('sculpt : select', () => {
  test('should return one value from provided array (GO: { possibles })', () => {
    let value = sculpt(GeneratorType.Select, {
      possibles: ['one', 'two', 'three'],
    });
    expect(value).toMatch(/^(one|two|three)$/);

    value = sculpt(GeneratorType.Select, {
      possibles: ['1', '2', '3'],
    });
    expect(value).toMatch(/^(1|2|3)$/);
  });
});
