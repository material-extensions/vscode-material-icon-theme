import { mock } from 'bun:test';
import { vscodeApiMock } from './vscode';

mock.module('vscode', () => {
  return vscodeApiMock;
});
