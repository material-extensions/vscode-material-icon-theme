import {
  lightColorFileEnding,
  openedFolder,
  iconFolderPath,
} from '../../../icons/generator/constants';
import {
  getCloneData,
  resolvePath,
  Type,
  Variant,
} from '../../../icons/generator/clones/utils/cloneData';
import { IconConfiguration } from '../../../models';
import {
  FileIconClone,
  FolderIconClone,
} from '../../../models/icons/iconJsonOptions';
import { deepStrictEqual } from 'assert';

describe('cloning: icon cloning', () => {
  describe('#getCloneData(..)', () => {
    const subFolder = 'sub/';
    const hash = '~-fakehash123456789';
    const ext = '.ext';
    let config: Partial<IconConfiguration>;

    before(() => {
      config = {
        iconDefinitions: {
          base: {
            iconPath: 'icons/icon.svg',
          },
          base2: {
            iconPath: 'icons/icon2.svg',
          },
          // eslint-disable-next-line camelcase
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

        deepStrictEqual(result, expected);
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

        deepStrictEqual(result, expected);
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

        deepStrictEqual(result, expected);
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

        deepStrictEqual(result, expected);
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

        deepStrictEqual(result, expected);
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

        deepStrictEqual(result, expected);
      });
    });
  });
});
