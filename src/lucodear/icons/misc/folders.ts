import { LucodearFolderIcon } from '../../model';
import { prefix, subpath } from '../utils';

export const miscFolders: LucodearFolderIcon[] = prefix(
  subpath('misc', [
    {
      name: 'folder-exceptions',
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
      name: 'folder-factory',
      folderNames: ['factory', 'factories'],
    },
    {
      name: 'folder-idea',
      folderNames: ['idea', 'ideas', '.idea', '.ideas'],
    },
    {
      name: 'folder-metadata',
      folderNames: ['metadata', 'meta', 'data', 'tags', 'tag'],
    },
    {
      name: 'folder-tasks',
      folderNames: ['tasks', 'task', 'todo', 'todos'],
    },
    {
      name: 'folder-transformation',
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
      name: 'folder-workflow',
      folderNames: ['workflow', 'workflows', 'flow', 'flows'],
    },
  ])
);
