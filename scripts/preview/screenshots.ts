import * as puppeteer from 'puppeteer';
import * as path from 'path';

export const createScreenshots = async (filePath: string, fileName: string) => {
    const htmlFilePath = path.join(__dirname, '..', '..', filePath);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(htmlFilePath);
    await page.screenshot({
        path: `images/${fileName}.png`,
        omitBackground: true,
        fullPage: true
    });

    await browser.close();
};
