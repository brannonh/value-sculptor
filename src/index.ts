import { GeneratorType, GeneratorOptions } from './types';
import { generateNumber, generateString, generateSelect } from './generators';

// TODO : Create tests.
export default function generateValue(
  type: GeneratorType,
  options: GeneratorOptions
): string | number | undefined {
  if (type == GeneratorType.Number) {
    return generateNumber(options);
  } else if (type == GeneratorType.String) {
    return generateString(options);
  } else if (type == GeneratorType.Select) {
    return generateSelect(options);
  } else {
    throw new TypeError(
      'type object must be of type GeneratorType'
    );
  }
}
