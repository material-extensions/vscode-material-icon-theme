import { execSync } from 'node:child_process';
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Prepare the module for publishing.
 *
 * This script sets the main field in the package.json to the correct path and copies the README.md to the root directory.
 */
const prepareModule = async () => {
  try {
    // Set the main field in the package.json to the correct path
    execSync('npm pkg set main=./dist/module/index.cjs');

    // Remove vscode specific fields from package.json
    execSync('npm pkg delete browser');

    // Copy readme into root directory
    const readmePath = join(process.cwd(), 'src', 'module', 'README.md');
    console.log('Copying README.md to root directory...');
    await copyFile(readmePath, 'README.md');
  } catch (error) {
    console.error('Error preparing the module:', error);
    process.exit(1);
  }
};

prepareModule();
