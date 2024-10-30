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
  // Parse command line arguments
  const args = process.argv.slice(2);

  let version: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--version" || arg === "-v") {
      version = args[i + 1];
    } else if (arg.startsWith("--version=")) {
      version = arg.split("=")[1];
    } else if (!version && !arg.startsWith("-")) {
      version = arg;
    }
  }

  const currentTag = getCurrentGitTag()
  const lastTag = await getLastGitTag();

  const config = await loadChangelogConfig(process.cwd(), {
    ...ChangelogenConfig,
    from: currentTag,
    ...(version && { newVersion: version })
  });

  const rawGitCommits = await getGitDiff(
    currentTag,
    lastTag
  );

  const newCommits = parseCommits(rawGitCommits, config);

  /* Changelog */
  const changelog: string = await generateMarkDown(newCommits, config);

  /** Release notes from the changelog without the header */
  const releaseNotes: string = changelog.split("\n").slice(3).join("\n");

  process.stdout.write(releaseNotes);

  // Update changelog file
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

  if (typeof config.output === "string") {
    await Bun.write(config.output, changelogMD);
  } else {
    console.error("Invalid output path in config");
  }
}

generateChangelog();
