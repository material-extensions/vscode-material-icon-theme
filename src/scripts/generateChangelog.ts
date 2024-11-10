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
 * @returns The version string if found, otherwise `undefined`.
 */
function getVersionFromCLI(): string | undefined {
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
 * Updates the changelog file with the provided changelog content.
 *
 * @param changelog - The new changelog content to be added.
 * @param config - The resolved configuration for the changelog.
 */
async function updateChangelogFile(
  changelog: string,
  config: ResolvedChangelogConfig
): Promise<void> {
  const changelogFilePath: string =
    typeof config.output === 'string' ? config.output : '';

  if (!changelogFilePath || !fs.existsSync(changelogFilePath)) {
    throw new Error(`Invalid output path in config: ${changelogFilePath}`);
  }

  // Check if the output path is writable
  let changelogMarkdown: string = await loadChangelogFile(changelogFilePath);

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
  await Bun.write(changelogFilePath, changelogMarkdown);
}

/**
 * Loads the changelog file and returns the markdown content.
 *
 * @param changelogFilePath - The path to the changelog file.
 * @returns The markdown content of the changelog file.
 */
async function loadChangelogFile(changelogFilePath: string) {
  try {
    fs.accessSync(changelogFilePath, fs.constants.W_OK);
  } catch {
    throw new Error(`Output path is not writable: ${changelogFilePath}`);
  }

  /** Markdown of the current changelog file */
  let changelogMarkdown: string;

  // Read the changelog file
  try {
    changelogMarkdown = await Bun.file(changelogFilePath).text();
  } catch (error) {
    throw new Error(`Error reading changelog file: ${error}`);
  }
  return changelogMarkdown;
}

/**
 * Generates a changelog based on the git history using `changelogen` and updates the changelog file.
 *
 * @returns A promise that resolves when the changelog generation is complete.
 */
async function generateChangelog(): Promise<void> {
  const version: string | undefined = getVersionFromCLI();

  const currentTag = getCurrentGitTag();
  const lastTag = await getLastGitTag();

  /** The changelogen configuration */
  const config = await loadChangelogConfig(process.cwd(), {
    ...ChangelogenConfig,

    // 'v1.2.3'.slice(1) => '1.2.3'
    newVersion: version || currentTag.slice(1),
  });

  // Get the git diff between the last and current tags
  const rawGitCommits = await getGitDiff(lastTag);
  const newCommits = parseCommits(rawGitCommits, config);

  const generatedChangelog: string = await generateMarkDown(newCommits, config);

  /** Release notes from the changelog without the header */
  const releaseNotes: string = generatedChangelog
    .split('\n')
    .slice(3)
    .join('\n');

  // Write the release notes to the standard output for further processing in the CI/CD pipeline
  process.stdout.write(releaseNotes);

  console.info(`Updating ${config.output}`);
  updateChangelogFile(generatedChangelog, config);
}

generateChangelog();
