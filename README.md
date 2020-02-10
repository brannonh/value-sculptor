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

## Options

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
  min: 0,                         //            minimum value (inclusive)
  max: 100                        // required   maximum value (inclusive)
}
```

#### Select

```javascript
{
  possibles: []                   // required   array of possible values
}
```

#### String

```javascript
{
  length: 1,                      // required   the length of the string
  stringType: StringType.Alpha,   // required   the type of string to generate (see StringType)
  charSet: 'ABCXYZ'               //            a string of possible characters
}
```
