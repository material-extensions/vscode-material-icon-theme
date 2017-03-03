import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';

/** Enable icons for angular files */
export const enableAngularIcons = (global: boolean = false) => {
    angularIconsEnabled().then(result => {
        if (!result) {
            addAngularFileExtensions().then(() => {
                reload.showConfirmToReloadMessage().then(result => {
                    if (result) helpers.reload();
                });
            });
        } else {
            vscode.window.showInformationMessage(i18n.translate('angular.alreadyEnabled'));
        }
    });
};

/** Disable icons for angular files */
export const disableAngularIcons = (global: boolean = false) => {
    angularIconsEnabled().then(result => {
        if (result) {
            deleteAngularFileExtensions().then(() => {
                reload.showConfirmToReloadMessage().then(result => {
                    if (result) helpers.reload();
                });
            });
        } else {
            vscode.window.showInformationMessage(i18n.translate('angular.alreadyDisabled'));
        }
    });
};

/** Are the angular icons enabled? */
export const angularIconsEnabled = (): Promise<boolean> => {
    return helpers.getIconConfiguration().then((config) => {
        if (config.fileExtensions['module.ts']) {
            return true;
        } else {
            return false;
        }
    });
};

/** Add file extensions for angular files */
const addAngularFileExtensions = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getIconConfiguration().then(config => {
        fs.writeFile(iconJSONPath, JSON.stringify({
            ...config,
            "fileExtensions": {
                ...config.fileExtensions,
                "module.ts": "_file_angular",
                "routing.ts": "_file_routes",
                "component.ts": "_file_angular_component",
                "guard.ts": "_file_angular_guard",
                "service.ts": "_file_angular_service",
                "pipe.ts": "_file_angular_pipe",
            }
        }, null, 2));
    });
};

/** Remove file extensions for angular files */
const deleteAngularFileExtensions = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getIconConfiguration().then(config => {
        fs.writeFile(iconJSONPath, JSON.stringify({ ...helpers.removeIconExtensions(config, 'angular') }, null, 2));
    });
};