import { glob } from 'glob';
import Mocha from 'mocha';
import path from 'path';

export const run = (): Promise<void> => {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'bdd',
  });

  const testsRoot = path.resolve(__dirname, '..');

  // refactor: glob now returns a promise instead of asking for a callback
  return glob('**/*.spec.js', { cwd: testsRoot }).then((files) => {
    // Add files to the test suite
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

    // Run the mocha test
    return new Promise((c, e) => {
      try {
        mocha.run((failures) => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        e(err);
      }
    });
  });
};
