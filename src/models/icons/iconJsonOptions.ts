import { FolderType } from './index';

export interface IconJsonOptions {
    folderTheme?: FolderType;
    activatedGroups?: {
        [name: string]: boolean;
    };
}
