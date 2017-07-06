import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as path from 'path';
import * as fs from 'fs';
import * as i18n from './../i18n';
import * as reload from './../messages/reload';
import { IconConfiguration } from "../models/IconConfiguration.interface";

export enum FolderType {
    Specific,
    Classic,
    Blue,
    None,
}

/** Command to toggle the folder icons. */
export const toggleFolderIcons = () => {
    return checkFolderIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions);
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = folderType => {
    const optionDefault: vscode.QuickPickItem = {
        description: i18n.translate('folders.specific.name'),
        detail: i18n.translate('folders.specific.description'),
        label: folderType === FolderType.Specific ? "\u2714" : "\u25FB"
    };
    const optionClassic: vscode.QuickPickItem = {
        description: i18n.translate('folders.classic.name'),
        detail: i18n.translate('folders.classic.description'),
        label: folderType === FolderType.Classic ? "\u2714" : "\u25FB"
    };
    const optionBlue: vscode.QuickPickItem = {
        description: i18n.translate('folders.blue.name'),
        detail: i18n.translate('folders.blue.description'),
        label: folderType === FolderType.Blue ? "\u2714" : "\u25FB"
    };
    const optionNone: vscode.QuickPickItem = {
        description: i18n.translate('folders.none.name'),
        detail: i18n.translate('folders.none.description'),
        label: folderType === FolderType.None ? "\u2714" : "\u25FB"
    };
    return vscode.window.showQuickPick(
        [optionDefault, optionClassic, optionBlue, optionNone], {
            placeHolder: i18n.translate('folders.toggleIcons'),
            ignoreFocusOut: false
        });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = value => {
    if (!value || !value.description) return;
    switch (value.description) {
        case i18n.translate('folders.specific.name'): {
            checkFolderIconsStatus().then(result => {
                helpers.setThemeConfig('folders.icons', "specific", true);
            });
            break;
        }
        case i18n.translate('folders.classic.name'): {
            checkFolderIconsStatus().then(result => {
                helpers.setThemeConfig('folders.icons', "classic", true);
            });
            break;
        }
        case i18n.translate('folders.blue.name'): {
            checkFolderIconsStatus().then(result => {
                helpers.setThemeConfig('folders.icons', "blue", true);
            });
            break;
        }
        case i18n.translate('folders.none.name'): {
            checkFolderIconsStatus().then(result => {
                helpers.setThemeConfig('folders.icons', "none", true);
            });
            break;
        }
        default:
            break;
    }
};

/** Are the folder icons enabled? */
export const checkFolderIconsStatus = (): Promise<FolderType> => {
    return helpers.getMaterialIconsJSON().then((config) => {
        if (config.folder === '' && config.folderExpanded === '') {
            return FolderType.None;
        } else if (config.folderNames && Object.keys(config.folderNames).length > 0) {
            return FolderType.Specific;
        } else if (config.folder === '_folder_blue') {
            return FolderType.Blue;
        } else {
            return FolderType.Classic;
        }
    });
};


/** Enable folder icons */
export const enableSpecificFolderIcons = () => {
    return insertSpecificFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

export const enableClassicFolderIcons = () => {
    return insertClassicFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

export const enableBlueFolderIcons = () => {
    return insertBlueFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Disable folder icons */
export const disableFolderIcons = () => {
    return deleteFolderIcons().then(() => {
        reload.showConfirmToReloadMessage().then(result => {
            if (result) helpers.reload();
        });
    });
};

/** Add folder icons */
const insertSpecificFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithSpecificFolders(config), null, 2));
    });
};

