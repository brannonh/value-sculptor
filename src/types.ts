export enum GeneratorType {
  String = 1,
  Number,
  Select,
}

export enum PadType {
  Left = 1,
  Right,
  Both,
}

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

interface OptionsStringSimple extends Options<GeneratorType.String> {
  length: number;
  charSet?: string;
}

interface OptionsStringPadded<P extends PadType> extends OptionsStringSimple {
  padType: P;
  padPriority: P extends PadType.Both ? PadType.Left | PadType.Right : never;
  padLengthLeft: P extends PadType.Left | PadType.Both ? number : never;
  padLengthRight: P extends PadType.Right | PadType.Both ? number : never;
  padCharLeft?: P extends PadType.Left | PadType.Both ? string : never;
  padCharRight?: P extends PadType.Right | PadType.Both ? string : never;
}

export type OptionsString = OptionsStringSimple | OptionsStringPadded<PadType>;

export type SculptOptions = OptionsNumber | OptionsSelect | OptionsString;

export type SculptReturn = string | number | Record<number, string | number>;
