# value-sculptor

Value Sculptor is a library for generating pseudo-random values that can be used for various purposes (e.g., as example data, for testing purposes, etc.). It is not meant to generate realistic content data (for that I recommend [faker.js](https://github.com/Marak/Faker.js#readme)), but rather values that follow a known pattern.

It is written in TypeScript and includes type definitions.

## Status

**Value Sculptor should be considered under development.** All releases prior to 1.0.0 could introduce breaking changes. Every effort will be made to ensure that documentation is accurate for each release.

## Installation

```shell
npm i value-sculptor
```

## Importing

To use, simply import (or require) from `value-sculptor`. You may also want to import (or require) `GeneratorType`, `StringType`, and/or `PadType` to make creating the `options` object easier.

```typescript
import sculpt from 'value-sculptor';
import { GeneratorType, PadType, StringType } from 'value-sculptor';
```

```javascript
var sculpt = require('value-sculptor').default;
var { GeneratorType, PadType, StringType } = require('value-sculptor');
```

## Types

The following types may make code easier to write and understand.

### GeneratorType

| Value     | Description                                 |
| ---       | ---                                         |
| `Number`  | Generate a random number.                   |
| `Select`  | Choose a random value from a list.          |
| `String`  | Create a string following a given pattern.  |

### StringType

| Value                      | Possible Characters                                   |
| ---                        | ---                                                   |
| `Alpha`                    | `a-z`, `A-Z`                                          |
| `AlphaLower`               | `a-z`                                                 |
| `AlphaLowerNumeric`        | `a-z`, `0-9`                                          |
| `AlphaLowerNumericSymbol`  | `a-z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `AlphaLowerSymbol`         | `a-z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `AlphaNumeric`             | `a-z`, `A-Z`, `0-9`                                   |
| `AlphaNumericSymbol`       | `a-z`, `A-Z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`   |
| `AlphaSymbol`              | `a-z`, `A-Z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `AlphaUpper`               | `A-Z`                                                 |
| `AlphaUpperNumeric`        | `A-Z`, `0-9`                                          |
| `AlphaUpperNumericSymbol`  | `A-Z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `AlphaUpperSymbol`         | `A-Z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `Custom`                   | developer-defined via `charSet`                       |
| `Numeric`                  | `0-9`                                                 |
| `NumericSymbol`            | `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `Symbol`                   | `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                        |

### PadType

| Value   | Description                       |
| ---     | ---                               |
| `Both`  | Pad both sides of the string.     |
| `Left`  | Pad the left side of the string.  |
| `Right` | Pad the right side of the string. |

## Usage

Examples are in TypeScript.

```typescript
function sculpt(options: SculptOptions | SculptOptions[], concat: boolean = true)
```

Just call the `sculpt` function with your desired options.

```typescript
// value will be a random number between 0 and 100 (inclusive).
//    example: 42
const value = sculpt({ type: GeneratorType.Number, max: 100 });

// value will be an array of two random numbers
//    the first will be between 0 and 100 (inclusive).
//    the second will be between 50 and 200 (inclusive).
//    example: [ 42, 123 ]
const value = sculpt([
  { type: GeneratorType.Number, max: 100 },
  { type: GeneratorType.Number, min: 50, max: 200 }
], false);

// value will be a string of numeric characters, left-padded to 15 characters with zeros
//    example: 000000000012345
const value = sculpt({
  type: GeneratorType.String,
  stringType: StringType.AlphaLower,
  length: 5,
  padType: PadType.Left,
  padLengthLeft: 15,
  padCharLeft: '0'
});

// value will be a string of random characters in the following pattern:
//    five lowercase characters, three numbers, five uppercase characters
//    example: abcde123ABCDE
const value = sculpt([
  { type: GeneratorType.String, stringType: StringType.AlphaLower, length: 5 },
  { type: GeneratorType.String, stringType: StringType.Numeric, length: 3 },
  { type: GeneratorType.String, stringType: StringType.AlphaUpper, length: 5 }
]);

// value will be a random string of 10 As and Bs
//    example: ABAAABABBA
const value = sculpt({
  type: GeneratorType.String,
  stringType: StringType.Custom,
  length: 10,
  charSet: 'AB'
});
```

### Arguments

#### options

The `options` argument is a `SculptOptions` object (or array of `SculpOption` objects) that may contain the following key-value pairs. If `options` is an array, a separate value will be generated for each object in the array.

| Key             | Type            | GeneratorType | Required            | Default | Description                                                                                                         |
| ---             | ---             | ---           | ---                 | ---     | ---                                                                                                                 |
| charSet         | `string`        | `String`      |                     |         | A string of possible characters, overrides `stringType`                                                             |
| length          | `integer`       | `String`      | :heavy_check_mark:  |         | The length of the string                                                                                            |
| max             | `integer`       | `Number`      | :heavy_check_mark:  |         | The maximum value to generate (inclusive)                                                                           |
| min             | `integer`       | `Number`      |                     | `0`     | The minimum value to generate (inclusive)                                                                           |
| padCharLeft     | `string`        | `String`      |                     | space   | The character to use for padding on the left, omit for spaces                                                       |
| padCharRight    | `string`        | `String`      |                     | space   | The character to use for padding on the right, omit for spaces                                                      |
| padLengthLeft   | `integer`       | `String`      |                     |         | The length of the string after padding on the left, **required** if `padType` is `PadType.Both` or `PadType.Left`   |
| padLengthRight  | `integer`       | `String`      |                     |         | The length of the string after padding on the right, **required** if `padType` is `PadType.Both` or `PadType.Right` |
| padPriority     | `PadType`       | `String`      |                     |         | The side of the string to pad first, **required** if `padType` is `PadType.Both`                                    |
| padType         | `PadType`       | `String`      |                     |         | The type of padding to use (see [PadType](#PadType)), omit for no padding                                           |
| possibles       | `string[]`      | `Select`      | :heavy_check_mark:  |         | An array of possible strings from which to choose one                                                               |
| stringType      | `StringType`    | `String`      | :heavy_check_mark:  |         | The type of string to generate (see [StringType](#StringType))                                                      |
| type            | `GeneratorType` |               | :heavy_check_mark:  |         | The type of value to create (see [GeneratorType](#GeneratorType))                                                   |

#### concat

The `concat` argument is an optional `boolean` value. If `true` (default), all of the generated values are concatenated together and returned as a single string. If `false`, an array of generated values is returned.

## Contributing

See our [guidelines for contributing](https://github.com/brannonh/value-sculptor/blob/master/CONTRIBUTING.md).
