import sculpt from '../src';
import { GeneratorOptions, GeneratorType, StringType } from '../src/types';

describe('sculpt : errors', () => {
  // General
  test('should throw TypeError for invalid type argument', () => {
    expect(() => {
      sculpt(99, { max: 100 });
    }).toThrow(TypeError);
  });

  // Number
  test('should throw TypeError for invalid options argument (GeneratorOptionsNumber)', () => {
    expect(() => {
      sculpt(GeneratorType.Number, ({
        george: 'fred ',
      } as unknown) as GeneratorOptions);
    }).toThrow(TypeError);
  });

  // Select
  test('should throw TypeError for invalid options argument (GeneratorOptionsSelect)', () => {
    expect(() => {
      sculpt(GeneratorType.Select, ({
        george: 'fred ',
      } as unknown) as GeneratorOptions);
    }).toThrow(TypeError);
  });

  // String
  test('should throw TypeError for invalid options argument (GeneratorOptionsString | GeneratorOptionsPaddedString)', () => {
    expect(() => {
      sculpt(GeneratorType.String, ({
        george: 'fred ',
      } as unknown) as GeneratorOptions);
    }).toThrow(TypeError);
  });

  test('should throw TypeError for invalid padType', () => {
    expect(() => {
      sculpt(GeneratorType.String, {
        length: 10,
        stringType: StringType.Alpha,
        padType: 99,
        padLengthStart: 15,
      });
    }).toThrow(TypeError);
  });
});
