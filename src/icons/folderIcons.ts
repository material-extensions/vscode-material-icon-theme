import { FolderTheme, IconPack } from '../models/index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderTheme[] = [
    {
        name: 'specific',
        defaultIcon: { name: 'folder' },
        rootFolder: { name: 'folder-root' },
        icons: [
            { name: 'folder-src', folderNames: ['src', 'source', 'sources'] },
            { name: 'folder-dist', folderNames: ['dist', 'out', 'build', 'release'] },
            {
                name: 'folder-css',
                folderNames: ['css', 'stylesheet', 'stylesheets', 'style', 'styles']
            },
            { name: 'folder-sass', folderNames: ['sass', 'scss'] },
            {
                name: 'folder-images',
                folderNames: ['images', 'image', 'img', 'icons', 'icon', 'ico', 'screenshot', 'screenshots']
            },
            { name: 'folder-scripts', folderNames: ['script', 'scripts'] },
            { name: 'folder-node', folderNames: ['node_modules'] },
            { name: 'folder-javascript', folderNames: ['js', 'javascripts'] },
            { name: 'folder-font', folderNames: ['font', 'fonts'] },
            { name: 'folder-bower', folderNames: ['bower_components'] },
            {
                name: 'folder-test',
                folderNames: [
                    'test',
                    'tests',
                    '__tests__',
                    '__snapshots__',
                    '__mocks__',
                    '__test__',
                    'spec',
                    'specs'
                ]
            },
            {
                name: 'folder-jinja',
                folderNames: [
                    'jinja',
                    'jinja2',
                    'j2'
                ],
                light: true
            },
            { name: 'folder-markdown', folderNames: ['markdown', 'md'] },
            { name: 'folder-php', folderNames: ['php'] },
            { name: 'folder-phpmailer', folderNames: ['phpmailer'] },
            { name: 'folder-sublime', folderNames: ['sublime'] },
            { name: 'folder-docs', folderNames: ['doc', 'docs'] },
            {
                name: 'folder-git',
                folderNames: ['.git', 'submodules', '.submodules']
            },
            { name: 'folder-github', folderNames: ['.github'] },
            { name: 'folder-gitlab', folderNames: ['.gitlab'] },
            { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
            {
                name: 'folder-views',
                folderNames: ['view', 'views', 'screen', 'screens']
            },
            { name: 'folder-vue', folderNames: ['vue'] },
            { name: 'folder-expo', folderNames: ['.expo'] },
            { name: 'folder-config', folderNames: ['config'] },
            { name: 'folder-i18n', folderNames: ['i18n', 'lang', 'locale', 'locales'] },
            { name: 'folder-components', folderNames: ['components'] },
            { name: 'folder-aurelia', folderNames: ['aurelia_project'] },
            {
                name: 'folder-resource',
                folderNames: ['resource', 'resources', 'res', 'asset', 'assets', 'static']
            },
            { name: 'folder-lib', folderNames: ['lib'] },
            { name: 'folder-tools', folderNames: ['tools'] },
            { name: 'folder-webpack', folderNames: ['webpack'] },
            { name: 'folder-global', folderNames: ['global'] },
            { name: 'folder-public', folderNames: ['public'] },
            { name: 'folder-include', folderNames: ['include'] },
            { name: 'folder-docker', folderNames: ['docker', '.docker'] },
            { name: 'folder-ngrx-effects', folderNames: ['effects'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-state', folderNames: ['states', 'state'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-actions', folderNames: ['actions'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-redux-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [IconPack.Redux] },
            { name: 'folder-redux-actions', folderNames: ['actions'], enabledFor: [IconPack.Redux] },
            { name: 'folder-redux-store', folderNames: ['store'], enabledFor: [IconPack.Redux] },
            { name: 'folder-react-components', folderNames: ['components'], enabledFor: [IconPack.React, IconPack.Redux] },
            { name: 'folder-database', folderNames: ['db', 'database', 'sql'] },
            { name: 'folder-log', folderNames: ['log', 'logs'] },
            { name: 'folder-temp', folderNames: ['temp', '.temp', 'tmp', '.tmp', 'cached', 'cache'] },
        ]
    },
    { name: 'classic', defaultIcon: { name: 'folder' }, rootFolder: { name: 'folder-root' } },
    { name: 'none', defaultIcon: { name: '' } },
];
