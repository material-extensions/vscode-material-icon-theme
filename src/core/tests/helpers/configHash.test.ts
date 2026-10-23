import { describe, expect, it } from 'vitest';
import { getDefaultConfig } from '../../generator/config/defaultConfig';
import { getFileConfigHash } from '../../helpers/configHash';
import type { LanguageIconClone } from '../../models/icons/config';

describe('getFileConfigHash', () => {
  const languageClone: LanguageIconClone = {
    name: 'custom-typescript',
    base: 'typescript',
    color: '#42a5f5',
    lightColor: '#1976d2',
    ids: ['typescript'],
  };

  const configWithLanguageClone = (clone: LanguageIconClone) => ({
    ...getDefaultConfig(),
    languages: { associations: {}, customClones: [clone] },
  });

  it('keeps the default configuration without a file name suffix', () => {
    expect(getFileConfigHash(getDefaultConfig())).toBe('');
  });

  it('produces the same nonempty hash for identical language clones', () => {
    const hash = getFileConfigHash(configWithLanguageClone(languageClone));

    expect(hash).toMatch(/^~-?\d+$/);
    expect(
      getFileConfigHash(
        configWithLanguageClone({
          ...languageClone,
          ids: [...languageClone.ids],
        })
      )
    ).toBe(hash);
  });

  it.each<Partial<LanguageIconClone>>([
    { color: '#ef5350' },
    { lightColor: '#d32f2f' },
    { base: 'javascript' },
    { ids: ['typescriptreact'] },
  ])('changes the hash when a language clone changes: %j', (change) => {
    const originalHash = getFileConfigHash(
      configWithLanguageClone(languageClone)
    );
    const changedHash = getFileConfigHash(
      configWithLanguageClone({ ...languageClone, ...change })
    );

    expect(changedHash).not.toBe(originalHash);
  });
});
