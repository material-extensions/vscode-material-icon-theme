import { debounce } from 'lodash';
import { blue } from '../../helpers/painter';
import bs from 'browser-sync';
import chokidar from 'chokidar';
import { makePage } from './make-page';

makePage().then(() => {
  const server = bs({
    ui: false,
    startPath: 'index.html',
    server: true,
  });

  async function onWatchEvent(
    event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir',
    path: string
  ) {
    console.log(`\n${blue('> 🍭 full-diff')} ${path} [${event}]`);

    await makePage();
    server.reload();
  }

  chokidar
    .watch(
      ['./icons*/**/**/*.svg', './src/scripts/preview/full-diff/**/**/*'],
      {
        ignoreInitial: true,
        ignored: /(^|[/\\])\../,
        usePolling: true,
        interval: 250,
      }
    )
    .on('all', debounce(onWatchEvent, 500));
});
