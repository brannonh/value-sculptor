import generateValue from '../src';
import { GeneratorType, StringType, PadType } from '../src/types';

describe('generateValue : string', () => {
  // Test all string types (except custom) in this test. Subsequent tests should
  // cycle through the available string types, using one per test.
  test('should generate requested string (GO: { length, stringType })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Alpha,
    });
    expect(value).toMatch(/^[a-zA-Z]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpper,
    });
    expect(value).toMatch(/^[A-Z]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLower,
    });
    expect(value).toMatch(/^[a-z]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Numeric,
    });
    expect(value).toMatch(/^[0-9]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumeric,
    });
    expect(value).toMatch(/^[a-zA-Z0-9]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumeric,
    });
    expect(value).toMatch(/^[A-Z0-9]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumeric,
    });
    expect(value).toMatch(/^[a-z0-9]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Symbol,
    });
    expect(value).toMatch(/^[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperSymbol,
    });
    expect(value).toMatch(/^[A-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerSymbol,
    });
    expect(value).toMatch(/^[a-z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.NumericSymbol,
    });
    expect(value).toMatch(/^[0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumericSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumericSymbol,
    });
    expect(value).toMatch(/^[A-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumericSymbol,
    });
    expect(value).toMatch(/^[a-z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);
  });

  test('should generate string from provided character set (GO: { length, stringType, charSet })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'B',
    });
    expect(value).toMatch('BBBBBBBBBB');

    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
    });
    expect(value).toMatch(/[ABC123xyz789]{10}/);
  });

  test('should generate string, space-padded at beginning (GO: { length, stringType, padType, padLengthStart })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Alpha,
      padType: PadType.Start,
      padLengthStart: 15,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z]{10}/);
  });

  test('should generate string, space-padded at end (GO: { length, stringType, padType, padLengthEnd })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpper,
      padType: PadType.End,
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[A-Z]{10}[ ]{5}/);
  });

  test('should generate string, padded at beginning with provided character (GO: { length, stringType, padType, padLengthStart, padCharStart })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLower,
      padType: PadType.Start,
      padCharStart: '*',
      padLengthStart: 15,
    });
    expect(value).toMatch(/[*]{5}[a-z]{10}/);
  });

  test('should generate string, padded at end with provided character (GO: { length, stringType, padType, padLengthEnd, padCharEnd })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Numeric,
      padType: PadType.End,
      padCharEnd: '.',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[0-9]{10}[.]{5}/);
  });

  test('should generate string, space-padded at both ends (GO: { length, stringType, padType, padPriority, padLengthStart, padLengthEnd })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumeric,
      padType: PadType.Both,
      padPriority: PadType.Start,
      padLengthStart: 15,
      padLengthEnd: 20,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z0-9]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumeric,
      padType: PadType.Both,
      padPriority: PadType.End,
      padLengthStart: 15,
      padLengthEnd: 20,
    });
    expect(value).toMatch(/[A-Z0-9]{10}[ ]{10}/);
  });

  test('should generate string, padded at both ends with provided characters (GO: { length, stringType, padType, padPriority, padLengthStart, padLengthEnd, padCharStart, padCharEnd })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumeric,
      padType: PadType.Both,
      padPriority: PadType.End,
      padCharStart: '!',
      padLengthStart: 20,
      padCharEnd: '~',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[!]{5}[a-z0-9]{10}[~]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Symbol,
      padType: PadType.Both,
      padPriority: PadType.Start,
      padCharStart: 'o',
      padLengthStart: 20,
      padCharEnd: 'x',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[o]{10}[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}/);
  });

  test('should generate string from provided character set, space-padded at beginning (GO: { length, stringType, charSet, padType, padLengthStart })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Start,
      padLengthStart: 15,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from provided character set, space-padded at end (GO: { length, stringType, charSet, padType, padLengthEnd })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.End,
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[ABC123xyz789]{10}[ ]{5}/);
  });

  test('should generate string from provided character set, padded at beginning with provided character (GO: { length, stringType, charSet, padType, padLengthStart, padCharStart })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Start,
      padCharStart: '%',
      padLengthStart: 15,
    });
    expect(value).toMatch(/[%]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from provided character set, padded at end with provided character (GO: { length, stringType, charSet, padType, padLengthEnd, padCharEnd })', () => {
    const value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.End,
      padCharEnd: '-',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[-]{5}/);
  });

  test('should generate string from provided character set, space-padded at both ends (GO: { length, stringType, charSet, padType, padPriority, padLengthStart, padLengthEnd })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Start,
      padLengthStart: 15,
      padLengthEnd: 20,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz7899]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.End,
      padLengthStart: 15,
      padLengthEnd: 20,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[ ]{10}/);
  });

  test('should generate string from provided character set, padded at both ends with provided characters (GO: { length, stringType, charSet, padType, padPriority, padLengthStart, padLengthEnd, padCharStart, padCharEnd })', () => {
    let value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.End,
      padCharStart: '!',
      padLengthStart: 20,
      padCharEnd: '~',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[!]{5}[ABC123xyz7899]{10}[~]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = generateValue(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Start,
      padCharStart: 'o',
      padLengthStart: 20,
      padCharEnd: 'x',
      padLengthEnd: 15,
    });
    expect(value).toMatch(/[o]{10}[ABC123xyz7899]{10}/);
  });
});
