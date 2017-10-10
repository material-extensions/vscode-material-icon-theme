import { FolderIcons, FolderType, IconGroup } from '../models/index';

/**
 * Defines folder icons
 */
export const folderIcons: FolderIcons = {
    defaultIcon: 'folder',
    rootFolder: 'folder',
    icons: [
        { name: 'folder-src', folderNames: ['src', 'source', 'sources'] },
        { name: 'folder-dist', folderNames: ['dist', 'out', 'build'] },
        {
            name: 'folder-css',
            folderNames: ['css', 'stylesheet', 'stylesheets', 'style', 'styles']
        },
        { name: 'folder-sass', folderNames: ['sass', 'scss'] },
        {
            name: 'folder-images',
            folderNames: ['images', 'image', 'img', 'icons', 'icon', 'ico']
        },
        { name: 'folder-scripts', folderNames: ['script', 'scripts'] },
        { name: 'folder-node', folderNames: ['node_modules'] },
        { name: 'folder-js', folderNames: ['js', 'javascripts'] },
        { name: 'folder-font', folderNames: ['font', 'fonts'] },
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
        { name: 'folder-docs', folderNames: ['doc', 'docs'] },
        {
            name: 'folder-git',
            folderNames: ['.github', '.git', 'submodules', '.submodules']
        },
        { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
        {
            name: 'folder-views',
            folderNames: ['view', 'views', 'screen', 'screens']
        },
        { name: 'folder-vue', folderNames: ['vue'] },
        { name: 'folder-expo', folderNames: ['.expo'] },
        { name: 'folder-config', folderNames: ['config'] },
        { name: 'folder-i18n', folderNames: ['i18n', 'locale', 'locales'] },
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
        { name: 'folder-docker', folderNames: ['docker', '.docker'] }
    ],
    themes: [
        { name: FolderType.Classic, defaultIcon: 'folder' },
        { name: FolderType.Blue, defaultIcon: 'folder-blue' },
        { name: FolderType.None, defaultIcon: '' },
    ]
};
