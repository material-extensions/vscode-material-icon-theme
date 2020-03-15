/**
 * This file is meant to be executed exclusively by npm scripts.
 */
import { createIconFile } from './../../icons/index';

try {
    createIconFile();
} catch (error) {
    throw Error(error);
}
