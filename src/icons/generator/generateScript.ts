/**
 * This file is only a script file that should be executed by the npm scripts.
 */

import { createIconFile } from './index';

createIconFile().then((path) => {
    console.log('\x1b[32m%s\x1b[0m', '> Material Icon Theme: Successfully generated icon JSON file', path);
}).catch(err => {
    console.error('\x1b[31m%s\x1b[0m', '> Material Icon Theme: Something went wrong while writing the icon JSON file.');
});
