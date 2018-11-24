import * as path from 'path';
import * as puppeteer from 'puppeteer';

export const createScreenshots = async (filePath: string, fileName: string) => {
    const htmlFilePath = path.join(__dirname, '..', '..', filePath);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        height: 100,
        width: 100
    });

    await page.goto(`file:${htmlFilePath}`);

    await page.screenshot({
        path: `images/${fileName}.png`,
        omitBackground: false,
        fullPage: true
    });

    await browser.close();
};
