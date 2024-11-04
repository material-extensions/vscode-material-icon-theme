import {
  generateMarkDown,
  getGitDiff,
  getLastGitTag,
  loadChangelogConfig,
  parseCommits,
} from 'changelogen';
import ChangelogenConfig from '../../changelog.config';

/**
 * Generates a changelog based on git commits and updates the changelog file.
 *
 * This function performs the following steps:
 * 1. Parses command line arguments to get the version.
 * 2. Retrieves the current and last git tags.
 * 3. Loads the changelog configuration.
 * 4. Gets the git diff between the current and last tags.
 * 5. Parses the commits from the git diff.
 * 6. Generates the markdown for the changelog.
 * 7. Extracts the release notes from the changelog.
 * 8. Updates the changelog file with the new changelog entries.
 *
 * Command line arguments:
 * - `--version` or `-v` followed by the version number to specify the new version.
 * - `--version=<version>` to specify the new version.
 * - If no version is specified, the version will be inferred from the arguments.
 *
 * @returns A promise that resolves when the changelog has been generated and the file has been updated.
 * @throws If the output path in the configuration is invalid.
 */
async function generateChangelog(): Promise<void> {
  // Parse command line arguments
  const args = process.argv.slice(2);

  // Get the version from the command line arguments
  let version: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--version' || arg === '-v') {
      version = args[i + 1];
    } else if (arg.startsWith('--version=')) {
      version = arg.split('=')[1];
    } else if (!version && !arg.startsWith('-')) {
      version = arg;
    }
  }

  // const currentTag = getCurrentGitTag();
  const lastTag = await getLastGitTag();

  /** The changelog configuration */
  const config = await loadChangelogConfig(process.cwd(), {
    ...ChangelogenConfig,
    // from: currentTag,
    ...(version && { newVersion: version }),
  });

  const rawGitCommits = await getGitDiff(lastTag);
  const newCommits = parseCommits(rawGitCommits, config);

  /* Changelog */
  const changelog: string = await generateMarkDown(newCommits, config);

  /** Release notes from the changelog without the header */
  const releaseNotes: string = changelog.split('\n').slice(3).join('\n');

  process.stdout.write(releaseNotes);

  // Update changelog file
  console.info(`Updating ${config.output}`);

  let changelogMD: string;
  const output: string = typeof config.output === 'string' ? config.output : '';

  // Read the changelog file
  if (config.output) {
    changelogMD = await Bun.file(output).text();
  } else {
    console.error('Invalid output path in config');
    return;
  }

  // Update the changelog with the new release notes

  /** The last version in the changelog */
  const lastEntry = changelogMD.match(/^###?\s+.*$/m);

  if (lastEntry) {
    changelogMD =
      changelogMD.slice(0, lastEntry.index) +
      changelog +
      '\n\n' +
      changelogMD.slice(lastEntry.index);
  } else {
    // If there is no last entry, add the new changelog to the top
    const changelogHeader = '# Changelog';
    const headerIndex = changelogMD.indexOf(changelogHeader);

    changelogMD =
      changelogMD.slice(0, headerIndex + changelogHeader.length) +
      '\n\n' +
      changelog +
      changelogMD.slice(headerIndex + changelogHeader.length);
  }

  if (typeof config.output === 'string') {
    await Bun.write(config.output, changelogMD);
  } else {
    console.error('Invalid output path in config');
  }
}

// Run the changelog generation
generateChangelog();
