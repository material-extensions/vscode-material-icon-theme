/// <reference types="types-for-adobe/Illustrator/2022"/>

/*
Usage: Run this script in Adobe Illustrator to create a new document
with all listed folder icons (32x32) as artboards.
*/

// REMEMBER TO CHANGE THIS TO THE PATH IF MOVING THE REPO TO A DIFFERENT LOCATION
var ICONS_PATH = '~/desktop/dev/node/ext/lucodear-icons/icons/';
var ORIGINAL_ICON_SIZE = 24;
var RESIZED_ICON_SIZE = 32;
var INITIAL_POSITION = [2, -6];

var DO_RESIZE = false;
var GROUPED = false;

var folders = [
  'angular',
  'ansible',
  'apollo',
  'archive',
  'audio',
  'aurelia',
  'bower',
  'buildkite',
  'cart',
  'changesets',
  'cobol',
  'components',
  'content',
  'contract',
  'controller',
  'coverage',
  'cypress',
  'decorators',
  'delta',
  'download',
  'expo',
  'fastlane',
  'flow',
  'gamemaker',
  'godot',
  'gradle',
  'graphql',
  'husky',
  'intellij',
  'lottie',
  'lua',
  'mercurial',
  'middleware',
  'mjml',
  'mojo',
  'moon',
  'ngrx-actions',
  'ngrx-effects',
  'ngrx-entities',
  'ngrx-reducer',
  'ngrx-selectors',
  'ngrx-state',
  'ngrx-store',
  'nuxt',
  'pdm',
  'php',
  'phpmailer',
  'plastic',
  'python',
  'quasar',
  'react-components',
  'redux-actions',
  'redux-reducer',
  'redux-selector',
  'redux-store',
  'review',
  'scala',
  'serverless',
  'shader',
  'stencil',
  'stylus',
  'svelte',
  'syntax',
  'terraform',
  'unity',
  'update',
  'vm',
  'vue-directives',
  'vue',
  'vuepress',
  'vuex-store',
  'wakatime',
  'webpack',
  'wordpress',
];
var artboardCount = folders.length * 2;

app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

// create a new document with the specified artboard count
var docRef = app.documents.add(
  DocumentColorSpace.RGB,
  RESIZED_ICON_SIZE,
  RESIZED_ICON_SIZE,
  artboardCount,
  DocumentArtboardLayout.GridByRow,
  // gap between artboards
  10,
  // amount of columns on each row
  10
);

// Now let's assign each artboard a name based on the folder names
// for each folder, we will create 2 artboards (1 for open, 1 for closed)
for (var i = 0; i < folders.length; i++) {
  var folder = folders[i];
  var openArtboard = docRef.artboards[i * 2];
  var closedArtboard = docRef.artboards[i * 2 + 1];
  openArtboard.name = 'folder-'.concat(folder);
  closedArtboard.name = 'folder-'.concat(folder, '-open');
}

// for each artboard, we will place the corresponding folder icon
for (var i = 0; i < docRef.artboards.length; i++) {
  docRef.artboards.setActiveArtboardIndex(i);
  var artboard = docRef.artboards[i];

  var file = ICONS_PATH + artboard.name + '.svg';

  placeInArtboard(file, artboard);
}

function placeInArtboard(file, artboard) {
  var f = new File(file);

  if (f.exists) {
    var iconGroup = docRef.groupItems.createFromFile(f);
    iconGroup.position = INITIAL_POSITION;

    if (DO_RESIZE) {
      performResize(iconGroup, artboard.width, artboard.height);
    }

    if (GROUPED) {
      iconGroup.name = artboard.name;
    } else {
      ungroup(iconGroup);
    }
  } else {
    alert('Damn! Icon not found: ' + file);
  }
}

function performResize(obj, width, height) {
  // pkief's icons are 24x24, but I want them resized to 32x32
  // We'll use a 24x24 rectangle to resize the entire icon to 32x32
  // so that we don't have to mess with re-positioning the icon
  var rect = docRef.pathItems.rectangle(
    0,
    0,
    ORIGINAL_ICON_SIZE,
    ORIGINAL_ICON_SIZE
  );

  // group the icon and the rectangle
  var grouped = group([obj, rect]);

  // resize the group to take the whole artboard (32x32)
  grouped.height = RESIZED_ICON_SIZE;
  grouped.width = RESIZED_ICON_SIZE;

  // ungroup the group
  ungroup(grouped);

  // remove the rectangle
  rect.remove();
}

function group(objs) {
  var group = docRef.groupItems.add();
  for (var i = 0; i < objs.length; i++) {
    objs[i].move(group, ElementPlacement.INSIDE);
  }
  return group;
}

function ungroup(obj) {
  var elements = getChilds(obj);
  if (elements.length < 1) {
    obj.remove();
    return;
  } else {
    for (var i = 0; i < elements.length; i++) {
      try {
        if (elements[i].parent.typename != 'Layer 1')
          elements[i].moveBefore(obj);
        if (elements[i].typename == 'rename') ungroup(elements[i]);
      } catch (e) {}
    }
  }
}

function getChilds(obj) {
  var childsArr = new Array();
  for (var i = 0; i < obj.pageItems.length; i++)
    childsArr.push(obj.pageItems[i]);
  return childsArr;
}
