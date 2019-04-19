import * as path from 'path';
import * as puppeteer from 'puppeteer';

export const createScreenshots = async (filePath: string, fileName: string) => {
    try {
        const htmlFilePath = path.join('file:', filePath);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setViewport({
            height: 100,
            width: 100
        });

        await page.goto(htmlFilePath);

        await page.screenshot({
            path: `images/${fileName}.png`,
            omitBackground: false,
            fullPage: true
        });

        await browser.close();
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
};
