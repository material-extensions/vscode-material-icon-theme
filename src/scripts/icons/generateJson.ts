/**
 * This file is only a script file that should only be executed by the npm scripts.
 */
import { createIconFile } from './../../icons/index';

try {
    createIconFile();
} catch (error) {
    throw Error(error);
}
