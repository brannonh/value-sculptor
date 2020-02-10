import { CharacterSets, GeneratorOptions, PadType } from '../types';

function rand(max: number, min = 0): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function generateNumber(options: GeneratorOptions): number {
  // Make sure we have a GeneratorOptionsNumber object.
  if ('max' in options) {
    const min = options.min ?? 0;
    const max = options.max;
    return rand(max, min);
  } else {
    throw new TypeError(
      'options object must be of type GeneratorOptionsNumber'
    );
  }
}

export function generateString(options: GeneratorOptions): string {
  // Make sure we have a GeneratorOptionsString object.
  if ('stringType' in options) {
    // Use any passed character set, otherwise use a default set.
    let charSet = options.charSet?.split('');
    if (!charSet) {
      charSet = CharacterSets[options.stringType];
    }

    // Generate value.
    let value = '';
    while (value.length < options.length) {
      const i = rand(charSet.length - 1);
      value += charSet[i];
    }

    // Check for a GeneratorOptionsPaddedString object.
    if ('padLengthStart' in options || 'padLengthEnd' in options) {
      if (options.padType == PadType.Start) {
        // Pad the start of the string.
        value = value.padStart(
          options.padLengthStart,
          options.padCharStart ?? ' '
        );
      } else if (options.padType == PadType.End) {
        // Pad the end of the string.
        value = value.padEnd(options.padLengthEnd, options.padCharEnd ?? ' ');
      } else if (options.padType == PadType.Both) {
        // Pad both sides of the string.
        if (options.padPriority == PadType.Start) {
          // Begin with the start of the string.
          // options.padLengthStart should be less than options.padLengthEnd.
          value = value.padStart(
            options.padLengthStart,
            options.padCharStart ?? ' '
          );
          value = value.padEnd(options.padLengthEnd, options.padCharEnd ?? ' ');
        } else {
          // Begin with the end of the string.
          // options.padLengthEnd should be less than options.padLengthStart.
          value = value.padEnd(options.padLengthEnd, options.padCharEnd ?? ' ');
          value = value.padStart(
            options.padLengthStart,
            options.padCharStart ?? ' '
          );
        }
      } else {
        throw new TypeError('padType object must be of type PadType');
      }
    }

    return value;
  } else {
    throw new TypeError(
      'options object must be of type GeneratorOptionsString or GeneratorOptionsPaddedString'
    );
  }
}

export function generateSelect(options: GeneratorOptions): string {
  // Make sure we have a GeneratorOptionsSelect object.
  if ('possibles' in options) {
    const i = rand(options.possibles.length - 1);
    return options.possibles[i];
  } else {
    throw new TypeError(
      'options object must be of type GeneratorOptionsSelect'
    );
  }
}

// function generateValue(options: GeneratorOptions) {

//       else if (padType == PadType.Both) {
//         if (padPriority == PadType.Start) {
//           value = value.padStart(padLengthStart, padCharStart);
//           value = value.padEnd(padLengthEnd, padCharEnd);
//         } else if (padPriority == PadType.End) {
//           value = value.padEnd(padLengthEnd, padCharEnd);
//           value = value.padStart(padLengthStart, padCharStart);
//         }
//       }
//     }
//   }

//   return value;
// }
