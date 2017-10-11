import * as assert from 'assert';
import { IconConfiguration, FolderIcons, FolderType, IconJsonOptions, IconGroup } from '../../src/models/index';
import { getFolderIconDefinitions, getDefaultIconOptions } from '../../src/icons/index';
import * as merge from 'lodash.merge';

suite('folder icons', () => {
    const folderIcons: FolderIcons = {
        defaultIcon: 'folder',
        rootFolder: 'folder',
        icons: [
            { name: 'folder-src', folderNames: ['src', 'source'] },
            { name: 'folder-angular', folderNames: ['angular', 'ng'], group: IconGroup.Angular }
        ],
        themes: [
            { name: FolderType.Blue, defaultIcon: 'folder-blue' },
            { name: FolderType.Classic, defaultIcon: 'folder' },
            { name: FolderType.None, defaultIcon: '' },
        ]
    };
    const iconConfig = new IconConfiguration();

    test('should configure icon definitions', () => {
        const options = getDefaultIconOptions();
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-angular': {
                'iconPath': './../../icons/folder-angular.svg'
            },
            'folder-angular-open': {
                'iconPath': './../../icons/folder-angular-open.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder';
        value.rootFolderExpanded = 'folder-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'angular': 'folder-angular',
            'ng': 'folder-angular'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'angular': 'folder-angular-open',
            'ng': 'folder-angular-open'
        };

        assert.deepEqual(def, value);
    });

    test('should deactivate folder icons', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.None;
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {};
        value.folderNames = {};
        value.folderNamesExpanded = {};

        assert.deepEqual(def, value);
    });

    test('should enable folder theme', () => {
        const folderIconsWithFolderThemeIcons: FolderIcons = merge({}, folderIcons);
        folderIconsWithFolderThemeIcons.themes = [
            {
                name: FolderType.Blue, defaultIcon: 'folder-blue',
                icons: [
                    { name: 'folder-blue-src', folderNames: ['src', 'source'] },
                ]
            },
            { name: FolderType.Classic, defaultIcon: 'folder' },
            { name: FolderType.None, defaultIcon: '' },
        ];
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.Blue;
        const def = getFolderIconDefinitions(folderIconsWithFolderThemeIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'folder-blue': {
                'iconPath': './../../icons/folder-blue.svg'
            },
            'folder-blue-open': {
                'iconPath': './../../icons/folder-blue-open.svg'
            },
            'folder-blue-src': {
                'iconPath': './../../icons/folder-blue-src.svg'
            },
            'folder-blue-src-open': {
                'iconPath': './../../icons/folder-blue-src-open.svg'
            }
        };
        value.folder = 'folder-blue';
        value.folderExpanded = 'folder-blue-open';
        value.rootFolder = 'folder-blue';
        value.rootFolderExpanded = 'folder-blue-open';

        value.folderNames = {
            'src': 'folder-blue-src',
            'source': 'folder-blue-src'
        };
        value.folderNamesExpanded = {
            'src': 'folder-blue-src-open',
            'source': 'folder-blue-src-open'
        };

        assert.deepEqual(def, value);
    });

    test('should enable folder theme and use default icons', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.Blue;
        const folderIconsUpdated = merge({}, folderIcons);
        const theme = folderIconsUpdated.themes.find(theme => theme.name === FolderType.Blue);
        theme.useDefaultIcons = true;
        const def = getFolderIconDefinitions(folderIconsUpdated, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'folder-blue': {
                'iconPath': './../../icons/folder-blue.svg'
            },
            'folder-blue-open': {
                'iconPath': './../../icons/folder-blue-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-angular': {
                'iconPath': './../../icons/folder-angular.svg'
            },
            'folder-angular-open': {
                'iconPath': './../../icons/folder-angular-open.svg'
            }
        };
        value.folder = 'folder-blue';
        value.folderExpanded = 'folder-blue-open';
        value.rootFolder = 'folder-blue';
        value.rootFolderExpanded = 'folder-blue-open';

        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'angular': 'folder-angular',
            'ng': 'folder-angular'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'angular': 'folder-angular-open',
            'ng': 'folder-angular-open'
        };

        assert.deepEqual(def, value);
    });

    test('should disable icon group', () => {
        const options = getDefaultIconOptions();
        options.activatedGroups[IconGroup.Angular] = false;
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder';
        value.rootFolderExpanded = 'folder-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open'
        };

        assert.deepEqual(def, value);
    });
});
