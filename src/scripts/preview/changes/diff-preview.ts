import { compile } from 'handlebars';
import fs from 'fs';
import path from 'path';
import { OrganizedDiff } from './diff';

// type ThemedSvg = FileStatus & {
//   lightPath: string;
//   lightRelPath: string;
// };

export const makePreview = (organizedDiffs: OrganizedDiff[]) => {
  // get the template from ./template/diff-list.hbs as a string
  const diffListTemplate = fs.readFileSync(
    path.resolve(__dirname, './template/diff-list.hbs'),
    'utf-8'
  );

  // compile the template
  const template = compile(diffListTemplate);

  // for each file on each organized diff check if there's a light version
  // of the file (same name but with _light.svg) suffix and add it to the
  // file object
  // organizedDiffs.forEach((diff) => {
  //   diff.files.forEach((file) => {
  //     const lightAbsPath = path.resolve(
  //       process.cwd(),
  //       file.path.replace('.svg', '_light.svg')
  //     );

  //     if (fs.existsSync(lightAbsPath)) {
  //       //
  //     } else {
  //       const x = {
  //         ...file,
  //         lightPath: lightAbsPath,
  //         lightRelPath: path.relative(__dirname, lightAbsPath),
  //       } satisfies ThemedSvg;
  //     }
  //   });
  // });

  // create a new file with the compiled template
  const file = template({ diffs: organizedDiffs, defaultIconSize: 32 });

  // write the file to the disk
  fs.writeFileSync(path.resolve(__dirname, './diff-list.html'), file);
};
