import {
  CharacterSets,
  OptionsNumber,
  OptionsSelect,
  OptionsString,
  PadType,
} from './types';

function rand(max: number, min = 0): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function generateNumber(options: OptionsNumber): number {
  return rand(options.max, options.min ?? 0);
}

export function generateSelect(options: OptionsSelect): string {
  const i = rand(options.possibles.length - 1);
  return options.possibles[i];
}

export function generateString(options: OptionsString): string {
  // Use any passed character set, otherwise use a default set.
  // A passed character set overrides options.stringType.
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

  // Check for requested padding.
  if ('padType' in options) {
    if (options.padType == PadType.Left) {
      // Pad the left side of the string.
      value = value.padStart(options.padLengthLeft, options.padCharLeft ?? ' ');
    } else if (options.padType == PadType.Right) {
      // Pad the right side of the string.
      value = value.padEnd(options.padLengthRight, options.padCharRight ?? ' ');
    } else if (options.padType == PadType.Both) {
      // Pad both sides of the string.
      if (options.padPriority == PadType.Left) {
        // Begin with the left side of the string.
        // options.padLengthLeft should be less than options.padLengthRight.
        value = value.padStart(
          options.padLengthLeft,
          options.padCharLeft ?? ' '
        );
        value = value.padEnd(
          options.padLengthRight,
          options.padCharRight ?? ' '
        );
      } else {
        // Begin with the right side of the string.
        // options.padLengthRigh should be less than options.padLengthLeft.
        value = value.padEnd(
          options.padLengthRight,
          options.padCharRight ?? ' '
        );
        value = value.padStart(
          options.padLengthLeft,
          options.padCharLeft ?? ' '
        );
      }
    }
  }

  return value;
}
