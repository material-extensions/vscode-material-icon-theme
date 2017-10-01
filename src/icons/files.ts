import { FileIcons, IconGroup } from '../models/index';

/**
 * Defines file icons
 */
export const fileIcons: FileIcons = {
    defaultIcon: { name: 'file' },
    icons: [
        { name: 'angular', fileNames: ['.angular-cli.json', 'angular-cli.json'], light: true },
        { name: 'javascript', fileExtensions: ['js'] },
        { name: 'angular.component', fileExtensions: ['component.ts', 'component.js'], group: IconGroup.Angular },
        { name: 'angular.routing', fileExtensions: ['routing.ts', 'routing.js'], group: IconGroup.Angular },
        { name: 'stylelint', fileNames: ['.stylelintrc', 'stylelint.config.js', '.stylelintrc.json', '.stylelintrc.yaml', '.stylelintrc.yml', '.stylelintrc.js', '.stylelintignore'], light: true }
    ]
};
