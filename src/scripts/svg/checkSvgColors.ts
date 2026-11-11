import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

/**
 * Check changed (not yet committed) SVG files for correct colors.
 */
const checkColors = async () => {
  try {
    // Execute Git command to get list of modified SVG files
    const { stdout: gitOutput } = await execFileAsync('git', [
      'diff',
      '--cached',
      '--name-only',
      '--',
      '*.svg',
    ]);
    const svgFiles = gitOutput
      .trim()
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((p) => existsSync(p));
    console.log('SVG files to check:', svgFiles.join(' '));

    if (svgFiles.length > 0) {
      try {
        const { stdout: linterOutput } = await execFileAsync('npx', [
          'svg-color-linter',
          '--config',
          'material-colors.yml',
          ...svgFiles,
        ]);
        console.log('Colors check output:\n\n', linterOutput);
      } catch (error: unknown) {
        // execFile rejects on non-zero exit code
        const execError = error as {
          stdout?: string;
          stderr?: string;
          code?: number;
        };
        if (execError.stdout) {
          console.log('Colors check output:\n\n', execError.stdout);
        }
        if (execError.stderr) {
          console.error(execError.stderr);
        }
        process.exit(execError.code ?? 1);
      }
    } else {
      console.log('No SVG files to check.');
    }
  } catch (error) {
    console.error('Error checking colors:', error);
    process.exit(1);
  }
};

checkColors();
