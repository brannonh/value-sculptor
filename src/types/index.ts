export enum GeneratorType {
  String = 1,
  Number,
  Select,
}

export enum StringType {
  Alpha = 1,
  AlphaUpper,
  AlphaLower,
  Numeric,
  AlphaNumeric,
  AlphaUpperNumeric,
  AlphaLowerNumeric,
  Symbol,
  AlphaSymbol,
  AlphaUpperSymbol,
  AlphaLowerSymbol,
  NumericSymbol,
  AlphaNumericSymbol,
  AlphaUpperNumericSymbol,
  AlphaLowerNumericSymbol,
  Custom,
}

export enum PadType {
  Left = 1,
  Right,
  Both,
}

const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
const numeric = '0123456789';
const symbol = '~!@#$%^&*-_=+{[()]}|:;,<>.?';
export const CharacterSets = [
  'DUMMY'.split(''), // This just shifts the indices to align with StringType.
  `${alphaLower}${alphaUpper}`.split(''), // Alpha
  `${alphaUpper}`.split(''), // AlphaUpper
  `${alphaLower}`.split(''), // AlphaLower
  `${numeric}`.split(''), // Numeric
  `${alphaLower}${alphaUpper}${numeric}`.split(''), // AlphaNumeric
  `${alphaUpper}${numeric}`.split(''), // AlphaUpperNumeric
  `${alphaLower}${numeric}`.split(''), // AlphaLowerNumeric
  `${symbol}`.split(''), // Symbol
  `${alphaLower}${alphaUpper}${symbol}`.split(''), // AlphaSymbol
  `${alphaUpper}${symbol}`.split(''), // AlphaUpperSymbol
  `${alphaLower}${symbol}`.split(''), // AlphaLowerSymbol
  `${numeric}${symbol}`.split(''), // NumericSymbol
  `${alphaLower}${alphaUpper}${numeric}${symbol}`.split(''), // AlphaNumericSymbol
  `${alphaUpper}${numeric}${symbol}`.split(''), // AlphaUpperNumericSymbol
  `${alphaLower}${numeric}${symbol}`.split(''), // AlphaLowerNumericSymbol
  'CUSTOM'.split(''), // This is just a placeholder for custom character sets.
];

interface Options<G extends GeneratorType> {
  type: G;
}

export interface OptionsNumber extends Options<GeneratorType.Number> {
  min?: number;
  max: number;
}

export interface OptionsSelect extends Options<GeneratorType.Select> {
  possibles: string[];
}

interface OptionsStringSimple<S extends StringType>
  extends Options<GeneratorType.String> {
  length: number;
  stringType: S;
  charSet?: S extends StringType.Custom ? string : never;
}

interface OptionsStringPadded<S extends StringType, P extends PadType>
  extends OptionsStringSimple<S> {
  padType: P;
  padPriority: P extends PadType.Both ? PadType.Left | PadType.Right : never;
  padLengthLeft: P extends PadType.Left | PadType.Both ? number : never;
  padLengthRight: P extends PadType.Right | PadType.Both ? number : never;
  padCharLeft?: P extends PadType.Left | PadType.Both ? string : never;
  padCharRight?: P extends PadType.Right | PadType.Both ? string : never;
}

export type OptionsString =
  | OptionsStringSimple<StringType>
  | OptionsStringPadded<StringType, PadType>;

export type SculptOptions = OptionsNumber | OptionsSelect | OptionsString;

export type SculptReturn = string | number | (number | string)[];
