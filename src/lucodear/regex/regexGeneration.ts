import { WorkspaceFolder, workspace, FileType, Uri } from 'vscode';
import { ExtendedOptions } from '../model';
import { IconAssociations } from '../../models';

export type EligibleFile = {
  /** name of the file or folder */
  name: string;

  /** type of the file or folder */
  type: FileType;

  /** relative path to the workspace folder */
  relativePath: string;
};

export async function getEligibleFiles(
  options: ExtendedOptions,
  workspacePath: Uri | undefined = undefined,
  startPath: WorkspaceFolder | undefined = undefined
): Promise<EligibleFile[]> {
  const folders = startPath ? [startPath] : workspace.workspaceFolders;
  const fs = workspace.fs;

  const eligibleFiles: EligibleFile[] = [];

  for (const folder of folders ?? []) {
    const workspacePathUri = workspacePath ?? folder.uri;
    const absoluteUri = folder.uri;
    const folderFiles = await fs.readDirectory(absoluteUri);

    for (const [name, type] of folderFiles) {
      const relPath =
        absoluteUri.path.replace(workspacePathUri.path, '') + `/${name}`;

      // check for ignores against relative path
      if (
        (options.lucodear.ignoreLookupPaths ?? []).some((regex) =>
          relPath.includes(regex)
        )
      ) {
        continue;
      }

      if (type === FileType.File) {
        eligibleFiles.push({
          name,
          type,
          relativePath: relPath,
        });
      } else {
        // add folder to eligible files
        eligibleFiles.push({
          name,
          type,
          relativePath: relPath,
        });

        // go recursive to get all files in subfolders
        const subFolderEligibleFiles = await getEligibleFiles(
          options,
          workspacePathUri,
          {
            uri: absoluteUri.with({ path: `${absoluteUri.path}/${name}` }),
            name,
            index: folder.index,
          }
        );
        eligibleFiles.push(...subFolderEligibleFiles);
      }
    }
  }

  return eligibleFiles;
}

export function matches(
  eligibleFiles: EligibleFile[],
  fileRegexList: IconAssociations,
  folderRegexList: IconAssociations
): {
  files: IconAssociations;
  folders: IconAssociations;
} {
  const files: IconAssociations = {};
  const folders: IconAssociations = {};

  for (const file of eligibleFiles) {
    const fileName = file.name;

    if (file.type === FileType.File) {
      for (const regex in fileRegexList) {
        if (new RegExp(regex).test(fileName)) {
          files[fileName] = fileRegexList[regex];
        }
      }
    } else {
      for (const regex in folderRegexList) {
        if (new RegExp(regex).test(fileName)) {
          folders[fileName] = folderRegexList[regex];
        }
      }
    }
  }

  return { files, folders };
}
