import { commands } from 'vscode';
import { extensionName } from '../../core';
import { activateIcons } from '../commands/activate';
import { toggleExplorerArrows } from '../commands/explorerArrows';
import { changeFileColor } from '../commands/fileColor';
import { changeFolderColor } from '../commands/folderColor';
import { changeFolderTheme } from '../commands/folders';
import { toggleGrayscale } from '../commands/grayscale';
import { toggleIconPacks } from '../commands/iconPacks';
import { changeOpacity } from '../commands/opacity';
import { restoreDefaultConfig } from '../commands/restoreConfig';
import { changeSaturation } from '../commands/saturation';

const extensionCommands: { [commmand: string]: () => Promise<void> } = {
  activateIcons,
  toggleIconPacks,
  changeFolderTheme,
  changeFolderColor,
  changeFileColor,
  restoreDefaultConfig,
  toggleExplorerArrows,
  changeOpacity,
  toggleGrayscale,
  changeSaturation,
};

export const registered = Object.keys(extensionCommands).map((commandName) => {
  const callCommand = () => extensionCommands[commandName]();
  return commands.registerCommand(
    `${extensionName}.${commandName}`,
    callCommand
  );
});
