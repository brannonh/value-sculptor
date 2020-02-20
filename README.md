# value-sculptor

Value Sculptor is a library for generating pseudo-random values that can be used for various purposes (e.g., as example data, for testing purposes, etc.). It is not meant to generate realistic content data (for that I recommend [faker.js](https://github.com/Marak/Faker.js#readme)), but rather values that follow a known pattern.

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

| Value                   | Description                                 |
| ---                     | ---                                         |
| `GeneratorType.Number`  | Generate a random integer.                  |
| `GeneratorType.Select`  | Choose a random value from a provided list. |
| `GeneratorType.String`  | Generate a string or padded string.         |

### Options

The options object should follow one of the following patterns, corresponding with the type of value desired.

#### Number

| Key   | Type    | Required                | Default | Description                               |
| ---   | ---     | :--:                    | ---     | ---                                       |
| `max` | integer | :ballot_box_with_check: |         | The maximum value to generate (inclusive) |
| `min` | integer |                         | `0`     | The minimum value to generate (inclusive) |

#### Select

| Key         | Type      | Required                | Description                                           |
| ---         | ---       | :--:                    | ---                                                   |
| `possibles` | string[]  | :ballot_box_with_check: | An array of possible strings from which to choose one |

#### String

| Key               | Type        | Required                | Default | Description                                                                                             |
| ---               | ---         | :--:                    | ---     | ---                                                                                                     |
| `length`          | integer     | :ballot_box_with_check: |         | The length of the string                                                                                |
| `stringType`      | StringType  | :ballot_box_with_check: |         | The type of string to generate (see StringType)                                                         |
| `charSet`         | string      |                         |         | A string of possible characters, overrides `stringType`                                                 |
| `padCharEnd`      | string      |                         | space   | The character to use for padding on the right, omit for spaces                                          |
| `padCharStart`    | string      |                         | space   | The character to use for padding on the left, omit for spaces                                           |
| `padLengthEnd`    | integer     |                         |         | the length of the string after padding on the right, **required** for `PadType.Both` and `PadType.End`  |
| `padLengthStart`  | integer     |                         |         | The length of the string after padding on the left, **required** for `PadType.Both` and `PadType.Start` |
| `padPriority`     | PadType     |                         |         | The side of the string to pad first, **required** for `PadType.Both`                                    |
| `padType`         | PadType     |                         |         | The type of padding to use (see PadType), omit for no padding                                           |

##### StringType

| Value                                 | Possible Characters                                   |
| ---                                   | ---                                                   |
| `StringType.Alpha`                    | `a-z`, `A-Z`                                          |
| `StringType.AlphaLower`               | `a-z`                                                 |
| `StringType.AlphaLowerNumeric`        | `a-z`, `0-9`                                          |
| `StringType.AlphaLowerNumericSymbol`  | `a-z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `StringType.AlphaLowerSymbol`         | `a-z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `StringType.AlphaNumeric`             | `a-z`, `A-Z`, `0-9`                                   |
| `StringType.AlphaNumericSymbol`       | `a-z`, `A-Z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`   |
| `StringType.AlphaSymbol`              | `a-z`, `A-Z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `StringType.AlphaUpper`               | `A-Z`                                                 |
| `StringType.AlphaUpperNumeric`        | `A-Z`, `0-9`                                          |
| `StringType.AlphaUpperNumericSymbol`  | `A-Z`, `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`          |
| `StringType.AlphaUpperSymbol`         | `A-Z`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `StringType.Custom`                   | developer-defined                                     |
| `StringType.Numeric`                  | `0-9`                                                 |
| `StringType.NumericSymbol`            | `0-9`, `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                 |
| `StringType.Symbol`                   | `~!@#$%^&*-_=+{[()]}\|:;,<>.?`                        |

##### PadType

| Value           | Description                       |
| ---             | ---                               |
| `PadType.Both`  | Pad both sides of the string.     |
| `PadType.End`   | Pad the right side of the string. |
| `PadType.Start` | Pad the left side of the string.  |
