import { describe, expect, it } from 'bun:test';
import { get } from '../../helpers/object';
import { getTranslationValue, replace } from '../../i18n/translate';
import type { Translation } from '../../models/i18n/translation';

describe('i18n', () => {
  it('should translate key', () => {
    const result = getTranslationValue('activate', {
      activate: 'b',
    } as Translation);
    expect(result).toBe('b');
  });

  it('should return undefined if translation is not defined', () => {
    const result = getTranslationValue(
      'activate',
      {} as Translation,
      {} as Translation
    );
    expect(result).toBeUndefined();
  });

  it('should use fallback if translation is not defined', () => {
    const result = getTranslationValue(
      'activate',
      {} as Translation,
      { activate: 'fb' } as Translation
    );
    expect(result).toBe('fb');
  });

  it('should get the correct translation value of the translation object', () => {
    const translation = {
      a: {
        b: {
          c: 'c',
        },
      },
    };

    const result = get(translation, 'a.b.c');
    expect(result).toBe('c');
  });

  it('should use placeholder in translation', () => {
    const result = replace('%0 with placeholder', 'test');
    expect(result).toBe('test with placeholder');

    const result2 = replace('%0 with %1', 'test', 'placeholder');
    expect(result2).toBe('test with placeholder');
  });
});
