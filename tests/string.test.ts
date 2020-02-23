import sculpt from '../src';
import { GeneratorType, StringType, PadType } from '../src/types';

describe('sculpt : string', () => {
  // Test all string types (except custom) in this test. Subsequent tests should
  // cycle through the available string types, using one per test.
  test('should generate requested string (GO: { length, stringType })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Alpha,
    });
    expect(value).toMatch(/^[a-zA-Z]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpper,
    });
    expect(value).toMatch(/^[A-Z]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLower,
    });
    expect(value).toMatch(/^[a-z]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Numeric,
    });
    expect(value).toMatch(/^[0-9]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumeric,
    });
    expect(value).toMatch(/^[a-zA-Z0-9]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumeric,
    });
    expect(value).toMatch(/^[A-Z0-9]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumeric,
    });
    expect(value).toMatch(/^[a-z0-9]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Symbol,
    });
    expect(value).toMatch(/^[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperSymbol,
    });
    expect(value).toMatch(/^[A-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerSymbol,
    });
    expect(value).toMatch(/^[a-z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.NumericSymbol,
    });
    expect(value).toMatch(/^[0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumericSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumericSymbol,
    });
    expect(value).toMatch(/^[A-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumericSymbol,
    });
    expect(value).toMatch(/^[a-z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);
  });

  test('should generate string from provided character set (GO: { length, stringType, charSet })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'B',
    });
    expect(value).toMatch('BBBBBBBBBB');

    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
    });
    expect(value).toMatch(/[ABC123xyz789]{10}/);
  });

  test('should generate string, space-padded at beginning (GO: { length, stringType, padType, padLengthLeft })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Alpha,
      padType: PadType.Left,
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z]{10}/);
  });

  test('should generate string, space-padded at end (GO: { length, stringType, padType, padLengthRight })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpper,
      padType: PadType.Right,
      padLengthRight: 15,
    });
    expect(value).toMatch(/[A-Z]{10}[ ]{5}/);
  });

  test('should generate string, padded at beginning with provided character (GO: { length, stringType, padType, padLengthLeft, padCharLeft })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLower,
      padType: PadType.Left,
      padCharLeft: '*',
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[*]{5}[a-z]{10}/);
  });

  test('should generate string, padded at end with provided character (GO: { length, stringType, padType, padLengthRight, padCharRight })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Numeric,
      padType: PadType.Right,
      padCharRight: '.',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[0-9]{10}[.]{5}/);
  });

  test('should generate string, space-padded at both ends (GO: { length, stringType, padType, padPriority, padLengthLeft, padLengthRight })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaNumeric,
      padType: PadType.Both,
      padPriority: PadType.Left,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z0-9]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaUpperNumeric,
      padType: PadType.Both,
      padPriority: PadType.Right,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[A-Z0-9]{10}[ ]{10}/);
  });

  test('should generate string, padded at both ends with provided characters (GO: { length, stringType, padType, padPriority, padLengthLeft, padLengthRight, padCharLeft, padCharRight })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.AlphaLowerNumeric,
      padType: PadType.Both,
      padPriority: PadType.Right,
      padCharLeft: '!',
      padLengthLeft: 20,
      padCharRight: '~',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[!]{5}[a-z0-9]{10}[~]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Symbol,
      padType: PadType.Both,
      padPriority: PadType.Left,
      padCharLeft: 'o',
      padLengthLeft: 20,
      padCharRight: 'x',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[o]{10}[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}/);
  });

  test('should generate string from provided character set, space-padded at beginning (GO: { length, stringType, charSet, padType, padLengthLeft })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Left,
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from provided character set, space-padded at end (GO: { length, stringType, charSet, padType, padLengthRight })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Right,
      padLengthRight: 15,
    });
    expect(value).toMatch(/[ABC123xyz789]{10}[ ]{5}/);
  });

  test('should generate string from provided character set, padded at beginning with provided character (GO: { length, stringType, charSet, padType, padLengthLeft, padCharLeft })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Left,
      padCharLeft: '%',
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[%]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from provided character set, padded at end with provided character (GO: { length, stringType, charSet, padType, padLengthRight, padCharRight })', () => {
    const value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz789',
      padType: PadType.Right,
      padCharRight: '-',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[-]{5}/);
  });

  test('should generate string from provided character set, space-padded at both ends (GO: { length, stringType, charSet, padType, padPriority, padLengthLeft, padLengthRight })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Left,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz7899]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Right,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[ ]{10}/);
  });

  test('should generate string from provided character set, padded at both ends with provided characters (GO: { length, stringType, charSet, padType, padPriority, padLengthLeft, padLengthRight, padCharLeft, padCharRight })', () => {
    let value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Right,
      padCharLeft: '!',
      padLengthLeft: 20,
      padCharRight: '~',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[!]{5}[ABC123xyz7899]{10}[~]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt(GeneratorType.String, {
      length: 10,
      stringType: StringType.Custom,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Left,
      padCharLeft: 'o',
      padLengthLeft: 20,
      padCharRight: 'x',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[o]{10}[ABC123xyz7899]{10}/);
  });
});
