import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import { Contributor } from '../../models/scripts/contributors/contributor';
import { ContributorsConfig } from '../../models/scripts/contributors/contributorsConfig';
import * as painter from '../helpers/painter';

/**
 * Parse link header
 * @param linkHeader Link header as string
 * @returns Object that contains the page numbers of `prev`, `next` and `last`.
 */
const parseLinkHeader = (linkHeader: string) => {
    const nextPagePattern = new RegExp(/\bpage=(\d)[^>]*>;\srel="next"/);
    const lastPagePattern = new RegExp(/\bpage=(\d)[^>]*>;\srel="last"/);
    const prevPagePattern = new RegExp(/\bpage=(\d)[^>]*>;\srel="prev"/);

    const nextPage = nextPagePattern.exec(linkHeader);
    const lastPage = lastPagePattern.exec(linkHeader);
    const prevPage = prevPagePattern.exec(linkHeader);

    return { nextPage, lastPage, prevPage };
};

/**
 * Get all contributors from GitHub API.
 * @param page Results page
 * @param owner Owner of the repository
 * @param repo Name of the repository
 */
const fetchContributors = (page: string, owner: string, repo: string):
    Promise<{ contributorsOfPage: Contributor[], nextPage: string }> => {
    return new Promise((resolve, reject) => {
        const requestOptions: https.RequestOptions = {
            method: 'GET',
            hostname: 'api.github.com',
            path: `/repos/${owner}/${repo}/contributors?page=${page}`,
            port: 443,
            headers: {
                'link': 'next',
                'accept': 'application/json',
                'User-Agent': 'Contributors script',
            },
        };

        const req = https.request(requestOptions, (res) => {
            const { nextPage, lastPage, prevPage } = res.headers.link ? parseLinkHeader(res.headers.link.toString()) : {
                nextPage: undefined, lastPage: [undefined, 1], prevPage: undefined,
            };
            console.log('> Material Icon Theme:', painter.yellow(`[${page}/${lastPage ? lastPage[1] : +prevPage[1] + 1}] Loading contributors from GitHub...`));
            const result = [];
            res.on('data', (data: Buffer) => {
                result.push(data);
            });

            res.on('end', () => {
                try {
                    const buffer = Buffer.concat(result);
                    const bufferAsString = buffer.toString('utf8');
                    const contributorsOfPage = JSON.parse(bufferAsString);
                    resolve({ contributorsOfPage, nextPage: nextPage ? nextPage[1] : undefined });
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });

        req.end();
    });
};

/**
 * Generates a list of linked images
 * @param contributors List of contributors
 * @param imageSize Size of the images in pixels
 */
const createLinkedImages = (contributors: Contributor[], imageSize: number = 40) => {
    const linkList = contributors.map(c => {
        return `<a href="${c.html_url}" title="${c.login}"><img src="${c.avatar_url}" width="${imageSize}px" height="${imageSize}px" alt="${c.login}"/></a>`;
    }).join('&nbsp;');

    return linkList;
};

const updateContributors = async (config: ContributorsConfig) => {
    const contributors: Contributor[] = [];
    let page = '1';

    // iterate over the pages of GitHub API
    while (page !== undefined) {
        const result = await fetchContributors(page, config.owner, config.repo);
        contributors.push(...result.contributorsOfPage);
        page = result.nextPage;
    }

    if (contributors.length > 0) {
        console.log('> Material Icon Theme:', painter.green(`Successfully fetched all contributors from GitHub!`));
    } else {
        console.log('> Material Icon Theme:', painter.red(`Error: Could not fetch contributors from GitHub!`));
        throw Error();
    }
    const images = createLinkedImages(contributors, config.imageSize);

    // create the image
    console.log('> Material Icon Theme:', painter.yellow(`Updating README.md ...`));
    const readmePath = path.join(process.cwd(), 'README.md');

    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const getContributorsSectionPattern = new RegExp(/(\[\/\/\]:\s#contributors\s\(start\))([\s\S]*)(\[\/\/\]:\s#contributors\s\(end\))/);
    const updatedContent = readmeContent.replace(getContributorsSectionPattern, `$1\n${images}\n\n$3`);
    fs.writeFileSync(readmePath, updatedContent);
    console.log('> Material Icon Theme:', painter.green(`Successfully updated README.md!`));
};

updateContributors({
    owner: 'pkief',
    repo: 'vscode-material-icon-theme',
    imageSize: 40,
});
