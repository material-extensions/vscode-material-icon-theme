import { join } from 'node:path';
import axios, { type AxiosRequestConfig } from 'axios';
import { writeToFile } from '../../core';
import { green, red, yellow } from '../helpers/painter';
import { createScreenshot } from '../helpers/screenshots';
import type { Contributor } from '../models/scripts/contributors/contributor';

/**
 * Parse link header
 * @param linkHeader Link header as string
 * @returns Object that contains the page numbers of `prev`, `next` and `last`.
 */
const parseLinkHeader = (linkHeader: string) => {
  const nextPagePattern = new RegExp(/\bpage=(\d+)>;\srel="next"/);
  const lastPagePattern = new RegExp(/\bpage=(\d+)>;\srel="last"/);
  const prevPagePattern = new RegExp(/\bpage=(\d+)>;\srel="prev"/);

  const nextPage = nextPagePattern.exec(linkHeader) ?? '';
  const lastPage = lastPagePattern.exec(linkHeader) ?? '';
  const prevPage = prevPagePattern.exec(linkHeader) ?? '';

  return { nextPage, lastPage, prevPage };
};

/**
 * Get all contributors from GitHub API.
 */
const fetchContributors = (
  page: string
): Promise<{ contributorsOfPage: Contributor[]; nextPage: string }> => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.github.com/repos/pkief/vscode-material-icon-theme/contributors`,
      params: { page },
      headers: {
        accept: 'application/json',
        'User-Agent': 'Contributors script',
      },
    };

    axios
      .request(config)
      .then((res) => {
        const { nextPage, lastPage, prevPage } = parseLinkHeader(
          res.headers?.link?.toString() ?? ''
        );
        console.log(
          '> Material Icon Theme:',
          yellow(
            `[${page}/${
              lastPage ? lastPage[1] : +prevPage[1] + 1
            }] Loading contributors from GitHub...`
          )
        );

        resolve({ contributorsOfPage: res.data, nextPage: nextPage?.[1] });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createContributorsList = async (contributors: Contributor[]) => {
  const list = contributors
    .map((c) => {
      return `<li title="${c.login}"><img src="${c.avatar_url}" alt="${c.login}"/></li>`;
    })
    .join('\n');

  const htmlDoctype = '<!DOCTYPE html>';
  const styling = '<link rel="stylesheet" href="contributors.css">';
  const generatedHtml = `${htmlDoctype}${styling}<ul>${list}</ul>`;

  const outputPath = join(__dirname, 'contributors.html');
  await writeToFile(outputPath, generatedHtml);
  return outputPath;
};

const init = async () => {
  const contributorsList: Contributor[] = [];
  let page = '1';

  // iterate over the pages of GitHub API
  while (page !== undefined) {
    const result = await fetchContributors(page);
    contributorsList.push(...result.contributorsOfPage);
    page = result.nextPage;
  }

  if (contributorsList.length > 0) {
    console.log(
      '> Material Icon Theme:',
      green('Successfully fetched all contributors from GitHub!')
    );
  } else {
    console.log(
      '> Material Icon Theme:',
      red('Error: Could not fetch contributors from GitHub!')
    );
    throw Error();
  }
  const outputPath = await createContributorsList(contributorsList);

  // create the image
  console.log('> Material Icon Theme:', yellow('Creating image...'));
  const fileName = 'contributors';
  createScreenshot(outputPath, fileName)
    .then(() => {
      console.log(
        '> Material Icon Theme:',
        green(`Successfully created ${fileName} image!`)
      );
    })
    .catch(() => {
      throw Error(red(`Error while creating ${fileName} image`));
    });
};

init();
