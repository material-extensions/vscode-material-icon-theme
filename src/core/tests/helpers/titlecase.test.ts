import { describe, expect, it } from 'bun:test';
import { capitalizeFirstLetter, toTitleCase } from '../../helpers/titlecase';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should handle an already capitalized string', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should leave the rest of the string unchanged', () => {
    expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
  });

  it('should handle a single character', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
  });

  it('should handle an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});

describe('toTitleCase', () => {
  it('should capitalize the first letter of each word', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  it('should handle already capitalized words', () => {
    expect(toTitleCase('Hello World')).toBe('Hello World');
  });

  it('should handle mixed case', () => {
    expect(toTitleCase('hELLO wORLD')).toBe('Hello World');
  });

  it('should handle a single word', () => {
    expect(toTitleCase('react')).toBe('React');
  });

  it('should handle single character words', () => {
    expect(toTitleCase('a b c')).toBe('A B C');
  });

  it('should handle empty strings', () => {
    expect(toTitleCase('')).toBe('');
  });

  it('should handle strings with extra spaces', () => {
    expect(toTitleCase('  hello  world  ')).toBe('  Hello  World  ');
  });

  it('should handle strings with leading/trailing spaces', () => {
    expect(toTitleCase('  icon pack  ')).toBe('  Icon Pack  ');
  });
});
