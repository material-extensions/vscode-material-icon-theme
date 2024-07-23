import { writeFile } from 'node:fs/promises';

/**
 * Write content to a file.
 *
 * @param filePath File path to write to
 * @param data Content to write to the file
 */
export const writeToFile = async (
  filePath: string,
  data: string,
  encoding?: BufferEncoding
) => {
  if (!filePath || !data || data.trim().length === 0) return;
  await writeFile(filePath, data, encoding);
};
