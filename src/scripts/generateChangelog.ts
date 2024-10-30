import {
  generateMarkDown,
  parseCommits,
  getGitDiff,
  getLastGitTag,
  getCurrentGitTag,
  loadChangelogConfig,
} from "changelogen";
import ChangelogenConfig from "../../changelog.config";


async function generateChangelog() {
  const config = await loadChangelogConfig(process.cwd(), {
	...ChangelogenConfig,
	from: getCurrentGitTag()
  });

  const rawGitCommits = await getGitDiff(
	getCurrentGitTag(),
	await getLastGitTag()
  );
  const newCommits = parseCommits(rawGitCommits, config);

  /**
   * Generate the changelog content
   * @returns {string} The changelog in markdown format
   */
  const changelog: string = await generateMarkDown(newCommits, config);

  /**
   * Get the release notes from the changelog without the header
   * @returns {string} The release notes in markdown format without the header
   */
  const releaseNotes: string = changelog.split("\n").slice(3).join("\n");

  process.stdout.write(releaseNotes);

  // Update changelog file (only when bumping or releasing or when --output is specified as a file)
  console.info(`Updating ${config.output}`);
  let changelogMD: string = await Bun.file(config.output, "utf8").text();

  const lastEntry = changelogMD.match(/^###?\s+.*$/m);

  if (lastEntry) {
	changelogMD =
	  changelogMD.slice(0, lastEntry.index) +
	  changelog +
	  "\n\n" +
	  changelogMD.slice(lastEntry.index);

  } else {
	const changelogHeader = "# Changelog";
	const headerIndex = changelogMD.indexOf(changelogHeader);

	changelogMD =
	  changelogMD.slice(0, headerIndex + changelogHeader.length) +
	  "\n\n" +
	  changelog +
	  changelogMD.slice(headerIndex + changelogHeader.length);
  }

  if (typeof config.output === 'string') {
    await Bun.write(config.output, changelogMD);
  } else {
    console.error('Invalid output path in config');
  }
}

generateChangelog();
