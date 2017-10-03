import { FolderType } from './index';

export interface ManifestOptions {
    folderTheme?: FolderType;
    activatedGroups?: {
        [name: string]: boolean;
    };
}
