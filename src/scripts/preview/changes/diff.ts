import { exec as cbExec } from 'child_process';
import { promisify } from 'util';
import { green, magenta, red, yellow } from '../../helpers/painter';
import path from 'path';

const exec = promisify(cbExec);

export interface FileStatus {
  path: string;
  relPath: string;
  name: string;
  status: 'modified' | 'deleted' | 'untracked' | 'other';
}

export type OrganizedDiff = {
  dir: string;
  files: FileStatus[];
};

function parseGitStatus(output: string, filter: RegExp): FileStatus[] {
  const lines = output
    .trim()
    .split('\n')
    .filter((line) => filter.test(line));
  const gitStatus: FileStatus[] = [];

  lines.forEach((line) => {
    line = line.trim();
    const [status, ...pathParts] = line.split(/\s+/);
    const rawPath = pathParts.join(' ');
    const name = rawPath.split('/').pop()?.replace('.svg', '') || '';
    // abspath from cwd
    const absPath = path.resolve(process.cwd(), rawPath);
    // relative from here to absPath
    const relPath = path.relative(__dirname, absPath);

    if (status.startsWith('M') || status.endsWith('M')) {
      gitStatus.push({ path: rawPath, status: 'modified', name, relPath });
    } else if (status.startsWith('D') || status.endsWith('D')) {
      gitStatus.push({ path: rawPath, status: 'deleted', name, relPath });
    } else if (status === '??') {
      gitStatus.push({ path: rawPath, status: 'untracked', name, relPath });
    } else {
      gitStatus.push({ path: rawPath, status: 'other', name, relPath });
    }
  });

  return gitStatus;
}

export async function getGitStatus(
  filter: RegExp = /.*/
): Promise<FileStatus[]> {
  const { stdout, stderr } = await exec('git status -uall --porcelain');
  if (stderr) {
    throw new Error(stderr);
  }
  return parseGitStatus(stdout, filter);
}

export function organizeDiff(svgDiff: FileStatus[]): OrganizedDiff[] {
  return svgDiff.reduce((acc, file) => {
    const dir = file.path.split('/').slice(0, -1).join('/');

    const existing = acc.find((x) => x.dir === dir);
    if (existing) {
      existing.files.push(file);
    } else {
      acc.push({ dir, files: [file] });
    }
    return acc;
  }, [] as OrganizedDiff[]);
}

export const printDiff = (diff: OrganizedDiff[]) => {
  diff.forEach((diffDir) => {
    const title = `${diffDir.dir}\n${'-'.repeat(diffDir.dir.length)}`;

    const files = diffDir.files
      .map((file) => {
        const stat = file.status.padEnd(9, ' ');

        const status =
          file.status === 'modified'
            ? yellow(stat)
            : file.status === 'deleted'
              ? red(stat)
              : file.status === 'untracked'
                ? green(stat)
                : file.status;
        return `  ${status.padEnd(9, ' ')} ${file.path}`;
      })
      .join('\n');

    console.log(`${magenta(title)}\n${files}\n`);
  });
};
