# value-sculptor

Value Sculptor is a library for generating pseudo-random values that can be used as example data or for testing purposes. It is not meant to generate realistic content data (for that I recommend [faker.js](https://github.com/Marak/Faker.js#readme)), but rather values that follow a known pattern.

It is written in TypeScript and includes type definitions.

## Installation

```shell
npm i value-sculptor
```

## Usage

### Importing

To install, simply import from `value-sculptor`. You will also need to import at least `GeneratorType` from `value-sculptor/lib/types`. If generating strings, you will also need `StringType`, and possibly `PadType`.

```typescript
import sculpt from 'value-sculptor';
import { GeneratorType, StringType, PadType } from 'value-sculptor/lib/types';
```

### Generating

```javascript
function sculpt(type, options)
```

Just call the `sculpt` function with your desired options.

```typescript
// value will be a random number between 0 and 100 (inclusive).
const value = sculpt(GeneratorType.Number, { max: 100 });
```

## Arguments

### Type

You can generate three different types of values.

- `GeneratorType.Number`
- `GeneratorType.Select`
- `GeneratorType.String`

### Options

The options object should follow one of the following patterns, corresponding with the type of value desired.

#### Number

```javascript
{
  // required   maximum value (inclusive)
  max: 100
  //            minimum value (inclusive)
  min: 0,
}
```

#### Select

```javascript
{
  // required   array of possible values
  //            one will be selected at (pseudo) random
  possibles: []
}
```

#### String

```javascript
{
  // required   the length of the string
  length: 1,
  // required   the type of string to generate (see StringType)
  stringType: StringType.Alpha,
  //            a string of possible characters, overrides stringType
  charSet: 'ABCXYZ',
  //            the type of padding to use (see PadType), omit for no padding
  padType: PadType.Start,
  //            the side of the string to pad first, required for PadType.Both
  padPriority: PadType.End,
  //            the length of the string after padding at the beginning,
  //            required for PadType.Start
  padLengthStart: 5,
  //            the length of the string after padding at the end,
  //            required for PadType.End
  padLengthEnd: 5,
  //            the character to use for padding at the beginning, omit for spaces
  padCharStart: '.',
  //            the character to use for padding at the end, omit for spaces
  padCharEnd: '-'
}
```

##### StringType

- `StringType.Alpha` (a-zA-Z)
- `StringType.AlphaUpper` (A-Z)
- `StringType.AlphaLower` (a-z)
- `StringType.Numeric` (0-9)
- `StringType.AlphaNumeric` (a-zA-Z0-9)
- `StringType.AlphaUpperNumeric` (A-Z0-9)
- `StringType.AlphaLowerNumeric` (a-z0-9)
- `StringType.Symbol` (~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaSymbol` (a-zA-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaUpperSymbol` (A-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaLowerSymbol` (a-z~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.NumericSymbol` (0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaNumericSymbol` (a-zA-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaUpperNumericSymbol` (A-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.AlphaLowerNumericSymbol` (a-z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?)
- `StringType.Custom` (developer-defined)

##### PadType

- `PadType.Start`
- `PadType.End`
- `PadType.Both`
