import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'bun';

/**
 * Prepare the module for publishing.
 *
 * This script sets the main field in the package.json to the correct path and copies the README.md to the root directory.
 */
const prepareModule = async () => {
  try {
    // Set the main field in the package.json to the correct path
    const setMain = spawn([
      'npm',
      'pkg',
      'set',
      'main=./dist/module/index.cjs',
    ]);
    await setMain;

    // Remove vscode specific fields from package.json
    const removeBrowser = spawn(['npm', 'pkg', 'delete', 'browser']);
    await removeBrowser;

    //copy readme into root directory
    const readmePath = join(process.cwd(), 'src', 'module', 'README.md');
    console.log('Copying README.md to root directory...');
    await copyFile(readmePath, 'README.md');
  } catch (error) {
    console.error('Error preparing the module:', error);
    process.exit(1);
  }
};

prepareModule();
