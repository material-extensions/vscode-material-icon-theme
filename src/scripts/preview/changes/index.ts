import { red, blue } from '../../helpers/painter';
import { getGitStatus, organizeDiff, printDiff } from './diff';
import { makePreview } from './diff-preview';

async function main() {
  console.log(`${blue('> 🍭 lucodear-icons')} [changes-preview]\n`);

  // regex for only svg
  const dff = /\.svg$/;
  // regex for svg but not _light.svg
  // const dffnotlight = /^(?!.*_light\.svg).*\.svg$/;

  //
  const diff = organizeDiff(await getGitStatus(dff));
  printDiff(diff);

  makePreview(diff);
}

main().catch((error) => {
  console.error('> 🍭 lucodear-icons [changes-preview]:', red(`Error:`), error);
});
