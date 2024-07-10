/**
 * This file is meant to be executed exclusively by npm scripts.
 */

import { generateManifest } from '../../icons';

try {
  const manifest = generateManifest();
  console.log(JSON.stringify(manifest, undefined, 2));
} catch (error) {
  console.error(error);
  throw Error('An error while generating the manifest occurred!');
}
