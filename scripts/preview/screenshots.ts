import * as puppeteer from 'puppeteer';
import * as path from 'path';

export const createScreenshots = async () => {
    const filePath = path.join(__dirname, '..', '..', 'out', 'previews', 'fileIcons.html');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(filePath);
    await page.screenshot({
        path: 'images/example.png',
        omitBackground: true
    });

    await browser.close();
};
