import { spawn } from 'bun';

/**
 * Check changed (not yet committed) SVG files for correct colors.
 */
async function checkColors() {
  try {
    // Execute Git command to get list of modified SVG files
    const gitProcess = spawn([
      'git',
      'ls-files',
      '-mo',
      '--exclude-standard',
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
        '--colors',
        'material-colors.yml',
        ...svgFiles.split(' '),
      ];
      const linterProcess = spawn(command);
      const { stdout } = await linterProcess;
      const linterOutput = await new Response(stdout).text();

      console.log('Colors check output:\n\n', linterOutput);
    } else {
      console.log('No SVG files to check.');
    }
  } catch (error) {
    console.error('Error checking colors:', error);
    process.exit(1);
  }
}

checkColors();
