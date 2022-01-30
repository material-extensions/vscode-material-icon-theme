import * as assert from 'assert';
import { getObjectPropertyValue } from '../../../helpers/objects';
import * as i18n from '../../../i18n';
import { Translation } from '../../../models';

describe('i18n', () => {
  it('should initialize translations', () => {
    return i18n.initTranslations();
  });

  it('should translate key', () => {
    assert.equal(
      i18n.getTranslationValue('activate', { activate: 'b' } as Translation),
      'b'
    );
  });

  it('should return undefined if translation is not defined', () => {
    assert.equal(
      i18n.getTranslationValue(
        'activate',
        {} as Translation,
        {} as Translation
      ),
      undefined
    );
  });

  it('should use fallback if translation is not defined', () => {
    assert.equal(
      i18n.getTranslationValue(
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
    assert.equal(getObjectPropertyValue(translation, 'a.b.c'), 'c');
  });

  it('should use placeholder in translation', () => {
    assert.equal(
      i18n.replace('%0 with placeholder', 'test'),
      'test with placeholder'
    );
    assert.equal(
      i18n.replace('%0 with %1', 'test', 'placeholder'),
      'test with placeholder'
    );
  });
});
