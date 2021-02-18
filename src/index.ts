import { GeneratorType, SculptOptions, SculptReturn } from './types';
import { generateNumber, generateString, generateSelect } from './generators';
import CharacterSets from './characters';

export default function sculpt(
  options: SculptOptions | SculptOptions[],
  concat = false,
  delimiter = ''
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

  return concat
    ? results.join(delimiter)
    : results.length > 1
    ? results
    : results[0];
}

export { GeneratorType, CharacterSets };
export { PadType } from './types';