export const createConfigWithSpecificFolders = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "_folder",
        folderExpanded: "_folder_open",
        folderNames: {
            "src": "_folder_src",
            "dist": "_folder_dist",
            "out": "_folder_dist",
            "source": "_folder_src",
            "sources": "_folder_src",
            "css": "_folder_css",
            "stylesheet": "_folder_css",
            "style": "_folder_css",
            "styles": "_folder_css",
            "sass": "_folder_sass",
            "scss": "_folder_sass",
            "images": "_folder_images",
            "image": "_folder_images",
            "img": "_folder_images",
            "icons": "_folder_images",
            "icon": "_folder_images",
            "ico": "_folder_images",
            "script": "_folder_scripts",
            "scripts": "_folder_scripts",
            "node_modules": "_folder_node",
            "js": "_folder_js",
            "font": "_folder_font",
            "fonts": "_folder_font",
            "test": "_folder_test",
            "tests": "_folder_test",
            "__tests__": "_folder_test",
            "__snapshots__": "_folder_test",
            "__mocks__": "_folder_test",
            "__test__": "_folder_test",
            "spec": "_folder_test",
            "specs": "_folder_test",
            "docs": "_folder_docs",
            ".github": "_folder_git",
            ".git": "_folder_git",
            "submodules": "_folder_git",
            ".submodules": "_folder_git",
            ".vscode": "_folder_vscode",
            "view": "_folder_views",
            "views": "_folder_views",
            "vue": "_folder_vue",
            ".expo": "_folder_expo",
            "config": "_folder_config",
            "i18n": "_folder_i18n"
        },
        folderNamesExpanded: {
            "src": "_folder_src_open",
            "dist": "_folder_dist_open",
            "out": "_folder_dist_open",
            "source": "_folder_src_open",
            "sources": "_folder_src_open",
            "css": "_folder_css_open",
            "stylesheet": "_folder_css_open",
            "style": "_folder_css_open",
            "styles": "_folder_css_open",
            "sass": "_folder_sass_open",
            "scss": "_folder_sass_open",
            "images": "_folder_images_open",
            "image": "_folder_images_open",
            "img": "_folder_images_open",
            "icons": "_folder_images_open",
            "icon": "_folder_images_open",
            "ico": "_folder_images_open",
            "script": "_folder_scripts_open",
            "scripts": "_folder_scripts_open",
            "node_modules": "_folder_node_open",
            "js": "_folder_js_open",
            "font": "_folder_font_open",
            "fonts": "_folder_font_open",
            "test": "_folder_test_open",
            "tests": "_folder_test_open",
            "__tests__": "_folder_test_open",
            "__snapshots__": "_folder_test_open",
            "__mocks__": "_folder_test_open",
            "__test__": "_folder_test_open",
            "spec": "_folder_test_open",
            "specs": "_folder_test_open",
            "docs": "_folder_docs_open",
            ".github": "_folder_git_open",
            ".git": "_folder_git_open",
            "submodules": "_folder_git_open",
            ".submodules": "_folder_git_open",
            ".vscode": "_folder_vscode_open",
            "view": "_folder_views_open",
            "views": "_folder_views_open",
            "vue": "_folder_vue_open",
            ".expo": "_folder_expo_open",
            "config": "_folder_config_open",
            "i18n": "_folder_i18n_open"
        }
    };
};

const insertClassicFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithClassicFoldersIcons(config), null, 2));
    });
};

export const createConfigWithClassicFoldersIcons = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "_folder",
        folderExpanded: "_folder_open",
        folderNames: {},
        folderNamesExpanded: {}
    };
};

const insertBlueFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithBlueFoldersIcons(config), null, 2));
    });
};

export const createConfigWithBlueFoldersIcons = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "_folder_blue",
        folderExpanded: "_folder_blue_open",
        folderNames: {},
        folderNamesExpanded: {}
    };
};

/** Delete folder icons */
const deleteFolderIcons = (): Promise<void> => {
    const iconJSONPath = path.join(helpers.getExtensionPath(), 'out', 'src', 'material-icons.json');
    return helpers.getMaterialIconsJSON().then(config => {
        fs.writeFileSync(iconJSONPath, JSON.stringify(createConfigWithoutFolders(config), null, 2));
    });
};

export const createConfigWithoutFolders = (config: IconConfiguration) => {
    return {
        ...config,
        folder: "",
        folderExpanded: "",
        folderNames: {},
        folderNamesExpanded: {}
    };
};