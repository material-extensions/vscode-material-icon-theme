import { LucodearFolderIcon } from '../../model';
import { lucodear } from '../utils';

export const folders = lucodear('misc', [
  {
    name: 'exceptions',
    folderNames: [
      'exceptions',
      'exception',
      'errors',
      'error',
      'faults',
      'fault',
      'failures',
      'failure',
    ],
  },
  {
    name: 'factory',
    folderNames: ['factory', 'factories'],
  },
  {
    name: 'idea',
    folderNames: ['idea', 'ideas', '.idea', '.ideas', '💡'],
  },
  {
    name: 'metadata',
    folderNames: ['metadata', 'meta', 'data', 'tags', 'tag'],
  },
  {
    name: 'tasks',
    folderNames: ['tasks', 'task', 'todo', 'todos'],
  },
  {
    name: 'transformation',
    folderNames: [
      'transformations',
      'transformation',
      'transformer',
      'transformers',
      'trx',
      'convert',
      'conversion',
    ],
  },
  {
    name: 'workflow',
    folderNames: ['workflow', 'workflows', 'flow', 'flows'],
  },
] as LucodearFolderIcon[]);
