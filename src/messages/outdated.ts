import * as vscode from 'vscode';
import * as i18n from './../i18n';
import * as opn from 'opn';

/** Show message that the editor version is outdated. */
export const showOutdatedMessage = () => {
    vscode.window.showWarningMessage('You have an outdated version of VS Code.', 'How to activate icons', 'Update Visual Studio Code').then(handleActivateActions);
};

/** Handle the actions from the outdatedMessage command message */
const handleActivateActions = (value) => {
    switch (value) {
        case 'Activate the theme':
            opn('https://code.visualstudio.com/blogs/2016/09/08/icon-themes#_file-icon-themes');
            break;

        case 'Update VS Code':
            opn('https://code.visualstudio.com/download');
            break;

        default:
            break;
    }
};