import { vi } from 'vitest';
import { vscodeApiMock } from './vscode';

vi.mock('vscode', () => {
  return vscodeApiMock;
});
