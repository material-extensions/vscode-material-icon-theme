import { patchFolders } from '../lucodear/icons';
import { fileIcons as files } from './fileIcons';
import { folderIcons as folders } from './folderIcons';

export * from './generator';
export * from './languageIcons';

const fileIcons = files;
const folderIcons = patchFolders(folders);

export { fileIcons, folderIcons };
