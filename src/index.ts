import { GeneratorType, SculptOptions } from './types';
import { generateNumber, generateString, generateSelect } from './generators';

export default function sculpt(
  options: SculptOptions
): string | number | undefined {
  if (options.type == GeneratorType.Number) {
    return generateNumber(options);
  } else if (options.type == GeneratorType.String) {
    return generateString(options);
  } else if (options.type == GeneratorType.Select) {
    return generateSelect(options);
  } else {
    throw new TypeError('options.type must be of type GeneratorType');
  }
}

export { GeneratorType };
export { StringType, PadType } from './types';
