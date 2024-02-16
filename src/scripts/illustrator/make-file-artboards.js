/// <reference types="types-for-adobe/Illustrator/2022"/>

/*
Usage: Run this script in Adobe Illustrator to create a new document
with all listed folder icons (32x32) as artboards.
*/

// REMEMBER TO CHANGE THIS TO THE PATH IF MOVING THE REPO TO A DIFFERENT LOCATION
var ICONS_PATH = '~/desktop/dev/node/ext/lucodear-icons/icons/';

var files = [
  '3d',
  'abap',
  'actionscript',
  'apiblueprint',
  'apollo',
  'applescript',
  'apps-script',
  'arduino',
  'asciidoc',
  'assembly',
  'astyle',
  'audio',
  'autohotkey',
  'azure-pipelines',
  'ballerina',
  'bucklescript',
  'buildkite',
  'bun',
  'c',
  'caddy',
  'cadence',
  'cake',
  'changelog',
  'chess',
  'chrome',
  'circleci',
  'cobol',
  'coldfusion',
  'commitlint',
  'contributing',
  'cpp',
  'craco',
  'credits',
  'csharp',
  'cuda',
  'd',
  'dart',
  'dart_generated',
  'denizenscript',
  'deno',
  'dependabot',
  'disc',
  'django',
  'dll',
  'editorconfig',
  'email',
  'eslint',
  'favicon',
  'fortran',
  'gcp',
  'gemfile',
  'gemini',
  'git',
  'gitpod',
  'godot',
  'godot-assets',
  'gradle',
  'grain',
  'graphql',
  'gridsome',
  'groovy',
  'gulp',
  'h',
  'hack',
  'hcl',
  'helm',
  'heroku',
  'hpp',
  'http',
  'huff',
  'i18n',
  'istanbul',
  'jest',
  'kotlin',
  'kubernetes',
  'laravel',
  'lib',
  'lighthouse',
  'lilypond',
  'livescript',
  'lisp',
  'lock',
  'lottie',
  'lua',
  'markojs',
  'minecraft',
  'mjml',
  'mocha',
  'modernizr',
  'mojo',
  'moon',
  'mxml',
  'netlify',
  'next',
  'nginx',
  'nim',
  'nrwl',
  'nuget',
  'nunjucks',
  'nuxt',
  'objective-c',
  'objective-cpp',
  'ocaml',
  'opa',
  'parcel',
  'pawn',
  'pdm',
  'perl',
  'php_elephant',
  'php_elephant_pink',
  'pipeline',
  'plastic',
  'postcss',
  'posthtml',
  'powerpoint',
  'prettier',
  'processing',
  'puppet',
  'purescript',
  'raml',
  'rc',
  'react',
  'react_ts',
  'readme',
  'reason',
  'remix',
  'replit',
  'rescript-interface',
  'rescript',
  'riot',
  'roadmap',
  'robots',
  'rome',
  'rubocop',
  'scala',
  'san',
  'search',
  'sentry',
  'sequelize',
  'serverless',
  'siyuan',
  'slim',
  'smarty',
  'sml',
  'snyk',
  'stencil',
  'sublime',
  'svgr',
  'swc',
  'teal',
  'terraform',
  'tex',
  'textlint',
  'tilt',
  'tobi',
  'tobimake',
  'tree',
  'tune',
  'typescript',
  'typst',
  'url',
  'unocss',
  'vercel',
  'verilog',
  'vfl',
  'vim',
  'virtual',
  'visualstudio',
  'vue-config',
  'wakatime',
  'wallaby',
  'webpack',
  'wepy',
  'zig',
  'xaml',
  'windicss',
];

// for each file icon, we check if a version with sufix '_light.svg' exists
// if it does, we add it to the list of files to be processed

for (var i = 0; i < files.length; i++) {
  var file = ICONS_PATH + files[i] + '_light.svg';
  var f = new File(file);

  if (f.exists) {
    files.push(files[i] + '_light');
  }
}

// reorder the list alphabetically so that the light versions are next to the regular ones
files.sort();

// set the coordinate system to artboard
app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

// separete the file names in groups of 50 so that we create one document every 50 icons
var filesGroups = [];
for (var i = 0; i < files.length; i += 50) {
  filesGroups.push(files.slice(i, i + 50));
}

// for each group we will create a new document
for (var j = 0; j < filesGroups.length; j++) {
  var g = filesGroups[j];

  var artboardCount = g.length;

  // create the new document
  var docRef = app.documents.add(
    DocumentColorSpace.RGB,
    32,
    32,
    artboardCount,
    DocumentArtboardLayout.GridByRow,
    // gap between artboards
    10,
    // amount of columns on each row
    5
  );

  // let's assign each artboard a name based on the file names
  for (var i = 0; i < g.length; i++) {
    var iconName = g[i];
    var artboard = docRef.artboards[i];
    artboard.name = iconName;
  }

  // for each artboard, we will place the corresponding file icon
  for (var i = 0; i < docRef.artboards.length; i++) {
    docRef.artboards.setActiveArtboardIndex(i);
    var artboard = docRef.artboards[i];

    var file = ICONS_PATH + artboard.name + '.svg';

    placeInArtboard(file, artboard);
  }
}

function placeInArtboard(file, artboard) {
  var f = new File(file);

  if (f.exists) {
    var iconGroup = docRef.groupItems.createFromFile(f);

    // get size of the viewBox in the svg file
    var svgFile = new File(file);
    svgFile.open('r');
    var svgContent = svgFile.read();
    svgFile.close();

    // // center it in the artboard
    // var x = (artboard.artboardRect[2] - artboard.artboardRect[0]) / 2;
    // var y = (artboard.artboardRect[1] - artboard.artboardRect[3]) / 2;
    // iconGroup.position = [x, -y];

    // get the viewBox attribute
    var viewBox = svgContent.match(
      /viewBox="([.0-9]+) ([.0-9]+) ([.0-9]+) ([.0-9]+)"/
    );
    var viewBoxWidth = parseInt(viewBox[3]);

    // get the width attribute if it exists
    var width = svgContent.match(
      /<svg[\S\s]* width="([.0-9]+)"[\S\s]*">[\S\s]*</
    ); // [\S\s]*
    if (width) {
      viewBoxWidth = parseInt(width[1]);
    }

    // we also need to place the icon in the same position as it is in the
    // original svg file

    // resize the icon to fit the artboard
    var ratio = 32 / viewBoxWidth;

    iconGroup.resize(
      ratio * 100,
      ratio * 100,
      true,
      true,
      true,
      true,
      ratio * 100
    );

    var artboardWidth = artboard.artboardRect[2] - artboard.artboardRect[0];
    var artboardHeight = artboard.artboardRect[1] - artboard.artboardRect[3];

    // place the icon in the center of the artboard
    var x = (artboardWidth - iconGroup.width) / 2;
    var y = (artboardHeight - iconGroup.height) / 2;

    iconGroup.position = [x, -y];
  } else {
    alert('Damn! Icon not found: ' + file);
  }
}
