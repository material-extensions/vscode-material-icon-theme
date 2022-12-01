import { equal } from 'assert';
import { getObjectPropertyValue } from '../../../helpers/objects';
import { getTranslationValue, initTranslations, replace } from '../../../i18n';
import { Translation } from '../../../models';

describe('i18n', () => {
  it('should initialize translations', () => {
    return initTranslations();
  });

  it('should translate key', () => {
    equal(
      getTranslationValue('activate', { activate: 'b' } as Translation),
      'b'
    );
  });

  it('should return undefined if translation is not defined', () => {
    equal(
      getTranslationValue('activate', {} as Translation, {} as Translation),
      undefined
    );
  });

  it('should use fallback if translation is not defined', () => {
    equal(
      getTranslationValue(
        'activate',
        {} as Translation,
        { activate: 'fb' } as Translation
      ),
      'fb'
    );
  });

  it('should get the correct translation value of the translation object', () => {
    const translation = {
      a: {
        b: {
          c: 'c',
        },
      },
    };
    equal(getObjectPropertyValue(translation, 'a.b.c'), 'c');
  });

  it('should use placeholder in translation', () => {
    equal(replace('%0 with placeholder', 'test'), 'test with placeholder');
    equal(
      replace('%0 with %1', 'test', 'placeholder'),
      'test with placeholder'
    );
  });
});
