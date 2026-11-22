import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const svgColorLinterCli = join(
  import.meta.dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'svg-color-linter',
  'bin',
  'cli.js'
);

interface CommandError extends Error {
  code?: number | string;
  path?: string;
  stdout?: string;
  stderr?: string;
  syscall?: string;
}

/**
 * Check changed (not yet committed) SVG files for correct colors.
 */
const checkColors = async () => {
  try {
    // Execute Git command to get existing staged SVG files
    const { stdout: gitOutput } = await execFileAsync('git', [
      'diff',
      '--cached',
      '--name-only',
      '--diff-filter=ACMRT',
      '--',
      '*.svg',
    ]);
    const svgFiles = gitOutput
      .trim()
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    console.log('SVG files to check:', svgFiles.join(' '));

    if (svgFiles.length > 0) {
      const missingFiles = svgFiles.filter((file) => !existsSync(file));
      if (missingFiles.length > 0) {
        throw new Error(
          `Staged SVG file(s) not found: ${missingFiles.join(', ')}`
        );
      }

      if (!existsSync(svgColorLinterCli)) {
        throw new Error(
          `SVG color linter CLI not found: ${svgColorLinterCli}. Run npm install.`
        );
      }

      const { stdout: linterOutput } = await execFileAsync(process.execPath, [
        svgColorLinterCli,
        '--config',
        'material-colors.yml',
        ...svgFiles,
      ]);
      console.log('Colors check output:\n\n', linterOutput);
    } else {
      console.log('No SVG files to check.');
    }
  } catch (error: unknown) {
    const commandError =
      error instanceof Error ? (error as CommandError) : undefined;
    if (commandError?.stdout) {
      console.log('Colors check output:\n\n', commandError.stdout);
    }
    if (commandError?.stderr) {
      console.error(commandError.stderr);
    }
    if (commandError?.code === 'ENOENT') {
      const missingPath = commandError.path ?? commandError.message;
      console.error(
        `Could not find the command or path "${missingPath}" while checking SVG colors.`
      );
    }
    console.error(
      'Error checking colors:',
      commandError?.message ?? String(error)
    );
    process.exitCode = 1;
  }
};

checkColors();
