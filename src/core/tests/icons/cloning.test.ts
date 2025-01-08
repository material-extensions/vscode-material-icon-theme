import { beforeAll, describe, expect, it, mock } from 'bun:test';
import { type INode, parse } from 'svgson';
import { customClonesIcons } from '../../generator/clones/clonesGenerator';
import {
  Type,
  Variant,
  getCloneData,
} from '../../generator/clones/utils/cloneData';
import {
  cloneIcon,
  getStyle,
  traverse,
} from '../../generator/clones/utils/cloning';
import {
  closerMaterialColorTo,
  materialPalette as palette,
} from '../../generator/clones/utils/color/materialPalette';
import { padWithDefaultConfig } from '../../generator/config/defaultConfig';
import {
  clonesFolder,
  iconFolderPath,
  lightColorFileEnding,
  openedFolder,
} from '../../generator/constants';
import { getFileConfigHash } from '../../helpers/configHash';
import { merge } from '../../helpers/object';
import { resolvePath } from '../../helpers/resolvePath';
import type {
  FileIconClone,
  FolderIconClone,
  LanguageIconClone,
} from '../../models/icons/config';
import { type Manifest, createEmptyManifest } from '../../models/manifest';
import {
  isValidColor,
  orderDarkToLight,
} from './../../generator/clones/utils/color/colors';
import * as icon from './data/icons';

describe('cloning: color manipulation', () => {
  describe('#orderDarkToLight(..)', () => {
    it('should order colors from dark to light', () => {
      const colors = new Set(['#000', '#fff', '#f00', '#0f0', '#00f']);
      const result = orderDarkToLight(colors);
      expect(result).toStrictEqual(['#000', '#f00', '#0f0', '#00f', '#fff']);
    });

    it('if empty set, should return empty array', () => {
      const colors = new Set<string>();
      const result = orderDarkToLight(colors);
      expect(result).toStrictEqual([]);
    });

    it('if one color, should return array with that color', () => {
      const colors = new Set(['#000']);
      const result = orderDarkToLight(colors);
      expect(result).toStrictEqual(['#000']);
    });
  });

  describe('#closerMaterialColorTo(..)', () => {
    it('should return the closest material color to the given color', () => {
      const color = '#e24542';
      const result = closerMaterialColorTo(color);
      expect(result).toStrictEqual(palette['red-600']);
    });

    it('should return the same color if it is already a material color', () => {
      const color = palette['indigo-500'];
      const result = closerMaterialColorTo(color);
      expect(result).toStrictEqual(color);
    });

    it('should throw an error if the given color is not valid', () => {
      const color = 'bad-color';
      expect(() => closerMaterialColorTo(color)).toThrowError(
        'The given color "bad-color" is not valid!'
      );
    });
  });
});

