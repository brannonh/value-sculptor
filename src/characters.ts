const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphaHexLower = 'abcdef';
const alphaHexUpper = 'ABCDEF';
const numeric = '0123456789';
const special = '~!@#$%^&*-_=+{[()]}|:;,<>.?';

export const Alpha = `${alphaLower}${alphaUpper}`;
export const AlphaLower = `${alphaLower}`;
export const AlphaLowerNumeric = `${alphaLower}${numeric}`;
export const AlphaLowerNumericSymbol = `${alphaLower}${numeric}${special}`;
export const AlphaLowerSymbol = `${alphaLower}${special}`;
export const AlphaNumeric = `${alphaLower}${alphaUpper}${numeric}`;
export const AlphaNumericSymbol = `${alphaLower}${alphaUpper}${numeric}${special}`;
export const AlphaSymbol = `${alphaLower}${alphaUpper}${special}`;
export const AlphaUpper = `${alphaUpper}`;
export const AlphaUpperNumeric = `${alphaUpper}${numeric}`;
export const AlphaUpperNumericSymbol = `${alphaUpper}${numeric}${special}`;
export const AlphaUpperSymbol = `${alphaUpper}${special}`;
export const Binary = `01`;
export const HexLower = `${alphaHexLower}${numeric}`;
export const HexUpper = `${alphaHexUpper}${numeric}`;
export const Numeric = `${numeric}`;
export const NumericSymbol = `${numeric}${special}`;
export const Octal = `01234567`;
export const Symbol = special;

export default {
  Alpha,
  AlphaLower,
  AlphaLowerNumeric,
  AlphaLowerNumericSymbol,
  AlphaLowerSymbol,
  AlphaNumeric,
  AlphaNumericSymbol,
  AlphaSymbol,
  AlphaUpper,
  AlphaUpperNumeric,
  AlphaUpperNumericSymbol,
  AlphaUpperSymbol,
  Binary,
  HexLower,
  HexUpper,
  Numeric,
  NumericSymbol,
  Octal,
  Symbol,
};
