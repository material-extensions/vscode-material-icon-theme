/**
 * This file is only a script file that should only be executed by the npm scripts.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as painter from '../helpers/painter';
import { createIconFile } from './../../src/icons/index';

createIconFile().then((fileName: string) => {
    const filePath = path.resolve('src', fileName);
    const out = path.resolve('out', 'src', fileName);
    fs.rename(filePath, out, (err) => {
        if (err) {
            console.error(painter.red(err.stack));
        } else {
            console.log('> Material Icon Theme:', painter.green(`Successfully generated icon JSON file!`));
        }
    });
}).catch(err => {
    console.error(painter.red(err));
});
