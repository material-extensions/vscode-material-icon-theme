import { debounce } from 'lodash';
import { /* red,*/ blue } from '../../helpers/painter';
import { getGitStatus, organizeDiff, printDiff } from './diff';
import { makePreview } from './diff-preview';
import bs from 'browser-sync';
import chokidar from 'chokidar';

export async function makeHtml() {
  console.log(`${blue('> 🍭 lucodear-icons')} [changes-preview]\n`);

  // get modified/untracked/deleted svg files except for _light.svg
  const diff = organizeDiff(await getGitStatus(/^(?!.*_light\.svg).*\.svg$/));
  printDiff(diff);

  // make preview html
  makePreview(diff);
}

makeHtml().then(() => {
  const server = bs({
    ui: false,
    startPath: 'src/scripts/preview/changes/diff-list.html',
    server: true,
  });

  async function onWatchEvent(
    event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir',
    path: string
  ) {
    console.log(`\n${blue('> 🍭 lucodear-icons')} ${path} [${event}]`);

    await makeHtml();
    server.reload();
  }

  chokidar
    .watch('./icons*/**/**/*.svg', {
      ignoreInitial: true,
      ignored: /(^|[/\\])\../,
      usePolling: true,
      interval: 250,
    })
    .on('all', debounce(onWatchEvent, 500));
});
