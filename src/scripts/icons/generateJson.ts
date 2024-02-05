/**
 * This file is meant to be executed exclusively by npm scripts.
 */
import { env } from 'process';
import { createIconFile } from './../../icons/index';

env.LUCODEAR_SCRIPT_EXECUTION = 'true';

generateJson()
  .catch((error) => {
    console.error(error);
    throw Error('Could not generate json!');
  })
  .then(() => {
    console.log('Icon file generated successfully!');
  });

async function generateJson() {
  console.log('Generating icon file...');
  await createIconFile();
}
