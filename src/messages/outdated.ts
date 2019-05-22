import * as open from 'open';
import * as vscode from 'vscode';
import * as i18n from './../i18n';

/** Show message that the editor version is outdated. */
export const showOutdatedMessage = () => {
    vscode.window.showWarningMessage(i18n.translate('outdatedVersion'), i18n.translate('updateVSCode'), i18n.translate('howToActivate')).then(handleActivateActions);
};

/** Handle the actions from the outdatedMessage command message */
const handleActivateActions = (value) => {
    switch (value) {
        case i18n.translate('howToActivate'):
            open('https://code.visualstudio.com/blogs/2016/09/08/icon-themes#_file-icon-themes');
            break;

        case i18n.translate('updateVSCode'):
            open('https://code.visualstudio.com/download');
            break;

        default:
            break;
    }
};