describe('cloning: icon cloning', () => {
  describe('#getCloneData(..)', () => {
    const subFolder = 'sub/';
    const hash = '~-fakehash123456789';
    const ext = '.ext';
    let manifest: Manifest;

    beforeAll(() => {
      manifest = {
        iconDefinitions: {
          base: {
            iconPath: 'icons/icon.svg',
          },
          base2: {
            iconPath: 'icons/icon2.svg',
          },
          // biome-ignore lint/style/useNamingConvention:
          base2_light: {
            iconPath: 'icons/icon2_light.svg',
          },
          'folder-base': {
            iconPath: 'icons/folder-base.svg',
          },
          'folder-base-open': {
            iconPath: 'icons/folder-base_open.svg',
          },
          'folder-base2': {
            iconPath: 'icons/folder-base2.svg',
          },
          'folder-base2-open': {
            iconPath: 'icons/folder-base2_open.svg',
          },
          'folder-base2_light': {
            iconPath: 'icons/folder-base2_light.svg',
          },
          'folder-base2-open_light': {
            iconPath: 'icons/folder-base2_open_light.svg',
          },
        },
      } as Partial<Manifest> as Manifest;
    });

    describe('clone data generation for file icons', () => {
      it('should create a single clone object if not light version exists or asked', () => {
        const cloneOpts: FileIconClone = {
          name: 'foo',
          base: 'base',
          color: 'green-500',
          fileExtensions: ['bar'],
          fileNames: ['file.xyz'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it('should create two clone objects if light version exists', () => {
        const cloneOpts: FileIconClone = {
          name: 'foo',
          base: 'base2',
          color: 'green-500',
          fileExtensions: ['bar'],
          fileNames: ['file.xyz'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base2.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!.base2_light!.iconPath
              ),
              type: Type.File,
              variant: Variant.Light,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${lightColorFileEnding}${hash}${ext}`,
            name: `foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.File,
            variant: Variant.Light,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it("should create two clone objects if light version is asked and base light doesn't exist", () => {
        const cloneOpts: FileIconClone = {
          name: 'foo',
          base: 'base',
          color: 'green-500',
          lightColor: 'green-800',
          fileExtensions: ['bar'],
          fileNames: ['file.xyz'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
          {
            base: {
              // since light version of icon base doesn't exist, the base icon is used as a base
              // to clone the light version
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Light,
            },
            color: 'green-800',
            inConfigPath: `${iconFolderPath}${subFolder}foo${lightColorFileEnding}${hash}${ext}`,
            name: `foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.File,
            variant: Variant.Light,
          },
        ];

        expect(result).toStrictEqual(expected);
      });
    });

    describe('clone data generation for folder icons', () => {
      it('should create a single clone object if not light version exists or asked', () => {
        const cloneOpts: FolderIconClone = {
          name: 'foo',
          base: 'base',
          color: 'green-500',
          folderNames: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${hash}${ext}`,
            name: 'folder-foo',
            path: resolvePath(`./icons/${subFolder}folder-foo${hash}${ext}`),
            type: Type.Folder,
            variant: Variant.Base,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base-open'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Open,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${openedFolder}${hash}${ext}`,
            name: `folder-foo${openedFolder}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${openedFolder}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.Open,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it('should create two clone objects if light version exists', () => {
        const cloneOpts: FolderIconClone = {
          name: 'foo',
          base: 'folder-base2',
          color: 'green-500',
          folderNames: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base2'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${hash}${ext}`,
            name: 'folder-foo',
            path: resolvePath(`./icons/${subFolder}folder-foo${hash}${ext}`),
            type: Type.Folder,
            variant: Variant.Base,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base2-open'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Open,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${openedFolder}${hash}${ext}`,
            name: `folder-foo${openedFolder}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${openedFolder}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.Open,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base2_light']!.iconPath
              ),
              type: Type.Folder,
              variant: Variant.Light,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${lightColorFileEnding}${hash}${ext}`,
            name: `folder-foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.Light,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base2-open_light']!.iconPath
              ),
              type: Type.Folder,
              variant: Variant.LightOpen,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${openedFolder}${lightColorFileEnding}${hash}${ext}`,
            name: `folder-foo${openedFolder}${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${openedFolder}${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.LightOpen,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it("should create two clone objects if light version is asked and base light doesn't exist", () => {
        const cloneOpts: FolderIconClone = {
          name: 'foo',
          base: 'folder-base',
          color: 'green-500',
          lightColor: 'green-800',
          folderNames: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${hash}${ext}`,
            name: 'folder-foo',
            path: resolvePath(`./icons/${subFolder}folder-foo${hash}${ext}`),
            type: Type.Folder,
            variant: Variant.Base,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!['folder-base-open'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Open,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${openedFolder}${hash}${ext}`,
            name: `folder-foo${openedFolder}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${openedFolder}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.Open,
          },
          {
            base: {
              // since light version of icon base doesn't exist, the base icon is used as a base
              // to clone the light version
              path: resolvePath(
                manifest.iconDefinitions!['folder-base'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.Light,
            },
            color: 'green-800',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${lightColorFileEnding}${hash}${ext}`,
            name: `folder-foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.Light,
          },
          {
            base: {
              // since light version of icon base doesn't exist, the base icon is used as a base
              // to clone the light version
              path: resolvePath(
                manifest.iconDefinitions!['folder-base-open'].iconPath
              ),
              type: Type.Folder,
              variant: Variant.LightOpen,
            },
            color: 'green-800',
            inConfigPath: `${iconFolderPath}${subFolder}folder-foo${openedFolder}${lightColorFileEnding}${hash}${ext}`,
            name: `folder-foo${openedFolder}${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}folder-foo${openedFolder}${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.Folder,
            variant: Variant.LightOpen,
          },
        ];

        expect(result).toStrictEqual(expected);
      });
    });

    describe('clone data generation for language icons', () => {
      it('should create a single clone object if not light version exists or asked', () => {
        const cloneOpts: LanguageIconClone = {
          name: 'foo',
          base: 'base',
          color: 'green-500',
          ids: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it('should create two clone objects if light version exists', () => {
        const cloneOpts: LanguageIconClone = {
          name: 'foo',
          base: 'base2',
          color: 'green-500',
          ids: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base2.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
          {
            base: {
              path: resolvePath(
                manifest.iconDefinitions!.base2_light!.iconPath
              ),
              type: Type.File,
              variant: Variant.Light,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${lightColorFileEnding}${hash}${ext}`,
            name: `foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.File,
            variant: Variant.Light,
          },
        ];

        expect(result).toStrictEqual(expected);
      });

      it("should create two clone objects if light version is asked and base light doesn't exist", () => {
        const cloneOpts: LanguageIconClone = {
          name: 'foo',
          base: 'base',
          color: 'green-500',
          lightColor: 'green-800',
          ids: ['bar'],
        };

        const result = getCloneData(cloneOpts, manifest, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Base,
            },
            color: 'green-500',
            inConfigPath: `${iconFolderPath}${subFolder}foo${hash}${ext}`,
            name: 'foo',
            path: resolvePath(`./icons/${subFolder}foo${hash}${ext}`),
            type: Type.File,
            variant: Variant.Base,
          },
          {
            base: {
              // since light version of icon base doesn't exist, the base icon is used as a base
              // to clone the light version
              path: resolvePath(manifest.iconDefinitions!.base.iconPath),
              type: Type.File,
              variant: Variant.Light,
            },
            color: 'green-800',
            inConfigPath: `${iconFolderPath}${subFolder}foo${lightColorFileEnding}${hash}${ext}`,
            name: `foo${lightColorFileEnding}`,
            path: resolvePath(
              `./icons/${subFolder}foo${lightColorFileEnding}${hash}${ext}`
            ),
            type: Type.File,
            variant: Variant.Light,
          },
        ];

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('#cloneIcon(..)', () => {
    const bluePalette = [
      palette['blue-50'],
      palette['blue-100'],
      palette['blue-200'],
      palette['blue-300'],
      palette['blue-400'],
      palette['blue-500'],
      palette['blue-600'],
      palette['blue-700'],
      palette['blue-800'],
      palette['blue-900'],
      palette['blue-A100'],
      palette['blue-A200'],
      palette['blue-A400'],
      palette['blue-A700'],
    ];

    it('should replace the color with the given color', async () => {
      mock.module('node:fs/promises', () => {
        return {
          readFile: () => Promise.resolve(icon.file),
        };
      });

      // mock the fs.readFileSync method to return the desired icon file
      const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(await parse(result), (color, loc) => {
        expect(color).toBe(palette['blue-600']);
        expect(loc).toBe('style:fill');
      });

      expect(colorCount).toBe(1);
    });

    it('should replace the color with the given color if color is in fill attribute', async () => {
      // mock the fs.readFileSync method to return the desired icon file
      mock.module('node:fs/promises', () => {
        return {
          readFile: () => Promise.resolve(icon.fileFill),
        };
      });
      const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(await parse(result), (color, loc) => {
        expect(color).toBe(palette['blue-600']);
        expect(loc).toBe('attr:fill');
      });

      expect(colorCount).toBe(1);
    });

    it('should replace the color with the given color if color is in stop-color attribute', async () => {
      mock.module('node:fs/promises', () => {
        return {
          readFile: () => Promise.resolve(icon.gradient),
        };
      });
      const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(await parse(result), (color, loc) => {
        expect(bluePalette).toContain(color);
        expect(loc).toBe('attr:stop-color');
      });

      expect(colorCount).toBe(3);
    });

    it('should replace colors on icons with multiple nodes', async () => {
      mock.module('node:fs/promises', () => {
        return {
          readFile: () => Promise.resolve(icon.folder),
        };
      });
      const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colors: string[] = [];
      const colorCount = forEachColor(await parse(result), (color, loc) => {
        colors.push(color);
        expect(bluePalette).toContain(color);
        expect(loc).toBe('style:fill');
      });

      // check that one of the colors is actually blue-600
      expect(colors.includes(palette['blue-600'])).toBeTruthy();

      expect(colorCount).toBe(2);
    });

    describe('`data-mit-no-recolor` attribute', () => {
      it('should not replace the color if the node has the `data-mit-no-recolor` attribute', async () => {
        mock.module('node:fs/promises', () => {
          return {
            readFile: () => Promise.resolve(icon.folderIgnores),
          };
        });

        const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');
        const parsed = await parse(result);
        const changedNodeStyle = getStyle(parsed.children[0]);
        const unchangedNodeStyle = getStyle(parsed.children[1]);

        expect(changedNodeStyle.fill).toBe(palette['blue-600']);
        expect(unchangedNodeStyle.fill).toBe('red');
      });

      it('should not replace the color of any child of a node with the `data-mit-no-recolor` attribute', async () => {
        mock.module('node:fs/promises', () => {
          return {
            readFile: () => Promise.resolve(icon.gradientIgnore),
          };
        });
        const result = await cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

        const colorCount = forEachColor(await parse(result), (color, loc) => {
          expect(['#00695c', '#26a69a', '#b2dfdb']).toContain(color);
          expect(bluePalette).not.toContain(color);
          expect(loc).toBe('attr:stop-color');
        });

        expect(colorCount).toBe(3);
      });
    });
  });
});

/** helper function to traverse the svg tree and notify the colors found */
const forEachColor = (
  node: INode,
  callback: (color: string, loc?: string) => void
) => {
  let colorCount = 0;

  const notify = (color: string, loc: string) => {
    colorCount++;
    callback(color, loc);
  };

  traverse(
    node,
    (node) => {
      // check colors in style attribute
      const style = getStyle(node);
      style?.fill &&
        isValidColor(style.fill) &&
        notify(style.fill, 'style:fill');
      style?.stroke &&
        isValidColor(style.stroke) &&
        notify(style.stroke, 'style:stroke');
      node.attributes?.fill &&
        isValidColor(node.attributes.fill) &&
        notify(node.attributes.fill, 'attr:fill');
      node.attributes?.stroke &&
        isValidColor(node.attributes.stroke) &&
        notify(node.attributes.stroke, 'attr:stroke');
      node.attributes?.['stop-color'] &&
        isValidColor(node.attributes['stop-color']) &&
        notify(node.attributes['stop-color'], 'attr:stop-color');
    },
    false // no filtering
  );

  return colorCount;
};

describe('cloning: json config generation from user options', () => {
  beforeAll(() => {
    mock.module('node:fs/promises', () => {
      return {
        readFile: () => Promise.resolve(icon.file),
        writeFile: () => Promise.resolve(),
      };
    });
  });

  const getManifest = (hash: string) => {
    return {
      iconDefinitions: {
        foo: { iconPath: `./../icons/foo${hash}.svg` },
        file: { iconPath: `./../icons/file${hash}.svg` },
        'folder-foo': { iconPath: `./../icons/folder${hash}.svg` },
        'folder-foo-open': { iconPath: `./../icons/folder-open${hash}.svg` },
      },
      folderNames: {},
      folderNamesExpanded: {},
      fileExtensions: {},
      fileNames: { 'foo.bar': 'foo' },
      file: 'file',
      languageIds: {
        json: 'foo',
      },
      light: {
        fileExtensions: {},
        fileNames: {},
        folderNames: {},
        folderNamesExpanded: {},
      },
      highContrast: { fileExtensions: {}, fileNames: {} },
    };
  };

  it('should generate the manifest from the config', async () => {
    const config = padWithDefaultConfig({
      files: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            fileNames: ['bar.foo'],
            fileExtensions: ['baz'],
            color: 'green-400',
            lightColor: 'green-800',
          },
        ],
      },
      folders: {
        customClones: [
          {
            base: 'folder-foo',
            name: 'folder-foo-clone',
            folderNames: ['bar'],
            color: 'green-400',
            lightColor: 'green-800',
          },
        ],
      },
      languages: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            ids: ['json'],
            color: 'green-400',
            lightColor: 'green-800',
          },
        ],
      },
    });
    const hash = getFileConfigHash(config);
    const result = await customClonesIcons(getManifest(hash), config);

    const expected = merge<Manifest>(createEmptyManifest(), {
      iconDefinitions: {
        file: {
          iconPath: `./../icons/file${hash}.svg`,
        },
        'folder-foo': {
          iconPath: `./../icons/folder${hash}.svg`,
        },
        'folder-foo-open': {
          iconPath: `./../icons/folder${openedFolder}${hash}.svg`,
        },
        foo: {
          iconPath: `./../icons/foo${hash}.svg`,
        },
        'folder-foo-clone': {
          iconPath: `./../icons/${clonesFolder}folder-foo-clone${hash}.svg`,
        },
        'folder-foo-clone-open': {
          iconPath: `./../icons/${clonesFolder}folder-foo-clone${openedFolder}${hash}.svg`,
        },
        'folder-foo-clone_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-clone${lightColorFileEnding}${hash}.svg`,
        },
        'folder-foo-clone-open_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-clone${openedFolder}${lightColorFileEnding}${hash}.svg`,
        },
        'foo-clone': {
          iconPath: `./../icons/${clonesFolder}foo-clone${hash}.svg`,
        },
        'foo-clone_light': {
          iconPath: `./../icons/${clonesFolder}foo-clone${lightColorFileEnding}${hash}.svg`,
        },
      },
      folderNames: { bar: 'folder-foo-clone' },
      folderNamesExpanded: { bar: `folder-foo-clone${openedFolder}` },
      fileExtensions: { baz: 'foo-clone' },
      fileNames: { 'bar.foo': 'foo-clone', 'foo.bar': 'foo' },
      file: 'file',
      languageIds: {
        json: 'foo-clone',
      },
      light: {
        fileExtensions: { baz: `foo-clone${lightColorFileEnding}` },
        fileNames: { 'bar.foo': `foo-clone${lightColorFileEnding}` },
        folderNames: { bar: `folder-foo-clone${lightColorFileEnding}` },
        folderNamesExpanded: {
          bar: `folder-foo-clone${openedFolder}${lightColorFileEnding}`,
        },
        languageIds: {
          json: 'foo-clone_light',
        },
      },
      highContrast: { fileExtensions: {}, fileNames: {} },
    });

    expect(result).toStrictEqual(expected);
  });

  it('should not generate clones for icons not in the active pack', async () => {
    const config = padWithDefaultConfig({
      files: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            fileNames: ['bar.foo'],
            fileExtensions: ['baz'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
        ],
      },
      folders: {
        customClones: [
          {
            base: 'folder-foo',
            name: 'folder-foo-clone',
            folderNames: ['bar'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
        ],
      },
      languages: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            ids: ['json'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
        ],
      },
    });
    const hash = getFileConfigHash(config);
    const result = await customClonesIcons(getManifest(hash), config);

    const expected = merge<Manifest>(createEmptyManifest(), {
      iconDefinitions: {
        file: {
          iconPath: `./../icons/file${hash}.svg`,
        },
        'folder-foo': {
          iconPath: `./../icons/folder${hash}.svg`,
        },
        'folder-foo-open': {
          iconPath: `./../icons/folder${openedFolder}${hash}.svg`,
        },
        foo: {
          iconPath: `./../icons/foo${hash}.svg`,
        },
      },
      folderNames: {},
      folderNamesExpanded: {},
      fileExtensions: {},
      fileNames: { 'foo.bar': 'foo' },
      file: 'file',
      languageIds: {
        json: 'foo',
      },
      light: {
        fileExtensions: {},
        fileNames: {},
        folderNames: {},
        folderNamesExpanded: {},
      },
      highContrast: { fileExtensions: {}, fileNames: {} },
    });

    expect(result).toStrictEqual(expected);
  });

  it('should generate clones for icons in the active pack, or whose pack is unspecified', async () => {
    const config = padWithDefaultConfig({
      files: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            fileNames: ['bar.foo'],
            fileExtensions: ['baz'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
          {
            base: 'foo',
            name: 'foo-angular-clone',
            fileNames: ['bar.foo.angular'],
            fileExtensions: ['baz.angular'],
            color: 'green-500',
            lightColor: 'green-900',
            activeForPacks: ['angular'],
          },
          {
            base: 'foo',
            name: 'foo-any-clone',
            fileNames: ['bar.foo.any'],
            fileExtensions: ['baz.any'],
            color: 'green-600',
            lightColor: 'green-100',
          },
        ],
      },
      folders: {
        customClones: [
          {
            base: 'folder-foo',
            name: 'folder-foo-clone',
            folderNames: ['bar'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
          {
            base: 'folder-foo',
            name: 'folder-foo-angular-clone',
            folderNames: ['bar.angular'],
            color: 'green-500',
            lightColor: 'green-900',
            activeForPacks: ['angular'],
          },
          {
            base: 'folder-foo',
            name: 'folder-foo-any-clone',
            folderNames: ['bar.any'],
            color: 'green-600',
            lightColor: 'green-100',
          },
        ],
      },
      languages: {
        customClones: [
          {
            base: 'foo',
            name: 'foo-clone',
            ids: ['json'],
            color: 'green-400',
            lightColor: 'green-800',
            activeForPacks: ['nest'],
          },
          {
            base: 'foo',
            name: 'foo-angular-clone',
            ids: ['json.angular'],
            color: 'green-500',
            lightColor: 'green-900',
            activeForPacks: ['angular'],
          },
          {
            base: 'foo',
            name: 'foo-any-clone',
            ids: ['json.any'],
            color: 'green-600',
            lightColor: 'green-100',
          },
        ],
      },
    });
    const hash = getFileConfigHash(config);
    const result = await customClonesIcons(getManifest(hash), config);

    const expected = merge<Manifest>(createEmptyManifest(), {
      iconDefinitions: {
        file: {
          iconPath: `./../icons/file${hash}.svg`,
        },
        'folder-foo': {
          iconPath: `./../icons/folder${hash}.svg`,
        },
        'folder-foo-open': {
          iconPath: `./../icons/folder${openedFolder}${hash}.svg`,
        },
        foo: {
          iconPath: `./../icons/foo${hash}.svg`,
        },
        'folder-foo-angular-clone': {
          iconPath: `./../icons/${clonesFolder}folder-foo-angular-clone${hash}.svg`,
        },
        'folder-foo-angular-clone-open': {
          iconPath: `./../icons/${clonesFolder}folder-foo-angular-clone${openedFolder}${hash}.svg`,
        },
        'folder-foo-angular-clone_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-angular-clone${lightColorFileEnding}${hash}.svg`,
        },
        'folder-foo-angular-clone-open_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-angular-clone${openedFolder}${lightColorFileEnding}${hash}.svg`,
        },
        'folder-foo-any-clone': {
          iconPath: `./../icons/${clonesFolder}folder-foo-any-clone${hash}.svg`,
        },
        'folder-foo-any-clone-open': {
          iconPath: `./../icons/${clonesFolder}folder-foo-any-clone${openedFolder}${hash}.svg`,
        },
        'folder-foo-any-clone_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-any-clone${lightColorFileEnding}${hash}.svg`,
        },
        'folder-foo-any-clone-open_light': {
          iconPath: `./../icons/${clonesFolder}folder-foo-any-clone${openedFolder}${lightColorFileEnding}${hash}.svg`,
        },
        'foo-angular-clone': {
          iconPath: `./../icons/${clonesFolder}foo-angular-clone${hash}.svg`,
        },
        'foo-angular-clone_light': {
          iconPath: `./../icons/${clonesFolder}foo-angular-clone${lightColorFileEnding}${hash}.svg`,
        },
        'foo-any-clone': {
          iconPath: `./../icons/${clonesFolder}foo-any-clone${hash}.svg`,
        },
        'foo-any-clone_light': {
          iconPath: `./../icons/${clonesFolder}foo-any-clone${lightColorFileEnding}${hash}.svg`,
        },
      },
      folderNames: {
        'bar.angular': 'folder-foo-angular-clone',
        'bar.any': 'folder-foo-any-clone',
      },
      folderNamesExpanded: {
        'bar.angular': `folder-foo-angular-clone${openedFolder}`,
        'bar.any': `folder-foo-any-clone${openedFolder}`,
      },
      fileExtensions: {
        'baz.angular': 'foo-angular-clone',
        'baz.any': 'foo-any-clone',
      },
      fileNames: {
        'bar.foo.angular': 'foo-angular-clone',
        'bar.foo.any': 'foo-any-clone',
        'foo.bar': 'foo',
      },
      file: 'file',
      languageIds: {
        json: 'foo',
        'json.angular': 'foo-angular-clone',
        'json.any': 'foo-any-clone',
      },
      light: {
        fileExtensions: {
          'baz.angular': `foo-angular-clone${lightColorFileEnding}`,
          'baz.any': `foo-any-clone${lightColorFileEnding}`,
        },
        fileNames: {
          'bar.foo.angular': `foo-angular-clone${lightColorFileEnding}`,
          'bar.foo.any': `foo-any-clone${lightColorFileEnding}`,
        },
        folderNames: {
          'bar.angular': `folder-foo-angular-clone${lightColorFileEnding}`,
          'bar.any': `folder-foo-any-clone${lightColorFileEnding}`,
        },
        folderNamesExpanded: {
          'bar.angular': `folder-foo-angular-clone${openedFolder}${lightColorFileEnding}`,
          'bar.any': `folder-foo-any-clone${openedFolder}${lightColorFileEnding}`,
        },
        languageIds: {
          'json.angular': 'foo-angular-clone_light',
          'json.any': 'foo-any-clone_light',
        },
      },
      highContrast: { fileExtensions: {}, fileNames: {} },
    });

    expect(result).toStrictEqual(expected);
  });
});
