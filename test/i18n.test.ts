//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as i18n from '../src/i18n';

// Defines a Mocha test suite to group tests of similar kind together
suite("i18n", () => {
    test("translations can be initialized", () => {
        return i18n.initTranslations();
    });

    test("translate key is undefined", () => {
        assert.equal(i18n.translate("c", { a: "b" }), undefined);
    });

    test("translate key is defined", () => {
        assert.equal(i18n.translate("a", { a: "b" }), "b");
    });

    test("translate key needs fallback", () => {
        assert.equal(i18n.translate("a", { b: "b" }, { a: "fb" }), "fb");
    });
});