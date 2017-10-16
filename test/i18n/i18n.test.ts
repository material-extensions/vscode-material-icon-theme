import * as assert from 'assert';
import * as vscode from 'vscode';
import * as i18n from '../../src/i18n';

suite('i18n', () => {
    test('shoud initialize translations', () => {
        return i18n.initTranslations();
    });

    test('should translate key', () => {
        assert.equal(i18n.getTranslationValue('a', { a: 'b' }), 'b');
    });

    test('should return undefined if translation is not defined', () => {
        assert.equal(i18n.getTranslationValue('c', { a: 'b' }), undefined);
    });

    test('should use fallback if translation is not defined', () => {
        assert.equal(i18n.getTranslationValue('a', { b: 'b' }, { a: 'fb' }), 'fb');
    });

    test('should get the correct translation value of the translation object', () => {
        const translation = {
            a: {
                b: {
                    c: 'c'
                }
            }
        };
        assert.equal(i18n.getValue(translation, 'a.b.c'), 'c');
    });

    test('should use placeholder in translation', () => {
        assert.equal(i18n.replace('%0 with placeholder', 'test'), 'test with placeholder');
        assert.equal(i18n.replace('%0 with %1', ['test', 'placeholder']), 'test with placeholder');
    });
});
