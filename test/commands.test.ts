import * as assert from 'assert';
import * as vscode from 'vscode';
import * as angular from '../src/commands/angular';
import * as folders from '../src/commands/folders';
import * as activate from '../src/commands/activate';
import * as config from '../src/commands/config';
import * as helpers from '../src/helpers';

suite("commands", () => {
    test("enable angular icons", () => {
        return angular.enableAngularIcons().then(() => {
            return angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, true);
            });
        });
    });

    test("disable angular icons", () => {
        angular.disableAngularIcons().then(() => {
            angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, false);
            });
        });
    });

    test("enable folder icons", () => {
        return folders.enableFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, folders.FolderType.Default);
            });
        });
    });

    test("enable classic folder icons", () => {
        return folders.enableClassicFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, folders.FolderType.Classic);
            });
        });
    });

    test("disable folder icons", () => {
        return folders.disableFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, folders.FolderType.None);
            });
        });
    });

    test("restore default configuration", () => {
        return config.restoreDefaultConfig().then(() => {
            return angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, true);
                folders.checkFolderIconsStatus().then(result => {
                    assert.equal(result, folders.FolderType.Default);
                });
            });
        });
    });
});