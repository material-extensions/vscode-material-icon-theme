import { Octokit } from '@octokit/rest';
import { generateContributorsTable } from 'contributors-table';
import type { Contributor } from '../../core/models/scripts/contributors/contributor';
const outputPath = './images/contributors.png';

/**
 * Fetches the list of contributors from a GitHub repository.
 *
 * @param repo - The repository path in the format "owner/repo"
 * @param max - Maximum number of contributors to fetch (default: `100`)
 * @returns A promise that resolves to the GitHub API response containing contributors list
 * @throws Will throw an error if the GitHub API request fails
 * @example
 * ```ts
 * const contributors = await getContributorsListFromGitHub('octocat/Hello-World', 5);
 * /*
 * [
 *   {
 *     login: 'octocat',
 *     id: 123456,
 *     ...
 *   },
 *  ...
 * ]
 * ```
 */
export async function getContributorsListFromGitHub(
  repo: string,
  max = 100
): Promise<Partial<Contributor[]>> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: 'contributors-table-script',
  });
  const [owner, repoName] = repo.split('/');
  const allContributors: Contributor[] = [];
  const perPage = 100;

  let downloaded = 0;
  const needToDownload = max;

  for await (const { data: contributors } of octokit.paginate.iterator(
    octokit.repos.listContributors,
    {
      owner: owner,
      repo: repoName,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      per_page: Math.min(perPage, needToDownload),
    }
  )) {
    if (downloaded >= needToDownload) {
      break;
    }

    // AI generated
    const remainingToDownload = needToDownload - downloaded;
    const contributorsToAdd = contributors.slice(0, remainingToDownload);
    allContributors.push(...contributorsToAdd);

    downloaded += contributorsToAdd.length;

    console.debug(`Downloaded ${downloaded} contributors.`);
  }

  console.log(`Downloaded ${downloaded} contributors.`);

  return allContributors;
}

const contributors = await getContributorsListFromGitHub(
  'material-extensions/vscode-material-icon-theme',
  294
);

const image = new Blob(
  // @ts-ignore
  await generateContributorsTable(contributors, { format: 'png' })
);

// Save the image
// @ts-expect-error
Bun.write(outputPath, image);
console.log(`Image saved to ${outputPath}`);
