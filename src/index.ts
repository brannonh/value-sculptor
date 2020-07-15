import { GeneratorType, SculptOptions } from './types';
import { generateNumber, generateString, generateSelect } from './generators';

type SculptReturn = string | number | (number | string)[];

export default function sculpt(
  options: SculptOptions | SculptOptions[],
  concat = true
): SculptReturn {
  const results: (number | string)[] = [];

  if (!Array.isArray(options)) {
    options = [options];
  }

  for (const segment of options) {
    if (segment.type == GeneratorType.Number) {
      results.push(generateNumber(segment));
    } else if (segment.type == GeneratorType.String) {
      results.push(generateString(segment));
    } else if (segment.type == GeneratorType.Select) {
      results.push(generateSelect(segment));
    }
  }

  return concat ? results.join('') : results;
}

export { GeneratorType };
export { StringType, PadType } from './types';
