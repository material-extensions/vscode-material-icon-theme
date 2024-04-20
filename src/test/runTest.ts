import { resolve } from 'path';
import { runTests } from 'vscode-test';

const main = async () => {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = resolve(__dirname, '../../');

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = resolve(__dirname, './spec/index');

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ['--disable-gpu', '--disable-workspace-trust'],
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
};

main();
