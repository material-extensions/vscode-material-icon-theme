import * as assert from 'assert';
import * as vscode from 'vscode';
import * as angular from '../src/commands/angular';
import * as folders from '../src/commands/folders';
import * as activate from '../src/commands/activate';
import * as config from '../src/commands/config';
import * as helpers from '../src/helpers';
import { FolderType } from '../src/models/FolderType.enum';
import { enableSpecificFolderIcons } from '../src/commands/folders/folders-specific';
import { enableClassicFolderIcons } from '../src/commands/folders/folders-classic';
import { disableFolderIcons } from '../src/commands/folders/folders-none';
import { enableBlueFolderIcons } from '../src/commands/folders/folders-blue';

suite('commands', () => {
    test('enable angular icons', () => {
        return angular.enableAngularIcons().then(() => {
            return angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, true);
            });
        });
    });

    test('disable angular icons', () => {
        angular.disableAngularIcons().then(() => {
            angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, false);
            });
        });
    });

    test('restore default configuration', () => {
        return config.restoreDefaultConfig().then(() => {
            return angular.checkAngularIconsStatus().then(result => {
                assert.equal(result, true);
                folders.checkFolderIconsStatus().then(result => {
                    assert.equal(result, FolderType.Specific);
                });
            });
        });
    });

    test('enable specific folder icons', () => {
        return enableSpecificFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, FolderType.Specific);
            });
        });
    });

    test('enable classic folder icons', () => {
        return enableClassicFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, FolderType.Classic);
            });
        });
    });

    test('enable blue folder icons', () => {
        return enableBlueFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, FolderType.Blue);
            });
        });
    });

    test('disable folder icons', () => {
        return disableFolderIcons().then(() => {
            return folders.checkFolderIconsStatus().then(result => {
                assert.equal(result, FolderType.None);
            });
        });
    });
});