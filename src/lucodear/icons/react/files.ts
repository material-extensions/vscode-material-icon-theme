import { LucodearFileIcon } from '../../model';
import { lucodear } from '../utils';

const react = (icon: string, names: string[], light: boolean = false) => ({
  // create a new object with the icon name and the file names. for each file name we need to add the extensions .ts and .js
  name: `react-${icon}`,
  fileNames: [icon, ...names].flatMap((name) => [`${name}.tsx`, `${name}.jsx`]),
  fileExtensions: [icon, ...names].flatMap((name) => [
    `${name}.tsx`,
    `${name}.jsx`,
  ]),
  light,
});

export const files = lucodear('react', [
  {
    name: 'react-ts',
    fileExtensions: ['tsx'],
  },
  {
    name: 'react-js',
    fileExtensions: ['jsx'],
  },
  react('app', ['main']),
  react('component', ['comp', 'cmp', 'components']),
  react('context', ['ctx', 'contexts'], true),
  react('hook', ['hooks'], true),
  react('layout', ['template']),
  react('page', ['pages', 'section', 'sections']),
] as LucodearFileIcon[]);
