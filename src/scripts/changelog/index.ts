import { exec } from 'child_process';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { config } from './config';
import { Commit, TagGroup } from './models';

const execAsync = promisify(exec);
const writeFileAsync = promisify(writeFile);

const getReleaseTags = async (): Promise<
  {
    creatorDate: string;
    tag: string;
  }[]
> => {
  const command = `git tag -l --sort=-creatordate --format="%(creatordate:short),%(refname:short)"`;
  const result = await execAsync(command);
  return result.stdout
    .split('\n')
    .filter((tag) => !!tag)
    .map((tag) => {
      const value = tag.split(',');
      return {
        creatorDate: value[0],
        tag: value[1],
      };
    });
};

const getReleaseCommits = async (
  toTag: string,
  fromTag: string
): Promise<Commit[]> => {
  const separator = '_||_';
  const command = `git log ${fromTag}..${toTag} --no-merges --pretty=format:"%ad${separator}%h${separator}%ae${separator}%s"`;
  const logResult = await execAsync(command);
  return logResult.stdout
    .split('\n')
    .filter((message) => !new RegExp(config.blacklistPattern).test(message))
    .filter((message) => !!message)
    .map((message) => {
      const data = message.split(separator);
      return {
        date: data[0],
        hash: data[1],
        author: data[2],
        subject: data[3],
      } as Commit;
    });
};

const groupCommitsByTags = async () => {
  const releaseCommits = [];

  const headTag = {
    creatorDate: new Date().toISOString().slice(0, 10),
    tag: 'HEAD',
  };
  const allTags = [headTag, ...(await getReleaseTags())];
  for await (const [index, value] of allTags.slice(0, -1).entries()) {
    const previousTag = allTags[index + 1].tag;
    const commits = await getReleaseCommits(value.tag, previousTag);
    releaseCommits.push({
      commits,
      previousTag,
      tag: value.tag,
      date: new Date(value.creatorDate),
    });
  }
  return releaseCommits;
};

const ticketRecognition = (commitMessage: string): string | undefined => {
  return commitMessage.match(/\((?<ticket>#\d+)\)/)?.groups?.ticket;
};

const formatDate = (date: Date) => {
  return date.toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const createMarkdown = (title: string, tagGroups: TagGroup[]) => {
  return (
    title +
    tagGroups.reduce((result, group) => {
      const subtitle = `\n#### [${
        group.tag === 'HEAD' ? 'v' + process.env.npm_package_version : group.tag
      }](${config.repoName}/compare/${group.tag}...${group.previousTag})\n`;
      const date = `\n> ${formatDate(group.date)}\n\n`;
      const commits = group.commits.reduce((result, commit) => {
        const ticket = ticketRecognition(commit.subject);
        let reference = '';
        if (ticket) {
          commit.subject = commit.subject.replace(`(${ticket})`, ''); // remove ticket number
          reference = `[\`${ticket}\`](${config.repoName}/pull/${ticket.slice(
            1
          )})`;
        } else {
          reference = `[\`${commit.hash}\`](${config.repoName}/commit/${commit.hash})`;
        }
        return (
          result + `- ${commit.subject.replace(/[<<]/, '&lt;')} ${reference}\n`
        );
      }, '');
      return result + subtitle + date + commits;
    }, '')
  );
};

const run = async () => {
  const tagGroups = await groupCommitsByTags();

  const title =
    '### Changelog \n\n All notable changes to this project will be documented in this file. Dates are displayed in UTC.\n\n';
  const output = createMarkdown(title, tagGroups);

  await writeFileAsync(config.outputFilename, output);
};

run();
