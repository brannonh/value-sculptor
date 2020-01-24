export enum GeneratorType {
  String = 1,
  Number,
  Select,
}

export enum StringType {
  Alpha = 1,
  Numeric,
  AlphaNumeric,
  Symbol,
  AlphaSymbol,
  NumericSymbol,
  AlphaNumericSymbol,
  Custom,
}

export enum PadType {
  Start = 1,
  End,
  Both,
}

export const CharacterSets = [
  'DUMMY'.split(''),
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), // Alpha
  '0123456789'.split(''), // Numeric
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''), // Alphanumeric
  '~!@#$%^&*-_=+{[()]}|:;,<>.?'.split(''), // Symbol
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*-_=+{[()]}|:;,<>.?'.split(''), // AlphaSymbol
  '0123456789~!@#$%^&*-_=+{[()]}|:;,<>.?'.split(''), // NumericSymbol
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*-_=+{[()]}|:;,<>.?'.split(''), // AlphaNumericSymbol
  'CUSTOM'.split(''), // Custom
];

interface GeneratorOptionsNumber {
  min?: number;
  max: number;
}

interface GeneratorOptionsString<T extends StringType> {
  length: number;
  stringType: T;
  charSet?: string;
}

interface GeneratorOptionsPaddedString<T extends StringType, P extends PadType>
  extends GeneratorOptionsString<T> {
  padType: P;
  padPriority: P extends PadType.Both ? PadType.Start | PadType.End : never;
  padLengthStart: P extends PadType.Start ? number : never;
  padLengthEnd: P extends PadType.End ? number : never;
  padCharStart?: P extends PadType.Start ? string : never;
  padCharEnd?: P extends PadType.End ? string : never;
}

interface GeneratorOptionsSelect {
  possibles: string[];
}

export type GeneratorOptions =
  | GeneratorOptionsNumber
  | GeneratorOptionsString<StringType>
  | GeneratorOptionsPaddedString<StringType, PadType>
  | GeneratorOptionsSelect;
