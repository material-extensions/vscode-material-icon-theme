import * as assert from 'assert';
import { IconConfiguration, IconJsonOptions, FileIcons, IconGroup } from '../../src/models/index';
import { getDefaultIconOptions, getFileIconDefinitions } from '../../src/icons/index';
import * as merge from 'lodash.merge';

suite('file icons', () => {
    const fileIcons: FileIcons = {
        defaultIcon: { name: 'file' },
        icons: [
            { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], group: IconGroup.Angular },
            { name: 'javascript', fileNames: ['filename.js'], fileExtensions: ['js'], light: true, highContrast: true }
        ]
    };
    const iconConfig = new IconConfiguration();

    test('should configure icon definitions', () => {
        const options = getDefaultIconOptions();
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../../icons/file.svg'
            },
            'javascript': {
                'iconPath': './../../icons/javascript.svg'
            },
            'javascript_light': {
                'iconPath': './../../icons/javascript_light.svg'
            },
            'javascript_highContrast': {
                'iconPath': './../../icons/javascript_highContrast.svg'
            },
            'angular': {
                'iconPath': './../../icons/angular.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript'
        };
        value.light = {
            'fileExtensions': {
                'js': 'javascript_light'
            },
            'fileNames': {
                'filename.js': 'javascript_light'
            }
        };
        value.highContrast = {
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

    test('should disable icon groups', () => {
        const options = getDefaultIconOptions();
        options.activatedGroups = [];
        const def = getFileIconDefinitions(fileIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'file': {
                'iconPath': './../../icons/file.svg'
            },
            'javascript': {
                'iconPath': './../../icons/javascript.svg'
            },
            'javascript_light': {
                'iconPath': './../../icons/javascript_light.svg'
            },
            'javascript_highContrast': {
                'iconPath': './../../icons/javascript_highContrast.svg'
            }
        };
        value.file = 'file';
        value.fileExtensions = {
            'js': 'javascript'
        };
        value.light = {
            'fileExtensions': {
                'js': 'javascript_light'
            },
            'fileNames': {
                'filename.js': 'javascript_light'
            }
        };
        value.highContrast = {
            'fileExtensions': {
                'js': 'javascript_highContrast'
            },
            'fileNames': {
                'filename.js': 'javascript_highContrast'
            }
        };
        value.fileNames = {
            'filename.js': 'javascript'
        };

        assert.deepEqual(def, value);
    });
});
