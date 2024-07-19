import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'bun';

/**
 * Check changed (not yet committed) SVG files for correct colors.
 */
async function prepareModule() {
  try {
    const setMain = spawn([
      'npm',
      'pkg',
      'set',
      'main=./dist/module/index.cjs',
    ]);
    await setMain;

    //copy readme into root directory
    const readmePath = join(process.cwd(), 'src', 'module', 'README.md');
    console.log('Copying README.md to root directory...');
    await copyFile(readmePath, 'README.md');
  } catch (error) {
    console.error('Error preparing the module:', error);
    process.exit(1);
  }
}

prepareModule();
