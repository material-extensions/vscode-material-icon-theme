import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { Translation } from '../../models/i18n/translation';

vi.mock('../../i18n/translations/lang-en', () => ({
  translation: {
    activate: '%0 with %1',
    iconPacks: { description: '%0 with %1' },
  } as Translation,
}));

import { initTranslations, translate } from '../../i18n/translate';

describe('translations', () => {
  beforeAll(() => initTranslations('en'));

  it('translates known keys and returns unknown keys unchanged', () => {
    expect(translate('activate')).toBe('%0 with %1');
    expect(translate('unknown')).toBe('unknown');
  });

  it('resolves nested keys and interpolates variables', () => {
    expect(translate('iconPacks.description', 'test')).toBe('test with %1');
  });

  it('interpolates multiple numbered placeholders', () => {
    expect(translate('activate', 'test', 'placeholder')).toBe(
      'test with placeholder'
    );
  });

  it('loads the requested language', async () => {
    await initTranslations('de');

    expect(translate('activate')).toBe('Aktivieren');
  });

  it('falls back to English for unsupported languages', async () => {
    await initTranslations('unsupported');

    expect(translate('activate')).toBe('%0 with %1');
  });
});
