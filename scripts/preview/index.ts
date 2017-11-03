import { createScreenshots } from './screenshots';
import { createPreview } from './preview';
import * as painter from './../helpers/painter';
import * as fs from 'fs';

createScreenshots().then(() => {
    console.log(painter.green('Successfully created preview images!'));
}).catch(e => {
    throw Error(painter.red('Error while creating preview images'));
});

fs.writeFileSync('out/previews/demo.html', createPreview());

// console.log(createPreview());
