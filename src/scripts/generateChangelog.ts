import fs from 'fs';
import {
  type ResolvedChangelogConfig,
  generateMarkDown,
  getCurrentGitTag,
  getGitDiff,
  getLastGitTag,
  loadChangelogConfig,
  parseCommits,
} from 'changelogen';
import ChangelogenConfig from '../../changelog.config';

/**
 * Parses the command line arguments to extract the version string.
 *
 * This function looks for the version specified in the command line arguments.
 * It supports the following formats:
 * - `--version <version>`
 * - `-v <version>`
 * - `--version=<version>`
 * - `<version>` (as a standalone argument without any flag)
 *
 * @returns The version string if found, otherwise `undefined`.
 */
function getVersionFromCLI(): string | undefined {
  // Parse command line arguments
  const args = process.argv.slice(2);

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

  return version;
}

/**
 * Writes a given string to the standard output (stdout).
 *
 * @example
 * ```bash
 * changelog="$(bun ./src/scripts/generateChangelog.ts)"
 * echo "$changelog"
 *
 * # ✨ Enhancements
 * # - Add new feature
 * # - Improve existing feature
 * # - ...
 * ```
 *
 * It's like `return` in a function, but for the console.
 * @param string - The string to be written to stdout.
 */
function writeStringToStdout(string: string): void {
  process.stdout.write(string);
}

/**
 * Updates the changelog file with the provided changelog content.
 *
 * @param changelog - The new changelog content to be added.
 * @param config - The resolved configuration for the changelog.
 * @returns A promise that resolves when the changelog file has been updated.
 *
 * @throws Will throw an error if the output path in the config is invalid or not writable.
 * @throws Will throw an error if there is an issue reading the changelog file.
 *
 * @example
 * ```typescript
 * const changelog = `
 * ## v1.0.1
 * - Fixed bugs
 * - Improved performance`;
 *
 * const config = {..., output: 'CHANGELOG.md'};
 * await updateChangelogFile(changelog, config);
 * ```
 */
async function updateChangelogFile(
  changelog: string,
  config: ResolvedChangelogConfig
): Promise<void> {
  /**
   * The output path for the changelog
   *
   * @example 'CHANGELOG.md'
   */
  const output: string = typeof config.output === 'string' ? config.output : '';

  if (!output || !fs.existsSync(output)) {
    throw new Error(`Invalid output path in config: ${output}`);
  }

  // Check if the output path is writable
  try {
    fs.accessSync(output, fs.constants.W_OK);
  } catch {
    throw new Error(`Output path is not writable: ${output}`);
  }

  /** Markdown of the current changelog file */
  let changelogMarkdown: string;

  // Read the changelog file
  try {
    changelogMarkdown = await Bun.file(output).text();
  } catch (error) {
    throw new Error(`Error reading changelog file: ${error}`);
  }

  // Update the changelog with the new release notes

  /** The last version in the changelog */
  const lastEntry = changelogMarkdown.match(/^###?\s+.*$/m);

  if (lastEntry) {
    // If there is a last version entry, add the new changelog on top of it
    changelogMarkdown =
      changelogMarkdown.slice(0, lastEntry.index) +
      changelog +
      '\n\n' +
      changelogMarkdown.slice(lastEntry.index);
  } else {
    // If there is no last entry, just add the new changelog to the top
    const changelogHeader = '# Changelog';
    const headerIndex = changelogMarkdown.indexOf(changelogHeader);

    changelogMarkdown =
      changelogMarkdown.slice(0, headerIndex + changelogHeader.length) +
      '\n\n' +
      changelog +
      changelogMarkdown.slice(headerIndex + changelogHeader.length);
  }

  // Write the updated changelog to the file
  await Bun.write(output, changelogMarkdown);
}

/**
 * Generates a changelog based on the git history using `changelogen` and updates the changelog file.
 *
 * This function performs the following steps:
 * 1. Retrieves the version from the command line arguments.
 * 2. Gets the current and last git tags.
 * 3. Loads the changelog configuration.
 * 4. Gets the git diff between the last and current tags.
 * 5. Parses the git commits based on the changelog configuration.
 * 6. Generates the markdown for the changelog.
 * 7. Extracts the release notes from the generated changelog.
 * 8. Writes the release notes to the standard output.
 * 9. Updates the changelog file with the generated changelog.
 *
 * @returns A promise that resolves when the changelog generation is complete.
 */
async function generateChangelog(): Promise<void> {
  // Get the version from the command line arguments
  /** The version string specified in the command line arguments */
  const version: string | undefined = getVersionFromCLI();

  // Get the current and last git tags
  const currentTag = getCurrentGitTag();
  const lastTag = await getLastGitTag();

  /** The changelogen configuration */
  const config = await loadChangelogConfig(process.cwd(), {
    ...ChangelogenConfig,
    // from: currentTag,

    // 'v1.2.3'.slice(1) => '1.2.3'
    newVersion: version || currentTag.slice(1),
  });

  // Get the git diff between the last and current tags
  const rawGitCommits = await getGitDiff(lastTag);
  const newCommits = parseCommits(rawGitCommits, config);

  /** Changelog */
  const generatedChangelog: string = await generateMarkDown(newCommits, config);

  /** Release notes from the changelog without the header */
  const releaseNotes: string = generatedChangelog
    .split('\n')
    .slice(3)
    .join('\n');

  // Write the release notes to the standard output
  writeStringToStdout(releaseNotes);

  // Update changelog file
  console.info(`Updating ${config.output}`);

  updateChangelogFile(generatedChangelog, config);
}

// Run the changelog generation
generateChangelog();
