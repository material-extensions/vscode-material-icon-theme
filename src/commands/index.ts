import * as vscode from 'vscode';
import { activateIcons } from './activate';
import { toggleExplorerArrows } from './explorerArrows';
import { changeFolderColor } from './folderColor';
import { changeFolderTheme } from './folders';
import { toggleGrayscale } from './grayscale';
import { toggleIconPacks } from './iconPacks';
import { changeOpacity } from './opacity';
import { restoreDefaultConfig } from './restoreConfig';
import { changeSaturation } from './saturation';

const commands = {
    activateIcons,
    toggleIconPacks,
    changeFolderTheme,
    changeFolderColor,
    restoreDefaultConfig,
    toggleExplorerArrows,
    changeOpacity,
    toggleGrayscale,
    changeSaturation,
};

export const registered = Object.keys(commands).map(commandName => {
    const callCommand = () => commands[commandName]();
    return vscode.commands.registerCommand(`material-icon-theme.${commandName}`, callCommand);
});
