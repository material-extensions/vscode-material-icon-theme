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
            { name: 'folder-javascript', folderNames: ['js', 'javascript', 'javascripts'] },
            { name: 'folder-font', folderNames: ['font', 'fonts'] },
            { name: 'folder-bower', folderNames: ['bower_components'] },
            {
                name: 'folder-test',
                folderNames: [
                    'test',
                    'tests',
                    'testing',
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
            { name: 'folder-docs', folderNames: ['doc', 'docs', 'documents', 'documentation'] },
            {
                name: 'folder-git',
                folderNames: ['.git', 'submodules', '.submodules']
            },
            { name: 'folder-github', folderNames: ['.github'] },
            { name: 'folder-gitlab', folderNames: ['.gitlab'] },
            { name: 'folder-vscode', folderNames: ['.vscode', '.vscode-test'] },
            {
                name: 'folder-views',
                folderNames: ['view', 'views', 'screen', 'screens', 'page', 'pages', 'html']
            },
            { name: 'folder-vue', folderNames: ['vue'] },
            { name: 'folder-expo', folderNames: ['.expo'] },
            { name: 'folder-config', folderNames: ['config', 'configs', 'configuration', 'configurations', 'settings', 'META-INF'] },
            {
                name: 'folder-i18n',
                folderNames: ['i18n', 'internationalization', 'lang', 'language', 'languages', 'locale', 'locales', 'localization', 'translation', 'translations']
            },
            { name: 'folder-components', folderNames: ['components'] },
            { name: 'folder-aurelia', folderNames: ['aurelia_project'] },
            {
                name: 'folder-resource',
                folderNames: ['resource', 'resources', 'res', 'asset', 'assets', 'static']
            },
            { name: 'folder-lib', folderNames: ['lib', 'libs', 'library', 'libraries'] },
            { name: 'folder-tools', folderNames: ['tools'] },
            { name: 'folder-webpack', folderNames: ['webpack'] },
            { name: 'folder-global', folderNames: ['global'] },
            { name: 'folder-public', folderNames: ['public', 'wwwroot'] },
            { name: 'folder-include', folderNames: ['include', 'includes'] },
            { name: 'folder-docker', folderNames: ['docker', '.docker'] },
            { name: 'folder-ngrx-effects', folderNames: ['effects'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-state', folderNames: ['states', 'state'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-actions', folderNames: ['actions'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-ngrx-entities', folderNames: ['entities'], enabledFor: [IconPack.Ngrx] },
            { name: 'folder-redux-reducer', folderNames: ['reducers', 'reducer'], enabledFor: [IconPack.Redux] },
            { name: 'folder-redux-actions', folderNames: ['actions'], enabledFor: [IconPack.Redux] },
            { name: 'folder-redux-store', folderNames: ['store'], enabledFor: [IconPack.Redux] },
            { name: 'folder-react-components', folderNames: ['components'], enabledFor: [IconPack.React, IconPack.Redux] },
            { name: 'folder-database', folderNames: ['db', 'database', 'sql'] },
            { name: 'folder-log', folderNames: ['log', 'logs'] },
            { name: 'folder-temp', folderNames: ['temp', '.temp', 'tmp', '.tmp', 'cached', 'cache', '.cache'] },
            { name: 'folder-aws', folderNames: ['aws', '.aws'] },
            { name: 'folder-audio', folderNames: ['audio', 'audios', 'music'] },
            { name: 'folder-video', folderNames: ['video', 'videos', 'movie', 'movies'] },
            { name: 'folder-kubernetes', folderNames: ['kubernetes', 'k8s'] },
            { name: 'folder-import', folderNames: ['import', 'imports', 'imported'] },
            { name: 'folder-export', folderNames: ['export', 'exports', 'exported'] },
            { name: 'folder-wakatime', folderNames: ['wakatime'] },
            { name: 'folder-circleci', folderNames: ['.circleci'] },
            { name: 'folder-wordpress', folderNames: ['wp-content'] },
            { name: 'folder-gradle', folderNames: ['gradle', '.gradle'] },
            { name: 'folder-coverage', folderNames: ['coverage', '.nyc-output'] },
            { name: 'folder-class', folderNames: ['class', 'classes', 'model', 'models'] },
            { name: 'folder-other', folderNames: ['other', 'others', 'misc', 'miscellaneous'] },
            { name: 'folder-typescript', folderNames: ['typescript', 'ts'] },
            { name: 'folder-routes', folderNames: ['routes'] },
            { name: 'folder-ci', folderNames: ['.ci', 'ci'] },
            { name: 'folder-benchmark', folderNames: ['benchmark', 'benchmarks', 'performance', 'measure', 'measures', 'measurement'] },
            { name: 'folder-messages', folderNames: ['messages', 'forum', 'chat', 'chats', 'conversation', 'conversations'] },
            { name: 'folder-less', folderNames: ['less'] },
            { name: 'folder-python', folderNames: ['python', '__pycache__'] },
            { name: 'folder-debug', folderNames: ['debug', 'debugging'] },
            { name: 'folder-fastlane', folderNames: ['fastlane'] },
            { name: 'folder-plugin', folderNames: ['plugin', 'plugins', 'extension', 'extensions', 'addon', 'addons'] },
            { name: 'folder-controller', folderNames: ['controller', 'controllers', 'service', 'services'] },
            { name: 'folder-ansible', folderNames: ['ansible'] },
        ]
    },
    { name: 'classic', defaultIcon: { name: 'folder' }, rootFolder: { name: 'folder-root' } },
    { name: 'none', defaultIcon: { name: '' } },
];
