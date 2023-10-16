import { dashToPascalCase } from './dash-to-pascal-case';

describe('dashToPascalCase', () => {
  it('should convert a string from dash-case / kebab-case to PascalCase / CamelCase', () => {
    expect(dashToPascalCase('moo-moo-ma-moo')).toBe('MooMooMaMoo');
  });

  it('should convert a empty string to empty string', () => {
    expect(dashToPascalCase('')).toBe('');
  });

  it('should deal with uppercase characters', () => {
    expect(dashToPascalCase('i-Have-SOME-uPPEr-cHaRaCtErS')).toBe('IHaveSomeUpperCharacters');
  });
});
