import { spawn } from 'bun';

/**
 * Check changed (not yet committed) SVG files for correct colors.
 */
const checkColors = async () => {
  try {
    // Execute Git command to get list of modified SVG files
    const gitProcess = spawn([
      'git',
      'diff',
      '--cached',
      '--name-only',
      '--',
      '*.svg',
    ]);
    const { stdout } = await gitProcess;
    const output = await new Response(stdout).text();
    const svgFiles = output.trim().split('\n').join(' ');
    console.log('SVG files to check:', svgFiles);

    if (svgFiles) {
      const command = [
        'svg-color-linter',
        '--config',
        'material-colors.yml',
        ...svgFiles.split(' '),
      ];
      const linterProcess = spawn(command);
      const { stdout } = await linterProcess;
      const linterOutput = await new Response(stdout).text();

      console.log('Colors check output:\n\n', linterOutput);

      // Wait for the sub process to finish with an exit code
      await linterProcess.exited;

      // Exit script with exit code (0 == no errors, 1 == errors)
      process.exit(linterProcess.exitCode);
    } else {
      console.log('No SVG files to check.');
    }
  } catch (error) {
    console.error('Error checking colors:', error);
    process.exit(1);
  }
};

checkColors();
