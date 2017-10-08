import * as assert from 'assert';
import * as vscode from 'vscode';
import * as i18n from '../../src/i18n';

suite('i18n', () => {
    test('translations can be initialized', () => {
        return i18n.initTranslations();
    });

    test('translate key is undefined', () => {
        assert.equal(i18n.translate('c', { a: 'b' }), undefined);
    });

    test('translate key is defined', () => {
        assert.equal(i18n.translate('a', { a: 'b' }), 'b');
    });

    test('translate key needs fallback', () => {
        assert.equal(i18n.translate('a', { b: 'b' }, { a: 'fb' }), 'fb');
    });
});
