import { beforeAll, describe, expect, it, mock } from 'bun:test';
import merge from 'lodash.merge';
import { type INode, parseSync } from 'svgson';
import { getFileConfigHash } from '../../helpers/fileConfig';
import {
  clonesFolder,
  iconFolderPath,
  lightColorFileEnding,
  openedFolder,
} from '../../icons';
import { customClonesIcons } from '../../icons/generator/clones/clonesGenerator';
import {
  Type,
  Variant,
  getCloneData,
  resolvePath,
} from '../../icons/generator/clones/utils/cloneData';
import {
  cloneIcon,
  getStyle,
  traverse,
} from '../../icons/generator/clones/utils/cloning';
import {
  isValidColor,
  orderDarkToLight,
} from '../../icons/generator/clones/utils/color/colors';
import {
  closerMaterialColorTo,
  materialPalette as palette,
} from '../../icons/generator/clones/utils/color/materialPalette';
import {
  type FileIconClone,
  type FolderIconClone,
  IconConfiguration,
  type IconJsonOptions,
} from '../../models';
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
    let config: Partial<IconConfiguration>;

    beforeAll(() => {
      config = {
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
      };
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(config.iconDefinitions!.base.iconPath),
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(config.iconDefinitions!.base2.iconPath),
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
              path: resolvePath(config.iconDefinitions!.base2_light!.iconPath),
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(config.iconDefinitions!.base.iconPath),
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
              path: resolvePath(config.iconDefinitions!.base.iconPath),
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                config.iconDefinitions!['folder-base'].iconPath
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
                config.iconDefinitions!['folder-base-open'].iconPath
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                config.iconDefinitions!['folder-base2'].iconPath
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
                config.iconDefinitions!['folder-base2-open'].iconPath
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
                config.iconDefinitions!['folder-base2_light']!.iconPath
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
                config.iconDefinitions!['folder-base2-open_light']!.iconPath
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

        const result = getCloneData(cloneOpts, config, subFolder, hash, ext);

        const expected = [
          {
            base: {
              path: resolvePath(
                config.iconDefinitions!['folder-base'].iconPath
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
                config.iconDefinitions!['folder-base-open'].iconPath
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
                config.iconDefinitions!['folder-base'].iconPath
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
                config.iconDefinitions!['folder-base-open'].iconPath
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

    it('should replace the color with the given color', () => {
      mock.module('fs', () => {
        return {
          readFileSync: () => icon.file,
        };
      });

      // mock the fs.readFileSync method to return the desired icon file
      const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(parseSync(result), (color, loc) => {
        expect(color).toBe(palette['blue-600']);
        expect(loc).toBe('style:fill');
      });

      expect(colorCount).toBe(1);
    });

    it('should replace the color with the given color if color is in fill attribute', () => {
      // mock the fs.readFileSync method to return the desired icon file
      mock.module('fs', () => {
        return {
          readFileSync: () => icon.fileFill,
        };
      });
      const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(parseSync(result), (color, loc) => {
        expect(color).toBe(palette['blue-600']);
        expect(loc).toBe('attr:fill');
      });

      expect(colorCount).toBe(1);
    });

    it('should replace the color with the given color if color is in stop-color attribute', () => {
      mock.module('fs', () => {
        return {
          readFileSync: () => icon.gradient,
        };
      });
      const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colorCount = forEachColor(parseSync(result), (color, loc) => {
        expect(bluePalette).toContain(color);
        expect(loc).toBe('attr:stop-color');
      });

      expect(colorCount).toBe(3);
    });

    it('should replace colors on icons with multiple nodes', () => {
      mock.module('fs', () => {
        return {
          readFileSync: () => icon.folder,
        };
      });
      const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

      const colors: string[] = [];
      const colorCount = forEachColor(parseSync(result), (color, loc) => {
        colors.push(color);
        expect(bluePalette).toContain(color);
        expect(loc).toBe('style:fill');
      });

      // check that one of the colors is actually blue-600
      expect(colors.includes(palette['blue-600'])).toBeTruthy();

      expect(colorCount).toBe(2);
    });

    describe('`data-mit-no-recolor` attribute', () => {
      it('should not replace the color if the node has the `data-mit-no-recolor` attribute', () => {
        mock.module('fs', () => {
          return {
            readFileSync: () => icon.folderIgnores,
          };
        });

        const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');
        const parsed = parseSync(result);
        const changedNodeStyle = getStyle(parsed.children[0]);
        const unchangedNodeStyle = getStyle(parsed.children[1]);

        expect(changedNodeStyle.fill).toBe(palette['blue-600']);
        expect(unchangedNodeStyle.fill).toBe('red');
      });

      it('should not replace the color of any child of a node with the `data-mit-no-recolor` attribute', () => {
        mock.module('fs', () => {
          return {
            readFileSync: () => icon.gradientIgnore,
          };
        });
        const result = cloneIcon('fake/path/to/icon.svg', 'blue-600', '');

        const colorCount = forEachColor(parseSync(result), (color, loc) => {
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
function forEachColor(
  node: INode,
  callback: (color: string, loc?: string) => void
) {
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
}

describe('cloning: json config generation from user options', () => {
  beforeAll(() => {
    mock.module('fs', () => {
      return {
        readFileSync: () => icon.file,
        writeFileSync: () => {},
      };
    });
  });

  const getDefinition = (hash: string, options: IconJsonOptions) => {
    return {
      iconDefinitions: {
        foo: { iconPath: `./../icons/foo${hash}.svg` },
        file: { iconPath: `./../icons/file${hash}.svg` },
        'folder-foo': { iconPath: `./../icons/folder${hash}.svg` },
        'folder-foo-open': { iconPath: `./../icons/folder-open${hash}.svg` },
      },
      fileNames: { 'foo.bar': 'foo' },
      options,
      file: 'file',
    };
  };

  it('should generate the json config from the user options', () => {
    const options: IconJsonOptions = {
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
    };
    const hash = getFileConfigHash(options);
    const result = customClonesIcons(getDefinition(hash, options), options);

    const expected = merge(new IconConfiguration(), {
      iconDefinitions: {
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
      fileNames: { 'bar.foo': 'foo-clone' },
      languageIds: {},
      light: {
        fileExtensions: { baz: `foo-clone${lightColorFileEnding}` },
        fileNames: { 'bar.foo': `foo-clone${lightColorFileEnding}` },
        folderNames: { bar: `folder-foo-clone${lightColorFileEnding}` },
        folderNamesExpanded: {
          bar: `folder-foo-clone${openedFolder}${lightColorFileEnding}`,
        },
      },
      highContrast: { fileExtensions: {}, fileNames: {} },
      options: {},
    });

    expect(result).toStrictEqual(expected);
  });
});
