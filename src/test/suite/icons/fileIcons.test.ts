import * as assert from 'assert';
import { getDefaultIconOptions, getFileIconDefinitions } from '../../../icons/index';
import { FileIcons, IconConfiguration, IconPack } from '../../../models/index';

suite('file icons', () => {
    test('should configure icon definitions', () => {
        const fileIcons: FileIcons = {
            defaultIcon: { name: 'file' },
            icons: [
                { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], enabledFor: [IconPack.Angular, IconPack.Ngrx] },
                { name: 'javascript', fileNames: ['filename.js'], fileExtensions: ['js'] }
            ]
        };
        const iconConfig = new IconConfiguration();
        const options = getDefaultIconOptions();
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../icons/file.svg'
            },
            'javascript': {
                'iconPath': './../icons/javascript.svg'
            },
            'angular': {
                'iconPath': './../icons/angular.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript'
        };
        value.fileNames = {
            '.angular-cli.json': 'angular',
            'angular-cli.json': 'angular',
            'filename.js': 'javascript'
        };

        assert.deepEqual(def, value);
    });

    test('should disable icon packs', () => {
        const fileIcons: FileIcons = {
            defaultIcon: { name: 'file' },
            icons: [
                { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], enabledFor: [IconPack.Ngrx] },
                { name: 'javascript', fileNames: ['filename.js'], fileExtensions: ['js'] }
            ]
        };
        const iconConfig = new IconConfiguration();
        const options = getDefaultIconOptions();
        options.activeIconPack = '';
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../icons/file.svg'
            },
            'javascript': {
                'iconPath': './../icons/javascript.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript'
        };
        value.fileNames = {
            'filename.js': 'javascript'
        };

        assert.deepEqual(def, value);
    });

    test('should configure custom icon associations', () => {
        const fileIcons: FileIcons = {
            defaultIcon: { name: 'file' },
            icons: [
                { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'] },
                { name: 'javascript', fileNames: ['filename.js'], fileExtensions: ['js'] }
            ]
        };
        const iconConfig = new IconConfiguration();
        const options = getDefaultIconOptions();
        options.files.associations = {
            '*.sample.ts': 'angular',
            'sample.js': 'javascript'
        };
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../icons/file.svg'
            },
            'javascript': {
                'iconPath': './../icons/javascript.svg'
            },
            'angular': {
                'iconPath': './../icons/angular.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript',
            'sample.ts': 'angular'
        };
        value.fileNames = {
            '.angular-cli.json': 'angular',
            'angular-cli.json': 'angular',
            'sample.js': 'javascript',
            'filename.js': 'javascript'
        };

        assert.deepEqual(def, value);
    });

    test('should configure language icons for light and high contrast', () => {
        const fileIcons: FileIcons = {
            defaultIcon: { name: 'file', light: true, highContrast: true },
            icons: [
                { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], enabledFor: [IconPack.Angular, IconPack.Ngrx] },
                { name: 'javascript', fileNames: ['filename.js'], fileExtensions: ['js'], light: true, highContrast: true }
            ]
        };
        const iconConfig = new IconConfiguration();
        const options = getDefaultIconOptions();
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../icons/file.svg'
            },
            'file_light': {
                'iconPath': './../icons/file_light.svg'
            },
            'file_highContrast': {
                'iconPath': './../icons/file_highContrast.svg'
            },
            'javascript': {
                'iconPath': './../icons/javascript.svg'
            },
            'javascript_light': {
                'iconPath': './../icons/javascript_light.svg'
            },
            'javascript_highContrast': {
                'iconPath': './../icons/javascript_highContrast.svg'
            },
            'angular': {
                'iconPath': './../icons/angular.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript'
        };
        value.light = {
            'file': 'file_light',
            'fileExtensions': {
                'js': 'javascript_light'
            },
            'fileNames': {
                'filename.js': 'javascript_light'
            }
        };
        value.highContrast = {
            'file': 'file_highContrast',
            'fileExtensions': {
                'js': 'javascript_highContrast'
            },
            'fileNames': {
                'filename.js': 'javascript_highContrast'
            }
        };
        value.fileNames = {
            '.angular-cli.json': 'angular',
            'angular-cli.json': 'angular',
            'filename.js': 'javascript'
        };

        assert.deepEqual(def, value);
    });
});
