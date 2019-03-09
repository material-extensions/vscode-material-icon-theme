/**
 * This file is only a script file that should only be executed by the npm scripts.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as painter from '../helpers/painter';
import { createIconFile } from './../../src/icons/index';

try {
    const fileName = createIconFile();
    const filePath = path.resolve('src', fileName);
    const out = path.resolve('out', 'src', fileName);

    fs.rename(filePath, out, (error) => {
        if (error) {
            throw Error(error.stack);
        } else {
            console.log('> Material Icon Theme:', painter.green(`Successfully generated icon JSON file!`));
        }
    });
} catch (error) {
    throw Error(error);
}
