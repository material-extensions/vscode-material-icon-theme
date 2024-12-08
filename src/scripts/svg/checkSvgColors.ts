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
        '--colors',
        'material-colors.yml',
        ...svgFiles.split(' '),
      ];
      const linterProcess = spawn(command);
      const linterResponse = new Response(linterProcess.stdout);

      console.log('Colors check output:\n\n', await linterResponse.text());

      // idk how it works but only with this line it correctly exit
      // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️ DON'T DELETE ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
      await linterProcess.exited;
      // ==========================================================
      // ==========================================================

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
