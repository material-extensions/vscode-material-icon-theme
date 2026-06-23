import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs/promises', () => ({
  writeFile: vi.fn(() => Promise.resolve()),
}));

import { writeFile } from 'node:fs/promises';
import { writeToFile } from '../../helpers/writeFile';

const writeFileMock = vi.mocked(writeFile);

describe('writeToFile', () => {
  beforeEach(() => {
    writeFileMock.mockClear();
  });

  describe('successful writes', () => {
    it.each([
      { filePath: '/path.txt', data: 'hello', encoding: undefined },
      { filePath: '/path.txt', data: 'hello', encoding: 'utf-8' },
      { filePath: '/path.txt', data: '  spaces  ', encoding: 'utf-8' },
    ])('should write path=$filePath data="$data" encoding=$encoding', async ({
      filePath,
      data,
      encoding,
    }) => {
      await writeToFile(filePath, data, encoding as BufferEncoding | undefined);

      expect(writeFileMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenCalledWith(filePath, data, encoding);
    });
  });

  describe('validation', () => {
    it.each([
      { filePath: '', data: 'data', label: 'empty filePath' },
      { filePath: undefined, data: 'data', label: 'undefined filePath' },
      { filePath: '/path.txt', data: null, label: 'null data' },
      { filePath: '/path.txt', data: undefined, label: 'undefined data' },
      { filePath: '/path.txt', data: '', label: 'empty data' },
      {
        filePath: '/path.txt',
        data: '   \n\t  ',
        label: 'whitespace-only data',
      },
    ])('should reject when $label', async ({ filePath, data }) => {
      // Intentionally passing invalid types to test runtime validation
      await writeToFile(
        filePath as unknown as string,
        data as unknown as string
      );

      expect(writeFileMock).not.toHaveBeenCalled();
    });
  });
});
