import sculpt, { GeneratorType, CharacterSets, PadType } from '../src';

describe('sculpt : string', () => {
  // Test all string types (except custom) in this test. Subsequent tests should
  // cycle through the available string types, using one per test.
  test('should generate default string (SO: { length })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
    });
    expect(value).toMatch(/^[a-zA-Z]{10}$/);
  });

  test('should generate requested string (SO: { length, charSet })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Alpha,
    });
    expect(value).toMatch(/^[a-zA-Z]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpper,
    });
    expect(value).toMatch(/^[A-Z]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLower,
    });
    expect(value).toMatch(/^[a-z]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Numeric,
    });
    expect(value).toMatch(/^[0-9]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaNumeric,
    });
    expect(value).toMatch(/^[a-zA-Z0-9]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpperNumeric,
    });
    expect(value).toMatch(/^[A-Z0-9]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLowerNumeric,
    });
    expect(value).toMatch(/^[a-z0-9]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Symbol,
    });
    expect(value).toMatch(/^[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpperSymbol,
    });
    expect(value).toMatch(/^[A-Z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLowerSymbol,
    });
    expect(value).toMatch(/^[a-z~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.NumericSymbol,
    });
    expect(value).toMatch(/^[0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaNumericSymbol,
    });
    expect(value).toMatch(/^[a-zA-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpperNumericSymbol,
    });
    expect(value).toMatch(/^[A-Z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLowerNumericSymbol,
    });
    expect(value).toMatch(/^[a-z0-9~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}$/);
  });

  test('should generate string from custom character set (SO: { length, charSet })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'B',
    });
    expect(value).toMatch('BBBBBBBBBB');

    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz789',
    });
    expect(value).toMatch(/[ABC123xyz789]{10}/);
  });

  test('should generate string, space-padded at beginning (SO: { length, charSet, padType, padLengthLeft })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Alpha,
      padType: PadType.Left,
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z]{10}/);
  });

  test('should generate string, space-padded at end (SO: { length, charSet, padType, padLengthRight })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpper,
      padType: PadType.Right,
      padLengthRight: 15,
    });
    expect(value).toMatch(/[A-Z]{10}[ ]{5}/);
  });

  test('should generate string, padded at beginning with provided character (SO: { length, charSet, padType, padLengthLeft, padCharLeft })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLower,
      padType: PadType.Left,
      padCharLeft: '*',
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[*]{5}[a-z]{10}/);
  });

  test('should generate string, padded at end with provided character (SO: { length, charSet, padType, padLengthRight, padCharRight })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Numeric,
      padType: PadType.Right,
      padCharRight: '.',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[0-9]{10}[.]{5}/);
  });

  test('should generate string, space-padded at both ends (SO: { length, charSet, padType, padPriority, padLengthLeft, padLengthRight })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaNumeric,
      padType: PadType.Both,
      padPriority: PadType.Left,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ ]{5}[a-zA-Z0-9]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaUpperNumeric,
      padType: PadType.Both,
      padPriority: PadType.Right,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[A-Z0-9]{10}[ ]{10}/);
  });

  test('should generate string, padded at both ends with provided characters (SO: { length, charSet, padType, padPriority, padLengthLeft, padLengthRight, padCharLeft, padCharRight })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaLowerNumeric,
      padType: PadType.Both,
      padPriority: PadType.Right,
      padCharLeft: '!',
      padLengthLeft: 20,
      padCharRight: '~',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[!]{5}[a-z0-9]{10}[~]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.Symbol,
      padType: PadType.Both,
      padPriority: PadType.Left,
      padCharLeft: 'o',
      padLengthLeft: 20,
      padCharRight: 'x',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[o]{10}[~!@#$%^&*\-_=+{[()\]}|:;,<>.?]{10}/);
  });

  test('should generate unpadded string (invalid padType) (SO: { length, charSet, padType, padPriority, padLengthLeft, padLengthRight })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: CharacterSets.AlphaNumeric,
      padType: 4,
      padPriority: PadType.Left,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[a-zA-Z0-9]{10}/);
  });

  test('should generate string from custom character set, space-padded at beginning (SO: { length, charSet, padType, padLengthLeft })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz789',
      padType: PadType.Left,
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from custom character set, space-padded at end (SO: { length, charSet, padType, padLengthRight })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz789',
      padType: PadType.Right,
      padLengthRight: 15,
    });
    expect(value).toMatch(/[ABC123xyz789]{10}[ ]{5}/);
  });

  test('should generate string from custom character set, padded at beginning with provided character (SO: { length, charSet, padType, padLengthLeft, padCharLeft })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz789',
      padType: PadType.Left,
      padCharLeft: '%',
      padLengthLeft: 15,
    });
    expect(value).toMatch(/[%]{5}[ABC123xyz789]{10}/);
  });

  test('should generate string from custom character set, padded at end with provided character (SO: { length, charSet, padType, padLengthRight, padCharRight })', () => {
    const value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz789',
      padType: PadType.Right,
      padCharRight: '-',
      padLengthRight: 15,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[-]{5}/);
  });

  test('should generate string from custom character set, space-padded at both ends (SO: { length, charSet, padType, padPriority, padLengthLeft, padLengthRight })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Left,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ ]{5}[ABC123xyz7899]{10}[ ]{5}/);

    // Verify generated value when padLength values are setup incorrectly.
    value = sculpt({
      type: GeneratorType.String,
      length: 10,
      charSet: 'ABC123xyz7899',
      padType: PadType.Both,
      padPriority: PadType.Right,
      padLengthLeft: 15,
      padLengthRight: 20,
    });
    expect(value).toMatch(/[ABC123xyz7899]{10}[ ]{10}/);
  });

  test('should generate string from custom character set, padded at both ends with provided characters (SO: { length, charSet, padType, padPriority, padLengthLeft, padLengthRight, padCharLeft, padCharRight })', () => {
    let value = sculpt({
      type: GeneratorType.String,
      length: 10,
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
    value = sculpt({
      type: GeneratorType.String,
      length: 10,
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

  test('should generate string of two numbers between 0 and max (SO: { max, charSet })', () => {
    const value = sculpt(
      [
        { type: GeneratorType.Number, max: 100 },
        {
          type: GeneratorType.String,
          charSet: '.',
          length: 1,
        },
        { type: GeneratorType.Number, max: 200 },
      ],
      true
    );

    const [first, second] = (value as string).split('.');
    expect(parseInt(first)).toBeGreaterThanOrEqual(0);
    expect(parseInt(first)).toBeLessThanOrEqual(100);
    expect(parseInt(second)).toBeGreaterThanOrEqual(0);
    expect(parseInt(second)).toBeLessThanOrEqual(200);
  });

  test('should generate concatenated string (SO: { charSet })', () => {
    const value = sculpt(
      [
        {
          type: GeneratorType.String,
          charSet: CharacterSets.AlphaLower,
          length: 5,
        },
        {
          type: GeneratorType.String,
          charSet: CharacterSets.Numeric,
          length: 5,
        },
      ],
      true,
      '.'
    );
    expect(value).toMatch(/[a-z]{5}\.[0-9]{5}/);
  });
});
