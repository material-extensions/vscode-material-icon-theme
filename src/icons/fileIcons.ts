import { FileIcons, IconPack } from '../models/index';

/**
 * Defines file icons
 */
export const fileIcons: FileIcons = {
    defaultIcon: { name: 'file' },
    icons: [
        { name: 'html', fileExtensions: ['html', 'htm', 'xhtml', 'html_vm', 'asp'] },
        { name: 'pug', fileExtensions: ['jade', 'pug'] },
        {
            name: 'markdown',
            fileExtensions: [
                'md',
                'markdown',
                'rst'
            ]
        },
        { name: 'blink', fileExtensions: ['blink'], light: true },
        { name: 'css', fileExtensions: ['css'] },
        { name: 'sass', fileExtensions: ['scss', 'sass'] },
        { name: 'less', fileExtensions: ['less'] },
        {
            name: 'json',
            fileExtensions: ['json', 'tsbuildinfo'],
            fileNames: [
                '.jscsrc',
                '.jshintrc',
                'tsconfig.json',
                'tslint.json',
                'composer.lock',
                '.jsbeautifyrc',
                '.esformatter',
                'cdp.pid',
                '.mjmlconfig',
            ]
        },
        {
            name: 'jinja',
            fileExtensions: ['jinja', 'jinja2', 'j2'],
            light: true
        },
        {
            name: 'sublime',
            fileExtensions: ['sublime-project', 'sublime-workspace']
        },
        { name: 'yaml', fileExtensions: ['yaml', 'YAML-tmLanguage', 'yml'] },
        {
            name: 'xml',
            fileExtensions: [
                'xml',
                'plist',
                'xsd',
                'dtd',
                'xsl',
                'xslt',
                'resx',
                'iml',
                'xquery',
                'tmLanguage',
                'manifest',
                'project'
            ],
            fileNames: ['.htaccess']
        },
        {
            name: 'image',
            fileExtensions: [
                'png',
                'jpeg',
                'jpg',
                'gif',
                'ico',
                'tif',
                'tiff',
                'psd',
                'psb',
                'ami',
                'apx',
                'bmp',
                'bpg',
                'brk',
                'cur',
                'dds',
                'dng',
                'exr',
                'fpx',
                'gbr',
                'img',
                'jbig2',
                'jb2',
                'jng',
                'jxr',
                'pbm',
                'pgf',
                'pic',
                'raw',
                'webp',
                'eps',
                'afphoto',
                'ase',
                'aseprite',
                'clip',
                'cpt',
                'heif',
                'heic',
                'kra',
                'mdp',
                'ora',
                'pdn',
                'reb',
                'sai',
                'tga',
                'xcf'
            ]
        },
        { name: 'javascript', fileExtensions: ['js', 'esx', 'mjs'] },
        { name: 'react', fileExtensions: ['jsx'] },
        { name: 'react_ts', fileExtensions: ['tsx'] },
        {
            name: 'routing',
            fileExtensions: ['routing.ts', 'routing.tsx', 'routing.js', 'routing.jsx', 'routes.ts', 'routes.tsx', 'routes.js', 'routes.jsx'],
            fileNames: ['router.js', 'router.jsx', 'router.ts', 'router.tsx', 'routes.js', 'routes.jsx', 'routes.ts', 'routes.tsx'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx, IconPack.React, IconPack.Redux, IconPack.Vue, IconPack.Vuex]
        },
        {
            name: 'redux-action',
            fileExtensions: ['action.js', 'actions.js', 'action.ts', 'actions.ts'],
            fileNames: ['action.js', 'actions.js', 'action.ts', 'actions.ts'],
            enabledFor: [IconPack.Redux]
        },
        {
            name: 'redux-reducer',
            fileExtensions: ['reducer.js', 'reducers.js', 'reducer.ts', 'reducers.ts'],
            fileNames: ['reducer.js', 'reducers.js', 'reducer.ts', 'reducers.ts'],
            enabledFor: [IconPack.Redux]
        },
        {
            name: 'redux-store',
            fileExtensions: ['store.js', 'store.ts'],
            fileNames: ['store.js', 'store.ts'],
            enabledFor: [IconPack.Redux]
        },
        {
            name: 'settings',
            fileExtensions: [
                'ini',
                'dlc',
                'dll',
                'config',
                'conf',
                'properties',
                'prop',
                'settings',
                'option',
                'props',
                'toml',
                'prefs',
                'sln.dotsettings',
                'sln.dotsettings.user',
                'cfg'
            ],
            fileNames: [
                '.jshintignore',
                '.buildignore',
                '.mrconfig',
                '.yardopts',
                'manifest.mf',
                '.clang-format',
                '.clang-tidy'
            ]
        },
        { name: 'typescript', fileExtensions: ['ts'] },
        { name: 'typescript-def', fileExtensions: ['d.ts'] },
        { name: 'markojs', fileExtensions: ['marko'] },
        { name: 'pdf', fileExtensions: ['pdf'] },
        { name: 'table', fileExtensions: ['xlsx', 'xls', 'csv', 'tsv'] },
        {
            name: 'vscode',
            fileExtensions: ['vscodeignore', 'vsixmanifest', 'vsix', 'code-workplace']
        },
        {
            name: 'visualstudio',
            fileExtensions: [
                'csproj',
                'ruleset',
                'sln',
                'suo',
                'vb',
                'vbs',
                'vcxitems',
                'vcxitems.filters',
                'vcxproj',
                'vcxproj.filters'
            ]
        },
        {
            name: 'database',
            fileExtensions: ['pdb', 'sql', 'pks', 'pkb', 'accdb', 'mdb', 'sqlite', 'pgsql', 'postgres', 'psql']
        },
        { name: 'csharp', fileExtensions: ['cs', 'csx'] },
        {
            name: 'zip',
            fileExtensions: [
                'zip',
                'tar',
                'gz',
                'xz',
                'br',
                'bzip2',
                'gzip',
                'brotli',
                '7z',
                'rar',
                'tgz'
            ]
        },
        { name: 'exe', fileExtensions: ['exe', 'msi'] },
        { name: 'java', fileExtensions: ['java', 'jar', 'jsp'] },
        { name: 'c', fileExtensions: ['c', 'm', 'i', 'mi'] },
        { name: 'h', fileExtensions: ['h'] },
        { name: 'cpp', fileExtensions: ['cc', 'cpp', 'cxx', 'c++', 'cp', 'mm', 'mii', 'ii'] },
        { name: 'hpp', fileExtensions: ['hh', 'hpp', 'hxx', 'h++', 'hp', 'tcc', 'inl'] },
        { name: 'go', fileExtensions: ['go'] },
        { name: 'go-mod', fileNames: ['go.mod', 'go.sum'] },
        { name: 'python', fileExtensions: ['py'] },
        {
            name: 'python-misc',
            fileExtensions: ['pyc', 'whl'],
            fileNames: ['requirements.txt', 'pipfile', '.python-version', 'manifest.in']
        },
        { name: 'url', fileExtensions: ['url'] },
        {
            name: 'console',
            fileExtensions: [
                'sh',
                'ksh',
                'csh',
                'tcsh',
                'zsh',
                'bash',
                'bat',
                'cmd',
                'awk',
                'fish'
            ]
        },
        {
            name: 'powershell',
            fileExtensions: ['ps1', 'psm1', 'psd1', 'ps1xml', 'psc1', 'pssc']
        },
        {
            name: 'gradle',
            fileExtensions: ['gradle'],
            fileNames: ['gradle.properties', 'gradlew', 'gradle-wrapper.properties']
        },
        { name: 'word', fileExtensions: ['doc', 'docx', 'rtf'] },
        {
            name: 'certificate',
            fileExtensions: ['cer', 'cert', 'crt'],
            fileNames: [
                'license',
                'license.md',
                'license.txt',
                'licence',
                'licence.md',
                'licence.txt',
                'unlicense',
                'unlicense.md',
                'unlicense.txt'
            ]
        },
        {
            name: 'key',
            fileExtensions: ['pub', 'key', 'pem', 'asc', 'gpg'],
            fileNames: ['.htpasswd']
        },
        {
            name: 'font',
            fileExtensions: [
                'woff',
                'woff2',
                'ttf',
                'eot',
                'suit',
                'otf',
                'bmap',
                'fnt',
                'odttf',
                'ttc',
                'font',
                'fonts',
                'sui',
                'ntf',
                'mrf'
            ]
        },
        { name: 'lib', fileExtensions: ['lib', 'bib'] },
        { name: 'ruby', fileExtensions: ['rb', 'erb'] },
        { name: 'gemfile', fileNames: ['gemfile'] },
        { name: 'fsharp', fileExtensions: ['fs', 'fsx', 'fsi', 'fsproj'] },
        { name: 'swift', fileExtensions: ['swift'] },
        { name: 'arduino', fileExtensions: ['ino'] },
        {
            name: 'docker',
            fileExtensions: ['dockerignore', 'dockerfile'],
            fileNames: [
                'dockerfile',
                'docker-compose.yml',
                'docker-compose.yaml',
                'docker-compose.dev.yml',
                'docker-compose.local.yml',
                'docker-compose.ci.yml',
                'docker-compose.override.yml',
                'docker-compose.staging.yml',
                'docker-compose.prod.yml',
                'docker-compose.production.yml',
                'docker-compose.test.yml'
            ]
        },
        { name: 'tex', fileExtensions: ['tex', 'cls', 'sty', 'dtx', 'ltx'] },
        {
            name: 'powerpoint',
            fileExtensions: [
                'pptx',
                'ppt',
                'pptm',
                'potx',
                'potm',
                'ppsx',
                'ppsm',
                'pps',
                'ppam',
                'ppa'
            ]
        },
        {
            name: 'video',
            fileExtensions: [
                'webm',
                'mkv',
                'flv',
                'vob',
                'ogv',
                'ogg',
                'gifv',
                'avi',
                'mov',
                'qt',
                'wmv',
                'yuv',
                'rm',
                'rmvb',
                'mp4',
                'm4v',
                'mpg',
                'mp2',
                'mpeg',
                'mpe',
                'mpv',
                'm2v'
            ]
        },
        { name: 'virtual', fileExtensions: ['vdi', 'vbox', 'vbox-prev'] },
        { name: 'email', fileExtensions: ['ics'], fileNames: ['.mailmap'] },
        { name: 'audio', fileExtensions: ['mp3', 'flac', 'm4a', 'wma', 'aiff'] },
        { name: 'coffee', fileExtensions: ['coffee', 'cson', 'iced'] },
        { name: 'document', fileExtensions: ['txt'] },
        { name: 'graphql', fileExtensions: ['graphql', 'gql'], fileNames: ['.graphqlconfig'] },
        { name: 'rust', fileExtensions: ['rs'] },
        { name: 'raml', fileExtensions: ['raml'] },
        { name: 'xaml', fileExtensions: ['xaml'] },
        { name: 'haskell', fileExtensions: ['hs'] },
        { name: 'kotlin', fileExtensions: ['kt', 'kts'] },
        {
            name: 'git',
            fileExtensions: ['patch'],
            fileNames: [
                '.gitignore',
                '.gitconfig',
                '.gitattributes',
                '.gitmodules',
                '.gitkeep',
                'git-history'
            ]
        },
        { name: 'lua', fileExtensions: ['lua'], fileNames: ['.luacheckrc'] },
        { name: 'clojure', fileExtensions: ['clj', 'cljs', 'cljc'] },
        { name: 'groovy', fileExtensions: ['groovy'] },
        { name: 'r', fileExtensions: ['r', 'rmd'], fileNames: ['.Rhistory'] },
        { name: 'dart', fileExtensions: ['dart'] },
        { name: 'actionscript', fileExtensions: ['as'] },
        { name: 'mxml', fileExtensions: ['mxml'] },
        { name: 'autohotkey', fileExtensions: ['ahk'] },
        { name: 'flash', fileExtensions: ['swf'] },
        { name: 'swc', fileExtensions: ['swc'] },
        {
            name: 'cmake',
            fileExtensions: ['cmake'],
            fileNames: ['cmakelists.txt', 'cmakecache.txt']
        },
        {
            name: 'assembly',
            fileExtensions: [
                'asm',
                'a51',
                'inc',
                'nasm',
                's',
                'ms',
                'agc',
                'ags',
                'aea',
                'argus',
                'mitigus',
                'binsource'
            ]
        },
        { name: 'vue', fileExtensions: ['vue'] },
        { name: 'vue-config', fileNames: ['vue.config.js', 'vue.config.ts'] },
        { name: 'vuex-store', fileExtensions: ['store.js', 'store.ts'], fileNames: ['store.js', 'store.ts'], enabledFor: [IconPack.Vuex] },
        { name: 'nuxt', fileNames: ['nuxt.config.js', 'nuxt.config.ts'], enabledFor: [IconPack.Vuex, IconPack.Vue] },
        { name: 'ocaml', fileExtensions: ['ml', 'mli', 'cmx'] },
        { name: 'javascript-map', fileExtensions: ['js.map', 'mjs.map'] },
        { name: 'css-map', fileExtensions: ['css.map'] },
        { name: 'lock', fileExtensions: ['lock'] },
        { name: 'handlebars', fileExtensions: ['hbs', 'mustache'] },
        { name: 'perl', fileExtensions: ['pl', 'pm'] },
        { name: 'haxe', fileExtensions: ['hx'] },
        { name: 'test-ts', fileExtensions: ['spec.ts', 'e2e-spec.ts', 'test.ts', 'ts.snap'] },
        {
            name: 'test-jsx',
            fileExtensions: [
                'spec.tsx',
                'test.tsx',
                'tsx.snap',
                'spec.jsx',
                'test.jsx',
                'jsx.snap'
            ]
        },
        { name: 'test-js', fileExtensions: ['spec.js', 'e2e-spec.js', 'test.js', 'js.snap'] },
        {
            name: 'angular',
            fileExtensions: ['module.ts', 'module.js', 'ng-template'],
            fileNames: ['angular-cli.json', '.angular-cli.json', 'angular.json'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx]
        },
        {
            name: 'angular-component',
            fileExtensions: ['component.ts', 'component.js'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx]
        },
        { name: 'angular-guard', fileExtensions: ['guard.ts', 'guard.js'], enabledFor: [IconPack.Angular, IconPack.Ngrx] },
        { name: 'angular-service', fileExtensions: ['service.ts', 'service.js'], enabledFor: [IconPack.Angular, IconPack.Ngrx] },
        {
            name: 'angular-pipe',
            fileExtensions: ['pipe.ts', 'pipe.js', 'filter.js'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx]
        },
        {
            name: 'angular-directive',
            fileExtensions: ['directive.ts', 'directive.js'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx]
        },
        {
            name: 'angular-resolver',
            fileExtensions: ['resolver.ts', 'resolver.js'],
            enabledFor: [IconPack.Angular, IconPack.Ngrx]
        },
        { name: 'puppet', fileExtensions: ['pp'] },
        { name: 'elixir', fileExtensions: ['ex', 'exs', 'eex', 'leex'] },
        { name: 'livescript', fileExtensions: ['ls'] },
        { name: 'erlang', fileExtensions: ['erl'] },
        { name: 'twig', fileExtensions: ['twig'] },
        { name: 'julia', fileExtensions: ['jl'] },
        { name: 'elm', fileExtensions: ['elm'] },
        { name: 'purescript', fileExtensions: ['pure', 'purs'] },
        { name: 'smarty', fileExtensions: ['tpl'] },
        { name: 'stylus', fileExtensions: ['styl'] },
        { name: 'reason', fileExtensions: ['re', 'rei'] },
        { name: 'bucklescript', fileExtensions: ['cmj'] },
        { name: 'merlin', fileExtensions: ['merlin'] },
        { name: 'verilog', fileExtensions: ['v', 'vhd', 'sv', 'svh'] },
        { name: 'mathematica', fileExtensions: ['nb'] },
        { name: 'wolframlanguage', fileExtensions: ['wl', 'wls'] },
        { name: 'nunjucks', fileExtensions: ['njk', 'nunjucks'] },
        { name: 'robot', fileExtensions: ['robot'] },
        { name: 'solidity', fileExtensions: ['sol'] },
        { name: 'autoit', fileExtensions: ['au3'] },
        { name: 'haml', fileExtensions: ['haml'] },
        { name: 'yang', fileExtensions: ['yang'] },
        { name: 'mjml', fileExtensions: ['mjml'] },
        { name: 'now', fileNames: ['now.json', '.nowignore'], light: true },
        {
            name: 'terraform',
            fileExtensions: ['tf', 'tf.json', 'tfvars', 'tfstate']
        },
        { name: 'laravel', fileExtensions: ['blade.php', 'inky.php'] },
        { name: 'applescript', fileExtensions: ['applescript'] },
        { name: 'cake', fileExtensions: ['cake'] },
        { name: 'cucumber', fileExtensions: ['feature'] },
        { name: 'nim', fileExtensions: ['nim', 'nimble'] },
        { name: 'apiblueprint', fileExtensions: ['apib', 'apiblueprint'] },
        { name: 'riot', fileExtensions: ['riot', 'tag'] },
        { name: 'vfl', fileExtensions: ['vfl'], fileNames: ['.vfl'] },
        { name: 'kl', fileExtensions: ['kl'], fileNames: ['.kl'] },
        {
            name: 'postcss',
            fileExtensions: ['pcss', 'sss'],
            fileNames: ['postcss.config.js', '.postcssrc.js', '.postcssrc', '.postcssrc.json', '.postcssrc.yml']
        },
        { name: 'todo', fileExtensions: ['todo'] },
        { name: 'coldfusion', fileExtensions: ['cfml', 'cfc', 'lucee', 'cfm'] },
        { name: 'cabal', fileExtensions: ['cabal'] },
        { name: 'nix', fileExtensions: ['nix'] },
        { name: 'slim', fileExtensions: ['slim'] },
        { name: 'http', fileExtensions: ['http', 'rest'] },
        { name: 'restql', fileExtensions: ['rql', 'restql'] },
        { name: 'kivy', fileExtensions: ['kv'] },
        {
            name: 'graphcool',
            fileExtensions: ['graphcool'],
            fileNames: ['project.graphcool']
        },
        { name: 'sbt', fileExtensions: ['sbt'] },
        {
            name: 'webpack',
            fileNames: [
                'webpack.js',
                'webpack.ts',
                'webpack.base.js',
                'webpack.base.ts',
                'webpack.config.js',
                'webpack.config.ts',
                'webpack.common.js',
                'webpack.common.ts',
                'webpack.config.common.js',
                'webpack.config.common.ts',
                'webpack.config.common.babel.js',
                'webpack.config.common.babel.ts',
                'webpack.dev.js',
                'webpack.dev.ts',
                'webpack.config.dev.js',
                'webpack.config.dev.ts',
                'webpack.config.dev.babel.js',
                'webpack.config.dev.babel.ts',
                'webpack.prod.js',
                'webpack.prod.ts',
                'webpack.server.js',
                'webpack.server.ts',
                'webpack.client.js',
                'webpack.client.ts',
                'webpack.config.server.js',
                'webpack.config.server.ts',
                'webpack.config.client.js',
                'webpack.config.client.ts',
                'webpack.config.production.babel.js',
                'webpack.config.production.babel.ts',
                'webpack.config.prod.babel.js',
                'webpack.config.prod.babel.ts',
                'webpack.config.prod.js',
                'webpack.config.prod.ts',
                'webpack.config.production.js',
                'webpack.config.production.ts',
                'webpack.config.staging.js',
                'webpack.config.staging.ts',
                'webpack.config.babel.js',
                'webpack.config.babel.ts',
                'webpack.config.base.babel.js',
                'webpack.config.base.babel.ts',
                'webpack.config.base.js',
                'webpack.config.base.ts',
                'webpack.config.staging.babel.js',
                'webpack.config.staging.babel.ts',
                'webpack.config.coffee',
                'webpack.config.test.js',
                'webpack.config.test.ts',
                'webpack.config.vendor.js',
                'webpack.config.vendor.ts',
                'webpack.config.vendor.production.js',
                'webpack.config.vendor.production.ts',
                'webpack.test.js',
                'webpack.test.ts',
                'webpack.dist.js',
                'webpack.dist.ts',
                'webpackfile.js',
                'webpackfile.ts'
            ]
        },
        { name: 'ionic', fileNames: ['ionic.config.json', '.io-config.json'] },
        {
            name: 'gulp',
            fileNames: ['gulpfile.js', 'gulpfile.ts', 'gulpfile.babel.js']
        },
        {
            name: 'nodejs',
            fileNames: ['package.json', 'package-lock.json', '.nvmrc', '.esmrc']
        },
        { name: 'npm', fileNames: ['.npmignore', '.npmrc'] },
        {
            name: 'yarn',
            fileNames: [
                '.yarnrc',
                'yarn.lock',
                '.yarnclean',
                '.yarn-integrity',
                'yarn-error.log'
            ]
        },
        { name: 'android', fileNames: ['androidmanifest.xml'], fileExtensions: ['apk'] },
        {
            name: 'tune',
            fileExtensions: ['env'],
            fileNames: [
                '.env.example',
                '.env.local',
                '.env.dev',
                '.env.development',
                '.env.prod',
                '.env.production',
                '.env.staging',
                '.env.preview',
                '.env.test',
                '.env.testing',
                '.env.development.local',
                '.env.production.local',
                '.env.test.local',
            ]
        },
        { name: 'babel', fileNames: ['.babelrc', '.babelrc.js', 'babel.config.js'] },
        {
            name: 'contributing',
            fileNames: ['contributing.md']
        },
        { name: 'readme', fileNames: ['readme.md', 'readme.txt', 'readme'] },
        {
            name: 'changelog',
            fileNames: ['changelog', 'changelog.md', 'changelog.txt']
        },
        {
            name: 'credits',
            fileNames: ['credits', 'credits.txt', 'credits.md']
        },
        {
            name: 'authors',
            fileNames: ['authors', 'authors.md', 'authors.txt']
        },
        { name: 'flow', fileNames: ['.flowconfig'] },
        { name: 'favicon', fileNames: ['favicon.ico'] },
        {
            name: 'karma',
            fileNames: [
                'karma.conf.js',
                'karma.conf.ts',
                'karma.conf.coffee',
                'karma.config.js',
                'karma.config.ts',
                'karma-main.js',
                'karma-main.ts'
            ]
        },
        { name: 'bithound', fileNames: ['.bithoundrc'] },
        { name: 'appveyor', fileNames: ['.appveyor.yml', 'appveyor.yml'] },
        { name: 'travis', fileNames: ['.travis.yml'] },
        { name: 'codecov', fileNames: ['.codecov.yml', 'codecov.yml'] },
        {
            name: 'protractor',
            fileNames: [
                'protractor.conf.js',
                'protractor.conf.ts',
                'protractor.conf.coffee',
                'protractor.config.js',
                'protractor.config.ts'
            ]
        },
        { name: 'fusebox', fileNames: ['fuse.js'] },
        { name: 'heroku', fileNames: ['procfile', 'procfile.windows'] },
        { name: 'editorconfig', fileNames: ['.editorconfig'] },
        { name: 'gitlab', fileExtensions: ['gitlab-ci.yml'] },
        { name: 'bower', fileNames: ['.bowerrc', 'bower.json'] },
        {
            name: 'eslint',
            fileNames: [
                '.eslintrc.js',
                '.eslintrc.yaml',
                '.eslintrc.yml',
                '.eslintrc.json',
                '.eslintrc',
                '.eslintignore'
            ]
        },
        {
            name: 'conduct',
            fileNames: ['code_of_conduct.md', 'code_of_conduct.txt']
        },
        { name: 'watchman', fileNames: ['.watchmanconfig'] },
        { name: 'aurelia', fileNames: ['aurelia.json'] },
        {
            name: 'mocha',
            fileNames: [
                'mocha.opts',
                '.mocharc.yml',
                '.mocharc.yaml',
                '.mocharc.js',
                '.mocharc.json',
                '.mocharc.jsonc'
            ]
        },
        { name: 'jenkins', fileNames: ['jenkinsfile'], fileExtensions: ['jenkinsfile', 'jenkins'] },
        { name: 'firebase', fileNames: ['firebase.json', '.firebaserc'] },
        {
            name: 'rollup',
            fileNames: [
                'rollup.config.js',
                'rollup.config.ts',
                'rollup-config.js',
                'rollup-config.ts',
                'rollup.config.common.js',
                'rollup.config.common.ts',
                'rollup.config.base.js',
                'rollup.config.base.ts',
                'rollup.config.prod.js',
                'rollup.config.prod.ts',
                'rollup.config.dev.js',
                'rollup.config.dev.ts',
                'rollup.config.prod.vendor.js',
                'rollup.config.prod.vendor.ts'
            ]
        },
        { name: 'hack', fileNames: ['.hhconfig'] },
        {
            name: 'stylelint',
            fileNames: [
                '.stylelintrc',
                'stylelint.config.js',
                '.stylelintrc.json',
                '.stylelintrc.yaml',
                '.stylelintrc.yml',
                '.stylelintrc.js',
                '.stylelintignore'
            ],
            light: true
        },
        { name: 'code-climate', fileNames: ['.codeclimate.yml'], light: true },
        { name: 'prettier', fileNames: ['.prettierrc', 'prettier.config.js', '.prettierrc.js', '.prettierrc.json', '.prettierrc.yaml', '.prettierrc.yml', '.prettierignore'] },
        { name: 'nodemon', fileNames: ['nodemon.json', 'nodemon-debug.json'] },
        { name: 'ngrx-reducer', fileExtensions: ['reducer.ts', 'rootReducer.ts'], enabledFor: [IconPack.Ngrx] },
        { name: 'ngrx-state', fileExtensions: ['state.ts'], enabledFor: [IconPack.Ngrx] },
        { name: 'ngrx-actions', fileExtensions: ['actions.ts'], enabledFor: [IconPack.Ngrx] },
        { name: 'ngrx-effects', fileExtensions: ['effects.ts'], enabledFor: [IconPack.Ngrx] },
        { name: 'ngrx-entity', fileNames: ['.entity'], enabledFor: [IconPack.Ngrx] },
        { name: 'webhint', fileNames: ['.hintrc'] },
        { name: 'browserlist', fileNames: ['browserslist', '.browserslistrc'], light: true },
        { name: 'crystal', fileExtensions: ['cr', 'ecr'], light: true },
        { name: 'snyk', fileNames: ['.snyk'] },
        { name: 'drone', fileExtensions: ['drone.yml'], fileNames: ['.drone.yml'], light: true },
        { name: 'cuda', fileExtensions: ['cu', 'cuh'] },
        { name: 'log', fileExtensions: ['log'] },
        { name: 'dotjs', fileExtensions: ['def', 'dot', 'jst'] },
        { name: 'ejs', fileExtensions: ['ejs'] },
        { name: 'sequelize', fileNames: ['.sequelizerc'] },
        { name: 'gatsby', fileNames: ['gatsby.config.js', 'gatsby-config.js', 'gatsby-node.js', 'gatsby-browser.js', 'gatsby-ssr.js'] },
        { name: 'wakatime', fileNames: ['.wakatime-project'], fileExtensions: ['.wakatime-project'], light: true },
        { name: 'circleci', fileNames: ['circle.yml'], light: true },
        { name: 'cloudfoundry', fileNames: ['.cfignore'] },
        {
            name: 'grunt',
            fileNames: [
                'gruntfile.js',
                'gruntfile.ts',
                'gruntfile.coffee',
                'gruntfile.babel.js',
                'gruntfile.babel.ts',
                'gruntfile.babel.coffee'
            ],
        },
        { name: 'jest', fileNames: ['jest.config.js', 'jest.config.ts', 'jest.config.json', 'jest.setup.js', 'jest.setup.ts', 'jest.json', '.jestrc', '.jestrc.js', '.jestrc.json', 'jest.teardown.js'] },
        { name: 'processing', fileExtensions: ['pde'], light: true },
        { name: 'storybook', fileExtensions: ['stories.js', 'stories.jsx', 'story.js', 'story.jsx', 'stories.ts', 'stories.tsx', 'story.ts', 'story.tsx'] },
        { name: 'wepy', fileExtensions: ['wpy'] },
        { name: 'fastlane', fileNames: ['fastfile', 'appfile'] },
        { name: 'hcl', fileExtensions: ['hcl'], light: true },
        { name: 'helm', fileNames: ['.helmignore'] },
        { name: 'san', fileExtensions: ['san'] },
        { name: 'wallaby', fileNames: ['wallaby.js', 'wallaby.conf.js'] },
        { name: 'django', fileExtensions: ['djt'] },
        { name: 'stencil', fileNames: ['stencil.config.js', 'stencil.config.ts'], light: true },
        { name: 'red', fileExtensions: ['red'] },
        { name: 'makefile', fileNames: ['makefile'] },
        { name: 'foxpro', fileExtensions: ['fxp', 'prg'] },
        { name: 'i18n', fileExtensions: ['pot', 'po', 'mo'] },
        { name: 'webassembly', fileExtensions: ['wat', 'wasm'] },
        { name: 'semantic-release', light: true, fileNames: ['.releaserc', 'release.config.js'] },
        { name: 'bitbucket', fileNames: ['bitbucket-pipelines.yaml', 'bitbucket-pipelines.yml'] },
        { name: 'jupyter', fileExtensions: ['ipynb'] },
        { name: 'd', fileExtensions: ['d'] },
        { name: 'mdx', fileExtensions: ['mdx'] },
        { name: 'ballerina', fileExtensions: ['bal', 'balx'] },
        { name: 'racket', fileExtensions: ['rkt'] },
        { name: 'bazel', fileExtensions: ['bzl', 'bazel'], fileNames: ['.bazelignore', '.bazelrc'] },
        { name: 'mint', fileExtensions: ['mint'] },
        { name: 'velocity', fileExtensions: ['vm', 'fhtml', 'vtl'] },
        { name: 'godot', fileExtensions: ['gd'] },
        { name: 'godot-assets', fileExtensions: ['godot', 'tres', 'tscn'] },
        { name: 'azure-pipelines', fileNames: ['azure-pipelines.yml'] },
        { name: 'azure', fileExtensions: ['azcli'] },
        { name: 'vagrant', fileNames: ['vagrantfile'], fileExtensions: ['vagrantfile'] },
        { name: 'prisma', fileNames: ['prisma.yml'], fileExtensions: ['prisma'] },
        { name: 'razor', fileExtensions: ['cshtml', 'vbhtml'] },
        { name: 'asciidoc', fileExtensions: ['ad', 'adoc', 'asciidoc'] },
        { name: 'istanbul', fileNames: ['.nycrc', '.nycrc.json'] },
        { name: 'edge', fileExtensions: ['edge'] },
        { name: 'scheme', fileExtensions: ['ss', 'scm'] },
        { name: 'tailwindcss', fileNames: ['tailwind.js', 'tailwind.config.js'] },
        {
            name: '3d',
            fileExtensions: [
                'stl',
                'obj',
                'ac',
                'blend',
                'mesh',
                'mqo',
                'pmd',
                'pmx',
                'skp',
                'vac',
                'vdp',
                'vox'
            ]
        },
        { name: 'buildkite', fileNames: ['buildkite.yml', 'buildkite.yaml'] },
        { name: 'netlify', fileNames: ['netlify.json', 'netlify.yml', 'netlify.yaml', 'netlify.toml'] },
        { name: 'svg', fileExtensions: ['svg'] },
        { name: 'svelte', fileExtensions: ['svelte'] },
        { name: 'vim', fileExtensions: ['vimrc', 'gvimrc', 'exrc'] },
        { name: 'nest', fileNames: ['nest-cli.json', '.nest-cli.json', 'nestconfig.json', '.nestconfig.json'] },
        { name: 'nest-controller', fileExtensions: ['controller.ts', 'controller.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-middleware', fileExtensions: ['middleware.ts', 'middleware.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-module', fileExtensions: ['module.ts', 'module.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-service', fileExtensions: ['service.ts', 'service.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-decorator', fileExtensions: ['decorator.ts', 'decorator.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-pipe', fileExtensions: ['pipe.ts', 'pipe.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-filter', fileExtensions: ['filter.ts', 'filter.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-gateway', fileExtensions: ['gateway.ts', 'gateway.js'], enabledFor: [IconPack.Nest] },
        { name: 'nest-guard', fileExtensions: ['guard.ts', 'guard.js'], enabledFor: [IconPack.Nest] },
        { name: 'moonscript', fileExtensions: ['moon'] },
        { name: 'percy', fileNames: ['.percy.yml'] },
        { name: 'gitpod', fileNames: ['.gitpod.yml'] },
        { name: 'advpl_prw', fileExtensions: ['prw', 'prx'] },
        { name: 'advpl_ptm', fileExtensions: ['ptm'] },
        { name: 'advpl_tlpp', fileExtensions: ['tlpp'] },
        { name: 'advpl_include', fileExtensions: ['ch'] },
        { name: 'codeowners', fileNames: ['codeowners'] },
        { name: 'gcp', fileNames: ['.gcloudignore'] },
        { name: 'disc', fileExtensions: ['iso'] },
        { name: 'fortran', fileExtensions: ['f', 'f77', 'f90', 'f95', 'f03', 'f08'] },
    ]
};
