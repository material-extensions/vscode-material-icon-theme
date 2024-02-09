import { FolderIcon } from '../../models';

export const folderPatches: Partial<
  FolderIcon & {
    skipExtend?: boolean;
  }
>[] = [
  {
    name: 'folder-functions',
    folderNames: ['fx', 'behaviour', 'functions'],
  },
  {
    name: 'folder-config',
    folderNames: ['options', 'option', 'config'],
  },
  {
    name: 'folder-log',
    folderNames: ['logger', 'loggers'],
  },
  {
    name: 'folder-class',
    folderNames: ['classes'],
  },
  {
    name: 'folder-shared',
    folderNames: ['common', 'shared'],
  },
  {
    name: 'folder-core',
    folderNames: ['core'],
  },
  {
    name: 'folder-layout',
    folderNames: ['layout', 'layouts'],
  },
  {
    name: 'folder-template',
    folderNames: ['templates', 'template'],
  },
  {
    name: 'folder-typescript',
    folderNames: ['ts', 'typescript', 'types'],
  },
  {
    name: 'folder-python',
    folderNames: ['py'],
    skipExtend: true,
  },
  {
    name: 'folder-taskfile',
    folderNames: ['.task'],
    skipExtend: true,
  },
  {
    name: 'folder-tools',
    folderNames: ['tool', 'tools', 'tooling'],
  },
];
